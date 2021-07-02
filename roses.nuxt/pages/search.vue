<template>
	<div class="page relative">
		<section class="pageSection view-content"> 
			<ProductsPage	:title="`${$t('temporary.search_results')}:`"
			:withoutCategoryFilters="true"/>
		</section>

		<ServicesSection :i18n="$i18n"/>

	</div>
</template>

<script>
	import { getSeoLink } from "@/helpers";
	import { seoMixin } from '@/mixins';

	export default {
		name: 'search',
		mixins: [seoMixin],
		
		components: {
			ProductsPage: () => import('@/components/products/ProductsPage.vue'),
			ServicesSection: () => import('@/components/ServicesSection.vue')			
		},

		computed: {
			instancePropName: () => 'seo_data',

			seo_data() {
				return {
					title_ru: this.$t('temporary.search_results'),
					title_he: this.$t('temporary.search_results'),
					seo_description_ru: this.$t('temporary.search_results'),
					seo_description_he: this.$t('temporary.search_results'),
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
		}
	}	
</script>