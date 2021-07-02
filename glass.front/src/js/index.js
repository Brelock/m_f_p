let status = "JS - OK!";

var site = null;

(function () {  
	if (!$(".slide").length) return;
	if (document.documentElement.clientWidth < 768) {
		$('.slide').slick({
		  dots: true,
		  infinite: true,
		  speed: 300,
		  slidesToShow: 1,
		  adaptiveHeight: true,
		  autoplay: true,
		  autoplaySpeed: 3000,
		  arrows: false
		});
	}
})();

(function () {  
	let $itemSlide = $(".item-body-gallery .gallery-glasses_item")
	if (!$(".i--slide").length) return;
	if (document.documentElement.clientWidth < 768 && $itemSlide.length > 1) {
		$('.i--slide').slick({
		  dots: true,
		  infinite: true,
		  speed: 300,
		  slidesToShow: 1,
		  adaptiveHeight: true,
		  autoplay: true,
		  autoplaySpeed: 3000,
		  arrows: false
		});
	}
})();

// =================
@@include('frames/globalFunctions.js')
// ===============




$(document).ready(function() {
	if (!$('body')) {console.log('jQuery Error')}
	
	site = (function(window, document, $) {  

		const $win = $(window),
			$dom = $(document),
			$body = jQuery(document.body),
			app = {},
			
			$homePage = $(".homePage"),
			$glassesItem = $(".offer-glasses_item"),
			// button menu
			$menuBtn = $(".menu-btn"),
			$nav = $(".nav"),
			$lineOne = $(".nav .menu-btn .line--1"),
			$lineTwo = $(".nav .menu-btn .line--2"),
			$lineThree = $(".nav .menu-btn .line--3"),
			$link = $(".nav .nav-links"),
			// search input
			$btnSearch = $(".btn-search") ,

			// hiden sub menu item
			$liItemNav = $(".item-list li"),
			$itemNavBefore = $(".item-menu"),
			$labelCheckBox =$(".offer-glasses_item-check-button label"),  

			// filter 
			$accItem = $(".acc-item"),
			$btnClearFilter = $(".clear-product-filter"),
			// item product
			$btnColorGlesses = $(".offer-glasses_item-check-button input"), 
			$dropItem = $(".prod-i-js"),
			// modal
			$modal = $(".modal-custom"),
			$modalOverlay = $(".modal-custom__overlay"),

			// basket
			$overflowBtn = $(".handler-visible-item"),
			$oneBtn = $(".one-form__title"),
			$twoBtn = $(".two-form__title")
	
		const fn = {
	
			menuButton() {
			  $menuBtn.on("click", function(){
				$nav.toggleClass("nav-open");
				$lineOne.toggleClass("line-cross");
				$lineTwo.toggleClass("line-fade-out");
				$lineThree.toggleClass("line-cross");
				$link.toggleClass("fade-in");
			  });
			},
	
			handlerActiveSearchInput() {
				$btnSearch.on("click", function () {  
					const $btn = $(this);
					const $container = $btn.closest(".head-btn-search")
					const $findInput = $container.find("input")
					$findInput.toggleClass("active")
				})
			},
		
			handleVisibleSubmenu() {
				$liItemNav.on("click", function () {  
					$(this).toggleClass("active")
				})
			},
	 
			handlerMouseOverForMenuItem() { 
				$itemNavBefore.mouseover(function () { 
					$(this).addClass("before-line--active");
					$(this).css("position", "static")
				});
				$itemNavBefore.mouseout(function () { 
					$(this).removeClass("before-line--active")
					$(this).css("position", "relative")
				});

			},
	
			handlerActiveLable() {
				$labelCheckBox.on("click", function () {  
					const $btn = $(this);
					const $container = $btn.closest(".offer-glasses_item-check-button")
					const $findThisLable = $container.find("label")
					$findThisLable.removeClass("active");
					$(this).addClass("active")
				})
			},
	
			handlerMouseOverFilter(){
				$accItem.mouseover(function () {
					$(this).addClass("active")
				}) 
				$accItem.mouseout(function () { 
					$accItem.removeClass("active")
				})
				
			},
	
			handlerActiveFilter(){
				$accItem.on("click", function () {  
					$accItem.removeClass("active-filter")
					$(this).addClass("active-filter active")
					// $accItem.("active")
					$modal.show()
				})
				$modalOverlay.on("click", function () {  
					$modal.hide()
					$accItem.removeClass("active-filter active")

				})
			},

			handlerBottomBannerImg() {  
		
				const $bannerT = $(".banner-b-t")
				const $bannerBd = $(".banner-b-bd")
				const $bannerBt = $(".banner-b-bt")
		
				const $setImgT = $(".banner-b-t img")
				const $setImgBd = $(".banner-b-bd img")
				const $setImgBt = $(".banner-b-bt img")
		
				const $desctopImgT = $setImgT.attr("data-defoult-img")
				const $desctopImgBd = $setImgBd.attr("data-defoult-img")
				const $desctopImgBt = $setImgBt.attr("data-defoult-img")
		
				const $mobImgSlideT = $setImgT.attr("data-mobile")
				const $mobImgSlideBd = $setImgBd.attr("data-mobile")
				const $mobImgSlideBt = $setImgBt.attr("data-mobile")
			
				if (document.documentElement.clientWidth < 767) {
					$bannerT.html("<img src=" + $mobImgSlideT + ">");
					$bannerBd.html("<img src=" + $mobImgSlideBd + ">");
					$bannerBt.html("<img src=" + $mobImgSlideBt + ">");
				}
				if (document.documentElement.clientWidth > 768) {
					$bannerT.html("<img src=" + $desctopImgT + ">");
					$bannerBd.html("<img src=" + $desctopImgBd + ">");
					$bannerBt.html("<img src=" + $desctopImgBt + ">");
				}
		
			},

			handlerEditImg() {  
				$btnColorGlesses.on("click", function () {  {
					const $thisData = $(this).data("check")
					const $container = $(this).closest(".offer-glasses_item")
					const $findItem = $container.find(".offer-glasses_item-img")
					$findItem.html("<img src=" + $thisData + ">");
				}})
			},

			clearInputFilters() {
				$btnClearFilter.on("click", function () {  
				const $closesBlock	= $(this).closest(".products-filters__container")
				const $findInputs = $closesBlock.find("input[type='checkbox']")
				for (let i = 0; i < $findInputs.length; i++) {
					if (($findInputs).is(":checked")) {
						$findInputs[i].checked = false; 
					}
				
					
				}
					console.log($findInputs);
				})
			},
			
			dropContentProdItem(){
				$dropItem.on("click", function () {  
					$(this).addClass("drop-item__active")
					$(this).on("click", function () {  
						$(this).toggleClass("drop-item__active")
					})
				})
			},

			handlerVisibleListBasket(){
				// $overflowBtn.hasClass("actived") ? $(this).text("Скрыть") : $(this).text("Показать полностью")
				$overflowBtn.on("click", function () {  
					$(this).hasClass("actived") ? $(this).text("Скрыть") : $(this).text("Показать полностью")
					// const $listBasketHiden = $(".prod-mobile-hiden")
					const $thisList = $(this).closest(".prod-item__list")
					const $findElShow = $thisList.find(".prod-mobile-hiden")
					$findElShow.toggleClass("prod__visible")
					$(this).toggleClass("actived")
				})
			},

			handlerShowBasketBlockForms(){
				const $oneForm = $(".item-form__one")
				const $twoForm = $(".item-form__two")
				$oneBtn.on("click", function () {  
					$oneBtn.addClass("before-title__active")
					$twoBtn.removeClass("before-title__active")
					// $(this).addClass("active__title")
					// $twoBtn.removeClass("avtive__title")
					$oneForm.addClass("form-actived")
					$twoForm.removeClass("form-actived")
				})
				$twoBtn.on("click", function () {  
					$twoBtn.addClass("before-title__active")
					$oneBtn.removeClass("before-title__active")
					// $(this).addClass("active__title")
					// $oneBtn.removeClass("avtive__title")
					$oneForm.removeClass("form-actived")
					$twoForm.addClass("form-actived")
				})
			},

			domReady(){
			
			  if ($menuBtn.length) {
				fn.menuButton();
			  }

			  if ( $btnSearch.length) {
				fn.handlerActiveSearchInput();
			  }

			  if ( $liItemNav.length && document.documentElement.clientWidth > 1241 ) {
				fn.handlerMouseOverForMenuItem();
			  }
		  
			  if ( $liItemNav.length && document.documentElement.clientWidth < 1240 ) {
				fn.handleVisibleSubmenu();
			  }

			  if ( $labelCheckBox.length && $homePage.length) {
				fn.handlerActiveLable();
			  }

			  if ( $accItem.length &&  document.documentElement.clientWidth > 768 ) {
				fn.handlerMouseOverFilter();
			  }
			  if ( $accItem.length &&  document.documentElement.clientWidth < 768 ) {
				fn.handlerActiveFilter();
			  }

			  if ( $glassesItem.length) {
				fn.handlerBottomBannerImg();
			  }

			  if ( $btnColorGlesses.length) {
				fn.handlerEditImg();
			  }

			  if ( $btnClearFilter.length) {
				fn.clearInputFilters();
			  }

			  if ( $dropItem.length) {
				fn.dropContentProdItem();
			  }

			  if ( $overflowBtn.length) {
				fn.handlerVisibleListBasket();
			  }

			  if ( $oneBtn.length) {
				fn.handlerShowBasketBlockForms();
			  }

			}
	
	  }      
		  
	   $dom.ready(fn.domReady);
	
	   return fn;
	
	  })(window,document,jQuery);


	






	

});


window.onload = function() {
	console.log('window load')
}
