let status = "JS - OK!";
// console.log(status);
var PopupModule, FilterModule, SwitchTabsModule, ValidationModule;
var AccordionModule;
var AnimateBorder;

// var popupCallback, popupSearch, popupSuccess, popupSubscribeSuccess, popupActions, popupActionsSuccess,
// 		modals, pageOverlay;
var popupActionsSuccessOpen;
// var test = 'include js error';

var globalFunctions = {
	animateBlock: function (block) {
			let self = this;
	  	this.hideBlock(block, 'js_animate');
	  	setTimeout(function() {self.showBlock(block, 'js_animate') }, 50)
	},
	showBlock: function(element, activeClass) {
		const elem = element instanceof jQuery ? element[0] : element;
		// console.log('ok')
		if (!elem.classList.contains(activeClass)) {
			elem.classList.add(activeClass);
		}
	},
	hideBlock: function(element, activeClass) {
		const elem = element instanceof jQuery ? element[0] : element;
		if (elem.classList.contains(activeClass)) {
			elem.classList.remove(activeClass);
		}
	},
}

var globalVariables = {
  myDropzone: [],
  currentGroup: ''
}

var glob = {}
@@include('frames/globalFunctions.js')


$(document).ready(function() {
	// console.log('doc ready')
	// document.body.classList.add('js_pageOverlayOpen');
	// -----------------Sliders--------------
	(function setDataThickness() {
		const $progressCount = $(".progress-count input")
		if (document.documentElement.clientWidth > 980) {
			$progressCount.attr("data-thickness", ".07")
		} else {
			$progressCount.attr("data-thickness", ".10")
		}
		console.log($progressCount);

	})()

	const sliders = $('.standardSlider');
	function initTimeCounter() {
		var elem = $('#container');
		var knobResize = function () {
			var width = Math.floor((elem.width() - 150) / 4);
			elem.find('.knob').trigger('configure', { width: width, height: width });
		}

		$(window).resize(function () {
			knobResize();
		});

		var myDate = new Date(2021, 6, 7, 0, 0, 0, 0);
		myDate.setDate(myDate.getDate());

		elem.find('#knob-countdown').countdown({
			until: myDate,
			format: 'DHMS',
			onTick: function (e) {
				var secs = e[6], mins = e[5], hr = e[4], ds = e[3];
				elem.find("#countdown-ds").val(ds).trigger("change");
				elem.find("#countdown-hr").val(hr).trigger("change");
				elem.find("#countdown-min").val(mins).trigger("change");
				elem.find("#countdown-sec").val(secs).trigger("change");
			}
		});

		$('.knob').knob();
		knobResize();
	}
	initTimeCounter()

	if (sliders.length) {
		$.each(sliders, function(index, slider) {
			let currentSlideBlock = slider.parentElement.querySelector('.current-slide > .current');
			let sliderLengthBlock = slider.parentElement.querySelector('.current-slide > .all');
			let sidesQuantity = slider.querySelectorAll('.slide').length;
			// console.log(sliderLengthBlock)
			if (sidesQuantity > 0) {
				sliderLengthBlock.innerHTML = sidesQuantity;
			}

			if (sidesQuantity > 0) {
				$(slider).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
					currentSlideBlock.innerHTML = nextSlide + 1;			
				})
			} else {
				currentSlideBlock.parentElement.style.display = 'none';
			}

			
		})		
	}

	$('#mainSlider').slick({
		// rtl: document.body.classList.contains('rtl'),
		dots: false,
		arrows: true,
		prevArrow: '<button class="slick-prev slick-arrow" aria-label="prev" type="button" style=""><i class="icomoon icon-angle"></i></button>',
		nextArrow: '<button class="slick-next slick-arrow" aria-label="next" type="button" style=""><i class="icomoon icon-angle"></i></button>',
		fade: true,
		speed: 1000,
		cssEase: 'linear',
		autoplay: true,
		autoplaySpeed: 5000,
				// responsive: [
				// {
				// 	breakpoint: 768,
				// 	settings: {
				// 		arrows: false,
				// 		dots: false
				// 	}
				// }
				// ]
	});

	


	$('#feedbackSlider').slick({
		rtl: document.body.classList.contains('rtl'),
		dots: false,
		arrows: true,
		speed: 800,
		autoplay: true,
		autoplaySpeed: 4000,
		prevArrow: '<button class="slick-prev slick-arrow" aria-label="prev" type="button" style=""><i class="icomoon icon-angle"></i></button>',
		nextArrow: '<button class="slick-next slick-arrow" aria-label="next" type="button" style=""><i class="icomoon icon-angle"></i></button>',
	});


	// console.log('document ready', $(document))
	// setTimeout(function() {
	// 	if (jQuery) {console.log('jQuery OK 1')}
	// }, 0)
	// popupSearch = document.getElementById('popupSearch');
	// popupCallback = document.getElementById('popupCallback');
	// popupActions = document.getElementById('popupActions');
	// popupActionsSuccess = document.getElementById('popupActionsSuccess');

	// popupSuccess = document.getElementById('popupSuccess');
	// popupSubscribeSuccess = document.getElementById('popupSubscribeSuccess');	
	
	// modals = document.getElementsByClassName('popup');
	// pageOverlay = document.getElementById('pageOverlay');

// console.log(modals)
	// =================Include Modules==============================

	/*@@include('testModule.js')*/

	@@include('frames/toggleButtonContent.js')
	/*@@include('frames/custom_Input_Type_number.js')*/

	@@include('frames/AccordionModule.js')
	@@include('frames/ToggleContentModule.js')
	/* @@include('frames/SwitchTabsModule.js')  */
	@@include('frames/PopupModule.js')
	/*@@include('frames/TextLimitModule.js')*/
	@@include('frames/AnimateBorderModule.js')
  @@include('frames/StickyBlockModule.js')



	// =============================================================

		// -----------Fixed Header---------
		var fixedBlock = document.getElementsByClassName('bottom-section')[0];
		var scrollTopButton = document.getElementById('scrollTopButton');
		var mobileMenu = document.getElementById('navMenuWrapper');
		var bottomSection = document.getElementsByClassName('bottom-section')[0];
		var menuBlock = document.getElementsByClassName('menuBlock')[0];
		var giftButton = menuBlock.getElementsByClassName('gift-button')[0];
		var creditBlock = menuBlock.getElementsByClassName('credit-block')[0];
		var menuLogo = menuBlock.getElementsByClassName('menu-logo')[0];
		var navMenu = document.getElementsByClassName('navMenu')[0];
		var burgerButton = document.getElementById('burgerButton');
		var footer = document.getElementsByClassName('mainFooter')[0];

		// var pageBlock = document.getElementsByClassName('page')[0];


		function getCurrentYPosition() {
		  // console.log('calc: ', document.documentElement.scrollTop)
		  return window.pageYOffset || document.documentElement.scrollTop;
		}

	 	function transitionHandler(event, targetBlock, hiddenContent) {
	 		if (document.documentElement.clientWidth < 991) {
	 		// console.log(event.srcElement)
		 		if (event.srcElement == targetBlock && event.propertyName == 'min-width') {
		 			if ( bottomSection.classList.contains('js_show-section') && menuBlock.classList.contains('js_showMenu') ) {
		 				hiddenContent.classList.add('js_openScale')
		 			}
		 		}

		 		if (event.srcElement == mobileMenu && !mobileMenu.classList.contains('js_openScale')) {
		  		menuBlock.classList.remove('js_showMenu');
		  		giftButton.classList.remove('js_hideBlock');
		  		creditBlock.classList.remove('js_hideBlock');
		  		menuLogo.classList.remove('js_showBlock');
		  		bottomSection.classList.remove('js_show-section');
		 		}

		 	}
	 		// if (event.srcElement == menuBlock && !menuBlock.classList.contains('js_showMenu') ) {
	 		// }
	 	}

	  function getChildsTotalWidth(parent) {
	  	let children = parent.children;
	  	let result = 0;

	  	for (let i = 0; i < children.length; i++) {
	  		result = result + children[i].offsetWidth;
	  	}
	  	return result;
	  }

	  function isLastChild(element) {
	  	return element.nextElementSibling ? false : true;
	  }
	  function isFirstChild(element) {
	  	return element.previousElementSibling ? false : true;
	  }

	  function getCoordsOnPage(elem) { 
	    var box = elem.getBoundingClientRect();

	    return {
	      top: box.top + pageYOffset,
	      left: box.left + pageXOffset,
	      // right: box.left + pageXOffset,
	      bottom: box.bottom + pageYOffset

	    };
	  }

	  function getCoordsOnScreen(element) {
	  	var elem;
	  	element.length ? elem = element[0] : elem = element;
	    var box = elem.getBoundingClientRect();
	  	// console.log(box)

	    return {
	      top: box.top,
	      left: box.left,
	      bottom: box.bottom,
	      right: box.right,
	      width: box.width,
	      height: box.height,
	    };
	  }

	  function openWidth(element) {
	  	element.style.width = getChildsTotalWidth(element) + 'px';
	  }
	  function collapseWidth(element) {
	  	element.style.width = '0';
	  }

	  // function calcLeftCoordinateActionModal() {

	  // }

	  function isVisible(tag, option) {
	  	let opt;
	  	option ? opt = option : opt = "whole";
	    var t = $(tag);
	    var w = $(window);
	    var wt = w.scrollTop();
	    var tt = t.offset().top;
	    var tb = tt + t.height();

	    if (opt == "whole") {
	    	if (document.documentElement.clientWidth > 991) {
	    		return (tb <= wt + w.height()) && (tt >= wt);
	    	} else {
	    		return ( tt <= (wt + w.height() / 2) ) && (tt >= wt);
	    	}
	    }

	    if (opt == "topBorder") {
	    	return tt <= wt + w.height() - 89;
	    }
	  }

	  function isVisibleOnXAxis(element, parent) {
	  	// console.log(parent, parent.getBoundingClientRect().right)
	  	let isVisibleOnLeft = element.getBoundingClientRect().left > parent.getBoundingClientRect().left;
	  	let isVisibleOnRight = element.getBoundingClientRect().right < parent.getBoundingClientRect().right;
	  	return isVisibleOnLeft && isVisibleOnRight;
	  }

	  


	  // ------------------------
	  if (document.documentElement.clientWidth < 991) {
	  	globalFunctions.showBlock(burgerButton, 'js_showBurger');
	  }

	  var transformHeader = function() {
	  	if (document.documentElement.clientWidth > 991) {

	  		if (getCurrentYPosition() > 49) {	
	  			globalFunctions.showBlock(fixedBlock, 'js_fixed');
	  			globalFunctions.showBlock(burgerButton, 'js_showBurger');
	  			collapseWidth(navMenu);
	  			globalFunctions.showBlock(navMenu, 'js_collapsed');

	  		} else { 
	  			globalFunctions.hideBlock(fixedBlock, 'js_fixed'); 
	  			globalFunctions.hideBlock(burgerButton, 'js_showBurger');
	  			openWidth(navMenu);
	  			globalFunctions.hideBlock(navMenu, 'js_collapsed');
	  		} 

	  	} else {
	  		
	  		if (getCurrentYPosition() > 54) {	
	  			globalFunctions.showBlock(fixedBlock, 'js_fixed');
	  		} else { 
	  			globalFunctions.hideBlock(fixedBlock, 'js_fixed'); 
	  		}
	  	}
	  }

	  transformHeader();

	  // --------- Header Buttons----------------
	 	
	  if (document.getElementsByClassName('mainHeader')[0]) {
	  	menuBlock.addEventListener("transitionend", function(event) {
	  		event.stopPropagation();
	  		transitionHandler(event, this, mobileMenu);
	  	}, false);

		  // ------Initial Operations--------
		  // openWidth(navMenu);

		  // --------------------------------
		  $('#burgerButton').on('click', function() {

		  	if (document.documentElement.clientWidth > 991) {
		  		// console.log('>')
		  		if ( navMenu.classList.contains('js_collapsed') ) {
		  			navMenu.classList.remove('js_collapsed');
		  			openWidth(navMenu);
		  		} else {
		  			navMenu.classList.add('js_collapsed');
		  			collapseWidth(navMenu);
		  		}
		  	} else {
		  		if ( !bottomSection.classList.contains('js_show-section') ) {
		  			bottomSection.classList.add('js_show-section');
		  			menuBlock.classList.add('js_showMenu');
		  			giftButton.classList.add('js_hideBlock');
		  			creditBlock.classList.add('js_hideBlock');
		  			menuLogo.classList.add('js_showBlock');
		  			burgerButton.firstElementChild.classList.remove('icon-burger');
		  			burgerButton.firstElementChild.classList.add('icon-close');
		  		} else {
		  			mobileMenu.classList.remove('js_openScale');
		  			burgerButton.firstElementChild.classList.add('icon-burger');
		  			burgerButton.firstElementChild.classList.remove('icon-close');
		  		}
		  	}
		  }) 

		  // ---------Accordion Blocks-------
		  $('.mainHeader').on('click', '.accordionButton', function(e) {
				// console.time('click accordion working time');
				if (document.documentElement.clientWidth < 992) {
					e.stopPropagation();
					let submenuBlock = this.nextElementSibling;
					let button = this;

				// let siblingsBlocks = document.querySelectorAll('#publicInfoPage article.publicInfo-block .titleBlock + .hiddenContent');

				toggleButtonContent(button);
				AccordionModule.toggleContent("withoutSiblings", button, submenuBlock );
					// AccordionModule.toggleContent("withSiblings", button, submenuBlock, siblingsBlocks );				

				}
				// console.timeEnd('click accordion working time');
			})		
		}

		// ---------
		
		// if span in menu without link for open submenu, on mobile
		(function() {
			if (window.innerWidth < 768) {
				if ( ! $('.navMenu > li > span').length ) return;
				$('.navMenu > li > span').on('click', function() {
					$(this).next().click();
				});
			}
		})();


	  // ---------Popups Block-------

		$('body').on('click', '#searchButton', function() {
	  	// e.preventDefault();
	  	let modal = $('#popupSearch');
	  	if ( modal.length ) {
	  		PopupModule.openPopup(modal, "js_openPopup_search");
	  	}
	  }); 

		$('body .mainHeader').on('click', '.phone', function() {
			let modal = $('#popupCallback');
			if ( modal.length ) {
				PopupModule.openPopup(modal);
			}
		});

		$('body').on('click', '.calcModal', function(e) {
			e.preventDefault();
			let modal = $('#popupRequest');
			if ( modal.length ) {
				PopupModule.openPopup(modal);
			}
		});

		$('body').on('click', '.phone-evaluation', function(e) {
			e.preventDefault();
			let modal = $('#popupCallbackEvaluation');
			if ( modal.length ) {
				PopupModule.openPopup(modal);
			}
		});

		// ---------------
		function popupActionsOpen(button) {
			let buttonProps = getCoordsOnScreen(button);
			let modal = $('#popupActions');
			if (modal.length) {
			let modalProps = getCoordsOnScreen(modal[0]);
			
			modal[0].style.top = buttonProps.bottom + 'px';

			if (document.documentElement.clientWidth > 991) {
				let leftCoord = ( buttonProps.left + (buttonProps.width / 2) ) - ( modalProps.width / 2 );
				leftCoord < 0 ? leftCoord = 10 : null;
				// console.log(leftCoord)

				modal[0].style.left = leftCoord + 'px';
			}

				PopupModule.openPopup(modal[0]);
			}
		}

		// $('.mainHeader').on('click', '.gift-button', function(e) {
		// 	e.preventDefault();
		// 	popupActionsOpen(this)
		// })

		$('.calculate-form').on('click', '.resultBlock .action-block', function(e) {
			e.preventDefault();
			popupActionsOpen(giftButton)
		})

		// -------
		popupActionsSuccessOpen = function(popupBlock) {
			const popup = popupBlock instanceof jQuery ? popupBlock[0] : popupBlock;
			let buttonProps = getCoordsOnScreen(giftButton);

			if (popup) {
				let modalProps = getCoordsOnScreen(popup);
				popup.style.top = buttonProps.bottom + 'px';

				if (document.documentElement.clientWidth > 991) {
					let leftCoord = ( buttonProps.left + (buttonProps.width / 2) ) - ( modalProps.width / 2 );
					leftCoord < 0 ? leftCoord = 10 : null;
					// console.log(leftCoord)

					popup.style.left = leftCoord + 'px';
				}
				PopupModule.openPopup(popup);

			}
		}

		// popupActionsSuccessOpen()

	  
	  // ---------Text Limit-------
		// let textBlocks = document.querySelectorAll('.selector');
		// textBlocks.length ? TextLimitModule.sliceText(textBlocks, 180) : null;
		

		// ----------Scroll-to Section---------------
		$('.navigateIcon.down').on('click', function() {
			$('html, body').animate({
				scrollTop: $('.pageSection:nth-child(2)').offset().top
			}, 500);
		})

		$('#scrollTopButton').on('click', function() {
			
			$('html, body').animate({
				scrollTop: $("body").offset().top
			}, 500);
		})
		
		// $('body').on('click', 'article.story-item', function() {
			
		// 	$('html, body').animate({
		// 		scrollTop: $("#" + $(this).attr('data-story-id') ).offset().top
		// 	}, 500);
		// })

		// ------------Animations Block-----------
		$.easing = Object.assign({}, $.easing, {
		  easeOutCubic: (x, t, b, c, d) => {
		    return c * ((t = t / d - 1) * t * t + 1) + b
		  },
		})
		// ----------------------

		function formateNumber(number) {
			var numStr = number + '';
			return numStr.replace(new RegExp("^(\\d{" + (numStr.length%3?numStr.length%3:0) + "})(\\d{3})", "g"), "$1 $2").replace(/(\d{3})+?/gi, "$1 ").trim(); 
		}

		function startCounting(counterElements) {
			counterElements.each(function() {
			  var $this = $(this),
			      countTo = $this.attr('data-count');
			  
			  $({ countNum: 0 }).animate(
			  	{ countNum: countTo, formatedNum: countTo },
				  {
				    duration: 2000,
				    easing:'easeOutCubic',
				    step: function() {
				    	var num = Math.floor(this.countNum);
					    this.formatedNum = formateNumber(num);
					    $this.text(this.formatedNum) 
				    },
				    complete: function() {
				    	var num = Math.floor(this.countNum);
					    this.formatedNum = formateNumber(num);
				    	$this.text(this.formatedNum)
				    }
				  }
				);  
			});
		}
	    
	  var servicesList = $("#services-list");
	  var countersList = $('.countersList');
	  var counterBlocks = $('.countersSection .counterContainer');

	  if (servicesList.length) {
	  	if (!servicesList.prop("shown") && isVisible(servicesList)) {
	  	  servicesList.prop("shown", true);
	  	  servicesList.addClass('js_animate');
	  	}
	  }


	  // var timer = null;
	  $(window).scroll(function () {
	  //   if (timer) { clearTimeout(timer); }

	  //   timer = setTimeout(function() {
	  //     timer = null;

	      // --------------
	  		if (servicesList.length) {
	  			if (!servicesList.prop("shown") && isVisible(servicesList)) {
	  			  servicesList.prop("shown", true);
	  			  servicesList.addClass('js_animate');
	  			}
	  		}
	      
	      // --------------------
	      if (countersList.length) {
	      	if (!countersList.prop("shown") && isVisible(countersList)) {
	      		countersList.prop("shown", true);
	      		startCounting(counterBlocks);
	      	}
	      }
	      // --------------
	      transformHeader();

	      if (scrollTopButton) {
	      	if (getCurrentYPosition() > 600) { globalFunctions.showBlock(scrollTopButton, 'js_visible'); }
	      	else { globalFunctions.hideBlock(scrollTopButton, 'js_visible'); }
	      } 

	      // -----------------
	      if (footer) {
	      	if (isVisible(footer, "topBorder")) {
	      		// console.log('visible')
	      		globalFunctions.showBlock(scrollTopButton, 'js_fixToFooter');
	      	} else {
	      		globalFunctions.hideBlock(scrollTopButton, 'js_fixToFooter');
	      	}
	      }

	  //   }, 50);
	  });


	  // ------------------- Questions Filter -----------------

	  FilterModule  = (function() {

	  	function switchCategoryButton(allButtons, button, currentCategoryContainer) {
	  			
				for (let i = 0; i < allButtons.length; i++) {
					allButtons[i].classList.remove('active');
					allButtons[i].classList.remove('js_hide');  					
				}

  			if (document.documentElement.clientWidth < 991) {
  				if (currentCategoryContainer) {
  					currentCategoryContainer.innerHTML = button.innerHTML;
  					button.classList.add('js_hide');  					
  				}
  			}

  			button.classList.add('active');
	  	}

	  	function findActiveCategory(navMenuBlock) {
	  		let activeButton = navMenuBlock.querySelector('.category.active');
	  		return activeButton.id || activeButton.dataset.target;
	  	}

	  	function filterFunction(filterCollection, activeCategory) {
	  		let resultList = [];

	  		for (let i = 0; i < filterCollection.length; i++) {
	  			filterCollection[i].classList = "";
	  			filterCollection[i].classList.add('js_hide');

	  			if (filterCollection[i].dataset.category === activeCategory || activeCategory === 'all') {
	  				filterCollection[i].classList.remove('js_hide');
	  				resultList.push(filterCollection[i]);
	  			}
	  		}
	  		if (resultList.length) {
	  			for (let i = 0; i < resultList.length; i++) {
	  				i % 2 ? resultList[i].classList.add('js_animateRight') : resultList[i].classList.add('js_animateLeft')
	  			}	  			
	  		}
	  	}


	  	function filterByCategory(filterCollection, navBarElement) {
	  		let collection = filterCollection;
	  		let activeCategory = findActiveCategory(navBarElement);
	  		filterFunction(collection, activeCategory);
	  	}


	  	return {
	  		filterByCategory: filterByCategory,
	  		switchCategoryButton: switchCategoryButton,
	  		// findActiveCategory: findActiveCategory
	  	}
	  })()

	  SwitchTabsModule = (function() {

	  	function findTab(element, direction, categoryClass) {
	  		const elem = element instanceof jQuery ? element[0] : element;
  			let finded = false;
  			let currentTab = elem, findingElement = null;
  			let sibling = null;

  			function siblingElement(currentTab, dir) {
  				let sibling;

  				switch (dir) {
  					case 'prev': sibling = currentTab.previousElementSibling;  break;
  					case 'next': sibling = currentTab.nextElementSibling;  break;

  					default: console.error('invalid or missing data-direction value')
  				}
  				return sibling;
  			}

  			while(!finded) {
  				let sibling = siblingElement(currentTab, direction);

  				if ( sibling ) {
  					const nextElement = sibling;

  					if ( nextElement.classList.contains(categoryClass) ) {
  						findingElement = nextElement;
  						finded = true;
  					} else {
  						currentTab = nextElement;	  						
  					}
  					 
  				} else { break;	}
  			}

	  		return findingElement;
	  	}
	  	
	  	function switchTabs(tabButton, tabsBlocks) {
	  		let target = tabButton.dataset.target;
	  		// console.log(tabButton.classList.contains('active'))

  			for (let i = 0; i < tabsBlocks.length; i++) {
  				// tabsButtons[i].classList.remove('active');
  				tabsBlocks[i].classList.remove('active');

  				if (target === tabsBlocks[i].id) {
  					// tabButton.classList.add('active'); 
  					tabsBlocks[i].classList.add('active'); 
  				} 

  			}
	  	}

	  	function switchSeriesTabs(tabButton, tabsBlocks, group) {
	  		let data = tabButton.dataset;

	  		let currentTab = $(tabButton).closest('.toggleBlock')[0];

	  		let findingTab = findTab(currentTab, data.direction, group);

	  		if ( findingTab ) {
	  			currentTab.classList.remove('active');
	  			findingTab.classList.add('active');
	  		}
	  	}

	  	return {
	  		switchTabs: switchTabs,
	  		switchSeriesTabs: switchSeriesTabs
	  	}
		})()
		
	  function scrollContainer(container, controlElement, direction) {

	  	function getSiblingWidth(element, direction) {
	  		var paddings = 0; //manual hardcode
	  		// console.log( element.previousElementSibling ? element.previousElementSibling : null);
	  		// console.log( element.previousElementSibling ? element.previousElementSibling.offsetWidth / 2 + paddings : paddings );

	  		if (direction === 'right') {
	  		  return element.nextElementSibling ? element.nextElementSibling.offsetWidth / 2 + paddings : paddings;
	  		} else {
	  			return element.previousElementSibling ? element.previousElementSibling.offsetWidth / 2 + paddings : paddings;
	  		}
	  	}

	  	var scrollValue = 0;
	  	var nextSiblingWidth = getSiblingWidth(controlElement, direction);

	  	if (direction === 'right') {
	  		scrollValue = (controlElement.getBoundingClientRect().right - container.parentElement.getBoundingClientRect().right + nextSiblingWidth)*-1	;
	  	}
	  	if (direction === 'left') {
	  		scrollValue = (controlElement, controlElement.getBoundingClientRect().left - container.parentElement.getBoundingClientRect().left - nextSiblingWidth)*-1;
	  	} 	
	  	scrollValue = Math.round(scrollValue);
	  	let currentPosition = Math.round(+container.dataset.transform);
	  	let result = currentPosition ? currentPosition + scrollValue : scrollValue;

	  	container.setAttribute('data-transform', result);
	  	container.style.transform = "translateX("+ result +"px)";	  	
	  } 

	  // ------------------- Tariffs cards title aligner -----------------
	  function alignTitles(titlesList) {
	  	if ( titlesList.length ) {
	  		let maxHeight = 0;
	  		for (let i = 0; i < titlesList.length; i++) {
	  			if ( titlesList[i].offsetHeight > maxHeight ) {
	  				maxHeight = titlesList[i].offsetHeight;
	  			}
	  		}

	  		for (let i = 0; i < titlesList.length; i++) {
	  			titlesList[i].style.height = maxHeight  + 'px';
	  		}
	  	}
	  }


	  // -----------Actions------------
	  let faqList = document.getElementsByClassName('faq-list')[0];
	  let questions = document.querySelectorAll('.faq-list > li');

	  let navBarBlock = document.getElementById('categoriesMenu');
		let	tabsBlocksList = document.querySelectorAll('.toggleBlocks-list > .toggleBlock');
		let toggleBlocksWrapper = document.getElementsByClassName('toggleBlocks-list')[0];

		let toggleBlocksWrapper2 = document.getElementsByClassName('subToggleBlocks-list')[0];
		let	seriesTabsBlocksList = document.querySelectorAll('.subToggleBlocks-list > .toggleBlock');

		let tariffsTitles = document.querySelectorAll('.toggleBlock.active .tariff-item .article-title');

	  if (navBarBlock) {
	  	let navButtons = navBarBlock.querySelectorAll('.category');
	  	if ( $('.active-category-container').length) {
	  		var currentCategoryContainer = document.getElementsByClassName('active-category-container')[0];
	  	}
	  	if (currentCategoryContainer) { currentCategoryContainer = currentCategoryContainer.firstElementChild; }

	  	let currentCategoryButton = navBarBlock.querySelector('.category.active');

	  	FilterModule.switchCategoryButton(navButtons, currentCategoryButton, currentCategoryContainer);
	  	if ( navBarBlock.classList.contains('filterMenu') ) { 
	  		FilterModule.filterByCategory(questions, navBarBlock);
	  		globalFunctions.showBlock(faqList, 'js_animate');
	  	}
	  	if ( navBarBlock.classList.contains('tabButtons') ) {	
	  		SwitchTabsModule.switchTabs(currentCategoryButton, tabsBlocksList);	
	  		globalFunctions.showBlock(toggleBlocksWrapper, 'js_animate');

	  		if (tariffsTitles) {
	  			// console.log(tariffsTitles)
	  			alignTitles( tariffsTitles )	  			
	  		}

	  	}

	  	// ---------------------

	  	function getControlTab(clickedTab, parent) {
	  		const nextSibling = clickedTab.nextElementSibling;
	  		const prevSibling = clickedTab.previousElementSibling;
	  		if (nextSibling && !isVisibleOnXAxis(nextSibling, parent)) {	return nextSibling;	}
	  		if (prevSibling && !isVisibleOnXAxis(prevSibling, parent)) {	return prevSibling;	}
	  		if (!isVisibleOnXAxis(clickedTab, parent)) {	return clickedTab;	}
	  	}
	  	function getDirection(controlTab, clickedTab) {
	  		let nextTabCoord = controlTab.getBoundingClientRect().left;
	  		let clickedTabCoord = clickedTab.getBoundingClientRect().left;
	  		
	  		return nextTabCoord < clickedTabCoord || isFirstChild(controlTab) ? 'left' : 'right';
	  	}

	  	$('.mobileButtonsWrapper').on('click', function() {
	  		navBarBlock.firstElementChild.style = '';	
	  	})

	  	$('#categoriesMenu').on('click', '.category', function() {  		
	  		// console.log(FilterModule.findActiveCategory(navBarBlock) )
	  		if ( !this.classList.contains('active') ) {
	  			FilterModule.switchCategoryButton(navButtons, this, currentCategoryContainer);
	  	
	  			if (document.documentElement.clientWidth > 991) {
	  				const controlElement = getControlTab(this, navBarBlock);

	  				if (controlElement) {
	  					let direction = getDirection(controlElement, this);
	  					scrollContainer( navBarBlock.firstElementChild, controlElement, direction );	  					
	  				}
	  			} else {
	  				navBarBlock.firstElementChild.style = '';
	  			}

	  			// ---------------------------
	  			
	  			if ( navBarBlock.classList.contains('filterMenu') ) {	
	  				FilterModule.filterByCategory(questions, navBarBlock);
	  				globalFunctions.animateBlock(faqList)
	  			}

	  			if ( navBarBlock.classList.contains('tabButtons') ) {	
	  				SwitchTabsModule.switchTabs(this, tabsBlocksList);
	  				globalFunctions.animateBlock(toggleBlocksWrapper) 

	  				alignTitles( document.querySelectorAll('.toggleBlock.active .tariff-item .article-title') )
	  			}

	  		}
	  	})

	  }

	  // -----------
	  $('.resultBlock').children('.content-container').addClass('js_animate');

	  // // start for front version (for full verison delete)
	  // $('.calculate-form').on('click', '.submitButton', function(e) {
  	// 	// console.log($('#fileInput').files)
  	// 		e.preventDefault();
  	// 	// this.form.submit();
  	// 	let form = this.form; 	
  	// 	// console.log($(this).closest('.calculate-form').is('#gold-form'));


  	// 	let resultBlock = $(form).find('.resultBlock')[0];

  	// 	$(form).find('.no-result-block').removeClass('active');
  	// 	$(form).find('.has-result-block').addClass('active');
  	// 	resultBlock.classList.add('hasResult');

			// hideBlock(resultBlock.firstElementChild, 'js_animate');
			// setTimeout(function() { showBlock(resultBlock.firstElementChild, 'js_animate') }, 50);

  	// 	// $('#technics-form').on('submit', function(e) {

  	// 		// console.log('submit');
  			
  	// 	// })
  	// }); 
  	// end for front version (for full verison delete)


  	// ------
	  
	  if (toggleBlocksWrapper2) {
	  	function toggleWideBlock(parent) {
	  		let choseCategoryBlock = parent.getElementsByClassName('choseCategoryBlock')[0];
	  		let successBlock = parent.getElementsByClassName('successBlock')[0];
	  		let resultBlock = parent.parentElement.nextElementSibling;

	  		choseCategoryBlock.classList.contains('active') || successBlock.classList.contains('active') ?
	  			globalFunctions.showBlock(resultBlock, 'js_hide') : globalFunctions.hideBlock(resultBlock, 'js_hide');
	  	}

	  	globalFunctions.showBlock(toggleBlocksWrapper2, 'js_animate');	
	  	toggleWideBlock(toggleBlocksWrapper2);
  		

	  	// let currentGroup;
	  	
	  	$('.subToggleBlocks-list').on('click', '.seriesTab', function(e) {
	  		e.preventDefault();

	  		const data = this.dataset;
	  		data.group ? globalVariables.currentGroup = data.group : null;
	  		// console.log(this.form)

	  		if (data.target) {
	  			SwitchTabsModule.switchTabs(this, seriesTabsBlocksList);
	  			globalFunctions.animateBlock(toggleBlocksWrapper2);
	  		} else if( !this.classList.contains('submitFormButton') && !this.classList.contains('submitButton') ) {

	  			if ( this.classList.contains('next') ) {
	  				let currentToggleBlock = $(this).closest('.toggleBlock');

	  				if ( ValidationModule.isValid(currentToggleBlock) ) {
	  					SwitchTabsModule.switchSeriesTabs(this, seriesTabsBlocksList, globalVariables.currentGroup);
	  					globalFunctions.animateBlock(toggleBlocksWrapper2);
	  				}
	  			} else {
	  				SwitchTabsModule.switchSeriesTabs(this, seriesTabsBlocksList, globalVariables.currentGroup);
	  				globalFunctions.animateBlock(toggleBlocksWrapper2);
	  			}
	  		}

	  		toggleWideBlock(toggleBlocksWrapper2);	  		
  		})

	  	
	  } 

	// -----------Form Validation--------------------------------

	$('input[data-validate=isNumberSecondary]').on('input', function(e) {
		var value = e.target.value;
		var regEx = /[^0-9|.|,]/g;			
		e.target.value = value.replace(regEx, "");		
	});

	ValidationModule = (function() {

		function validate(inputElement, validationsArray) {
			const validations = validationsArray;
			let messages = [];

			function isNumber(input) {
				return !isNaN(parseFloat(input.value)) && isFinite(input.value);
			}

			function isNumberSecondary(input) {
				var value = input.value;
				var regEx = /[^0-9|.|,]/g;
				var prepearedValue = value.replace(regEx, "")				

				return prepearedValue;				
			}

			function isPhoneNumber(input) {
				var value = input.value;
				var regEx =/\D/g;
				var prepearedValue = value.replace(regEx, "")
				var isNumber = !isNaN(parseFloat(prepearedValue)) && isFinite(prepearedValue);
				var isPhone = prepearedValue.length == 12 ? true : false;

				return isNumber && isPhone;
			}

			function isEmail(input) {
				var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
				
				return regex.test(input.value);
			}

			function isNotEmpty(input) {
				let isNotEmpty = input.value.replace(/\s/g,"").length ? true : false;
				let isNotWrongVal = input.value == "placeholder" ? false : true;
				return isNotEmpty && isNotWrongVal;
			}

			function isRadioChecked(input) {
				return input.querySelectorAll('input:checked').length ? true : false;
			}

			function isChecked(input) {
				return input.checked ? true : false;
			}

			function isShort(input) {
				let value = input.value;
				let splitArr = value.split('');
				return splitArr.length <= 3 ? false : true;
			}



			// ---------------------

			for (let i = 0; i < validations.length; i++) {

				switch (validations[i]) {
					case 'required': 
						if ( !isNotEmpty(inputElement) ) {
							messages.push(inputElement.dataset.errorText)
						}
					break;

					case 'isNumber': 
						if ( !isNumber(inputElement) ) {
							messages.push(inputElement.dataset.errorText)
						}
					break;

					case 'isNumberSecondary': 
						if ( !isNumberSecondary(inputElement) ) {
							messages.push(inputElement.dataset.errorText)
						}
					break;

					case 'isPhoneNumber': 
						if ( !isPhoneNumber(inputElement) ) {
							// messages.push(inputElement.dataset.errorText)
							messages.push('неправильный номер телефона')
						}
					break;

					case 'isEmail': 
						if ( !isEmail(inputElement) ) {
							messages.push(inputElement.dataset.errorText);
						}
					break;

					case 'requiredRadio': 
						if ( !isRadioChecked(inputElement) ) {
							messages.push(inputElement.dataset.errorText)
						}
					break;

					case 'requiredCheck': 
						if ( !isChecked(inputElement) ) {
							messages.push(inputElement.dataset.errorText)
						}
					break;

					case 'isShort':
						if ( !isShort(inputElement) ) {
							messages.push(inputElement.dataset.errorText);
						}
					break;
					
					default: console.error('invalid input data-validate value')

				}
			}
			// console.log(messages.length ? messages : null)
			return messages.length ? messages : null;
		}

		function showWarning(inputElement, messages, textColor) {
			inputElement.classList.add('js_containsError');
			let warningList = $('<ul class="js_warning-list"></ul>');

			for (let i = 0; i < messages.length; i++) {
				let listElement = $("<li></li>").text(messages[i]);
				textColor ? listElement.css('color', textColor) : null;
				warningList.append(listElement)
			}

			if (inputElement.nextElementSibling) {
				inputElement.nextElementSibling.tagName == 'LABEL' ? 
					$(inputElement.nextElementSibling).after(warningList) : 
					$(inputElement).after(warningList);
			} else {
					$(inputElement).after(warningList);
			}
		}

		function isValid(formElement) {
			const form = formElement instanceof jQuery ? formElement[0] : formElement;
			const inputs = form.querySelectorAll('[data-validate]');
			const checkboxesCheckedLength = form.querySelectorAll('[type=checkbox][data-validate-checkbox]:checked').length;
			const checkboxes = form.querySelectorAll('[type=checkbox][data-validate-checkbox]:not(:disabled)');

			let errorsCounter = 0;

			for (let i = 0; i < inputs.length; i++) {
				let errorMessages = [];
				let textColor = inputs[i].dataset.textColor;

				$(inputs[i]).removeClass("js_containsError");
				$(inputs[i]).siblings('.js_warning-list').remove();

				let validationsArray = [];
				let inputData = inputs[i].dataset.validate ? inputs[i].dataset.validate.split(' ') : false;
				// ---------
				inputs[i].value ? inputs[i].value = inputs[i].value.trim() : null;
				// ---------

				validationsArray = inputData ? inputData : null;
				// inputs[i].required ? validationsArray.push('required') : null;
				
				if (validationsArray.length) {
					let validationResult = validate(inputs[i], validationsArray);
					validationResult ? errorMessages = validationResult : null;
				}

				if (errorMessages.length) { 
					showWarning(inputs[i], errorMessages, textColor);
					errorsCounter++;
				}
			}

			if ( checkboxes.length ) {
				const lastCheckbox = checkboxes[checkboxes.length - 1];

				function isValidCheckboxes() {
					$(lastCheckbox).siblings('.js_warning-list').remove();

					if ( !checkboxesCheckedLength ) {
						let errorMessages = [];
						errorMessages.push(lastCheckbox.dataset.errorText);
		
						showWarning(lastCheckbox, errorMessages);
						errorsCounter++;
					}
				}
				isValidCheckboxes();
			}


			return errorsCounter > 0 ? false : true;
			console.log('end for');
		}

		// ---------------
		return {
			isValid: isValid,
		}
	})()

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



	// ===========Initializations=============

	
	AnimateBorder(document.querySelectorAll('.animated-border-block svg'), {
		borderWidth: 2,
		shadedSection: 100,
		transparentSection: 25,
		reverse: false,
		radius: true 
	})
	
	// console.log($(".chosen-wrapper > select"))

	$(".chosen-wrapper  select").chosen({
		disable_search_threshold: 8,
		search_contains: true,
		no_results_text: globalVariables.messages.find_nothing,
		width: "100%"
	});

	// -------------------

	$(".colorbox").colorbox({
	  rel: function() {
	  	return $(this).attr('data-rel');
		},
	  transition:"fade",
	  previous: "<i class='icomoon icon-arrow'></i>",
	  next: "<i class='icomoon icon-arrow'></i>",
	  // close: "<i class='icomoon icon-close'></i>",
	  closeButton: false,
	  // width: '80%',
	  // height: '80%',
	  // innerWidth: '80%',
	  maxWidth:'95%',
	  maxHeight:'95%',
	  preloading: false,  
	});

	// -------------------
	if ( $( ".slider-range" ).length ) {
		$( ".slider-range" ).slider({
		  // range: true,
		  min: 1,
		  max: 2,
			value: 1,
			disabled: true,

		  create: function( event, ui ) {
		  	var handle = event.target.firstChild;
		  	var leftArrow = "<i class='icomoon icon-angle js_left'></i>";
		  	var rightArrow = "<i class='icomoon icon-angle js_right'></i>"
		  	handle.innerHTML = "<span class='js_visibleHandle'>"+ leftArrow + "<span class='text'>"+ $(this).slider("option", "value")+"</span>" + rightArrow +"</span>";
		  	// handle.innerHTML = ;
		  },

		  slide: function( event, ui ) {
		  	var handle = event.target.firstChild;
		  	handle.getElementsByClassName('text')[0].innerHTML = ui.value;
		  	// handle.innerHTML = ui.value;
		  }

		  // slide: function( event, ui ) {
		  //   $( ".partLeft .slider-range-values-block > .rangeMinValueText" ).text( ui.values[ 0 ] + '$');
		  //   $( ".partLeft .slider-range-values-block > .rangeMaxValueText" ).text( ui.values[ 1 ] + '$');

		  //   $( ".partLeft .slider-range-values-block > #rangeMinValue" ).val( ui.values[ 0 ]);
		  //   $( ".partLeft .slider-range-values-block > #rangeMaxValue" ).val( ui.values[ 1 ]);
		  // }
		});
	}

	// -------------------DragNDrop---------

	// $(function(){
	//   // Dropzone.autoDiscover = false;
	//   // Dropzone.options.dropzone = false;
	//   // let dropZoneElement = document.getElementById('photoDropzone');
	//   let dropZoneElements = document.getElementsByClassName('photoDropzone');
	  
	//   if (dropZoneElements.length) {
	//     var myDropzone = [];

	//     for (var i = 0; i < dropZoneElements.length; i++) {
	//       let dropzone = new Dropzone(dropZoneElements[i], { 
	//         url: "/calculator/requests-temp-image",
	//         paramName: 'img',
	//         maxFilesize: 3,
	//         addRemoveLinks: true,
	//         dictDefaultMessage: "Добавить фото",
	//         dictResponseError: 'Server not Configured',
	//         acceptedFiles: ".png,.jpg,.gif,.bmp,.jpeg",
	//         uploadMultiple: true,
	//         headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
	//         // hiddenInputContainer: '#photoDropzone',   
	//         // autoProcessQueue: false,

	//         // success: function(file, response) 
	//         // {
	//         //     console.log(file);
	//         //     console.log(response);
	//         // },
	//         // error: function(file, response)
	//         // {
	//         //    return false;
	//         // },

	         
	//         init: function(){
	//           var self = this;
	//           // config
	//           self.options.addRemoveLinks = true;
	//           self.options.dictRemoveFile = "Удалить фото";
	//           // let newInput = $('<input class="js_hidden filesInput" type="file" name="files[]" multiple="true">');
	//           // $('#photoDropzone').append(newInput);

	//           // var newFileList = [];

	//           //New file added
	//           self.on("addedfile", function (file) {
	//             // console.log('new file added ', file);
	//             // console.log($(self.element));
	//             // $(self.element).append($('<input name="files[]" type="hidden" ' + 'value="' + 123 + '">'));

	//             // fileList.push( $('.dz-hidden-input')[0].files[0] );
	//             // console.log('fileList: ', fileList)
	//             // console.log('inputs list: ', $('.dz-hidden-input')[0].files)
	//             // $('.dz-hidden-input')[0].files[3] = file;
	//             // console.log('inputs list2: ', $('.dz-hidden-input')[0].files)


	//             // newFileList = createFileList(file);
	//             // console.log(newFileList)

	//             // newInput[0].files = fileList;
	//             // $('.filesInput')[0].files = createFileList($('.dz-hidden-input')[0].files[0])
	            
	//             // self.options.autoQueue = false;
	           
	//           });
	//           // success files start
	//           self.on("success", function(file, response) {
	//             console.log(file);
	//             for (let i = 0; i < response.names.length; i++) {
	//               $(self.element).append($('<input name="files[]" type="hidden" ' + 'value="' + response.names[i] + '">'));
	//             }
	//           });
	//           self.on("removedfile", function(file){
	//             console.log(file);
	//             // var name = file.name;  
	//             //  $.ajax({
	//             //   type: 'POST',
	//             //   url: 'allegati.php?delete=true&id='+idIncarico,
	//             //   data: "fileId="+name,
	//             //   dataType: 'html'
	//             // });
	//           });

	//           // Send file starts
	//           self.on("sending", function (file, xhr, formData) {
	//             // console.log('upload started', file);

	//             $('.meter').show();
	//           });
	          
	//           // File upload Progress
	//           self.on("totaluploadprogress", function (progress) {
	//             // console.log("progress ", progress);
	//             $('.roller').width(progress + '%');
	//           });

	//           self.on("queuecomplete", function (progress) {
	//             // console.log("progress ", progress);
	//             $('.meter').delay(999).slideUp(999);
	//           });
	          
	//           // On removing file
	//           self.on("removedfile", function (file) {
	//             // console.log('remove');
	//             // console.log(file);
	//             $('#filesInput').remove();
	//           });
	//         }

	//       });

	//       myDropzone.push(dropzone) 
	//     }
	//   }
	// })

	(function() {

		function handleCallbackFormStatistic() {
			if ( dataLayer ) {
				console.log('in handleCallbackFormStatistic');
				dataLayer.push({'event': 'callback'});
			}
		}

		/**   отправить заявку на звонок  popups.js  **/
    $('.callbackPopupSubmitButton').click( function(e) {
			e.preventDefault();
			if (ValidationModule.isValid(this.form)){
					$.get( '/callbacks/create', $('#popup_callback_form').serialize(), function(data) {

									PopupModule.closePopup($('#popupCallback'));
									PopupModule.openPopup($('#popupSuccess'));
									handleCallbackFormStatistic();
									$('#popup_callback_form')[0].reset();
							},
							'json'
					);
			}

		});

		$('.callbackEvaluationPopupSubmitButton').click( function(e) {
			e.preventDefault();
			if (ValidationModule.isValid(this.form)){
					$.get( '/callbacks/create', $('#popup_evaluation_callback_form').serialize(), function(data) {

									$('#popupCallbackEvaluation').addClass('success');
									setTimeout(function() {
										$('#popupCallbackEvaluation').removeClass('success');
										PopupModule.closePopup($('#popupCallbackEvaluation'));
										PopupModule.hideOverlay("popup", document.getElementById('pageOverlay'));
									}, 3000);
									handleCallbackFormStatistic();
									$('#popup_evaluation_callback_form')[0].reset();
							},
							'json'
					)
					.fail(function() {
						$('#popupCallbackEvaluation').addClass('error');
						setTimeout(function() {
							$('#popupCallbackEvaluation').removeClass('error');
							PopupModule.closePopup($('#popupCallbackEvaluation'));
							PopupModule.hideOverlay("popup", document.getElementById('pageOverlay'));
						}, 3000);
					});
			}
		});

		$('.callbackSubmitButton').click( function(e) {
				e.preventDefault();
				if (ValidationModule.isValid(this.form)){
						$.get( '/callbacks/create', $('#faq_callback_form').serialize(), function(data) {

										PopupModule.openPopup($('#popupSuccess'));
										$('#faq_callback_form')[0].reset();
								},
								'json'
						);
				}
		});
	})();

	/* begin add mask to phone's inputs */
	(function() {
		if ( ! $('input[type=tel]').length ) return;

		const $inputTelephs = $('input[type=tel]');

		for (let i = 0; i < $inputTelephs.length; i++) {

			let cleave = new Cleave($inputTelephs[i], {
				numericOnly: true,
				blocks: [0, 3, 0, 3, 2, 2],
				delimiters: ["(", ")", " ", "-"],
			});
			
		}
	})();
	/* end add mask to phone's inputs */

	(function() {
		if ( ! $('input[type=trackTel]').length ) return;
		const $inputTelephs = $('input[type=trackTel]');
		for (let i = 0; i < $inputTelephs.length; i++) {
			let cleave = new Cleave($inputTelephs[i], {
				numericOnly: true,
				blocks: [0, 5, 3, 2, 2],
				delimiters: ["+", " ", "-"],
			});
		}
	})();
	/*$('#promoSlider').slick({
		// rtl: document.body.classList.contains('rtl'),
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: false,
		arrows: true,
		prevArrow: '<button class="slick-prev slick-arrow" aria-label="prev" type="button" style=""><i class="icomoon icon-angle"></i></button>',
		nextArrow: '<button class="slick-next slick-arrow" aria-label="next" type="button" style=""><i class="icomoon icon-angle"></i></button>',
		fade: true,
		speed: 1000,
		// cssEase: 'linear',
		// autoplay: false,
		// autoplaySpeed: 5000,
		asNavFor: '#promoNavSlider',

	});

	$('#promoNavSlider').slick({
		// rtl: document.body.classList.contains('rtl'),
		slidesToShow: 3,
		slidesToScroll: 1,
		vertical: true,		
		dots: false,
		arrows: false,
		// fade: true,
		speed: 0,
		// cssEase: 'linear',
		// autoplay: false,
		// autoplaySpeed: 5000,
		asNavFor: '#promoSlider',
		centerMode: false,
		focusOnSelect: true,
			responsive: [
				{
					breakpoint: 768,
					settings: {
						vertical: false
					}
				}
			]
	});*/

	function	handlerDisabledBtn(el, flag) {

		const form = el.closest("form")
		const erMess = form.querySelector('.er-courent-num');
		const submitForm = form.querySelector("button")
		var er =	el.getAttribute("data-error-text")

		el.onblur = function() {
			if (flag) {
				erMess.innerHTML = "";
			} else {
				erMess.innerHTML = er;
			}
		}

		if (flag) {
			erMess.innerHTML = "";
			submitForm.classList.remove("disabled")
			submitForm.disabled = false;
		} else {
			submitForm.classList.add("disabled")
			submitForm.disabled = true;
		}
	}

	function handlerValidValueNumber(el) {
		let value = el.value
		let clearStrValue = value.replace(/[\D]+/g, "");
		if (el.getAttribute('type') === 'trackTel') {

			if (clearStrValue.length < 12) {
				handlerDisabledBtn(el, false)
			} else {
				handlerDisabledBtn(el, true)
			}

		} else if (el.getAttribute('type') === 'tel') {

			if (clearStrValue.length < 10) {
				handlerDisabledBtn(el, false)
			} else {
				handlerDisabledBtn(el, true)
			}

		} else {
			return false;
		}
	}

	const $inputTel = $('.tracking[type=tel]');
	const $inputTrackTel = $('.tracking[type=trackTel]');

	$inputTrackTel.on("input", function() {
		this.value = "+38" + this.value.slice(3);
		handlerValidValueNumber(this)
	});

	$inputTel.on("input", function() {
		handlerValidValueNumber(this)
	});

	// ---------- Sticky block---------------
	var stickyAsideBlock = document.querySelector('.sticky');

	if ( stickyAsideBlock && document.documentElement.clientWidth > 991 ) {
		var targetStickBlock = stickyAsideBlock.firstElementChild;
		let relativeBlock = document.getElementById(stickyAsideBlock.dataset.stickTo)

		glob.StickyBlockModule.toStick(targetStickBlock, relativeBlock);		
	}

	// -----------target-button------
	(() => {
		if ( ! $('.target-button--js').length ) return;

		const $targetBtns = $('.target-button--js');
		
		$targetBtns.each((idx, btn) => {
			const $btn = $(btn);
			$btn.on('click', (e) => {
				const targetClass = '.' + $btn.data('target');
				const action = $btn.data('action-type');
				const $targetBlock = $(targetClass); 

				switch(action) {
					case 'hide':
						$targetBlock.hide();
						break;
					case 'show':
						$targetBlock.show();
						break;
					case 'toggle':
						$targetBlock.toggle();
						break;
					case 'slide-toggle':
						$targetBlock.slideToggle();
						break;
				}
			});
		});

	})();

	/* validation */
	(() => {
		if ( ! $('.form-val-js').length ) return;

		const $formsValidate = $('.form-val-js');

		$formsValidate.on('submit', function(e) {
			let $targetForm = $(this);

			if (  ! ValidationModule.isValid($targetForm) ) {
				e.preventDefault();
			}
		});
	})();



});




// ----------------------


window.onload = function() {
		$('body').removeClass('js_pageOverlayOpen');
		$('#page-preloader').fadeOut('slow');

		(() => {
			setTimeout(() => {
				let isReadMessageSecond = globFunc.getCookie('isReadMessageSecond');
				
				if (!isReadMessageSecond) {
					let modal = $('#popupMessage-second');
					if ( modal.length ) {
						PopupModule.openPopup(modal);
					}
				}
			}, 1000);
		})();
	};

@@include('cabinet.js')