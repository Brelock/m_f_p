<template functional>
	<!-- <client-only> -->
		<VueSlickCarousel class="slider mainSlider"
			v-bind="props.sliderSettings">
			<div class="slide" v-for="slide in props.slides" :key="`banner_slider-${slide.id}`">
				<div class="slideContent">
					<div class="content-container relative">
						<a href="#" class="absolute stretch overlay-link"></a>
						<!-- <div class="darkOverlay"></div> -->
						<!-- <div class="inlineImg lazyBlock" data-src="/img/banner1.jpg"></div> -->
						<LazyImage
							inline big pattern
							@onInit="d => listeners.event('lazyImgInit', d)"
							@onReady="d => listeners.event('lazyImgReady', d)"
							:src="slide.picture_file_name"
						/>
						<!-- <div class="inlineImg"
							:style="{'background-image': `url(${slide.picture_file_name})`}"
						> -->
						<!-- </div> -->
						<!-- <div class="more-button standardButton secondary">ПОДРОБНЕЕ</div> -->
					</div>
						
				</div>
			</div>
		
			<template #prevArrow="arrowOption">
				<button class="slick-prev slick-arrow" aria-label="prev" type="button"><i></i></button>
			</template>
			<template #nextArrow="arrowOption">
				<button class="slick-next slick-arrow" aria-label="next" type="button"><i></i></button>
			</template>
		</VueSlickCarousel>
	<!-- </client-only> -->
</template>

<script>

export default {
	// mixins: [eventHandler],

	functional: true,
	/*components: {
		ProductCard: () => import('@/components/products/ProductCard.vue'),
	},*/
	props: {
		// filters: Object,
		// itemsLoading: Boolean,
		slides: {
			type: Array,
			default: () => ([])
		},
		sliderSettings: {
			type: Object,
			default: () => ({
				// rtl: document.body.hasAttribute('rtl'),
				// rtl: true,
				dots: true,
				arrows: true,
				// dotsClass: 'slick-dots categories-navbar',
				edgeFriction: 0.35,
				infinite: true,
				speed: 1500,
				slidesToShow: 1,
				slidesToScroll: 1,
				autoplay: true,
				autoplaySpeed: 6000,
			})
		},
	},
};
</script>
