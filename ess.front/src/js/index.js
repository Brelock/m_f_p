let status = "JS - OK!";
let site = null;
var glob = {};

// =================

(function () {
	const $visivleChecked = $('.visible-viewportchecker')
	if ($visivleChecked.length && document.documentElement.clientWidth > 1170) {
		$visivleChecked.addClass('hidden')
		$visivleChecked.viewportChecker({

			classToAdd: 'visible animated bounceInLeft',
			offset: 20
		});
	}
	if ($visivleChecked.length && document.documentElement.clientWidth < 1170) {
		$visivleChecked.addClass('hidden')
		$visivleChecked.viewportChecker({

			classToAdd: 'visible animated bounceInLeft',
			offset: 30
		});
	}
})();


// =================

// $('.slick-slider-i').slick('setPosition');


//    ----  lazy -load ------
// -------------------------
// (function () {  
// 	$(window).scroll(function() {
//     $.each($('img'), function() {
//         if ( $(this).attr('data-src') && $(this).offset().top < ($(window).scrollTop() + $(window).height() - 200) ) {
//             var source = $(this).data('src');
//             $(this).attr('src', source);
// 						$(this).removeAttr('data-src');
// 						$(this).addClass("img-show__js");
// 						$(this).removeClass("pattern")
//         }
//     })
// })
// })();

// -------------------------

/*$(function () {

	if (document.documentElement.clientWidth > 1240 && document.getElementById("homePage")) {
		$('.container').fullpage();
	}
});*/

// @@include('frames/globalFunctions.js')


// ===============
document.addEventListener("DOMContentLoaded", function (event) {
	if (!document.getElementsByTagName("body")) { console.log('js error') }

	// console.log('document ready')
	// if (document.documentElement.clientWidth > 991 ) {}

	// =================Include Modules==============================
	/* // @@include('frames/modal.js') */
	@@include('libs/maps.js');
	
	site = (function () {

		const win = window,
			dom = document,
			body = document.body,
			app = {},
			$body = ("body"),

			// button menu
			$menuBtn = $(".menu-btn"),
			$nav = $(".nav"),
			$lineOne = $(".nav .menu-btn .line--1"),
			$lineTwo = $(".nav .menu-btn .line--2"),
			$lineThree = $(".nav .menu-btn .line--3"),
			$link = $(".nav .nav-links"),
			$langHeaderUa = $(".lang-ua"),
			$langHeaderRu = $(".lang-ru"),
			$nawsWrap = $(".navs-wrap"),
			// modal
			$modalBlock = $(".modal-custom"),
			$overlay = $(".modal-custom__overlay"),
			/* map */
			$mapSection = $(".contact-section-maps"),
			// slide manufacturer
			$slideItem = $(".manufacturer-item"),
			$inputItem = $(".js-inputWrapper"),
			// slider
			$slickKness = $(".product-slider"),
			$slick = $(".project-item__slider"),
			$sketch = $(".sketch-slider"),
			$sketch1 = $(".sketch-1"),
			$sketch2 = $(".sketch-2"),
			$sketch3 = $(".sketch-3"),
			$sketchPerformance = $(".sketch-performance"),
			$sketchMaxeon = $(".sketch-maxeon"),
			$personTopBanner = $(".person-top-banner"),
			$insuranceTopSection = $(".insurance-top-section"),
			$topSection = $(".top-section"),
			$sliderUi1 = $(".s1"),
			$sliderUi2 = $(".s2"),
			$sliderUi3 = $(".s3"),
			$sliderUi4 = $(".s4"),
			$sliderUi5 = $(".s5"),
			$sliderUi6 = $(".s6"),
			// privat page
			$btnSlide = $(".content-slide-btn"),
			$btnArrow = $(".top-section__arrow-down"),
			$btnOrderPanel = $(".top-slider-btn"),
			// type it
			// $typeItId = $("#typeItInit"),
			$pageUa = $(".privatPersonPage.uk"),
			$pageRu = $(".privatPersonPage.ru"),
			$insurancePageUa = $(".insurancePage.uk"),
			$insurancePageRu = $(".insurancePage.ru"),
			// flexbox slide
			$flexSlide = $(".flexbox-slide"),
			// company page
			$graficIcon = $(".grafic__click"),
			$objSlide = $(".obj-slide"),
			$btnScroll = $(".btn-scroll"),
			// $slideEcoGrafic = $(".economic-grafic-slide-wrap"),
			// sunpower page
			$imgPanel = $(".sun-block-img"),
			$sunCount = $(".sun-count-banner"),
			// home page map ukraine
			$elMap = $(".map-el"),
			$inputForm = $(".project-cost__form input"),
			$iconSlide = $(".manufacturer-conteiner-wrap"),
			// $scrollTopButton = $('#scrollTopButton'),
			$essModal = $(".ess-modal"),
			$benefitTitle = $('.benefit-title'),
			// reviews
			$reviewsTextSlide = $(".reviews-text-slide"),
			$reviewsVideoSlide = $(".video-review-slide"),
			$reviewsMessageSlide  = $(".message-review-wraps"),
			// 
			$gallaryWorkIn = $('.gallary-workIn'),
			$knessPage = []


		const fn = {

			handlerModalVideoPopap() {
				if ( ! $('.sunport-mwt-technology').length ) return;

				const $iframe = $(".modal-content-wrap iframe")
				const $bt = $('.mwt-btn');
				
				const $modalBlock = $('.modal-video-popap')
				const $btnOverlay =  $modalBlock.find('.video-popap-overlay');
				const $btnBasketClose = $modalBlock.find('.modal-close__btn');
				
				$bt.click(function () {  
					$modalBlock.show()
					$iframe.attr("src", "https://www.youtube.com/embed/8cOH2-qANTY?autoplay=1")
				})
			   
				$btnBasketClose.click(function () {  
					$modalBlock.hide()
					$iframe.attr("src", "#")
				})
			
				$btnOverlay.click(function () {  
					$modalBlock.hide()
					$iframe.attr("src", "#")
				})
			},

			 logoScroll() {				
				var scrollTop = $(window).scrollTop();
				const $iconScrollLogo = $(".iconLogoScroll")

				if(scrollTop > 300){
					$iconScrollLogo.addClass("js_logoVisible")
				} 

				$(window).scroll(function() {
						if($(window).scrollTop() > scrollTop){
							$iconScrollLogo.addClass("js_logoVisible")
							scrollTop = $(window).scrollTop();
						} 
						if($(window).scrollTop() < 300){
							$iconScrollLogo.removeClass("js_logoVisible")
							scrollTop = $(window).scrollTop();
							// console.log('>300px');
						}
				});

			},

			menuButton() {
				$menuBtn.on("click", function () {
					$nav.toggleClass("nav-open");
					$lineOne.toggleClass("line-cross");
					$lineTwo.toggleClass("line-fade-out");
					$lineThree.toggleClass("line-cross");
					$link.toggleClass("fade-in");
				});
			},

			handlerActiveLang() {
				const $page = $(".sunpowerPage")
				$langHeaderUa.on("click", function () {
					$langHeaderRu.removeClass("lang__active");
					$langHeaderUa.addClass("lang__active")
				})
				$langHeaderRu.on("click", function () {
					$langHeaderUa.removeClass("lang__active");
					$langHeaderRu.addClass("lang__active")
				})


			},

			handlerModalActive() {
				$menuBtn.on("click", function () {
					$modalBlock.toggleClass("modal__active");
				});
				$overlay.on("click", function () {
					$modalBlock.removeClass("modal__active");
					$nav.toggleClass("nav-open");
					$lineOne.toggleClass("line-cross");
					$lineTwo.toggleClass("line-fade-out");
					$lineThree.toggleClass("line-cross");
					$link.toggleClass("fade-in");
				})
			},

			handlePlaceholderInp() {
				var $inputItem = $(".js-inputWrapper");
				$inputItem.length && $inputItem.each(function () {
					var $this = $(this),
						$input = $this.find(".formRow--input"),
						placeholderTxt = $input.attr("placeholder"),
						// doptext = $input.attr("data-doptext"),
						$placeholder;

					$input.after('<div class="placeholder">' + placeholderTxt + " " + "</div>"),
						$input.attr("placeholder", ""),
						$placeholder = $this.find(".placeholder"),

						// $input.val().length ? $this.addClass("active") : $this.removeClass("active"),
					// console.log( $input.val());
						$input.on("focusout", function () {
							$input.val().length ? $this.addClass("active") : $this.removeClass("active");
						}).on("focus", function () {
							$this.addClass("active");
						});
				});

			},

			slickSlider() {
				$('.slider-for').slick({
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: true,
					fade: true,
					infinite: true,
					centerMode: true,
					asNavFor: '.slider-nav',
					prevArrow: $('.next'),
					nextArrow: $('.prev')
				});

				$('.slider-nav').slick({
					slidesToShow: 2,
					slidesToScroll: 1,
					asNavFor: '.slider-for',
					dots: false,
					infinite: true,
					centerMode: false,
					variableWidth: true,
					focusOnSelect: true
				});

			},

			sketchSliderKness() {
				const $sketchSlider = $('.sketch-slider');
				const $sketchInnerSliders = $sketchSlider.find('.s-for');
				const $sketchInnerNavSliders = $sketchSlider.find('.s-nav');

				const innerSliderOptions = {
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: true,
					speed: 200,
					fade: true,

					centerMode: false,
					asNavFor: $($sketchInnerNavSliders[0]),
					prevArrow: $('.s-prev'),
					nextArrow: $('.s-next')
				};
				const innerNavSliderOptions = {
					slidesToShow: 2,
					slidesToScroll: 1,
					asNavFor: $($sketchInnerSliders[0]),
					dots: false,
					speed: 200,
					infinite: true,
					centerMode: false,
					variableWidth: true,
					focusOnSelect: true
				};

				$sketchSlider.slick({
					dots: false,
					speed: 200,
					slidesToShow: 1,
					autoplay: true,
					autoplaySpeed: 5000,
					prevArrow: $('.prev-panel'),
					nextArrow: $('.next-panel')
				});

				$($sketchInnerSliders[0]).slick(innerSliderOptions);
				$($sketchInnerNavSliders[0]).slick(innerNavSliderOptions);

				$sketchSlider.on('beforeChange', (event, slick, currentSlide, nextSlider) => {
					setTimeout(() => {
						$(slick['$slides'][currentSlide]).find('.s-for').slick('unslick')
						$(slick['$slides'][currentSlide]).find('.s-nav').slick('unslick')
					}, 500);

					$(slick['$slides'][nextSlider]).find('.s-for').slick({
						slidesToShow: 1,
						slidesToScroll: 1,
						arrows: true,
						speed: 200,
						fade: true,

						centerMode: false,
						asNavFor: $($sketchInnerNavSliders[nextSlider]),
						prevArrow: $($sketchInnerSliders[nextSlider]).closest('.product-slider').find('.s-prev'),
						nextArrow: $($sketchInnerSliders[nextSlider]).closest('.product-slider').find('.s-next')
					});

					$(slick['$slides'][nextSlider]).find('.s-nav').slick({
						slidesToShow: 2,
						slidesToScroll: 1,
						asNavFor: $($sketchInnerSliders[nextSlider]),
						dots: false,
						speed: 200,
						arrows: false,
						infinite: true,
						centerMode: false,
						variableWidth: true,
						focusOnSelect: true
					});
				});

			},

			sketchSliderSanpowerTop() {
				const $sketchSlider = $('.sketch-slider_sanpower-top');
				const $sketchInnerSliders = $sketchSlider.find('.s-for');
				const $sketchInnerNavSliders = $sketchSlider.find('.s-nav');

				const innerSliderOptions = {
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: true,
					speed: 200,
					fade: true,

					centerMode: false,
					asNavFor: $($sketchInnerNavSliders[0]),
					prevArrow: $('.s-prev'),
					nextArrow: $('.s-next')
				};
				const innerNavSliderOptions = {
					slidesToShow: 2,
					slidesToScroll: 1,
					asNavFor: $($sketchInnerSliders[0]),
					dots: false,
					speed: 200,
					infinite: true,
					centerMode: false,
					variableWidth: true,
					focusOnSelect: true
				};

				$sketchSlider.slick({
					prevArrow: $('.prev-panel-top'),
					nextArrow: $('.next-panel-top'),
					pauseOnHover: false,
					pauseOnFocus: false,
					draggable: false,
					touchMove: false,
					dots: false,
					speed: 200,
					slidesToShow: 1,
					autoplay: false,
					autoplaySpeed: 5000,
					touchMove: false
					// responsive: [
					// 	{
					// 		breakpoint: 1200,
					// 		settings: {
					// 			draggable:false,
					// 			touchMove:false,
					// 		}
					// 	}
					// ]
				});

				$($sketchInnerSliders[0]).slick(innerSliderOptions);
				$($sketchInnerNavSliders[0]).slick(innerNavSliderOptions);

				$sketchSlider.on('beforeChange', (event, slick, currentSlide, nextSlider) => {
					setTimeout(() => {
						$(slick['$slides'][currentSlide]).find('.s-for').slick('unslick')
						$(slick['$slides'][currentSlide]).find('.s-nav').slick('unslick')
					}, 500);

					$(slick['$slides'][nextSlider]).find('.s-for').slick({
						slidesToShow: 1,
						slidesToScroll: 1,
						arrows: true,
						speed: 200,
						fade: true,

						centerMode: false,
						asNavFor: $($sketchInnerNavSliders[nextSlider]),
						prevArrow: $($sketchInnerSliders[nextSlider]).closest('.product-slider').find('.s-prev'),
						nextArrow: $($sketchInnerSliders[nextSlider]).closest('.product-slider').find('.s-next')
					});

					$(slick['$slides'][nextSlider]).find('.s-nav').slick({
						slidesToShow: 2,
						slidesToScroll: 1,
						asNavFor: $($sketchInnerSliders[nextSlider]),
						dots: false,
						speed: 200,
						arrows: false,
						infinite: true,
						centerMode: false,
						variableWidth: true,
						focusOnSelect: true
					});
				});

			},

			sketchSliderSanpowerBottom() {
				const $sketchSlider = $('.sketch-slider_sanpower-bottom');
				const $sketchInnerSliders = $sketchSlider.find('.s-for');
				const $sketchInnerNavSliders = $sketchSlider.find('.s-nav');

				const innerSliderOptions = {
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: true,
					speed: 200,
					fade: true,

					centerMode: false,
					asNavFor: $($sketchInnerNavSliders[0]),
					prevArrow: $('.s-prev'),
					nextArrow: $('.s-next')
				};
				const innerNavSliderOptions = {
					slidesToShow: 2,
					slidesToScroll: 1,
					asNavFor: $($sketchInnerSliders[0]),
					dots: false,
					speed: 200,
					infinite: true,
					centerMode: false,
					variableWidth: true,
					focusOnSelect: true
				};

				$sketchSlider.slick({
					prevArrow: $('.prev-panel'),
					nextArrow: $('.next-panel'),
					pauseOnHover: false,
					pauseOnFocus: false,
					draggable: false,
					touchMove: false,
					dots: false,
					speed: 200,
					slidesToShow: 1,
					autoplay: false,
					autoplaySpeed: 5000,
					touchMove: false
					// responsive: [
					// 	{
					// 		breakpoint: 1200,
					// 		settings: {
					// 			draggable: false,
					// 			touchMove: false,
					// 		}
					// 	}
					// ]
				});

				$($sketchInnerSliders[0]).slick(innerSliderOptions);
				$($sketchInnerNavSliders[0]).slick(innerNavSliderOptions);

				$sketchSlider.on('beforeChange', (event, slick, currentSlide, nextSlider) => {
					setTimeout(() => {
						$(slick['$slides'][currentSlide]).find('.s-for').slick('unslick')
						$(slick['$slides'][currentSlide]).find('.s-nav').slick('unslick')
					}, 500);

					$(slick['$slides'][nextSlider]).find('.s-for').slick({
						slidesToShow: 1,
						slidesToScroll: 1,
						arrows: true,
						speed: 200,
						fade: true,

						centerMode: false,
						asNavFor: $($sketchInnerNavSliders[nextSlider]),
						prevArrow: $($sketchInnerSliders[nextSlider]).closest('.product-slider').find('.s-prev'),
						nextArrow: $($sketchInnerSliders[nextSlider]).closest('.product-slider').find('.s-next')
					});

					$(slick['$slides'][nextSlider]).find('.s-nav').slick({
						slidesToShow: 2,
						slidesToScroll: 1,
						asNavFor: $($sketchInnerSliders[nextSlider]),
						dots: false,
						speed: 200,
						arrows: false,
						infinite: true,
						centerMode: false,
						variableWidth: true,
						focusOnSelect: true
					});
				});

			},

			initNoUiSlideTop() {
				let sliderTop = document.getElementById('top-slide-panel11');
				let sliderTop2 = document.getElementById('top-slide-panel12');
				let sliderTop3 = document.getElementById('top-slide-panel13');
				let sliderTop4 = document.getElementById('top-slide-panel14');
				const slidersCommon = $('.slider-common');

				const commonOptions = {
					start: 1,
					connect: true,
					step: 1,
					range: {
						'min': 1,
						'max': 5
					}
				};

				noUiSlider.create(sliderTop, commonOptions);
				noUiSlider.create(sliderTop2, commonOptions);

				noUiSlider.create(sliderTop3, {
					start: 1,
					connect: true,
					step: 1,
					range: {
						'min': 1,
						'max': 3
					},
				});

				noUiSlider.create(sliderTop4, {
					start: 1,
					connect: true,
					step: 1,
					range: {
						'min': 1,
						'max': 3
					},
				});

				slidersCommon.each((idx, slider) => {
					slider.noUiSlider.on('update', function (values, handle) {
						const value = Number(slider.noUiSlider.get()).toFixed();
						const marks = $(this.target).next().find('.mark-hide');

						marks.each((idx, el) => {
							const mark = $(el);
							mark.removeClass('mark-active');

							if (value == (idx + 1)) {
								mark.addClass('mark-active');
							}
						});
					});
				});
			},

			initNoUiSlideBottom() {
				let sliderBottom1 = document.getElementById('bottom-slide-panel21');
				let sliderBottom2 = document.getElementById('bottom-slide-panel22');
				let sliderBottom3 = document.getElementById('bottom-slide-panel23');
				let sliderBottom4 = document.getElementById('bottom-slide-panel24');
				const slidersCommon2 = $('.slider-common2');
				noUiSlider.create(sliderBottom1, {
					start: 1,
					connect: true,
					step: 1,
					range: {
						'min': 1,
						'max': 5
					},
				});
				noUiSlider.create(sliderBottom2, {
					start: 1,
					connect: true,
					step: 1,
					range: {
						'min': 1,
						'max': 5
					},
				});
				noUiSlider.create(sliderBottom3, {
					start: 1,
					connect: true,
					step: 1,
					range: {
						'min': 1,
						'max': 3
					},
				});
				noUiSlider.create(sliderBottom4, {
					start: 1,
					connect: true,
					step: 1,
					range: {
						'min': 1,
						'max': 3
					},
				});
				slidersCommon2.each((idx, slider) => {
					slider.noUiSlider.on('update', function (values, handle) {
						const value = Number(slider.noUiSlider.get()).toFixed();
						const marks = $(this.target).next().find('.mark-hide');

						marks.each((idx, el) => {
							const mark = $(el);
							mark.removeClass('mark-active');

							if (value == (idx + 1)) {
								mark.addClass('mark-active');
							}
						});
					});
				});
			},

			initNoUiSlideBottom3() {
				let sliderBottom31 = document.getElementById('bottom-slide-panel31');
				let sliderBottom32 = document.getElementById('bottom-slide-panel32');
				let sliderBottom33 = document.getElementById('bottom-slide-panel33');
				let sliderBottom34 = document.getElementById('bottom-slide-panel34');
				const slidersCommon311 = $('.slider-common31');
				noUiSlider.create(sliderBottom31, {
					start: 1,
					connect: true,
					step: 1,
					range: {
						'min': 1,
						'max': 5
					},
				});
				noUiSlider.create(sliderBottom32, {
					start: 1,
					connect: true,
					step: 1,
					range: {
						'min': 1,
						'max': 5
					},
				});
				noUiSlider.create(sliderBottom33, {
					start: 1,
					connect: true,
					step: 1,
					range: {
						'min': 1,
						'max': 3
					},
				});
				noUiSlider.create(sliderBottom34, {
					start: 1,
					connect: true,
					step: 1,
					range: {
						'min': 1,
						'max': 3
					},
				});
				slidersCommon311.each((idx, slider) => {
					slider.noUiSlider.on('update', function (values, handle) {
						const value = Number(slider.noUiSlider.get()).toFixed();
						const marks = $(this.target).next().find('.mark-hide');

						marks.each((idx, el) => {
							const mark = $(el);
							mark.removeClass('mark-active');

							if (value == (idx + 1)) {
								mark.addClass('mark-active');
							}
						});
					});
				});
			},

			initNoUiSlideBottom4() {
				let sliderBottom41 = document.getElementById('bottom-slide-panel41');
				let sliderBottom42 = document.getElementById('bottom-slide-panel42');
				let sliderBottom43 = document.getElementById('bottom-slide-panel43');
				let sliderBottom44 = document.getElementById('bottom-slide-panel44');
				const slidersCommon4 = $('.slider-common4');
				noUiSlider.create(sliderBottom41, {
					start: 1,
					connect: true,
					step: 1,
					range: {
						'min': 1,
						'max': 5
					},
				});
				noUiSlider.create(sliderBottom42, {
					start: 1,
					connect: true,
					step: 1,
					range: {
						'min': 1,
						'max': 5
					},
				});
				noUiSlider.create(sliderBottom43, {
					start: 1,
					connect: true,
					step: 1,
					range: {
						'min': 1,
						'max': 3
					},
				});
				noUiSlider.create(sliderBottom44, {
					start: 1,
					connect: true,
					step: 1,
					range: {
						'min': 1,
						'max': 3
					},
				});
				slidersCommon4.each((idx, slider) => {
					slider.noUiSlider.on('update', function (values, handle) {
						const value = Number(slider.noUiSlider.get()).toFixed();
						const marks = $(this.target).next().find('.mark-hide');

						marks.each((idx, el) => {
							const mark = $(el);
							mark.removeClass('mark-active');

							if (value == (idx + 1)) {
								mark.addClass('mark-active');
							}
						});
					});
				});
			},

			initNoUiSlideBottomKness() {
				let sliderBottom31 = document.getElementById('bottom-slide-panel31');
				let sliderBottom32 = document.getElementById('bottom-slide-panel32');
				let sliderBottom33 = document.getElementById('bottom-slide-panel33');
				let sliderBottom34 = document.getElementById('bottom-slide-panel34');
				const slidersCommon311 = $('.slider-common31');
				noUiSlider.create(sliderBottom31, {
					start: 1,
					connect: true,
					step: 1,
					range: {
						'min': 1,
						'max': 5
					},
				});
				noUiSlider.create(sliderBottom32, {
					start: 1,
					connect: true,
					step: 1,
					range: {
						'min': 1,
						'max': 5
					},
				});
				noUiSlider.create(sliderBottom33, {
					start: 1,
					connect: true,
					step: 1,
					range: {
						'min': 1,
						'max': 3
					},
				});
				noUiSlider.create(sliderBottom34, {
					start: 1,
					connect: true,
					step: 1,
					range: {
						'min': 1,
						'max': 3
					},
				});
				slidersCommon311.each((idx, slider) => {
					slider.noUiSlider.on('update', function (values, handle) {
						const value = Number(slider.noUiSlider.get()).toFixed();
						const marks = $(this.target).next().find('.mark-hide');

						marks.each((idx, el) => {
							const mark = $(el);
							mark.removeClass('mark-active');

							if (value == (idx + 1)) {
								mark.addClass('mark-active');
							}
						});
					});
				});
			},

			initNoUiSlideBottomSunPage() {
				let sliderBottom1 = document.getElementById('sun-count-s1');
				let sliderBottom2 = document.getElementById('sun-count-s2');
				let sliderBottom3 = document.getElementById('sun-count-s3');
				const slidersCommon4 = $('.slider-common4');
				noUiSlider.create(sliderBottom1, {
					start: 1,
					connect: true,
					step: 1,
					range: {
						'min': 1,
						'max': 5
					},
				});
				noUiSlider.create(sliderBottom2, {
					start: 1,
					connect: true,
					step: 1,
					range: {
						'min': 1,
						'max': 2
					},
				});
				noUiSlider.create(sliderBottom3, {
					start: 1,
					connect: true,
					step: 1,
					range: {
						'min': 1,
						'max': 3
					},
				});
				slidersCommon4.each((idx, slider) => {
					slider.noUiSlider.on('update', function (values, handle) {
						const value = Number(slider.noUiSlider.get()).toFixed();
						const marks = $(this.target).next().find('.mark-hide');

						marks.each((idx, el) => {
							const mark = $(el);
							mark.removeClass('mark-active');

							if (value == (idx + 1)) {
								mark.addClass('mark-active');
							}
						});
					});
				});

			},

			initSlickSlideTopBanner() {
				$('.slider').slick({
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: false,
					dots: false,
					fade: true,
					centerMode: false,
					pauseOnHover: false,
					pauseOnFocus: false,
					cssEase: 'linear',
					slickPause: false,
					infinite: true
				});
			},

			initSlickSlideInsuranceBanner() {
				$('.init-ins-slide').slick({
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: false,
					dots: false,
					fade: true,
					centerMode: false,
					pauseOnHover: false,
					pauseOnFocus: false,
					cssEase: 'linear',
					slickPause: false,
					infinite: true
				});
			},

			privatPersonPlaySlick(){
				$('.slider').slick("slickNext")
			},

			privatPersonPauseSlick(){
				$('.slider').slick("slickPause")
			},

			insurancePlaySlick(){
				$('.init-ins-slide').slick("slickNext")
			},

			insurancePauseSlick(){
				$('.init-ins-slide').slick("slickPause")
			},

			handlerHideUiSlide() {
				const $sectionSlide = $(".wrap-ui-section-slide")
				const $bannerImg = $(".item-img-banner")

				$btnSlide.on("click", function () {
					$sectionSlide.css("visibility", "visible");
					$btnSlide.addClass("hiden-btn");
					$bannerImg.addClass("active-height");
					$btnArrow.addClass("btn-hidden")
				})
			},

			initTypeItPlaginUa() {
				let $textCursor = new TypeIt("#typeItInit", {
					speed: 100,
					loop: true,
					cursorSpeed: 1250,
					startDelay: 0
				})
					.type('на даху', { speed: 100 })
					.exec(async () =>{
						fn.privatPersonPauseSlick()
					})
					.pause(2550)
					.delete(7)
					.exec(async () =>{
						fn.privatPersonPlaySlick()
					})
					.type('на землi', { speed: 100 })
					.exec(async () =>{
						fn.privatPersonPauseSlick()
					})
					.pause(2500)
					.delete(8)
					.exec(async () =>{
						fn.privatPersonPlaySlick()
					})
					.type("земля + дах", { speed: 100 })
					.exec(async () =>{
						fn.privatPersonPauseSlick()
					})
					.pause(2500)
					.delete(12)
					.exec(async () =>{
						fn.privatPersonPlaySlick()
					})
					.go();
			},

			initTypeItPlaginRu() {
				let $textCursor = new TypeIt("#typeItInit", {
					speed: 100,
					loop: true,
					cursorSpeed: 1250,
					startDelay: 0
				})
					.type('на крыше', { speed: 100 })
					.exec(async () =>{
						fn.privatPersonPauseSlick()
					})
					.pause(2550)
					.delete(8)
					.exec(async () =>{
						fn.privatPersonPlaySlick()
					})
					.type('на земле', { speed: 100 })
					.exec(async () =>{
						fn.privatPersonPauseSlick()
					})
					.pause(2500)
					.delete(8)
					.exec(async () =>{
						fn.privatPersonPlaySlick()
					})
					.type("земля + крыша", { speed: 100 })
					.exec(async () =>{
						fn.privatPersonPauseSlick()
					})
					.pause(2500)
					.delete(13)
					.exec(async () =>{
						fn.privatPersonPlaySlick()
					})
					.go();
				// $btnSlide.on("click",function() {
				// 	$textCursor.freeze();
				// });
			},

			initTypeItPlaginInsuranceUa() {
				let $textCursor = new TypeIt("#typeItInsuranceInit", {
					speed: 100,
					loop: true,
					cursorSpeed: 1250,
					startDelay: 0
				})
					.exec(async () =>{
						fn.insurancePlaySlick() // ------------
					})
					.type('пожежі', { speed: 100 })
					.exec(async () =>{
						fn.insurancePauseSlick() // ------------
					})
					.pause(2500)
					.delete(6)

					.exec(async () =>{
						fn.insurancePlaySlick() // ------------
					})
					.type("граду", { speed: 100 })
					.exec(async () =>{
						fn.insurancePauseSlick() // ------------
					})
					.pause(2500)
					.delete(5)

					.exec(async () =>{
						fn.insurancePlaySlick() // ------------
					})
					.type("вандалізму", { speed: 100 })
					.exec(async () =>{
						fn.insurancePauseSlick() // ------------
					})
					.pause(2500)
					.delete(10)

					.exec(async () =>{
						fn.insurancePlaySlick() // ------------
					})
					.type("крадіжки", { speed: 100 })
					.exec(async () =>{
						fn.insurancePauseSlick() // ------------
					})
					.pause(2500)
					.delete(8)

					.exec(async () =>{
						fn.insurancePlaySlick() // ------------
					})
					.type('урагану', { speed: 100 })
					.exec(async () =>{
						fn.insurancePauseSlick() // ------------
					})
					.pause(2550)
					.delete(7)
					.go();
			},

			initTypeItPlaginInsuranceRu() {
				let $textCursor = new TypeIt("#typeItInsuranceInit", {
					speed: 100,
					loop: true,
					cursorSpeed: 1250,
					startDelay: 0
				})
					.exec(async () =>{
						fn.insurancePlaySlick() // ------------
					})

					.type('пожара', { speed: 100 })
					.exec(async () =>{
						fn.insurancePauseSlick() // ------------
					})
					.pause(2500)
					.delete(6)

					.exec(async () =>{
						fn.insurancePlaySlick() // ------------
					})

					.type("града", { speed: 100 })
					.exec(async () =>{
						fn.insurancePauseSlick() // ------------
					})
					.pause(2500)
					.delete(5)

					.exec(async () =>{
						fn.insurancePlaySlick() // ------------
					})

					.type("вандализма", { speed: 100 })
					.exec(async () =>{
						fn.insurancePauseSlick() // ------------
					})
					.pause(2500)
					.delete(10)

					.exec(async () =>{
						fn.insurancePlaySlick() // ------------
					})
					.type("кражи", { speed: 100 })
					.exec(async () =>{
						fn.insurancePauseSlick() // ------------
					})
					.pause(2500)
					.delete(5)

					.exec(async () =>{
						fn.insurancePlaySlick() // ------------
					})
					.type('урагана', { speed: 100 })
					.exec(async () =>{
						fn.insurancePauseSlick() // ------------
					})
					.pause(2550)
					.delete(7)

					.go();
			},

			mouseOverSlide() {
				$flexSlide.mouseover(function () {
					$flexSlide.addClass("mouse-out-slide")
					$(this).removeClass("mouse-out-slide")
				})
				$flexSlide.mouseout(function () {
					$flexSlide.removeClass("mouse-out-slide")
				})
			},

			handlerActiveIcon() {
				const $modalImage = $(".modal-image")
				const $overlayModalImage = $(".modal-image .modal-overlay")
				const $srcModalImg = $modalImage.find("img")
				$graficIcon.on("click", function () {
					$modalImage.show()
					const $srcImg = $(this).attr("src")
					$srcModalImg.attr("src", $srcImg)
				})
				$overlayModalImage.on("click", function () {
					$modalImage.hide()
				})
			},

			initSlickSliderInObjectCompany() {
				$('.obj-slide').slick({
					slidesToShow: 1,
					slidesToScroll: 1,
					autoplay: true,
					pauseOnDotsHover: false,
					autoplaySpeed: 2000,
					dots: false,
					arrows: false,
					infinite: true
				});
			},

			handlerActivedPanelPopap() {

				// const $modalPannel = $(".modal-pannel")
				// const $modalOverlay = $(".overlay-modal-pannel")
				// const $overlayCloseBtn = $(".overlay-close-btn")
		
				// const $sunBlock = $(".pswp__img--placeholder")
				// const $test2 = $(".pswp__item pswp__img--placeholder")
				// const $test = $(".img-pannel-details")
				// $imgPanel.on("click", function () {
					// $modalPannel.show()
					
					// $sunBlock.hide()

					// $test2.hide()
					// const $btn = $(this)
					// const $findThisImg = $btn.find("img")
					// const $dataImg = $findThisImg.data("src")
					// const $modalImg = $(".body-modal-pannel img")
					// $modalImg.attr("src", $dataImg)
				// })


				// $modalOverlay.on("click", function () {
				// 	$modalPannel.hide()
				// })

				// $overlayCloseBtn.on("click", function () {
				// 	$modalPannel.hide()
				// })
			
			},

			activedPopapInfo() {
				const $popapRegion = $(".modal-popup-region")
				const $overlayRegion = $(".modal-popup-region__overlay")
				const $btnClose = $(".overlay-close-btn")

				const $spanRegion = $('.ess-section-suptitle span')
				const $regionTitle = $(".region-title")
				const $regionOutput = $(".region-popup-output")

				$elMap.on("click", function () {
					const $dataInfo = $(this).data("region")
					const $dataPower = $(this).data("power")

					$spanRegion.html($dataInfo)
					$regionTitle.html($dataInfo)
					$regionOutput.html($dataPower)
					$popapRegion.show()
				})
				$btnClose.on("click", function () {
					$popapRegion.hide()
				})
				$overlayRegion.on("click", function () {
					$popapRegion.hide()
				})

			},

			initMapContactPage() {
				initCommonMap();
			},

			isVisible(elem) {
				// let coords = elem.getBoundingClientRect();

				// let windowHeight = document.documentElement.clientHeight;

				// let topVisible = coords.top > 0 && coords.top < windowHeight;
				// let bottomVisible = coords.bottom < windowHeight && coords.bottom > 0;

				// return topVisible || bottomVisible;



				// function isVisibles(elem) {

				// 	let coords = elem.getBoundingClientRect();

				// 	let windowHeight = document.documentElement.clientHeight;

				// 	// верхний край элемента виден?
				// 	let topVisible = coords.top > 0 && coords.top < windowHeight;

				// 	// нижний край элемента виден?
				// 	let bottomVisible = coords.bottom < windowHeight && coords.bottom > 0;

				// 	return topVisible || bottomVisible;
				// }
				// function showVisibles() {
				// 	for (let img of document.querySelectorAll('img')) {
				// 		let realSrc = img.dataset.src;
				// 		if (!realSrc) continue;

				// 		if (isVisibles(img)) {
				// 			img.src = realSrc;
				// 			img.dataset.src = '';
				// 		}
				// 	}
				// }
				// isVisibles()
				// showVisibles();
				// window.onscroll = showVisible;

			},

			showVisible() {
				// for (let img of document.querySelectorAll('img')) {
				// 	let realSrc = img.dataset.src;
				// 	if (!realSrc) continue;

				// 	if (isVisible(img)) {
				// 		// отключение кеширования
				// 		// эта строка должна быть удалена в "боевом" коде
				// 		realSrc += '?nocache=' + Math.random();

				// 		img.src = realSrc;

				// 		img.dataset.src = '';
				// 	}
				// }
				// window.addEventListener('scroll', showVisible);
				// showVisible();
			},

			initSlickSlideManufacture() {
				$iconSlide.slick({
					slidesToShow: 2,
					slidesToScroll: 1,
					dots: false,
					arrows: false,
					infinite: true,
					centerMode: false,
					autoplay: true,
					autoplaySpeed: 2000,
				});
			},

			handlerActivedInputForms() {
				$inputForm.on("click", function () {
					$inputForm.removeClass("active__input")
					$(this).addClass("active__input")
				})
				$inputForm.blur(function () {
					$inputForm.removeClass("active__input")
				})
			},

			initSlickSliderKness() {
				$('.kness-slider-for').slick({
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: true,
					fade: true,
					asNavFor: '.kness-slider-nav',
					prevArrow: $('.knes-prev'),
					nextArrow: $('.knes-next')
				});
				$('.kness-slider-nav').slick({
					slidesToShow: 2,
					slidesToScroll: 1,
					asNavFor: '.kness-slider-for',
					dots: false,
					centerMode: true,
					focusOnSelect: true,

				});
			},

			handlerDisabledModalBtn() {
				const $inputChecked = $(".input-checkbox")
				$inputChecked.on("click", function () {
					let $thisInput = $(this).find("input[type=checkbox]")
					const $thisModal = $thisInput.closest(".ess-modal")
					const $thisWrapBtn = $thisModal.find(".submit-modal-form")
					const $thisBtn = $thisModal.find(".submit-modal-form button")
					if ($thisInput.prop('checked')) {
						$thisWrapBtn.removeClass("disabled")
						$thisBtn.attr("disabled", false)
					} else {
						$thisWrapBtn.addClass("disabled")
						$thisBtn.attr("disabled", true)
					}
				})
			},

			scrollScreenOnClick(){
				if(document.documentElement.clientWidth > 1169){
					var height = $(window).height();
					$('.top-section__arrow-down').on('click',function(){
						$('html, body').animate({scrollTop: height},500);
						return false;
					})
				}
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
				const moneyInSec = 0.008 * 100; // coins	
				const now = new Date();
				const timeEnd = new Date(2030, 0);

				let leftTimeInSeconds = Math.floor((timeEnd - now) / 1000);

				// console.log('leftTimeInSeconds', leftTimeInSeconds);
				
				let incomeMoneyLeft = Math.floor(leftTimeInSeconds * moneyInSec);

				// console.log('incomeMoneyLeft', incomeMoneyLeft);

				$benefitTitle.html( fn.formatIncomeMoney(incomeMoneyLeft) + ' ₴*' );
			},

			slickSliderSunpowerPerformancePanel(){
				$('.sketch-performance-for').slick({
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: true,
					fade: true,
					asNavFor: '.sketch-performance-nav',
					prevArrow: $('.s-performance-prev'),
					nextArrow: $('.s-performance-next')
				});
				$('.sketch-performance-nav').slick({
					slidesToShow: 2,
					slidesToScroll: 1,
					asNavFor: '.sketch-performance-for',
					arrows: false,
					dots: false,
					infinite: true,
					centerMode: false,
					variableWidth: true,
					focusOnSelect: true
				});
			},

			slickSliderSunpowerMaxeonPanel(){
				$('.sketch-maxeon-for').slick({
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: true,
					fade: true,
					asNavFor: '.sketch-maxeon-nav',
					prevArrow: $('.s-maxeon-prev'),
					nextArrow: $('.s-maxeon-next')
				});
				$('.sketch-maxeon-nav').slick({
					slidesToShow: 2,
					slidesToScroll: 1,
					asNavFor: '.sketch-maxeon-for',
					arrows: false,
					dots: false,
					infinite: true,
					centerMode: false,
					variableWidth: true,
					focusOnSelect: true
				});
			},

			initReviewsTextSlide() {
				$('.init-text-slide').slick({
					dots: false,
					infinite: true,
					speed: 300,
					slidesToShow: 1,
					slidesToScroll: 1,
					adaptiveHeight: false,
					autoplay: false,
					arrows: true,
					prevArrow: $('.text-prev'),
					nextArrow: $('.text-next'),

					responsive: [
						{
						  breakpoint: 1170,
						  settings: {
							arrows: false,
							autoplay: true,
							autoplaySpeed: 2000,
						  }
						},
						
					]
				});
			},

			initReviewsVideoSlide() {
				//start the slider
				$('.init-video-slider').slick({
					dots: false,
					infinite: true,
					speed: 500,
					slidesToShow: 1,
					slidesToScroll: 1,
					adaptiveHeight: false,
					// centerPadding: '30px',
					autoplay: false,
					centerMode: true,

					arrows: true,
					prevArrow: $('.video-prev'),
					nextArrow: $('.video-next'),
					variableWidth: true,
    			variableHeight: true,

					responsive: [
						{
						  breakpoint: 1170,
						  settings: {
							// arrows: false,
							centerMode: false,
       
							dots: true,
							slidesToShow: 1,
							slidesToScroll: 1,
							speed: 500,
							infinite: true,
						  }
						}
						
					]
				});
			},

			initReviewsMessageSlide() {
				$('.init-message-slide').slick({
					dots: false,
					infinite: true,
					speed: 300,
					slidesToShow: 6,
					slidesToScroll: 1,
					adaptiveHeight: true,
					autoplay: false,
					arrows: true,
					prevArrow: $('.m-prev'),
					nextArrow: $('.m-next'),

					responsive: [
						{
						  breakpoint: 1170,
						  settings: {
							arrows: false,
							dots: true,
							autoplay: true,
							autoplaySpeed: 3000,
							slidesToShow: 1,
					        slidesToScroll: 1,
						  }
						},
						
					]
				});
			},

			activedPopapImgSlide() {
				$(".init-message-slide").slickLightbox({
					slick: {
					  itemSelector: "a",
					  navigateByKeyboard: true,
					  dots: true,
					  infinite: true,
					  slidesToShow: 1,
					  slidesToScroll: 1,
					  mobileFirst: true,
					  enabled: true,
					},
				  });
			},

			initSopSlideSunport() {
				$('.init-top-slide-sunport').slick({
					dots: false,
					infinite: true,
					speed: 300,
					slidesToShow: 1,
					slidesToScroll: 1,
					adaptiveHeight: true,
					autoplay: false,
					arrows: true,
					prevArrow: $('.top-sunport-prev'),
					nextArrow: $('.top-sunport-next'),

					responsive: [
						{
						  breakpoint: 1170,
						  settings: {
							arrows: false,
							autoplay: true,
							autoplaySpeed: 3000,
							dots: true
						  }
						},
						
					]
				});
			},

			initBottomSlideSunport() {
				$('.init-bottom-slide-sunport').slick({
					dots: false,
					infinite: true,
					speed: 300,
					slidesToShow: 1,
					slidesToScroll: 1,
					adaptiveHeight: true,
					autoplay: false,
					arrows: true,
					prevArrow: $('.sunport-bottom-slide-prev'),
					nextArrow: $('.sunport-bottom-slide-next'),

					responsive: [
						{
						  breakpoint: 1170,
						  settings: {
							arrows: false,
							autoplay: true,
							autoplaySpeed: 3000,
							dots: true
						  }
						},
						
					]
				});
			},

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

			acrivedScrollCompanyForm() {
				if (!$btnScroll.length) return;

				function scrollToSection(section) {
					$([document.documentElement, document.body]).animate({
						scrollTop: section.offset().top
					}, 2000);
				};
				const $formCompany = $(".bottom-flex-conteiner");

				$btnScroll.each(function() {
					$btnScroll.on("click", () => scrollToSection($formCompany));
				});

			},
		
			domReady() {

				if ( $gallaryWorkIn.length )
					fn.initPhotoSwipeFromDOM('.worksIn-slider');

				if ($(".sunport-first-slide-panel ").length ) {
					fn.initSopSlideSunport()
					fn.initBottomSlideSunport()
				}

				if ($(".contentWrapper").length) {
					fn.logoScroll();
				}

				if ($(".person-top-banner").length || $topSection.length || $insuranceTopSection.length) {
					fn.scrollScreenOnClick();
				}

				if ($menuBtn.length) {
					fn.menuButton();
				}


				if ($langHeaderUa.length) {
					fn.handlerActiveLang();
				}

				if ($modalBlock.length) {
					fn.handlerModalActive();
				}

				if ($inputItem.length) {
					fn.handlePlaceholderInp();
				}

				if ($slick.length) {
					fn.slickSlider();
				}

				if ($sketch.length) {
					fn.sketchSliderKness();
				}

				if ($('.sunpowerPage')) {
					fn.sketchSliderSanpowerTop()
					fn.sketchSliderSanpowerBottom()
				}
				// if ( $sketch1.length ){
				// 	fn.slickSliderKness1();
				// }

				// if ( $sketch2.length ){
				// 	fn.slickSliderKness2();
				// }

				// if ( $sketch3.length ){
				// 	fn.slickSliderKness3();
				// }

				if ($sliderUi1.length) {
					// fn.initNoUiSlideTop();
					fn.initNoUiSlideBottom4();
				}

				if ($sliderUi2.length) {
					fn.initNoUiSlideBottom3();
				}

				if ($sliderUi3.length) {
					fn.initNoUiSlideBottom();
				}

				if ($sliderUi4.length) {
					fn.initNoUiSlideBottomKness();
				}

				if ($sliderUi5.length) {
					fn.initNoUiSlideBottomKness()
				}

				if ($sliderUi6.length) {
					fn.initNoUiSlideBottomKness()
				}

				if ($btnSlide.length) {
					fn.initNoUiSlideTop();
				}

				if ($personTopBanner.length) {
					fn.initSlickSlideTopBanner();
				}

				if ($personTopBanner.length) {
					fn.handlerHideUiSlide();
				}

				if ($pageUa.length) {
					fn.initTypeItPlaginUa();
				}

				if ($pageRu.length) {
					fn.initTypeItPlaginRu();
				}

				if ($graficIcon.length) {
					fn.handlerActiveIcon();
				}

				if (document.documentElement.clientWidth < 1169 && $objSlide.length) {
					fn.initSlickSliderInObjectCompany();
				}

				if (document.documentElement.clientWidth > 1169 && $flexSlide.length) {
					fn.mouseOverSlide();
				}

				// if ($slideEcoGrafic.length) {
				// 	fn.economicFormInitSlide();
				// }

				if ($imgPanel.length) {
					fn.handlerActivedPanelPopap();
				}

				if ($sunCount.length) {
					fn.initNoUiSlideBottomSunPage();
				}

				if ($elMap.length) {
					fn.activedPopapInfo();
				}

				if ($mapSection.length) {
					fn.initMapContactPage();
				}

				if ($body.length) {
					// fn.isVisible();
					// fn.showVisible();
				}

				if ($iconSlide.length && document.documentElement.clientWidth < 1239) {
					fn.initSlickSlideManufacture();
				}

				if ($inputForm.length) {
					fn.handlerActivedInputForms()
				}

				if ($(".knessPage").length) {
					fn.initSlickSliderKness()
				}
			
				// if ($patternClass.length ){
				// 	fn.handlerLazyLoadingImg()
				// }

				if ($essModal.length) {
					fn.handlerDisabledModalBtn()
				}

				if ($sketchPerformance.length) {
					fn.slickSliderSunpowerPerformancePanel()
				}

				if ($sketchMaxeon.length) {
					fn.slickSliderSunpowerMaxeonPanel()
				}

				if ( $benefitTitle.length )
					setInterval(() => fn.updateIncomeMoney(), 1000);

				if ($reviewsTextSlide.length) {
					fn.initReviewsTextSlide()
				}	
				
				if ($reviewsVideoSlide.length) {
					fn.initReviewsVideoSlide()
				}	

				if ($reviewsMessageSlide.length) {
					fn.initReviewsMessageSlide()
					fn.activedPopapImgSlide()
				}	
				
				if ($(".insurance-slide-wrapper").length) {
					fn.initSlickSlideInsuranceBanner();
				}

				if ($insurancePageRu.length) {
					fn.initTypeItPlaginInsuranceRu();
				}
				
				if ($insurancePageUa.length) {
					fn.initTypeItPlaginInsuranceUa();
				}

				if ($(".sunportPage").length) {
					fn.handlerModalVideoPopap();
				}
				
				if ($(".companyPage").length) {
					fn.acrivedScrollCompanyForm();
				}

				
				
			}
		}

		dom.addEventListener("DOMContentLoaded", fn.domReady());

		return fn;

	})();



});

// -------------------------


window.onload = function () {
	// ------------------
	(function () {
		/*const scrollTopContainerHTML = 
			`<div class="relative js_scrollTopContainer">
				<div id="scrollTopButton" class="icomoon icon-arrow navigateIcon">
					<img src="./img/arrow-orange.svg" alt="">
				</div>
			</div>`;*/

		// const fullPageNavHTML = `<div id="fullPageNav" class="full-page-nav"></div>`;

		// const $scrollTopContainer = $(scrollTopContainerHTML).appendTo('.mainWrapper');
		// let moveTimer = null;

		const $scrollTopButton = $('#scrollTopButton');
		const $sideNavMenu = $('.mainHeader .nav');

		const $fullPageNav = $('#fullPageNav');
		const $fullPageNavSidebar = $('#fullPageNavSidebar');

		const fn = {
			toggleScrollTopButton({ topPage, activeSectionIndex }) {
				if ($scrollTopButton.length) {
					// console.log(activeSectionIndex)
					if (activeSectionIndex != undefined) {
						if (+activeSectionIndex > 0) {
							$scrollTopButton.addClass('js_visible');
						} else {
							$scrollTopButton.removeClass('js_visible');
						}
					}
					if (topPage != undefined) {
						if (topPage > 600) {
							$scrollTopButton.addClass('js_visible');
						} else {
							$scrollTopButton.removeClass('js_visible');
						}
					}
				}
			},

			/* toggleScrollTopButton({ topPage }) {
				// if ($scrollTopButton.length) {
				// console.log(activeSectionIndex)
				if (topPage > 600) {
					$scrollTopButton.addClass('js_visible');
				} else {
					$scrollTopButton.removeClass('js_visible');
				}
				// }
			}, */

			toggleFullPageNav(activeSectionIndex) {
				if ($fullPageNav.length) {
					localStorage.setItem('full_page_active_index', activeSectionIndex);
					const $navButtons = $fullPageNav.children();

					if ($navButtons && $navButtons[activeSectionIndex]) {
						for (let i = 0; i < $navButtons.length; i++) {
							$($navButtons[i]).removeClass('active');
						}
						$($navButtons[activeSectionIndex]).addClass('active');
					}
				}
			},

			toggleFullPageNavSidebar({ right, topPage }) {
				const isShow = $fullPageNavSidebar.hasClass('js_open');
				// console.log(right, topPage)
				if (right < 10 && topPage > 99) {
					if (!isShow) {
						$fullPageNavSidebar.addClass('js_open');
					}
				} else if (right > 101 && isShow) {
					$fullPageNavSidebar.removeClass('js_open');
				}
			},

			createFullPageNav(sectionsQuantity) {
				if ($fullPageNav.length && sectionsQuantity > 0) {

					for (let i = 0; i < sectionsQuantity; i++) {
						const navItem = `<div class="nav-item" data-index="${i}"><div></div></div>`;
						$(navItem).appendTo($fullPageNav);
					}
				}
			},

			initFullPageNavSidebar(sectionsQuantity) {
				if (sectionsQuantity > 0) {
					$fullPageNavSidebar.removeClass('js_hide_buttons');
				}
			},

			handleMousemove(e) {
				e.stopPropagation();
				// if (moveTimer) { clearTimeout(moveTimer); }

				// moveTimer = setTimeout(() => {
				// moveTimer = null;
				// console.log(e.arget)
				// const { right } = fn.getDistanceFromEdge(e);
				if ($sideNavMenu && $sideNavMenu.hasClass('nav-open')) return;
				fn.toggleFullPageNavSidebar(fn.getDistanceFromEdge(e));
				// console.log('scroll', this)
				// }, 20);
			},

			getDistanceFromEdge({ clientX, clientY, pageY }) {
				return {
					// top: clientY,
					topPage: pageY || window.pageYOffset || document.documentElement.scrollTop,
					// left: clientX,
					right: document.documentElement.clientWidth - clientX
				};
			}
		}

		if (document.documentElement.clientWidth > 1240 /*&& document.getElementById("homePage")*/) {
			var scrollBySection = new myFullpage('.mainWrapper');

			scrollBySection.init({
				sectionsQuerrySelector: '.section',
				scrollByWheel: true,
				onInit: ({ prevIndex, sectionsQuantity }) => {
					fn.toggleScrollTopButton({ activeSectionIndex: prevIndex });
					fn.createFullPageNav(sectionsQuantity);
					fn.toggleFullPageNav(prevIndex);
					scrollBySection.moveTo({ to: prevIndex })
					// fn.initFullPageNavSidebar(sectionsQuantity);
				},

			});

			// scrollBySection.on('init', ;
			scrollBySection.on('changeSection', ({ nextIndex }) => {
				fn.toggleScrollTopButton({ activeSectionIndex: nextIndex });
				fn.toggleFullPageNav(nextIndex);
			});
			scrollBySection.on('scrollEvt', ({ prevIndex }) => {
				fn.toggleScrollTopButton({ activeSectionIndex: prevIndex });
				fn.toggleFullPageNav(prevIndex);
			});



			if ($fullPageNav.length) {
				$fullPageNav.on('click', 'div', function () {
					const index = this.dataset.index;
					scrollBySection.moveTo({ to: index });
				})
			}

			if ($scrollTopButton.length) {
				$scrollTopButton.on('click', function () {
					scrollBySection.moveTo({ to: 0 });
				})
			}

			/* if ($fullPageNavSidebar.length) {
				$fullPageNavSidebar.on('click', '.navigateIcon', function () {
					if (!$fullPageNavSidebar.hasClass('js_hide_buttons')) {
						const { direction, index } = this.dataset;
						let payload = {};
						if (direction) payload.direction = +direction;
						if (index) payload.to = +index;
						scrollBySection.moveTo(payload);
					} else {
						$('html, body').animate({
							scrollTop: $('body').offset().top
						}, 500);
					}
				})
			} */

			// window.onmousemove = fn.handleMousemove;
		} else {

			let scrollTimer = null;

			if ($scrollTopButton.length) {
				fn.toggleScrollTopButton(fn.getDistanceFromEdge({}));

				window.onscroll = function () {
					if (scrollTimer) { clearTimeout(scrollTimer); }

					scrollTimer = setTimeout(() => {
						scrollTimer = null;

						fn.toggleScrollTopButton(fn.getDistanceFromEdge({}));
					}, 50);
				}

				// -----------------

				$scrollTopButton.on('click', function () {
					$('html, body').animate({
						scrollTop: $('body').offset().top
					}, 500);
				})
			}

		}

		// console.log($scrollTopButton)

		function isVisible(elem) {

			let coords = elem.getBoundingClientRect();

			let windowHeight = document.documentElement.clientHeight;

			// видны верхний ИЛИ нижний край элемента
			let topVisible = coords.top > 0 && coords.top < windowHeight;
			let bottomVisible = coords.bottom < windowHeight && coords.bottom > 0;

			return topVisible || bottomVisible;
		}

		function showVisible() {
			// let fakeEl = document.getElementById("fake-el")

			for (let img of document.querySelectorAll('img.pattern')) {
				// let fakeImg = document.createElement("img")
				// fakeEl.appendChild(img)
				// let arrayImg = new Array(fakeEl)
				// console.log(arrayImg);
				// arrayImg.appendChild(img)

				let realSrc = img.dataset.src;

				if (!realSrc) continue;

				if (isVisible(img)) {

					// img.classList.add("img-show__js");
					// отключение кеширования
					// эта строка должна быть удалена в "боевом" коде
					realSrc += '?nocache=' + Math.random();

					img.classList.add("set-src_js");
					img.src = realSrc;
					img.dataset.src = '';
					img.classList.remove("pattern");
					// const $imgClass = $(".img-show__js")

					// setTimeout(addingClass, 5000)
				}
			}
		}


		showVisible();
	})();
	// ------------------

	(function handlerLazyLoadingImg() {
		let lazyLoadImg = document.getElementsByClassName("lazyLoading_js")
		for (var i = 0; i < lazyLoadImg.length; i++) {
			// console.log(lazyLoadImg)
			// if (lazyLoadImg[i].classList.contains('inlineImg')) {
			let element = lazyLoadImg[i];
			let img;

			if (element.tagName !== 'IMG') {
				img = new Image();
			} else {
				img = element;
			}

			if (img.complete == true){
			var pattern =	element.closest(".pattern")
				if (pattern) {
					pattern.classList.remove("pattern")
					// console.log("if classList");
				}
		  } else {
				img.onload = function (event) {
					event.target.closest(".pattern").classList.remove("pattern")
					// console.log("if onload");
				}
			}

		}
	})();

	function handlerAutoChangeRef() {

		const $tgLinks = $(".tg_link");
		$tgLinks.each( function() {
			if (document.documentElement.clientWidth < 768) {
				// $(this).attr("href", "tg://resolve?domain=@ESS_Ukraine")
				$(this).attr("href", "https://t.me/ESS_Ukraine");
			}else if (document.documentElement.clientWidth > 768) {
				$(this).attr("href", "https://t.me/ESS_Ukraine");
			} else {
				return;
			}
		});
		
	}
	handlerAutoChangeRef();

}
