import { contain, cover } from "contain-cover";

$( document ).ready(() => {

	// Прилипание и прозрачность главного меню: переменные
	// При загрузке страницы считаем высоту контейнера слайдера
	// для того, чтобы знать, в какой точке меню должно стать fixed
	var sliderheight = $('.index_page-slider').height();

	// На ресайзе окна меняется и высота контейнера слайдера, учитываем это
	$(window).on('resize', function(){
		sliderheight = $('.index_page-slider').height();
	});

	//Прилипание и прозрачность главного меню
	$(window).scroll(function(){
		if ($(window).scrollTop() >= (sliderheight - 60)) {
			$('.navigation').removeClass('transparent');
			$('.navigation').addClass('nav-fixed');
		}
		else {
			$('.navigation').addClass('transparent');
			$('.navigation').removeClass('nav-fixed');
		}
	});

});


$(window).on('load', function(){

	// Masonry должен срабатывать только тогда, когда
	// загружен контент, с которым он будет работать
	$('.index_page-catalog-content').masonry({
		itemSelector: '.index_page-catalog-item',
		percentPosition: true,
		columnWidth: '.grid-sizer'
	});

	window.mainSlider = new Swiper ('.index_page-slider', {
		// Optional parameters
		autoplay: {
			delay: 5000,
		},
		slidesPerView: 1,
		slidesPerGroup: 1,
		speed: 1000,
		delay: 1000,
		spaceBetween: 0,
		virtualTranslate: true,
		simulateTouch: false,
		allowTouchMove: false,
		loop: true,
		effect: 'fade',
		fadeEffect: {
			crossFade: true
		},
		pagination: {
			el: ".swiper-pagination",
			clickable: false,
		},
		navigation: {
			nextEl: '.mainslider-controls-next',
			prevEl: '.mainslider-controls-prev',
		},
		init: false
		// Navigation arrows
	});

	var currentNextImgWrap = ".mainslider-controls-next-img--wrap:first-child",
		currentPrevImgWrap = ".mainslider-controls-prev-img--wrap:first-child",
		newNextImgWrap = ".mainslider-controls-next-img--wrap",
		newPrevImgWrap = ".mainslider-controls-prev-img--wrap",
		nextContainer = ".mainslider-controls-next-img",
		prevContainer = ".mainslider-controls-prev-img";

	// Слайды в стрелках управления главным слайдером
	function controlSlides() {

		// Новый следующий и новый предыдущий слайды
		var newNext = 0 ,

		newPrev = 0 ;

		// Всё нижеследующее опирается на то, что
		// mainSlider.slides.length не показывает реального количества слайдов
		// и включает в себя два дубликата слайдов для анимаций и ведёт счёт слайдов
		// не с нуля, а с единицы. Нам же нужна нумерация как в массивах, поэтому (- 3).

		//-------------------NEXT----------------------//
		var nextSl = (mainSlider.realIndex + 1);
		if ( nextSl > (mainSlider.slides.length - 3) ) {
			nextSl = 0;
		}
		newNext =
			$($("[data-swiper-slide-index="+nextSl+"]").find('.index_page-slider-item--image')[0]).clone();
		//-------------------------------------------------//


		//-------------------PREVIOUS----------------------//
		var slPrev = (mainSlider.realIndex - 1);
		if ( slPrev < 0 ) {
			slPrev = (mainSlider.slides.length - 3);
		}
		newPrev =
			$($("[data-swiper-slide-index="+slPrev+"]").find('.index_page-slider-item--image')[0]).clone();
		//-------------------------------------------------//

		if ( $(".mainslider-controls-next-img--wrap img").length == 0 ) {
			addNewCtrlImg(true);
		} else {
			addNewCtrlImg(false);
		}

		function addNewCtrlImg(firstRun) {
			if (firstRun) {
				console.log("First run!");
				$(newNextImgWrap).append(newNext);
				$(newPrevImgWrap).append(newPrev);
			} else {
				console.log("Эу!");

				var elem1 = document.createElement("div")
				var elem2 = document.createElement("div")
				elem1.className = "mainslider-controls-next-img--wrap";
				elem2.className = "mainslider-controls-prev-img--wrap";

				$(elem1).append(newNext);
				$(elem2).append(newPrev);

				$(nextContainer).append(elem1);
				$(prevContainer).append(elem2);

				$(currentNextImgWrap).addClass("changeCtrlImg");
				$(currentPrevImgWrap).addClass("changeCtrlImg");
			}
		}
	}

	function removeOldCtrlImg() {
		$(currentNextImgWrap).remove();
		$(currentPrevImgWrap).remove();
	}

	// Кидаем картинки слайдов в контролы при загрузке страницы
	mainSlider.on('init', controlSlides);
//
	mainSlider.init();

	mainSlider.on('slideChangeTransitionStart', () => {
		var prev = $(mainSlider.slides[mainSlider.previousIndex]);
		prev.css({opacity: 1, 'z-index': 0}).addClass('removing').removeClass('inserting');
		var slide = $(mainSlider.slides[mainSlider.activeIndex]);
		slide.addClass('inserting').css({opacity: 1, 'z-index': 1});
		var image = slide.find('.index_page-slider-item--image')[0];

		let { width, height, x, y } = cover(document.body.clientWidth, window.innerHeight, image.naturalWidth, image.naturalHeight);

		var canvas = document.createElement('canvas');
		canvas.width = document.body.clientWidth;
		canvas.height = window.innerHeight/2;
		var ctx = canvas.getContext('2d');
		ctx.drawImage(image, x, y, width, height);
		slide.append(canvas);

		var canvas2 = document.createElement('canvas');
		canvas2.width = document.body.clientWidth;
		canvas2.height = window.innerHeight/2;
		var ctx2 = canvas2.getContext('2d');
		ctx2.drawImage(image, x, -window.innerHeight/2+y, width, height);
		slide.append(canvas2);

		controlSlides();

		$(image).css({display: 'none'});
	})


	mainSlider.on('slideChangeTransitionEnd', () => {
		var prev = $(mainSlider.slides[mainSlider.previousIndex]);
		prev.css({opacity: 0, 'z-index': 0}).removeClass('removing').removeClass('inserting');
		var slide = $(mainSlider.slides[mainSlider.activeIndex]);
		slide.css({opacity: 1, 'z-index': 1}).removeClass('removing').removeClass('inserting');
		var image = slide.find('.index_page-slider-item--image')[0];
		$(image).css({display: 'block'});
		slide.find('canvas').remove();
		removeOldCtrlImg();
	})

	// pagination position
	var paginationPosition = $( ".navigation-logo" )[0].getBoundingClientRect().right;
	$(".swiper-pagination").css( "left", (paginationPosition - 36) );


	// mainSlider controls position
	var controlsPosition = $( ".basket" )[0].getBoundingClientRect().right;
	$(".mainslider-controls").css( "left", (controlsPosition - 150) );


	$(window).on('resize', function(){
		// pagination position
		paginationPosition = $( ".navigation-logo" )[0].getBoundingClientRect().right;
		$(".swiper-pagination").css( "left", (paginationPosition - 36) );

		// mainSlider controls position
		controlsPosition = $( ".basket" )[0].getBoundingClientRect().right;
		$(".mainslider-controls").css( "left", (controlsPosition - 150) );
	});


	// Адаптивный слайдер популярных товаров
	var mySwiper = new Swiper ('.swiper-container', {
		// Optional parameters
		autoplay: true,
		slidesPerView: 3,
		slidesPerGroup: 3,
		speed: 9000,
		delay: 20000,
		spaceBetween: 40,
		loop: true,
		breakpoints: {
			1160: {
				spaceBetween: 40,
				slidesPerView: 2,
				slidesPerGroup: 2
			},
			991: {
				spaceBetween: 40,
				slidesPerView: 3,
				slidesPerGroup: 3
			},
			788: {
				spaceBetween: 1,
				slidesPerView: 3,
				slidesPerGroup: 3
			},
			680: {
				spaceBetween: 1,
				slidesPerView: 2,
				slidesPerGroup: 2
			}
		},

		// Navigation arrows
		navigation: {
			nextEl: '.popular-controls-controls-right',
			prevEl: '.popular-controls-controls-left',
		}
	});


	// Перекидываем блок в другое место при определённой ширине экрана (опираемся на media)
	var breakpoint = window.matchMedia('(max-width:991px)');

	var breakpointChecker = function breakpointChecker() {

	   if (breakpoint.matches === true) {

		  $('.catalog-link').appendTo('.index_page-popular-wrapper > .content-wrapper');
		  return;

	   } else if (breakpoint.matches === false) {

			$('.catalog-link').appendTo('.popular-controls');
			return;
	   }
	};

	breakpoint.addListener(breakpointChecker);

	breakpointChecker();


	// Параллакс-эффект для слайдера популярных товаров
	$(function() {
	  // init controller
		var controller = new ScrollMagic.Controller({
			globalSceneOptions: {
				triggerHook: "onEnter",
				duration: "80%"
			}
		});

		// build scenes
		new ScrollMagic.Scene({triggerElement: ".index_page-popular"})
						.setTween("#parallaxme", {
							y: "-30px",
							ease: Cubic.easeIn
						})
						.addTo(controller);
	});

});
