$( document ).ready(() => {

/*
	$(".index_page").on("scroll", function(e) {

		if ($(".index_page").scrollTop > 60) {
			console.log('всё, пиздец, прошёл');
			$(".navigation").addClass("fix-search");
			$(".navigation").removeClass("transparent");
		} else {
			console.log('а вот нихуя');
			$(".navigation").removeClass("fix-search");
		}
	});
*/

//$('.navigation').css('position', 'absolute');

$(window).scroll(function(){
	if ($(window).scrollTop() >= 300) {
		console.log('всё, пиздец, прошёл');
		$('.navigation').removeClass('transparent');
		$('.navigation').addClass('nav-fixed');
	}
	else {
		console.log('а вот нет');
		$('.navigation').addClass('transparent');
		$('.navigation').removeClass('nav-fixed');
	}
});



/*
	//navigation background transparency
	if($(window).scrollTop() > 60) {
		$(".navigation").removeClass("transparent");
	} else {
		$(".navigation").addClass("transparent");
	}

	$(window).on("scroll", function() {
		if($(window).scrollTop() > 60) {
			$(".navigation").removeClass("transparent");
		} else {
			$(".navigation").addClass("transparent");
		}
	});
*/


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
