let status = "JS - OK!";
function cl(arg1, arg2, arg3, arg4) {
	console.log(arg1, arg2 || '', arg3 || '', arg4 || '');
	return '-';
}

// cl(status);


var glob = {
	header: null,
	navMenuWrapper: null,
	navMenu: null,
	// navPrevButton: null,

	pageOverlay: null,
	scrollTopButton: null,
}

// =================
@@include('frames/globalFunctions.js')
// ===============

$(document).ready(function() {
	// console.log('document ready')
	
	// =================Include Modules==============================

  @@include('frames/ToggleContentModule.js')
  @@include('frames/OpenCloseModule.js')
  @@include('frames/RadioOpenCloseModule.js')
  @@include('frames/SwitchTabsModule.js')
  @@include('frames/AccordionModule.js')
  @@include('frames/PopupModule.js')
  
	// =============================================================
	glob.navMenuWrapper = document.getElementById('navMenuWrapper');
	glob.navMenu = document.getElementById('navMenu');
  glob.pageOverlay = document.getElementById('pageOverlay');

	if (!$('body')) {console.log('jQuery Error')}
	// console.log(test);
	
	// ---------Header Menu---------
	$('#burgerButton').on('click', function() {
		glob.navMenuWrapper.parentElement.classList.add('active');
		glob.navMenuWrapper.classList.add('js_showSlide');
    globFunc.showOverlay("menu", glob.pageOverlay);
	})

	$('#closeMenuButton').on('click', function() {
		glob.navMenuWrapper.parentElement.classList.remove('active');
		glob.navMenuWrapper.classList.remove('js_showSlide');
		var openSubs = glob.navMenuWrapper.getElementsByClassName('js_showSlide');
		// console.log(openSubs)

		for (var i = 0; i < openSubs.length; i++) {
			openSubs[i].classList.remove('js_showSlide')
		}

    globFunc.hideOverlay("menu", glob.pageOverlay);
	})

	$('#navMenu').on('click', '.subMenuButton', function() {
		// console.log(this.nextElementSibling)
		this.nextElementSibling.classList.contains('js_showSlide') ? 
			null : this.nextElementSibling.classList.add('js_showSlide');

			var prevButton = document.getElementById('prevMenuButton');

			prevButton.classList.contains('js_show') ? null : prevButton.classList.add('js_show');
	})

	$('#prevMenuButton').on('click', function() {
		var openSubs = glob.navMenuWrapper.getElementsByClassName('js_showSlide');

		if (openSubs.length) {
			openSubs[openSubs.length-1].classList.remove('js_showSlide')
		}
		if (openSubs.length < 1) {
			this.classList.contains('js_show') ? this.classList.remove('js_show') : null;			
		}
	})

	$('#navMenu').on('click', '.descMenuButton', function(e) {
		// console.log(this)
		if (e.target.classList.contains('descMenuButton') || e.target.classList.contains('descBurgerIcon')) {
			var targetBlock = this.querySelector('.submenuWrapper');
			if (targetBlock) {
				var _this = this;

				if (!this.classList.contains('active')) {
					globFunc.showOverlay("menu", glob.pageOverlay);					
					targetBlock.style.height = targetBlock.firstElementChild.offsetHeight + 'px';	
					setTimeout(function() {_this.classList.add('active')}, 400);					
				} else {
					this.classList.remove('active')
					targetBlock.style.height = 0;
					globFunc.hideOverlay("menu", glob.pageOverlay);					
				}
			}

		}
	})


	if ( document.documentElement.clientWidth > 991 ) {
		var mainSubmenu, maxHeight = 0;
		const allSubMenus = glob.navMenu.getElementsByClassName('submenu');
		
		for (var i = 0; i < allSubMenus.length; i++) {
			
		}
		// const allItems = glob.navMenu.getElementsByClassName('submenu')

		/*if (allSubMenus.length) {
			mainSubmenu = allSubMenus[0];

			for (var i = 0; i < allSubMenus.length; i++) {
				let menuHeight = allSubMenus[i].offsetHeight;
				menuHeight > maxHeight ? maxHeight = menuHeight : null;
			}

			mainSubmenu.style.height = maxHeight + 'px';
		}*/
		// var submenuHeight = glob.navMenu
	} else {
		var mainSubmenu = glob.navMenuWrapper.firstElementChild,
				maxHeight = mainSubmenu.offsetHeight;
		var allSubMenus = glob.navMenu.getElementsByClassName('submenu');

		/*if (allSubMenus.length) {

			for (var i = 0; i < allSubMenus.length; i++) {
				let menuHeight = allSubMenus[i].offsetHeight;
				menuHeight > maxHeight ? maxHeight = menuHeight : null;
			}

			for (var i = 0; i < allSubMenus.length; i++) {
				allSubMenus[i].style.height = maxHeight - 40 + 'px';
			}

			mainSubmenu.style.height = maxHeight + 'px';
		}*/
	}

	$('.mainHeader').on('click', '.menu-button', function() {
		globFunc.toggleButtonContent(this)	
	})

	$('.mainHeader').on('blur', '.menu-button', function() {
		// console.log('blur')
		if (this.classList.contains('active')) {
			globFunc.toggleButtonContent(this)			
		}
	})

	$('.mainHeader').on('click', '.menu-group_button', function() {
		if ( document.documentElement.clientWidth < 991 ) {
			globFunc.toggleButtonContent(this);
	
			const mainSubmenu = glob.navMenuWrapper.firstElementChild;
			// const target = document.getElementById('phones-menu');
			const target = this.nextElementSibling;

			if (target) {
				globFunc.dropDown(this, target, mainSubmenu);
			}
		}
	})


  // ---------Popups Block-------

	$('body').on('click', '.searchButton', function() {
  	// e.preventDefault();
  	let modal = $('#popupSearch');
  	if ( modal.length ) {
  		glob.PopupModule.openPopup(modal, "js_openPopup_search");
  	}
  });

  $('body').on('click', '.addFeedback', function() {
  	// e.preventDefault();
  	let modal = document.getElementById('popupFeedback');
  	if ( modal ) {
  		glob.PopupModule.openPopup(modal);
  	}
  });

  // ---------Accordion Blocks-------
	$('.accordionMenu').on('click', '.accordionButton', function(e) {
		// console.time('click accordion working time');

		// if (document.documentElement.clientWidth < 992) {
			e.stopPropagation();
			let submenuBlock = this.nextElementSibling;
			let button = this;

		// let siblingsBlocks = document.querySelectorAll('#publicInfoPage article.publicInfo-block .titleBlock + .hiddenContent');

			globFunc.toggleButtonContent(button);
			glob.AccordionModule.toggleContent("withoutSiblings", button, submenuBlock );
			// AccordionModule.toggleContent("withSiblings", button, submenuBlock, siblingsBlocks );				

		// }
		// console.timeEnd('click accordion working time');
	})

	// ---------Clean empty Tags-----
	var textBlocks = document.querySelectorAll('.description > p');

	if (textBlocks.length) {
		for (var i = 0; i < textBlocks.length; i++) {
			textBlocks[i].innerHTML ? null : textBlocks[i].parentElement.removeChild(textBlocks[i]);
		}
	}

  // ---------Text Limit-------
	// $('.two-lines').ellipsis({type: 'lines',count: 2});
	// $('.three-lines').ellipsis({type: 'lines',count: 3});
	$(".description .ellipsis").dotdotdot({	height: 80,	truncate: "word",	watch: true});
	$(".title.ellipsis").dotdotdot({	height: 85,	truncate: "word",	watch: true});
	
	// ----------Scroll-to Section---------------
	
	$('.productPage').on('click', '.scrollButton', function() {
		var target = this.dataset.scrollTo;
		var targetTab = document.querySelector('[data-target="'+target+'"]');

		targetTab ? targetTab.click() : null;

		$('html, body').animate({
			scrollTop: $('#'+target).offset().top - 100
		}, 500);
	})

	// -------Select----------
	$(".chosen-wrapper select").chosen({
	  disable_search_threshold: 8,
	  no_results_text: "Ничего не найдено!",
	  width: "100%"
	});



	// ---------- Sticky block---------------
	/*var stickyAsideBlock = document.querySelector('aside.sticky');

	if ( stickyAsideBlock && document.documentElement.clientWidth > 991 ) {
		var targetStickBlock = stickyAsideBlock.firstElementChild;
		let relativeBlock = document.getElementById(stickyAsideBlock.dataset.stickTo)

		glob.StickyBlockModule.toStick(targetStickBlock, relativeBlock);		
	}*/

	$('.quantity-input').each(function() {
	  var spinner = $(this),
	  input = spinner.find('input[type="number"]'),
	  btnUp = spinner.find('.quantity-up'),
	  btnDown = spinner.find('.quantity-down'),
	  min = input.attr('min'),
	  max = input.attr('max');

	  btnUp.click(function() {

	    var oldValue = parseFloat(input.val());
	    if (oldValue >= max) {
	        var newVal = oldValue;
	    } else {
	        var newVal = oldValue + 1;
	    }

	    spinner.find("input").val(newVal);

	    spinner.find("input").trigger("change");

	  });

	  btnDown.click(function() {

	    var oldValue = parseFloat(input.val());
	    if (oldValue <= min) {
	        var newVal = oldValue;
	    } else {
	        var newVal = oldValue - 1;
	    }
	    spinner.find("input").val(newVal);
	    spinner.find("input").trigger("change");
	  });
	});



	// ===========Initializations=============

	// AnimateBorder(document.querySelectorAll('.animated-border-block svg'), {
	// 	borderWidth: 3,
	// 	shadedSection: 100,
	// 	transparentSection: 25,
	// 	reverse: false,
	// 	radius: true 
	// })

	$('#mainSlider').slick({
		// rtl: document.body.classList.contains('rtl'),
		dots: false,
		arrows: true,
		dots: true,
		speed: 1000,
		prevArrow: '<button class="slick-prev slick-arrow" aria-label="prev" type="button" style=""><i></i></button>',
		nextArrow: '<button class="slick-next slick-arrow" aria-label="next" type="button" style=""><i></i></button>',
		responsive: [
			{
				breakpoint: 768,
				settings: {
					// arrows: false,
					dots: false
				}
			}
		]
	});

	// -------
	var $prodSliders = $('.productsSlider');
	// var $topProdSlider = $('#topProdSlider');
	// var topProdSlideCount = null;
	// var newProdSlideCount = null;

	$prodSliders.on('beforeChange', function(event, slick, currentSlide, nextSlide){
	  setCurrentSlideNumber(slick.$slider, nextSlide);
	});

	function setSlideCount(operationsBlock) {
	  operationsBlock.find('.totalSlides').text(slideCount);
	}

	function setCurrentSlideNumber(slider, currentSlide) {
	  var $currentBlock = slider.parent().find('.operationsBlock > .currentSlide');

	  $currentBlock.text(currentSlide + 1);
	}

	$prodSliders.on('init', function (event, slick) {
		// if (slick.$slider[0].id == 'topProdSlider') {	topProdSlideCount = slick.slideCount;	}
		// else if (slick.$slider[0].id == 'newsProdSlider') {	newProdSlideCount = slick.slideCount;	}

	  var $operationsBlock = slick.$slider.parent().find('.operationsBlock');
		
	  $operationsBlock.find('.totalSlides').text(slick.slideCount);
	  $operationsBlock.find('.currentSlide').text(slick.currentSlide + 1);

		// setSlideCount($operationsBlock);
		// setCurrentSlideNumber(slick.currentSlide);
		// console.log(slick.$slider[0].classList)
		var slides = document.querySelectorAll('.productsSlider .slick-slide');

		if (slides.length) {
			for (var i = 0; i < slides.length; i++) {
				slides[i].style.height = slick.$slideTrack.height() + 'px'
			}
		}
		// slick.$slides.css('height', slick.$slideTrack.height() + 'px');
	});

	$('.productsSlider').slick({
		// rtl: document.body.classList.contains('rtl'),
		dots: false,
		arrows: true,
		prevArrow: '<button class="slick-prev slick-arrow" aria-label="prev" type="button" style=""><i></i></button>',
		nextArrow: '<button class="slick-next slick-arrow" aria-label="next" type="button" style=""><i></i></button>',
		slidesToShow: 5,
		slidesToScroll: 1,
		autoplay: false,
		speed: 800,
		autoplaySpeed: 4500,
		responsive: [
			{
				breakpoint: 1400,
				settings: {
					// arrows: false,
					slidesToShow: 4,
					slidesToScroll: 1
				}
			},	
			{
				breakpoint: 992,
				settings: {
					// arrows: false,
					slidesToShow: 3,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 768,
				settings: {
					// arrows: false,
					slidesToShow: 2,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 450,
				settings: {
					// arrows: false,
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	})


	var productSlider = $('#productSliderTop');
	var productSliderNav = $('#productSliderNav');

	function initializeSliders(slider1, slider2, slidesQuantity) {
	  // let slidesToShow = slidesQuantity > 4 ? 4 : slidesQuantity
	  console.log(slider1)
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
	  /*.on('setPosition', function (event, slick) {
	  		console.log(slick.$slideTrack.height())
    		// slick.$slides.css('height', slick.$slideTrack.height() + 'px');
			});	*/

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
		      {
		      	breakpoint: 1440,
		      	settings: {	
		          slidesToShow: slidesQuantity > 3 ? 3 : slidesQuantity,
		      	}
		      },
		      {
		      	breakpoint: 1280,
		      	settings: {	
		          slidesToShow: slidesQuantity > 4 ? 4 : slidesQuantity,
		      	}
		      },
		      {
		      	breakpoint: 991,
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
	  var widthAllSlides = slidesQuantity * 135;

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




});


window.onload = function() {
	console.log('window load')
	// $('#page-preloader').fadeOut('slow');

	// glob.LazyLoadModule.initLazy('lazyBlock')
}
