$( document ).ready((e) => {

	// "Этапы" оплаты. Делаем всё как в макете.
	$('#next-step').click(function (e) {
		$('.basket_page-content-right').slideUp();
		$('.basket_page-content-left').slideDown();

		$('.basket_page-content-right').addClass( "hidden-basket" );

		window.scrollTo(0,0);
	});

	/* Маска для ввода номера телефона */
	$('#phone').mask('+7(999)-999-99-99');

	/* Маска для ввода номера телефона */
	$('#modal_phone').mask('+7(999)-999-99-99');

});