var glob = {
	navMenuWrapper: null,
	navMenu: null,
	pageOverlay: null,
	headerOverlay: null,
	searchOverlay: null,

	scrollTopButton: null,
	cityQuerytimer: null
}

// =================
@@include('frames/globalFunctions.js')
// ===============


var cite = null;

$(document).ready(function() {
	if (document.getElementById('homePage')) {
		document.getElementById('mainHeader').classList.add('home-page')
	} else {
		document.getElementById('mainHeader').classList.remove('home-page')
	}
	// =================Include Modules==============================
	@@include('frames/ValidationModule.js')
  @@include('frames/PopupModule.js')
  @@include('frames/SwitchTabsModule.js')
  @@include('api/Thnstkapi.js')
	// =============================================================
	
	// ---------Header Menu---------
	glob.navMenuWrapper = document.getElementById('navMenuWrapper');
	glob.navMenu = document.getElementById('navMenu');
	glob.pageOverlay = document.getElementById('pageOverlay');
	glob.headerOverlay = document.getElementById('headerOverlay');


	$('#burgerButton').on('click', function() {
		glob.navMenuWrapper.classList.add('js_showSlide');
    globFunc.showOverlay("menu", glob.pageOverlay);
	})

	$('#closeMenuButton, .navMenu__phone .button-contact-js').on('click', function() {
		glob.navMenuWrapper.classList.remove('js_showSlide');
		var openSubs = glob.navMenuWrapper.getElementsByClassName('js_showSlide');
		let $menuButtonsContainer = $('.menuButtonsContainer');
		let $productsDropdownMenuBtn = $('.productsDropdownMenu_button');
		$productsDropdownMenuBtn.show();

		for (var i = 0; i < openSubs.length; i++) {
			openSubs[i].classList.remove('js_showSlide')
		}

		$menuButtonsContainer.hasClass('active') ? $menuButtonsContainer.removeClass('active') : null;
    globFunc.hideOverlay("menu", glob.pageOverlay);
	})

	// $('#navMenu').on('click', '.subMenuButton, .productsDropdownMenu_button', function() {
	// 	let $btn = $(this);
	// 	let $menuButtonsContainerTitle = $('.menuButtonsContainer__title');
	// 	let $categoryTitle = $btn.parent().find('a').first().text();
	// 	let $productsDropdownMenuBtn = $('.productsDropdownMenu_button');
	// 	if ( window.innerWidth < 1280 ) {
	// 		$productsDropdownMenuBtn.hide();
	// 	}
	// 	$menuButtonsContainerTitle.text($categoryTitle);
	// 	var hiddenContent = this.nextElementSibling;
	// 	if (Boolean(hiddenContent)) {
	// 		hiddenContent.classList.contains('js_showSlide') ? 
	// 			null : hiddenContent.classList.add('js_showSlide');
	// 	} else {
	// 		hiddenContent = this.parentElement.nextElementSibling;
	// 		hiddenContent.classList.contains('js_showSlide') ? 
	// 			null : hiddenContent.classList.add('js_showSlide');
	// 	}

	// 	let $menuButtonsContainer = $('.menuButtonsContainer');
		
	// 	$menuButtonsContainer.hasClass('active') ? null : $menuButtonsContainer.addClass('active');
	// })

	$('#navMenu').on('click', '.subMenuButton, .has-sub-menu', function() {
		let $btn = $(this);
		let $menuButtonsContainerTitle = $('.menuButtonsContainer__title');
		let $categoryTitle = $btn.parent().find('a').first().text();
		let $productsDropdownMenuBtn = $('.productsDropdownMenu_button');
		if ( window.innerWidth < 1280 ) {
			let $hiddenHref = $('.has-sub-menu').attr('href', '#');
			$productsDropdownMenuBtn.hide();
		}
		$menuButtonsContainerTitle.text($categoryTitle);
		if (this.classList.contains('subMenuButton')) {
			var hiddenContent = this.nextElementSibling;
		} else if (this.classList.contains('has-sub-menu')) {
			var i = this.nextElementSibling;
			var hiddenContent = i.nextElementSibling;
		}
		if (Boolean(hiddenContent)) {
			hiddenContent.classList.contains('js_showSlide') ? 
				null : hiddenContent.classList.add('js_showSlide');
		} else {
			hiddenContent = this.parentElement.nextElementSibling;
			hiddenContent.classList.contains('js_showSlide') ? 
				null : hiddenContent.classList.add('js_showSlide');
		}

		let $menuButtonsContainer = $('.menuButtonsContainer');
		$menuButtonsContainer.hasClass('active') ? null : $menuButtonsContainer.addClass('active');
	})

	$('#prevMenuButton').on('click', function() {
		let $productsDropdownMenuBtn = $('.productsDropdownMenu_button');
		var openSubs = glob.navMenuWrapper.getElementsByClassName('js_showSlide');
		// const $showSlide = $("#navMenu .js_showSlide");
		let $menuButtonsContainer = $('.menuButtonsContainer');
		let $btn = $(this);
		let $menuButtonsContainerTitle = $('.menuButtonsContainer__title');
		$menuButtonsContainerTitle.text($btn.data('title'));
		
		if (openSubs.length == 1) {
			$productsDropdownMenuBtn.show();
		}
		if (openSubs.length) {
			// console.log("hfc", $test);
			// $showSlide.removeClass("js_showSlide")
			// $productsDropdownMenuBtn.show();
			openSubs[openSubs.length-1].classList.remove('js_showSlide')
			// openSubs.removeClass('js_showSlide')
		}
		if (openSubs.length < 1) {
			$menuButtonsContainer.hasClass('active') ? $menuButtonsContainer.removeClass('active') : null;			
		}
	})

	if ( window.innerWidth >= 1280 ) {
		$('.firstPartBlock .productsDropdownMenu_button').on('mouseenter', function(e) {
				let $targetBlock = $(this).next();
				if ($targetBlock) {
					globFunc.showOverlay("menu", glob.headerOverlay);		
					$targetBlock.css('height', $targetBlock.children().first().outerHeight() + 'px')
					$targetBlock.css('overflow', 'visible')
					$targetBlock.css('opacity', '1')
				}
		})

		$('#headerOverlay').hover(function(e) {
			let $productsDropdownMenuBtn = $('.productsDropdownMenu_button');
			let $productsSubMenu = $productsDropdownMenuBtn.next();
			$productsSubMenu.css('overflow', 'hidden');
			$productsSubMenu.css('height', 0);
			$productsSubMenu.css('opacity', 0);
			globFunc.hideOverlay("menu", glob.headerOverlay);	
		});
	}

	$(glob.headerOverlay).on('click', function() {
		$('.productsDropdownMenu_button').removeClass('active');
		$('.productsDropdownMenu_button').next().css('height', 0);
		$('.descBurgerIcon').removeClass('active');
		globFunc.hideOverlay("menu", glob.headerOverlay);					
	});
	if ( document.documentElement.clientWidth > 1264 ) {
		if (!document.getElementById('homePage')) {
			var mainSubmenu, maxHeight = 0;
			var allSubMenus = glob.navMenu.getElementsByClassName('submenu');

			if (allSubMenus.length) {
				mainSubmenu = allSubMenus[0];

				for (var i = 0; i < allSubMenus.length; i++) {
					let menuHeight = allSubMenus[i].offsetHeight;
					menuHeight > maxHeight ? maxHeight = menuHeight : null;
				}
				mainSubmenu.style.height = maxHeight + 'px';
			}
		}		
	}

	if ( window.innerWidth < 1280 ) {
		$('.mainHeader').on('click', '.menu-button', function(e) {
			globFunc.toggleButtonContent(this)	
		})
	}

	$('.mainHeader').on('blur', '.menu-button', function() {
		if (this.classList.contains('active')) {
			globFunc.toggleButtonContent(this)			
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

  $('body').on('click', '.button', function() {
  	let modal = document.getElementById('id');
  	if ( modal ) {
  		glob.PopupModule.openPopup(modal);
  	}
  });

	if ( $('.ellipsis').length ) {
		$(".description .ellipsis").dotdotdot({	height: 80,	truncate: "word",	watch: true});
		$(".title.ellipsis").dotdotdot({	height: 85,	truncate: "word",	watch: true});
	}

	// ---------Clean empty Tags-----
	var textBlocks = document.querySelectorAll('.description > p');

	if (textBlocks.length) {
		for (var i = 0; i < textBlocks.length; i++) {
			textBlocks[i].innerHTML ? null : textBlocks[i].parentElement.removeChild(textBlocks[i]);
		}
	}

	cite = (function(window, document, $) {

		const $win = $(window),
     			$dom = $(document),
					$body = jQuery(document.body),
					app = {},
					/* header */
					$innerSubmenus = $('.submenu .submenu'),
					$visibleSubmenuBtn = $(".visibleSubmenu_js"),
					$companyAboutList = $(".company-about-list"),
					/* sliders */
					$backgroundSlider = $('.background-slider'),
					$sliderBanner = $('.slider-banner'),
					$slidersPageSection = $('.slider-pageSection'),
					$stockSlidersPageSection = $('.stock-slider-pageSection'),
					$sliderBrands = $('.slider-brands'),
					$sliderAnotherProd = $('.another-prod-slider'),
					$sliderComplectsSale = $('.complects-sale-slider'),
					$sliderProd = $('.prod-slider'),
					$sliderProdNav = $('.prod-slider-nav'),
					$categoriesNavWrapper = $(".categories-nav-wrapper"),
					$initMobileSlickSlide = $(".initMobileSlickSlide"),
					/* accordion */
					$accWrapper = $('.acc-wrapper'),
					/* range slider */
					$sliderRange = $( "#slider-range" ),
					$fromItemPrice = $('.form-item--price[name="from"]'),
					$toItemPrice = $('.form-item--price[name="to"]'),
					$priceSubmitBtn = $('.price-submit'),
					/* aside */
					$buttonShowAside = $('.button-aside-show'),
					$aside = $('.aside-js'),
					$buttonCloseAside = $aside.find('.button-close'),
					/* products filters */
					// $productsFilterBtns = $('.products-filter-small'),
					$productsPage = $('.products'),
					$resetFiltersBtn = $('.reset-filters'), 
					/* theme */
					$checkboxTheme = $('#daySwitch, #daySwitchMob, #daySwitchHeaderMob'),
					/* validation */
					$formsValidate = $('.form-val-js'),
					/* for tel mask */
					$inputsTypeTel = $('input[type=tel]'),
					/* custom counter inp number */
					// $counterEl = $('.counter-el'),
					// $counterElBtns = $counterEl.find('button'),
					/* chosen */
					$chosenSelects = $(".chosen-wrapper  select"),
					/* popups */
					$popupBasket = $('.popupBasket'),
					$buyProdBtn = $('.prod .prod-descr-wrap .button'),
					/* gallery */
					$gallery = $('.gallery'),
					/* scroll top btn */
					$upBtn = $('.scrollTopContainer'),
					/* ellipsis text */
					$ellpsisText = $('.product-card__title').not('.product-card--small .product-card__title'),
					$ellpsisTextSmall = $('.ellipsis-text'),
					$ellpsisTextMedium = $('.ellipsis-text--medium'),
					/* contacts block */
					$contactsBlock = $('.contacts-wrapper'),
					$closeBtnContactsBlock = $contactsBlock.find('.button-close'),
					$contactsForms = $contactsBlock.find('form'),
					$btnContact = $('.button-contact-js'),
					/* cabinet, order */
					$selectCitiesNewPost = $('.np-city-js'),
					$selectCheckoutCitiesNewPost = $('.np-city-checkout-js'),
					$selectDepartmentNewPost = $('.np-department-js'),
					$selectCheckoutCitiesPickup = $('.tech-city-js'),
					$selectDepartmentPickup = $('.tech-store-js'),
					/* favorit */
					$stickersFavorit = $('.sticker--favorits'),
					/* order */
					// $orderDeliveryCheckedInput = $('input:checked'),
					$orderDeliveryCheckedInput = $('.form-order-section--delivery input:checked'), //mod

					/* order__row--pointer as link */
					$orderRows = $('.order__row--pointer'),
					/* offices */
					$officesCitySelect = $('#citiesSelect'),
					$officesOfficeSelect = $('#departmentsSelect'),
					$departmentsList = $('.departments-list'),
					$listPreloader = $('#page-preloader-absolute'),
					/* spinner */
					$spinnerCatalog = $('.spinner--catalog-js'),
					$spinnerSearch = $('.spinner--search-js'),
					/* password show*/
					$buttonToggleShowPass = $('.showPasswordButton'),
					/* modal */
					$btnModalMessage = $(".btn_modal-message"),
					$btnModalcallback = $(".btn_modal-callback"),
					/* submenu */
					$categories = $('.categories'),
					$prodCategories = $categories.find('.prod-category'),
					/* autocomplete */
					$autocompleteInp = $('.search-form input'),
					$clearSearchInpBtn = $('.search .button-close--in-input'),
					/* news page */
					$cardNewsTitle = $(".stock-card__descr")
					/* mask */
					// $inputMask = $(".input_mask_phone")

					// sorting
					let $sortBySelector = $('#sortBySelector'); //add
     

		let offices = null;

		app.settings = {
			ellpsisText: '56px',
			ellpsisTextMobile: '44px',
			ellpsisTextSmall: '28px',
			ellpsisTextMedium: '34px',
			pathToDefaultImg: '/img/zaglushka.jpg',
			messages: {
				'ru': {
					workTime: 'Время работы',
					address: 'Адрес',
					noOffices: 'В данном городе нет отделений',
					searchByCategory: 'Искать в категории',
					allCategories: 'Все категории',
					allOffices: 'Все отделения',
					pickCity: 'Виберите город', //add2
					noCities: 'ничего не найдено', //add2
				},
				'uk': {
					workTime: 'Час роботи',
					address: 'Адреса',
					noOffices: 'В даному місті немає відділень',
					searchByCategory: 'Шукати в категорії',
					allCategories: 'Усі категорії',
					allOffices: 'Всі відділення',
					pickCity: 'Виберіть город', //add2
					noCities: 'ничого не знайдено', //add2
				}
			}
		};

		const thnstkapi = new Thnstkapi();

		const fn = {

			initAjaxHeaders() {
				$.ajaxSetup();
			},

			isRuLang() {
				return $("html").attr('lang') === 'ru' ? true : false;
			},

			// initMaskInputPhone() {
			// 	const $inputPhones = $('.input_mask_phone')
			// 	// if ($inputPhones.length === 0) {
			// 	// 	return null;
			// 	// } else if ($inputPhones.length < 2) {
			// 	// 	$inputPhones.mask("+38(999) 99-99-999")
			// 	// } else if ($inputPhones.length > 2) {
			// 	// 	for (var input of $inputPhones) {
			// 	// 		console.log(input);
			// 	// 		input.mask("+38(999) 99-99-999")
			// 	// 	}
			// 	// }
			// },

			setInnerSubmenusProdCategoryWidth() {
				$innerSubmenus.each((idx, el) => {
					const $submenu = $(el);
					const $submenuChildren = $submenu.children();
					const $lastElevenElemsOfSubmenu = $submenuChildren.slice(-11);
					const $submenuFirstChild = $submenu.find('.prod-category').first();
					const submenuFirstChildLeftPos = $submenuFirstChild.length ? $submenuFirstChild.offset().left : 0;
					let submenuChildRightPos = 0;
					
					$lastElevenElemsOfSubmenu.each((idx, subEl) => {
						const $subEl = $(subEl);
						const subElRightPos = $subEl.offset().left + $subEl.outerWidth();

						subElRightPos > submenuChildRightPos ?
							submenuChildRightPos = subElRightPos : 
							null;
					});				
					
					$submenu.css({
						'width': submenuChildRightPos - submenuFirstChildLeftPos + 'px',
					});
				});
			},

			initBgSlider() {
				$backgroundSlider.slick({
					arrows: false,
					mobileFirst: true,
					autoplay: true,
					autoplaySpeed: 5000,
					responsive: [
						{
							breakpoint: 991,
							settings: {
								// dots: true,
								dotsClass: 'slick-dots slick-dots--horizontal'
							}
						},
						{
							breakpoint: 1599,
							settings: {
								// dots: true,
								dotsClass: 'slick-dots',
							}
						},
						
					]
				});
			},

			initBannerSlider() {
				$sliderBanner.slick({
					arrows: true,
					dots: true,
					autoplay: true,
					autoplaySpeed: 3000,
					dotsClass: 'slick-dots slick-dots--horizontal',
					prevArrow: '<button type="button" class="slick-prev"><i class="icomoon icon-arrow2"></i></button>',
					nextArrow: '<button type="button" class="slick-next"><i class="icomoon icon-arrow2"></i></button>',
				});
			},

			initPageSectionSliders() {
				$slidersPageSection.each(function() {
					$(this).slick({
						arrows: false,
						mobileFirst: true, 
						// prevArrow: '<button type="button" class="slick-prev"><i class="icomoon icon-arrow2"></i></button>',
						// nextArrow: '<button type="button" class="slick-next"><i class="icomoon icon-arrow2"></i></button>',
						slidesToShow: 2,
						autoplaySpeed: 4000,
						autoplay: true,
						appendArrows: $(this).closest('.pageSection').find('.pageSection-arrows'),
						responsive: [
							{
								breakpoint: 1200,
								settings: "unslick"
							},
						]
					});
				})
				.on('setPosition', function (event, slick) {
					slick.$slides.css('height', slick.$slideTrack.height() + 'px');
				});
			},

			initMobileSlickCategory() {
				$initMobileSlickSlide.slick({
					arrows: true,
					mobileFirst: true, 
					infinite: true,
					prevArrow: '<button type="button" class="slick-next"><i class="icomoon icon-arrow2"></i></button>',
					nextArrow: '<button type="button" class="slick-prev"><i class="icomoon icon-arrow2"></i></button> ',
					// appendArrows: $('.stock_arrow_el'),
					slidesToShow: 3,
      		swipeToSlide: true,
					slidesToScroll: 1,
					responsive: [
						{
							breakpoint: 1200,
							settings: {
								slidesToShow: 6
							}
						},
					]
				});
			},

			initStockSlideSection() {
				$stockSlidersPageSection.slick({
					arrows: true,
					mobileFirst: true, 
					prevArrow: '<button type="button" class="slick-prev"><i class="icomoon icon-arrow2"></i></button>',
					nextArrow: '<button type="button" class="slick-next"><i class="icomoon icon-arrow2"></i></button>',
					appendArrows: $('.stock_arrow_el'),
					slidesToShow: 1,
					responsive: [
						{
							breakpoint: 1200,
							settings: {
								slidesToShow: 4,
							}
						},
					]
				})
			},

			initAnotherProdSlider() {
				$sliderAnotherProd.slick({
					arrows: true,
					mobileFirst: true, 
					prevArrow: '<button type="button" class="slick-prev"><i class="icomoon icon-arrow2"></i></button>',
					nextArrow: '<button type="button" class="slick-next"><i class="icomoon icon-arrow2"></i></button>',
					slidesToShow: 1,
					appendArrows: $sliderAnotherProd.closest('.pageSection').find('.pageSection-arrows'),
					// autoplay: true,
					// autoplaySpeed: 3000,
					responsive: [
						{
							breakpoint: 576,
							settings: {
								slidesToShow: 2
							}
						},
						{
							breakpoint: 768,
							settings: {
								slidesToShow: 3
							}
						},
						{
							breakpoint: 991,
							settings: {
								slidesToShow: 6
							}
						},
					]
				})
				.on('setPosition', function (event, slick) {
					slick.$slides.css('height', slick.$slideTrack.height() + 'px');
				});
			},

			initBrandsSlider() {
				let slidesToShow = 5;
				let slides = $('.slider-brands__item').length;
				if( slidesToShow > (slides - 1) ) {
						slidesToShow = (slides - 1);
				}

				$sliderBrands.slick({
					infinite: true,
					arrows: true,
					mobileFirst: true, 
					prevArrow: '<button type="button" class="slick-prev"><i class="icomoon icon-arrow2"></i></button>',
					nextArrow: '<button type="button" class="slick-next"><i class="icomoon icon-arrow2"></i></button>',
					slidesToShow: 2,
					appendArrows: $sliderBrands.closest('.pageSection').find('.pageSection-arrows'),
					autoplay: true,
					autoplaySpeed: 3000,
					responsive: [
						{
							breakpoint: 576,
							settings: {
								slidesToShow: 3
							}
						},
						{
							breakpoint: 991,
							settings: {
								slidesToShow: slidesToShow || 5
							}
						},
						{
							breakpoint: 1200,
							settings: {
								slidesToShow: slidesToShow || 8
							}
						},
					]
				});
			},

			initComplectsSaleSlider() {
				$sliderComplectsSale.slick({
					arrows: false,
					dots: true,
					dotsClass: 'slick-dots slick-dots--horizontal',
					mobileFirst: true, 
					prevArrow: '<button type="button" class="slick-prev"><i class="icomoon icon-arrow2"></i></button>',
					nextArrow: '<button type="button" class="slick-next"><i class="icomoon icon-arrow2"></i></button>',
					slidesToShow: 1,
					autoplay: true,
					autoplaySpeed: 3000,
					responsive: [
						{
							breakpoint: 991,
							settings: {
								arrows: true,
							}
						},
					]
				});
			},

			initProdSliders() {
				$sliderProd.slick({
					mobileFirst: true,
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: true,
					prevArrow: '<button type="button" class="slick-prev"><i class="icomoon icon-arrow2"></i></button>',
					nextArrow: '<button type="button" class="slick-next"><i class="icomoon icon-arrow2"></i></button>',
					fade: true,
					asNavFor: $sliderProdNav,
					responsive: [
						{
							breakpoint: 991,
							settings: {
								arrows: false,
							}
						},
					]
				});

				$sliderProdNav.slick({
					mobileFirst: true,
					slidesToShow: 2,
					slidesToScroll: 1,
					arrows: false,
					vertical: true,
					asNavFor: $sliderProd,
					focusOnSelect: true,
					responsive: [
						{
							breakpoint: 991,
							settings: {
								slidesToShow: 3,
							}
						},
					]
				});
			},

			initAccordion() {
				$accWrapper.on('click', '.acc-button', function() {
					let $accItem = $(this).closest('.acc-item');
					let $accContentBlock = $accItem.find('.acc-content');
					$accItem.toggleClass('open');
					$accContentBlock.slideToggle();
				})
			},

			onInputFromPrice() {
				$fromItemPrice.on('change', function() {
					let val = $(this).val();
					$sliderRange.slider("values", 0, val);
					$sliderRange.closest('.products-filter').addClass('changed');
					$priceSubmitBtn.attr('disabled', false);
					// fn.handleFilters();
				});
			},

			onInputToPrice() {
				$toItemPrice.on('change', function() {
					let val = $(this).val();
					$sliderRange.slider("values", 1, val);
					$sliderRange.closest('.products-filter').addClass('changed');
					$priceSubmitBtn.attr('disabled', false);
					// fn.handleFilters();
				});
			},

			handlePriceSubmitBtn() {
				const $productsFilterPriceBlock = $('.products-filter--price');

				if ( $productsFilterPriceBlock.hasClass('changed') ) {
					$priceSubmitBtn.attr('disabled', false);
				}
			},

			onClickPriceSubmitBtn() {
				$priceSubmitBtn.on('click', function() {
					fn.saveWindowScrollYInLocalStorage();
					fn.handleFilters();
				});
			},

			initPriceSlider() {
				$sliderRange.slider({
					range: true,
					min: 1,
					max: 35000,
					values: [ 1, 35000 ],
					slide: function( event, ui ) {
						$fromItemPrice.val(ui.values[ 0 ]);
						$toItemPrice.val(ui.values[ 1 ]);
					},
					// change: function( event, ui ) {
					// 	fn.handleFilters();
					// },
				});
				$fromItemPrice.val($sliderRange.slider("values", 0));
				$toItemPrice.val($sliderRange.slider("values", 1));
			},

			onPriceSliderChange() {
				$sliderRange.on( "slidechange", function( event, ui ) {
					$sliderRange.closest('.products-filter').addClass('changed');
					$priceSubmitBtn.attr('disabled', false);
					// fn.handleFilters();
				});
			},

			openAside() {
				$aside.addClass('open');
			},

			closeAside() {
				$aside.removeClass('open');
			},

			onClickButtonShowAside() {
				$buttonShowAside.on('click', function() {
					fn.openAside();
				});
			},

			onClickButtonCloseAside() {
				$buttonCloseAside.on('click', function() {
					fn.closeAside();
				});
			},

			// handleProductsFilterBtns() {
			// 	$productsFilterBtns.on('click', function() {

			// 		if ( $(this).hasClass('active') ) return;

			// 		$productsFilterBtns.each((idx, el) => {
			// 			$(el).removeClass('active');
			// 		})

			// 		$(this).addClass('active');
			// 	});
			// },

			handleChangeTheme() {
				$checkboxTheme.on('change', function(e) {
					let $target = $(e.currentTarget);
					let isWhiteTheme = $target.prop('checked'); 
					fn.toggleTheme();
					fn.saveThemeInStorage(isWhiteTheme);
				});
			},

			toggleTheme() {
				$body.toggleClass('white-theme');
			},

			saveThemeInStorage(isWhiteTheme) {
				isWhiteTheme ? 
					localStorage.setItem('theme', 'white') :
					localStorage.setItem('theme', 'dark');
			},

			setThemeOnLoadPage() {
				let theme = localStorage.getItem('theme');
				if ( theme === 'white' ) {
					// fn.toggleTheme();
					$body.addClass('white-theme');
					$checkboxTheme.prop('checked', true);
				}
			},

			handleValidationForms() {
				$formsValidate.on('submit', function(e) {
					e.preventDefault();
					let $targetForm = $(this);
					const submitButton = this.querySelector('button[type="submit"');

					if (  !glob.ValidationModule.isValid($targetForm) ) {
						if ( $targetForm.hasClass('form-order') ) {
							fn.handleScrollToWarning($targetForm);
						}
					} else {
						// this.submit();
						if (submitButton) {
							submitButton.setAttribute('disabled', true);
							this.submit();
						}
					}
				});
			},

			handleScrollToWarning($targetForm) {
				const $warning = $targetForm.find('.js_warning-list').first();

				if ( $warning.length ) {
					$('html, body').animate({
						scrollTop: $warning.offset().top - 80
					});
				}
			},

			initTelMask() {
				$inputsTypeTel.each((idx, inp) => {
					new Cleave(inp, {
						prefix: '380',
						numericOnly: true,
						blocks: [3, 2, 3, 2, 2],
						delimiters: [" ", " ", " "],
					});
				});
			},

			// handleCounterEl() {
			// 	$counterElBtns.on('click', function() {
			// 		const $counterContainer = $(this).closest('.counter-el');
			// 		const isIncrease = $(this).hasClass('counter-el__inc');
			// 		const $inp = $counterContainer.find('input');
			// 		const $inpVal = Number( $inp.val() );
			// 		const $newInpVal = isIncrease ? $inpVal + 1 : $inpVal - 1;

			// 		if ( $newInpVal <= 0 ) return;

			// 		$inp.val( $newInpVal );
			// 	});
			// },

			initChoosen() {
				for (var i = 0; i < $chosenSelects.length; i++) {
					let options = {
						disable_search_threshold: 8,
						width: '100%'
					}

					if ($chosenSelects[i].classList.contains('np-city-checkout-js')) {
						options.disable_search = true;
					}
					// console.log(options)
					$($chosenSelects[i]).chosen(options);

					if ($chosenSelects[i].classList.contains('np-city-checkout-js')) {
						var dropdown = $chosenSelects[i].nextElementSibling.querySelector('.chosen-drop');
						var search = document.createElement('div');
						search.classList.add('chosen-search', 'custom-search');
						search.innerHTML = `<input class="chosen-search-input"
							type="text"
							autocomplete="off"
							placeholder='почнiть вводити назву...'
						>`;
						
						search.oninput = fn.handleNovaPochtaCityQueryInput;
						dropdown.prepend(search);
					}

					if ($chosenSelects[i].classList.contains('np-department-js') || $chosenSelects[i].classList.contains('tech-store-js')) {
						if (!$chosenSelects[i].value) {
							// console.log($chosenSelects[i].value);
							$chosenSelects[i].parentElement.classList.add('chosen-disabled');
							$($chosenSelects[i]).prop('disabled', true).trigger('chosen:updated');
						}
					}
				}
			},

			handleSortBySelectChange($select) { //add
				$select.on('change', function (e) {
					// console.log(evt.target.value)
					var selected = e.target.value;
					var splitted = selected.split('=');
					var alias = splitted[0];

					var target_button = document.querySelector(`.products-filters-small.sort-buttons > [data-alias="${alias}"]`);

					if (target_button) {
						var buttonsList = target_button.parentElement.children;

						for (var i = 0; i < buttonsList.length; i++) {
							if (buttonsList[i].classList.contains('active')) {
								buttonsList[i].classList.remove('active');
							}
						}

						target_button.classList.add('active');
					}

					fn.handleFilters();
				});
			},

			handleNovaPochtaCityQueryInput({target}) {//add2
				const query = target.value.trim();
				if (query.length > 0 ) {
					if (glob.cityQuerytimer) {
						clearTimeout(glob.cityQuerytimer);
					}
					glob.cityQuerytimer = setTimeout(() => {
						glob.cityQuerytimer = null;
						fn.handleCityQueryInputChange(query, thnstkapi.getNewPostCitiesByQuery, $selectCheckoutCitiesNewPost, 'description_uk', false);
					}, 500);
				}
			},
			handleCityQueryInputChange(query, action, $select, fieldName, fieldWithUk) {//add2
				var actionFn = action.bind(thnstkapi);
				actionFn(query).then(function (res) {
					// const x = [{id:1, Description: 'test city', Ref: 'fc5f1e3c-928e-11e9-898c-005056b24375'}, {id:2, Description: 'test city 2', Ref: '6dbe932e-1aad-11ea-8c15-0025b502a06e'}]
					// const cities = [...res.data, ...x];
					const cities = res.data;

					fn.setNovaPostaCitiesDelivery($select, cities, fieldName, fieldWithUk);
				});				
			},

			setNovaPostaCitiesDelivery($selectCities, cities, fieldName, fieldWithUk) {//add2
				$selectCities.empty();
				if (!cities || !cities.length) {
					$selectCities.append('<option>' + fn.handleTranslationMessages('noCities') + '</option>');
					$selectCities.trigger('chosen:updated');
					return;
				};

				fn.appendCitiesToSelect(cities, $selectCities, fieldName, fieldWithUk);
				$selectCities.trigger('chosen:updated');
			},
			appendCitiesToSelect(cities, $select, fieldName, fieldWithUk) {//add2
				// $select.append(`<option value="">${fn.handleTranslationMessages('pickCity')}</option>`);
				cities.map(function (city) {
					var value = city[fieldName] || city.description_uk || city.description_ru;
					$select.append(`<option data-id="${city.ref}" value="${value}">${fn.handleTranslationResponse(fieldName, city, fieldWithUk)}</option>`);
				});
				$select.val(''); //mod3
			},

			handleCitySelectChange($select, action, $selectDepartments, fieldName, fieldWithUk) {
				const actionFn = action.bind(thnstkapi);
				$select.on('change', function(evt) {
					const id = $(evt.target).find(':selected').data('id');
					if (id) { // mod
						let departments = null;
						actionFn(id).then(res => {
							departments = res.data;
							fn.setWarehousesOfAddressesDelivery($selectDepartments, departments, fieldName, fieldWithUk);
						});
					} else {
						fn.setWarehousesOfAddressesDelivery($selectDepartments, null, fieldName, fieldWithUk);
					}
					
				});
			},

			setWarehousesOfAddressesDelivery($selectDepartments, departments, fieldName, fieldWithUk) {
				$selectDepartments.empty();
				if ( !departments || !departments.length ) {
					$selectDepartments.prop('disabled', true);
					$selectDepartments.append(`<option>${fn.handleTranslationMessages('noOffices')}</option>`);
					$selectDepartments.trigger(`chosen:updated`);
					return;
				};

				$selectDepartments[0].parentElement.classList.remove('chosen-disabled');
				$selectDepartments.prop('disabled', false);
				fn.appendWarehousesToSelect(departments, $selectDepartments, fieldName, fieldWithUk);
				$selectDepartments.trigger(`chosen:updated`);
			},

			appendWarehousesToSelect(departments, $selectDepartments, fieldName, fieldWithUk) {
				departments.map(department => {
					const value = department.Description || department.address_uk;
					$selectDepartments.append(`<option value="${value}">${fn.handleTranslationResponse(fieldName, department, fieldWithUk)}</option>`);
				});
			},

			initPopupBasket() {
				$buyProdBtn.on('click', function() {
					glob.PopupModule.openPopup($popupBasket);
				});
			},

			initColorbox() {
        $gallery.colorbox({
          rel:'group1',
          opacity:"0.9", 
          current:"",
          close: "",
          maxWidth: '90%',
          maxHeight: '100%',
          loop: false,
				});
			},

			goTop(e) {
        $("html, body").animate(
          {
            scrollTop: 0
          },
          400
        );
			},

			showScrollBtn() {
        var $top = $(this).scrollTop();
  
        if ($top > 200) {
          $upBtn.fadeIn(200);
        } else {
          $upBtn.fadeOut(200);
        }
			},
			
			upBtnDecorator() {
				$upBtn.on("click", fn.goTop);
        $(window).on("scroll", fn.showScrollBtn);
        fn.showScrollBtn();
			},

			makeElipsisText($wrappers, height) {
				$wrappers.each((idx, el) => {
					new Dotdotdot(el, {
						truncate: "word",
						ellipsis: "...",
						height: height
					});
				})
			},

			toggleContacts() {
				 	$contactsBlock.hasClass('active') ?
					$contactsBlock.removeClass('active') :
					$contactsBlock.addClass('active'); 
			},

			showContactForm(target) {
				$contactsForms.each(function() {
					const $form = $(this);

					$form.removeClass('active');

					if ( $form.hasClass(target) ) {
						$form.addClass('active');
					}
				}); 
			},

			handleContactForms() {
				$btnContact.on('click', function() {
					const targetClass = $(this).data('form');
					const isContactsBlockOpen = $contactsBlock.hasClass('active');
					const activeForm = $contactsBlock.find('.form.active');

					if ( isContactsBlockOpen && !activeForm.hasClass(targetClass) ) {
						fn.showContactForm(targetClass);
						return;
					}
					
					fn.toggleContacts();
					fn.showContactForm(targetClass);
				});
			},

			handleCloseContactForm() {
				$body.on('click', function(e) {
					const $target = $(e.target);
					const isTargetInContactsWrapper = $target.closest('.contacts-wrapper').length;

					if ( $target.hasClass('button-contact-js') ) return;

					if ( $contactsBlock.hasClass('active') && !isTargetInContactsWrapper ) {
						$contactsBlock.removeClass('active');
					}
				})

				fn.onClickCloseBtnContactsBlock();
			},

			onClickCloseBtnContactsBlock() {
				$closeBtnContactsBlock.on('click', function() {
					fn.toggleContacts();
				})
			},

			handleFavorits() {
				$stickersFavorit.on('click', function() {
					const $favButton = $(this);
					const id = $favButton.data('product-id');

					thnstkapi.postToggleFavorites(id)
						.then(res => {
							fn.toggleFavoriteButtonClass($favButton);
						})
						.catch(error => {
							console.log('error', error);
						});
				});
			},

			toggleFavoriteButtonClass($btn) {
				$btn.toggleClass('sticker--favorits-added');
			},
 
			handleGuaranteeCheckboxToggle() {
				$body.on('click', '.product input[name=guarantee]', function(event) {
					const $inputGuarantee = $(this);
					// const guarantyId = $inputGuarantee.data('warranty-id');
					// const prodId = $inputGuarantee.data('product-id');
					const $guaranteeBlock = $inputGuarantee.closest('.prod-guarantee');
					const $inputsGroup = $guaranteeBlock.find('input[name=guarantee]').not($inputGuarantee);
					$inputsGroup.prop("checked", false);

					// thnstkapi.removeGuarantee(prodId, () => thnstkapi.addGuarantee(prodId, guarantyId));
				});
			},

			handleActiveDeliveryTab() {
				const $orderDeliveryItem = $orderDeliveryCheckedInput.closest('.radio-item');
				const $orderDeliveryItemData = $orderDeliveryItem.data('target');
				const $orderDeliveryTabsWrap = $('.order-post-toggleBlocks');
				const $orderDeliveryCurTab = $orderDeliveryTabsWrap.find(`#${$orderDeliveryItemData}`);
				const $fields = $orderDeliveryCurTab.find('input, select');
				
				$fields.attr('disabled', false).trigger("chosen:updated");
				$orderDeliveryCurTab.addClass('active');
			},

			handleOrderRows() {
				$orderRows.on('click', (e) => {
					const url = $(e.currentTarget).data('url');
					document.location.assign(url);
				})
			},

			handleOffices() {
				fn.initOfficesMap();
				fn.handleCitySelectOnChangeInOffices();
				fn.handleOfficeSelectOnChangeInOffices();
			},

			initOfficesMap() {
				thnstkapi.getAllCitiesInOfficesPage()
					.then(res => {
						offices = res.data;
						deptsMap.initMap();
						deptsMap.initCluster(deptsMap.createMarkersForCluster(offices));
					})
					.catch(err => {
						console.log('err', err);
					});
			},

			handleOfficeSelectOnChangeInOffices() {
				$officesOfficeSelect.on('change', function(evt, params) {
					const id = $(evt.target).find(':selected').data('id');
					$listPreloader.fadeIn(0);

					if ( id === 'all' ) {
						deptsMap.zoom(8);
						fn.renderOfficesList(offices);
						return;
					}

					const currOffice = offices.filter(o => o.id === id);
					const { lat, lng } = currOffice[0];

					deptsMap.zoomToOffice({ lat, lng, zoom: 18});
					fn.renderOfficesList(currOffice);
				});
			},

			handleCitySelectOnChangeInOffices() {
				$officesCitySelect.on('change', function(evt, params) {
					const id = $(evt.target).find(':selected').data('id');
					$listPreloader.fadeIn(0);

					if ( id === 'all' ) {
						thnstkapi.getAllCitiesInOfficesPage()
							.then(res => {
								offices = res.data;
								fn.renderOfficesToOfficeSelect(offices);
								fn.renderOfficesList(offices);
								deptsMap.initMap();
								deptsMap.initCluster(deptsMap.createMarkersForCluster(offices));
							})
							.catch(err => {
								console.log('err', err);
							});

						return;
					}

					thnstkapi.getOfficesByCityId(id)
						.then(res => {
							offices = res.data;
							fn.renderOfficesToOfficeSelect(offices);
							deptsMap.initMap();
							deptsMap.initCluster(deptsMap.createMarkersForCluster(offices));
							fn.renderOfficesList(offices);
						})
						.catch(err => {
							console.log('err', err);
						});
				});
			},

			renderOfficesToOfficeSelect(departments = []) {
				$officesOfficeSelect.empty();
				if ( ! departments.length ) {
					$officesOfficeSelect.append(`<option>${fn.handleTranslationMessages('noOffices')}</option>`);
					$officesOfficeSelect.trigger(`chosen:updated`);
					return;
				};

				fn.appendTkhnstkOfficesToSelect(departments);
				$officesOfficeSelect.trigger(`chosen:updated`);
			},

			appendTkhnstkOfficesToSelect(departments) {
				$officesOfficeSelect.append(`<option data-id="all">${fn.handleTranslationMessages('allOffices')}</option>`);
				departments.map(department => {
					$officesOfficeSelect.append(`<option data-id="${department.id}">${fn.handleTranslationResponse('address_', department)}</option>`);
				});
			},

			handleTranslationMessages(key) {
				const { messages } = app.settings;
				
				return cite.isRuLang() ? messages.ru[key] : messages.uk[key];
			},

			handleTranslationResponse(key, source, withUk = true) {
				return cite.isRuLang() ? source[`${key}ru`] : withUk ? source[`${key}uk`] : source[`${key}`];
			},

			renderOfficesList(offices = []) {
				let officesInnerHTML = '';

				offices.map((office) => {
					const { city } = office;
					
					officesInnerHTML += `
					<div class="departments-item">
						<div class="departments-item__img">
							<img src="${office.image_path}">
						</div>

						<div class="departments-item__location departments-item__wrap">
							<div class="departments-item__title">${fn.handleTranslationMessages('address')}</div>
							<div class="departments-item__descr">
								${fn.handleTranslationResponse('title_', city)}, ${fn.handleTranslationResponse('address_', office)}
							</div>
						</div>

						<div class="departments-item__time departments-item__wrap">
							<div class="departments-item__title">${fn.handleTranslationMessages('workTime')}</div>
							<div class="departments-item__descr">${fn.handleTranslationResponse('work_time_', office)}</div>
						</div>
					</div>
					`
				});

				$departmentsList.html(officesInnerHTML);
				$listPreloader.fadeOut('slow');
			},

			handleFilters(settings) {
				const $filterItems = $('.products-filter, .products-filter-small');
				const $perPageItems = $('.numbers-of-products');
				let qs = '';
				let getParams = '';
				
				$filterItems.each((idx, filterItem) => {
					qs += fn.createStrByAsideFilters(filterItem);
					qs += fn.createStrByAscDescFilters(filterItem);
				});
				qs += fn.addToStrSaleOrTagAlias();
				
				if (settings && settings.addToParams) { //add
					qs += `${settings.addToParams}/`;
				}

				getParams += fn.createParamStr($perPageItems);

				fn.filterProducts(qs, getParams);
			},

			showSpinnerCatalog() {
				$spinnerCatalog.show();
			},

			showSpinnerSearch() {
				$spinnerSearch.show();
			},

			hideSpinnerSearch() {
				$spinnerSearch.hide();
			},

			saveWindowScrollYInLocalStorage() {
				const windowPosition = window.scrollY;
				localStorage.setItem('windowPosition', windowPosition);
			},
			
			handleWindowScrollY() {
				const windowPosition = localStorage.getItem('windowPosition');
				if ( windowPosition ) {
					window.scrollTo( 0, Number(windowPosition) );
					localStorage.removeItem('windowPosition');
				}
			},

			handleFiltersOnClick() {
				if (document.documentElement.clientWidth > 990) {
					$('body').on('click', '.products-filter .checkbox-label:not(.checkbox-label--disabled), .products-filter-small, .numbers-of-products', function () {
						fn.saveWindowScrollYInLocalStorage();
						fn.handleFilters();
						fn.showSpinnerCatalog();
					});
				} else {
					$('body').on('click', '.products-filters .filters-submit, .products-filter-small, .numbers-of-products', function () {
						fn.saveWindowScrollYInLocalStorage();
						fn.handleFilters();
						fn.showSpinnerCatalog();
					});
				}
			},

			addToStrSaleOrTagAlias() {
				const { urlFilterOptions } = window.getOptionsFromCurrentHref();
				let str = '';

				if ( urlFilterOptions.length ) {
					let filtersArr = urlFilterOptions.split('/');

					filtersArr.forEach(filter => {
						const alias = filter.match(/(.*)=/m);

						if ( /*alias[1] == 'sale' ||*/ alias[1] == 'tag' || alias[1] == 'title' ) {
							str += filter;
						}
					});
				}

				return str;
			},

			createStrByAsideFilters(filterItem) {
				let str = '';
				const $filterItem = $(filterItem);
				const alias = $filterItem.data('alias');
				const isPriceBlock = $filterItem.hasClass('products-filter--price');

				if ( isPriceBlock ) {
					const isBlockChanged = $filterItem.hasClass('changed');

					if ( isBlockChanged ) {
						const from = $sliderRange.slider("values", 0);
						const to = $sliderRange.slider("values", 1);
						return str += `${alias}=${from}to${to}/`;
					}
				}

				const $checkedInputs = $filterItem.find('.checkbox-label input:checked');

				if ( ! $checkedInputs.length ) return '';

				str += `${alias}`;

				$checkedInputs.each((idx, inp) => {
					var value = $(inp).val();					

					if ( idx > 0 ) {
						return str += `-or-${ value }`;
					} else if (value) {
						str += '=';
					}
					
					if (value) {
						str += value;						
					}
				});

					// console.log(str)
				return str += `/`;
			},

			createStrByAscDescFilters(filterItem) {
				const $filterItem = $(filterItem);
				if ( ! $filterItem.hasClass('products-filter-small active') ) return ''; 
				let str = '';
				const alias = $filterItem.data('alias');
				return str += $filterItem.hasClass('desc') ? `${alias}=desc/` : `${alias}=asc/`;
			},

			createParamStr($perPageItems) {
				const { urlGetParams } = window.getOptionsFromCurrentHref();
				let str = '';
				let productsPerPageParam = '';

				$perPageItems.each((idx, perPageItem) => {
					if ( $(perPageItem).hasClass('active') ) {
						productsPerPageParam =  $(perPageItem).data('param');
					}
				});

				if ( urlGetParams.length && !productsPerPageParam ) {
					str = urlGetParams;
				} else if ( !urlGetParams.length && productsPerPageParam ) {
					str = productsPerPageParam
				} else if ( urlGetParams.length && productsPerPageParam ) {
					let getParamsArr = urlGetParams.split('&');

					getParamsArr.forEach(p => {
						const param = p.match(/(.*)=/m);

						if ( param[1] == 'per-page' ) {
							getParamsArr.splice(getParamsArr.indexOf(p), 1);
						}
					});
					getParamsArr.push(productsPerPageParam);
					str = getParamsArr.join('&')
				}

				return str;
			},

			filterProducts(queryStr, getParams) {
				const prodBlock = $('.products');
				const dataUrl = prodBlock.data('url');
				const rootUrl = dataUrl.split('/').splice(3).join('/');

				getParams ? 
					window.location.assign(`/${rootUrl}/${queryStr}?${getParams}`) :
					window.location.assign(`/${rootUrl}/${queryStr}`);
			},

			handleFilterResetBtn() {
				const { isPathHasOptions } = window.getOptionsFromCurrentHref();
				
				if ( isPathHasOptions ) {
					$resetFiltersBtn.css('display', 'inline-block');
				}
			},

			togglePasswordShow() {
				$buttonToggleShowPass.on('click', function() {
					let $inp = $(this).parent().find('input');
					
					$inp.attr('type') == 'password' ? 
						$inp.attr('type', 'text') : 
						$inp.attr('type', 'password'); 
				});
			},

			handlerVisibleSubmenu() {
			/* 	const $companyAboutWrapToBack = $(".company-about-wrap_to-back")
				$visibleSubmenuBtn.on("click", function () {
				 const $companyAboutWrap = $(this)
				 		.closest(".company-about-list")
						.find(".company-about-wrap")
						$companyAboutWrap.addClass("activeSubmenu")
				})
				$companyAboutWrapToBack.on("click", function () {
					const $companyAboutWrap = $(this)
							.closest(".company-about-list")
						 .find(".company-about-wrap")
						 $companyAboutWrap.removeClass("activeSubmenu")
				 }) */

				 $companyAboutList.on("mouseover", function() {
					$(this).find(".submenuWrapper").css({"visibility":"visible", "height":"0"})
				 });
				 $companyAboutList.on("mouseout", function() {
					$(this).find(".submenuWrapper").css({"visibility":"hidden", "height":"auto"})
				});



			},

			handleSubmenuHeight() {
				const $categoryTop = $($categories[0]);
				// const $categoryBottom = $($categories[1]);
				const $categoryHeight = $categoryTop.outerHeight();
				const $categoryTopPosition = $categoryTop.offset().top;
				// console.log($categoryTop);
				// const $categoryBottomPosition = $categoryBottom.offset().top;
				// console.log($categoryBottomPosition);
				// const submenuHeight = ($categoryBottomPosition + $categoryHeight) - ($categoryTopPosition + $categoryHeight);
				const submenuHeight = ($categoryTopPosition + $categoryHeight);
				
				$prodCategories.css('height', submenuHeight - 14 - 14 + 2); // 14 padding; 2 border;

				// fn.handleSubmenuItemsView();
			},

			handleSubmenuItemsView() {
				$prodCategories.each((idx, el) => {
					const $category = $(el); 
					const $categoryBottomPosition = $category.offset().top + $category.outerHeight(); 
					const $prodListItems = $category.find('.prod-list li');
					
					if ( $prodListItems.length ) {
						const $prodListLastItem = $prodListItems.last();
						const $prodListLastItemBottomPosition = $prodListLastItem ? 
							$prodListLastItem.offset().top + $prodListLastItem.outerHeight() : 0;

						if ( $prodListLastItemBottomPosition >= $categoryBottomPosition ) {
							const catalogHref = $category.find('.catalog-subtitle a').attr('href');
							const allProductsLink = `
								<li>
									<a class="link-category" href="${catalogHref}">
										${fn.handleTranslationMessages('allCategories')}
										<i class="icomoon icon-arrow_long"></i>
									</a>
								</li>`;

							$prodListItems.each((i, item) => {
								const $li = $(item);
								const $liBottomPosition = $li.offset().top + $li.outerHeight();
								
								if ( $liBottomPosition >= ($categoryBottomPosition - 30) ) {
									$li.remove();
								}
							})

							$category.find('.prod-list').append(allProductsLink);
						}
					}
				})
			},

			handleAutocomplete() {
				$.widget( "custom.searchcomplete", $.ui.autocomplete, {
					_create: function() {
						this._super();
						this.widget().menu( "option", "items", "> :not(.ui-autocomplete-subtitle)" );
					},

					_renderMenu: function( ul, items ) {
						let that = this,
							isAddSubtitle = true;

						$.each( items, function( index, item ) {
							let li;

							if ( isAddSubtitle && item.isCategory ) {
								ul.append( `<li class='ui-autocomplete-subtitle'>
									${fn.handleTranslationMessages('searchByCategory')}
								</li>` );
								isAddSubtitle = false;
							}
							
							li = that._renderItemData( ul, item );
						});
					},

					_renderItem: function(ul, item){
						let li = $( "<li></li>" ).data( "item.route", item );

						item.route ?
							li.append( `<a href='${item.route}'>${item.label}</a>` ) :
							li.append( "<div>" + item.label + "</div>" );

						return li.appendTo( ul );
					}
				});

				$autocompleteInp.searchcomplete({
					source: function(request, response) {
						fn.showSpinnerSearch();					
						thnstkapi.getAutocompleteData(request.term, fn.isRuLang())
							.then(res => {
								const products = res.data.products.map(p => ({label: p.title_ru, route: p.route, isCategory: false}) );
								const productsLinks = res.data.categories.map(p => ({label: p.title_ru, route: p.route, isCategory: true}) );
								response( [...products, ...productsLinks] );
								fn.hideSpinnerSearch();
							})
							.catch(err => {
								console.log(err);
								window.flash(err.response.data.message, 'active');
								fn.hideSpinnerSearch();
							});
					},
					
					select: function( event, ui ) {
						const selectedItem = ui.item;
						if ( selectedItem && selectedItem.route ) {
							window.location.assign(selectedItem.route)
						}
					},
				});
			},

			handleAutocompleteInpOverlay() {
				$autocompleteInp.on('focus', function(e) {
					glob.searchOverlay = $(e.target).closest('.search').find('.searchOverlay').get(0);
					globFunc.showOverlay("menu", glob.searchOverlay);
					$('.search-form').css('z-index', 1000);
				});
				
				$autocompleteInp.on('blur', function() {
					globFunc.hideOverlay("menu", glob.searchOverlay);
					setTimeout(() => $('.search-form').css('z-index', 0), 300)
				});
			},

			handleAutocompleteInpCloseBtn() {
				$autocompleteInp.on('input', function(e) {
					const isShowBtn = e.target.value.length ? true : false;
					
					if ( isShowBtn ) {
						$clearSearchInpBtn.show()
					} else {
						$clearSearchInpBtn.hide()
						fn.hideSpinnerSearch();
					};
				});

				$clearSearchInpBtn.on('click', function(e) {
					const $searchInp = $(e.target).closest('.search').find('input');
					
					$searchInp.val('');
					$clearSearchInpBtn.hide();
					fn.hideSpinnerSearch();
				});
			},
				
			onDocLoad() {
				if ( $fromItemPrice.length )
					fn.onInputFromPrice();

				if ( $toItemPrice.length )
					fn.onInputToPrice();

				if ( $sliderRange.length )
					fn.onPriceSliderChange();

				if ( $priceSubmitBtn.length )
					fn.handlePriceSubmitBtn();				
			},

			setHeightTitleNewsCard() {
				const $cardBlocks = $(".news-page .stock-card__descr");
				const $arrElements = [];
				let rowArr = [];
				let $flag = 0;
			
				for (let i = 0; i < $cardBlocks.length; i++) {
				  const $element = $cardBlocks[i];
				  const $top = $element.getBoundingClientRect().top;
			
				  if (i === 0) $flag = $top;
				 
				  if ($flag === $top) {
					rowArr.push($element);
				  }
			
				  if ($flag !== $top) {
					$arrElements.push(rowArr);
			
					rowArr = [];
					
					$flag = $top;
					rowArr.push($element);
				  }
				  
				  if (i === $cardBlocks.length - 1) {
					$arrElements.push(rowArr);
				  }
			
				}
			
				$arrElements.forEach((rowArr) => {
					const $rowArr = $(rowArr);
			
					var mh = 0;
					$rowArr.each(function () {
						var h_block = parseInt($(this).height());
						if(h_block > mh) {
						   mh = h_block;
						};
						
					});
					$rowArr.height(mh);
				})
			
			},

			initActivedModalMessage() {
				const $modalMessage = $('.modal-message');
				const $btnClose = $(".button-close");
				const $overlay = $(".modal-overlay");
				$btnModalMessage.on('click', () => {
					const $popapContact = $(".contacts-wrapper")
					$popapContact.removeClass("active")
					$modalMessage.show()
				})
				$btnClose.on("click", () => {
					$modalMessage.hide()
				})	
				$overlay.on("click", () => {
					$modalMessage.hide()
				})	
			},

			initActivedModalCallback() {
				const $modalCallback = $('.modal-callback');
				const $btnClose = $(".button-close");
				const $overlay = $(".modal-overlay");
				$btnModalcallback.on('click', () => {
				// $('.button-contact-js').on('click', () => {
					const $popapContact = $(".contacts-wrapper")
					$popapContact.removeClass("active")
					$modalCallback.show()
				})
				$btnClose.on("click", () => {
					$modalCallback.hide()
				})	
				$overlay.on("click", () => {
					$modalCallback.hide()
				})		
			},

			handlerActivedDropFilters() {
				var clientWidth = document.documentElement.clientWidth;
				if (clientWidth > 991) return false;

				const $btnDropFilters = $(".btn-drop-menu")
				const $parentFilter = $btnDropFilters.find("span")
				const $containerFilters = $btnDropFilters.closest(".products-filters-small")
				const $dropFilterList = $containerFilters.find("ul.drop-filters")
				const $dropFilterButtons = $(".drop-filters .products-filter-small")
				
				
				$btnDropFilters.on("click", function () {
					$dropFilterList.toggle(200)
					$btnDropFilters.find("i.icomoon").toggleClass("rotate-icon")
				})

				$dropFilterButtons.on("click", function() {
					const $btn = $(this)
					const $nameFilter = $btn.find("span")
					// console.log($nameFilter.html );
					// $parentFilter.html($nameFilter)

				})

			

			},

			f() {
				// const $dropFilterButtons = $(".drop-filters .products-filter-small")
				// const $btnDropFilters = $(".btn-drop-menu")
				// $dropFilterButtons.each(function(){

				// 	var t = null;
				// 	const $btn = $(this)
				// 	let $span = ""
				// 	$btn.on("click", function(){
				// 		t = setTimeout(function(){
				// 			$span = $btn.find("span")
				// 			$btnDropFilters.innerHTML = $span
				// 			t = null;
				// 		}, 100);
				// 	}, function(){
				// 		if (t){
				// 			clearTimeout(t);
				// 			t = null;
				// 		}
				// 		// else
				// 			// $btn.find(".dropdown-menu").slideUp(300);
				// 	});

				// });
			},

			domReady(cb) {
				fn.setThemeOnLoadPage();
				fn.handleChangeTheme();
				fn.handlerActivedDropFilters()
				// if ($inputMask.length) {
				// 	fn.initMaskInputPhone();
				// }

				if ( window.innerWidth >= 1280 ) {
					if ( $innerSubmenus.length )
					fn.setInnerSubmenusProdCategoryWidth();
				}

				if ( $productsPage.length )
					fn.handleWindowScrollY();

				if ( $backgroundSlider.length )
					fn.initBgSlider();

				if ( $sliderBanner.length )
					fn.initBannerSlider();

				if ( $slidersPageSection.length) 
					fn.initPageSectionSliders();
				
				if ($stockSlidersPageSection.length)
					fn.initStockSlideSection(); 
				

				if ( $sliderBrands.length )
					fn.initBrandsSlider();

				if ( $sliderAnotherProd.length )
					fn.initAnotherProdSlider();

				if ( $accWrapper.length )
					fn.initAccordion();

				if ( $sliderRange.length )
					fn.initPriceSlider();

				// if ( $fromItemPrice.length )
				// 	fn.onInputFromPrice();

				// if ( $toItemPrice.length )
				// 	fn.onInputToPrice();

				if ( $buttonShowAside.length ) {
					fn.onClickButtonShowAside();
					fn.onClickButtonCloseAside();
				}

				// if ( $productsFilterBtns.length ) 
				// 	fn.handleProductsFilterBtns();

				if ( $sliderComplectsSale.length )
					fn.initComplectsSaleSlider();

				if ( $sliderProd.length )
					fn.initProdSliders();

				if ( $formsValidate.length )
					fn.handleValidationForms();

				if ( $inputsTypeTel.length ) 
					fn.initTelMask();

				// if ( $counterElBtns.length )
				// 	fn.handleCounterEl();

				// if ( window.innerWidth > 768 ) {
				if ( $chosenSelects.length )
					fn.initChoosen();
				// }

				// if ( $popupBasket.length )
				// 	fn.initPopupBasket();

				if ( $gallery.length )
					fn.initColorbox();

				if ( $upBtn.length )
					fn.upBtnDecorator();

				if ( $ellpsisText.length ) {
					window.innerWidth >= 1280 ?
						fn.makeElipsisText($ellpsisText, app.settings.ellpsisText) :
						fn.makeElipsisText($ellpsisText, app.settings.ellpsisTextMobile);
				}

				if ( $ellpsisTextSmall.length )
					fn.makeElipsisText($ellpsisTextSmall, app.settings.ellpsisTextSmall);

				if ( $ellpsisTextMedium.length )
					fn.makeElipsisText($ellpsisTextMedium, app.settings.ellpsisTextMedium);

				if ( $contactsBlock.length ) {
					fn.handleCloseContactForm();
					fn.handleContactForms();
				}

				if ( $selectCitiesNewPost.length )
					fn.handleCitySelectChange(
						$selectCitiesNewPost, 
						thnstkapi.getNewPostDepartmentsById, 
						$selectDepartmentNewPost,
						'Description',
						false
					);

				if ( $selectCheckoutCitiesNewPost.length )
					fn.handleCitySelectChange(
						$selectCheckoutCitiesNewPost, 
						thnstkapi.getNewPostDepartmentsByIdInCheckout, 
						$selectDepartmentNewPost,
						'description_uk',
						false
					);

				if ( $selectCheckoutCitiesPickup.length ) 
					fn.handleCitySelectChange(
						$selectCheckoutCitiesPickup, 
						thnstkapi.getPickupDepartmentsById, 
						$selectDepartmentPickup,
						'address_'
					);


				if ( $stickersFavorit.length )
					fn.handleFavorits();

				if ( $('.product .prod-guarantee').length )
					fn.handleGuaranteeCheckboxToggle();

				if ( $orderDeliveryCheckedInput.length )
					fn.handleActiveDeliveryTab();

				if ( $orderRows.length )
					fn.handleOrderRows();

				if ( $officesCitySelect.length )
					fn.handleOffices();

				if ( $('.products-filter .checkbox-label, .products-filter-small') )
					fn.handleFiltersOnClick();

				if ( $resetFiltersBtn.length )
					fn.handleFilterResetBtn();

				if ( $priceSubmitBtn.length ) 
					fn.onClickPriceSubmitBtn();

				if ( $buttonToggleShowPass.length )
					fn.togglePasswordShow();

				if ($(".page").length) {
					fn.initActivedModalMessage();
					fn.initActivedModalCallback();
				}

				if ( $autocompleteInp.length ) {
					fn.handleAutocomplete();
					fn.handleAutocompleteInpOverlay();
					fn.handleAutocompleteInpCloseBtn();
				}

				if ( $cardNewsTitle.length ) {
					fn.setHeightTitleNewsCard();
				}

				if ( cb ) {
					cb();
				}

				if ($companyAboutList.length && window.innerWidth >= 1280) {
					fn.handlerVisibleSubmenu()
				}

				if ($categoriesNavWrapper.length) {
					fn.initMobileSlickCategory()
				}

				if ( $categories.length )
				fn.handleSubmenuHeight();

				if ($sortBySelector.length) {
					// console.log($sortBySelector)
					$sortBySelector.chosen({
						disable_search_threshold: 8,
						width: '100%'
					});

					setTimeout(function() {
						const selected = $sortBySelector[0].querySelector('.selected');

						if (selected) {
							selected.setAttribute('selected', 'selected');
							$sortBySelector.trigger("chosen:updated");
						}
						$sortBySelector[0].parentElement.classList.add('show');
					}, 500);


					fn.handleSortBySelectChange($sortBySelector); //add
				}

			}
		};

		$dom.ready(() => fn.domReady(fn.onDocLoad));

		// $(window).load(fn.onDocLoad);

		return fn;

	})(window,document,jQuery);
});




window.onload = function() {
	$('#page-preloader').fadeOut('slow');

	const $pickup = $('#pickup');
	const $secondarySelected = $pickup.find('select');
	$secondarySelected.attr('disabled', 'disabled')
}
