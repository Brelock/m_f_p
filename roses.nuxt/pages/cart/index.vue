<template>
	<div class="cartPage page cart-category">
		
		<div class="empty-car not-found-page" v-if="!cartData || !cartData.orderProducts || !cartData.orderProducts.length">
			<div class="wrapper wrapper-full-page flex align-center justify-center">
				<div class="full-page">
					<div class="page-content">
						<h2 class="title page-title">{{$t('phrase.empty_cart')}}</h2>

						<div class="description">{{$t('phrase.empty_cart_description')}}</div>

						<div class="section-image basket-img">
							<img src="@/assets/img/basket.png" alt="404" />
						</div>

						<NuxtLink class="el-button standardButton primary" :to="localePath('/')">{{$t('menu.to_main')}}</NuxtLink>
					</div>
				</div>
			</div>
		</div>

		<client-only>
			<section class="pageSection " v-show="cartData && cartData.orderProducts && cartData.orderProducts.length">
				<div class="mcontainer ">
					<div class="sectionHeader sectionBlock">
						<BreadCrumbs :items="crumbs" :i18n="$i18n" @localePath="localePath"/>						

						<h1 class="page-title medium capitalize-first">{{$t('common.cart')}}</h1>
					</div>		

					<div class="sectionBlock relative view-content">
						<SimpleSpinner :active="isLoading" big />

						<div class="flex wrap main-section-block standard-form">
							
							<div class="formContentBlock mcol-xs-12 mcol-md-8 mcol-lg-9">
								<div class="flex-table cart-table"
									v-if="cartData && cartData.orderProducts"
								>

									<div class="tableBody">
										<CartItem :className="'tableRow'"
											@event="handleEvent"
											v-for="(order, idx) in cartData.orderProducts"
											:key="`order-${order.id}`"
											:itemIndex="`${idx+1}`"
											:itemData="order"
											:isSaving="isSaving"
										/>
									</div>
								</div>
							</div>

							<div class="resultBlock mcol-xs-12 mcol-md-4 mcol-lg-3">
								<div class="content-container">
									<div class="form-section ">
										<div class="formRow flex bottom">
											<span class="medium capitalize">{{$t('common.total')}}</span>
											<span class="total-price push-right relative" v-if="cartData && cartData.final_amount">
												<SimpleSpinner :active="isSaving" small />							
												<b v-text="`${cartData.final_amount}₪`"></b>
											</span>
										</div>

										<div class="formRow limitedWidthWrapper">
											<nuxt-link class="standardButton primary uppercase"
												:to="localePath('/checkout')"
												v-text="$t('phrase.checkout_order')">
											</nuxt-link>
										</div>

										<!-- <div class="formRow limitedWidthWrapper">
											<input type="text" class="" placeholder="Я знаю промокод">
										</div> -->
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</client-only>
	</div>  
</template>

<script>
	import { mapState, mapActions } from 'vuex';
	import { cloneDeep, findItemBy, getSeoLink } from '@/helpers';
	import { breadcrumbsFromPathMixin, eventHandler, seoMixin } from '@/mixins';
	
	export default {
		name: 'cart',
		mixins: [breadcrumbsFromPathMixin, eventHandler, seoMixin],

		components: {
			CartItem: () => import('./CartItem.vue'),			
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

		computed: {
			...mapState({
				cartData: state => state.cart.itemData,
				cookie_hash: state => state.auth.cookie_hash,
				isLoading: state => state.cart.isLoading,
				isSaving: state => state.cart.isSaving
			}),

			instancePropName: () => 'seo_data',

			seo_data() {
				return {
					title_ru: this.$t('common.cart'),
					title_he: this.$t('common.cart'),
					seo_description_ru: this.$t('common.cart'),
					seo_description_he: this.$t('common.cart'),
				}
			},
		},

		methods: {
			...mapActions({
				// fetch_cart: 'cart/fetch_cart',
				remove_from_cart: 'cart/remove_from_cart',
				set_cart: 'cart/set_cart',
			}),

			updateCartState({data}) {
				if (data && data.orderProduct) {
					const newCartData = {...this.cartData};
					const {item, index} = findItemBy('id', data.orderProduct.id, newCartData.orderProducts, {returnIndex:true} );

					const {	amount,	quantity, order } = data.orderProduct;
					newCartData.final_amount = order.final_amount;

					if (item) {
						const newItem = {
							...item,
							amount: amount,
							quantity: quantity,
						};

						newCartData.orderProducts[index] = newItem;

						// console.log(newCartData.orderProducts[index])
						this.set_cart(newCartData);
					}
				}
			},
		},
	}
	
</script>