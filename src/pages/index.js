$( document ).ready(function() {
	$('.index_page-catalog-content').masonry({
		itemSelector: '.index_page-catalog-item',
		percentPosition: true,
		columnWidth: '.grid-sizer',
		horizontalOrder: true
	});
});
