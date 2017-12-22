$( document ).ready(() => {

    var mySwiper = new Swiper('.item_page-content-slider', {
		speed: 700,
		//spaceBetween: 20,
    });

	swiperThumbs(mySwiper, {
		// Our default options
		element: 'item_page-content-thumbs',
		activeClass: 'is-active',
		scope: '.sw'
		// Parent element that surrounds your Swiper 
		// html & Swiper thumbnail html to support multiple 
		// Swiper instances on one page.
	});

    $('.item_page-description-star').on('click', function() {
    	$(this).toggleClass('star-set');
    });

	$('.index_page-catalog-content').masonry({
		itemSelector: '.index_page-catalog-item',
		percentPosition: true,
		columnWidth: '.grid-sizer'
	});

	$('.item_page-content-thumbs .item_page-content-thumbs-img').on('click', function() {
		$('.item_page-content-thumbs .item_page-content-thumbs-img').removeClass('is-active');
    	$(this).addClass('is-active');
    });

	$('.item_page-content-thumbs').masonry({
		itemSelector: '.item_page-content-thumbs-img',
		percentPosition: true,
		gutter: 1,
		//columnWidth: '.gallery-sizer'
	});


});