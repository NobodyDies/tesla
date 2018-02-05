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



/*
		$(function() {
		  // init controller
			var controller = new ScrollMagic.Controller({
				globalSceneOptions: {
					triggerHook: "onEnter", 
					duration: "80%"
				}
			});

			// build scenes
			new ScrollMagic.Scene({triggerElement: ".index_page-catalog"})
							.setTween(".index_page-popular-wrapper", {
								y: "20%", 
								ease: Linear.easeNone
							})
							.addTo(controller);
		});
*/


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


/*
var controller = new ScrollMagic.Controller();

// create a scene
new ScrollMagic.Scene({
        duration: 100,    // the scene should last for a scroll distance of 100px
        offset: 200       // start this scene after scrolling for 50px
    })
    .setPin(".index_page-catalog") // pins the element for the the scene's duration
    .addTo(controller); // assign the scene to the controller
*/

});
