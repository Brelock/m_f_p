<template>
	<!-- <client-only> -->
		<div class="sliderContainer">
			<!-- <div> -->
			<VueSlickCarousel
				class="productsSlider"
				v-bind="productsSliderSettings"
			>
				<div
					class="slide"
					v-for="slide in slides"
					:key="`prod_slider-${typeName}-${slide.id}`"
				>
					<div class="product-item card-item">
						<ProductCard
							:productItem="slide"
							@event="handleEvent"
							@localePath="localePath"
						/>
							<!-- :i18n="$i18n" -->
					</div>
				</div>

				<template #prevArrow="">
					<button class="" type="button"><i></i></button>
				</template>
				<template #nextArrow="">
					<button class="" type="button"><i></i></button>
				</template>
			</VueSlickCarousel>
			<!-- </div> -->

			<div class="operationsBlock">
				<span class="currentSlide"></span>
				<span class="totalSlides"></span>
			</div>
		</div>
	<!-- </client-only> -->
</template>

<script>
// import { eventHandler } from '@/mixins';

export default {
	// mixins: [eventHandler],

	// functional: true,
	components: {
		ProductCard: () => import("@/components/products/ProductCard.vue"),
	},
	props: {
		// filters: Object,
		// itemsLoading: Boolean,
		typeName: String,
		slides: {
			type: Array,
			default: () => [],
		},
		productsSliderSettings: {
			type: Object,
			default: () => ({
				dots: false,
				arrows: true,
				slidesToShow: 5,
				slidesToScroll: 1,
				autoplay: true,
				speed: 800,
				autoplaySpeed: 4500,
				responsive: [
					{
						breakpoint: 1400,
						settings: {
							// arrows: false,
							slidesToShow: 4,
							slidesToScroll: 1,
						},
					},
					{
						breakpoint: 992,
						settings: {
							// arrows: false,
							slidesToShow: 3,
							slidesToScroll: 1,
						},
					},
					{
						breakpoint: 768,
						settings: {
							// arrows: false,
							slidesToShow: 2,
							slidesToScroll: 1,
						},
					},
					{
						breakpoint: 450,
						settings: {
							// arrows: false,
							slidesToShow: 1,
							slidesToScroll: 1,
						},
					},
				],
			}),
		},
	},

	methods: {
		handleEvent(eventName, data) {
			this.$emit("event", eventName, data);
		},
	},

	mounted() {
		// console.log(this.slides)
		// this.$emit('mounted');
	},
};
</script>

<style lang="scss">
.productsSlider {
	.slick-track {
		display: flex;
	}

	.slide {
		height: 100%;
	}

	.slick-slide {
		display: flex !important;
		&,
		& > div,
		.slideContent {
			height: inherit;
			width: 100%;
		}
		
	}
}
</style>
