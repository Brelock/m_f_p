let status = "JS - OK!";

let site = null;
// =================
// @@include('frames/globalFunctions.js')
// ===============
document.addEventListener("DOMContentLoaded", function(event) { 
    if (  !document.getElementsByTagName("body")) {console.log('js error')} 
    
	// console.log('document ready')
	// if (document.documentElement.clientWidth > 991 ) {}
	
	// =================Include Modules==============================

	  /*@@include('frames/modal.js')*/
	  

	site = (function() {

		const win = window,
			  dom = document,
			  body = document.body,
			  app = {},
			  $navList = $(".navbar-nav"),
				$item = $navList.find(".item-list")

		const fn = {

			handlerActivedHumburger() {
				$('.hamburger').on('click', function() {
					$(this).toggleClass('is-active');
					$('.menu-wrapper').toggleClass('fixed_js');
					$(".nav-menu").toggleClass('active');
				})
			},

			addMobileClass() {
				$item.removeClass("item_desktop")
				$item.addClass("item_mobile")
			},

			addDesktopClass() {
				$item.addClass("item_desktop")
				$item.removeClass("item_mobile")
			},

			handlerShowDropdowdMenu() {
				$(".item-list").unbind('mouseenter mouseleave');
				$(".item-list").unbind();
				if ($(".item-list").hasClass("item_desktop")){
					$('.item_desktop').each(function(){
						$(this).find(".dropdown-menu").slideUp(300)
						$(".item-list").removeClass('active_js');
						$(".item-list").find('.icon-down-arrow').removeClass('up-arrow');
								var t = null;
						var li = $(this)
						li.hover(function(){
							t = setTimeout(function(){
								li.find(".dropdown-menu").slideDown(300);
								t = null;
							}, 100);
						}, function(){
							if (t){
								clearTimeout(t);
								t = null;
							}
							else
								li.find(".dropdown-menu").slideUp(300);
						});
					});
				} else if ($(".item-list").hasClass("item_mobile")) {
					$(".item-list").unbind('mouseenter mouseleave');
					$(".item-list").unbind();
						$(".item_mobile").on('click', function() {
							if ($(this).hasClass("event-pr")) return;
							$(this).find('.icon-down-arrow').toggleClass('up-arrow');
							$(this).toggleClass('active_js')
							$(this).find(".dropdown-menu").toggle(200)
						}); 
				}
			},

			handlerActivedLang() {
				$('.lang-wrap li').on('click', function() {
					$('.lang-wrap li').removeClass('active');
					if ($(this).hasClass("active")) {
						$(this).removeClass('active');
					} else {
						$(this).addClass('active');
					}
				})
			},

			activedFixedHeader() {			
				let top = 0;	
				var clientWidth = document.documentElement.clientWidth;

				if (clientWidth > 980) {
				 	top = 120
				} else if (clientWidth < 980) {
					top = 0
				}

				var scrollTop = $(window).scrollTop();
				const $iconScrollLogo = $(".nav-header")
				const $mainHeader = $(".mainHeader")

				if(scrollTop > top){
					$iconScrollLogo.addClass("js_fixed")
					$mainHeader.addClass("js_fixed__flexed")
				} 

				$(window).scroll(function() {
						if($(window).scrollTop() > scrollTop){
							$iconScrollLogo.addClass("js_fixed")
							$mainHeader.addClass("js_fixed__flexed")
							scrollTop = $(window).scrollTop();
						} 
						if($(window).scrollTop() < top){
							$iconScrollLogo.removeClass("js_fixed")
							$mainHeader.removeClass("js_fixed__flexed")
							scrollTop = $(window).scrollTop();
						}
				});

			},

			slickSlider() {
				$('.init-slick0slider').slick({
					slidesToShow: 1,
					slidesToScroll: 1,
					autoplay: true,
					autoplaySpeed: 3000,
					arrows: false,
					fade: true,
					infinite: true,
					centerMode: true,
					draggable: false,
					pauseOnHover: false,
					pauseOnFocus: false,
					touchMove: false
				});
			},

			domReady() {
				fn.handlerActivedHumburger()
				fn.handlerActivedLang()	

				if ($('.nav-header').length) 
					fn.activedFixedHeader()

				if ($(".init-slick0slider").length)
					fn.slickSlider()

			}
		}
		
		dom.addEventListener("DOMContentLoaded", fn.domReady()) ;
	
		return fn;
	
	  })();

});


window.addEventListener("resize", function() {
	if (document.documentElement.clientWidth > 980) {
		site.addDesktopClass()
		site.handlerShowDropdowdMenu()
	} else { 
		site.addMobileClass()
		site.handlerShowDropdowdMenu()
	} 
});

window.onload = function() {

	if (document.documentElement.clientWidth > 980) {
		site.addDesktopClass()
		site.handlerShowDropdowdMenu()
	} else {
		site.addMobileClass()
		site.handlerShowDropdowdMenu()
	}

	var supportsES6 = (function () {
    try {
      new Function("(a = 0) => a");
      return true;
    } catch (err) {
      return false;
    }
  })();

	var StickyHeader = (function (window, document) {
		// version 3.2 - MJF @ websemantics.uk 2019

		"use strict";
		if (!supportsES6) return false;

		const config = {
			stickyID: "sticky_header",
			hiddenClass: "sticky_header-hidden",
			downTolerance: 8, // Amount of downward movement before header is hidden
		};

		const header = document.getElementById(config.stickyID);
		if (!header) return false;

		let hasScrolled = false;
		let lastScrollTop = 0;

		const _redraw = (_) => {
			const pageY = window.scrollY;

			if (pageY > lastScrollTop + config.downTolerance) {
				header.classList.add(config.hiddenClass);
			}

			if (pageY < lastScrollTop || pageY <= 0) {
				header.classList.remove(config.hiddenClass);
			}

			lastScrollTop = pageY;
			hasScrolled = false;
		};

		const _onScroll = (_) => {
			if (!hasScrolled) {
				window.requestAnimationFrame(_redraw);
			}
			hasScrolled = true;
			window.requestAnimationFrame(_onScroll);
		};

		_onScroll();
	})(window, document);

}
