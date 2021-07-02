<template>
	<div class="content-container">
		<client-only>
			<div class="title page-title capitalize-first">{{ $t('titles.my_orders') }}</div>
			
			<div class="sectionBlock rowItems-list orders-list relative view-content">
				<SimpleSpinner :active="itemsLoading" big />				

				<div class="row-item order-item"
					v-for="order in itemsList"
					:key="`order-${order.id}`">
					<div class="rowItems-sub-list" v-for="(item, idx) in order.orderProducts"
						:key="`order-${order.id}_item-${item.id}`">
						<div class="row-sub-item order-prod-item">
							<div class="content-container">
								<div>{{ idx+1 }}</div>
																		
								<div>
									<div class="grey-highlight" v-if="idx == 0">{{ cleanDateString(order.created_at) }}</div>
								</div>
																		
								<div>
									<div class="imgWrapper">
										<img :src="getProdImgSrc(item.product.pictures[0],
												item.product.id, 'picture_thumb_file_name'
											)" alt="prod img error">
										<!-- <img src="./img/products/prod-1.jpg" alt="prod"> -->
									</div>
								</div>
																		
								<div>
									<div class="grey-highlight">{{ item.product.category[`title_${locale}`] }}</div>
									<div class="">
										<nuxt-link
											:to="localePath({
												name:'catalog',
												params: { 'catalog': `p_${item.product.alias}` } 
											})"
											v-text="item.product[`title_${locale}`]"
										/>
									</div>
								</div>
																		
								<div>{{ item.quantity }} шт.</div>
																		
								<div>
									<div class="price">
										<b>{{ item.amount}}₪</b>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="text-center" v-if="!itemsLoading && itemsList.length < 1">{{$t('phrase.you_havent_orders')}}</div>
			</div>

			<div class="pagination-wrapper contentRow"
				v-if="meta && meta.last_page > 1 && itemsList.length">
				<PaginationContainer
					@setFilters="setFilters"
					:itemsName="{mult:'Заказов'}"
					:filters="filters"
					:meta="meta"
				/>
			</div>
		</client-only>

	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex';

	// import SearchBar from '@/components/SearchBar';
	// import NavMenuItem from './NavMenuItem.vue';
	import { getProdImgSrc, cleanDateString, getLocaleCode } from '@/helpers';
	import { itemsFetchSetMixin, itemsDataMixin } from '@/mixins';
	
	export default {
		name: 'profileOrders',
		mixins: [itemsFetchSetMixin, itemsDataMixin],

		components: {
			PaginationContainer: () => import('@/components/PaginationContainer.vue'),
		},

		computed: {
			...mapState({
				itemsList: state => state.orders.userOrdersList,
				itemsLoading: state => state.orders.isLoading,
				filters: state => state.orders.filters,
				meta: state => state.orders.fetchedMeta,
			}),

			getProdImgSrc: () => getProdImgSrc,
			cleanDateString: () => cleanDateString,
			locale() {return getLocaleCode(this.$i18n.locale)},
		},

		methods: {
			...mapActions({
				fetch_items: 'orders/fetch_user_orders',
				set_items: 'orders/set_user_orders',
				set_filters: 'reviews/set_filters',
			})		
		},

		/*beforeMount() {
			console.log('container: ', this.$route);
		}*/
	}
	
</script>