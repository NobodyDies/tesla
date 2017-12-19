$( document ).ready(() => {
	$('.index_page-catalog-content').masonry({
		itemSelector: '.index_page-catalog-item',
		percentPosition: true,
		columnWidth: '.grid-sizer'
	});

/*
	$('.index_page-popular-slider-wrapper').slick({
		infinite: false,
		speed: 300,
		slidesToShow: 3,
		slidesToScroll: 3,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
				}
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2
				}
			}
			// You can unslick at a given breakpoint now by adding:
			// settings: "unslick"
			// instead of a settings object
		]
	});
*/




	var mySwiper = new Swiper ('.swiper-container', {
	    // Optional parameters
	    autoplay: true,
	    slidesPerView: 3,
	    slidesPerGroup: 3,
	    speed: 300,
	    spaceBetween: 40,
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

      $('.popular-controls-link').appendTo('.index_page-popular-wrapper > .content-wrapper');
      return;

   } else if (breakpoint.matches === false) {
      
      $('.popular-controls-link').appendTo('.popular-controls');
      return;
   }
};

breakpoint.addListener(breakpointChecker);

breakpointChecker();


});
