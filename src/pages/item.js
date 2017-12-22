$( document ).ready((e) => {

    var galleryTop = new Swiper('.gallery-top', {
      //spaceBetween: 10,
    });
    var galleryThumbs = new Swiper('.gallery-thumbs', {
      spaceBetween: 1,
      //centeredSlides: true,
      //slidesPerView: 'auto',
      touchRatio: 0.2,
      slideToClickedSlide: true,
    });
    galleryTop.controller.control = galleryThumbs;
    galleryThumbs.controller.control = galleryTop;

    $('.item_page-description-star').on('click', function() {
    	$(this).toggleClass('star-set');
    });

	$('.index_page-catalog-content').masonry({
		itemSelector: '.index_page-catalog-item',
		percentPosition: true,
		columnWidth: '.grid-sizer'
	});

});