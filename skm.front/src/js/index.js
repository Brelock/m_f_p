let status = "JS - OK!";
function cl(arg1, arg2, arg3, arg4) {
	console.log(arg1, arg2 || '', arg3 || '', arg4 || '');
	return '-';
}

// cl(status);


var glob = {
	navMenuWrapper: null,
	navMenu: null,
	pageOverlay: null,
	accordionMenu: null,

	scrollTopButton: null,
}

// =================
@@include('frames/globalFunctions.js')
// ===============


var test = 'include js error';

$(document).ready(function() {
	// console.log('document ready')
	
	// =================Include Modules==============================

  /*@@include('frames/PopupModule.js')*/
  /*@@include('frames/ValidationModule.js')*/
	/*@@include('frames/AnimateBorderModule.js')*/
  /*@@include('frames/custom_Input_Type_number.js')*/
  @@include('frames/AccordionModule.js')
  /*@@include('frames/ToggleContentModule.js')*/
  @@include('frames/SwitchTabsModule.js')
  /*@@include('frames/TextLimitModule.js')*/
  /*@@include('frames/StickyBlockModule.js')*/
  /*@@include('frames/LazyLoadModule.js')*/
  @@include('frames/OpenCloseModule.js')
  /*@@include('frames/RadioOpenCloseModule.js')*/
 
	// =============================================================
	glob.navMenuWrapper = document.getElementById('navMenuWrapper');
	glob.navMenu = document.getElementById('navMenu');
	glob.pageOverlay = document.getElementById('pageOverlay');
	glob.scrollTopButton = document.getElementById('scrollTopButton');
	glob.sidebarMenu = document.getElementById('sidebarMenu');


	if (!$('body')) {console.log('jQuery Error')}
	// console.log(test);

	/*$('.mainHeader').on('click', '.menu-button', function(e) {
		globFunc.toggleButtonContent(this)	
	})*/

	$('.mainHeader').on('blur', '.menu-button', function() {
		// console.log('blur')
		if (this.classList.contains('active')) {
			globFunc.toggleButtonContent(this)			
		}
	})

	if (document.documentElement.clientWidth < 768) {
		$('.mainHeader').on('click', '.searchButton', function() {

			globFunc.toggleButtonContent(this)
			let target = document.getElementById(this.dataset.target);

			if (target) {
				this.classList.contains('active') ?
					globFunc.addClassTo(target, 'js_animate') :
					globFunc.removeClassFrom(target, 'js_animate');
			}
	  });
	}


  // ---------Popups Block-------

	/*$('body').on('click', '.searchButton', function() {
  	// e.preventDefault();
  	let modal = $('#popupSearch');
  	if ( modal.length ) {
  		glob.PopupModule.openPopup(modal, "js_openPopup_search");
  	}
  });*/

  /*$('body').on('click', '.button', function() {
  	// e.preventDefault();
  	let modal = document.getElementById('id');
  	if ( modal ) {
  		glob.PopupModule.openPopup(modal);
  	}
  });*/

  // ---------Accordion Blocks-------
	$('.accordionMenu').on('click', '.accordionButton', function(e) {
		// console.time('click accordion working time');
		let isDescAccordion = glob.sidebarMenu && glob.sidebarMenu.classList.contains('descAccordion');
		// console.log(isDescAccordion)
		if ( isDescAccordion || document.documentElement.clientWidth < 992) {
			e.stopPropagation();
			let submenuBlock = this.parentElement.nextElementSibling;
			let button = this;

			/*this.classList.contains('sidebarOpenButton') ? 
				submenuBlock = this.parentElement.nextElementSibling : 
				submenuBlock = this.nextElementSibling;*/

		// let siblingsBlocks = document.querySelectorAll('#publicInfoPage article.publicInfo-block .titleBlock + .hiddenContent');

			globFunc.toggleButtonContent(button);
			glob.AccordionModule.toggleContent("withoutSiblings", button, submenuBlock );
			// AccordionModule.toggleContent("withSiblings", button, submenuBlock, siblingsBlocks );				

		}
		// console.timeEnd('click accordion working time');
	})

	// ----------- List Items Aligment ----------------
	var itemsList = document.getElementById('itemsList');
	var aligmentButtons = document.querySelectorAll('.aligmentButtons .button');

	if (itemsList) {
		let activeAligmentButton = document.querySelector('.aligmentButtons .button.active');
		itemsList.classList.add(activeAligmentButton.dataset.aligment);
		globFunc.animateBlock(itemsList);		
	}

	$('.aligmentButtons').on('click', '.button', function() {
		if (itemsList) {
			if ( !this.classList.contains('active') ) {
				for (var i = 0; i < aligmentButtons.length; i++) {
					aligmentButtons[i].classList.remove('active');
					let aligmentClass = aligmentButtons[i].dataset.aligment;
					itemsList.classList.contains(aligmentClass) ? 
						itemsList.classList.remove(aligmentClass) : null;
				}

				this.classList.add('active');
				itemsList.classList.add(this.dataset.aligment);
				globFunc.animateBlock(itemsList);
			}
		}
	}) 

  // ---------Text Limit-------
	/*let textBlocks = document.querySelectorAll('.selector');
	textBlocks.length ? TextLimitModule.sliceText(textBlocks, 180) : null;*/
	// $(".description .ellipsis").dotdotdot({	height: 80,	truncate: "word",	watch: true});
	// $(".title.ellipsis").dotdotdot({	height: 85,	truncate: "word",	watch: true});
	

	// ----------Scroll-to Section---------------

	$('#scrollTopButton').on('click', function() {
		
		$('html, body').animate({
			scrollTop: $("body").offset().top
		}, 500);
	})
	
	/*$('body').on('click', 'article.story-item', function() {
		
		$('html, body').animate({
			scrollTop: $("#" + $(this).attr('data-story-id') ).offset().top
		}, 500);
	})*/

	// ---------- Sticky block---------------
	/*var stickyAsideBlock = document.querySelector('aside.sticky');

	if ( stickyAsideBlock && document.documentElement.clientWidth > 991 ) {
		var targetStickBlock = stickyAsideBlock.firstElementChild;
		let relativeBlock = document.getElementById(stickyAsideBlock.dataset.stickTo)

		glob.StickyBlockModule.toStick(targetStickBlock, relativeBlock);		
	}*/

	// ---------Clean empty Tags-----
	var textBlocks = document.querySelectorAll('.description > p');

	if (textBlocks.length) {
		for (var i = 0; i < textBlocks.length; i++) {
			// console.log(!!textBlocks[i].innerHTML)
			textBlocks[i].innerHTML ? null : textBlocks[i].parentElement.removeChild(textBlocks[i]);
		}
	}

	// -------Select----------
	/*$(".chosen-wrapper select").chosen({
	  disable_search_threshold: 8,
	  no_results_text: "Ничего не найдено!",
	  width: "100%"
	});*/

	window.onscroll = function () {
		// console.log(glob.header)
    // ------------------
    if (glob.scrollTopButton) {
    	if (globFunc.getCurrentYPosition() > 600) { globFunc.addClassTo(glob.scrollTopButton, 'js_visible'); }
    	else { globFunc.removeClassFrom(glob.scrollTopButton, 'js_visible'); }
    } 
	}

	// ===========Initializations=============

	$('#mainSlider').nivoSlider({
		effect: 'sliceDownLeft',
	})

	$('.ourProductsSlider').slick({
		// rtl: document.body.classList.contains('rtl'),
		dots: false,
		arrows: true,
		slidesToShow: 4,

		// fade: true,
		autoplay: false,
		speed: 700,
		// waitForAnimate: false,
		lazyLoad: 'progressive',
		prevArrow: '<button class="slick-prev slick-arrow" aria-label="prev" type="button" style=""><i></i></button>',
		nextArrow: '<button class="slick-next slick-arrow" aria-label="next" type="button" style=""><i></i></button>',
		responsive: [
			{
				breakpoint: 992,
				settings: {
					arrows: false,
					// dots: false
					// slidesToShow: 1,
				}
			},
			{
				breakpoint: 768,
				settings: {
					arrows: false,
					// dots: false
					slidesToShow: 1,
				}
			}
		]
	});

	$('#brandsSlider').slick({
		dots: false,
		arrows: true,
		slidesToShow: 6,
		// fade: true,
		autoplay: false,
		speed: 800,
		waitForAnimate: false,
		lazyLoad: 'progressive',
		prevArrow: '<button class="slick-prev slick-arrow" aria-label="prev" type="button" style=""><i></i></button>',
		nextArrow: '<button class="slick-next slick-arrow" aria-label="next" type="button" style=""><i></i></button>',
		responsive: [
			{
				breakpoint: 992,
				settings: {
					arrows: false,
					slidesToShow: 4,
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 3,
				}
			}
		]
	});

	// -------------
		var productSlider = $('#productSlider');
		var productSliderNav = $('#productSliderNav');

		function initializeSliders(slider1, slider2, slidesQuantity) {
		  // let slidesToShow = slidesQuantity > 4 ? 4 : slidesQuantity
		  slider1.slick({
		    // rtl: document.body.classList.contains('rtl'),
		    slidesToShow: 1,
		    slidesToScroll: 1,
		    infinite: true,
		    arrows: false,
		    fade: true,
		    prevArrow: '<button class="slick-prev slick-arrow" aria-label="prev" type="button" style=""><i></i></button>',
		    nextArrow: '<button class="slick-next slick-arrow" aria-label="next" type="button" style=""><i></i></button>',
		    // fade: true,
		    // asNavFor: '.plant-images-slider-nav',
		    waitForAnimate: false,
		    /*responsive: [
		    	{
		    		breakpoint: 768,
		    		settings: {
		    			arrows: false,
		    		}
		    	}
		    ]*/
		  })


		  if (slider2) {

		    slider2.slick({
		      // rtl: document.body.classList.contains('rtl'),
		      slidesToShow: slidesQuantity > 4 ? 4 : slidesQuantity,
		      slidesToScroll: 1,
		      infinite: true,
		      // asNavFor: '.plant-images-slider',
		      waitForAnimate: true,
		      dots: false,
		      arrows: true,
		      prevArrow: '<button class="slick-prev slick-arrow" aria-label="prev" type="button" style=""><i></i></button>',
		      nextArrow: '<button class="slick-next slick-arrow" aria-label="next" type="button" style=""><i></i></button>',
		      centerMode: false,
		      focusOnSelect: true,

		      // accessibility: false,
		      responsive: [
			      /*{
			      	breakpoint: 1440,
			      	settings: {	
			          slidesToShow: slidesQuantity > 5 ? 5 : slidesQuantity,
			      	}
			      },*/
			      {
			      	breakpoint: 1280,
			      	settings: {	
			          slidesToShow: slidesQuantity > 3 ? 3 : slidesQuantity,
			      	}
			      },
			      {
			      	breakpoint: 991,
			      	settings: {	
			          slidesToShow: slidesQuantity > 4 ? 4 : slidesQuantity,
			      	}
			      },
			      {
			      	breakpoint: 768,
			      	settings: {	
			          slidesToShow: slidesQuantity > 3 ? 3 : slidesQuantity,
			      	}
			      },
			      {
			        breakpoint: 500,
			        settings: {
			          slidesToShow: slidesQuantity > 2 ? 2 : slidesQuantity,
			        }
			      },

		      ]
		    });
		  }
		}

		function highlightSlide(sliderElement, nextId, slidesQuantity, currentId) {
		  let nextClonedId = nextId + slidesQuantity;
		  let currentClonedId = currentId != undefined ? currentId + slidesQuantity : null;
		
		  let nextNavSlideElement = sliderElement.querySelector('.slick-slide[data-slick-index="' + nextId + '"]');
		  let clonedNextNavSlideElement = sliderElement.querySelector('.slick-slide[data-slick-index="' + nextClonedId + '"]');
		  
		  let currentNavSlideElement = sliderElement.querySelector('.slick-slide[data-slick-index="' + currentId + '"]');
		  let clonedCurrentNavSlideElement = sliderElement.querySelector('.slick-slide[data-slick-index="' + currentClonedId + '"]');

		  if (currentNavSlideElement) { 
		    currentNavSlideElement.classList.remove('js_mainSlideActive'); 
		  }
		  if (clonedCurrentNavSlideElement) { 
		    clonedCurrentNavSlideElement.classList.remove('js_mainSlideActive'); 
		  }
		  
		  nextNavSlideElement.classList.add('js_mainSlideActive');
		  if (clonedNextNavSlideElement) { clonedNextNavSlideElement.classList.add('js_mainSlideActive'); }
		}

		if (productSlider[0] && productSliderNav[0]) {
		  // var productSliderNavWrap = $('.navSliderWrapper');
		  var productSliderNavWrap = productSliderNav;
		  // if () {
		  var slidesQuantity = productSliderNav[0].children.length;
		  var widthAllSlides = slidesQuantity * 195;

		  // console.log(widthAllSlides)
		  var maxWidthNavSlider = widthAllSlides > 840 ? 840 + (7 * slidesQuantity) : widthAllSlides + (7 * slidesQuantity);
		  if (document.documentElement.clientWidth > 768 ) {
		    productSliderNavWrap.css( "max-width",  + maxWidthNavSlider + "px" );
		  }

		  productSlider.on('init', function (event, slick) {
		  	// console.log(slick.$slideTrack.height() + 'px')
		  	var slides = document.querySelectorAll('.productSliderTop .slick-slide');

		  	if (slides.length) {
		  		for (var i = 0; i < slides.length; i++) {
		  			slides[i].style.height = slick.$slideTrack.height() + 'px'
		  		}
			  }
			  
		  	// slick.$slides.css('height', slick.$slideTrack.height() + 'px');
		  });

		  initializeSliders(productSlider, productSliderNav, slidesQuantity);

		  highlightSlide(productSliderNav[0], 0, slidesQuantity );

		  productSlider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {

		    highlightSlide(productSliderNav[0], nextSlide, slidesQuantity, currentSlide );
		    // console.log(plantSliderNav.slick('slickGetOption', 'slidesToShow'))

		    if ( slidesQuantity > productSliderNav.slick('slickGetOption', 'slidesToShow') ) {
		      productSliderNav.slick('slickGoTo', nextSlide);
		    }
		  });

		  jQuery('.navSliderWrapper').on('click', '.slide', function() {
		    let nextSlideId = this.dataset.slickIndex == slidesQuantity ? 0 : this.dataset.slickIndex;

		    // console.log(nextSlideId)
		    productSlider.slick('slickGoTo', nextSlideId);
		  })
		  // }

		  // console.log(jQuery('.plant-images-slider-nav')[0])
		  // console.log(getChildsTotalWidth(jQuery('.plant-images-slider-nav')[0]))
		  // var widthAllSlides = getChildsTotalWidth( plantSliderNav[0] );
		}

		(function() {
			if ( ! $('.products-list .hiddenImg').length ) return;
		  
			
		  const hiddenImages = $('.products-list .hiddenImg');
			hiddenImages.each(function (idx, img) {
			  const $img = $(img);
			  const isOnePhoto = $img.attr('src').includes('zaglushka');
			  if (isOnePhoto) {
				const $productCardContainer = $img.closest('.product-card-container')
				$productCardContainer.addClass('product-card-container--wo-hover')
			  }
			})
		  })();

		  $('.popup_img_js').slickLightbox({
			slick: {
			  itemSelector: 'a',
			  navigateByKeyboard: true,
			  dots: true,
			  infinite: true,
			  slidesToShow: 1,
			  slidesToScroll: 1,
			  mobileFirst: true,
			  enabled:true
			}
		  });

});


window.onload = function() {
	console.log('window load')
	// $('#page-preloader').fadeOut('slow');

	// glob.LazyLoadModule.initLazy('lazyBlock')
}
