<template>
	<div class="">
		<!-- <client-only>
			<SimpleSpinner :active="itemLoading" big />
		</client-only> -->

		<!-- <transition name="component-fade" mode="out-in"> -->
			<div v-if="currentItem">
			
				<!-- <transition name="component-fade" mode="out-in"> -->
					<!-- :itemsList="currentItem.children" -->
					<CategoriesPage v-if="currentItem.countChildren" key="CategoriesPage"
						:category="currentItem"
					/>
					<ProductsPage v-else key="ProductsPage"
						:category="currentItem"
					/>
				<!-- </transition> -->
			</div>
		<!-- </transition> -->
	
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex';
	  
	export default {
		name: 'category',
		components: {
			CategoriesPage: () => import('./CategoriesPage.vue'),
			ProductsPage: () => import('@/components/products/ProductsPage.vue'),
		},

		/*props: {
			containerName: {
				type: String,
				required: true
			}
		},*/

		computed: {
			...mapState({
				currentItem: state => state.categories.itemData,
				// itemLoading: state => state.categories.isLoading,
				// pageType: state => state.global.page_type,
			}),
			// instancePropName: () => 'currentItem',
		},

		methods: {
			...mapActions({
				set_item: 'categories/set_category',
				// fetch_item: 'categories/fetch_category',
				// set_page_type: 'global/set_page_type',
			})
		},

		beforeDestroy() {
			// console.log('beforeDestroy CategoriesPage')
			// this.set_page_type('');
			if (!this.withoutClearItem) {
				this.set_item(null);
			}
		}

	}	
</script>