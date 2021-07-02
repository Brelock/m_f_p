class myFullpage {

	constructor(containerName) {
		this.container = document.querySelector(containerName);
		this.scrollByWheel = true;
		this.timer = null;
		// this.timerScroll = null;
		// this.eventsQuantity = 0;
		this.sectionsQuerrySelector = '.section';
		this.sectionsList = [];
		this.currentSection = null;
		this._events = {
			init: {
				callback: () => { }
			},
			changeSection: {
				callback: () => { }
			}
		};
		this.isWheelActive = false;
		this.moveToIsActive = false;
		// this.isHandleWheelActive = false;

	}

	on(name, listener) {
		if (!this._events[name]) {
			this._events[name] = {};
		}
		this._events[name].callback = listener;
		// this._events[name].push(listener);
	}

	removeListener(name, listenerToRemove) {
		if (!this._events[name]) {
			throw new Error(`Can't remove a listener. Event "${name}" doesn't exits.`);
		}

		const filterListeners = (listener) => listener !== listenerToRemove;

		this._events[name] = this._events[name].filter(filterListeners);
	}

	emit(name, data) {
		if (!this._events[name]) {
			throw new Error(`Can't emit an event. Event "${name}" doesn't exits.`);
		}

		const fireCallbacks = (callback) => {
			callback(data);
		};

		this._events[name].callback(data);
		// this._events[name].forEach(fireCallbacks);
	}

	// --------------

	initSectionsList() {
		// console.log('1', this)
		const sectionsList = document.querySelectorAll(this.sectionsQuerrySelector);
		for (let i = 0; i < sectionsList.length; i++) {
			let section = sectionsList[i];
			section.setAttribute('data-section-index', i);
		}
		return sectionsList;
	}

	init(settings = {}) {
		// const that = this;
		// function scrollEvent(e) {that.handleScroll(e);}
		// console.log($.bez);
		const { sectionsQuerrySelector, onInit, scrollByWheel } = settings;

		if (sectionsQuerrySelector) {
			this.sectionsQuerrySelector = sectionsQuerrySelector;
		}
		if (scrollByWheel != undefined) {
			this.scrollByWheel = scrollByWheel;
		}
		if (onInit) {
			// console.log(this._events['init'], onInit)
			this._events['init'].callback = onInit;
		}

		this.sectionsList = this.initSectionsList();

		// -----------
		// console.log('init', this)
		if (this.sectionsList.length) {
			if (this.scrollByWheel) {
				window.addEventListener('wheel', e => this.handleWheel(e), { passive: false })
			}
			this.setupScroll('on');
			// window.addEventListener('scroll', e => this.handleScroll(e), { passive: false })

			this.currentSection = this.getCurrentSection({fromLocalStorage:true});
			const currentIndex = this.currentSection.dataset.sectionIndex;
			this.emit('init', {
				prevIndex: currentIndex,
				sectionsQuantity: this.sectionsList.length
			});
		} else {

		}
	}

	getCoords(elem) {
		var box = elem.getBoundingClientRect();

		return {
			top: box.top + pageYOffset,
			// left: box.left + pageXOffset
		};
	}

	getCurrentSection(options) {
		const { sectionsList } = this;
		if (options && options.fromLocalStorage) {
			const activeIndex = localStorage.getItem('full_page_active_index') || 0;
			for (let i = 0; i < sectionsList.length; i++) {
				if (sectionsList[i].dataset.sectionIndex == activeIndex) {
					return sectionsList[i];
				}
			}
		} else {
			const y_offset = window.pageYOffset - 1;
			for (let i = 0; i < sectionsList.length; i++) {
				if (this.getCoords(sectionsList[i]).top >= y_offset) {
					return sectionsList[i];
				}
			}
		}
		
		return sectionsList[sectionsList.length - 1];
	}

	setupScroll(action) {
		const that = this;
		function scrollEvent(e) { that.handleScroll(e); }

		if (action == 'on') {
			// console.log('on')
			window.addEventListener('scroll', scrollEvent, { passive: true });
		} else {
			// console.log('off');
			window.removeEventListener('scroll', scrollEvent, { passive: true });
		}
	}

	// ====================

	navigateByWheel(wheelDeltaY) {
		let payload = {};

		if (wheelDeltaY > 0) {
			// payload.direction = this.eventsQuantity > 5 ? -2 : -1;
			payload.direction = -1;
		} else {
			payload.direction = 1;
		}

		// this.eventsQuantity = 0;

		this.moveTo(payload);
	}

	moveTo({ direction, to }) {
		this.setupScroll('off');
		this.moveToIsActive = true;
		// const that = this;
		// function scrollEvent(e) {that.handleScroll(e);}
		// window.removeEventListener('scroll', scrollEvent, {passive:false});

		this.currentSection = this.getCurrentSection();
		const currentIndex = this.currentSection.dataset.sectionIndex;
		let nextSection;
		let nextSectionIndex;

		if (to != undefined) {
			nextSection = this.sectionsList[+to];
		} else {
			nextSection = this.sectionsList[+currentIndex + direction];

			if (!nextSection) {
				direction = direction < 0 ? direction + 1 : direction - 1;
				nextSection = this.sectionsList[+currentIndex + direction];
			}
		}

		if (nextSection) {
			nextSectionIndex = nextSection.dataset.sectionIndex;

			this.emit('changeSection', { prevIndex: currentIndex, nextIndex: nextSectionIndex });
			// console.log(window.onscroll)

			$('html, body').animate({
				scrollTop: $(nextSection).offset().top + 1
			}, 600, $.bez([0.27, 0.74, 0.32, 1]));
			/* $('html, body').animate({
				scrollTop: $(nextSection).offset().top
			}, {
				// duration: 500,
				specialEasing: {
					transition: 'all 1s cubic-bezier(0.6, 0.1, 0.15, 0.8)',
				}
			}); */

			setTimeout(() => {

				this.isWheelActive = false;
				this.moveToIsActive = false;
				// this.setupScroll('on');

				// window.addEventListener('scroll', scrollEvent, {passive:false});
			}, 650);
		}
	}


	handleWheel(e) {
		e.preventDefault();
		if (this.isWheelActive) return;
		this.isWheelActive = true;

		/*$('html, body').animate({
			scrollTop: $(this.sectionsList[8]).offset().top
		}, 500);*/



		// this.isHandleWheelActive = true;
		// console.log('wheel')
		const { wheelDeltaY } = e;

		// this.eventsQuantity++;
		if (this.timer) { clearTimeout(this.timer); }

		this.timer = setTimeout(() => {
			this.timer = null;
			// console.log('wheel ')

			// this.isWheelActive = true;
			// this.isHandleWheelActive = false;
			this.navigateByWheel(wheelDeltaY);
		}, 100);
	}

	handleScroll(e) {
		// e.preventDefault();
		if (this.isWheelActive || this.moveToIsActive) return;

		// console.log('scroll')
		// if (this.timerScroll) { clearTimeout(this.timerScroll); }

		// this.timerScroll = setTimeout(() => {
		// this.timerScroll = null;

		// console.log( this.isWheelActive )
		// console.log('scroll', this.isWheelActive)

		this.currentSection = this.getCurrentSection();
		const currentIndex = this.currentSection.dataset.sectionIndex;
		this.emit('scrollEvt', { prevIndex: currentIndex });

		// }, 50);
	}

	/*handleScroll(e) {
		e.preventDefault();
		if ( this.isWheelActive ) return;

		// console.log('scroll')
		if (this.timerScroll) { clearTimeout(this.timerScroll); }

		this.timerScroll = setTimeout(() => {
			this.timerScroll = null;
			
			// console.log( this.isWheelActive )
			// console.log('scroll', this)

			this.currentSection = this.getCurrentSection();
			const currentIndex = this.currentSection.dataset.sectionIndex;
			this.emit('scrollEvt', {prevIndex:currentIndex});

		}, 100);
	}*/
}