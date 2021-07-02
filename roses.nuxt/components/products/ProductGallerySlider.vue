<template>
	<!-- <client-only> -->
		<div class="content-container">
			<div class="sectionBlock">
				<!-- :asNavFor="refs.sliderNav" -->
				<VueSlickCarousel
					class="slider productSliderTop"
					ref="sliderTop"
					@beforeChange="onBeforeChange"
					v-bind="sliderSettings"
				>
					<div
						class="slide"
						v-for="(picture, idx) in pictures"
						:key="`gallery_slider-${picture.id}`"
						@click="toggleImgDialog(idx)"
					>	
						<!-- <div class="absolute stretch"
						></div> -->
						<!-- slide №{{idx+1}} -->
						<LazyImage
							big inline 
							@onInit="(d) => event('lazyImgInit', d)"
							@onReady="(d) => event('lazyImgReady', d)"
							:picture_id="picture.id"
							:src="getProdImgSrc(picture)"
						/>
						<!-- <img :src="getProdImgSrc(picture)" alt="prod img error"> -->
					</div>

					<!-- <template #prevArrow="arrowOption">
							<button class="slick-prev slick-arrow" aria-label="prev" type="button"><i></i></button>
						</template>
						<template #nextArrow="arrowOption">
							<button class="slick-next slick-arrow" aria-label="next" type="button"><i></i></button>
						</template> -->
				</VueSlickCarousel>
			</div>

			<div class="sectionBlock navSliderBlock">
				<div class="navSliderWrapper">
					<!-- :asNavFor="refs.sliderTop" -->
					<client-only>
						<VueSlickCarousel
							class="nav-slider-container productSliderNav"
							ref="sliderNav"
							@init="onNavSliderInit"
							v-bind="navSliderSettings"
						>
							<div
								class="slide"
								v-for="picture in pictures"
								:key="`gallery_slider-${picture.id}`"
								@click="changeSlide"
							>
								<LazyImage 
									@onInit="(d) => event('lazyImgInit', d)"
									@onReady="(d) => event('lazyImgReady', d)"
									:src="getProdImgSrc(picture, null, 'picture_thumb_file_name')"
								/>
								<!-- <img :src="getProdImgSrc(picture)" alt="prod img error"> -->
							</div>

							<template #prevArrow="">
								<button
									class="slick-prev slick-arrow"
									aria-label="prev"
									type="button"
								>
									<i></i>
								</button>
							</template>
							<template #nextArrow="">
								<button
									class="slick-next slick-arrow"
									aria-label="next"
									type="button"
								>
									<i></i>
								</button>
							</template>
						</VueSlickCarousel>
					</client-only>
				</div>
			</div>

			<el-dialog title=""
				:append-to-body="true"
				:visible.sync="imgDialogOpen" :class="'imgDialog'"
				:center="true"
				top="15px"
			>
				<div class="imgDialogContainer">
					<button class="cycle-button prev" type="button" @click="changePreviewSlide('prev')"><i class="icomoon icon-arrow2"></i></button>

					<div :class="['img-container', {show: previewImgShow}]">
						<img :src="current_img_src" alt="img" >
					</div>

					<button class="cycle-button next" type="button" @click="changePreviewSlide('next')"><i class="icomoon icon-arrow2"></i></button>
				</div>
			</el-dialog>
		</div>
	<!-- </client-only> -->
</template>

<script>
import { getProdImgSrc, findItemBy } from "@/helpers";
import { eventHandler } from "@/mixins";

export default {
	// functional: true,
	mixins: [eventHandler],

	props: {
		// itemsLoading: Boolean,
		pictures: {
			type: Array,
			default: () => [],
		},
		sliderSettings: {
			type: Object,
			default: () => ({
				slidesToShow: 1,
				slidesToScroll: 1,
				edgeFriction: 0.35,
				infinite: true,
				arrows: false,
				swipe: false,
				touchMove: false,
				draggable: false,
				fade: false,
				speed: 200,
				// draggable: false,
				focusOnSelect: false,
				responsive: [
					{
						breakpoint: 991,
						settings: {	
							swipe: true,
							touchMove: true,
						}
					},
				]


				// fade: true,
				// asNavFor: '.plant-images-slider-nav',
				// waitForAnimate: false,
			}),
		},
		/*navSliderSettings: {
			type: Function,
			default: (slidesQuantity, refs) => {
				console.log(refs)
				return {
					slidesToShow: slidesQuantity > 4 ? 4 : slidesQuantity,
					slidesToScroll: 1,
					infinite: true,
					// asNavFor: '.plant-images-slider',
					waitForAnimate: true,
					dots: false,
					arrows: true,

					centerMode: false,
					focusOnSelect: true,

					// accessibility: false,
					responsive: [
						{
							breakpoint: 1440,
							settings: {	
								slidesToShow: slidesQuantity > 3 ? 3 : slidesQuantity,
							}
						},
						{
							breakpoint: 1280,
							settings: {	
								slidesToShow: slidesQuantity > 4 ? 4 : slidesQuantity,
							}
						},
						{
							breakpoint: 991,
							settings: {	
								slidesToShow: slidesQuantity > 3 ? 3 : slidesQuantity,
							}
						},
						{
							breakpoint: 500,
							settings: {
								slidesToShow: slidesQuantity > 2 ? 2 : slidesQuantity,
							}
						},
					]
				}
			}
		},*/

		/*getProdImgSrc: {
			type: Function,
			default: getProdImgSrc
		}*/
	},

	data: () => ({
		imgDialogOpen: false,
		current_img_src: '',
		previewImgShow: true,
		isMobile: false,

	}),

	computed: {
		/*showOverlay() {
			return this.$store.state.global.overlay;
		},*/

		getProdImgSrc: () => getProdImgSrc,
		refs() {
			return this.$refs;
		},

		slidesQuantity() {
			if (this.pictures) {
				return this.pictures.length;
			}
			return 0;
		},

		navSliderSettings() {
			return {
				slidesToShow: this.slidesQuantity > 4 ? 4 : this.slidesQuantity,
				// slidesToShow: this.slidesQuantity,
				slidesToScroll: 1,
				infinite: true,
				// asNavFor: '.plant-images-slider',
				waitForAnimate: true,
				dots: false,
				arrows: true,

				centerMode: true,
				focusOnSelect: true,

				// accessibility: false,
				responsive: [
					/*{
						breakpoint: 1440,
						settings: {	
							slidesToShow: this.slidesQuantity > 3 ? 3 : this.slidesQuantity,
						}
					},*/
					{
						breakpoint: 1281,
						settings: {
							slidesToShow: this.slidesQuantity > 3 ? 3 : this.slidesQuantity,
						},
					},
					/*{
						breakpoint: 991,
						settings: {	
							slidesToShow: this.slidesQuantity > 3 ? 3 : this.slidesQuantity,
						}
					},*/
					{
						breakpoint: 500,
						settings: {
							slidesToShow: this.slidesQuantity > 2 ? 2 : this.slidesQuantity,
						},
					},
				],
			};
		},
	},

	methods: {

		setPreviewImg(idx) {
			const picture = this.pictures[idx];

			if (picture) {
				this.previewImgShow = false;
				this.current_img_src = picture.picture_file_name;

				setTimeout(() => {
					this.previewImgShow = true;
				}, 400);
			}
		},

		toggleImgDialog(idx) {
			if (!this.isMobile) {
				this.setPreviewImg(idx);

				this.$store.dispatch('global/show_overlay', {	show: true, zIndex: 1010 });
				this.imgDialogOpen = true;
			}
		},

		changePreviewSlide(dir) {
			if (dir == 'next') {
				this.$refs.sliderTop.next();
			} else if (dir == 'prev') {
				this.$refs.sliderTop.prev();
			}
		},

		event(eventName, data) {
			this.$emit("event", eventName, data);
		},

		onNavSliderInit() {
			setTimeout(() => {
				this.onBeforeChange(0, 0);
			}, 10);
		},

		changeSlide({ currentTarget }) {
			// console.log(currentTarget)
			if (!currentTarget.classList.contains("js_mainSlideActive")) {
				const slide = currentTarget.parentElement.parentElement;
				const slideIndex = slide.dataset.index;

				let nextSlideIndex = slideIndex == this.slidesQuantity ? 0 : slideIndex;
				this.$refs.sliderTop.goTo(nextSlideIndex);
			}
		},

		onBeforeChange(currentId, nextId) {
			// console.log(currentId, nextId)
			if (document) {
				const sliderElement = document.querySelector(".productSliderNav");
				if (sliderElement) {
					const allNavSlides = sliderElement.querySelectorAll(".slide");

					for (let i = 0; i < allNavSlides.length; i++) {
						allNavSlides[i].classList.remove("js_mainSlideActive");
					}

					let nextClonedId = nextId + this.slidesQuantity;
					let nextNavSlideElement = sliderElement.querySelector(
						'.slick-slide[data-index="' + nextId + '"] .slide'
					);
					let clonedNextNavSlideElement = sliderElement.querySelector(
						'.slick-slide[data-index="' + nextClonedId + '"] .slide'
					);


					nextNavSlideElement.classList.add("js_mainSlideActive");
					if (clonedNextNavSlideElement) {
						clonedNextNavSlideElement.classList.add("js_mainSlideActive");
					}

					this.setPreviewImg(nextId);
				}
			}
		},
	},

	watch: {
		imgDialogOpen(isOpen) {
			if (!isOpen) {
				this.$store.dispatch('global/show_overlay', {	show: false });
			}
		}

	},

	beforeMount() {
		this.isMobile = document.documentElement.clientWidth < 992;
	},
};
</script>
