import { dataState, filtersState, statusState } from '../store_common/commonState';
import { fetch_items, save_data, delete_item , multipurpose_response} from '../store_common/commonActions';
import { dataMutations, statusMutations } from '../store_common/commonMutations';

// initial products state
const scopedState = {
};

const state = () => ({ ...dataState, ...statusState, ...filtersState, ...scopedState });
const mutations = { ...dataMutations, ...statusMutations };
const getters = {
	// favoritedProducts: state => state.users,
};

// actions
const actions = {
	fetch_users(storeArgs, payload = {}) {
		const newPayload = { ...payload,
			axios:this.$axios,
			// prepareData: 'prepareProductsList'
		};
		return fetch_items(storeArgs, `/users`, newPayload);
	},

	fetch_user(storeArgs, payload = {}) {
		const extendedPayload = { ...payload,
			stateProp: 'itemData',
			notNotify: true,
			axios:this.$axios,
			// prepareData: 'prepareFilterOptionsList'
		};
		return multipurpose_response(storeArgs, `/users/${itemId}`, extendedPayload);
	},

	save_user(storeArgs, payload) {
		const extendedPayload = { ...payload,
			notSetToStore:true,
			axios:this.$axios,
			resultMessage: {text: 'Личные данные сохранены' }
		};
		return save_data(storeArgs, `/users`, extendedPayload);
	},

	/*delete_category_filter(storeArgs, payload) {
		return delete_item(storeArgs, `/products/${payload.id}`, payload);
	},*/

	set_user({ commit }, item = null) {
		const payload = { stateProp: 'itemData', value: item };
		commit('SET_STATE', payload);
	},
	set_users({ commit }, items = []) {
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
