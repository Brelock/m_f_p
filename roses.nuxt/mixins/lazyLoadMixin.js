import { activateScrollEvent, isInViewport, loadImage } from '@/helpers/domHelpers';

const lazyLoadMixin = {
	data() {
		return {
			lazyBlocks: [],
		};
	},

	methods: {
		lazyImgInit(data) {
			// console.log('lazyImgInit', data)
			this.lazyBlocks.push(data);
		},

		lazyImgReady(data) {
			// console.log('lazyImgReady', data)
			this.lazyBlocks = this.lazyBlocks.filter(lb => lb.uid != data.uid);
		},

		checkLazyBlocks() {
			for (let i = 0; i < this.lazyBlocks.length; i++) {
				this.lazyBlocks[i].checkLazy();
			}
		},

		onScroll() {
			this.checkLazyBlocks();
		}
	},

	mounted() {
		// this.checkLazyBlocks();
		activateScrollEvent(this.onScroll);
	}
};

export default lazyLoadMixin;
