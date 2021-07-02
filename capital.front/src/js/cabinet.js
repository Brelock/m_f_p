var cabinet = null;

$(document).ready(function() {

  cabinet = (function(window, document, $, undefined) {

    const $win = $(window),
          $dom = $(document),
          $body = jQuery(document.body),
          app = {},
          /* tab cabinet */
          $tabSelect = $('.tabSelect-js'),
          $cabinetToggleBlocks = $('.cabinet .toggleBlocks-list .toggleBlock'),
          /* show info */
          $btnsMore = $('.button-more'),
          /* tabs */
          $btnsSteps = $('.button-step-js').not('.button-extend--disabled'),
          $contractsTabs = $('.contracts-tabBlock'),
          /* slider range */
          $sliderRange = $('.slider-range-second'),
          /* datepicker */
          $extendsSumDate = $('.extends-sum__date'),
          $datepicker = $('#datepicker');
    
    let isOpen = false;
    
    app.settings = {
      "menuMaxWidth"  : 992,
      "isMobile" : /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(window.navigator.userAgent),
      "isAppleDevice" : /iPhone|iPad|iPod/i.test(window.navigator.userAgent),
      "moreBtn": "Подробнее",
      "hideBtn": "Свернуть",

    };

    const fn = {
      onChangeSelectTab() {
        $tabSelect.on('change', function(e) {
          let $selectedOption = $(this.options[this.options.selectedIndex]); 
          let dataTarget = $selectedOption.data('target');

          if ( dataTarget === 'quit' ) 
            fn.doQuitOnMobile();
          
          fn.changeActiveTab(dataTarget);
        });
      },
      
      doQuitOnMobile () {
        console.log('do quit');
      },

      changeActiveTab(dataTarget) {
        for (let i = 0; i < $cabinetToggleBlocks.length; i++) {
          let $toggleBlock = $($cabinetToggleBlocks[i]);
          let $toggleBlockId = $toggleBlock.attr('id');
          
          dataTarget == $toggleBlockId ? 
            $toggleBlock.addClass('active') :
            $toggleBlock.removeClass('active');
        }
      },

      toggleInfo() {
        $btnsMore.on('click', function() {
          let $target = $(this);
          
          $target.toggleClass('open');
          $target
            .closest('.contract')
            .find('.contract__items__hidden')
            .slideToggle();
          
          fn.toggleInfoBtnText($target)
        });
      },

      toggleInfoBtnText($target) {
        let $targetTextContainer = $target.find('span');
        let text = $targetTextContainer.text();

        $targetTextContainer.text(text == app.settings.moreBtn ? app.settings.hideBtn : app.settings.moreBtn );
      },

      toggleTabs() {
        $btnsSteps.on('click', function() {
          let target = $(this).data('target');
          
          for (let i = 0; i < $contractsTabs.length; i++) {
					  $contractsTabs[i].classList.remove('active');

            if (target === $contractsTabs[i].id) {
              $contractsTabs[i].classList.add('active'); 
            } 
          }
        });
      },

      initTooltip() {
        $('.tooltip').tooltip({
          position: { my: "left+15 center", at: "right top" }
        });
      },

      initSliderRange() {
        $( ".slider-range-second" ).slider({
          min: 1,
          max: 30,
          value: 15,
    
          create: function( event, ui ) {
            var handle = event.target.firstChild;
            var leftArrow = "<i class='icomoon icon-angle js_left'></i>";
            var rightArrow = "<i class='icomoon icon-angle js_right'></i>"
            handle.innerHTML = "<span class='js_visibleHandle'>"+ leftArrow + "<span class='text'>"+ $(this).slider("option", "value")+"</span>" + rightArrow +"</span>";
            $(handle).after('<span class="js_fill-left-side"></span>');

            fn.setTextForSliderAndDatePicker();
            fn.setFillLineWidth(handle);
          },
    
          slide: function( event, ui ) {
            fn.setTextForSliderAndDatePicker(ui.value);
            fn.setFillLineWidth(ui.handle);            
          },
        }); 
      },

      setFillLineWidth(handle) {
        let leftOffset = $(handle).css('left');
        let $fillLine = $(handle).next();

        $fillLine.css('width', leftOffset);
      },

      setTextForSliderAndDatePicker(val) {
        let value = null; 
        val ?
          value = val :
          value = $sliderRange.slider('value');

        $sliderRange.find('.text').text(value);
        $extendsSumDate.find('span').text(value + " дней");
      },

      initDatepicker() {
        $datepicker.datepicker({
          startDate: '-0d',
          language: "ru",
          format: 'yyyy-mm-dd'
        })
        .on('changeDate', function() {
          $('#multipleDate').val(
            $datepicker.datepicker('getFormattedDate')
          );

          fn.setTextForSliderAndDatePicker(fn.getExtendDaysInDatePicker());
          fn.hideDatePicker();

        });
      },

      hideDatePicker() {
        isOpen = false; 
        $datepicker.hide();
      },

      showDatePicker() {
        isOpen = true;
        $datepicker.show();
      },

      getExtendDaysInDatePicker() {
        let start = $datepicker.datepicker('getStartDate');
        let end = $datepicker.datepicker('getDate');

        let startDate = start.getDate();
        let endDate = end.getDate() + 1;

        let extendDays = endDate - startDate;

        return extendDays;
      },

      toggleDatepicker() {
        $extendsSumDate.on('click', function() {
          if ( isOpen ) {
            fn.hideDatePicker();
          } else {
            fn.showDatePicker();
          }
        });
      },

      domReady() {
        if ( $cabinetToggleBlocks.length )
          fn.onChangeSelectTab();

        if ( $btnsMore.length ) 
          fn.toggleInfo();

        if ( $btnsSteps.length )
          fn.toggleTabs();

        if ( $sliderRange.length ) 
          fn.initSliderRange();

        if ( $('.tooltip').length ) 
          fn.initTooltip();

        if ( $datepicker.length ) {
          fn.toggleDatepicker();
          fn.initDatepicker();
        }

      },
    }

    $dom.ready(fn.domReady);

    return fn;

  })(window,document,jQuery);

});