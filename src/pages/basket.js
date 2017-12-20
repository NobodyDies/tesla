$( document ).ready((e) => {

	$('#next-step').click(function (e) {
		$('.basket_page-content-right').slideUp();
		$('.basket_page-content-left').slideDown();

		$('.basket_page-content-right').addClass( "hidden-basket" );

		window.scrollTo(0,0);
	});

});