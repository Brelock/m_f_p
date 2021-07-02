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
			  app = {}
			  

		
	
		const fn = {
			activedGridListProducts() {
				const $btnVisibleType = $('.btn_visible_type');
				$btnVisibleType.on('click', function() {
					$btnVisibleType.toggleClass('active_grid');
					const $container = $(this).closest('.wrap_products');
					const $wrapList = $container.find('.wrap_items');
					$wrapList.toggleClass('square_type_js');
				}); 
			},

			countingNumber() {
				$(".minus_btn").on("click", function (e) {
					e.preventDefault();
					var $this = $(this);
					var $input = $this.closest("div").find("input");
					var span = $this.closest("div").find(".count_num");
					var value = parseInt($input.val());
					if (value < 2) {
						return;
					}
					value = value - 1;
					span.html(value)
		
					$input.val(value);
				});
		
				$(".plus_btn").on("click", function (e) {
					e.preventDefault();
					var $this = $(this);
					var $input = $this.closest("div").find("input");
					var span = $this.closest("div").find(".count_num");
					var value = parseInt($input.val());
					value = value + 1;
					span.html(value)
					if (value === 26) {
						return;
					}
		
					$input.val(value);
				});
			},

			activedServisesSwitcher() {
				$('.tab_switcher').on('click', function() {
					$(this).toggleClass('actived');
				});
			},

			activedProductSwitch() {
				$('.wrap_switcher').on('click', function() {
					$(this).find('.switcher_state').toggleClass('actived');
				});
			},


			domReady() {
				if ($('.product_section').length) {
					fn.activedGridListProducts();
					fn.countingNumber();
					fn.activedProductSwitch();
				}
				if ($('.addtional_servises').length) {
					fn.activedServisesSwitcher();
				}

			}
		}
		
		dom.addEventListener("DOMContentLoaded", fn.domReady()) ;
	
		return fn;
	
	  })();

	

});

window.onload = function() {

}
