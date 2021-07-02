<template>
	<div class="categoriesPage">
		<section class="pageSection no-padding">
			<div class="mcontainer">
				<div class="sectionHeader">
					<BreadCrumbs
						:items="breadcrumbs"
						:i18n="$i18n"
						@localePath="localePath"
					/>

					<h1
						class="page-title"
						v-text="category[`title_${locale}`]"
					></h1>
				</div>
			</div>
		</section>

		<section class="pageSection">
			<div class="mcontainer">
				<div class="mrow">
					<div class="content-container">
						<div class="flex wrap mrow">
							<div
								class="card-item category-item shadowedCard top-animation-hover mcol-xs-12 mcol-sm-4 mcol-md-3 mcol-lg-20"
								v-for="item in category.children"
								:key="`category-${item.id}`"
							>
								<div class="item-container">
									<div class="image-block relative">
										<nuxt-link
											:to="
												localePath({
													name: 'catalog',
													params: { catalog: `c_${item.alias}` },
												})
											"
											class="overlay-link absolute stretch"
										/>

										<LazyImage
											inline
											@onInit="lazyImgInit"
											@onReady="lazyImgReady"
											:src="item.picture_file_name"
										/>
									</div>

									<div class="content-container">
										<h4 class="title card-title ellipsis">
											<nuxt-link
												:to="
													localePath({
														name: 'catalog',
														params: { catalog: `c_${item.alias}` },
													})
												"
												>{{ item[`title_${locale}`] }}</nuxt-link
											>
										</h4>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
import { getProdImgSrc, getLocaleCode } from "@/helpers";

import {
	eventHandler,
	breadcrumbsMixin,
	lazyLoadMixin,
	seoMixin
} from "@/mixins";

export default {
	name: "CategoriesPage",

	mixins: [eventHandler, breadcrumbsMixin, lazyLoadMixin, seoMixin],
	/*components: {
			// ProductsSlider: () => import('@/components/products/ProductsSlider.vue'),
			// SubscribeSection: () => import('@/components/SubscribeSection.vue'),
		},*/

	props: {
		category: {
			type: Object,
			required: true,
		},
		// itemsList: Array,
	},

	computed: {
		instancePropName: () => 'category',
		// getLocaleCode: () => getLocaleCode,
		locale() {
			return getLocaleCode(this.$i18n.locale);
		},

		getProdImgSrc: () => getProdImgSrc,
	},

	methods: {
		getBGImg(fileName) {
			let url = fileName || require("@/assets/img/mock_img.jpg");
			return { "background-image": `url(${url})` };
		},

		handleEvent(eventName, data) {
			this.$emit("event", eventName, data);
		},
	},

	/*beforeMount() {
		// console.log('categories page: ', this.instancePropName);
	},*/
};
</script>