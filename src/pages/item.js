$( document ).ready(() => {

    var mySwiper = new Swiper('.item_page-slider-wrapper', {
		speed: 700,
		navigation: {
			nextEl: '.item_page-slider-next',
			prevEl: '.item_page-slider-prev',
		},
		//spaceBetween: 20,
    });

	swiperThumbs(mySwiper, {
		// Our default options
		element: 'item_page-slider-thumbs',
		activeClass: 'is-active',
		scope: '.sw'
		// Parent element that surrounds your Swiper 
		// html & Swiper thumbnail html to support multiple 
		// Swiper instances on one page.
	});

    $('.item_page-description-star').on('click', function() {
    	$(this).toggleClass('star-set');
    });

	$('.item_page-gallery-content').masonry({
		itemSelector: '.item_page-gallery-item',
		percentPosition: true,
		columnWidth: '.grid-sizer'
	});

	$('.item_page-slider-thumbs-img').on('click', function() {
		$('.item_page-slider-thumbs .item_page-slider-thumbs-img').removeClass('is-active');
    	$(this).addClass('is-active');
    });

	$('.item_page-slider-thumbs').masonry({
		itemSelector: '.item_page-slider-thumbs-img',
		percentPosition: true,
		gutter: 1,
		//columnWidth: '.gallery-sizer'
	});


});