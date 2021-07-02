var glob = {};

@@include('frames/globalMessages.js')
@@include('frames/globalFunctions.js')

var cite = null;

$(document).ready(function() {
	// =================Include Modules==============================
  @@include('frames/PopupModule.js')
  @@include('frames/ValidationModule.js')
	/*@@include('frames/AnimateBorderModule.js')*/
  /*@@include('frames/custom_Input_Type_number.js')*/
  /*@@include('frames/AccordionModule.js')*/
  /*@@include('frames/ToggleContentModule.js')*/
  @@include('frames/SwitchTabsModule.js')
  /*@@include('frames/TextLimitModule.js')*/
  /*@@include('frames/StickyBlockModule.js')*/
	// =============================================================

	cite = (function(window, document, $, undefined) {

		const $win = $(window),
     			$dom = $(document),
					$body = jQuery(document.body),
					app = {},
					touchEvent = 'ontouchstart' in window ? 'touchstart' : 'click',
					/* menu */
					$mainMenu = $('.main-menu'),
					$mainMenuBtn = $('.main-menu__button'),
					$closeButton = $('.close-button'),
					$mainMenuBg = $('.main-menu__second-part-bg'),
					/* slick */
					$bannerSlider = $('.banner-slider'),
					$worksInSlider = $('.worksIn-slider'),
					$invetorsSlider = $('.invetors-slider'),
					$equipmentInSlider = $('.equipmentIn-slider'),
					/* animate */
					$animateElements = $('.js_animate'),
					/* counter */
					$countersList = $('.countersList-js'),
					$counterElements = $('.counterContainer-js'),
					/* submit forms */
					$forms = $('.form-contacts-footer, .form-contacts, .form-calculation-sheet'),
					/* countdown */
					$day = $('.day-js'),
					$hour = $('.hour-js'),
					$min = $('.min-js'),
					$sec = $('.sec-js'),
					/* colorbox */
					$gallary = $('.gallary'),
					$gallaryWorkIn = $('.gallary-workIn'),
					/* for tel mask */
					$inputsTypeTel = $('input[type=tel]'),
					/* map */
					$mapEl = $('#map'),
					mapElId = $mapEl.attr('id'),
					/* green tariff countdown */
					$greenTariff = $('.greenTariff-js'),
					/* scroll top btn */
					$upBtn = $('.scrollTopContainer'),
					/* ellipse text */
					$gridNewsTitle = $('.news-item .grid__title'),
					$gridNewsText = $('.grid__text').not('.grid__descr--secondary .grid__text'),
					$gridEquipmentReady = $('.equipment-ready .grid__text'),
					/* scroll bottom */
					$scrollToBot = $('.js_scroll-to-bot'),
					/* show block */
					$radiosWithTarget = $('.radio-with-target-js'),
					$toggleFormBlocksGr1 = $('.toggle-form-block-gr1'),
					/* contact popup */
					$contactCloseBtn = $('.popupContact .close-button--fill'),
					$contactOpenBtn = $('.open-contact-popup-js');

		let timeEnd = new Date();

		// IE и FF по разному отрабатывают getYear()
		timeEnd = new Date(timeEnd.getYear() > 1900 ? 
			(timeEnd.getYear() + 1) : 
			(timeEnd.getYear() + 1901), 0, 1);
		
		app.settings = {
			"menuMaxWidth"  : 992,
			"isMobile" : /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(window.navigator.userAgent),
			"isAppleDevice" : /iPhone|iPad|iPod/i.test(window.navigator.userAgent),
			"delayRatio": 2,
			"greenInitMoney": 212580440,
			"greenTimeBegin": new Date(2019, 4, 27, 12, 17),
			"greenTimeEnd": new Date(2030, 0),
			"newsTitleHeight": 48,
			"newsTextHeight": 36,
			"equipmentGridTextHeight": 56,
			"formContactsFooterUrl" : '/callbacks',
			"formContactsUrl" : '/feedbacks',
			"formCalculationSheetUrl" : $('.form-calculation-sheet').data('url'),
		};

		const fn = {
			closeMenu() {
				$mainMenu.removeClass('js_show');
				$body.removeClass('menu-open');
			},

			toggleMenu() {
				if ( $body.hasClass('menu-open') ) {
					$mainMenu.removeClass('js_show');
					$body.removeClass('menu-open');
				} else {
					$mainMenu.addClass('js_show');
					$body.addClass('menu-open');
				}
			},

			initSlick() {
				$bannerSlider.slick({
					slidesToShow: 2,
					mobileFirst: true,
					prevArrow: '<button type="button" class="slick-prev"><i class="icomoon icon-arrow-left"></i></button>',
					nextArrow: '<button type="button" class="slick-next"><i class="icomoon icon-arrow-left"></i></button>',
					autoplay: true,
					autoplaySpeed: 3000,
					responsive: [
						{
							breakpoint: 768,
							settings: {
								slidesToShow: 3,
							}
						},
						{
							breakpoint: 998,
							settings: {
								slidesToShow: 4,
							}
						},
						{
							breakpoint: 1200,
							settings: {
								slidesToShow: 5,
							}
						},
					]
				});
			},

			initSlickWorkIn() {
				$worksInSlider.slick({
					slidesToShow: 1,
					mobileFirst: true,
					prevArrow: '<button type="button" class="slick-prev"><i class="icomoon icon-arrow-left"></i></button>',
					nextArrow: '<button type="button" class="slick-next"><i class="icomoon icon-arrow-left"></i></button>',
					adaptiveHeight: true,
					dots: true,
					mobileFirst: true,
					responsive: [
						{
							breakpoint: 768,
							settings: {
								slidesToShow: 2,
							}
						},
						{
							breakpoint: 1024,
							settings: {
								slidesToShow: 3,
							}
						},
						{
							breakpoint: 1200,
							settings: {
								slidesToShow: 4,
								dots: false,
							}
						}
					]
				});
			},

			initSlickInvestors() {
				$invetorsSlider.slick({
					slidesToShow: 1,
					adaptiveHeight: true,
					arrows: false,
					autoplay: true,
					autoplaySpeed: 3000,
				});
			},

			initSlickEquipmentIn() {
				$equipmentInSlider.slick({
					slidesToShow: 1,
					adaptiveHeight: true,
					arrows: false,
					autoplay: true,
					autoplaySpeed: 3000,
				});
			},

			isElementInView(el) {
				let elementTop = $(el).offset().top;
				let elementBottom = elementTop + $(el).outerHeight();
				let viewportTop = $(window).scrollTop();
				let viewportBottom = viewportTop + $(window).height();

				return elementBottom > viewportTop && elementTop < viewportBottom;
			},

			animateAllElements () {
				$animateElements.each((idx, el) =>  {
					if ( fn.isElementInView(el) ) {
						fn.doAnimateElement(el);
					}
				})
			},

			doAnimateElement(el) {
				let elementLeft = $(el).offset().left;
				let winWidth = window.innerWidth;
				let elementLeftInPercent = Math.floor(elementLeft) * 100 / winWidth;
				let delay = 1;

				if (elementLeftInPercent > 0 && elementLeftInPercent <= 20) {
						delay = 0;
				} else if (elementLeftInPercent > 20 && elementLeftInPercent <= 40) {
						delay = delay / app.settings.delayRatio;
				} else if (elementLeftInPercent > 40 && elementLeftInPercent <= 60) {
						delay = 1;
				} else if (elementLeftInPercent > 60 && elementLeftInPercent <= 80) {
						delay = delay + delay / app.settings.delayRatio;
				} else if (elementLeftInPercent > 80 && elementLeftInPercent <= 100) {
						delay = delay * app.settings.delayRatio;
				}

				setTimeout(function() {
					$(el).addClass(`animated mySlideInLeft`);
				}, delay * 200);
			},

			formateNumber(number) {
				let numStr = number + '';
				return numStr.replace(new RegExp("^(\\d{" + (numStr.length%3?numStr.length%3:0) + "})(\\d{3})", "g"), "$1 $2").replace(/(\d{3})+?/gi, "$1 ").trim(); 
			},

			startCounting($counterElems) {
				$counterElems.each(function() {
					let $this = $(this),
							countTo = $this.attr('data-count');
					
					$({ countNum: 0 }).animate(
						{ countNum: countTo, formatedNum: countTo },
						{
							duration: 2000,
							// easing:'easeOutCubic',
							step: function() {
								let num = Math.floor(this.countNum);
								this.formatedNum = fn.formateNumber(num);
								$this.text(this.formatedNum) 
							},
							complete: function() {
								let num = Math.floor(this.countNum);
								this.formatedNum = fn.formateNumber(num);
								$this.text(this.formatedNum)
							}
						}
					);  
				});
			},

			handleCounting() {
				if ( fn.isElementInView($countersList) && ! $countersList.hasClass('counted-js') ) {
					$countersList.addClass('counted-js');
					fn.startCounting($counterElements);
				}
			},

			handleStatisticForms($form) {
				console.log('in handleStatisticForms');
				if ( $form.hasClass('form-contacts') ) {
					console.log('handleStatistic');
					gtag('event', 'send', { 'event_category': 'napisatnam', 'event_action': 'button' });
				} 
				if ( $form.hasClass('form-contacts-footer') ) {
					console.log('handleStatistic');
					gtag('event', 'send', { 'event_category': 'zayavka', 'event_action': 'button' });
				} 
				if ( $form.hasClass('form-calculation-sheet') ) {
					console.log('handleStatistic');
					gtag('event', 'send', { 'event_category': 'partner', 'event_action': 'button' }); 
				} 
			},

			handleStatisticAllPhones() {
				$('a[href^=tel]').on('click', function() {
					console.log('handleStatisticAllPhones');
					gtag('event', 'send', { 'event_category': 'nomer', 'event_action': 'button' });
				});
			},

			handleStatisticPhonet() {
				$('body').on('click', '.teler-wd__button', function() {
					console.log('handleStatisticPhonet');
					if ( $('.teler-wd-phone-input__field ').val().length == 13 ) {
						gtag('event', 'send', { 'event_category': 'obrzvonok', 'event_action': 'button' });
					}
				});
			},

			handleSubmitForms() {
				$forms.on('submit', function(event) {
					event.preventDefault();
					let $targetForm = $(this);

					if ( glob.ValidationModule.isValid($targetForm) ) {
						console.log('isValid');
						let data = fn.prepareFormData(this);
						fn.postData($targetForm, data);
						fn.handleStatisticForms($targetForm);

						if ( $('#popupContact').hasClass('js_open') ) {
							glob.PopupModule.closePopup(document.getElementById('popupContact'));
						}
					}
				});
			},

			prepareFormData(form) {
				let inputs = form.querySelectorAll('input');
				let selects = form.querySelectorAll('select');
				let textareas = form.querySelectorAll('textarea');
		
				let data = {};
				if (inputs.length) {
					for (let i = 0; i < inputs.length; i++) {
						inputs[i].value ? data[ inputs[i].name ] = inputs[i].value : null;
					}
				}
		
				if (selects.length) {
					for (let i = 0; i < selects.length; i++) {
						selects[i].value && selects[i].value != 'placeholder' ? data[ selects[i].name ] = selects[i].value : null;
					}
				}
		
				if (textareas.length) {
					for (let i = 0; i < textareas.length; i++) {
						textareas[i].value ? data[ textareas[i].name ] = textareas[i].value : null;
					}
				}
				
				return data;
			},

			countdown(timeEnd) {
				// для задания обратного отсчета до определенной даты укажите дату в формате:
				// timeEnd = new Date(ГОД, МЕСЯЦ-1, ДЕНЬ);
				// Для задания даты с точностью до времени укажите дату в формате:
				// timeEnd = new Date(ГОД, МЕСЯЦ-1, ДЕНЬ, ЧАСЫ-1, МИНУТЫ);
				let today = new Date();
				today = Math.floor((timeEnd - today) / 1000);
				
				let tsec = today % 60; 
				today = Math.floor(today / 60); 
				if( tsec < 10 ) tsec = '0' + tsec;
				
				let tmin = today % 60; 
				today = Math.floor(today / 60); 
				if( tmin < 10 ) tmin = '0' + tmin;
				
				let thour = today % 24; 
				today = Math.floor(today / 24);
				
				$day.html(today);
				$hour.html(thour);
				$min.html(tmin);
				$sec.html(tsec);
			},

			formatIncomeMoney(IncomeMoney) {
				let res = [...String(IncomeMoney).split('')];

				if ( res.length == 9 ) {
					res.splice(res.length - 8, 0 , ' ');
					res.splice(res.length - 5, 0 , ' ');
				} else if ( res.length <= 8 && res.length >= 6 ) {
					res.splice(res.length - 5, 0 , ' ');
				}
				res.splice(res.length - 2, 0, ".");

				return res.join('');
			},

			updateIncomeMoney() {
				const { greenInitMoney, greenTimeBegin, greenTimeEnd } = app.settings;				
				let today = new Date();
				
				let allTimeInSeconds = Math.floor((greenTimeEnd - greenTimeBegin) / 1000);
				let leftTimeInSeconds = Math.floor((greenTimeEnd - today) / 1000);
				
				let incomeMoneyInSec = greenInitMoney / allTimeInSeconds;
				let incomeMoneyLeft = Math.floor(incomeMoneyInSec * leftTimeInSeconds);

				$greenTariff.html( fn.formatIncomeMoney(incomeMoneyLeft) );
			},

			initColorbox() {
        $gallary.colorbox({
          rel:'group1',
          opacity:"0.9", 
          current:"",
          close: "",
          maxWidth: '90%',
          maxHeight: '100%',
          loop: false,
				});
			},

			// initWorkInColorbox() {
			// 	$gallaryWorkIn.colorbox({
      //     rel:'group2',
      //     opacity:"0.9", 
      //     current:"",
      //     close: "",
      //     maxWidth: '90%',
      //     maxHeight: '100%',
			// 		loop: true,
			// 		returnFocus: false,
			// 	});
			// },

			initWorkInColorbox() {},

			initPhotoSwipeFromDOM(gallerySelector) {
				// parse slide data (url, title, size ...) from DOM elements 
				// (children of gallerySelector)
				var parseThumbnailElements = function(el) {
						var thumbElements = el.childNodes,
								numNodes = thumbElements.length,
								items = [],
								figureEl,
								linkEl,
								size,
								item;
		
						for(var i = 0; i < numNodes; i++) {
		
								figureEl = thumbElements[i]; // <figure> element
		
								// include only element nodes 
								if(figureEl.nodeType !== 1) {
										continue;
								}
		
								linkEl = figureEl.children[0]; // <a> element
		
								size = linkEl.getAttribute('data-size').split('x');
		
								// create slide object
								item = {
										src: linkEl.getAttribute('href'),
										w: parseInt(size[0], 10),
										h: parseInt(size[1], 10)
								};	
		
								if(figureEl.children.length > 1) {
										// <figcaption> content
										item.title = figureEl.children[1].innerHTML; 
								}
		
								if(linkEl.children.length > 0) {
										// <img> thumbnail element, retrieving thumbnail url
										item.msrc = linkEl.children[0].getAttribute('src');
								} 
		
								item.el = figureEl; // save link to element for getThumbBoundsFn
								items.push(item);
						}
		
						return items;
				};
		
				// find nearest parent element
				var closest = function closest(el, fn) {
						return el && ( fn(el) ? el : closest(el.parentNode, fn) );
				};
		
				// triggers when user clicks on thumbnail
				var onThumbnailsClick = function(e) {
						e = e || window.event;
						e.preventDefault ? e.preventDefault() : e.returnValue = false;
		
						var eTarget = e.target || e.srcElement;
		
						// find root element of slide
						var clickedListItem = closest(eTarget, function(el) {
								return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
						});
		
						if(!clickedListItem) {
								return;
						}
		
						// find index of clicked item by looping through all child nodes
						// alternatively, you may define index via data- attribute
						var clickedGallery = clickedListItem.parentNode,
								childNodes = clickedListItem.parentNode.childNodes,
								numChildNodes = childNodes.length,
								nodeIndex = 0,
								index;
		
						for (var i = 0; i < numChildNodes; i++) {
								if(childNodes[i].nodeType !== 1) { 
										continue; 
								}
		
								if(childNodes[i] === clickedListItem) {
										index = nodeIndex;
										break;
								}
								nodeIndex++;
						}
		
		
		
						if(index >= 0) {
								// open PhotoSwipe if valid index found
								openPhotoSwipe( index, clickedGallery );
						}
						return false;
				};
		
				// parse picture index and gallery index from URL (#&pid=1&gid=2)
				var photoswipeParseHash = function() {
						var hash = window.location.hash.substring(1),
						params = {};
		
						if(hash.length < 5) {
								return params;
						}
		
						var vars = hash.split('&');
						for (var i = 0; i < vars.length; i++) {
								if(!vars[i]) {
										continue;
								}
								var pair = vars[i].split('=');  
								if(pair.length < 2) {
										continue;
								}           
								params[pair[0]] = pair[1];
						}
		
						if(params.gid) {
								params.gid = parseInt(params.gid, 10);
						}
		
						return params;
				};
		
				var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
						var pswpElement = document.querySelectorAll('.pswp')[0],
								gallery,
								options,
								items;
		
						items = parseThumbnailElements(galleryElement);
		
						// define options (if needed)
						options = {
		
								// define gallery index (for URL)
								galleryUID: galleryElement.getAttribute('data-pswp-uid'),
		
								getThumbBoundsFn: function(index) {
										// See Options -> getThumbBoundsFn section of documentation for more info
										var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
												pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
												rect = thumbnail.getBoundingClientRect(); 
		
										return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
								}
		
						};
		
						// PhotoSwipe opened from URL
						if(fromURL) {
								if(options.galleryPIDs) {
										// parse real index when custom PIDs are used 
										// http://photoswipe.com/documentation/faq.html#custom-pid-in-url
										for(var j = 0; j < items.length; j++) {
												if(items[j].pid == index) {
														options.index = j;
														break;
												}
										}
								} else {
										// in URL indexes start from 1
										options.index = parseInt(index, 10) - 1;
								}
						} else {
								options.index = parseInt(index, 10);
						}
		
						// exit if index not found
						if( isNaN(options.index) ) {
								return;
						}
		
						if(disableAnimation) {
								options.showAnimationDuration = 0;
						}
		
						// Pass data to PhotoSwipe and initialize it
						gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
						gallery.init();
				};
		
				// loop through all gallery elements and bind events
				var galleryElements = document.querySelectorAll( gallerySelector );
		
				for(var i = 0, l = galleryElements.length; i < l; i++) {
						galleryElements[i].setAttribute('data-pswp-uid', i+1);
						galleryElements[i].onclick = onThumbnailsClick;
				}
		
				// Parse URL and open gallery if it contains #&pid=3&gid=1
				var hashData = photoswipeParseHash();
				if(hashData.pid && hashData.gid) {
						openPhotoSwipe( hashData.pid ,  galleryElements[ hashData.gid - 1 ], true, true );
				}
			},

			// initNewWorkInColorbox($gallary) {
			// 	$gallary.colorbox({
      //     rel:'group2',
      //     opacity:"0.9", 
      //     current:"",
      //     close: "",
      //     maxWidth: '90%',
      //     maxHeight: '100%',
			// 		loop: true,
			// 		returnFocus: false,
			// 	});
			// },

			// handleColorboxWorkIn() {
      //   fn.initWorkInColorbox();
				
			// 	$('body').on('click', '.gallary-workIn', function(e) {
			// 		e.preventDefault();
			// 		let $gallaryWorkIn = $('.gallary-workIn');
					
			// 		fn.initNewWorkInColorbox($gallaryWorkIn);
			// 	});
			// },
			
			initTelMask() {
				new Cleave($inputsTypeTel, {
					prefix: '+380',
					numericOnly: true,
					blocks: [4, 2, 3, 2, 2],
					delimiters: [" ", " ", " "],
				});
			},

			createMap(mapID, zoomVal) {
				let mapDiv = document.getElementById(mapID),
						mapData = mapDiv.dataset,
						center = { lat: Number(mapData.lat), lng: Number(mapData.lng) },
						zoom = zoomVal || 15,
						image = {
							url: mapData.imgurl,
							size : new google.maps.Size(56, 78),
						};  

				let map = new google.maps.Map(mapDiv, {
					center: center,
					zoom: zoom,
				});

				new google.maps.Marker({
					position: center, 
					map: map,
					icon: image,
					backgroundColor: 'rgba(0,0,0,.5)'
				}); 
			},

			initMap() {
				fn.createMap(mapElId);
			},

			getCurrentLang() {
				return $('html').attr('lang');
			},

			pastePopupMessageOnPostData(isSuccess) {
				switch( fn.getCurrentLang() ) {
					case 'ru':
						isSuccess ? 
							fn.openMessagePopup(glob.messages.successTitleRu) :
							fn.openMessagePopup(glob.messages.errorTitleRu);
						break;
					case 'uk':
						isSuccess ? 
							fn.openMessagePopup(glob.messages.successTitleUk) :
							fn.openMessagePopup(glob.messages.errorTitleUk);
						break;
					case 'en':
						isSuccess ? 
							fn.openMessagePopup(glob.messages.successTitleEn) :
							fn.openMessagePopup(glob.messages.errorTitleEn);
						break;
					default:
						isSuccess ? 
							fn.openMessagePopup(glob.messages.successTitleRu) :
							fn.openMessagePopup(glob.messages.errorTitleRu);
				}
			},

			postDataResponseDecorator($targetForm, isSuccess) {
				fn.pastePopupMessageOnPostData(isSuccess);
				fn.resetForm($targetForm);
				fn.closeMessPopupWithDelay();
			},

			postData($targetForm, data) {
				let url = fn.getUrl($targetForm);

				$.ajax({
					type: "POST",
					url: url,
					data: data,
					headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
				}).done(function(response) {
					fn.postDataResponseDecorator($targetForm, true);
				}).fail(function(error){
					fn.postDataResponseDecorator($targetForm, false);
				});

				fn.openMessagePopup(glob.messages.pending);
			},

			openMessagePopup(message) {
				let modal = document.getElementById('popupMessage');
				modal.querySelector('.title').innerHTML = message;
				glob.PopupModule.openPopup(modal);
			},

			openContactPopup() {
				let modal = document.getElementById('popupContact');
				
				$contactOpenBtn.on(touchEvent, function() {
					glob.PopupModule.openPopup(modal);
				});
			},

			closeMessPopupWithDelay() {
				let modal = document.getElementById('popupMessage');
				let overlay = document.getElementById('pageOverlay');
				if ( modal ) {
					setTimeout(function() {
						glob.PopupModule.closePopup(modal);
						globFunc.hideOverlay('popup', overlay);
					}, 2000);
				}
			},

			closeContactPopup() {
				let modal = document.getElementById('popupContact');
				let overlay = document.getElementById('pageOverlay');
				
				$contactCloseBtn.on(touchEvent, function() {
					if ( modal ) {
						glob.PopupModule.closePopup(modal);
						globFunc.hideOverlay('popup', overlay);
					}
				})
			},

			resetForm(formElement) {
				const form = formElement instanceof jQuery ? formElement[0] : formElement;
				form.reset();
			},

			getUrl($targetForm) {
				if ( $targetForm.hasClass('form-contacts-footer') )
					return app.settings.formContactsFooterUrl;
					
				if ( $targetForm.hasClass('form-contacts') )
					return app.settings.formContactsUrl;
					
				if ( $targetForm.hasClass('form-calculation-sheet') )
					return app.settings.formCalculationSheetUrl;
			},

			goTop(e) {
        $("html, body").animate(
          {
            scrollTop: 0
          },
          400
        );
			},
			
			scrollToBottom() {
				$scrollToBot.on(touchEvent, function(e) {
					e.preventDefault();
					$("html, body").animate(
						{ 
							scrollTop: $dom.height() 
						}, 
						1000
					);
				})
			},

      showScrollBtn() {
        var $top = $(this).scrollTop();
  
        if ($top > 200) {
          $upBtn.fadeIn(600);
        } else {
          $upBtn.fadeOut(600);
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
						ellipsis: "...",
						height: height
					});
				})
			},

			toggleFormBlock() {
				$radiosWithTarget.on('change', function(e) {
					let $targetClass = $(e.target).data('target');
					
					$.each($toggleFormBlocksGr1, (idx, item) => {
						let $item = $(item); 
						$item.hasClass($targetClass) ? 
							fn.addClassesToFormBlock($item) :
							fn.removeClassesFromFormBlock($item);
					});

				});
			},

			addClassesToFormBlock($block) {
				const $reqviredFields = $block.find('[data-validate]');   

				$block.addClass('active');
				$reqviredFields.removeClass('disabled');
			},

			removeClassesFromFormBlock($block) {
				const $reqviredFields = $block.find('[data-validate]');   

				$block.removeClass('active');
				$reqviredFields.addClass('disabled');
			},

			domReady() {
				$mainMenuBtn.on(touchEvent, fn.toggleMenu);
				$closeButton.on(touchEvent, fn.closeMenu);
				// $mainMenuBg.on(touchEvent, fn.closeMenu);
				
				if( $bannerSlider.length ) 
					fn.initSlick();				

				if ( $worksInSlider.length ) 
					fn.initSlickWorkIn();

				if ( $invetorsSlider.length )
					fn.initSlickInvestors();

				if ( $equipmentInSlider.length )
					fn.initSlickEquipmentIn();
				
				if( $countersList.length ) 
					$(window).on('scroll', fn.handleCounting);				

				if ( $forms.length ) 
					fn.handleSubmitForms();				

				if ( $day.length ) 
					setInterval(() => fn.countdown(timeEnd), 1000);				

				if ( $gallary.length ) 
					fn.initColorbox();			
					
				// if ( $gallaryWorkIn.length ) 
					// fn.handleColorboxWorkIn();				
				
				if ( $inputsTypeTel.length ) 
					fn.initTelMask();
					
				if ( $greenTariff.length ) 
					setInterval(() => fn.updateIncomeMoney(), 1000);			
					
				if ( $animateElements.length ) {
					$(window).on('scroll', fn.animateAllElements);
					fn.animateAllElements();
				}

				if ( $mapEl.length )
					fn.initMap();

				if ( $upBtn.length ) 
					fn.upBtnDecorator();

				// if ( $gridNewsTitle.length ) 
					// fn.makeElipsisText($gridNewsTitle, app.settings.newsTitleHeight);

				if ( $gridNewsText.length ) 
					fn.makeElipsisText($gridNewsText, app.settings.newsTextHeight);
					
				if ( $gridEquipmentReady.length ) 
					fn.makeElipsisText($gridEquipmentReady, app.settings.equipmentGridTextHeight);
					
				if ( $scrollToBot.length )
					fn.scrollToBottom()

				if ( $radiosWithTarget.length )
					fn.toggleFormBlock()

				if ( $contactOpenBtn.length ) 
					fn.openContactPopup();

				if ( $contactCloseBtn.length ) 
					fn.closeContactPopup();
					
				if ( $('a[href^=tel]').length )
					fn.handleStatisticAllPhones();

				if ( $gallaryWorkIn.length )
					fn.initPhotoSwipeFromDOM('.worksIn-slider');

				fn.handleStatisticPhonet();
			},
		}

		$dom.ready(fn.domReady);

		return fn;

	})(window,document,jQuery);

});