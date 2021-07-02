(function () {  
    if ( ! $('.modal-question').length ) return;

    const $bt = $('.question__open-modals');

    const $modalBlock = $('.modal-question')
    const $btnOverlay =  $modalBlock.find('.modal-question__overlay');
    const $btnBasketClose = $modalBlock.find('.modal-question__btn');
    
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

(function () {  
    if ( ! $('.more-dateils').length ) return;

    const $bt = $('.more-dateils');

    const $modalBlock = $('.modal-discussion')
    const $btnOverlay =  $modalBlock.find('.modal-discussion__overlay');
    const $btnBasketClose = $modalBlock.find('.modal-discussion__btn');
    
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

