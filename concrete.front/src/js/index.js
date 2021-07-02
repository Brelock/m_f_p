let status = "JS - OK!";
// =================
// @@include('frames/globalFunctions.js')
// ===============
var site = null;

$(document).ready(function () {
  if (!$("body")) {
    console.log("jQuery Error");
  }
  // console.log('document ready')
  // console.log(dropDown)
  // =================Include Modules==============================
  // ---
  @@include("frames/modal.js")(
    // ----

    // if (document.documentElement.clientWidth > 991 ) {}

  function () {
      if (document.documentElement.clientWidth < 767) {
        const $value = $(".value");

        //TOGGLING NESTED ul
        $(".drop-down .selected .sel").click(function () {
		  $(".drop-down .options .ul").toggle();
		  
		  $(this).toggleClass("active");
        });

        //SELECT OPTIONS AND HIDE OPTION AFTER SELECTION
        $(".drop-down .options .ul .value").click(function () {
          $value.show();
          $(this).hide();

          var text = $(this).html();
          $(".drop-down .selected .sel").html(text);
          $(".modal-text").html(text);
		  $(".drop-down .options .ul").hide();
		  $(".drop-down .selected .sel").toggleClass("active")
        });

        //HIDE OPTIONS IF CLICKED ANYWHERE ELSE ON PAGE
        $(document).on("click", function (e) {
          var $clicked = $(e.target);
          if (!$clicked.parents().hasClass("drop-down")) {
            $(".drop-down .options .ul").hide();
          }
        });
      
    }
  })();

//   (function () {
//     const $imgContainer = $(".calculator-list-figure_img");
//     const $imgAll = $imgContainer.find("img");

//     const $btnFormActive = $(".button-calculate");
//     const $disableBtn = $(".disabled_js");

//     const $value = $(".value");
//     const $calculatorForm = $(".calculator-forms");
//     const $modalImg = $(".modal-img");
//     const $setImg = $(".set-img");

//     $value.click(imgHide);

//     function imgHide() {
//       $disableBtn.attr("disabled", true);
//       $btnFormActive.removeClass("active");
//       $calculatorForm.hide();
//       $setImg.hide();
//       const $btn = $(this);
//       $value.removeClass("active");
//       $btn.addClass("active");

//       const $data = $btn.data("id");
//       const $idGet = $("." + $data);
//       $imgAll.hide();
//       $idGet.show();

//       const $srcAttrImg = $idGet.attr("src");
//       $modalImg.attr("src", $srcAttrImg);
//     }
//   })();

  // mobile resultat
//   (function () {
//     if (document.documentElement.clientWidth < 767) {
//       const $resultClickBlock = $(".calculator-list_right-block");

//       const $btnResultShowBlock = $(".button-mobile-hide-result");
//       const $resultBody = $(".result-body");

//       const $overlayMobile = $(".result-body_custom-overlay");

//       $overlayMobile.on("click", function () {
//         $resultClickBlock.toggleClass("active");
//         $resultBody.slideToggle("fast");
//       });

//       $btnResultShowBlock.on("click", function () {
//         $resultBody.slideToggle("fast");
//         $resultClickBlock.toggleClass("active");
//       });
//     }
//   })();

  // for length item result
  (function () {
    if (document.documentElement.clientWidth > 767) {
      const $bodyListItem = $(".body-list-item");
      let i = 0;

      const $clearItems = $(".clear-items");
      $clearItems.hide();
      if (i < $bodyListItem.length) {
        $clearItems.show();
      }
    }
  })();

  (function () {
    if (document.documentElement.clientWidth > 767) {
      const $imgContainer = $(".calculator-list-figure_img");
      const $imgAll = $imgContainer.find("img");

      const $setImg = $(".set-img");

      const $containerInput = $(".calculator-forms-body");
      const $findInput = $containerInput.find("input");

      $findInput.on("focus", focusInput);
      $findInput.on("blur", defaultImg);

      function focusInput() {
        $setImg.show();
        $imgAll.hide();
        const $inputSrc = $(this).data("img");
        $setImg.html("<img src=" + $inputSrc + ">");
      }

      function defaultImg() {
        const $activeItem = $(".find-active_js .active");
        const $activeSrc = $activeItem.data("src");
        $setImg.html("<img src=" + $activeSrc + ">");
      }
    }
  })();

  (function () {
    const $findInput = $(".calculator-list-forms input");
    const $btnFormActive = $(".button-calculate");
	
	
    $findInput.on("input", validInput);
	
    function validInput() {
		const $thisBtn = $(this).closest(".calculator-forms");
		const $thisBtnFlagActive = $thisBtn.find(".button-calculate")
		const $thisBtnClosest = $(this).closest(".calculator-forms");
		const $findBtnDisables =$thisBtnClosest.find(".disabled_js")
      let $flag = true;
      const $parent = $(this).closest(".calculator-forms");
      const $inputs = $parent.find("input").each(function () {
        if ($(this).val() == 0 || $(this).val() == "") {
          $flag = false;
        }
      });
      if ($flag == true) {
        $thisBtnFlagActive.addClass("active");
		$findBtnDisables.removeAttr("disabled");
		// $disableBtn.removeAttr("disabled")
      } else {
        $thisBtnFlagActive.removeClass("active");
      }
    }
  })();

  (function () {
    const $Input = $(".contact-us-contant-body input");
    const $btnForm = $(".form-contact-us_button");
    const $disableBtn = $(".disabled_js");

    $Input.on("blur", validInput);

    function validInput() {
      let $flag = true;

      const $inputs = $Input.each(function () {
        if ($(this).val() == 0 || $(this).val() == "") {
          $flag = false;
        }
      });
      if ($flag == true) {
        $btnForm.addClass("active");
        $disableBtn.removeAttr("disabled");
      } else {
        $btnForm.removeClass("active");
      }
    }
  })();

  site = (function(window, document, $) {

	const $win = $(window),
		  $dom = $(document),
		  $body = jQuery(document.body),
		  app = {},
		  /* contacts form */
		  $formContact = $(".form--contact"),
		  $modalContactBlock = $('.contact-us-modal'),
		  /* calc */
		  $forms = $(".calculator-forms"),
		  $btnFormActive = $(".button-calculate"),
		  $resultList = $(".result-body-list"),
		  $resultTotalData = $(".result-body_total-data"),
		  $resultHeaderTotalData = $(".result-header_data"),
		  $clearItems = $(".clear-items"),
		  $clearFormBtns = $('.forms-button-another'),
		  $resultClickBlock = $(".calculator-list_right-block"),
      	  $btnResultShowBlock = $(".button-mobile-hide-result"),
      	  $resultBody = $(".result-body"),
		  $overlayMobile = $(".result-body_custom-overlay"),
		  
		  $imgContainer = $(".calculator-list-figure_img"),
		  $imgAll = $imgContainer.find("img"),
		  $disableBtn = $(".disabled_js"),
		  $value = $(".value"),
		  $calculatorForm = $(".calculator-forms"),
		  $modalImg = $(".modal-img"),
		  $setImg = $(".set-img"),

		  $Input = $(".calculator-list-forms input"),
		  
		  /* spinner */
		  $spinnerProgress = $('.spinner--search-js'),
		  $buttonCalculateLabel = $('.button-calculate__label'),
		  $spinnerProgressContact = $('.spinner--contact-js'),
		  $buttonContactLabel = $('.button-contact__label');

	const fn = {
		initAjaxHeaders() {
			$.ajaxSetup({
				headers: {
					'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
				}
			});
		},

		resetForm(formElement) {
			const form = formElement instanceof jQuery ? formElement[0] : formElement;
			form.reset();
		},

		prepareFormData(form) {
			let inputs = form.querySelectorAll("input");
			let selects = form.querySelectorAll("select");
			let textareas = form.querySelectorAll("textarea");
	  
			let data = {};
			if (inputs.length) {
			  for (let i = 0; i < inputs.length; i++) {
				inputs[i].value ? (data[inputs[i].name] = inputs[i].value) : null;
			  }
			}
	  
			if (selects.length) {
			  for (let i = 0; i < selects.length; i++) {
				selects[i].value && selects[i].value != "placeholder"
				  ? (data[selects[i].name] = selects[i].value)
				  : null;
			  }
			}
	  
			if (textareas.length) {
			  for (let i = 0; i < textareas.length; i++) {
				textareas[i].value
				  ? (data[textareas[i].name] = textareas[i].value)
				  : null;
			  }
			}
	  
			// data = JSON.stringify( data );
			return data;
		},

		handleResultHtml(categoryId, value) {
			fn.addResultItemToList(categoryId, value);
			fn.handleCalculateTotalVolume();
		},

		addResultItemToList(categoryId, value) {
			const resultItem = `
			<div class="body-list-item">
				<div class="body-list_name">${fn.handleResultItemLabel(categoryId)}</div>
				<div class="body-list_value">
				<div class="result-value_data" data-value="6.57">${value}</div>
				<div class="value_replace-yd">yd <sup>3</sup></div>
				</div>
				<button class="body-list_btn-close"></button>
			</div>
			`;

			$resultList.append(resultItem);
			fn.handleShowClearAllBtn();
			fn.mobileResultShow();
			
		},

		handleShowClearAllBtn() {
			if (document.documentElement.clientWidth > 767) {
				const $bodyListItem = $(".body-list-item");
			
				$clearItems.hide();
				if ( $bodyListItem.length ) {
					$clearItems.show();
				}
			}
		},

		handleCalculateTotalVolume() {
			const $blocksWithVal = $resultList.find('.result-value_data');
			let totalVal = 0.00;

			$blocksWithVal.each((idx, el) => {
				const val = $(el).html().trim();
				totalVal += Number(val);
			})

			$resultTotalData.text(totalVal.toFixed(2));
			$resultHeaderTotalData.text(totalVal.toFixed(2));
		},
	
		handleResultItemLabel(categoryId) {
			switch(categoryId) {
				case '1':
					return 'Slabs or Footings';
				case '2':
					return 'Walls';
				case '3':
					return 'Round Columns';
				default:
					return 'Unknown id';
			}
		},

		handleDeleteResultItem() {
			$body.on("click", ".body-list_btn-close", function () {
				const $btn = $(this);
				const $container = $btn.closest(".body-list-item");
				$container.remove();

				fn.handleCalculateTotalVolume();
				fn.handleShowClearAllBtn();
			});
		},

		handleDeleteResults() {
			$clearItems.on("click", function () {
				const $bodyListItem = $(".body-list-item");
				$bodyListItem.remove();
				fn.handleCalculateTotalVolume();
			});
		},

		handleCalc() {
			$forms.on("submit", function (e) {
				e.preventDefault();
		  
				let data = fn.prepareFormData(this);
				let categoryId = data.category_id;
		  
				$.ajax({
				  type: "POST",
				  url: window.location.origin + `/calculation`,
				  data: data,
				})
				  .done(function (response) {
					console.log("res", response);
					fn.handleResultHtml(categoryId, response.data);
					fn.hideSpinnerSearch();
				  })
				  .fail(function (error) {
					fn.hideSpinnerSearch();
					console.log(error);
				  }); 
		  
				  fn.showSpinnerSearch();
			  });
		},

		handleClearForm() {
			$clearFormBtns.on('click', function() {
				const $this = $(this);
				const $form = $this.closest('form');
				const $findBtnActive = $form.find(".button-calculate")
				$findBtnActive.removeClass("active")
				fn.resetForm($form);
			});
		},

		handleContactForm() {
			$formContact.on("submit", function (e) {
				e.preventDefault();
		  
				let data = fn.prepareFormData(this);

				console.log('data', data);
				
		  
				$.ajax({
				  type: "POST",
				  url: window.location.origin + `/requests`,
				  data: data,
				})
				  .done(function (response) {
					console.log("res", response);
					// fn.handleResultHtml(categoryId, response.data);
					fn.hideSpinnerContact();
					$modalContactBlock.removeClass('active');
				  })
				  .fail(function (error) {
					fn.hideSpinnerContact();
					$modalContactBlock.removeClass('active');
					console.log(error);
				  }); 
		  
				  fn.showSpinnerContact();
			  });
		},

		showSpinnerSearch() {
			$spinnerProgress.show();
			$buttonCalculateLabel.hide();
		},

		hideSpinnerSearch() {
			$spinnerProgress.hide();
			$buttonCalculateLabel.show();
		},

		showSpinnerContact() {
			$spinnerProgressContact.show();
			$buttonContactLabel.hide();
		},

		hideSpinnerContact() {
			$spinnerProgressContact.hide();
			$buttonContactLabel.show();
		},

		handlePlaceholderInp() {
			var $inputItem = $(".js-inputWrapper");
			$inputItem.length && $inputItem.each(function() {
			var $this = $(this),
				$input = $this.find(".formRow--input"),
				placeholderTxt = $input.attr("placeholder"),
				$placeholder;
			
			$input.after('<span class="placeholder">' + placeholderTxt + "</span>"),
			$input.attr("placeholder", ""),
			$placeholder = $this.find(".placeholder"),
			
			$input.val().length ? $this.addClass("active") : $this.removeClass("active"),
				
			$input.on("focusout", function() {
				$input.val().length ? $this.addClass("active") : $this.removeClass("active");
			}).on("focus", function() {
				$this.addClass("active");
			});
			});
		},

		handleShowResultBlock() {
  		  if (document.documentElement.clientWidth < 767) {
			$overlayMobile.on("click", function () {
		    $resultClickBlock.toggleClass("active");
		    $resultBody.slideToggle("fast");
		  });
	
		  $btnResultShowBlock.on("click", function () {
		    $resultBody.slideToggle("fast");
		    $resultClickBlock.toggleClass("active");
		  });
		}
		},

		handlerBtnDisabled() {
			$value.on("click", function () {  
			
				$calculatorForm.hide();
				$setImg.hide();
				const $btn = $(this);
				$value.removeClass("active");
				$btn.addClass("active");
		  
				const $data = $btn.data("id");
				const $idGet = $("." + $data);
				$imgAll.hide();
				$idGet.css("display" , "block");
				
				
		  
				const $srcAttrImg = $idGet.attr("src");
				$modalImg.attr("src", $srcAttrImg);
				
				

			});
   
		},
	
		mobileResultShow() {
			if (document.documentElement.clientWidth < 767) {
				$resultBody.show() 
				$resultClickBlock.toggleClass("active")
			}
		},
		// handlerValidInput() {
		// 	$Input.on("blur", function () { 
		// 		let $flag = true;
		  
		// 		const $inputs = $Input.each(function () {
		// 		  if ($(this).val() == 0 || $(this).val() == "") {
		// 			$flag = false;
		// 		  }
		// 		});

		// 		if ($flag == true) {
		// 		  $btnFormActive.addClass("active");
		// 		  $disableBtn.removeAttr("disabled");
		// 		} else {
		// 		  $btnFormActive.removeClass("active");
		// 		}
		// 	})
		// },






		domReady(cb) {
			fn.handlePlaceholderInp();

			if ( $('meta[name="csrf-token"]').length )
				fn.initAjaxHeaders();

			if ( $forms.length )
				fn.handleCalc();

			if ( $resultList.length )
				fn.handleDeleteResultItem();

			if ( $clearItems.length )
				fn.handleDeleteResults();
			
			if ( $formContact.length ) 
				fn.handleContactForm();

			if ( $clearFormBtns.length )
				fn.handleClearForm();

			if( $btnResultShowBlock.length)	
				fn.handleShowResultBlock();
				
			if( $value.length)
				fn.handlerBtnDisabled();		

			// if( $Input.length)
			// 	fn.handlerValidInput();	
		}
	}
	
	$dom.ready(fn.domReady);

	return fn;

  })(window,document,jQuery);


});

window.onload = function () {
  // console.log('window load')
};
