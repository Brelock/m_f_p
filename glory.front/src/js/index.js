var glob = {};

@@include('frames/globalFunctions.js');

var glory = null;

$(document).ready(function() {
	// =================Include Modules==============================
  /*@@include('frames/PopupModule.js')*/
  @@include('frames/ValidationModule.js')
	/*@@include('frames/AnimateBorderModule.js')*/
  /*@@include('frames/custom_Input_Type_number.js')*/
  /*@@include('frames/AccordionModule.js')*/
  /*@@include('frames/ToggleContentModule.js')*/
  @@include('frames/SwitchTabsModule.js')
  /*@@include('frames/TextLimitModule.js')*/
  /*@@include('frames/StickyBlockModule.js')*/ 
	// =============================================================

	glory = (function(window, document, $, undefined) {

		const $win = $(window),
     			$dom = $(document),
					$body = jQuery(document.body),
					app = {},

					$formAddArticle = $('.form-addArticle'),
					$formAddArticleActiveField = $formAddArticle.find('.active-field-js'),
					$formAddArticleDisabledFields = $formAddArticle.find('input[type=text], textarea'),
					
					$submitBtns = $('.form-contacts button, .form-login button, .form-registration button, .form-addArticle button'),
					/* file */
					$inputFiles = $('.inputfile');

		app.settings = {
			"menuMaxWidth"  : 992,
			"isMobile" : /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(window.navigator.userAgent),
			"isAppleDevice" : /iPhone|iPad|iPod/i.test(window.navigator.userAgent),
		};

		const fn = {

			initMenu() {
				let $menuBtn = $('.cabinet__btn'),
						$menu = $('.cabinet-menu');

				$menuBtn.on('click', () => {
					$menu.slideToggle();
					$menuBtn.toggleClass('active');
				})
			},

			setDisabledFields(activeField, disabledFields) {
				let isActiveFieldVal = activeField.val();

				isActiveFieldVal
					? $.each(disabledFields, (idx, item) => $(item).removeAttr('disabled'))
					: $.each(disabledFields, (idx, item) => $(item).attr('disabled', true));
			},

			setTitleWhenChoseFile() {
				$inputFiles.each( function() {
					var $input	 = $( this ),
							$label	 = $input.next( 'label' ),
							labelVal = $label.html();

					$input.on('change', function(e) {
						var fileName = '';

						console.log(this.files);
						if( this.files && this.files.length > 1 )
							fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( 'count', this.files.length );
						else if( e.target.value )
							fileName = e.target.value.split( '\\' ).pop();

						if( fileName )
							$label.find( 'span' ).html( fileName );
						else
							$label.html( labelVal );
					});

					// Firefox bug fix
					$input
						.on( 'focus', function(){ $input.addClass( 'has-focus' ); })
						.on( 'blur', function(){ $input.removeClass( 'has-focus' ); });
				});			
			},

			handleValidation() {
				$submitBtns.on('click', function(e) {
					let $target = $(e.target);
					let $closestForm = $target.closest('.form');			
		
					if(!glob.ValidationModule.isValid($closestForm)) {
						e.preventDefault();
					}
				});
			},

			domReady() {
				fn.initMenu();

				if ( $formAddArticle.length )
					$formAddArticleActiveField.on('change', () => fn.setDisabledFields($formAddArticleActiveField, $formAddArticleDisabledFields));
				
				if ( $submitBtns.length )
					fn.handleValidation();

				if ( $inputFiles.length )
					fn.setTitleWhenChoseFile();
			},	
		}

		$dom.ready(fn.domReady);

		return fn;

	})(window,document,jQuery)

});


window.onload = function() {

}
