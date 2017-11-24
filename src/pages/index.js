$( document ).ready(() => {
	$('.index_page-catalog-content').masonry({
		itemSelector: '.index_page-catalog-item',
		percentPosition: true,
		columnWidth: '.grid-sizer'
	});

	// $('.index_page-popular-slider-wrapper').slick({
	// 	infinite: false,
	// 	speed: 300,
	// 	slidesToShow: 3,
	// 	slidesToScroll: 3,
	// 	responsive: [
	// 		{
	// 			breakpoint: 1024,
	// 			settings: {
	// 				slidesToShow: 2,
	// 				slidesToScroll: 2,
	// 			}
	// 		},
	// 		{
	// 			breakpoint: 600,
	// 			settings: {
	// 				slidesToShow: 2,
	// 				slidesToScroll: 2
	// 			}
	// 		},
	// 		{
	// 			breakpoint: 480,
	// 			settings: {
	// 				slidesToShow: 2,
	// 				slidesToScroll: 2
	// 			}
	// 		}
	// 		// You can unslick at a given breakpoint now by adding:
	// 		// settings: "unslick"
	// 		// instead of a settings object
	// 	]
	// });
});
