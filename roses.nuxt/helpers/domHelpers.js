const dropDown = (e, { onlyMobile, recalculateHeight, target, timeout }) => {
	// button, targetBlock, parentBlock
	// console.log(e)
	if (onlyMobile) {
		if ( document.documentElement.clientWidth > 991 ) {
			return;
		}
	}

	if (recalculateHeight) {
		setTimeout(function() {
			const targetBlock = document.getElementById(target);
			const newHeight = targetBlock.firstElementChild.offsetHeight;
			targetBlock.style.height = newHeight + 'px';
		}, timeout || 0);
		return;
	}

	const button = e.currentTarget;
	const options = e.currentTarget.dataset;
	const targetBlock = document.getElementById(target || options.target);
	// console.log(options)

	if (button.checked || button.classList.contains('active')) {
		targetBlock.style.height = "0px";
		button.classList.remove('active');

		if (options.text) {
			button.querySelector('.buttonText').textContent = options.text;
		}
		/*if (parentBlock) {
			parentBlock.style.height = parentBlock.offsetHeight + newHeight + 'px';
		}*/
	} else {
		button.classList.add('active');

		if (options.textActive) {
			button.querySelector('.buttonText').textContent = options.textActive;
		}

		const newHeight = targetBlock.firstElementChild.offsetHeight;
		targetBlock.style.height = newHeight + 'px';
		// console.log(targetBlock, newHeight)
		// const newHeight = targetBlock.firstElementChild.offsetHeight;

		/*if (parentBlock) {
			parentBlock.style.height = parentBlock.offsetHeight - newHeight + 'px';
		}*/
	}
};

const animateBlock = (selector) => {
	const block = document.querySelector(selector);
	if (block) {
		if (block.classList.contains('js_animate')) {
			block.classList.remove('js_animate');
		}
		setTimeout(() => {
			if (!block.classList.contains('js_animate')) {
				block.classList.add('js_animate');
			}
		}, 50);
	}
};

const toggleSubMenu = ({target}) => {
	console.log(1)
	if (document.documentElement.clientWidth < 992) {
		const submenu = target.parentElement.nextElementSibling;
		submenu.classList.contains('js_showSlide') ? 
			null : submenu.classList.add('js_showSlide');
			const prevButton = document.getElementById('prevMenuButton');

			prevButton.classList.contains('js_show') ? null : prevButton.classList.add('js_show');
	}
};

const stepBack = () => {
	const openSubs = document.getElementById('navMenuWrapper').getElementsByClassName('js_showSlide');
	const prevButton = document.getElementById('prevMenuButton');

	if (openSubs.length) {
		openSubs[openSubs.length-1].classList.remove('js_showSlide')
	}
	if (openSubs.length < 1) {
		prevButton.classList.contains('js_show') ? prevButton.classList.remove('js_show') : null;			
	}
};

/*const scrollTo = (element, to, duration) => {
	console.log(element, to)
	if (duration <= 0) return;
	var difference = to - element.scrollTop;
	var perTick = difference / duration * 10;

	setTimeout(function() {
			element.scrollTop = element.scrollTop + perTick;
			if (element.scrollTop === to) return;
			scrollTo(element, to, duration - 10);
	}, 10);
};*/

const scrollTo = (to, position = 'center') => {
	const el = document.getElementById(to);
	if (el) {
		el.scrollIntoView({behavior: 'smooth', block: position});
	}
};

const activateScrollEvent = callbackFunction => {
	var timer = null;

	window.addEventListener('scroll', () => {
		if (timer) {clearTimeout(timer);}
			timer = setTimeout(function() { 
				timer = null;
				// console.log()
				callbackFunction();

			}, 50);
	}, false);
};

const isInViewport = el => {
	let rect = el.getBoundingClientRect();
	
	return (
		rect.bottom >= 0 && 
		// rect.right >= 0 && 
		rect.top <= (window.innerHeight || document.documentElement.clientHeight)
		// rect.left <= (window.innerWidth || document.documentElement.clientWidth)
	);
};

const loadImage = element => {
	if ( isInViewport(element) ) {
		element.setAttribute('isLoading', true);

		if (element.tagName !== 'IMG') {
			var img = new Image();
			var srcData = element.getAttribute('data-src');
			if (srcData) { 
				img.onload = function(){
					element.style.backgroundImage = 'url(' + img.getAttribute('src') + ')';
					loaded(element);
				};

				// element.removeAttribute('data-src');
				img.setAttribute('src', srcData); 
			}
		} else {
			let srcData = element.getAttribute('data-src');
			if (srcData){
				element.onload = function(){
					loaded(element);
				};

				element.setAttribute('src', srcData); 
				// element.removeAttribute('data-src');
			}
		}
	}
};

const loaded = el => {
	// el.removeAttribute('data-src');
	// el.classList.remove('lazyBlock');
	// let loader = el.parentElement.getElementsByClassName('imgPreloader')[0];
	// if (loader) loader.classList.add('js_fadeOut');
	el.classList.remove('isLoading');

	setTimeout(function() {
		el.classList.add('imgReady');
	}, 300);

	// cleanLazy()
};

export {
	dropDown,
	animateBlock,
	toggleSubMenu,
	stepBack,
	scrollTo,
	activateScrollEvent,
	isInViewport,
	loadImage
};
