<template>
	<div class="checkoutPage page cart-category">
		<client-only>
			<form action="/" name=checkout-form @submit.prevent="submit"
				class="pageSection ">
				<div class="mcontainer">
					<div class="sectionHeader sectionBlock">
						<BreadCrumbs :items="crumbs" :i18n="$i18n" @localePath="localePath"/>						
						
						<h1 class="page-title medium capitalize">{{$t('common.cart')}}</h1>
					</div>
				
					<div class="sectionBlock">
						<div class="flex wrap main-section-block ">
							<div class="formContentBlock standard-form mcol-xs-12 mcol-md-8 mcol-lg-9">
								<AuthTabsBlock justify inlineRemote
									className="form-section"
									:tabsList="tabsList"
									v-if="!authUser"
								/>

								<div v-else class="form-section content-container  mcol-xs-12 mcol-sm-6 mcol-md-4">
									<div class="title form-section-title">{{$t('phrase.contact_info')}}</div>

									<div class="formRow" v-text="authUser.first_name"></div>
									<div class="formRow" v-text="authUser.last_name"></div>
									<div class="formRow" >
										<input type="text" :placeholder="$t('form.phone')" v-model="formData.phone_number" required/>
									</div>
									<div class="formRow" v-text="authUser.email"></div>
								</div>

								<div class="content-container form-section relative">
									<CoverOverlay :active="!authUser"
										:z="250" lighten	@onClick="()=>{}"
									/>

									<div class="form-section">
										<div class="title form-section-title">{{$t('phrase.delivery_method')}}</div>

										<div class="formRow customCheckboxContainer flex wrap" >
											<div class="formElement mcol-xs-12 mcol-sm-4 mcol-md-3"
												v-for="item in deliveryTypesList"
												:key="`delivery_item-${item.id}`">
												<el-radio v-model="formData.delivery_type"
													:required="true" name="delivery_type"
													class=""
													:label="item.id">
													{{ item[`title_${locale}`] }}
												</el-radio>
											</div>
										</div>

										<div class="formRow delivery-group"
											v-show="formData.delivery_type === DELIVERY_TYPES.REGION">
											<div class="formRow mrow flex wrap">
												<div class="formBlock mcol-xs-12 mcol-sm-6  mcol-lg-4 relative wrapperBlock">
													<SimpleSpinner :active="deliveryRegionsLoading" small/>
													<el-select filterable
														:disabled="!deliveryRegionsList.length"
														v-model="formData.delivery_region_id"
														:placeholder="$t('form.choose_delivery_region')"
													>
														<el-option
															v-for="item in deliveryRegionsList"
															:key="'region_id-' + item.id"
															:label="item[`title_${locale }`] + ` - ${item.price}₪`"
															:value="item.id"
														/>
													</el-select>
												</div>
											</div>										
										</div>

									</div>

									<div class="form-section">
										<div class="title form-section-title">{{ $t('phrase.payment_method')}}</div>

										<div class="formRow customCheckboxContainer flex wrap" >
											<div class="formElement mcol-xs-12 mcol-sm-4 mcol-md-3"
												v-for="item in paymentsTypesList"
												:key="`payment_item-${item.id}`">
												<el-radio v-model="formData.payment_type"
													class=""
													:label="item.id">
													{{ item[`title_${locale}`] }}
												</el-radio>
											</div>
										</div>

										<div class="formRow payment-group"
											v-if="formData.payment_type === PAYMENTS_TYPES.CARD">
											<div class="mrow flex wrap">
												<div class="formBlock mcol-xs-12 mcol-sm-4 mcol-md-6 mcol-lg-4">
													<input type="text"
														required 
														v-model="formData.credit_card_number"
														:placeholder="$t('temporary.card_number')">
												</div>

												<div class="formBlock mcol-xs-4 mcol-lg-2">
													<el-select v-model="formData.credit_card_year"
														:placeholder="$t('temporary.year')"
													>
														<el-option
															v-for="item in yearsList"
															:key="'year_id-' + item.id"
															:label="item.title"
															:value="item.value"
														/>
													</el-select>
												</div>

												<div class="formBlock mcol-xs-4 mcol-lg-2">
													<el-select v-model="formData.credit_card_month"
														:placeholder="$t('temporary.month')"
													>
														<el-option
															v-for="item in monthList"
															:key="'month_id-' + item.id"
															:label="item[`title_${locale }`]"
															:value="item.value"
														/>
													</el-select>
												</div>

												<div class="formBlock mcol-xs-4 mcol-lg-2">
													<input type="password" placeholder="cvv"
														v-model="formData.credit_card_cvv"
														required 
													>
												</div>
											</div>
										</div>
									</div>

									<div class="form-section">
										<div class="title form-section-title">
											<span>{{ $t('phrase.order_comment')}}</span>
											<span class="higlight-primary">({{$t('phrase.order_comment_description')}})</span>
										</div>

										<div class="formRow">
											<textarea name="message"  rows="7" 
												v-model="formData.comment"
												:placeholder="`${$t('phrase.order_comment_description')}`">
											</textarea>                        
										</div>
									</div>
								</div>
							</div>

							<div class="resultBlock mcol-xs-12 mcol-md-4 mcol-lg-3 standard-form" v-if="cartData">
								<div class="content-container">
									<div class="form-section">
										<div class="title form-section-title">{{$t('phrase.order_list')}}</div>

										<div class="cart-list">
											<div class="list-item medium flex" 
											v-for="item in cartData.orderProducts"
											:key="`result_cart-${item.id}`">
												<div class="mcol-xs-3 imgWrapper">
													<img :src="getProdImgSrc(item.product.pictures[0],
															item.product.id, 'picture_thumb_file_name'
														)" alt="prod img error">
												</div>

												<div class="mcol-xs-9">
													<div class="name" v-text="item.product[`title_${locale}`]"></div>
													<div class="result">
														<span class="items-quantity" 
															v-text="`${item.quantity} шт. x`"></span>
														<span><b v-text="`${item.new_price || item.price}₪`"></b></span>
													</div>
												</div>
											</div>
										</div>
									</div>   

									<div class="form-section result-section">
										<div class="formRow ">
											<span class="medium muted">{{$t('common.summ')}}</span>
											<span class="total-price push-right">
												<b v-text="`${cartData.final_amount}₪`"></b>
											</span>
										</div>
										<div class="formRow">
											<span class="medium muted">{{$t('common.delivery')}}</span>
											<span class="total-price push-right">
												<b v-if="selectedDeliveryRegion"
													v-text="`${selectedDeliveryRegion.price}₪`">
												</b>
												<b v-else>0₪</b>
											</span>
										</div>
										<div class="formRow final-amount-row capitalize-first">
											<div class="medium ">{{$t('common.for_payment')}}</div>
											<div class="total-price push-right">
												<b v-text="`${getFinalPrice()}₪`"></b>
											</div>
										</div>

										<div class="formRow limitedWidthWrapper">
											<button :disabled="!authUser"
												type="submit" 
												:class="['standardButton primary uppercase',
												{'disabled': !authUser}]
												">{{$t('phrase.pay_order')}}</button>
										</div>

										<div class="formRow customCheckboxContainer eulaBlock">
											<!-- <el-checkbox v-model="isAgreedPersonalData">
												<span class="">{{$t('form.personal_data_approve')}}.</span>
											</el-checkbox> -->

											<!-- <input id="eula" type="checkbox" class="">
											<label for="eula"><span class="checkbox-label">Я согласен на обработку <a href="#">персональных данных</a>, а также с условиями <a href="#">оферты</a>.</span></label> -->
										</div>
									</div>
								</div>
							</div>				 
						</div>
					</div>
				</div>
			</form>
		</client-only>
	</div>  
</template>

<script>
	import { mapState, mapActions } from 'vuex';

	import CoverOverlay from '@/components/CoverOverlay';
	// import SearchBar from '@/components/SearchBar';
	// import NavMenuItem from './NavMenuItem.vue';
	import { eventHandler, tabsMixin, breadcrumbsFromPathMixin, seoMixin, itemsFetchSetMixin } from '@/mixins';
	import {
		cloneDeep,
		findItemBy,
		getProdImgSrc,
		getLocaleCode,
		removeObjProps,
		getSeoLink,
		getPrice
	} from '@/helpers';

	import { DELIVERY_TYPES, deliveryTypesList, PAYMENTS_TYPES, paymentsTypesList } from '@/constants/global';
	
	export default {
		name: 'checkout',
		mixins: [eventHandler, tabsMixin, breadcrumbsFromPathMixin, seoMixin, itemsFetchSetMixin],

		components: {
			CoverOverlay,
			AuthTabsBlock: () => import('@/components/auth/AuthTabsBlock.vue'),		
			RemoteLoginBlock: () => import('@/components/auth/RemoteLoginBlock.vue'),		
			// CartItem: () => import('./CartItem.vue'),			
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

		data: () => ({
			isAgreedPersonalData: false,

			selectedDeliveryRegion: null,

			formData: {
				delivery_type: null,
				payment_type: null,
				comment: '',
				delivery_region_id: null,
				phone_number: '',

				credit_card_number: '',
				credit_card_year: null,
				credit_card_month: null,
				credit_card_cvv: null
				// delivery_general_info: '',
				// amount_cash_delivery: '',				
			}
		}),

		computed: {
			...mapState({
				authUser: state => state.auth.authUser,
				authLoading: state => state.auth.isLoading,

				cartData: state => state.cart.itemData,
				isLoading: state => state.cart.isLoading,
				isSaving: state => state.cart.isSaving,

				deliveryRegionsLoading: state => state.delivery_regions.isLoading,
				deliveryRegionsList: state => state.delivery_regions.itemsList
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

			yearsList: () => [
				{id:1, title:'2021', value:'21' },
				{id:2, title:'2022', value:'22' },
				{id:3, title:'2023', value:'23' },
				{id:4, title:'2024', value:'24' },
				{id:5, title:'2025', value:'25' },
				{id:6, title:'2026', value:'26' },
				{id:7, title:'2027', value:'27' },
				{id:8, title:'2028', value:'28' },
			],

			monthList: () => [
				{id:1, title_ru:'01 (январь)', title_he:'year', value:'01'},
				{id:2, title_ru:'02 (февраль)', title_he:'year', value:'02'},
				{id:3, title_ru:'03 (март)', title_he:'year', value:'03'},
				{id:4, title_ru:'04 (апрель)', title_he:'year', value:'04'},
				{id:5, title_ru:'05 (май)', title_he:'year', value:'05'},
				{id:6, title_ru:'06 (июнь)', title_he:'year', value:'06'},
				{id:7, title_ru:'07 (июль)', title_he:'year', value:'07'},
				{id:8, title_ru:'08 (август)', title_he:'year', value:'08'},
				{id:9, title_ru:'09 (сентябрь)', title_he:'year', value:'09'},
				{id:10, title_ru:'10 (октябрь)', title_he:'year', value:'10'},
				{id:11, title_ru:'11 (ноябрь)', title_he:'year', value:'11'},
				{id:12, title_ru:'12 (декабрь)', title_he:'year', value:'12'}
			],

			tabsList: (that) => [
				{ title: `${that.$t('phrase.regular_client')}`, prop: 'regularClientTabActive' },
				{ title: `${that.$t('phrase.new_client')}`, prop: 'newClientTabActive' },
			],

			DELIVERY_TYPES: () => DELIVERY_TYPES,
			deliveryTypesList: () => deliveryTypesList,
			PAYMENTS_TYPES: () => PAYMENTS_TYPES,
			paymentsTypesList: () => paymentsTypesList,
			getProdImgSrc: () => getProdImgSrc,
			
			locale() {return getLocaleCode(this.$i18n.locale)},			
		},

		methods: {
			...mapActions({
				set_cart: 'cart/set_cart',
				cart_checkout: 'cart/cart_checkout',
				sign_in: 'auth/sign_in',
				fetch_delivery_regions: 'delivery_regions/fetch_delivery_regions',
				set_delivery_regions: 'delivery_regions/set_delivery_regions',
				auth_set_data: 'auth/set_data',
			}),

			getFinalPrice() {
				let deliveryCost = 0;
				if (this.selectedDeliveryRegion) {
					deliveryCost = +this.selectedDeliveryRegion.price;
				}
				return this.cartData.final_amount + deliveryCost;
			},

			socialLoginSubmit(provider) {
				this.sign_in({ method:'GET', url: `/social-auth/${provider}` });
			},

			/*fetchCities() {
				this.fetch_cities({ params: {max:10} });
			},*/

			/*fetchWarehouses(id) {
				this.fetch_warehouses({ params: {max:-1, cityId: id || this.nova_poshtaForm.novaposhta_city_id } });
			},*/

			submit() {
				if (this.authUser /*&& this.isAgreedPersonalData*/) {
					let payload = {
						data: {	...this.formData }
					};

					if (this.formData.payment_type !== PAYMENTS_TYPES.CARD) {
						const deleteList = [
							'credit_card_number',
							'credit_card_year',
							'credit_card_month',
							'credit_card_cvv'
						]
						payload.data = removeObjProps(payload.data, deleteList);
					} else {
						this.$fb.fbq('track', 'AddPaymentInfo', {
							value: this.getFinalPrice(),
							currency: 'ILS'
						});
					}
					// console.log(payload)

					this.$fb.fbq('track', 'Purchase', {
						content_ids: this.cartData.orderProducts.map(p => `${p.id}`),
						content_type: 'product',
						value: this.getFinalPrice(),
						currency: 'ILS'
					});

					this.$gtag.event('begin_checkout', {
						// send_to: 'G-GG8L7SZD7W',						
						currency: 'ILS',
						value: this.getFinalPrice(),
						items: this.cartData.orderProducts.map(p => ({
							item_id: p.id,
							item_name: p.product.title_ru,
							item_category: p.product.category && p.product.category.title_ru,
							price: getPrice(p.new_price || p.price, p.quantity, {valueOnly:true}),
							currency: 'ILS',
							quantity: p.quantity
						}))
					});


					this.cart_checkout(payload).then((response) => {
						// console.log(response)
						const payload = {
							stateProp: 'authUser',
							value: {
								...this.authUser,
								phone_number: response.data.order.phone_number
							}
						}
						this.auth_set_data(payload);
						this.$router.push(this.localePath('/success'));
					});
				}
			}

			
		},

		watch: {
			'formData.delivery_type'(type) {
				this.formData.delivery_region_id = null;

				if (type === DELIVERY_TYPES.REGION) {
					if (this.deliveryRegionsList.length < 1) {
						const column = `title_${this.locale}`;
						const params = { max:-1, orderByColumn:column, orderByMethod: 'asc' };
						this.fetch_delivery_regions({ params: params });
					}
				}
			},

			'formData.delivery_region_id'(id) {
				this.selectedDeliveryRegion = findItemBy('id', id, this.deliveryRegionsList);
				// if (id && this.deliveryRegionsList.length) {}
			},

			deliveryRegionsList(list) {
				this.selectedDeliveryRegion = findItemBy('id', this.formData.delivery_region_id, list);
				// if (this.formData.delivery_region_id) {}
			},

			authUser(user) {
				if (user) {
					this.formData.phone_number = this.authUser.phone_number;
				}
			},

			cartData(data) {
				this.$fb.fbq('track', 'InitiateCheckout', {
					content_ids: data.orderProducts.map(p => `${p.id}`),
				});
			}
		},

		created() {
			if (this.authUser) {
				this.formData.phone_number = this.authUser.phone_number;
			}

			// this.formData.comment = this.$t('phrase.order_comment_description');
		},

		beforeDestroy() {
			this.cleanLists(['set_delivery_regions']);
		}
	}
	
</script>