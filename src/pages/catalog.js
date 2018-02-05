$( document ).ready(() => {

	$(function() {
	  // init controller
		var controller = new ScrollMagic.Controller({
			globalSceneOptions: {
				triggerHook: "onEnter", 
				duration: "80%"
			}
		});

		// build scenes
/*
		new ScrollMagic.Scene({triggerElement: ".catalog_page-catalog .content-wrapper"})
						.setTween(".catalog_page-catalog-content", {
							y: "-30%", 
							ease: Linear.easeNone
						})
						.addTo(controller);
/*
		new ScrollMagic.Scene({triggerElement: ".table2"})
						.setTween(".ref-pic2", {
							y: "20%", 
							ease: Linear.easeNone
						})
						.addTo(controller);

		new ScrollMagic.Scene({triggerElement: ".table3"})
						.setTween(".ref-pic3", {
							y: "20%", 
							ease: Linear.easeNone
						})
						.addTo(controller);
*/
	});

});