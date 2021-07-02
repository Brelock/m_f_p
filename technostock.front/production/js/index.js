'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var glob = {
	navMenuWrapper: null,
	navMenu: null,
	pageOverlay: null,
	headerOverlay: null,
	searchOverlay: null,

	scrollTopButton: null,
	cityQuerytimer: null

	// =================
};var globFunc = {
	returnDOM: function returnDOM(element) {
		return element instanceof jQuery ? element[0] : element;
	},

	showOverlay: function showOverlay(overlayType, overlayElement, additionalClass) {
		switch (overlayType) {
			case "popup":
				if (!overlayElement.classList.contains('js_openPopup')) {
					overlayElement.style.zIndex = 1150;
					overlayElement.style.visibility = 'visible';

					overlayElement.classList.add('js_openPopup');
					overlayElement.classList.add('js_open');

					additionalClass ? overlayElement.classList.add(additionalClass) : null;

					document.body.classList.add("js_pageOverlayOpen");
				}
				break;

			case "menu":
				if (!overlayElement.classList.contains('js_openMenu')) {
					overlayElement.style.zIndex = 900;
					overlayElement.style.visibility = 'visible';
					overlayElement.classList.add('js_openMenu');
					overlayElement.classList.add('js_open');
					document.body.classList.add("js_pageOverlayOpen--menu");
				}
				break;
		}
	},
	hideOverlay: function hideOverlay(overlayType, overlayElement, additionalClass) {
		switch (overlayType) {
			case "popup":
				if (overlayElement.classList.contains('js_openPopup')) {
					overlayElement.classList.remove('js_openPopup');
					overlayElement.classList.remove('js_open');

					additionalClass ? overlayElement.classList.remove(additionalClass) : null;

					document.body.classList.remove("js_pageOverlayOpen");
					setTimeout(function () {
						if (!overlayElement.classList.contains('js_openPopup')) {
							overlayElement.style.zIndex = -10;
							overlayElement.style.visibility = 'hidden';
						}
					}, 300);
				}
				break;

			case "menu":
				if (overlayElement.classList.contains('js_openMenu')) {
					overlayElement.classList.remove('js_openMenu');
					overlayElement.classList.remove('js_open');
					document.body.classList.remove("js_pageOverlayOpen--menu");
					setTimeout(function () {
						if (!overlayElement.classList.contains('js_openMenu')) {
							overlayElement.style.zIndex = -10;
							overlayElement.style.visibility = 'hidden';
						}
					}, 300);
				}
				break;
		}
	},

	toggleButtonContent: function toggleButtonContent(buttonElement, strObj) {
		var button = this.returnDOM(buttonElement);
		var text;

		// console.log(buttonElement)

		if (strObj) {
			text = strObj;
		} else if (buttonElement.dataset.text) {
			text = {
				default: buttonElement.dataset.text,
				active: buttonElement.dataset.textActive
			};
		}
		var buttonActive = button.classList.contains('active');

		if (buttonActive) {
			text ? button.querySelector('span').innerHTML = text.default : null;
			button.classList.remove('active');
		} else {
			text ? button.querySelector('span').innerHTML = text.active : null;
			button.classList.add('active');
		}
	},

	animateBlock: function animateBlock(block) {
		var self = this;
		this.removeClassFrom(block, 'js_animate');
		setTimeout(function () {
			self.addClassTo(block, 'js_animate');
		}, 50);
	},

	getCurrentYPosition: function getCurrentYPosition() {
		return window.pageYOffset || document.documentElement.scrollTop;
	},

	addClassTo: function addClassTo(element, activeClass) {
		var elem = this.returnDOM(element);
		if (!elem.classList.contains(activeClass)) {
			elem.classList.add(activeClass);
		}
	},
	removeClassFrom: function removeClassFrom(element, activeClass) {
		var elem = this.returnDOM(element);
		if (elem.classList.contains(activeClass)) {
			elem.classList.remove(activeClass);
		}
	},

	transitionHandler: function transitionHandler(event, targetBlock, hiddenContent) {
		if (event.propertyName) {
			console.log(event.propertyName); // your code here
		}

		if (event.srcElement) {
			console.log(event.srcElement); // your code here
		}
	},

	getChildsTotalWidth: function getChildsTotalWidth(parent) {
		var children = parent.children;
		var result = 0;

		for (var i = 0; i < children.length; i++) {
			result = result + children[i].offsetWidth;
		}
		return result;
	},

	getCoordsOnPage: function getCoordsOnPage(element) {
		var elem = this.returnDOM(element);
		var box = elem.getBoundingClientRect();

		return {
			top: box.top + pageYOffset,
			left: box.left + pageXOffset,
			bottom: box.bottom + pageYOffset
		};
	},

	getCoordsOnScreen: function getCoordsOnScreen(element) {
		var elem = this.returnDOM(element);
		var box = elem.getBoundingClientRect();

		return {
			top: box.top,
			left: box.left,
			bottom: box.bottom,
			right: box.right,
			width: box.width,
			height: box.height
		};
	},

	openWidth: function openWidth(element) {
		element.style.width = getChildsTotalWidth(element) + 'px';
	},
	collapseWidth: function collapseWidth(element) {
		element.style.width = '0';
	},

	isVisible: function isVisible(elem, option) {
		// var elem = this.returnDOM(element);
		var opt = void 0;
		option ? opt = option : opt = "whole";
		var windowTop = window.pageYOffset;
		var windowHeight = document.documentElement.clientHeight;
		var elemPageTop = elem.getBoundingClientRect().top + pageYOffset;
		var elemPageBottom = elemPageTop + elem.offsetHeight;

		if (opt == "whole") {
			if (document.documentElement.clientWidth > 991) {
				return elemPageBottom <= windowTop + windowHeight && elemPageTop >= windowTop;
			} else {
				return elemPageTop <= windowTop + windowHeight / 2 && elemPageTop >= windowTop;
			}
		}

		if (opt == "topBorder") {
			// console.log(windowTop)
			return elemPageTop >= windowTop + 130 && elemPageTop <= windowTop + windowHeight;
		}

		if (opt == "topBorderIn") {
			return elemPageTop <= windowTop + windowHeight;
		}

		if (opt == "bottomBorder") {
			// return elemPageTop >= windowTop + 10;
		}
	},

	isVisibleOnXAxis: function isVisibleOnXAxis(element, parent) {
		var isVisibleOnLeft = element.getBoundingClientRect().left > parent.getBoundingClientRect().left;
		var isVisibleOnRight = element.getBoundingClientRect().right < parent.getBoundingClientRect().right;
		return isVisibleOnLeft && isVisibleOnRight;
	},

	isLastChild: function isLastChild(element) {
		return element.nextElementSibling ? false : true;
	},
	isFirstChild: function isFirstChild(element) {
		return element.previousElementSibling ? false : true;
	}
	// ===============


};var cite = null;

$(document).ready(function () {
	if (document.getElementById('homePage')) {
		document.getElementById('mainHeader').classList.add('home-page');
	} else {
		document.getElementById('mainHeader').classList.remove('home-page');
	}
	// =================Include Modules==============================
	glob.ValidationModule = function () {
		function validate(inputElement, validationsArray) {
			var validations = validationsArray;
			var messages = [];

			function isNumber(input) {
				return !isNaN(parseFloat(input.value)) && isFinite(input.value);
			}

			function isEmail(input) {
				var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

				return regex.test(input.value);
			}

			function isEmpty(input) {
				// if (input.classList.contains("input_mask_phone") ) {
				// 	if (input.value.replace(/\s/g,"").length == 12) {
				// 		return false;
				// 	}
				// 		return true;
				// }
				// if (input.value === '380') {
				// 	return true;
				// }
				return input.value.replace(/\s/g, "").length ? false : true;
			}

			function checkLenght(input) {
				var minSymbols = Number(input.dataset.minLength);
				console.log(input.value.replace(/\s/g, "").length);
				return input.value.replace(/\s/g, "").length < minSymbols ? false : true;
			}

			function isInpChecked(input) {
				return input.checked;
			}

			// ---------------------

			for (var _i = 0; _i < validations.length; _i++) {

				switch (validations[_i]) {
					case 'required':
						if (isEmpty(inputElement)) {
							messages.push(inputElement.dataset.errorText);
						}
						break;

					case 'isNumber':
						if (!isNumber(inputElement)) {
							messages.push(inputElement.dataset.errorText);
						}
						break;

					case 'isEmail':
						if (!isEmail(inputElement)) {
							messages.push(inputElement.dataset.errorText);
						}
						break;

					case 'length':
						if (!checkLenght(inputElement)) {
							messages.push(inputElement.dataset.errorText);
						}
						break;

					case 'requiredRadio':
						if (!isInpChecked(inputElement)) {
							messages.push(inputElement.dataset.errorText);
						}
						break;

					default:
						console.error('invalid input data-validate value');

				}
			}
			// console.log(messages.length ? messages : null)
			return messages.length ? messages : null;
		}

		function showWarning(inputElement, messages, textColor) {
			inputElement.classList.add('js_containsError');
			var warningList = $('<ul class="js_warning-list"></ul>');

			for (var _i2 = 0; _i2 < messages.length; _i2++) {
				var listElement = $("<li></li>").text(messages[_i2]);
				textColor ? listElement.css('color', textColor) : null;
				warningList.append(listElement);
			}

			$(inputElement).parent().hasClass('chosen-wrapper') ? $(inputElement).next().after(warningList) : $(inputElement).after(warningList);
		}

		function isValid(formElement) {
			var form = formElement instanceof jQuery ? formElement[0] : formElement;
			var inputs = form.querySelectorAll('[data-validate]:not(:disabled)');
			// console.log('inputs', inputs);
			var errorsCounter = 0;

			for (var _i3 = 0; _i3 < inputs.length; _i3++) {
				var errorMessages = [];
				var textColor = inputs[_i3].dataset.textColor;

				$(inputs[_i3]).removeClass("js_containsError");
				$(inputs[_i3]).nextAll('.js_warning-list').remove();

				var validationsArray = [];
				var inputData = inputs[_i3].dataset.validate ? inputs[_i3].dataset.validate.split(' ') : false;

				// ---------
				inputs[_i3].value = inputs[_i3].value.trim();
				// ---------

				validationsArray = inputData ? inputData : null;
				// inputs[i].required ? validationsArray.push('required') : null;

				if (validationsArray.length) {
					var validationResult = validate(inputs[_i3], validationsArray);
					validationResult ? errorMessages = validationResult : null;
				}

				if (errorMessages.length) {
					showWarning(inputs[_i3], errorMessages, textColor);
					errorsCounter++;
				}
			}

			return errorsCounter > 0 ? false : true;
		}

		// ---------------
		return {
			isValid: isValid
		};
	}();

	// ---------Validation Script Test-------------

	// $('body').on('click', 'button[type="submit"]', function(e) {
	// 	// console.log('ok')
	// 	e.preventDefault();

	// 	// ValidationModule.isValid(this.form)
	// 	if( !ValidationModule.isValid(this.form) ) {
	// 		console.log('form not valid: ', this.form)
	// 	} else {
	// 		console.log('form valid: ', this.form)
	// 	}
	// })
	// console.log('PopupModule ok');
	// ==============Popup Open/Close Module ==============
	glob.PopupModule = function () {
		var additionalClassStr;
		var modals = document.getElementsByClassName('popup');
		var pageOverlay = document.getElementById('pageOverlay');

		function toggleShow(event, popupBlock) {
			var popup = globFunc.returnDOM(popupBlock);

			if (event.propertyName == 'transform' || event.propertyName == 'opacity') {
				popup.classList.contains('js_animate') ? null : popup.classList.remove('js_open');
			}
		}

		if (modals.length) {
			var _loop = function _loop(_i4) {
				modals[_i4].addEventListener("transitionend", function (event) {
					event.stopPropagation();
					toggleShow(event, modals[_i4]);
				}, false);
			};

			for (var _i4 = 0; _i4 < modals.length; _i4++) {
				_loop(_i4);
			}
		}

		function openPopup(popupBlock, additionalClass, overlayBlock) {
			var overlay = overlayBlock || pageOverlay;

			var popup = globFunc.returnDOM(popupBlock);
			popup.classList.add("js_open");
			popup.classList.add("js_animate");

			if (additionalClass) {
				additionalClassStr = additionalClass;
				globFunc.showOverlay("popup", overlay, additionalClass);
			} else {
				globFunc.showOverlay("popup", overlay);
			}
		}

		function closePopup(popupBlock) {
			// let overlay = overlayBlock || pageOverlay;
			var popup = globFunc.returnDOM(popupBlock);

			popup.classList.remove("js_animate");
			popup.classList.remove("js_open");
			// additionalClass ? hideOverlay("popup", overlay, additionalClass) : hideOverlay("popup", overlay);
		}

		// -------Events--------  

		$('body').on('click', '#pageOverlay', function (e) {
			// console.log(e)
			globFunc.hideOverlay("popup", this, additionalClassStr);

			if (modals) {
				for (var i = 0; i < modals.length; i++) {
					modals[i].classList.contains('js_open') ? closePopup(modals[i]) : null;
				}
			}
		});

		$('body').on('click', 'button.popupCloseButton', function () {
			// console.log('ok')

			closePopup($(this).closest('.popup'));
			globFunc.hideOverlay("popup", pageOverlay, additionalClassStr);
		});

		$('body').on('mousedown', '.popup', function (e) {
			// console.log(e.target)
			if (e.target.classList.contains('popup')) {
				closePopup(e.target);
				globFunc.hideOverlay("popup", pageOverlay, additionalClassStr);
			}
		});

		window.onkeydown = function (e) {
			if (e.keyCode === 27) {
				if (pageOverlay) {
					pageOverlay.classList.contains('js_open') ? globFunc.hideOverlay("popup", pageOverlay, additionalClassStr) : null;
				}

				if (modals) {
					for (var i = 0; i < modals.length; i++) {
						modals[i].classList.contains('js_open') ? closePopup(modals[i]) : null;
					}
				}
			}
		};

		// ------------

		return {
			openPopup: openPopup,
			closePopup: closePopup
		};
	}();

	// glob.PopupModule()

	// (function() {


	// }).call(glob.PopupModule.prototype)
	glob.SwitchTabsModule = function () {

		var defaultTabsButtons = document.querySelectorAll('.tabsNav .tabButton'),
		    defaultTabsBlocksContainer = document.querySelector('.toggleBlocks-list'),
		    defaultTabsBlocksList = document.querySelectorAll('.toggleBlock'),
		    tabsButtonsScdry = document.querySelectorAll('.tabsNav-secondary .tab'),
		    tabsBlocksListScdry = document.querySelectorAll('.toggleBlock-secondary');
		// $btnsSteps = $('.button-step-js'),
		// $tabBlockOrder = document.querySelectorAll('.step-tab');


		function switchTabs(tabButton, tabsBlocks, tabButtons) {
			var target = tabButton.dataset.target;
			if (!tabButton.classList.contains('active')) {
				for (var _i5 = 0; _i5 < tabsBlocks.length; _i5++) {
					tabButtons[_i5].classList.remove('active');
					tabsBlocks[_i5].classList.remove('active');

					if (target === tabsBlocks[_i5].id) {
						tabButton.classList.add('active');
						tabsBlocks[_i5].classList.add('active');
					}
				}
			}
		}

		function swithcDisabledField(e, tabButton, tabs) {
			var $target = $(tabButton).data("target");

			$(tabs).each(function (idx, tab) {
				var $tab = $(tab);
				var $fields = $tab.find('input, select');
				$fields.attr('disabled', true);

				if ($target === $tab.attr('id')) {
					$fields.attr('disabled', false);
				}
			});
		}

		// function toggleOrderTab() {
		// 	$btnsSteps.on('click', function() {
		// 		let target = $(this).data('target');

		// 		for (let i = 0; i < $tabBlockOrder.length; i++) {
		// 			$tabBlockOrder[i].classList.remove('active');

		// 			if (target === $tabBlockOrder[i].id) {
		// 				$tabBlockOrder[i].classList.add('active'); 
		// 			} 
		// 		}
		// 	});
		// }

		// ---events---

		$('.tabsNav').on('click', '.tabButton', function () {
			var tabsGroup = document.getElementsByClassName(this.dataset.tabsGroup);
			var tabButtons = this.parentElement.getElementsByClassName('tabButton');
			var tabsBlocksContainer = this.parentElement.parentElement.getElementsByClassName(this.dataset.tabsContainer)[0];

			// console.log(tabButtons)
			// console.log(tabsBlocksContainer)
			if (tabsGroup.length) {
				switchTabs(this, tabsGroup, tabButtons);
			} else {
				switchTabs(this, defaultTabsBlocksList, tabButtons);
			}

			if (tabsBlocksContainer) {
				globFunc.animateBlock(tabsBlocksContainer);
			} else {
				globFunc.animateBlock(defaultTabsBlocksContainer);
			}
		});

		for (var _i6 = 0; _i6 < tabsButtonsScdry.length; _i6++) {
			// console.log('---', tabsButtonsScdry[i]);
			tabsButtonsScdry[_i6].onclick = function (e) {
				switchTabs(this, tabsBlocksListScdry, tabsButtonsScdry);
				swithcDisabledField(e, this, tabsBlocksListScdry);
			};
		}

		// if ( $btnsSteps.length )
		// 	toggleOrderTab();
	}();

	var Thnstkapi = function () {
		function Thnstkapi() {
			_classCallCheck(this, Thnstkapi);

			this._hostUrl = window.location.origin;
			this._baseUrlCabinet = this._hostUrl + '/cabinet/';
			this._baseUrlDeliveries = this._hostUrl + '/deliveries/';
			this._baseUrlFavorite = this._hostUrl + '/';
			this._baseUrlStores = this._hostUrl + '/stores';
			this._baseUrlAutocomplete = '/topSearch/';
		}

		_createClass(Thnstkapi, [{
			key: 'getResource',
			value: function getResource(url) {
				return axios.get(url);
			}
		}, {
			key: 'postResource',
			value: function postResource(url) {
				return axios.post(url);
			}
		}, {
			key: 'getNewPostDepartmentsById',
			value: function getNewPostDepartmentsById(id) {
				var url = this._baseUrlCabinet + 'addresses/get-np-warehouses/' + id;
				return this.getResource(url);
			}
		}, {
			key: 'getNewPostCitiesByQuery',
			value: function getNewPostCitiesByQuery(query) {
				var url = this._baseUrlDeliveries + 'nova-poshta/get-cities?q=' + query;
				return this.getResource(url);
			}
		}, {
			key: 'getNewPostDepartmentsByIdInCheckout',
			value: function getNewPostDepartmentsByIdInCheckout(id) {
				var url = this._baseUrlDeliveries + 'nova-poshta/get-warehouses/' + id;
				return this.getResource(url);
			}
		}, {
			key: 'getPickupDepartmentsById',
			value: function getPickupDepartmentsById(id) {
				var url = this._baseUrlDeliveries + 'pickup/get-stores/' + id;
				return this.getResource(url);
			}
		}, {
			key: 'postToggleFavorites',
			value: function postToggleFavorites(id) {
				var url = this._baseUrlFavorite + 'favorites/' + id + '/toggle';
				return this.postResource(url);
			}

			// addGuarantee(prodId, guaranteeId) {
			// 	axios.post(`/cart/add-warranty/${prodId}/${guaranteeId}`)
			// 		.then(response => {
			// 			console.log('/add-warranty', response);
			// 		});
			// }

			// removeGuarantee(prodId, cb) {
			// 	axios.post(`/cart/remove-warranty/${prodId}`)
			// 		.then(response => {
			// 			console.log(`/remove-warranty/${prodId}`, response);
			// 		})
			// 		.then(response => {
			// 			if ( cb ) {
			// 				cb();
			// 			}
			// 		});
			// }

		}, {
			key: 'getAllCitiesInOfficesPage',
			value: function getAllCitiesInOfficesPage() {
				var url = '' + this._baseUrlStores;
				return this.getResource(url);
			}
		}, {
			key: 'getOfficesByCityId',
			value: function getOfficesByCityId(id) {
				var url = this._baseUrlStores + '?city=' + id;
				return this.getResource(url);
			}
		}, {
			key: 'getAutocompleteData',
			value: function getAutocompleteData(str, isRuLang) {
				var url = isRuLang ? this._hostUrl + '/ru' + this._baseUrlAutocomplete + str : '' + this._hostUrl + this._baseUrlAutocomplete + str;
				return this.getResource(url);
			}
		}]);

		return Thnstkapi;
	}();

	;
	// =============================================================

	// ---------Header Menu---------
	glob.navMenuWrapper = document.getElementById('navMenuWrapper');
	glob.navMenu = document.getElementById('navMenu');
	glob.pageOverlay = document.getElementById('pageOverlay');
	glob.headerOverlay = document.getElementById('headerOverlay');

	$('#burgerButton').on('click', function () {
		glob.navMenuWrapper.classList.add('js_showSlide');
		globFunc.showOverlay("menu", glob.pageOverlay);
	});

	$('#closeMenuButton, .navMenu__phone .button-contact-js').on('click', function () {
		glob.navMenuWrapper.classList.remove('js_showSlide');
		var openSubs = glob.navMenuWrapper.getElementsByClassName('js_showSlide');
		var $menuButtonsContainer = $('.menuButtonsContainer');
		var $productsDropdownMenuBtn = $('.productsDropdownMenu_button');
		$productsDropdownMenuBtn.show();

		for (var i = 0; i < openSubs.length; i++) {
			openSubs[i].classList.remove('js_showSlide');
		}

		$menuButtonsContainer.hasClass('active') ? $menuButtonsContainer.removeClass('active') : null;
		globFunc.hideOverlay("menu", glob.pageOverlay);
	});

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

	$('#navMenu').on('click', '.subMenuButton, .has-sub-menu', function () {
		var $btn = $(this);
		var $menuButtonsContainerTitle = $('.menuButtonsContainer__title');
		var $categoryTitle = $btn.parent().find('a').first().text();
		var $productsDropdownMenuBtn = $('.productsDropdownMenu_button');
		if (window.innerWidth < 1280) {
			var $hiddenHref = $('.has-sub-menu').attr('href', '#');
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
			hiddenContent.classList.contains('js_showSlide') ? null : hiddenContent.classList.add('js_showSlide');
		} else {
			hiddenContent = this.parentElement.nextElementSibling;
			hiddenContent.classList.contains('js_showSlide') ? null : hiddenContent.classList.add('js_showSlide');
		}

		var $menuButtonsContainer = $('.menuButtonsContainer');
		$menuButtonsContainer.hasClass('active') ? null : $menuButtonsContainer.addClass('active');
	});

	$('#prevMenuButton').on('click', function () {
		var $productsDropdownMenuBtn = $('.productsDropdownMenu_button');
		var openSubs = glob.navMenuWrapper.getElementsByClassName('js_showSlide');
		// const $showSlide = $("#navMenu .js_showSlide");
		var $menuButtonsContainer = $('.menuButtonsContainer');
		var $btn = $(this);
		var $menuButtonsContainerTitle = $('.menuButtonsContainer__title');
		$menuButtonsContainerTitle.text($btn.data('title'));

		if (openSubs.length == 1) {
			$productsDropdownMenuBtn.show();
		}
		if (openSubs.length) {
			// console.log("hfc", $test);
			// $showSlide.removeClass("js_showSlide")
			// $productsDropdownMenuBtn.show();
			openSubs[openSubs.length - 1].classList.remove('js_showSlide');
			// openSubs.removeClass('js_showSlide')
		}
		if (openSubs.length < 1) {
			$menuButtonsContainer.hasClass('active') ? $menuButtonsContainer.removeClass('active') : null;
		}
	});

	if (window.innerWidth >= 1280) {
		$('.firstPartBlock .productsDropdownMenu_button').on('mouseenter', function (e) {
			var $targetBlock = $(this).next();
			if ($targetBlock) {
				globFunc.showOverlay("menu", glob.headerOverlay);
				$targetBlock.css('height', $targetBlock.children().first().outerHeight() + 'px');
				$targetBlock.css('overflow', 'visible');
				$targetBlock.css('opacity', '1');
			}
		});

		$('#headerOverlay').hover(function (e) {
			var $productsDropdownMenuBtn = $('.productsDropdownMenu_button');
			var $productsSubMenu = $productsDropdownMenuBtn.next();
			$productsSubMenu.css('overflow', 'hidden');
			$productsSubMenu.css('height', 0);
			$productsSubMenu.css('opacity', 0);
			globFunc.hideOverlay("menu", glob.headerOverlay);
		});
	}

	$(glob.headerOverlay).on('click', function () {
		$('.productsDropdownMenu_button').removeClass('active');
		$('.productsDropdownMenu_button').next().css('height', 0);
		$('.descBurgerIcon').removeClass('active');
		globFunc.hideOverlay("menu", glob.headerOverlay);
	});
	if (document.documentElement.clientWidth > 1264) {
		if (!document.getElementById('homePage')) {
			var mainSubmenu,
			    maxHeight = 0;
			var allSubMenus = glob.navMenu.getElementsByClassName('submenu');

			if (allSubMenus.length) {
				mainSubmenu = allSubMenus[0];

				for (var i = 0; i < allSubMenus.length; i++) {
					var menuHeight = allSubMenus[i].offsetHeight;
					menuHeight > maxHeight ? maxHeight = menuHeight : null;
				}
				mainSubmenu.style.height = maxHeight + 'px';
			}
		}
	}

	if (window.innerWidth < 1280) {
		$('.mainHeader').on('click', '.menu-button', function (e) {
			globFunc.toggleButtonContent(this);
		});
	}

	$('.mainHeader').on('blur', '.menu-button', function () {
		if (this.classList.contains('active')) {
			globFunc.toggleButtonContent(this);
		}
	});
	// ---------Popups Block-------

	$('body').on('click', '.searchButton', function () {
		// e.preventDefault();
		var modal = $('#popupSearch');
		if (modal.length) {
			glob.PopupModule.openPopup(modal, "js_openPopup_search");
		}
	});

	$('body').on('click', '.button', function () {
		var modal = document.getElementById('id');
		if (modal) {
			glob.PopupModule.openPopup(modal);
		}
	});

	if ($('.ellipsis').length) {
		$(".description .ellipsis").dotdotdot({ height: 80, truncate: "word", watch: true });
		$(".title.ellipsis").dotdotdot({ height: 85, truncate: "word", watch: true });
	}

	// ---------Clean empty Tags-----
	var textBlocks = document.querySelectorAll('.description > p');

	if (textBlocks.length) {
		for (var i = 0; i < textBlocks.length; i++) {
			textBlocks[i].innerHTML ? null : textBlocks[i].parentElement.removeChild(textBlocks[i]);
		}
	}

	cite = function (window, document, $) {

		var $win = $(window),
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
		$sliderRange = $("#slider-range"),
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
		$orderDeliveryCheckedInput = $('.form-order-section--delivery input:checked'),
		    //mod

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
		$cardNewsTitle = $(".stock-card__descr");
		/* mask */
		// $inputMask = $(".input_mask_phone")

		// sorting
		var $sortBySelector = $('#sortBySelector'); //add


		var offices = null;

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
					noCities: 'ничего не найдено' //add2
				},
				'uk': {
					workTime: 'Час роботи',
					address: 'Адреса',
					noOffices: 'В даному місті немає відділень',
					searchByCategory: 'Шукати в категорії',
					allCategories: 'Усі категорії',
					allOffices: 'Всі відділення',
					pickCity: 'Виберіть город', //add2
					noCities: 'ничого не знайдено' //add2
				}
			}
		};

		var thnstkapi = new Thnstkapi();

		var fn = {
			initAjaxHeaders: function initAjaxHeaders() {
				$.ajaxSetup();
			},
			isRuLang: function isRuLang() {
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

			setInnerSubmenusProdCategoryWidth: function setInnerSubmenusProdCategoryWidth() {
				$innerSubmenus.each(function (idx, el) {
					var $submenu = $(el);
					var $submenuChildren = $submenu.children();
					var $lastElevenElemsOfSubmenu = $submenuChildren.slice(-11);
					var $submenuFirstChild = $submenu.find('.prod-category').first();
					var submenuFirstChildLeftPos = $submenuFirstChild.length ? $submenuFirstChild.offset().left : 0;
					var submenuChildRightPos = 0;

					$lastElevenElemsOfSubmenu.each(function (idx, subEl) {
						var $subEl = $(subEl);
						var subElRightPos = $subEl.offset().left + $subEl.outerWidth();

						subElRightPos > submenuChildRightPos ? submenuChildRightPos = subElRightPos : null;
					});

					$submenu.css({
						'width': submenuChildRightPos - submenuFirstChildLeftPos + 'px'
					});
				});
			},
			initBgSlider: function initBgSlider() {
				$backgroundSlider.slick({
					arrows: false,
					mobileFirst: true,
					autoplay: true,
					autoplaySpeed: 5000,
					responsive: [{
						breakpoint: 991,
						settings: {
							// dots: true,
							dotsClass: 'slick-dots slick-dots--horizontal'
						}
					}, {
						breakpoint: 1599,
						settings: {
							// dots: true,
							dotsClass: 'slick-dots'
						}
					}]
				});
			},
			initBannerSlider: function initBannerSlider() {
				$sliderBanner.slick({
					arrows: true,
					dots: true,
					autoplay: true,
					autoplaySpeed: 3000,
					dotsClass: 'slick-dots slick-dots--horizontal',
					prevArrow: '<button type="button" class="slick-prev"><i class="icomoon icon-arrow2"></i></button>',
					nextArrow: '<button type="button" class="slick-next"><i class="icomoon icon-arrow2"></i></button>'
				});
			},
			initPageSectionSliders: function initPageSectionSliders() {
				$slidersPageSection.each(function () {
					$(this).slick({
						arrows: false,
						mobileFirst: true,
						// prevArrow: '<button type="button" class="slick-prev"><i class="icomoon icon-arrow2"></i></button>',
						// nextArrow: '<button type="button" class="slick-next"><i class="icomoon icon-arrow2"></i></button>',
						slidesToShow: 2,
						autoplaySpeed: 4000,
						autoplay: true,
						appendArrows: $(this).closest('.pageSection').find('.pageSection-arrows'),
						responsive: [{
							breakpoint: 1200,
							settings: "unslick"
						}]
					});
				}).on('setPosition', function (event, slick) {
					slick.$slides.css('height', slick.$slideTrack.height() + 'px');
				});
			},
			initMobileSlickCategory: function initMobileSlickCategory() {
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
					responsive: [{
						breakpoint: 1200,
						settings: {
							slidesToShow: 6
						}
					}]
				});
			},
			initStockSlideSection: function initStockSlideSection() {
				$stockSlidersPageSection.slick({
					arrows: true,
					mobileFirst: true,
					prevArrow: '<button type="button" class="slick-prev"><i class="icomoon icon-arrow2"></i></button>',
					nextArrow: '<button type="button" class="slick-next"><i class="icomoon icon-arrow2"></i></button>',
					appendArrows: $('.stock_arrow_el'),
					slidesToShow: 1,
					responsive: [{
						breakpoint: 1200,
						settings: {
							slidesToShow: 4
						}
					}]
				});
			},
			initAnotherProdSlider: function initAnotherProdSlider() {
				$sliderAnotherProd.slick({
					arrows: true,
					mobileFirst: true,
					prevArrow: '<button type="button" class="slick-prev"><i class="icomoon icon-arrow2"></i></button>',
					nextArrow: '<button type="button" class="slick-next"><i class="icomoon icon-arrow2"></i></button>',
					slidesToShow: 1,
					appendArrows: $sliderAnotherProd.closest('.pageSection').find('.pageSection-arrows'),
					// autoplay: true,
					// autoplaySpeed: 3000,
					responsive: [{
						breakpoint: 576,
						settings: {
							slidesToShow: 2
						}
					}, {
						breakpoint: 768,
						settings: {
							slidesToShow: 3
						}
					}, {
						breakpoint: 991,
						settings: {
							slidesToShow: 6
						}
					}]
				}).on('setPosition', function (event, slick) {
					slick.$slides.css('height', slick.$slideTrack.height() + 'px');
				});
			},
			initBrandsSlider: function initBrandsSlider() {
				var slidesToShow = 5;
				var slides = $('.slider-brands__item').length;
				if (slidesToShow > slides - 1) {
					slidesToShow = slides - 1;
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
					responsive: [{
						breakpoint: 576,
						settings: {
							slidesToShow: 3
						}
					}, {
						breakpoint: 991,
						settings: {
							slidesToShow: slidesToShow || 5
						}
					}, {
						breakpoint: 1200,
						settings: {
							slidesToShow: slidesToShow || 8
						}
					}]
				});
			},
			initComplectsSaleSlider: function initComplectsSaleSlider() {
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
					responsive: [{
						breakpoint: 991,
						settings: {
							arrows: true
						}
					}]
				});
			},
			initProdSliders: function initProdSliders() {
				$sliderProd.slick({
					mobileFirst: true,
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: true,
					prevArrow: '<button type="button" class="slick-prev"><i class="icomoon icon-arrow2"></i></button>',
					nextArrow: '<button type="button" class="slick-next"><i class="icomoon icon-arrow2"></i></button>',
					fade: true,
					asNavFor: $sliderProdNav,
					responsive: [{
						breakpoint: 991,
						settings: {
							arrows: false
						}
					}]
				});

				$sliderProdNav.slick({
					mobileFirst: true,
					slidesToShow: 2,
					slidesToScroll: 1,
					arrows: false,
					vertical: true,
					asNavFor: $sliderProd,
					focusOnSelect: true,
					responsive: [{
						breakpoint: 991,
						settings: {
							slidesToShow: 3
						}
					}]
				});
			},
			initAccordion: function initAccordion() {
				$accWrapper.on('click', '.acc-button', function () {
					var $accItem = $(this).closest('.acc-item');
					var $accContentBlock = $accItem.find('.acc-content');
					$accItem.toggleClass('open');
					$accContentBlock.slideToggle();
				});
			},
			onInputFromPrice: function onInputFromPrice() {
				$fromItemPrice.on('change', function () {
					var val = $(this).val();
					$sliderRange.slider("values", 0, val);
					$sliderRange.closest('.products-filter').addClass('changed');
					$priceSubmitBtn.attr('disabled', false);
					// fn.handleFilters();
				});
			},
			onInputToPrice: function onInputToPrice() {
				$toItemPrice.on('change', function () {
					var val = $(this).val();
					$sliderRange.slider("values", 1, val);
					$sliderRange.closest('.products-filter').addClass('changed');
					$priceSubmitBtn.attr('disabled', false);
					// fn.handleFilters();
				});
			},
			handlePriceSubmitBtn: function handlePriceSubmitBtn() {
				var $productsFilterPriceBlock = $('.products-filter--price');

				if ($productsFilterPriceBlock.hasClass('changed')) {
					$priceSubmitBtn.attr('disabled', false);
				}
			},
			onClickPriceSubmitBtn: function onClickPriceSubmitBtn() {
				$priceSubmitBtn.on('click', function () {
					fn.saveWindowScrollYInLocalStorage();
					fn.handleFilters();
				});
			},
			initPriceSlider: function initPriceSlider() {
				$sliderRange.slider({
					range: true,
					min: 1,
					max: 35000,
					values: [1, 35000],
					slide: function slide(event, ui) {
						$fromItemPrice.val(ui.values[0]);
						$toItemPrice.val(ui.values[1]);
					}
					// change: function( event, ui ) {
					// 	fn.handleFilters();
					// },
				});
				$fromItemPrice.val($sliderRange.slider("values", 0));
				$toItemPrice.val($sliderRange.slider("values", 1));
			},
			onPriceSliderChange: function onPriceSliderChange() {
				$sliderRange.on("slidechange", function (event, ui) {
					$sliderRange.closest('.products-filter').addClass('changed');
					$priceSubmitBtn.attr('disabled', false);
					// fn.handleFilters();
				});
			},
			openAside: function openAside() {
				$aside.addClass('open');
			},
			closeAside: function closeAside() {
				$aside.removeClass('open');
			},
			onClickButtonShowAside: function onClickButtonShowAside() {
				$buttonShowAside.on('click', function () {
					fn.openAside();
				});
			},
			onClickButtonCloseAside: function onClickButtonCloseAside() {
				$buttonCloseAside.on('click', function () {
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

			handleChangeTheme: function handleChangeTheme() {
				$checkboxTheme.on('change', function (e) {
					var $target = $(e.currentTarget);
					var isWhiteTheme = $target.prop('checked');
					fn.toggleTheme();
					fn.saveThemeInStorage(isWhiteTheme);
				});
			},
			toggleTheme: function toggleTheme() {
				$body.toggleClass('white-theme');
			},
			saveThemeInStorage: function saveThemeInStorage(isWhiteTheme) {
				isWhiteTheme ? localStorage.setItem('theme', 'white') : localStorage.setItem('theme', 'dark');
			},
			setThemeOnLoadPage: function setThemeOnLoadPage() {
				var theme = localStorage.getItem('theme');
				if (theme === 'white') {
					// fn.toggleTheme();
					$body.addClass('white-theme');
					$checkboxTheme.prop('checked', true);
				}
			},
			handleValidationForms: function handleValidationForms() {
				$formsValidate.on('submit', function (e) {
					e.preventDefault();
					var $targetForm = $(this);
					var submitButton = this.querySelector('button[type="submit"');

					if (!glob.ValidationModule.isValid($targetForm)) {
						if ($targetForm.hasClass('form-order')) {
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
			handleScrollToWarning: function handleScrollToWarning($targetForm) {
				var $warning = $targetForm.find('.js_warning-list').first();

				if ($warning.length) {
					$('html, body').animate({
						scrollTop: $warning.offset().top - 80
					});
				}
			},
			initTelMask: function initTelMask() {
				$inputsTypeTel.each(function (idx, inp) {
					new Cleave(inp, {
						prefix: '380',
						numericOnly: true,
						blocks: [3, 2, 3, 2, 2],
						delimiters: [" ", " ", " "]
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

			initChoosen: function initChoosen() {
				for (var i = 0; i < $chosenSelects.length; i++) {
					var options = {
						disable_search_threshold: 8,
						width: '100%'
					};

					if ($chosenSelects[i].classList.contains('np-city-checkout-js')) {
						options.disable_search = true;
					}
					// console.log(options)
					$($chosenSelects[i]).chosen(options);

					if ($chosenSelects[i].classList.contains('np-city-checkout-js')) {
						var dropdown = $chosenSelects[i].nextElementSibling.querySelector('.chosen-drop');
						var search = document.createElement('div');
						search.classList.add('chosen-search', 'custom-search');
						search.innerHTML = '<input class="chosen-search-input"\n\t\t\t\t\t\t\ttype="text"\n\t\t\t\t\t\t\tautocomplete="off"\n\t\t\t\t\t\t\tplaceholder=\'\u043F\u043E\u0447\u043Di\u0442\u044C \u0432\u0432\u043E\u0434\u0438\u0442\u0438 \u043D\u0430\u0437\u0432\u0443...\'\n\t\t\t\t\t\t>';

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
			handleSortBySelectChange: function handleSortBySelectChange($select) {
				//add
				$select.on('change', function (e) {
					// console.log(evt.target.value)
					var selected = e.target.value;
					var splitted = selected.split('=');
					var alias = splitted[0];

					var target_button = document.querySelector('.products-filters-small.sort-buttons > [data-alias="' + alias + '"]');

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
			handleNovaPochtaCityQueryInput: function handleNovaPochtaCityQueryInput(_ref) {
				var target = _ref.target;
				//add2
				var query = target.value.trim();
				if (query.length > 0) {
					if (glob.cityQuerytimer) {
						clearTimeout(glob.cityQuerytimer);
					}
					glob.cityQuerytimer = setTimeout(function () {
						glob.cityQuerytimer = null;
						fn.handleCityQueryInputChange(query, thnstkapi.getNewPostCitiesByQuery, $selectCheckoutCitiesNewPost, 'description_uk', false);
					}, 500);
				}
			},
			handleCityQueryInputChange: function handleCityQueryInputChange(query, action, $select, fieldName, fieldWithUk) {
				//add2
				var actionFn = action.bind(thnstkapi);
				actionFn(query).then(function (res) {
					// const x = [{id:1, Description: 'test city', Ref: 'fc5f1e3c-928e-11e9-898c-005056b24375'}, {id:2, Description: 'test city 2', Ref: '6dbe932e-1aad-11ea-8c15-0025b502a06e'}]
					// const cities = [...res.data, ...x];
					var cities = res.data;

					fn.setNovaPostaCitiesDelivery($select, cities, fieldName, fieldWithUk);
				});
			},
			setNovaPostaCitiesDelivery: function setNovaPostaCitiesDelivery($selectCities, cities, fieldName, fieldWithUk) {
				//add2
				$selectCities.empty();
				if (!cities || !cities.length) {
					$selectCities.append('<option>' + fn.handleTranslationMessages('noCities') + '</option>');
					$selectCities.trigger('chosen:updated');
					return;
				};

				fn.appendCitiesToSelect(cities, $selectCities, fieldName, fieldWithUk);
				$selectCities.trigger('chosen:updated');
			},
			appendCitiesToSelect: function appendCitiesToSelect(cities, $select, fieldName, fieldWithUk) {
				//add2
				// $select.append(`<option value="">${fn.handleTranslationMessages('pickCity')}</option>`);
				cities.map(function (city) {
					var value = city[fieldName] || city.description_uk || city.description_ru;
					$select.append('<option data-id="' + city.ref + '" value="' + value + '">' + fn.handleTranslationResponse(fieldName, city, fieldWithUk) + '</option>');
				});
				$select.val(''); //mod3
			},
			handleCitySelectChange: function handleCitySelectChange($select, action, $selectDepartments, fieldName, fieldWithUk) {
				var actionFn = action.bind(thnstkapi);
				$select.on('change', function (evt) {
					var id = $(evt.target).find(':selected').data('id');
					if (id) {
						// mod
						var departments = null;
						actionFn(id).then(function (res) {
							departments = res.data;
							fn.setWarehousesOfAddressesDelivery($selectDepartments, departments, fieldName, fieldWithUk);
						});
					} else {
						fn.setWarehousesOfAddressesDelivery($selectDepartments, null, fieldName, fieldWithUk);
					}
				});
			},
			setWarehousesOfAddressesDelivery: function setWarehousesOfAddressesDelivery($selectDepartments, departments, fieldName, fieldWithUk) {
				$selectDepartments.empty();
				if (!departments || !departments.length) {
					$selectDepartments.prop('disabled', true);
					$selectDepartments.append('<option>' + fn.handleTranslationMessages('noOffices') + '</option>');
					$selectDepartments.trigger('chosen:updated');
					return;
				};

				$selectDepartments[0].parentElement.classList.remove('chosen-disabled');
				$selectDepartments.prop('disabled', false);
				fn.appendWarehousesToSelect(departments, $selectDepartments, fieldName, fieldWithUk);
				$selectDepartments.trigger('chosen:updated');
			},
			appendWarehousesToSelect: function appendWarehousesToSelect(departments, $selectDepartments, fieldName, fieldWithUk) {
				departments.map(function (department) {
					var value = department.Description || department.address_uk;
					$selectDepartments.append('<option value="' + value + '">' + fn.handleTranslationResponse(fieldName, department, fieldWithUk) + '</option>');
				});
			},
			initPopupBasket: function initPopupBasket() {
				$buyProdBtn.on('click', function () {
					glob.PopupModule.openPopup($popupBasket);
				});
			},
			initColorbox: function initColorbox() {
				$gallery.colorbox({
					rel: 'group1',
					opacity: "0.9",
					current: "",
					close: "",
					maxWidth: '90%',
					maxHeight: '100%',
					loop: false
				});
			},
			goTop: function goTop(e) {
				$("html, body").animate({
					scrollTop: 0
				}, 400);
			},
			showScrollBtn: function showScrollBtn() {
				var $top = $(this).scrollTop();

				if ($top > 200) {
					$upBtn.fadeIn(200);
				} else {
					$upBtn.fadeOut(200);
				}
			},
			upBtnDecorator: function upBtnDecorator() {
				$upBtn.on("click", fn.goTop);
				$(window).on("scroll", fn.showScrollBtn);
				fn.showScrollBtn();
			},
			makeElipsisText: function makeElipsisText($wrappers, height) {
				$wrappers.each(function (idx, el) {
					new Dotdotdot(el, {
						truncate: "word",
						ellipsis: "...",
						height: height
					});
				});
			},
			toggleContacts: function toggleContacts() {
				$contactsBlock.hasClass('active') ? $contactsBlock.removeClass('active') : $contactsBlock.addClass('active');
			},
			showContactForm: function showContactForm(target) {
				$contactsForms.each(function () {
					var $form = $(this);

					$form.removeClass('active');

					if ($form.hasClass(target)) {
						$form.addClass('active');
					}
				});
			},
			handleContactForms: function handleContactForms() {
				$btnContact.on('click', function () {
					var targetClass = $(this).data('form');
					var isContactsBlockOpen = $contactsBlock.hasClass('active');
					var activeForm = $contactsBlock.find('.form.active');

					if (isContactsBlockOpen && !activeForm.hasClass(targetClass)) {
						fn.showContactForm(targetClass);
						return;
					}

					fn.toggleContacts();
					fn.showContactForm(targetClass);
				});
			},
			handleCloseContactForm: function handleCloseContactForm() {
				$body.on('click', function (e) {
					var $target = $(e.target);
					var isTargetInContactsWrapper = $target.closest('.contacts-wrapper').length;

					if ($target.hasClass('button-contact-js')) return;

					if ($contactsBlock.hasClass('active') && !isTargetInContactsWrapper) {
						$contactsBlock.removeClass('active');
					}
				});

				fn.onClickCloseBtnContactsBlock();
			},
			onClickCloseBtnContactsBlock: function onClickCloseBtnContactsBlock() {
				$closeBtnContactsBlock.on('click', function () {
					fn.toggleContacts();
				});
			},
			handleFavorits: function handleFavorits() {
				$stickersFavorit.on('click', function () {
					var $favButton = $(this);
					var id = $favButton.data('product-id');

					thnstkapi.postToggleFavorites(id).then(function (res) {
						fn.toggleFavoriteButtonClass($favButton);
					}).catch(function (error) {
						console.log('error', error);
					});
				});
			},
			toggleFavoriteButtonClass: function toggleFavoriteButtonClass($btn) {
				$btn.toggleClass('sticker--favorits-added');
			},
			handleGuaranteeCheckboxToggle: function handleGuaranteeCheckboxToggle() {
				$body.on('click', '.product input[name=guarantee]', function (event) {
					var $inputGuarantee = $(this);
					// const guarantyId = $inputGuarantee.data('warranty-id');
					// const prodId = $inputGuarantee.data('product-id');
					var $guaranteeBlock = $inputGuarantee.closest('.prod-guarantee');
					var $inputsGroup = $guaranteeBlock.find('input[name=guarantee]').not($inputGuarantee);
					$inputsGroup.prop("checked", false);

					// thnstkapi.removeGuarantee(prodId, () => thnstkapi.addGuarantee(prodId, guarantyId));
				});
			},
			handleActiveDeliveryTab: function handleActiveDeliveryTab() {
				var $orderDeliveryItem = $orderDeliveryCheckedInput.closest('.radio-item');
				var $orderDeliveryItemData = $orderDeliveryItem.data('target');
				var $orderDeliveryTabsWrap = $('.order-post-toggleBlocks');
				var $orderDeliveryCurTab = $orderDeliveryTabsWrap.find('#' + $orderDeliveryItemData);
				var $fields = $orderDeliveryCurTab.find('input, select');

				$fields.attr('disabled', false).trigger("chosen:updated");
				$orderDeliveryCurTab.addClass('active');
			},
			handleOrderRows: function handleOrderRows() {
				$orderRows.on('click', function (e) {
					var url = $(e.currentTarget).data('url');
					document.location.assign(url);
				});
			},
			handleOffices: function handleOffices() {
				fn.initOfficesMap();
				fn.handleCitySelectOnChangeInOffices();
				fn.handleOfficeSelectOnChangeInOffices();
			},
			initOfficesMap: function initOfficesMap() {
				thnstkapi.getAllCitiesInOfficesPage().then(function (res) {
					offices = res.data;
					deptsMap.initMap();
					deptsMap.initCluster(deptsMap.createMarkersForCluster(offices));
				}).catch(function (err) {
					console.log('err', err);
				});
			},
			handleOfficeSelectOnChangeInOffices: function handleOfficeSelectOnChangeInOffices() {
				$officesOfficeSelect.on('change', function (evt, params) {
					var id = $(evt.target).find(':selected').data('id');
					$listPreloader.fadeIn(0);

					if (id === 'all') {
						deptsMap.zoom(8);
						fn.renderOfficesList(offices);
						return;
					}

					var currOffice = offices.filter(function (o) {
						return o.id === id;
					});
					var _currOffice$ = currOffice[0],
					    lat = _currOffice$.lat,
					    lng = _currOffice$.lng;


					deptsMap.zoomToOffice({ lat: lat, lng: lng, zoom: 18 });
					fn.renderOfficesList(currOffice);
				});
			},
			handleCitySelectOnChangeInOffices: function handleCitySelectOnChangeInOffices() {
				$officesCitySelect.on('change', function (evt, params) {
					var id = $(evt.target).find(':selected').data('id');
					$listPreloader.fadeIn(0);

					if (id === 'all') {
						thnstkapi.getAllCitiesInOfficesPage().then(function (res) {
							offices = res.data;
							fn.renderOfficesToOfficeSelect(offices);
							fn.renderOfficesList(offices);
							deptsMap.initMap();
							deptsMap.initCluster(deptsMap.createMarkersForCluster(offices));
						}).catch(function (err) {
							console.log('err', err);
						});

						return;
					}

					thnstkapi.getOfficesByCityId(id).then(function (res) {
						offices = res.data;
						fn.renderOfficesToOfficeSelect(offices);
						deptsMap.initMap();
						deptsMap.initCluster(deptsMap.createMarkersForCluster(offices));
						fn.renderOfficesList(offices);
					}).catch(function (err) {
						console.log('err', err);
					});
				});
			},
			renderOfficesToOfficeSelect: function renderOfficesToOfficeSelect() {
				var departments = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

				$officesOfficeSelect.empty();
				if (!departments.length) {
					$officesOfficeSelect.append('<option>' + fn.handleTranslationMessages('noOffices') + '</option>');
					$officesOfficeSelect.trigger('chosen:updated');
					return;
				};

				fn.appendTkhnstkOfficesToSelect(departments);
				$officesOfficeSelect.trigger('chosen:updated');
			},
			appendTkhnstkOfficesToSelect: function appendTkhnstkOfficesToSelect(departments) {
				$officesOfficeSelect.append('<option data-id="all">' + fn.handleTranslationMessages('allOffices') + '</option>');
				departments.map(function (department) {
					$officesOfficeSelect.append('<option data-id="' + department.id + '">' + fn.handleTranslationResponse('address_', department) + '</option>');
				});
			},
			handleTranslationMessages: function handleTranslationMessages(key) {
				var messages = app.settings.messages;


				return cite.isRuLang() ? messages.ru[key] : messages.uk[key];
			},
			handleTranslationResponse: function handleTranslationResponse(key, source) {
				var withUk = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

				return cite.isRuLang() ? source[key + 'ru'] : withUk ? source[key + 'uk'] : source['' + key];
			},
			renderOfficesList: function renderOfficesList() {
				var offices = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

				var officesInnerHTML = '';

				offices.map(function (office) {
					var city = office.city;


					officesInnerHTML += '\n\t\t\t\t\t<div class="departments-item">\n\t\t\t\t\t\t<div class="departments-item__img">\n\t\t\t\t\t\t\t<img src="' + office.image_path + '">\n\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t<div class="departments-item__location departments-item__wrap">\n\t\t\t\t\t\t\t<div class="departments-item__title">' + fn.handleTranslationMessages('address') + '</div>\n\t\t\t\t\t\t\t<div class="departments-item__descr">\n\t\t\t\t\t\t\t\t' + fn.handleTranslationResponse('title_', city) + ', ' + fn.handleTranslationResponse('address_', office) + '\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t<div class="departments-item__time departments-item__wrap">\n\t\t\t\t\t\t\t<div class="departments-item__title">' + fn.handleTranslationMessages('workTime') + '</div>\n\t\t\t\t\t\t\t<div class="departments-item__descr">' + fn.handleTranslationResponse('work_time_', office) + '</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t';
				});

				$departmentsList.html(officesInnerHTML);
				$listPreloader.fadeOut('slow');
			},
			handleFilters: function handleFilters(settings) {
				var $filterItems = $('.products-filter, .products-filter-small');
				var $perPageItems = $('.numbers-of-products');
				var qs = '';
				var getParams = '';

				$filterItems.each(function (idx, filterItem) {
					qs += fn.createStrByAsideFilters(filterItem);
					qs += fn.createStrByAscDescFilters(filterItem);
				});
				qs += fn.addToStrSaleOrTagAlias();

				if (settings && settings.addToParams) {
					//add
					qs += settings.addToParams + '/';
				}

				getParams += fn.createParamStr($perPageItems);

				fn.filterProducts(qs, getParams);
			},
			showSpinnerCatalog: function showSpinnerCatalog() {
				$spinnerCatalog.show();
			},
			showSpinnerSearch: function showSpinnerSearch() {
				$spinnerSearch.show();
			},
			hideSpinnerSearch: function hideSpinnerSearch() {
				$spinnerSearch.hide();
			},
			saveWindowScrollYInLocalStorage: function saveWindowScrollYInLocalStorage() {
				var windowPosition = window.scrollY;
				localStorage.setItem('windowPosition', windowPosition);
			},
			handleWindowScrollY: function handleWindowScrollY() {
				var windowPosition = localStorage.getItem('windowPosition');
				if (windowPosition) {
					window.scrollTo(0, Number(windowPosition));
					localStorage.removeItem('windowPosition');
				}
			},
			handleFiltersOnClick: function handleFiltersOnClick() {
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
			addToStrSaleOrTagAlias: function addToStrSaleOrTagAlias() {
				var _window$getOptionsFro = window.getOptionsFromCurrentHref(),
				    urlFilterOptions = _window$getOptionsFro.urlFilterOptions;

				var str = '';

				if (urlFilterOptions.length) {
					var filtersArr = urlFilterOptions.split('/');

					filtersArr.forEach(function (filter) {
						var alias = filter.match(/(.*)=/m);

						if ( /*alias[1] == 'sale' ||*/alias[1] == 'tag' || alias[1] == 'title') {
							str += filter;
						}
					});
				}

				return str;
			},
			createStrByAsideFilters: function createStrByAsideFilters(filterItem) {
				var str = '';
				var $filterItem = $(filterItem);
				var alias = $filterItem.data('alias');
				var isPriceBlock = $filterItem.hasClass('products-filter--price');

				if (isPriceBlock) {
					var isBlockChanged = $filterItem.hasClass('changed');

					if (isBlockChanged) {
						var from = $sliderRange.slider("values", 0);
						var to = $sliderRange.slider("values", 1);
						return str += alias + '=' + from + 'to' + to + '/';
					}
				}

				var $checkedInputs = $filterItem.find('.checkbox-label input:checked');

				if (!$checkedInputs.length) return '';

				str += '' + alias;

				$checkedInputs.each(function (idx, inp) {
					var value = $(inp).val();

					if (idx > 0) {
						return str += '-or-' + value;
					} else if (value) {
						str += '=';
					}

					if (value) {
						str += value;
					}
				});

				// console.log(str)
				return str += '/';
			},
			createStrByAscDescFilters: function createStrByAscDescFilters(filterItem) {
				var $filterItem = $(filterItem);
				if (!$filterItem.hasClass('products-filter-small active')) return '';
				var str = '';
				var alias = $filterItem.data('alias');
				return str += $filterItem.hasClass('desc') ? alias + '=desc/' : alias + '=asc/';
			},
			createParamStr: function createParamStr($perPageItems) {
				var _window$getOptionsFro2 = window.getOptionsFromCurrentHref(),
				    urlGetParams = _window$getOptionsFro2.urlGetParams;

				var str = '';
				var productsPerPageParam = '';

				$perPageItems.each(function (idx, perPageItem) {
					if ($(perPageItem).hasClass('active')) {
						productsPerPageParam = $(perPageItem).data('param');
					}
				});

				if (urlGetParams.length && !productsPerPageParam) {
					str = urlGetParams;
				} else if (!urlGetParams.length && productsPerPageParam) {
					str = productsPerPageParam;
				} else if (urlGetParams.length && productsPerPageParam) {
					var getParamsArr = urlGetParams.split('&');

					getParamsArr.forEach(function (p) {
						var param = p.match(/(.*)=/m);

						if (param[1] == 'per-page') {
							getParamsArr.splice(getParamsArr.indexOf(p), 1);
						}
					});
					getParamsArr.push(productsPerPageParam);
					str = getParamsArr.join('&');
				}

				return str;
			},
			filterProducts: function filterProducts(queryStr, getParams) {
				var prodBlock = $('.products');
				var dataUrl = prodBlock.data('url');
				var rootUrl = dataUrl.split('/').splice(3).join('/');

				getParams ? window.location.assign('/' + rootUrl + '/' + queryStr + '?' + getParams) : window.location.assign('/' + rootUrl + '/' + queryStr);
			},
			handleFilterResetBtn: function handleFilterResetBtn() {
				var _window$getOptionsFro3 = window.getOptionsFromCurrentHref(),
				    isPathHasOptions = _window$getOptionsFro3.isPathHasOptions;

				if (isPathHasOptions) {
					$resetFiltersBtn.css('display', 'inline-block');
				}
			},
			togglePasswordShow: function togglePasswordShow() {
				$buttonToggleShowPass.on('click', function () {
					var $inp = $(this).parent().find('input');

					$inp.attr('type') == 'password' ? $inp.attr('type', 'text') : $inp.attr('type', 'password');
				});
			},
			handlerVisibleSubmenu: function handlerVisibleSubmenu() {
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

				$companyAboutList.on("mouseover", function () {
					$(this).find(".submenuWrapper").css({ "visibility": "visible", "height": "0" });
				});
				$companyAboutList.on("mouseout", function () {
					$(this).find(".submenuWrapper").css({ "visibility": "hidden", "height": "auto" });
				});
			},
			handleSubmenuHeight: function handleSubmenuHeight() {
				var $categoryTop = $($categories[0]);
				// const $categoryBottom = $($categories[1]);
				var $categoryHeight = $categoryTop.outerHeight();
				var $categoryTopPosition = $categoryTop.offset().top;
				// console.log($categoryTop);
				// const $categoryBottomPosition = $categoryBottom.offset().top;
				// console.log($categoryBottomPosition);
				// const submenuHeight = ($categoryBottomPosition + $categoryHeight) - ($categoryTopPosition + $categoryHeight);
				var submenuHeight = $categoryTopPosition + $categoryHeight;

				$prodCategories.css('height', submenuHeight - 14 - 14 + 2); // 14 padding; 2 border;

				// fn.handleSubmenuItemsView();
			},
			handleSubmenuItemsView: function handleSubmenuItemsView() {
				$prodCategories.each(function (idx, el) {
					var $category = $(el);
					var $categoryBottomPosition = $category.offset().top + $category.outerHeight();
					var $prodListItems = $category.find('.prod-list li');

					if ($prodListItems.length) {
						var $prodListLastItem = $prodListItems.last();
						var $prodListLastItemBottomPosition = $prodListLastItem ? $prodListLastItem.offset().top + $prodListLastItem.outerHeight() : 0;

						if ($prodListLastItemBottomPosition >= $categoryBottomPosition) {
							var catalogHref = $category.find('.catalog-subtitle a').attr('href');
							var allProductsLink = '\n\t\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t\t<a class="link-category" href="' + catalogHref + '">\n\t\t\t\t\t\t\t\t\t\t' + fn.handleTranslationMessages('allCategories') + '\n\t\t\t\t\t\t\t\t\t\t<i class="icomoon icon-arrow_long"></i>\n\t\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t</li>';

							$prodListItems.each(function (i, item) {
								var $li = $(item);
								var $liBottomPosition = $li.offset().top + $li.outerHeight();

								if ($liBottomPosition >= $categoryBottomPosition - 30) {
									$li.remove();
								}
							});

							$category.find('.prod-list').append(allProductsLink);
						}
					}
				});
			},
			handleAutocomplete: function handleAutocomplete() {
				$.widget("custom.searchcomplete", $.ui.autocomplete, {
					_create: function _create() {
						this._super();
						this.widget().menu("option", "items", "> :not(.ui-autocomplete-subtitle)");
					},

					_renderMenu: function _renderMenu(ul, items) {
						var that = this,
						    isAddSubtitle = true;

						$.each(items, function (index, item) {
							var li = void 0;

							if (isAddSubtitle && item.isCategory) {
								ul.append('<li class=\'ui-autocomplete-subtitle\'>\n\t\t\t\t\t\t\t\t\t' + fn.handleTranslationMessages('searchByCategory') + '\n\t\t\t\t\t\t\t\t</li>');
								isAddSubtitle = false;
							}

							li = that._renderItemData(ul, item);
						});
					},

					_renderItem: function _renderItem(ul, item) {
						var li = $("<li></li>").data("item.route", item);

						item.route ? li.append('<a href=\'' + item.route + '\'>' + item.label + '</a>') : li.append("<div>" + item.label + "</div>");

						return li.appendTo(ul);
					}
				});

				$autocompleteInp.searchcomplete({
					source: function source(request, response) {
						fn.showSpinnerSearch();
						thnstkapi.getAutocompleteData(request.term, fn.isRuLang()).then(function (res) {
							var products = res.data.products.map(function (p) {
								return { label: p.title_ru, route: p.route, isCategory: false };
							});
							var productsLinks = res.data.categories.map(function (p) {
								return { label: p.title_ru, route: p.route, isCategory: true };
							});
							response([].concat(_toConsumableArray(products), _toConsumableArray(productsLinks)));
							fn.hideSpinnerSearch();
						}).catch(function (err) {
							console.log(err);
							window.flash(err.response.data.message, 'active');
							fn.hideSpinnerSearch();
						});
					},

					select: function select(event, ui) {
						var selectedItem = ui.item;
						if (selectedItem && selectedItem.route) {
							window.location.assign(selectedItem.route);
						}
					}
				});
			},
			handleAutocompleteInpOverlay: function handleAutocompleteInpOverlay() {
				$autocompleteInp.on('focus', function (e) {
					glob.searchOverlay = $(e.target).closest('.search').find('.searchOverlay').get(0);
					globFunc.showOverlay("menu", glob.searchOverlay);
					$('.search-form').css('z-index', 1000);
				});

				$autocompleteInp.on('blur', function () {
					globFunc.hideOverlay("menu", glob.searchOverlay);
					setTimeout(function () {
						return $('.search-form').css('z-index', 0);
					}, 300);
				});
			},
			handleAutocompleteInpCloseBtn: function handleAutocompleteInpCloseBtn() {
				$autocompleteInp.on('input', function (e) {
					var isShowBtn = e.target.value.length ? true : false;

					if (isShowBtn) {
						$clearSearchInpBtn.show();
					} else {
						$clearSearchInpBtn.hide();
						fn.hideSpinnerSearch();
					};
				});

				$clearSearchInpBtn.on('click', function (e) {
					var $searchInp = $(e.target).closest('.search').find('input');

					$searchInp.val('');
					$clearSearchInpBtn.hide();
					fn.hideSpinnerSearch();
				});
			},
			onDocLoad: function onDocLoad() {
				if ($fromItemPrice.length) fn.onInputFromPrice();

				if ($toItemPrice.length) fn.onInputToPrice();

				if ($sliderRange.length) fn.onPriceSliderChange();

				if ($priceSubmitBtn.length) fn.handlePriceSubmitBtn();
			},
			setHeightTitleNewsCard: function setHeightTitleNewsCard() {
				var $cardBlocks = $(".news-page .stock-card__descr");
				var $arrElements = [];
				var rowArr = [];
				var $flag = 0;

				for (var _i7 = 0; _i7 < $cardBlocks.length; _i7++) {
					var $element = $cardBlocks[_i7];
					var $top = $element.getBoundingClientRect().top;

					if (_i7 === 0) $flag = $top;

					if ($flag === $top) {
						rowArr.push($element);
					}

					if ($flag !== $top) {
						$arrElements.push(rowArr);

						rowArr = [];

						$flag = $top;
						rowArr.push($element);
					}

					if (_i7 === $cardBlocks.length - 1) {
						$arrElements.push(rowArr);
					}
				}

				$arrElements.forEach(function (rowArr) {
					var $rowArr = $(rowArr);

					var mh = 0;
					$rowArr.each(function () {
						var h_block = parseInt($(this).height());
						if (h_block > mh) {
							mh = h_block;
						};
					});
					$rowArr.height(mh);
				});
			},
			initActivedModalMessage: function initActivedModalMessage() {
				var $modalMessage = $('.modal-message');
				var $btnClose = $(".button-close");
				var $overlay = $(".modal-overlay");
				$btnModalMessage.on('click', function () {
					var $popapContact = $(".contacts-wrapper");
					$popapContact.removeClass("active");
					$modalMessage.show();
				});
				$btnClose.on("click", function () {
					$modalMessage.hide();
				});
				$overlay.on("click", function () {
					$modalMessage.hide();
				});
			},
			initActivedModalCallback: function initActivedModalCallback() {
				var $modalCallback = $('.modal-callback');
				var $btnClose = $(".button-close");
				var $overlay = $(".modal-overlay");
				$btnModalcallback.on('click', function () {
					// $('.button-contact-js').on('click', () => {
					var $popapContact = $(".contacts-wrapper");
					$popapContact.removeClass("active");
					$modalCallback.show();
				});
				$btnClose.on("click", function () {
					$modalCallback.hide();
				});
				$overlay.on("click", function () {
					$modalCallback.hide();
				});
			},
			handlerActivedDropFilters: function handlerActivedDropFilters() {
				var clientWidth = document.documentElement.clientWidth;
				if (clientWidth > 991) return false;

				var $btnDropFilters = $(".btn-drop-menu");
				var $parentFilter = $btnDropFilters.find("span");
				var $containerFilters = $btnDropFilters.closest(".products-filters-small");
				var $dropFilterList = $containerFilters.find("ul.drop-filters");
				var $dropFilterButtons = $(".drop-filters .products-filter-small");

				$btnDropFilters.on("click", function () {
					$dropFilterList.toggle(200);
					$btnDropFilters.find("i.icomoon").toggleClass("rotate-icon");
				});

				$dropFilterButtons.on("click", function () {
					var $btn = $(this);
					var $nameFilter = $btn.find("span");
					// console.log($nameFilter.html );
					// $parentFilter.html($nameFilter)
				});
			},
			f: function f() {
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
			domReady: function domReady(cb) {
				fn.setThemeOnLoadPage();
				fn.handleChangeTheme();
				fn.handlerActivedDropFilters();
				// if ($inputMask.length) {
				// 	fn.initMaskInputPhone();
				// }

				if (window.innerWidth >= 1280) {
					if ($innerSubmenus.length) fn.setInnerSubmenusProdCategoryWidth();
				}

				if ($productsPage.length) fn.handleWindowScrollY();

				if ($backgroundSlider.length) fn.initBgSlider();

				if ($sliderBanner.length) fn.initBannerSlider();

				if ($slidersPageSection.length) fn.initPageSectionSliders();

				if ($stockSlidersPageSection.length) fn.initStockSlideSection();

				if ($sliderBrands.length) fn.initBrandsSlider();

				if ($sliderAnotherProd.length) fn.initAnotherProdSlider();

				if ($accWrapper.length) fn.initAccordion();

				if ($sliderRange.length) fn.initPriceSlider();

				// if ( $fromItemPrice.length )
				// 	fn.onInputFromPrice();

				// if ( $toItemPrice.length )
				// 	fn.onInputToPrice();

				if ($buttonShowAside.length) {
					fn.onClickButtonShowAside();
					fn.onClickButtonCloseAside();
				}

				// if ( $productsFilterBtns.length ) 
				// 	fn.handleProductsFilterBtns();

				if ($sliderComplectsSale.length) fn.initComplectsSaleSlider();

				if ($sliderProd.length) fn.initProdSliders();

				if ($formsValidate.length) fn.handleValidationForms();

				if ($inputsTypeTel.length) fn.initTelMask();

				// if ( $counterElBtns.length )
				// 	fn.handleCounterEl();

				// if ( window.innerWidth > 768 ) {
				if ($chosenSelects.length) fn.initChoosen();
				// }

				// if ( $popupBasket.length )
				// 	fn.initPopupBasket();

				if ($gallery.length) fn.initColorbox();

				if ($upBtn.length) fn.upBtnDecorator();

				if ($ellpsisText.length) {
					window.innerWidth >= 1280 ? fn.makeElipsisText($ellpsisText, app.settings.ellpsisText) : fn.makeElipsisText($ellpsisText, app.settings.ellpsisTextMobile);
				}

				if ($ellpsisTextSmall.length) fn.makeElipsisText($ellpsisTextSmall, app.settings.ellpsisTextSmall);

				if ($ellpsisTextMedium.length) fn.makeElipsisText($ellpsisTextMedium, app.settings.ellpsisTextMedium);

				if ($contactsBlock.length) {
					fn.handleCloseContactForm();
					fn.handleContactForms();
				}

				if ($selectCitiesNewPost.length) fn.handleCitySelectChange($selectCitiesNewPost, thnstkapi.getNewPostDepartmentsById, $selectDepartmentNewPost, 'Description', false);

				if ($selectCheckoutCitiesNewPost.length) fn.handleCitySelectChange($selectCheckoutCitiesNewPost, thnstkapi.getNewPostDepartmentsByIdInCheckout, $selectDepartmentNewPost, 'description_uk', false);

				if ($selectCheckoutCitiesPickup.length) fn.handleCitySelectChange($selectCheckoutCitiesPickup, thnstkapi.getPickupDepartmentsById, $selectDepartmentPickup, 'address_');

				if ($stickersFavorit.length) fn.handleFavorits();

				if ($('.product .prod-guarantee').length) fn.handleGuaranteeCheckboxToggle();

				if ($orderDeliveryCheckedInput.length) fn.handleActiveDeliveryTab();

				if ($orderRows.length) fn.handleOrderRows();

				if ($officesCitySelect.length) fn.handleOffices();

				if ($('.products-filter .checkbox-label, .products-filter-small')) fn.handleFiltersOnClick();

				if ($resetFiltersBtn.length) fn.handleFilterResetBtn();

				if ($priceSubmitBtn.length) fn.onClickPriceSubmitBtn();

				if ($buttonToggleShowPass.length) fn.togglePasswordShow();

				if ($(".page").length) {
					fn.initActivedModalMessage();
					fn.initActivedModalCallback();
				}

				if ($autocompleteInp.length) {
					fn.handleAutocomplete();
					fn.handleAutocompleteInpOverlay();
					fn.handleAutocompleteInpCloseBtn();
				}

				if ($cardNewsTitle.length) {
					fn.setHeightTitleNewsCard();
				}

				if (cb) {
					cb();
				}

				if ($companyAboutList.length && window.innerWidth >= 1280) {
					fn.handlerVisibleSubmenu();
				}

				if ($categoriesNavWrapper.length) {
					fn.initMobileSlickCategory();
				}

				if ($categories.length) fn.handleSubmenuHeight();

				if ($sortBySelector.length) {
					// console.log($sortBySelector)
					$sortBySelector.chosen({
						disable_search_threshold: 8,
						width: '100%'
					});

					setTimeout(function () {
						var selected = $sortBySelector[0].querySelector('.selected');

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

		$dom.ready(function () {
			return fn.domReady(fn.onDocLoad);
		});

		// $(window).load(fn.onDocLoad);

		return fn;
	}(window, document, jQuery);
});

window.onload = function () {
	$('#page-preloader').fadeOut('slow');

	var $pickup = $('#pickup');
	var $secondarySelected = $pickup.find('select');
	$secondarySelected.attr('disabled', 'disabled');
};