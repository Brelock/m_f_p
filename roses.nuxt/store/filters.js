import { dataState, statusState } from '../store_common/commonState';
import { fetch_items, save_data, delete_item, multipurpose_response } from '../store_common/commonActions';
import { dataMutations, statusMutations } from '../store_common/commonMutations';

// initial products state
const scopedState = {
	// postsSomeData: {}
	filterOptionsList: []

	// category_filters: []
};

const state = () => ({ ...dataState, ...statusState, ...scopedState });
const mutations = { ...dataMutations, ...statusMutations };
const getters = {
	// favoritedProducts: state => state.users,
};

// actions
const actions = {
	fetch_category_filters(storeArgs, payload = {}) {
		const newPayload = {
			...payload,
			axios: this.$axios,
			// prepareData: 'prepareProductsList'
		};
		return fetch_items(storeArgs, `/filters`, newPayload);
	},

	fetch_filter_options(storeArgs, payload = {}) {
		const extendedPayload = {
			...payload,
			stateProp: 'filterOptionsList',
			notNotify: true,
			axios: this.$axios,
			prepareData: 'prepareFilterOptionsList'
		};
		return multipurpose_response(storeArgs, '/filter-options', extendedPayload);
	},

	/*save_category_filter(storeArgs, payload) {
		const extendedPayload = { ...payload, stateProp: 'itemData' };
		return save_data(storeArgs, `/products`, extendedPayload);
	},

	delete_category_filter(storeArgs, payload) {
		return delete_item(storeArgs, `/products/${payload.id}`, payload);
	},*/

	set_category_filters({ commit }, items = []) {
		const payload = { stateProp: 'itemsList', value: items };
		commit('SET_STATE', payload);
	},

	set_filter_options({ commit }, items = []) {
		const payload = { stateProp: 'filterOptionsList', value: items };
		commit('SET_STATE', payload);
	},

	/*set_category_filter({ commit }, item = null) {
		const payload = { stateProp: 'itemData', value: item };
		commit('SET_STATE', payload);
	}*/
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
};
