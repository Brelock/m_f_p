<template functional>
	<client-only>
		<div class="relative">
			<SimpleSpinner :active="props.itemsLoading"/>
			
			<div class="list-item" v-for="order in props.cartList"
				:key="`prod_submenu_item-${order.id}`">
				<div class="imgWrapper mcol-md-3">
					<img :src="props.getProdImgSrc(
							order.product.pictures[0],
							order.product.id,
							'picture_thumb_file_name'
						)"
						alt="prod img error"
					>
				</div>
				<div class="content-wrapper mcol-md-4">
					<nuxt-link :to="listeners.localePath({	
						name:'catalog',
						params: { 'catalog': `c_${order.product.category.alias}` } 
					})" class="grey-highlight" 
						v-text="order.product.category[`title_${props.locale(props)}`]"></nuxt-link>
					<nuxt-link :to="listeners.localePath({	
						name:'catalog',
						params: { 'catalog': `p_${order.product.alias}` } 
					})" class="d-block"
						v-text="order.product[`title_${props.locale(props)}`]"></nuxt-link>
				</div>
				<div class="priceBlock mcol-md-4 bold">
					<span v-text="order.amount"/>
					<span class="currency"  v-text="'₪'"/>
				</div>
				<button type="button" class="removeButton closeButton"
					@click="listeners.event(props.getEventName(props),	{itemId: order.id})">
					<i class="icomoon icon-cross1"></i>
				</button>
			</div>
		</div>
	</client-only>
</template>

<script>
import { getProdImgSrc, getLocaleCode } from '@/helpers';

export default {
	functional: true,
	props: {
		cartList: {
			type: Array,
			default: () => ([])
		},
		i18n: {
			type: Object,
			required: true
		},
		isFavorites: Boolean,
		isCart: Boolean,
		itemsLoading: Boolean,
		getEventName: {
			type: Function,
			default: (props) => {
				let name;
				if (props.isFavorites) {name = 'toggle_favorited'}
				if (props.isCart) {name = 'remove_from_cart'}

				return name;
			}
		},
		locale: {
			type: Function,
			default: props => getLocaleCode(props.i18n.locale)
		},
		getProdImgSrc: {
			type: Function,
			default: getProdImgSrc
		}
	}

};
</script>