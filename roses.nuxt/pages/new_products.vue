<template>
	<div class="page relative">
		<section class="pageSection view-content"> 
			<ProductsPage	:title="$t('temporary.new_products')" :withoutCategoryFilters="true"
				:initialOpenItemsList="['price']"
			/>
		</section>

		<ServicesSection :i18n="$i18n"/>

	</div>
</template>

<script>	  
	import { mapState, mapActions } from 'vuex';
	import { getSeoLink } from "@/helpers";
	import { seoMixin } from '@/mixins';


	export default {
		name: 'new-products',
		mixins: [seoMixin],

		components: {
			ProductsPage: () => import('@/components/products/ProductsPage.vue'),
			ServicesSection: () => import('@/components/ServicesSection.vue')			
		},
		computed: {
			...mapState({
				products_filters: (state) => state.products.filters				
			}),

			instancePropName: () => 'seo_data',

			seo_data() {
				return {
					title_ru: this.$t('temporary.new_products'),
					title_he: this.$t('temporary.new_products'),
					seo_description_ru: this.$t('temporary.new_products'),
					seo_description_he: this.$t('temporary.new_products'),
				}
			},		
		},

		async fetch({store, route}) {
			await store.dispatch('seo/fetch_meta_tags', {
				params:	{redirect_uri: getSeoLink(route) }
			});

			if (store.state.categories.menuCategoriesList.length < 1) {
				await store.dispatch('categories/fetch_menu_data', {
					params:	{ max: -1, withChildren:true }
				});
			}
		},

		methods: {
			...mapActions({
				set_products_filters: "products/set_filters",
			}),
		},

		created() {
			this.set_products_filters({ ...this.products_filters, hasNew: true });
		},

		beforeDestroy() {
			let newFilters = { ...this.products_filters };
			delete newFilters.hasNew;
			this.set_products_filters(newFilters);

			// console.log('destr')
		}
	}	
</script>