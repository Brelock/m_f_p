glob.SwitchTabsModule  = (function() {

	const defaultTabsButtons = document.querySelectorAll('.tabsNav .tabButton'),
	defaultTabsBlocksContainer = document.querySelector('.toggleBlocks-list'),
	defaultTabsBlocksList = document.querySelectorAll('.toggleBlock'),
	tabsButtonsScdry = document.querySelectorAll('.tabsNav-secondary .tab'),
	tabsBlocksListScdry = document.querySelectorAll('.toggleBlock-secondary');
	// $btnsSteps = $('.button-step-js'),
	// $tabBlockOrder = document.querySelectorAll('.step-tab');


	function switchTabs(tabButton, tabsBlocks, tabButtons) {
		let target = tabButton.dataset.target;
		if ( !tabButton.classList.contains('active') ) {
			for (let i = 0; i < tabsBlocks.length; i++) {
				tabButtons[i].classList.remove('active');
				tabsBlocks[i].classList.remove('active');

				if (target === tabsBlocks[i].id) {
					tabButton.classList.add('active'); 
					tabsBlocks[i].classList.add('active'); 
				} 

			}
		}
	}

	function swithcDisabledField(e, tabButton, tabs) {
		const $target = $(tabButton).data("target");

		$(tabs).each((idx, tab) => {
			const $tab = $(tab);
			const $fields = $tab.find('input, select');
			$fields.attr('disabled', true);

			if ($target === $tab.attr('id')) {
				$fields.attr('disabled', false);
			}
		});
	}

	// function toggleOrderTab() {
	// 	$btnsSteps.on('click', function() {
	// 		let target = $(this).data('target');
			
	// 		for (let i = 0; i < $tabBlockOrder.length; i++) {
	// 			$tabBlockOrder[i].classList.remove('active');

	// 			if (target === $tabBlockOrder[i].id) {
	// 				$tabBlockOrder[i].classList.add('active'); 
	// 			} 
	// 		}
	// 	});
	// }

  // ---events---

  $('.tabsNav').on('click', '.tabButton', function() {
  		var tabsGroup = document.getElementsByClassName(this.dataset.tabsGroup)
  		var tabButtons = this.parentElement.getElementsByClassName('tabButton')
  		var tabsBlocksContainer = this.parentElement.parentElement.getElementsByClassName(this.dataset.tabsContainer)[0]

  		// console.log(tabButtons)
			// console.log(tabsBlocksContainer)
  		if (tabsGroup.length) {	switchTabs(this, tabsGroup, tabButtons);}
  		else { switchTabs(this, defaultTabsBlocksList, tabButtons);	}

  		if (tabsBlocksContainer) { globFunc.animateBlock(tabsBlocksContainer);}
  		else { globFunc.animateBlock(defaultTabsBlocksContainer);}	  		
	})
	
	for (let i = 0; i < tabsButtonsScdry.length; i++) {
		// console.log('---', tabsButtonsScdry[i]);
		tabsButtonsScdry[i].onclick = function (e) {
			switchTabs(this, tabsBlocksListScdry, tabsButtonsScdry);
			swithcDisabledField(e, this, tabsBlocksListScdry);
		}
	}

	// if ( $btnsSteps.length )
	// 	toggleOrderTab();

})();