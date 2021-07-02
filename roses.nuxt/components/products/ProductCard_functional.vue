<template functional>
	<!-- <client-only> -->
		<!-- <div class="product-item card-item"> -->
			<div class="item-container relative">

				<div v-if="props.additional_title" 
					class="additional-title absolute bold capitalize-first" 
					v-text="props.additional_title"
				/>

				<div class="action-block hit absolute"
					v-if="!props.withoutAction && props.productItem.is_hit"
				>
					<span class="uppercase">{{ props.i18n.t('temporary.hit') }}</span>
				</div>

				<div class="action-block new absolute"
					v-if="!props.withoutAction && props.productItem.is_new"
				>
					<span class="uppercase">{{ props.i18n.t('temporary.new') }}</span>
				</div>

				<div class="action-block discount absolute"
					v-if="!props.withoutAction && props.productItem.discount"
				>
					<span>- {{props.getPrice(props.productItem.price - props.productItem.new_price, 1)}}</span>
				</div>

				<!-- <div v-if="!props.withoutAction && props.productItem.action_state" 
					v-html="props.createActionBlock(props.productItem.action_state)">
				</div> -->
		
				<!-- <div class="like-block absolute">
					<button class="" type="button"
						@click="listeners.event('toggle_favorited', {itemId:props.productItem.id})">
						<i :class="['icomoon icon-heart', {'active': props.productItem.is_favorited}]" />
					</button>
				</div> -->
		
				<div class="image-block relative">
					<nuxt-link :to="listeners.localePath({	
						name:'catalog',
						params: { 'catalog': `p_${props.productItem.alias}` } 
					})" class="overlay-link absolute stretch"></nuxt-link>
					
					<LazyImage
						@onInit="d => listeners.event('lazyImgInit', d)"
						@onReady="d => listeners.event('lazyImgReady', d)"
						:src="props.getProdImgSrc(props.productItem.pictures[0], props.productItem.id)"
					/>
					
					<!-- <div class="imgWrapper lazyBlock">
						<img v-if="props.isLazy"
							v-lazy="props.getProdImgSrc(props.productItem.pictures[0], props.productItem.id)" alt="prod img error">
						<img v-else :src="props.getProdImgSrc(props.productItem.pictures[0], props.productItem.id)" alt="prod img error">
					</div> -->
				</div>
				
				<div class="content-container">
					<div class="product-category card-add-info"
						v-text="props.productItem[`category_name_${props.i18n.locale == 'he'?'uk':props.i18n.locale }`]"></div>
					<h4 class="product-title card-title">
						<nuxt-link :to="listeners.localePath({	
							name:'catalog',
							params: { 'catalog': `p_${props.productItem.alias}` } 
						})" v-text="props.productItem[`title_${props.i18n.locale == 'he'?'uk':props.i18n.locale }`]"/>
						<!-- <a href="#">{{props.productItem.name}}</a> -->
					</h4>
		
					<div class="ratingBlock flex center spaceBetween">
						<ul class="rating-list"
							v-html="props.buildRating(+props.productItem.ratingReviewsAvg)">
						</ul>
		
						<!-- <div class="comments-block">
							<a href="#" class="">
								<i class="icomoon icon-chat"/>
								<span v-show="props.productItem.comments.length"
									class="medium" v-text="props.productItem.comments.length"/>
							</a>
						</div> -->
					</div>
		
					<div class="footer-block flex center spaceBetween">
						<div class="price bold">
							<div class="oldPrice" v-if="props.productItem.new_price">
								<span v-text="`${props.productItem.price}₪`"/>
								<!-- <span class="currency"  v-text="' '+props.productItem.currency_name"/> -->
							</div>
							<!-- <div v-if="props.productItem.new_price"class="difference">
								-{{Math.ceil(props.productItem.price - props.productItem.new_price) }}₪</div> -->

							<span class="final"
								v-text="props.getPrice(props.productItem.new_price || props.productItem.price, 1)"
							>
							</span>
							<!-- <span class="currency"  v-text="' '+props.productItem.currency_name"/> -->
						</div>

						<nuxt-link :to="listeners.localePath({	
							name:'catalog',
							params: { 'catalog': `p_${props.productItem.alias}` } 
						})"
							v-text="props.i18n.t('common.buy')" class="standardButton primary uppercase"/>
		
						<!-- <button type="button"
							:class="['standardButton',
								{'primary uppercase': !props.productItem.in_cart},
								{'primary-inverted js_in_cart': props.productItem.in_cart}			
							]"
							
							@click="listeners.event('toggle_cart', {itemId:props.productItem.id})">
							{{props.productItem.in_cart ? 'в корзине' : 'купить'}}
						</button> -->
						<!-- <span v-show="props.productItem.in_cart" class="standardButton primary-inverted">в корзине</span> -->
					</div>
				</div>
			</div>
		<!-- </div> -->
	<!-- </client-only> -->
</template>

<script>
import { createActionBlock, getProdImgSrc, buildRating, getPrice } from '@/helpers';

export default {
	functional: true,
	props: {
		// filters: Object,
		withoutAction: Boolean,
		additional_title: {type: String, default: ''},
		productItem: {
			type: Object,
			default: () => ({})
		},
		i18n: {
			type: Object,
			default:() => {}
		},
		buildRating: {
			type: Function,
			default: buildRating
		},
		getPrice: {
			type: Function,
			default: getPrice
		},
		createActionBlock: {
			type: Function,
			default: createActionBlock
		},

		getProdImgSrc: {
			type: Function,
			default: getProdImgSrc
		}
	},
	/*watch: {
		'productItem': {
			handler(products) {
				console.log(products)
			},
			deep: true
		}
	},*/
};
</script>