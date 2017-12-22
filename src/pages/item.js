$( document ).ready(() => {

    var mySwiper = new Swiper('.item_page-content-slider', {
      //spaceBetween: 10,  
    });

	swiperThumbs(mySwiper, {
		// Our default options
		element: 'gallery-thumbs',
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

	$('.gallery-thumbs .gallery-thumbs-img').on('click', function() {
		$('.gallery-thumbs .gallery-thumbs-img').removeClass('is-active');
    	$(this).addClass('is-active');
    });

	$('.gallery-thumbs').masonry({
		itemSelector: '.gallery-thumbs-img',
		percentPosition: true,
		gutter: 1,
		//columnWidth: '.gallery-sizer'
	});


});