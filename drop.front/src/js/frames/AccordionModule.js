glob.AccordionModule  = (function() {
	
	function toggleContent(options, button, targetBlock, allTargetBlocks) {
		let subMenuParents = button ? findAllParents(button, 'submenuWrapper') : null;
		let targetHeight = targetBlock ? targetBlock.firstElementChild.offsetHeight : null;


		function findAllParents(element, searchClass) {
			var finded = false;
			var currentElement = element, findingElements = [];
			try {
				while(!finded) {
			
					var parent = currentElement.parentElement;

					if ( parent.classList.contains(searchClass) ) {
						findingElements.push(parent);
					} else if (parent.classList.contains('mainSubmenuWrapper')) {
						finded = true;
						findingElements.push(currentElement.parentElement);
						break;
					} else if (parent.classList.contains('accordionMenu')) break;
					currentElement = parent;
				}				
			} catch(error) {console.log(error)}

			
			return findingElements;
		}

		function resetDropDown(targetElements) {
			for (let i = 0; i < targetElements.length; i++) {
				targetElements[i].parentElement.classList.remove('active');
				targetElements[i].style.height = "";
			}
		}

		function closeSiblings(button, targetElements) {
			for (let i = 0; i < targetElements.length; i++) {
				let button = targetElements[i].parentElement
				if (button.classList.contains('active') ) {
					button.classList.remove('active');
					targetElements[i].style.height = "0px";
				}
				
			}
		}

		function dropDown(button, targetElement, subMenuParents) {
			if ( button.checked || button.classList.contains('active') ) {
				if (subMenuParents.length) {
					for (var i = 0; i < subMenuParents.length; i++) {
						subMenuParents[i].style.height = subMenuParents[i].offsetHeight + targetHeight + 'px';
					}
				}
				targetElement.style.height = targetHeight + 'px'
			} else {			 
				targetElement.style.height = "0px";
				for (var i = 0; i < subMenuParents.length; i++) {
					subMenuParents[i].style.height =  subMenuParents[i].offsetHeight - targetHeight + 'px';
				}
			}
		}


		switch (options  || 'default') {

			case 'withSiblings': 
				closeSiblings(button, allTargetBlocks);
				dropDown(button, targetBlock, subMenuParents);
			break;

			case 'withoutSiblings': dropDown(button, targetBlock, subMenuParents); break;

			case 'resetDropDown': resetDropDown(allTargetBlocks); break;


			default: console.error('no correct option typed in toggleContent function');

		}

	}
    
// ------------

	return {
		toggleContent: toggleContent,
	}

})()