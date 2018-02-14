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
	//---------------------------------------//

});


$(window).on('load', function(){

	// Masonry должен срабатывать только тогда, когда
	// загружен контент, с которым он будет работать
	$('.index_page-catalog-content').masonry({
		itemSelector: '.index_page-catalog-item',
		percentPosition: true,
		columnWidth: '.grid-sizer'
	});

	// Адаптивный слайдер популярных товаров
	var mySwiper = new Swiper ('.swiper-container', {
		// Optional parameters
		autoplay: true,
		slidesPerView: 3,
		slidesPerGroup: 3,
		speed: 900,
		delay: 7000,
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
