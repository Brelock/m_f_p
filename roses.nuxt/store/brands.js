import { dataState, statusState, filtersState } from '../store_common/commonState';
import { fetch_items, /*fetch_data,*/ save_data, delete_item } from '../store_common/commonActions';
import { dataMutations, statusMutations } from '../store_common/commonMutations';

// initial products state
const scopedState = {
	// postsSomeData: {}	
};

const state = () => ({ ...dataState, ...statusState, ...filtersState, ...scopedState });
const mutations = { ...dataMutations, ...statusMutations };
const getters = {};

// actions
const actions = {
	fetch_brands(storeArgs, payload = {}) {
		const extendedPayload = { ...payload, axios:this.$axios };

		// const newPayload = {...payload, stateProp:'itemsList'}
		return fetch_items(storeArgs, '/brands', extendedPayload);
	},

	/*fetch_brand(storeArgs, payload) {
		const extendedPayload = { ...payload, stateProp: 'itemData' };
		return fetch_data(storeArgs, `/products/${extendedPayload.itemId}`, extendedPayload);
	},*/

	set_brands({ commit }, items = []) {
		const payload = { stateProp: 'itemsList', value: items };
		commit('SET_STATE', payload);
	},

	set_brands_filters({ commit }, filters) {
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
