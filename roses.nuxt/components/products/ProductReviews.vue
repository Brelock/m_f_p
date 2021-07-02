<template>
	<div class="relative">
		<client-only>
			<SimpleSpinner :active="itemsLoading" big />
		</client-only>

		<div class="tab-header contentRow">
			<h2 class="title tab-title medium">{{$t('phrase.product_reviews')}} "{{productItem[`title_${locale}`] }}"</h2>
			
			<div class="flex wrap center">
				<div class="ratingBlock flex wrap center mcol-xs-12 mcol-md-auto">
					<div class="rate-number" v-text="productItem.ratingReviewsAvg"></div>
					<ul class="rating-list">
						<li v-for="i in 5" :key="`avg_r-${i}`">
							<i :class="['icomoon', {active: i<=productItem.ratingReviewsAvg}]"></i>
						</li>
					</ul>
					<div class="rate-description medium mcol-xs-12 mcol-sm-auto"
						v-text="`${$t('phrase.product_review_calc_by')} ${productItem.countReviews} ${$t('common.review_1')}`"></div>
				</div>

				<div class="feedback-button">
					<button type="button" class="standardButton primary uppercase addFeedback"
						@click="handleOpenReviewModal"
						v-text="$t('phrase.add_review')"
					></button>
				</div>
			</div>
		</div>

		<div class="contentRow">
			<SortBar
				@onSort="handleSort"
				:optionsList="sortBarOptionsList"
				:filters="filters"
			/>
		</div>

		<div class="contentRow feedback-list">
			<div class="feedback-item"
				v-for="review in productReviewsList"
				:key="`p_review-${review.id}`">
				<div class="flex wrap item-container">
					<div class="author-block mcol-xs-12 mcol-md-3">
						<div class="flex wrap center medium content-container">
							<div class="name mcol-md-12 sectionBlock-title"
								v-text="`${review.user_first_name} ${review.user_last_name}`"></div>
							<div class="date mcol-md-12" v-text="getYmdDateString({ ms: review.created_at, withTime:true })"></div>
							<ul class="rating-list mcol-xs-12">
								<li v-for="i in 5" :key="`r-${i}`">
									<i :class="['icomoon', {active: i<=review.rating}]"></i>
								</li>
							</ul>
						</div>
					</div>

					<div class="content-block mcol-xs-12 mcol-md-9">
						<div class="absolute chat-container mcol-xs-hide mcol-md-show"><i class="icomoon icon-chat"></i></div>

						<div class="description contentRow">
							<div v-text="review.message"></div>
						</div>

						<div class="likes-block contentRow">
							<button class="like-button"
								@click="likeReview(review.id)"
							>
								<i class="icomoon icon-like2"></i>
								<span v-text="review.likesReview"></span>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="pagination-wrapper contentRow"
			v-if="reviewsMeta && reviewsMeta.last_page > 1 && productReviewsList.length">
			<PaginationContainer
				@setFilters="setFilters"
				:itemsName="{mult:$t('common.review_1')}"
				:filters="filters"
				:meta="reviewsMeta"
			/>
		</div>

		<CustomModal :className="'reviews-dialog'"
			:active="createReviewModalShow"
			@onClose="handleCloseReviewModal">
			<div class="popUpContainer ">
				<div class="page-title title medium">{{$t('phrase.add_review')}}</div>			
				
				<form class="standard-form" @submit.prevent="submitForm">
					<div class="formRow ratingBlock flex center">
						<label>{{$t('phrase.your_mark')}}</label>
						<div class="rating-count">
							<input id="mf5" type="radio" name="rating" @input="ratingChange" :value="5">
							<label for="mf5" class="icomoon icon-star1">5</label>
							<input id="mf4" type="radio" name="rating" @input="ratingChange" :value="4">
							<label for="mf4" class="icomoon icon-star1">4</label>
							<input id="mf3" type="radio" name="rating" @input="ratingChange" :value="3">
							<label for="mf3" class="icomoon icon-star1">3</label>
						  <input id="mf2" type="radio" name="rating" @input="ratingChange" :value="2">
						  <label for="mf2" class="icomoon icon-star1">2</label>
						  <input id="mf1" type="radio" name="rating" @input="ratingChange" :value="1" required>
						  <label for="mf1" class="icomoon icon-star1">1</label>
						</div>
					</div>

					<div class="formRow">
						<label class="label row-with-icon">
							<i class="icomoon gradientIcon icon-chat"></i>
							<div class="capitalize">{{ $t('common.comment')}}</div>
						</label>
					  <textarea name="comment" id="" rows="12" placeholder="" v-model="formData.message"></textarea>                        
					</div>

					<!-- <div class="formRow">
						<label class="label">Электронная почта</label>
					  <input type="email" placeholder="Email" class="" v-model="formData.email">
					  <div class="grey-highlight row-description">Адрес не будет виден другим посетителям</div>
					</div> -->
					<div class="formRow">
						<button :loading="itemSaving" type="submit"
							class="standardButton primary uppercase" 
							v-text="$t('common.send')"
						>
						</button>
					</div>
				</form>
			</div>
		</CustomModal>
	</div>
</template>

<script>
// import { eventHandler } from '@/mixins';
import { Notification } from 'element-ui';
import { mapState, mapActions } from 'vuex';

import { itemsFilterMixin } from '@/mixins';
import { getYmdDateString, getLocaleCode } from '@/helpers';
import { getResponseMessage } from '@/services/api_helpers';

export default {
	mixins: [itemsFilterMixin],
	// functional: true,
	components: {
		SortBar: () => import('@/components/SortBar.vue'),
		CustomModal: () => import('@/components/CustomModal.vue'),
		PaginationContainer: () => import('@/components/PaginationContainer.vue'),
	},

	props: {
		productItem: {
			type: Object,
			required: true
		}
	},

	data() {
		return {
			createReviewModalShow: false,

			formData: {
				product_id: null,
				user_id: null,
				is_published: 0,
				message: '',
				rating: null
			}
		};
	},

	computed: {
		...mapState({
			itemsLoading: state => state.reviews.isLoading,
			itemSaving: state => state.reviews.isSaving,
			productReviewsList: state => state.reviews.publishedReviewsList,
			reviewsMeta: state => state.reviews.publishedReviewsMeta,
			filters: state => state.reviews.filters,
			overlay: state => state.global.overlay,
			authUser: state => state.auth.authUser,
			isAuthenticated: state => state.auth.isAuthenticated,
			// pageType: state => state.global.page_type,
		}),

		// getLocaleCode: () => getLocaleCode,
		locale() {
			return getLocaleCode(this.$i18n.locale);
		},
		getYmdDateString: () => getYmdDateString,

		sortBarOptionsList() {
			return [
				{ prop:'created_at', label:this.$t('form.by_date')},
				{ prop:'rating', label:this.$t('form.by_rate')},
			]
		}
	},

	methods: {
		...mapActions({
			save_review: 'reviews/save_review',
			like_review: 'reviews/like_review',
			show_overlay: 'global/show_overlay',
			set_filters: 'reviews/set_filters'
		}),

		handleOpenReviewModal() {
			// console.log(this.authUser)
			if (this.isAuthenticated && this.authUser) {
				this.show_overlay({	show: true, zIndex: 1750 });
				this.createReviewModalShow = true;
			} else {
				Notification.warning({message: this.$t('phrase.need_auth_to_review')});
			}
		},

		handleCloseReviewModal() {
			this.show_overlay({	show: false })
			this.createReviewModalShow = false;
		},

		fetchItems(filters) {
			this.$emit('fetchItems', filters);
		},

		ratingChange({target}) {
			// console.log(target.value)
			if (target) {
				this.formData.rating = +target.value;
			}
		},

		submitForm(options = {}) {
			if (this.authUser) {
				const formDataName = options.formDataName || 'formData';
				const { productItem, authUser, filters, $t, save_review, fetchItems,handleCloseReviewModal } = this;

				const data = {
					...this[formDataName],
					product_id: productItem.id,
					user_id: authUser.id,
				};
				// console.log(data);
				save_review({data: data})
					.then(() => {
						fetchItems(filters);
						handleCloseReviewModal();
					})
					.catch((error) => {
						// console.log(error.request)
						if (error.request && error.request.status == 422) {
							Notification.error({message: $t('phrase.need_buy_to_review')});
						} else {
							const message = getResponseMessage(error);
							Notification.error({ /*title: `Error`,*/ message: message || 'wrong response status', duration: 0 });
						}
					})
				;
			} else {
				Notification.warning({message:$t('phrase.need_auth_to_review')});
			}
			// this.$emit('submit', data);
		},

		likeReview(id) {
			if (this.isAuthenticated && this.authUser) {
				const data = {				
					review_id: id
				};

				this.like_review({data: data}).then(() => {
					this.fetchItems();
				})
			} else {
				Notification.warning({message: this.$t('phrase.need_auth_to_like')});
			}			
		}
	},

	watch: {
		'overlay.show'(isShow) {
			if (!isShow) {
				this.handleCloseReviewModal();
			}
		} 
	},

	created() {
		// this.setupReviewsForm(this.productItem);
	}

};
</script>