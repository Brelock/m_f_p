<template>
	<div class="page relative">

		<!-- <div class="" v-if="contentReady"> -->
			<section class="pageSection view-content" v-if="pageType.alias == 'categories'"
				key="CategoryPage">
				<CategoryPage	
					:containerName="containerName"
				/>
			</section>

			<section class="pageSection view-content" v-if="pageType.alias == 'products'"
				key="ProductPage">
				<ProductPage 
					:containerName="containerName"
				/>
			</section>

			
		<!-- </div> -->
		<!-- <transition name="component-fade" mode="out-in"> -->
			
		<!-- </transition> -->

		<!-- <transition name="component-fade" mode="out-in"> -->
			
			
			<!-- <div class="pageSection view-content" v-else></div> -->
		<!-- </transition>		 -->

		<!-- <SubscribeSection/> -->

		<ServicesSection :i18n="$i18n"/>

		<client-only>
			<SimpleSpinner :active="!contentReady || contentIsLoad" big 
				:noTransparent="true" :spinnerFixed="true"
			/>
		</client-only>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex';	
	// import { seoMixin } from '@/mixins';

	import { getPageType, getSeoLink, getAlias } from '@/helpers';
	import { fetch_category, fetch_product } from '@/services/api_helpers';

	export default {
		name: 'catalog',
		// mixins: [seoMixin],
		components: {
			CategoryPage: () => import('@/components/categories/CategoryPage.vue'),
			ProductPage: () => import('@/components/products/ProductPage.vue'),
			// SubscribeSection: () => import('@/components/SubscribeSection.vue'),
			ServicesSection: () => import('@/components/ServicesSection.vue')			
		},

		validate({params, store}) {
			let pageType = getPageType(params, 'catalog');
			if (pageType) {
				// console.log('validate: ', pageType.alias)				
				store.dispatch('global/set_page_type', pageType);
			}
			// console.log(!!pageType)
			
			return !!pageType;
			// return false
		},

		async fetch(context) {
			try {
				// throw new Error()				
				// console.log(context)
				const {store, route} = context;
				const { categories, global } = store.state;
				// console.log(!global.catalog_contentReady)
				if (!global.catalog_contentReady) {

					// console.log('async fetch', route)
					await store.dispatch('seo/fetch_meta_tags', {
						params:	{redirect_uri: getSeoLink(route) }
					})
					// .then(e => {console.log(e)});

					if (categories.menuCategoriesList.length < 1) {
						await store.dispatch('categories/fetch_menu_data', {
							params:	{ max: -1, withChildren:true }
						});
					}

					const alias = getAlias( route.params['catalog'] );

					if (alias) {
						const payload = {
							itemAlias: alias, notNotifyError: true, notSetToStore: true
						};

						if (store.state.global.page_type.alias == 'categories') {
							await fetch_category(payload, store);
						} else if (store.state.global.page_type.alias == 'products') {
							await fetch_product(payload, store);
						}
					}
				}
			} catch(e) {
				console.log(e)
				// error({ statusCode: 404, message: 'Page not found' });
			}
		},

		computed: {
			...mapState({
				pageType: state => state.global.page_type,
				contentReady: state => state.global.catalog_contentReady,
				contentIsLoad: state => state.global.catalog_content_isLoad,
			}),
			containerName: () => 'catalog',

			instancePropName() {
				if (this.$store.state.global.page_type.alias == 'categories') {
					return 'categoryItem';
				} else if (this.$store.state.global.page_type.alias == 'products') {
					return 'productItem';
				}
			}
		},

		methods: {
			...mapActions({
				set_catalog_content_ready: 'global/set_catalog_content_ready',
				set_category: 'categories/set_category',
				set_product: 'products/set_product',
			})
		},

		watch: {
			/*contentReady(isReady) {
				console.log('contentReady: ', isReady)
			},*/

			'$route'(route) {
				// console.log('route: ', route.path);
				// this.set_catalog_content_ready(false);

				const alias = getAlias( route.params['catalog'] );
				
				if (alias) {
					const payload = { 
						itemAlias: alias, notNotifyError: true, notSetToStore: true
					};

					if (this.pageType.alias == 'categories') {
						this.set_category(null);
						fetch_category(payload, this.$store);
					} else if (this.pageType.alias == 'products') {
						this.set_product(null);
						fetch_product(payload, this.$store);
					}
				}
			}
		},

		created() {
			// console.log('created catalog');
			// this.$router.push({path:'/error', params: { statusCode: 404, message: 'Page not found' } })
		},

		/*mounted() {
			console.log('beforeMount catalog', this.categoryItem);
			// this.set_catalog_content_ready(false);
		},*/

		beforeDestroy() {
			this.set_catalog_content_ready(false);
			// console.log('beforeDestroy catalog')
		}
	}	
</script>