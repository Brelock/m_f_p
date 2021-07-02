(function () {  
    if ( ! $('.modal-custom').length ) return;

    const $bt = $('.modal-custom-open-btn');

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
