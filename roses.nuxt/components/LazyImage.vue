<template>
		<!-- @click="handleClick" -->
	<div class="imgWrapper" 
	>
		<transition name="overlay">
			<div class="img-preloader" v-if="!isReady">
				<div class="inlineImg" :style="{backgroundImage:`url('${mockSrc}')`}" v-if="pattern"></div>
				<img v-else :src="mockSrc" alt="" />
			</div>
		</transition>

		<div
			v-if="inline"
			alt="img"
			ref="img"
			:class="['inlineImg lazyBlock', { isReady: isReady }, {'pattern':pattern}]"
			:style="style"
		></div>

		<img
			v-else
			alt="img"
			ref="img"
			:class="['lazyBlock', { isReady: isReady }]"
			:src="correctSrc"
		/>
	</div>
</template>

<script>
import { mockImg, mockImgBig } from '@/constants/global';
import { isInViewport, loadImage } from '@/helpers/domHelpers';

export default {
	// functional: true,
	props: {
		inline: Boolean,
		big: Boolean,
		pattern: Boolean,
		src: {
			type: String,
			default: ''
		},
		picture_id: {
			type: Number,
			default: null
		}
	},

	data: () => ({
		isDisabled: false,
		isLoading: false,
		isReady: false,

		correctSrc: '',
		style: {
			backgroundImage: ''
		}
	}),

	computed: {
		mockImg: () => mockImg,
		mockImgBig: () => mockImgBig,
		mockSrc: (that) => (that.big ? that.mockImgBig : that.mockImg)
	},

	methods: {
		checkLazy() {
			const { img } = this.$refs;
			if (img && isInViewport(img)) {
				if (!this.src) {
					// console.log('!this.src')
					this.isReady = true;
					return;
				}

				if (!this.isReady && !this.isLoading) {
					this.loadImage(img);
				}
			}
		},

		loadImage(element) {
			this.isLoading = true;
			let img;

			if (element.tagName !== 'IMG') {
				img = new Image();
			} else {
				img = element;
			}
			// console.log(img);
			img.onload = () => {
				this.style.backgroundImage = `url('${this.correctSrc}')`;
				this.isLoading = false;
				this.isReady = true;
				// console.log("2", this.correctSrc, element);
			};
			img.onerror = () => {
				this.correctSrc = this.mockSrc;
				this.style.backgroundImage = `url('${this.mockSrc}')`;
				this.isLoading = false;
				this.isReady = true;
				// console.log("3", this.correctSrc, element);
			};

			if (element.tagName !== 'IMG') {
				img.setAttribute('src', this.src);
			}
			
			this.correctSrc = this.src;
			// console.log("1", this.correctSrc, element);
		},

		/*handleClick() {
			if (this.isReady) {
				this.$emit('onClick', this.picture_id);				
			}
		}*/
	},

	watch: {
		isReady(isReady) {
			if (!this.isDisabled && isReady) {
				this.$emit('onReady', { uid: this._uid });
			}
		}
	},

	created() {
		this.correctSrc = this.mockSrc;
		this.style.backgroundImage = `url('${this.mockSrc}')`;
	},

	mounted() {
		this.checkLazy();

		if (!this.isReady) {
			this.$emit('onInit', { uid: this._uid, checkLazy: this.checkLazy });
		} else {
			this.isDisabled = true;
		}
		// console.log(this._uid)
	}
};
</script>
