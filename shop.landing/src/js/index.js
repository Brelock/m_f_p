let status = "JS - OK!";
// -----
var site = null;
// -----
// =================
// @@include('frames/globalFunctions.js')
// ===============

$(document).ready(function () {
  if (!$("body")) {
    console.log("jQuery Error");
  }
  // console.log('document ready')
  // console.log(dropDown)
  // =================Include Modules==============================
  // console.log(test);

  // if (document.documentElement.clientWidth > 991 ) {}

  site = (function(window, document, $) {  

    const $win = $(window),
	  	    $dom = $(document),
	  	    $body = jQuery(document.body),
          app = {},
          // button menu
          $menuBtn = $(".menu-btn"),
          $nav = $(".nav"),
          $lineOne = $(".nav .menu-btn .line--1"),
          $lineTwo = $(".nav .menu-btn .line--2"),
          $lineThree = $(".nav .menu-btn .line--3"),
          $link = $(".nav .nav-links"),
          // modern block
          $controlSystemItem = $(".control-system_item"),
          // popular=questins
          $popularQuestionsItem = $(".popular-questions_item"),
          // animate
          $btnArrowDown = $('.arrow--animate'),
          /* for tel mask */
					$inputsTypeTel = $('input[type=tel]'),

          $scrollTopButton = $('.scrollTop'),
          // modal 
          $overlayModal = $(".shop-modal")

    const fn = {
      
      handlerHideModals() {
        $(".modal-overlay").on("click", function () {
          $(this).closest(".shop-modal").hide()
        });

        $(".modal-close__btn").on("click", function () {
          $(this).closest(".shop-modal").hide()
        });
      },

      handlerShowModals() {
        $(".contentWrapper button.button").on("click", function () {
          $overlayModal.show()
        });
      },

    

    toggleScrollTopButton() {
      $scrollTopButton.on("click", function() {
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
      });
		},

    handlerTopScrollVisible() {
      var scrollTop = $(window).scrollTop();

      if(scrollTop > 300){
        $scrollTopButton.addClass("active_scroll")
      } 

      $(window).scroll(function() {
        if($(window).scrollTop() > scrollTop){
          $scrollTopButton.addClass("active_scroll")
          scrollTop = $(window).scrollTop();
        } 
        if($(window).scrollTop() < 300){
          $scrollTopButton.removeClass("active_scroll")
          scrollTop = $(window).scrollTop();
        }
    });

    },

    handlerShowMobileNav() {
      const $logoBox = $(".logo-block");

      $nav.toggleClass("nav-open");
      $lineOne.toggleClass("line-cross");
      $lineTwo.toggleClass("line-fade-out");
      $lineThree.toggleClass("line-cross");
      $link.toggleClass("fade-in");
      $logoBox.toggleClass("fixed_logo")
    },

    handlerVisiblityContent () {
      const $modernSection = $(".modern-section-container");
      const $modernSectionImem = $(".modern-section_item");

      function setActiveClass() {  
        const $btn = $(this);
        const $sectionClick = $btn.closest($modernSection);
        $modernSection.removeClass("active");
        $sectionClick.addClass("active");
      }
      
      $modernSectionImem.on("click", setActiveClass)
    },

    handlerVisibleImgSector(el) {
      $controlSystemItem.removeClass("active")
      $(el).toggleClass("active")
    },

    handleAddClassActive() {
      $controlSystemItem.on("click", function() {
        fn.handlerVisibleImgSector(this)
      })
    },

    handleAddClassActiveMouseover() {
      $controlSystemItem.each(function(){
        var t = null;
        var li = $(this)
        li.hover(function(){
          t = setTimeout(function(){
            fn.handlerVisibleImgSector(li) 
            t = null;
          }, 200);
        }, function(){
          if (t){
            clearTimeout(t);
            t = null;
          }
          else
          fn.handlerVisibleImgSector(li) 
        });
      });
    },
   
    handlerAddClassQuestionsItem() {
      $popularQuestionsItem.on("click", function () {  
        $popularQuestionsItem.removeClass("active")
        const $thisActiveItem = $(this).addClass("active")
        $thisActiveItem.on("click", function () {  
          $(this).toggleClass("active")
        })
      })    
    },

    handlerScrollPage() {
      $(document).on('scroll', function() {
        $('.visibility--check').each(function() {
          const $self = $(this);
          const  $height = $self.offset().top;
          if ($(document).scrollTop() + $(window).height() >= $height) {
            $self.addClass('scroll--active')
          }
        });
      });
    },

    initScreenSlideDown() {
      if(document.documentElement.clientWidth > 1169){
        var height = $(window).height();
        $('.arrow--animate').on('click',function(){
          $('html, body').animate({scrollTop: height},500);
          return false;
        })
      }
    },

    initTelMask() {
      $inputsTypeTel.each((idx, inp) => {
        new Cleave(inp, {
          prefix: '+380',
          numericOnly: true,
          blocks: [4, 2, 2, 2, 3],
          delimiters: [" ", " ", " "],
        });
      });
    },

    initScroll() {

      function scrollToSection(section) {
        $([document.documentElement, document.body]).animate({
            scrollTop: section.offset().top
        }, 2000);
      };

      const $prodSection = $(".advantages-block"),
            $advantageSection = $(".section-advantages-works"),
            $priceSection = $(".section-advantages_one-price"),
            $aboutSection = $(".section-advantages_control-system"),
            $contactSection = $(".section-contact-form"),
            // -------------
            $prodLink = $(".product-link"),
            $advantageLink = $(".advantage-link"),
            $priceLink = $(".price-link"),
            $aboutLink = $(".about-link"),
            $contactLink = $(".contact-link"),
            // -------------
            $itemList = $(".item-list li")
            // -------------
            $prodLink.on("click", () => scrollToSection($prodSection));
            $advantageLink.on("click", () => scrollToSection($advantageSection));
            $priceLink.on("click", () => scrollToSection($priceSection));
            $aboutLink.on("click", () => scrollToSection($aboutSection));
            $contactLink.on("click", () => scrollToSection($contactSection));

            let windowWidth = document.documentElement.clientWidth

            if (windowWidth < 1170) {
              $menuBtn.on("click", fn.handlerShowMobileNav);
              $itemList.on("click", fn.handlerShowMobileNav); 
            } 
    },

    domReady(){
      fn.handlerHideModals()
      fn.handlerShowModals()

      if ($(".contentWrapper").length) {
        fn.toggleScrollTopButton();
        fn.handlerTopScrollVisible()
      }

      if ($(".modern-section-container").length) 
        fn.handlerVisiblityContent () 

      if ($controlSystemItem.length) 
        fn.handleAddClassActive();

      if ($controlSystemItem.length && document.documentElement.clientWidth > 1169) 
        fn.handleAddClassActiveMouseover();
     
      if ($popularQuestionsItem.length) 
        fn.handlerAddClassQuestionsItem();

      if ($(".advantages-block").length) 
        fn.handlerScrollPage();

      if ($btnArrowDown.length) 
        fn.initScreenSlideDown()

      if ( $inputsTypeTel.length ) 
        fn.initTelMask();

      if ($('.nav-links')) {
        fn.initScroll() 
      }
    }

  }      
      
   $dom.ready(fn.domReady);

   return fn;

  })(window,document,jQuery);

});

window.onload = () => {

  let windowWidth = document.documentElement.clientWidth
  let setOffset = 10;

  if (windowWidth < 768) {
    setOffset = 50;
  } else if (windowWidth < 1400) {
    setOffset = 75;
  } else if (windowWidth > 1400) {
    setOffset = 100;
  }

  function visibilityContent() {  
    $('.visible-viewportchecker').addClass('hidden').viewportChecker({
      classToAdd: 'visible',
      offset: setOffset,
    });
  }

  visibilityContent()
};
