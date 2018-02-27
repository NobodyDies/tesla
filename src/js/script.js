import style from './../sass/style.scss'

svg4everybody();

objectFitImages();

// Мобильное меню (открытие и затемнение остального контента)
$('.navigation-mobile > .navbar-toggle').on('click', function () {

	$('.navigation-mobile').toggleClass('navigation-mobile-opened');

	if ($('.navigation-mobile').hasClass('navigation-mobile-opened')) {

		$(".darkness").css({display: "block"});
		$(".darkness").animate({opacity: "0.5"}, 200);

	} else {

		$(".darkness").animate({opacity: "0"}, 200, function () {
			$(".darkness").css({display: "none"});
		});

	}
});

// Закрытие меню по клику в область затемнённого контента
$('.darkness').on('click', function () {

	$('.navigation-mobile').removeClass('navigation-mobile-opened');

	$(".darkness").animate({opacity: "0"}, 200, function () {
		$(".darkness").css({display: "none"});
	});
});

// Насильно убираем затемнение контента 
// на десктопах (опираемся на media)
var breakpoint = window.matchMedia('(max-width:991px)');

var breakpointChecker = function breakpointChecker() {

	if (breakpoint.matches === false) {

		$(".darkness").css({display: "", opacity: ""});
		return;

	} else if (breakpoint.matches === true) {

		if ($(".navigation-mobile").hasClass("navigation-mobile-opened")) {

			$(".darkness").css({display: "block", opacity: 0.5});
		} else {
			$(".darkness").css({display: "", opacity: ""});
		}
		return;
	}
};

breakpoint.addListener(breakpointChecker);

breakpointChecker();

/* Preloader */

$(window).on('load', function () {
	var $preloader = $('.page-preloader'),
		$spinner = $preloader.find('.preloader');
	$spinner.fadeOut();
	$preloader.delay(500).fadeOut('slow');
});

// Анимация полоски для кнопки "Подробнее"
// Сначала проверяем, есть ли такой блок, 
// затем - вешаем класс для анимации

if ($(".link-more-info").length) {
	$(".link-more-info").hover(
		function () {
			$(".link-more-info div span").removeClass('link-more-out').addClass('link-more-over');
		},
		function () {
			$(".link-more-info div span").removeClass('link-more-over').addClass('link-more-out');
		}
	);
}


//======== Анимация открытия корзины =======//

// Переменные fullscreen-корзины для мобильных
// Высота окна
var windowHeight = window.innerHeight ? window.innerHeight : $(window).height();

var windowWidth = 0;

// Высота обёртки корзины (-60px из-за меню)
var basketWrapperHeight = windowHeight - 60;

// Высота корзины (-60px из-за меню и 50 px из-за кнопки "Сделать заказ")
var basketHeight = windowHeight - 60 - 50;

// Позиция корзины для анимации
var basketPosition = -(windowHeight - 60);

// Обёртка корзины
var basketWrapper = $(".navigation .basket-goods-panel");

// Корзина
var basket = $(".navigation .basket-goods");

// Первоначальные размеры и позиция корзины
if ( window.matchMedia('(max-width:767px)').matches ) {
	basketRuler(true);
} else {
	basketRuler(false);
}

// Размеры и позиция корзины на ресайзе окна
$(window).on('resize', function () {
	if ( window.matchMedia('(max-width:767px)').matches ) {
		basketRuler(true);
	} else {
		basketRuler(false);
	}
});

$(window).on('scroll', function () {
	if ( window.matchMedia('(max-width:767px)').matches ) {
		basketRuler(true);
	} else {
		basketRuler(false);
	}
});

// Функция для управления размерами и положением корзины
function basketRuler(mobile) {
	if (mobile) {
		windowHeight = window.innerHeight ? window.innerHeight : $(window).height();
		basketWrapperHeight = windowHeight - 60;
		basketHeight = windowHeight - 60 - 50;
		basketPosition = -(windowHeight - 60);

		basketWrapper.css({height: basketWrapperHeight + "px"});
		basket.css({height: basketHeight + "px"});

		// Если корзина открыта, то её позиция...
		if ($('.basket').hasClass('basket-opened')) {
			basketWrapper.css({bottom: basketPosition + "px"});
			$("html, body").css({overflow: "hidden"});
		} else {
			basketWrapper.css({bottom: "100%"})
			$("html, body").css({overflow: "visible"});
		}
	} else {
		basketWrapper.css({height: "427px"});
		basket.css({height: "377px"});
		basketHeight = 377;
		basketPosition = -427;

		$("html, body").css({overflow: "visible"});

		// Если корзина открыта, то её позиция...
		if ($('.basket').hasClass('basket-opened')) {
			basketWrapper.css({bottom: basketPosition + "px"});
		} else {
			basketWrapper.css({bottom: "100%"})
		}
	}
}

// Кнопка открытия корзины
$('.basket').on('click', function () {

	$(this).toggleClass('basket-opened');

	if ($(this).hasClass('basket-opened')) {

		$(".basket-goods-panel").css({bottom: basketPosition + "px", opacity: 1});

	} else {
		$(".basket-goods-panel").css({bottom: "100%", opacity: 0})
	}
});

// Скроллбар внутри корзины (корзина в меню)
(function ($) {
	$(window).on("load", function () {
		$(".basket-wrapper ul.basket-goods").mCustomScrollbar({
			setHeight: basketHeight,
			scrollEasing: "linear",
			theme: "minimal-dark"
		});
	});
})(jQuery);

//==========================================//


// Раскрытие вложенных меню в футере
$('ul.footer-top-mobile li > a').click(function (e) {

	e.preventDefault();

	$(this).parent().siblings().find('div').slideUp();

	$(this).siblings("div").slideToggle();
});

// Анимация звёздочек у товаров (добавление товара в избранное)
if ($('.item-star').length) {
	$('.item-star').click(function () {

		$(this).toggleClass("star-checked");
	});
}

// Browsertype
if (/MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent)) {
	// This is IE
	$("html body").addClass("ie");
}

if (/Edge\/\d./i.test(navigator.userAgent)){
	// This is Microsoft Edge
	$("html body").addClass("ie");
}

if (/(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/i.test(navigator.userAgent)){
	// This is Chrome
	$("html body").addClass("chrm");
}