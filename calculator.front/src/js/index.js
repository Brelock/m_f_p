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
			  
			  name = document.getElementsByClassName("mainWrapper")

		
	
		const fn = {
			Function() {
			
				
			},

			
			domReady() {
				if (name.length) {
					fn.Function();
				}
			}
		}
		
		dom.addEventListener("DOMContentLoaded", fn.domReady()) ;
	
		return fn;
	
	  })();

	

});

window.onload = function() {

}
