import { dataState, filtersState, statusState } from '../store_common/commonState';
import { fetch_items, save_data, delete_item , multipurpose_response} from '../store_common/commonActions';
import { dataMutations, statusMutations } from '../store_common/commonMutations';

// initial products state
const scopedState = {
	publishedReviewsList: [],
	publishedReviewsMeta: {},
	userReviewsList: [],
	userReviewsMeta: {}
};

const state = () => ({ ...dataState, ...statusState, ...filtersState, ...scopedState });
const mutations = { ...dataMutations, ...statusMutations };
const getters = {
	// favoritedProducts: state => state.users,
};

// actions
const actions = {
	fetch_reviews(storeArgs, payload = {}) {
		const newPayload = { ...payload,
			axios:this.$axios,
			// prepareData: 'prepareProductsList'
		};
		return fetch_items(storeArgs, `/reviews`, newPayload);
	},

	fetch_review(storeArgs, payload = {}) {
		const extendedPayload = { ...payload,
			stateProp: 'itemData',
			notNotify: true,
			axios:this.$axios,
			// prepareData: 'prepareFilterOptionsList'
		};
		return multipurpose_response(storeArgs, `/reviews/${itemId}`, extendedPayload);
	},

	fetch_published_reviews(storeArgs, payload = {}) {
		const extendedPayload = { ...payload,
			stateProp: 'publishedReviewsList',
			saveMeta: { metaProp: 'publishedReviewsMeta' },			
			notNotify: true,
			axios:this.$axios,
		};
		// console.log(extendedPayload)
		return multipurpose_response(storeArgs, '/reviews', extendedPayload);
	},

	fetch_user_reviews(storeArgs, payload = {}) {
		const extendedPayload = { ...payload,
			stateProp: 'userReviewsList',
			saveMeta: { metaProp: 'userReviewsMeta' },			
			notNotify: true,
			axios:this.$axios,
		};
		return multipurpose_response(storeArgs, '/reviews/owner', extendedPayload);
	},

	save_review(storeArgs, payload) {
		const extendedPayload = { ...payload,
			notSetToStore:true,
			notNotifyError: true,
			axios:this.$axios,
			resultMessage: {text: "Спасибо за Ваш отзыв!" }
		};
		return save_data(storeArgs, `/reviews`, extendedPayload);
	},

	like_review(storeArgs, payload) {
		const extendedPayload = { ...payload,
			notSetToStore:true,
			notNotify: true,
			axios:this.$axios,
			method: 'POST'
		};
		return multipurpose_response(storeArgs, `/likeReview`, extendedPayload);
	},

	/*delete_category_filter(storeArgs, payload) {
		return delete_item(storeArgs, `/products/${payload.id}`, payload);
	},*/

	set_reviews({ commit }, items = []) {
		const payload = { stateProp: 'itemsList', value: items };
		commit('SET_STATE', payload);
	},
	set_user_reviews({ commit }, items = []) {
		const payload = { stateProp: 'userReviewsList', value: items };
		commit('SET_STATE', payload);
	},
	set_review({ commit }, item = null) {
		const payload = { stateProp: 'itemData', value: item };
		commit('SET_STATE', payload);
	},
	set_published_reviews({ commit }, items = []) {
		const payload = { stateProp: 'publishedReviewsList', value: items };
		commit('SET_STATE', payload);
	},
	set_filters({ commit }, filters) {
		const payload = { stateProp: 'filters', value: filters };
		commit('SET_STATE', payload);
	}
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
};
