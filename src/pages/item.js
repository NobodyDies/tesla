$(window).on('load', function () {

	// Masonry должен срабатывать только тогда, когда
	// загружен контент, с которым он будет работать
	$('.item_page-gallery-content').masonry({
		itemSelector: '.item_page-gallery-item',
		percentPosition: true,
		columnWidth: '.grid-sizer'
	});

	$('.item_page-slider-thumbs').masonry({
		itemSelector: '.item_page-slider-thumbs-img',
		percentPosition: true,
		gutter: 1,
		//columnWidth: '.gallery-sizer'
	});

});


$(document).ready(() => {

	// Слайдер изображений товара
	var mySwiper = new Swiper('.item_page-slider-wrapper', {
		speed: 700,
		navigation: {
			nextEl: '.item_page-slider-next',
			prevEl: '.item_page-slider-prev',
		},
		//spaceBetween: 20,
	});

	// Плагин (дополнение для Swiper) для миниатюр Swiper-слайдера
	swiperThumbs(mySwiper, {
		// Our default options
		element: 'item_page-slider-thumbs',
		activeClass: 'is-active',
		scope: '.sw'
		// Parent element that surrounds your Swiper 
		// html & Swiper thumbnail html to support multiple 
		// Swiper instances on one page.
	});

	// Переключатель активного класса миниатюрок слайдера
	mySwiper.on('slideChangeTransitionEnd', () => {

		var weAt = mySwiper.realIndex,
			littleImage = $(".item_page-slider-thumbs .item_page-slider-thumbs-img");

		if ( $(littleImage[weAt]).hasClass("is-active") ) {

		} else {
			littleImage.removeClass("is-active");
		}

		$(littleImage[weAt]).addClass("is-active");
	});

	// Анимация звёздочки у товара (добавить в избранное)
	$('.item_page-item-basket-star').on('click', function () {
		$(this).toggleClass('star-set');
	});

	// Класс для стилизации миниатюр слайдера
	$('.item_page-slider-thumbs-img').on('click', function () {
		$('.item_page-slider-thumbs .item_page-slider-thumbs-img').removeClass('is-active');
		$(this).addClass('is-active');
	});

	// Перемещаем блок с названием товара на маленьких экранах (опираемся на media)
	// Сделано из-за иного расположения блоков в мабильном макете
	var breakpoint = window.matchMedia('(max-width:767px)');

	var breakpointChecker = function breakpointChecker() {
		if (breakpoint.matches === true) {
			$('.item_page-item-heading').prependTo('.item_page');
			return;
		} else if (breakpoint.matches === false) {
			$('.item_page-item-heading').prependTo('.item_page-item');
			return;
		}
	};

	breakpoint.addListener(breakpointChecker);
	breakpointChecker();

});