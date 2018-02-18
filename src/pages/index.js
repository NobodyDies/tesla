import { contain, cover } from "contain-cover";

$( document ).ready(() => {

	// fixed/absolute position for navigation
	var sliderheight = $('.index_page-slider').height();

	$(window).on('resize', function(){
		sliderheight = $('.index_page-slider').height();
	});

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
			clickable: true,
		},
		// Navigation arrows
	});
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
		slide.append(canvas2)

		$(image).css({display: 'none'})
	})

	mainSlider.on('slideChangeTransitionEnd', () => {
		var prev = $(mainSlider.slides[mainSlider.previousIndex]);
		prev.css({opacity: 0, 'z-index': 0}).removeClass('removing').removeClass('inserting');
		var slide = $(mainSlider.slides[mainSlider.activeIndex]);
		slide.css({opacity: 1, 'z-index': 1}).removeClass('removing').removeClass('inserting');
		var image = slide.find('.index_page-slider-item--image')[0];
		$(image).css({display: 'block'})
		slide.find('canvas').remove();
	})

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


});
