import { dataState, filtersState, statusState } from '../store_common/commonState';
import { fetch_items, save_data, delete_item , multipurpose_response} from '../store_common/commonActions';
import { dataMutations, statusMutations } from '../store_common/commonMutations';

// initial products state
const scopedState = {
	// publishedbannersList: [],
	// publishedbannersMeta: {},
	// userbannersList: [],
	// userbannersMeta: {}
};

const state = () => ({ ...dataState, ...statusState, ...filtersState, ...scopedState });
const mutations = { ...dataMutations, ...statusMutations };
const getters = {
	// publishedItems: state => state.itemsList.filter(bi => bi.is_published),
};

// actions
const actions = {
	fetch_banner_items(storeArgs, payload = {}) {
		const newPayload = { ...payload,
			axios:this.$axios,
			// prepareData: 'prepareProductsList'
		};
		// console.log('newPayload')
		return fetch_items(storeArgs, `/banners`, newPayload);
	},

	set_banner_items({ commit }, items = []) {
		const payload = { stateProp: 'itemsList', value: items };
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
