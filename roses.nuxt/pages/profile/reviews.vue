<template>
	<div class="content-container">
		<client-only>
			<div class="title page-title capitalize-first">{{ $t('titles.my_reviews') }}</div>

			<div class="sectionBlock feedback-list contentRow view-content relative">
				<SimpleSpinner :active="itemsLoading" big />				

				<div class="feedback-item" v-for="item in itemsList"
						:key="`review-${item.id}`">
					<div class="item-container">
						<div class="author-block">
							<div class="flex wrap center medium content-container">
								<div class="date mcol-md-12">{{cleanDateString(item.created_at) }}</div>
								<ul class="rating-list mcol-xs-12">
									<li v-for="i in 5" :key="`avg_r-${i}`">
										<i :class="['icomoon', {active: i<=item.rating}]"></i>
									</li>
								</ul>
							</div>
						</div>
				
						<div class="content-block">
				
							<div class="description contentRow">
								<div class="description-title">
									<nuxt-link
										:to="localePath({
											name:'catalog',
											params: { 'catalog': `p_${item.product.alias}` } 
										})"
										v-text="item.product[`title_${locale}`]"/>
								</div>
								<p v-text="item.message"></p>
							</div>
				
							<div class="likes-block contentRow">
								<button type="button" class="like-button">
									<i class="icomoon icon-like2"></i>
									<span v-text="item.likesReview"></span>
								</button>

								<div v-if="!item.is_published" class="warning-color text-right">{{$t('phrase.review_isnt_published')}}!</div>
				
								<!-- <a href="#" class="like-button dislike">
									<i class="icomoon icon-like2"></i>
									<span>12</span>
								</a> -->
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="pagination-wrapper contentRow"
				v-if="meta && meta.last_page > 1 && itemsList.length">
				<PaginationContainer
					@setFilters="setFilters"
					:itemsName="{mult:'Отзывов'}"
					:filters="filters"
					:meta="meta"
				/>
			</div>
			
		</client-only>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex';

	import { itemsFetchSetMixin, itemsDataMixin } from '@/mixins';
	import { getProdImgSrc, cleanDateString, getLocaleCode } from '@/helpers';
	
	export default {
		name: 'profileReviews',
		mixins: [itemsFetchSetMixin, itemsDataMixin],

		components: {
			PaginationContainer: () => import('@/components/PaginationContainer.vue'),
		},

		computed: {
			...mapState({
				itemsList: state => state.reviews.userReviewsList,
				itemsLoading: state => state.reviews.isLoading,
				filters: state => state.reviews.filters,
				meta: state => state.reviews.userReviewsMeta,
			}),

			getProdImgSrc: () => getProdImgSrc,
			cleanDateString: () => cleanDateString,
			locale() {return getLocaleCode(this.$i18n.locale);},
		},

		methods: {
			...mapActions({
				fetch_items: 'reviews/fetch_user_reviews',
				set_items: 'reviews/set_user_reviews',
				set_filters: 'reviews/set_filters',
			}),
		}	
	}
	
</script>