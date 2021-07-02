<template>
	<!-- <section class="productPage pageSection"> -->
	<div class="productPage">
		<div class="view-content">
			<client-only>
				<SimpleSpinner :active="itemLoading || !contentReady || contentIsLoad" big
					:noTransparent="true" :spinnerFixed="true"
				/>
			</client-only>

			<div class="pageSection" v-if="contentReady && !itemLoading && currentItem">
				<div class="mcontainer">
					<div class="sectionHeader sectionBlock">
						<BreadCrumbs :items="breadcrumbs" :i18n="$i18n" @localePath="localePath"/>

						<h1 class="page-title medium" v-text="currentItem[`title_${locale}`]"></h1>
					</div>

					<div class="sectionBlock content-container">
						<div class="flex wrap main-section-block">
							<div class="sliderBlock mcol-xs-12 mcol-sm-6 mcol-lg-4">
								<div v-if="!withoutAction && currentItem.action_state" 
									v-html="createActionBlock(currentItem.action_state)">
								</div>

								<ProductGallerySlider
									@event="handleEvent"
									v-if="currentItem.pictures && currentItem.pictures.length"
									:pictures="currentItem.pictures"
								/>
							</div>

							<div class="operationsBlock mcol-xs-12 mcol-lg-4">
								<div class="content-container">
									<div class="result-block contentRow">
										<div class="flex">
											<div class="price bold">
												<div class="oldPrice" v-if="currentItem.new_price">
													<span v-text="getPrice(currentItem.price, productQuantity)"/>
												</div>
												<!-- <div v-if="currentItem.new_price" class="difference">
												-{{getPrice(currentItem.price - currentItem.new_price, productQuantity)}}</div> -->

												<span class="final"
													v-text="getPrice(currentItem.new_price || currentItem.price, productQuantity)">
												</span>

											</div>
											<div class="quantity-input">				
												<el-input-number :min="1"
													v-model="productQuantity"
												/>
											</div>
										</div>
					
										<div class="buttonWrapper">

											<nuxt-link :to="localePath('/cart')" class="standardButton primary"
												v-text="$t('phrase.product_in_cart')"
												v-if="inCart"></nuxt-link>
											<button class="standardButton primary uppercase"
												@click="createOrder"
												v-else>{{ $t('common.buy') }}</button>
										</div>
									</div>
								</div>
							</div>
				 
							<div class="infoBlock medium mcol-xs-12 mcol-sm-6 mcol-lg-4">
								<div class="content-container">
									<div class="actions-block-list">
										<div class="action-block hit"
											v-if="currentItem.is_hit"
										>
											<span class="uppercase">{{ $t('temporary.hit') }}</span>
										</div>

										<div class="action-block new"
											v-if="currentItem.is_new"
										>
											<span class="uppercase">{{ $t('temporary.new') }}</span>
										</div>

										<div class="action-block discount"
											v-if="currentItem.discount"
										>
											<span>- {{getPrice(currentItem.price - currentItem.new_price, 1)}}</span>
										</div>
									</div>

									<div class="info-list contentRow">
										<div class="info-list__item">
											<span class="label">ID</span>: <span class="data" v-text="currentItem.code"></span>
										</div>

										<div class="info-list__item" 
											v-for="(group, key) in groupedAttributeOptionsByAttr"
											:key="`attr_item_group-${key}`"
										>
											<div class="attribute-title label"
												>{{group[0].attribute[`title_${locale}`]}}:
											</div>
											<ul class="options-list">
												<li class="options__item"
													v-for="(option, idx) in group"
													:key="`prod_option-${option.id}`"
													v-if="idx < 5">
														<span>{{option[`title_${locale}`]}}</span>{{idx != group.length-1 || idx == 4 ? ', ' : ''}}
												</li>
											</ul>
										</div>
									</div>
									
									<button type="button" class="allInfoButton contentRow medium scrollButton"
										@click="showAllAttributes"
									>{{$t('phrase.all_stats')}}</button>
									
									<div class="ratingBlock flex center spaceBetween contentRow">
										<ul class="rating-list"
											v-html="buildRating(+currentItem.ratingReviewsAvg)">
										</ul>

										<div class="comments-block">
											<button class="scrollButton"
												@click="showReviews"
											>
												<i class="icomoon icon-chat"></i>
												<span class="medium" v-text="productReviewsList.length"></span>
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="pageSection" v-if="contentReady && !itemLoading && currentItem">
				<div class="mcontainer">
					<div class="contentNavBar productTabsNavBar tabsNav flex wrap">
						<div
							v-for="tab in tabsList"
							:key="`tab_${tab.title}`"
							:class="['tabButton bold', { active: tab.prop == activeTab }]"
							@click="toggleTab(tab)"
							v-text="tab.title"
						></div>
					</div>

					<div class="toggleBlocks-list productTabsContainer" id="productTabsContainer" >
						<transition-group name="standard-fade" mode="out-in">
							<div class="productTab" v-show="activeTab == tabsList[0].prop" key="description-tab">
								<div class="description">
								  <h2 class="title tab-title medium" v-html="currentItem[`title_${locale}`]"></h2>

								  <div v-html="currentItem[`description_${locale}`]"></div>
								</div>
							</div>

							<div class="productTab" v-show="activeTab == tabsList[1].prop" key="attributes-tab">
									<div class="characteristics-category-list">
									  <div class="category-item" 
									  	v-for="(attr_group, idx) in groupedAttributeOptionsByAttrGroup_Attr"
									  	:key="`attr_group-${idx}`">
									    <div class="title title-description"
									    	v-text="attr_group[Object.keys(attr_group)[0] ][0].attribute[`attributeGroup_title_${locale}`]">
								    	</div>

								    	<div class="attribute__item" 
												v-for="attr_item in attr_group"
												:key="`attr_item-${attr_item[0].id}`"
											>
												<div class="attribute-title label semi-bold"
													>{{attr_item[0].attribute[`title_${locale}`]}}:
												</div>
												<ul class="options-list">
													<li class="options__item"
														v-for="(option, idx) in attr_item"
														:key="`prod_option-${option.id}`"
														v-if="idx < 5">
															<span>{{option[`title_${locale}`]}}</span>{{idx != attr_item.length-1 ? ', ' : ''}}
													</li>
												</ul>
											</div>
									  </div>
									</div>
							</div>

							<div class="productTab review-tab" v-show="activeTab == tabsList[2].prop" key="feedback-tab">
								<ProductReviews
									@fetchItems="fetchReviewsItems"
									:productItem="currentItem"
								/>
							</div>
						</transition-group>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue';

	import VueSlickCarousel from 'vue-slick-carousel';
	import 'vue-slick-carousel/dist/vue-slick-carousel.css';
	Vue.component('VueSlickCarousel', VueSlickCarousel);
	import isEmpty from 'lodash/isEmpty';
	
	import { mapState, mapActions } from 'vuex';
	import { /*initPageDataMixin,*/ tabsMixin, itemsFetchSetMixin, breadcrumbsMixin, lazyLoadMixin, eventHandler, seoMixin } from '@/mixins';
	import { createActionBlock, compareValues, groupBy, getLocaleCode, getPrice, buildRating } from '@/helpers';
	import { scrollTo } from '@/helpers/domHelpers';
	
	export default {
		name: 'product',
		mixins: [/*initPageDataMixin,*/ tabsMixin, itemsFetchSetMixin, breadcrumbsMixin, lazyLoadMixin, eventHandler, seoMixin],
		components: {
			ProductGallerySlider: () => import('./ProductGallerySlider.vue'),
			ProductReviews: () => import('@/components/products/ProductReviews.vue'),
		},

		props: {
			containerName: {
				type: String,
				required: true
			},
			withoutAction: Boolean
		},

		data() {
			return {
				productQuantity: 1,
				// contentReady: false
			};
		},

		computed: {
			...mapState({
				contentReady: state => state.global.catalog_contentReady,
				contentIsLoad: state => state.global.catalog_content_isLoad,

				currentItem: state => state.products.itemData,
				itemLoading: state => state.products.isLoading,
				productReviewsList: state => state.reviews.publishedReviewsList,
				cartData: state => state.cart.itemData,
			}),

			instancePropName: () => 'currentItem',			

			getPrice: () => getPrice,
			buildRating: () => buildRating,
			// getLocaleCode: () => getLocaleCode,

			isProductPage:() => true,

			category() {
				if (this.currentItem) {
					return this.currentItem.category
				}
			},
			
			locale() {
				return getLocaleCode(this.$i18n.locale);
			},

			inCart() {
				const { currentItem, cartData } = this;

				if (!!currentItem && !!cartData && !!cartData.orderProducts) {
					return cartData.orderProducts.some(op => op.product_id === currentItem.id);
				}
				return false;
			},

			tabsList: (that) => [
				{ title: `${that.$t('phrase.product_description')}`, prop: 'descriptionTabActive' },
				{ title: `${that.$t('common.stats')}`, prop: 'attributesTabActive' },
				{ title: `${that.$t('common.reviews')}`, prop: 'feedbackTabActive' }
			],

			createActionBlock: () => createActionBlock,
			
			sortedAttributeOptions() {
				if (this.currentItem) {
					const newList = [...this.currentItem.attributeOptions];

					return newList.sort(compareValues('display_order') );
				}
				return [];
			},

			groupedAttributeOptionsByAttr() {
				if (this.sortedAttributeOptions.length) {
					// console.log(groupBy( this.sortedAttributeOptions, 'attribute_id'))
					return groupBy( this.sortedAttributeOptions, 'attribute_id');
				}
				return [];
			},

			groupedAttributeOptionsByAttrGroup() {
				if (this.sortedAttributeOptions.length) {
					return groupBy(this.sortedAttributeOptions, 'attribute.attribute_group_id');
				}
				return [];
			},

			groupedAttributeOptionsByAttrGroup_Attr() {
				let result = [];

				if ( !isEmpty(this.groupedAttributeOptionsByAttrGroup) ) {
					for (const prop in this.groupedAttributeOptionsByAttrGroup) {
						const attr_group = this.groupedAttributeOptionsByAttrGroup[prop];

						if (attr_group.length) {
							result.push(groupBy(attr_group, 'attribute_id'));
						}
					}
					// return groupBy(this.sortedAttributeOptions, 'attribute.attribute_group_id');
				}
				return result;
			},
		},

		methods: {
			...mapActions({
				// fetch_item: 'products/fetch_product',
				set_item: 'products/set_product',
				fetch_published_reviews: 'reviews/fetch_published_reviews',
				set_published_reviews: 'reviews/set_published_reviews',
				create_order: 'products/create_order',				
			}),

			fetchReviewsItems(filters) {
				const newFilters = filters || { max: 10, page: 1 };
				const payload = { params: { ...newFilters, productId: this.currentItem ? this.currentItem.id: null }  };
				this.fetch_published_reviews(payload);
			},

			showAllAttributes() {
				this.toggleTab(this.tabsList[1]);
				scrollTo('productTabsContainer');
			},

			showReviews() {
				this.toggleTab(this.tabsList[2]);
				scrollTo('productTabsContainer');
			},

			createOrder() {
				const { currentItem, productQuantity, $fb, $gtag } = this;
				const payload = {data: {
					product_id: currentItem.id,
					quantity: productQuantity
				}};

				const price = getPrice(currentItem.new_price || currentItem.price, productQuantity, {valueOnly:true});

				$fb.fbq('track', 'AddToCart', {
					content_name: currentItem.title_ru,
					content_ids: [`${ currentItem.id}`],
					content_type: 'product',
					value: price,
					currency: 'ILS'
				});

				$gtag.event('add_to_cart', {
					// send_to: 'G-GG8L7SZD7W',
					currency: 'ILS',
					value: price,
					items: [{
						item_id: currentItem.id,
						item_name: currentItem.title_ru,
						item_category: currentItem.category && currentItem.category.title_ru,
						price: price,
						currency: 'ILS',
					}]
				});

				this.create_order(payload);
			},

			trackFBEvent(currentItem) {
				const { productQuantity, $fb } = this;

				if (currentItem) {
					// console.log(currentItem)
					// this.contentReady = true;
					$fb.fbq('track', 'ViewContent', {
						content_name: currentItem.title_ru,
						content_ids: [`${ currentItem.id}`],
						content_type: 'product',
						value: getPrice(currentItem.new_price || currentItem.price, productQuantity, {valueOnly:true}),
						currency: 'ILS'
					});
				}	
			}
		},

		watch: {
			currentItem(currentItem) {
				this.trackFBEvent(currentItem);				
			}
		},

		mounted() {
			// console.log('mounted product')
			// console.log(this.$gtag)
			this.trackFBEvent(this.currentItem);				

		},

		beforeDestroy() {
			// this.set_item(null);
			// this.cleanLists(['set_published_reviews'])
			// console.log('destroy product')
		}

	}	
</script>