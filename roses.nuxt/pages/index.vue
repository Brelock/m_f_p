<template>
		<!-- <Header  /> -->

		<!-- <div>{{ catalogData }}</div> -->

		<div id="homePage" class="homePage page">
		
			<section class="pageSection mainSliderSection">
				<div class="mcontainer">
			
					<div class="flex wrap mrow">
						<div class="mcol-xs-12 mcol-md-8 mcol-lg-9 fluid wrapperBlock">
							<!-- <client-only> -->
								<BannerSlider	
									:slides="bannerSlidesList"
									v-if="bannerSlidesList.length"
									@event="handleEvent"
								/>
							<!-- </client-only> -->
						</div>

						<div class="mcol-xs-12 mcol-md-4 mcol-lg-3 topOfTheDay" v-if="topOfTheDay.length">
							<div class="product-item card-item">
								<ProductCard 
									@event="handleEvent"
									:productItem="topOfTheDay[0]"
									:additional_title="`${$t('common.product_day')}`"
									:withoutAction="true"
									:i18n="$i18n"
									@localePath="localePath"
								/>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section class="pageSection brands-section mcol-xs-hide mcol-md-show">
			  <div class="mcontainer">
			    <div class="list-wrapper">
			      <div class="flex mrow brands-list">
			        <div class="brand-item mcol-xs-4 mcol-sm-3 mcol-md-2 col-lg-1">
			          <div class="imgWrapper relative">
			            <!-- <a href="#" class=""> -->
			              <i class="icomoon icon-gvozd"></i>
			              <span class="name">{{ $t('temporary.roses') }}</span>
			            <!-- </a> -->
			          </div>
			        </div>
			        <div class="brand-item mcol-xs-4 mcol-sm-3 mcol-md-2 col-lg-1">
			          <div class="imgWrapper relative">
			            <!-- <a href="#" class=""> -->
			              <i class="icomoon icon-rose"></i>
			              <span class="name">{{ $t('temporary.roses') }}</span>
			            <!-- </a>   -->
			          </div>
			        </div>
			        <div class="brand-item mcol-xs-4 mcol-sm-3 mcol-md-2 col-lg-1">
			          <div class="imgWrapper relative">
			            <!-- <a href="#" class=""> -->
			              <i class="icomoon icon-tul"></i>
			              <span class="name">{{ $t('temporary.tulips') }}</span>
			            <!-- </a>   -->
			          </div>
			        </div>
			        <div class="brand-item mcol-xs-4 mcol-sm-3 mcol-md-2 col-lg-1">
			          <div class="imgWrapper relative">
			            <!-- <a href="#" class=""> -->
			              <i class="icomoon icon-orchid"></i>
			              <span class="name">{{ $t('temporary.orchids') }}</span>
			            <!-- </a>-->
			          </div>
			        </div>
			        <div class="brand-item mcol-xs-4 mcol-sm-3 mcol-md-2 col-lg-1">
			          <div class="imgWrapper relative">
			            <!-- <a href="#" class=""> -->
			              <i class="icomoon icon-Shape"></i>
			              <span class="name">{{ $t('temporary.chamomile') }}</span>
			            <!-- </a>-->
			          </div>
			        </div>
			        <div class="brand-item mcol-xs-4 mcol-sm-3 mcol-md-2 col-lg-1">
			          <div class="imgWrapper relative">
			            <!-- <a href="#" class=""> -->
			              <i class="icomoon icon-hris"></i>
			              <span class="name">{{ $t('temporary.chrysanthemums') }}</span>
			            <!-- </a>-->
			          </div>
			        </div>
			        <div class="brand-item mcol-xs-4 mcol-sm-3 mcol-md-2 col-lg-1">
			          <div class="imgWrapper relative">
			            <!-- <a href="#" class=""> -->
			              <i class="icomoon icon-lili"></i>
			              <span class="name">{{ $t('temporary.lilies') }}</span>
			            <!-- </a>-->
			          </div>
			        </div>
			        <div class="brand-item mcol-xs-4 mcol-sm-3 mcol-md-2 col-lg-1">
			          <div class="imgWrapper relative">
			            <!-- <a href="#" class=""> -->
			              <i class="icomoon icon-gvozd"></i>
			              <span class="name">{{ $t('temporary.carnation') }}</span>
			            <!-- </a>-->
			          </div>
			        </div>

			      </div>
			    </div>
			    <span class="primaryColor semi-bold"></span>
			  </div>
			</section>

			<!-- <section class="pageSection quote-section">
				<div class="mcontainer">
					<div class="section-content">
						<h2 class="title page-title text-center semi-bold" v-html="$t('phrase.shop_main_quote')"></h2>
					</div>
				</div>
			</section> -->

			<!-- <section class="pageSection brands-section">
				<div class="mcontainer">
					<div class="list-wrapper">
						<div class="flex mrow brands-list">
							<div class="brand-item mcol-xs-6 mcol-sm-4 mcol-md-3"
								v-for="brand in brandsList"
								:key="`brand-${brand.id}`">
								<div class="imgWrapper relative lazy-block">
									<a href="#" class="overlay-link absolute stretch"></a>
									<img v-lazy="brand.picture_file_name" alt="brand name">
								</div>
							</div>

							<div class="brand-item all-brands mcol-xs-6 mcol-sm-4 mcol-md-3">
								<a href="#" class="medium">Все бренды</a>
							</div>
						</div>
					</div>
				</div>
			</section> -->

			<section class="pageSection products-section" v-if="bestSellers.length">
				<div class="mcontainer">
					<div class="products-slider-wrapper">
						<div class="sectionTitleBlock withButton">
							<h2 class="section-title capitalize">{{$t('titles.best_sellers')}}</h2>
							<!-- <nuxt-link :to="localePath('/')" class="more-button">
								<i class="icomoon icon-arrow1"></i>
							</nuxt-link> -->
						</div>

						<!-- <client-only> -->
							<ProductsSlider
								typeName="bestSellers"
								:slides="bestSellers"
								@event="handleEvent"
							/>
						<!-- </client-only> -->
					</div>
				</div>
			</section>

			<section class="pageSection products-section" v-if="newProducts.length">
				<div class="mcontainer">
					<div class="products-slider-wrapper">
						<div class="sectionTitleBlock withButton">
							<h2 class="section-title capitalize">{{$t('menu.new_items')}}</h2>
							<!-- <nuxt-link :to="localePath('/')" class="more-button">
								<i class="icomoon icon-arrow1"></i>
							</nuxt-link> -->
						</div>

						<!-- <client-only> -->
							<ProductsSlider
								typeName="newProducts"
								:slides="newProducts"
								@event="handleEvent"
							/>
						<!-- </client-only> -->
					</div>
				</div>
			</section>

			<!-- <SubscribeSection/> -->

			<section class="pageSection products-section" v-if="discountProducts.length">
				<div class="mcontainer">
					<div class="products-slider-wrapper">
						<div class="sectionTitleBlock withButton">
							<h2 class="section-title capitalize">{{$t('titles.discounts')}}</h2>
							<!-- <nuxt-link :to="localePath('/')" class="more-button">
								<i class="icomoon icon-arrow1"></i>
							</nuxt-link> -->
						</div>
						<!-- <client-only> -->
							<ProductsSlider
								typeName="discountProducts"
								:slides="discountProducts"
								@event="handleEvent"
							/>
						<!-- </client-only> -->
					</div>
				</div>
			</section>

			<ServicesSection :i18n="$i18n"/>
			
		</div>
		
		<!--  -->
		<!-- <div id="pageOverlay" class="pageOverlay"></div> -->

		<!--  -->
		<!-- <div id="popupFeedback" class="popupFeedback popup">
			<div class="popupWrapper">
				<div class="popupContentWrapper">
					
					<div class="modalHeader flex wrap relative">
						<button class="popupCloseButton" type="button"><i class="icomoon icon-cross1"></i></button>     
					</div>
					
					<div class="popUpContainer">
						<div class="page-title title medium">Оставить отзыв</div>     
						
						<form action="#" class="standard-form">
		
							<div class="formRow ratingBlock flex center">
								<label>Ваша оценка</label>
								<div class="rating-count">
									<input id="mf5" type="radio" name="rating" value="5">
									<label for="mf5" class="icomoon icon-star1">5</label>
									<input id="mf4" type="radio" name="rating" value="4">
									<label for="mf4" class="icomoon icon-star1">4</label>
									<input id="mf3" type="radio" name="rating" value="3">
									<label for="mf3" class="icomoon icon-star1">3</label>
									<input id="mf2" type="radio" name="rating" value="2">
									<label for="mf2" class="icomoon icon-star1">2</label>
									<input id="mf1" type="radio" name="rating" value="1" required>
									<label for="mf1" class="icomoon icon-star1">1</label>
								</div>
							</div>
		
							<div class="formRow">
								<label class="label row-with-icon">
									<i class="icomoon gradientIcon icon-chat"></i>
									<div>Комментарий</div>
								</label>
								<textarea name="comment" id="" rows="7" placeholder=""></textarea>                        
							</div>
		
							<div class="formRow">
								<label class="label">Имя</label>
								<input type="text" placeholder="Имя" class="">
							</div>
		
							<div class="formRow">
								<label class="label">Электронная почта</label>
								<input type="email" placeholder="Имя" class="">
								<div class="grey-highlight row-description">Адрес не будет виден другим посетителям</div>
							</div>
		
							<div class="formRow">
								<button type="submit" class="standardButton primary uppercase">Отправить</button>
							</div>
						</form>
					</div>
				</div>
			</div> -->
</template>

<script>
import Vue from 'vue';

import VueSlickCarousel from 'vue-slick-carousel';
import 'vue-slick-carousel/dist/vue-slick-carousel.css';
Vue.component('VueSlickCarousel', VueSlickCarousel);

import { mapState, mapActions } from 'vuex';
import { eventHandler, lazyLoadMixin, seoMixin } from '@/mixins';
import { getLocaleCode, getSeoLink } from "@/helpers";
import { getParamsFromUrl } from "@/services/api_helpers";

export default {
	name: 'home',
	mixins: [eventHandler, lazyLoadMixin, seoMixin],	
	components: {
		// Header: () => import('@/components/header/Header.vue'),
		BannerSlider: () => import('@/components/BannerSlider.vue'),
		ProductsSlider: () => import('@/components/products/ProductsSlider.vue'),
		ProductCard: () => import('@/components/products/ProductCard.vue'),
		SubscribeSection: () => import('@/components/SubscribeSection.vue'),
		ServicesSection: () => import('@/components/ServicesSection.vue'),
	},

	async fetch({store, route}) {
		const { token } = getParamsFromUrl(route.fullPath);
		// console.log(store.state.auth.authUser, token)
			
		if (store.state.auth.authUser || token) {
			// console.log(store.state.auth.authUser)
			let payload = {
				fetchOnServer: true
			};
			if (token) {
				payload.token = token;
			}
			// console.log(token)
			await store.dispatch('auth/get_auth_user', payload).catch(e => {console.warn(e)});
		}

		await store.dispatch('seo/fetch_meta_tags', {
			params:	{redirect_uri: getSeoLink(route) }
		});

		if (store.state.categories.menuCategoriesList.length < 1) {
			// console.log('fetch index')
			await store.dispatch('categories/fetch_menu_data', {
				params:	{ max: -1, withChildren:true }
			});
		}
		if (store.state.banner.itemsList < 1) {
			await store.dispatch('banner/fetch_banner_items');
		}
		if (store.state.products.newProducts.length < 1) {
			await store.dispatch('products/fetch_products_by_criteria', {
				stateProp: 'newProducts',	params:	{ hasNew:true },
			});
		}
		if (store.state.products.bestSellers.length < 1) {
			await store.dispatch('products/fetch_products_by_criteria', {
				stateProp: 'bestSellers',	params:	{ hasHits:true },
			});
		}
		if (store.state.products.discountProducts.length < 1) {
			await store.dispatch('products/fetch_products_by_criteria', {
				stateProp: 'discountProducts',	params:	{ hasDiscount:true },
			});
		}
		if (!store.state.products.topOfTheDay) {
			await store.dispatch('products/fetch_products_by_criteria', {
				stateProp: 'topOfTheDay',	params:	{ hasDay:true },
			});
		}
		
		// await store.dispatch('products/fetch_new_products');
		// await store.dispatch('products/fetch_discounts');
		// await store.dispatch('brands/fetch_brands', {params: {max: 7}});
	},

	data: () => ({
		// lazyBlocks: []
		/*sliderSettings: {
			dots: true,
			arrows: true,
			// dotsClass: 'slick-dots categories-navbar',
			edgeFriction: 0.35,
			infinite: true,
			speed: 1000,
			slidesToShow: 1,
			slidesToScroll: 1
		},	*/
	}),

	computed: {
		...mapState({
			// catalogData: state => state.categories.catalogData,
			authUser: state => state.auth.authUser,
			bestSellers: state => state.products.bestSellers,
			newProducts: state => state.products.newProducts,
			topOfTheDay: state => state.products.topOfTheDay,
			discountProducts: state => state.products.discountProducts,
			bannerSlidesList: state => state.banner.itemsList,
			// brandsList: state => state.brands.itemsList,
		}),

		instancePropName: () => 'seo_data',

		seo_data() {
			return {
				title_ru: this.$t('titles.main'),
				title_he: this.$t('titles.main'),
				seo_description_ru: this.$t('titles.main'),
				seo_description_he: this.$t('titles.main'),
			}
		},
	},

	methods: {
		...mapActions({
			// toggle_favorited: 'products/toggle_favorited',
			toggle_cart: 'products/toggle_cart',
		}),
	},

	/*mounted() {
			
	}*/

}
</script>

<style>
	.mainSlider .slick-list {
		margin-right: 1px;
	}
	.brand-item.all-brands {
		display: flex !important;
	}
</style>

