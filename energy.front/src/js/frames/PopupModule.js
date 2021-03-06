// console.log('PopupModule ok');
// ==============Popup Open/Close Module ==============
glob.PopupModule = (function () {
  var additionalClassStr;
  let modals = document.getElementsByClassName('popup');
  const pageOverlay = document.getElementById('pageOverlay');
  let touchEvent = 'ontouchstart' in window ? 'touchstart' : 'click';


  function toggleShow(event, popupBlock) {
    var popup = globFunc.returnDOM(popupBlock);
    // console.log('event,')
    if ( event.propertyName == 'opacity' ) {
      popup.classList.contains('js_animate') ? null : popup.classList.remove('js_open');
    }
  }

  if (modals.length) {
    for (let i = 0; i < modals.length; i++) {
      modals[i].addEventListener("transitionend", function(event) {
        event.stopPropagation();
        toggleShow(event, modals[i])
      }, false);
    }
  }

  function openPopup(popupBlock, additionalClass, overlayBlock) {
    let overlay = overlayBlock || pageOverlay;

    var popup = globFunc.returnDOM(popupBlock);
        popup.classList.add("js_open");
        popup.classList.add("js_animate");

    if (additionalClass) {
      additionalClassStr = additionalClass;
      globFunc.showOverlay("popup", overlay, additionalClass) 
    } else {
      globFunc.showOverlay("popup", overlay);
    }
  }

  function closePopup(popupBlock) {
    // let overlay = overlayBlock || pageOverlay;
    var popup = globFunc.returnDOM(popupBlock);
    
    popup.classList.remove("js_animate");
    // additionalClass ? hideOverlay("popup", overlay, additionalClass) : hideOverlay("popup", overlay);
  }

  // -------Events--------  

  $('body').on(touchEvent, '#pageOverlay', function() {
    globFunc.hideOverlay("popup", this, additionalClassStr);

    if (modals) {
      for (var i = 0; i < modals.length; i++) {
        modals[i].classList.contains('js_open') ? closePopup(modals[i]) : null;
      }       
    }
  });
   
  $('body').on(touchEvent, 'button.popupCloseButton', function() {
    closePopup( $(this).closest('.popup') );
    globFunc.hideOverlay("popup", pageOverlay, additionalClassStr);
  });

  $('body').on(touchEvent, '.popup', function(e) {
    if (e.target.classList.contains('popup')) {
      closePopup( e.target );
      globFunc.hideOverlay("popup", pageOverlay, additionalClassStr);
    }
  });

  window.onkeydown = function (e) {
    if (e.keyCode === 27 ) {
      if (pageOverlay) {
        pageOverlay.classList.contains('js_open') ? globFunc.hideOverlay("popup", pageOverlay, additionalClassStr) : null;
      }

      if (modals) {
        for (var i = 0; i < modals.length; i++) {
          modals[i].classList.contains('js_open') ? closePopup(modals[i]) : null;
        }       
      }
    }
  };

  // ------------

  return {
    openPopup: openPopup,
    closePopup: closePopup,
  }

})();

// glob.PopupModule()

// (function() {



// }).call(glob.PopupModule.prototype)