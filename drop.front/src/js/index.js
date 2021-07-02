let status = "JS - OK!";
let site = null;
function cl(arg1, arg2, arg3, arg4) {
  console.log(arg1, arg2 || "", arg3 || "", arg4 || "");
  return "-";
}

var glob = {
  navMenuWrapper: null,
  navMenu: null,
  pageOverlay: null,

  scrollTopButton: null,
};

@@include("frames/AccordionModule.js");
// =================
@@include("frames/globalFunctions.js");
// ===============

var test = "include js error";

// import { dropDown } from './frames/globalFunctions'

$(document).ready(function () {
  // console.log("document ready");
  // console.log(dropDown)
  // =================Include Modules==============================

  @@include("testModule.js");

  // =============================================================
  glob.navMenuWrapper = document.getElementById("navMenuWrapper");
  glob.navMenu = document.getElementById("navMenu");
  glob.pageOverlay = document.getElementById("pageOverlay");

  if (!$("body")) {
    console.log("jQuery Error");
  }

  $(".dropdownButton").on("click", function () {
    globFunc.toggleButtonContent(this);
    globFunc.dropDown(this, glob.navMenuWrapper);
  });

  // ---------Popups Block-------

  $("body").on("click", ".searchButton", function () {
    // e.preventDefault();
    let modal = $("#popupSearch");
    if (modal.length) {
      glob.PopupModule.openPopup(modal, "js_openPopup_search");
    }
  });

  $("body").on("click", ".button", function () {
    let modal = document.getElementById("id");
    if (modal) {
      glob.PopupModule.openPopup(modal);
    }
  });

  // ---------Text Limit-------

  $(".description .ellipsis").dotdotdot({
    height: 80,
    truncate: "word",
    watch: true,
  });
  $(".title.ellipsis").dotdotdot({ height: 85, truncate: "word", watch: true });

  // ---------Clean empty Tags-----
  var textBlocks = document.querySelectorAll(".description > p");

  if (textBlocks.length) {
    for (var i = 0; i < textBlocks.length; i++) {
      textBlocks[i].innerHTML
        ? null
        : textBlocks[i].parentElement.removeChild(textBlocks[i]);
    }
  }

  $(".accordionMenu").on("click", ".accordionButton", function (e) {
    let isDescAccordion =
      glob.sidebarMenu && glob.sidebarMenu.classList.contains("descAccordion");

    if (isDescAccordion || document.documentElement.clientWidth < 992) {
      e.stopPropagation();
      let submenuBlock = this.parentElement.nextElementSibling;
      let button = this;

      globFunc.toggleButtonContent(button);
      glob.AccordionModule.toggleContent(
        "withoutSiblings",
        button,
        submenuBlock
      );
    }
  });

  // datepicker in adminPage
  $(document).ready(function () {
    var date_input = $('input[name="date"]'); //our date input has the name "date"
    var container =
      $(".bootstrap-iso form").length > 0
        ? $(".bootstrap-iso form").parent()
        : "body";
    var options = {
      format: "mm/dd/yyyy",
      container: container,
      todayHighlight: true,
      autoclose: true,
    };
    date_input.datepicker(options);
  });

  // filter in product page
  const $btnFilter = $(".acc-button");
  $($btnFilter).on("click", function () {
    const $btn = $(this);
    const $container = $btn.closest($(".acc-item"));
    const $accContent = $container.find($(".acc-content"));
    $accContent.slideToggle("hide_js");
  });

  // filter hide btn 'показать все'
  (function () {
    if (!$(".acc-item").length) return;

    const $containers = $(".acc-item");
    const MAX_ITEMS_IN_FILTER = 4;

    for (let numItem = 0; numItem < $containers.length; numItem++) {
      const $container = $($containers[numItem]);
      const $formItems = $container.find(".form-row-secondary");
      if ($formItems.length > MAX_ITEMS_IN_FILTER) {
        const $btnShow = $container.find(".button-show-all");
        $btnShow.show();
      }
    }
  })();

  //
  (function () {
    if (!$(".button-show-all").length) return;
    const $btnShowAll = $(".button-show-all");
    $($btnShowAll).on("click", function () {
      const $btn = $(this);
      const $accContent = $btn.closest(".acc-content");
      const $productFilterWrap = $accContent.find(".products-filter-wrap");
      $productFilterWrap.toggleClass("height_auto_js");
      $productFilterWrap.hasClass("height_auto_js")
        ? $btn.text("Скрыть")
        : $btn.text("Показать все");
    });
  })();

  // overlay
  (function () {
    const productPage = $("#productPage");
    const menuItem = $(".submenu-item");
    if (document.documentElement.clientWidth > 1170) {
      menuItem.mouseover(() => productPage.addClass("overlay_js"));
      menuItem.mouseout(() => productPage.removeClass("overlay_js"));
    }
  })();

  (function () {
    const productPage = $("#homePage");
    const menuItem = $(".submenu-item");
    if (document.documentElement.clientWidth > 1170) {
      menuItem.mouseover(() => productPage.addClass("overlay_js"));
      menuItem.mouseout(() => productPage.removeClass("overlay_js"));
    }
  })();

  // feedback
  (function () {
    const $btnFeedback = $(".feedback-title");
    $($btnFeedback).on("click", function () {
      const $btn = $(this);
      const $container = $btn.closest($(".feedback-block"));
      const $accContent = $container.find($(".feedback-other-contant"));
      $accContent.slideToggle("hide_js");
    });
  })();

  // purchase amount in basket page
  (function () {
    if (!$(".minus-btn").length) return;
    $(".minus-btn").on("click", function (e) {
      e.preventDefault();
      var $this = $(this);
      var $input = $this.closest("div").find("input");
      var value = parseInt($input.val());
      value = value - 1;
      if (value < 0) {
        return;
      }

      $input.val(value);
    });

    $(".plus-btn").on("click", function (e) {
      e.preventDefault();
      var $this = $(this);
      var $input = $this.closest("div").find("input");
      var value = parseInt($input.val());
      value = value + 1;
      if (value === 26) {
        return;
      }

      $input.val(value);
    });
  })();

  (function () {
    if (!$(".mainHeader").length) return;
    if (document.documentElement.clientWidth > 1170) {
      const $headerAccordionMenu = $(".header-accordion-menu");
      const $btnConteiner = $headerAccordionMenu.find(".btn-title-container");
      
      $headerAccordionMenu.mouseover( function () {  
        const $btn = $(this)
        $btnConteiner.addClass("open-accordion")
        addOverlayHeaderCategory()
        showCategoryHeaderMenu($btn)
      
      });
      $headerAccordionMenu.mouseout( function () {  
        const $btn = $(this)
        $btnConteiner.removeClass("open-accordion")
        removeOverlayHeaderCategory()
        hideCategoryHeaderMenu($btn)
      });
    }
  })()

  function addOverlayHeaderCategory() {  
    const $page = $(".page");
    $page.addClass("header-overlay_js");
  }

  function removeOverlayHeaderCategory() {  
    const $page = $(".page");
    $page.removeClass("header-overlay_js");
  }

  function showCategoryHeaderMenu(btn) {  
    btn.find(".header-accordion").addClass("heightAuto")
  }

  function hideCategoryHeaderMenu(btn) {  
    btn.find(".header-accordion").removeClass("heightAuto")
  }

  (function () {  
    if (!$(".mainHeader").length) return;
    if (document.documentElement.clientWidth > 1169) {
      const $headerAcordionMenu = $(".header-accordion-menu")
      const $item = $headerAcordionMenu.find(".menu-categories__item")
      $item.hover(
        function(){ $(this).addClass('menu-categories__item_state_hovered') },
        function(){ $(this).removeClass('menu-categories__item_state_hovered') }
      )
    }
  })();

  // carusel
  (function () {
    if (!$(".product-item-content").length) return;

    $(".slider").slick({
      dots: true,
      customPaging: function (slider, i) {
        const src = $(slider.$slides[i]).data("thumb");
        return '<img src="' + src + '">';
      },
      appendArrows: $(".your-class-arrow"),
      prevArrow:
        '<button id="prev" type="button" class="btn"><i class="fa fa-chevron-left" aria-hidden="true"></i> </button>',
      nextArrow:
        '<button id="next" type="button" class="btn"> <i class="fa fa-chevron-right" aria-hidden="true"></i></button>',
      responsive: [
        {
          breakpoint: 500,
          settings: {
            dots: false,
            arrows: false,
            infinite: false,
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    });
  })();

  // slickLightbox  - pop up img in slider
  $(".mobile-img-block").slickLightbox({
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

  // hide in show arrow in slick clider
  (function () {
    if (!$(".img-container").length) return;
    const $imgContainer = $(".img-container");
    const $btnPrev = $("#prev");
    const $btnNext = $("#next");

    $btnNext.hide();
    $btnPrev.hide();

    $imgContainer.mouseover(function arrowShow() {
      $btnNext.show();
      $btnPrev.show();
    });

    $imgContainer.mouseout(function arrowhHide() {
      $btnNext.hide();
      $btnPrev.hide();
    });
  })();

  // color gray in select new-post > basketPage
  (function () {
    if (!$(".input-post1_js").length) return;

    const $post1 = $(".input-post1_js");
    const $post2 = $(".input-post2_js");
    $post1.click(function () {
      $post1.css("color", "black");
    });
    $post2.click(function () {
      $post2.css("color", "black");
    });
  })();

  // modal window
  (function () {
    if (!$(".modal-custom").length) return;

    const $bt = $(".modal-custom-open-btn");

    const $modalBlock = $(".modal-custom");
    const $btnOverlay = $modalBlock.find(".modal-custom__overlay");
    const $btnBasketClose = $modalBlock.find(".modal-custom__close-btn");

    $bt.click(function () {
      $modalBlock.show();
    });

    $btnBasketClose.click(function () {
      $modalBlock.hide();
    });

    $btnOverlay.click(function () {
      $modalBlock.hide();
    });
  })();

  // display the name of the selected file in input
  (function () {
    const $inp = $(".add-file")
    $inp.on("change", function (event, files, label) {
      const $file_name = this.value.replace(/\\/g, "/").replace(/.*\//, "");
      const $conteiner = $(this).closest("div")
      const $editText = $conteiner.find(".add-file_js");
      $editText.text($file_name);
    });
  })();

  (function () {
    const $inp = $(".add-icon")
    $inp.on("change", function (event, files, label) {
      const $file_name = this.value.replace(/\\/g, "/").replace(/.*\//, "");
      const $conteiner = $(this).closest("div")
      const $editText = $conteiner.find(".add-icon_js");
      $editText.text($file_name);
    });
  })();
  // plus - minus in btn filter
  (function () {
    if (!$(".filter-mobile-buttom").length) return;
    if (document.documentElement.clientWidth < 1170) {
      const $accItem = $(".acc-item");
      $accItem.on("click", function () {
        const $btn = $(this);
        const $container = $btn.find(".acc-button");
        $container.toggleClass("active");
      });
    }
  })();

  // btn show filter in mobile version
  (function () {
    if (!$(".filter-mobile-buttom").length) return;
    if (document.documentElement.clientWidth < 1170) {
      const $mobileBtnFilterHide = $(".filter-mobile-buttom");

      $mobileBtnFilterHide.on("click", activeBtn);
      $mobileBtnFilterHide.on("click", activeFilter);

      function activeBtn() {
        const $btn = $(this);
        const $container = $btn.closest(".descMenu");
        const $containerBtnFind = $container.find(".filter-mobile-buttom");
        $containerBtnFind.toggleClass("active");

        $mobileBtnFilterHide.hasClass("active")
          ? $btn.text("Скрыть фильтры")
          : $btn.text("Показать фильтры");
      }

      function activeFilter() {
        const $btn = $(this);
        const $container = $btn.closest(".descMenu");
        const $containerFilterFind = $container.find(
          ".products-filters__container"
        );
        $containerFilterFind.toggleClass("active");
      }
    }
  })();

  (function () {
    const $itemTtn = $(".dispatch-number_btn");
    $itemTtn.on("click", function () {
      const $ttnData = $(".dispatch-number_item").text();
      navigator.clipboard.writeText($ttnData);
      $(this).css("color", "#cecece");
      $(this).text("Скопировано");
    });
  })();

  // (function () {
  //   const $cardBlocks = $(".card-product .card-body");
  //   const $arrElements = [];
  //   let rowArr = [];
  //   let $flag = 0;

  //   for (let i = 0; i < $cardBlocks.length; i++) {
  //     const $element = $cardBlocks[i];
  //     const $top = $element.getBoundingClientRect().top;

  //     if (i === 0) $flag = $top;
     
  //     if ($flag === $top) {
  //       rowArr.push($element);
  //     }

  //     if ($flag !== $top) {
	// 	$arrElements.push(rowArr);

  //       rowArr = [];
        
	// 	$flag = $top;
	// 	rowArr.push($element);
	//   }
	  
	//   if (i === $cardBlocks.length - 1) {
	// 	$arrElements.push(rowArr);
	//   }

  //   }

	// $arrElements.forEach((rowArr) => {
	// 	const $rowArr = $(rowArr);

	// 	var mh = 0;
	// 	$rowArr.each(function () {
	// 		var h_block = parseInt($(this).height());
	// 		if(h_block > mh) {
	// 		   mh = h_block;
	// 		};
			
	// 	});
	// 	$rowArr.height(mh);
	// })

  // })();



  // checkbox:checked
  (function () {  
    
      const $inputChecked = $(".agreement-section")
      $inputChecked.on("click", function () {
        let $thisInput = $(this).find("input[type=checkbox]")
        const $thisMailSection = $thisInput.closest(".section-mailing")
        const $thisWrapBtn = $thisMailSection.find(".mailing-btn")
        const $thisBtn = $thisMailSection.find(".mailing-btn button")
        if ($thisInput.prop('checked')) {
          $thisWrapBtn.removeClass("disabled-mail-btn")
          $thisBtn.attr("disabled", false)
        } else {
          $thisWrapBtn.addClass("disabled-mail-btn")
          $thisBtn.attr("disabled", true)
        }
      })
    
  })()

  site = (function() {

		const win = window,
			  dom = document,
			  body = document.body,
				app = {},
				// обнуление таблицы
        $bannerSlide = $(".banner-slide-wrap"),
        $newProdSlide = $(".new-prod-sliders"),
				$hotProdSlide = $(".hot-prod-sliders"),
        $saleSlide = $(".sale-slide-wrap"),
        
        // product
        $productItemBlockZero = $(".product-item-block-zero"),
        $sectionFilters = $(".products-filters"),
        $productsSmall = $(".products-filters .products-filter-small"),

			  name = document.getElementsByClassName("mainWrapper")

		
	
		const fn = {
      // home page 
      topBannerInitSlickSlider(){
        if (!$(".slide-item").length) return

          $(".banner-sliders").slick({
            dots: true,
            infinite: true,
            autoplay: true,
            autoplaySpeed: 3000,
            fade: true,
            speed: 500,
            slidesToShow: 1,
            adaptiveHeight: true,
            arrows: true,
            prevArrow: $('.prev'),
            nextArrow: $('.next'),
            responsive: [
            {
              breakpoint: 1170,
              settings: {
                arrows: false
              }
            },
            ]
          });
    
      },

      saleInitSlickSlider(){
        if (!$(".sale-sliders .card-product").length) return

          $(".sale-sliders").slick({
            dots: true,
            infinite: true,
            autoplay: true,
            autoplaySpeed: 2000,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            arrows: true,
            prevArrow: $('.sale-prev'),
            nextArrow: $('.sale-next'),
            adaptiveHeight: true,
            responsive: [
              {
                breakpoint: 1170,
                settings: {
                  arrows: false,
                  slidesToShow: 4,
                }
              },
              {
                breakpoint: 760,
                settings: {
                  slidesToShow: 3,
                }
              },
              {
                breakpoint: 460,
                settings: {
                  slidesToShow: 2,
                }
              },
              ]
          });
        
      },

      newProdInitSlickSlider(){
        if (!$(".new-prod-sliders .card-product").length) return

          $(".new-prod-sliders").slick({
            dots: true,
            infinite: true,
            autoplay: true,
            autoplaySpeed: 2000,
            // fade: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            arrows: true,
            prevArrow: $('.new-prev'),
            nextArrow: $('.new-next'),
            adaptiveHeight: true,
            responsive: [
              {
                breakpoint: 1170,
                settings: {
                  arrows: false,
                  slidesToShow: 4,
                }
              },
              {
                breakpoint: 760,
                settings: {
                  slidesToShow: 3,
                }
              },
              {
                breakpoint: 460,
                settings: {
                  slidesToShow: 2,
                }
              },
              ]
          });

      },

      hotProdInitSlickSlider(){
        if (!$(".hot-prod-sliders .card-product").length) return

          $(".hot-prod-sliders").slick({
            dots: true,
            infinite: true,
            autoplay: true,
            autoplaySpeed: 2000,
            // fade: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            arrows: true,
            prevArrow: $('.hot-prev'),
            nextArrow: $('.hot-next'),
            adaptiveHeight: true,
            responsive: [
              {
                breakpoint: 1170,
                settings: {
                  arrows: false,
                  slidesToShow: 4,
                }
              },
              {
                breakpoint: 760,
                settings: {
                  slidesToShow: 3,
                }
              },
              {
                breakpoint: 460,
                settings: {
                  slidesToShow: 2,
                }
              },
              ]
          });
        
      },

      handlerDisabledBtn(){
       const $productZero = $(".product-item-block.product-item-block-zero");
       const $btn = $productZero.find(".btn-basket-item button")
       if ($productZero) {
        $btn.attr("disabled", "true");
        $btn.css("cursor", "default")
       } else {
        $btn.attr("disabled", "false");
       }
      },
      
      handlerHeightCardProduct() {
      
        const $cardBlocks = $(".card-product .card-body");
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

      handlerActivedFilterItem() {

        const $productsSmall = $(".products-filters .products-filter-small")
        $(".products-filter-small").on("click" , function() {
          const $btn = $(this)
    
          if ( !$(this).hasClass("active-filter") || $(this).hasClass("active-filter-rev")){ 
            $productsSmall.removeClass("active-filter")
            $productsSmall.removeClass("active-filter-rev")
            $productsSmall.attr("data-value", "")
            $btn.addClass("active-filter")
            $btn.attr("data-value", "desc")
           
          }else if ( $(this).hasClass("active-filter") ){
            $productsSmall.removeClass("active-filter")
            $(this).addClass("active-filter-rev")
             if ($btn.data("value", "desc")) {
              $productsSmall.attr("data-value", "")
              $btn.attr("data-value", "asc")
             }
          }
    
          // const $searchInput = $btn.closest(".products-filters").find("input")
          // $searchInput.attr("value", $valueButton)
          // $searchInput.attr("name", $nameButton)
          const $valueButton = $btn.attr("data-value")
          const $nameButton = $btn.attr("data-alias") 
    
          fn.redirect($valueButton, $nameButton)
    
        })
       
      },

      redirect(value, name) {

        var queryString = window.location.search.slice(1);
        let filterData = name + "=" + value
        let newArr = []
        if (queryString) {

          queryString = queryString.split('#')[0];

          var arr = queryString.split('&');
          for (let i = 0; i < arr.length; i++) {
            arr[1] = filterData
          }
          newArr = arr.join("&")
          console.log(newArr);
        }
      
        let locHref = window.location.href; 
        locHref = locHref.substring(0 , locHref.indexOf('?')+1);
        document.location.replace(locHref + newArr)

      },

			domReady() {
        if ($(".products-filter-small").length) {
          fn.handlerActivedFilterItem()
        }

        if(	$bannerSlide.length){
          
          fn.topBannerInitSlickSlider()
        }
    
        if(	$saleSlide.length){
          fn.saleInitSlickSlider()
        }

        if(	$newProdSlide.length){
          fn.newProdInitSlickSlider()
        }

        if(	$hotProdSlide.length){
          fn.hotProdInitSlickSlider()
        }

        if(	$productItemBlockZero.length){
          fn.handlerDisabledBtn()
        }

        if ($(".homePage")) {
          fn.handlerHeightCardProduct()
        }

			}
		}
		
		dom.addEventListener("DOMContentLoaded", fn.domReady()) ;
	
		return fn;
	
	  })();
  




});

window.onload = function () {

//  (function handlerActivedFilterItem() {

//     const $productsSmall = $(".products-filters .products-filter-small")
//     $(".products-filter-small").on("click" , function() {
//       const $btn = $(this)

//       if ( !$(this).hasClass("active-filter") || $(this).hasClass("active-filter-rev")){ 
//         $productsSmall.removeClass("active-filter")
//         $productsSmall.removeClass("active-filter-rev")
//         $productsSmall.attr("data-value", "")
//         $btn.addClass("active-filter")
//         $btn.attr("data-value", "desc")
       
//       }else if ( $(this).hasClass("active-filter") ){
//         $productsSmall.removeClass("active-filter")
//         $(this).addClass("active-filter-rev")
//          if ($btn.data("value", "desc")) {
//           $productsSmall.attr("data-value", "")
//           $btn.attr("data-value", "asc")
//          }
//       }

//       const $searchInput = $btn.closest(".products-filters").find("input")
//       $searchInput.attr("value", $valueButton)
//       $searchInput.attr("name", $nameButton)
//       const $valueButton = $btn.attr("data-value")
//       const $nameButton = $btn.attr("data-alias") 

//       redirect($valueButton, $nameButton)

//     })
   
// })()

// function redirect(value, name) {
  
//   var queryString = window.location.search.slice(1);
//   let filterData = name + "=" + value
//   let newArr = []
//   if (queryString) {
        
//     queryString = queryString.split('#')[0];
    
//     var arr = queryString.split('&');
//     for (let i = 0; i < arr.length; i++) {
//       arr[1] = filterData
//     }
//     newArr = arr.join("&")
//     console.log(newArr);
//   }

//   let locHref = window.location.href; 
//   locHref = locHref.substring(0 , locHref.indexOf('?')+1);
//   document.location.replace(locHref + newArr)
// }

 if ($(".products-filter-small").length) {
   getSubmit()
 }

 function getSubmit() {
     
      var queryString = window.location.search.slice(1);

      var obj = {};

      if (queryString) {
        
        queryString = queryString.split('#')[0];
        
        var arr = queryString.split('&');
    
        

        for (var i=0; i<arr.length; i++) {
          // var a = arr[0].split('=');

         var a = arr[1].split('=');
          var paramNum = undefined;
          var paramName = a[0].replace(/\[\d*\]/, function(v) {
            paramNum = v.slice(1,-1);
            return '';
          });

          var paramValue = typeof(a[1])==='undefined' ? true : a[1];
        
    
          paramName = paramName.toLowerCase();
          paramValue = paramValue.toLowerCase();
    
          if (obj[paramName]) {
            if (typeof obj[paramName] === 'string') {
              obj[paramName] = [obj[paramName]];
              
            }
            if (typeof paramNum === 'undefined') {
              obj[paramName].push(paramValue);
            
            }
            else {
              obj[paramName][paramNum] = paramValue;
            }
          }
         
          else {
            obj[paramName] = paramValue;
          }
   
        }
      }

     searchGetParams(paramName, paramValue)
      return obj;
    
  }

 function searchGetParams(name, value){
  
  const $productsSmall = $(".products-filters .products-filter-small")
  const $btns = $(".products-filters").find("button")
  // const $input = $(".products-filters").find("input").attr("value", value).attr("name", name)
    for (let i = 0; i < $btns.length; i++) {
      const $dataAlias = $($btns[i]).data("alias")

      if($dataAlias == name){
        $($btns[i]).attr("data-value", value)

        if ( $($btns[i]).data("value") == "desc") { 
          $productsSmall.removeClass("active-filter")
          $productsSmall.removeClass("active-filter-rev")
          $($btns[i]).addClass("active-filter")
      
         
        } else if ( $($btns[i]).data("value") == "asc" ) {
          $productsSmall.removeClass("active-filter")
          $($btns[i]).addClass("active-filter-rev")
        }


      }

    }

  }

};
