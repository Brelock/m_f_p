<template>
	<div :class="['cart-item', className]">
		
		<div class="tableCell">
			<span>{{itemIndex}}</span>
		</div>

		<div class="tableCell image-cell">
			<div>
				<div class="imgWrapper">
					<img :src="getProdImgSrc(itemData.product.pictures[0], itemData.product.id, 
						'picture_thumb_file_name'
					)" alt="prod img error">
				</div>
			</div>
		</div>

		<div class="tableCell">
			<div>
				<div class="product-category">
					<nuxt-link class="grey-highlight" 
							:to="localePath({
							name:'catalog',
							params: { 'catalog': `c_${itemData.product.category.alias}` } 
						})"
						v-text="itemData.product.category[`title_${locale}`]"></nuxt-link>
				</div>
				<div class="product-title">
					<nuxt-link
						:to="localePath({
							name:'catalog',
							params: { 'catalog': `p_${itemData.product.alias}` } 
						})"
						v-text="itemData.product[`title_${locale}`]"></nuxt-link>
				</div>
			</div>
		</div>

		<div class="tableCell quantity-cell">
			<div>
				<div class="quantity-input">				
					<el-input-number :min="1" :max="500"
						@input="handleInput"
						:value="itemData.quantity"
					/>
				</div>
			</div>
		</div>

		<div class="tableCell ">
			<div>
				<!-- <div class="size-item">38</div> -->
			</div>
		</div>

		<div class="tableCell relative">
			<SimpleSpinner :active="isSaving" small />

			<div>
				<div class="price" v-text="`${itemData.amount}₪`"></div>
			</div>
		</div>

		<div class="tableCell">
			<div><i class="icomoon button icon-cross1 removeButton hover"
				@click="removeItemFromCart(itemData.id)">
			</i></div>
		</div>
		
	</div>	
</template>

<script>
import { getProdImgSrc, getLocaleCode } from '@/helpers';

export default {
	props: {
		className: String,
		itemIndex: {
			type: String,
			default: ''
		},
		itemData: {
			type: Object,
			required: true
		},
		isSaving: Boolean
	},

	computed: {
		getProdImgSrc: () => getProdImgSrc,
		// getLocaleCode: () => getLocaleCode
		locale() {return getLocaleCode(this.$i18n.locale);},
	},

	methods: {
		handleInput(val) {
			if (val != this.itemData.quantity) {
				const payload = {
					itemId: this.itemData.id,
					data: { quantity: val },
				};

				this.$store.dispatch('cart/edit_cart_item', payload).then(data => {
					this.$emit('event', 'updateCartState', data);
				});
			}
		},

		removeItemFromCart(id) {
			// const payload = {	itemId: id };
			this.$store.dispatch('cart/remove_from_cart', {	itemId: id }).then(() => {

				// this.localePath({name: 'NotFoundPage'})
			})

		}
	},

};
</script>

