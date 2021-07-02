(function () {  
    if ( ! $('.modal-custom').length ) return;

    const $bt = $('.icon-popup');

    const $modalBlock = $('.modal-custom')
    const $btnOverlay =  $modalBlock.find('.modal-custom__overlay');
    const $btnBasketClose = $modalBlock.find('.modal-custom__close-btn');
    
    $bt.click(function () {  
        $modalBlock.show()
    })
   
    $btnBasketClose.click(function () {  
        $modalBlock.hide()
    })

    $btnOverlay.click(function () {  
       $modalBlock.hide()
    })

})();

// contact - us 
(function () {  
    if ( ! $('.contact-us').length ) return;

    const $bt = $('.contact-us');

    const $modalBlock = $('.contact-us-modal')
    const $btnOverlay =  $modalBlock.find('.contact-us-overlay');
    const $btnBasketClose = $modalBlock.find('.modal-custom__close-btn');
    
    $bt.click(function () {  
        $modalBlock.addClass('active')
        // $modalBlock.show()
    })
   
    $btnBasketClose.click(function () {  
        $modalBlock.removeClass('active')
        // $modalBlock.hide()
    })

    $btnOverlay.click(function () {  
        $modalBlock.removeClass('active')
        // $modalBlock.hide()
    })

})();


