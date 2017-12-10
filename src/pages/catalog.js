$( document ).ready(() => {
	$('.catalog_page-catalog-content').masonry({
		itemSelector: '.catalog_page-catalog-item',
		percentPosition: true,
		columnWidth: '.grid-sizer',
		horizontalOrder: true,
	});

});