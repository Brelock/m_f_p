import { dataState, filtersState, statusState } from '../store_common/commonState';
import { fetch_items, save_data, delete_item , multipurpose_response} from '../store_common/commonActions';
import { dataMutations, statusMutations } from '../store_common/commonMutations';

// initial products state
const scopedState = {
	userOrdersList: [],
	userOrdersMeta: {}
};

const state = () => ({ ...dataState, ...statusState, ...filtersState, ...scopedState });
const mutations = { ...dataMutations, ...statusMutations };
const getters = {
	// favoritedProducts: state => state.orders,
};

// actions
const actions = {
	fetch_orders(storeArgs, payload = {}) {
		const newPayload = { ...payload,
			axios:this.$axios,
			// prepareData: 'prepareProductsList'
		};
		return fetch_items(storeArgs, `/orders`, newPayload);
	},

	fetch_order(storeArgs, payload = {}) {
		const extendedPayload = { ...payload,
			stateProp: 'itemData',
			notNotify: true,
			axios:this.$axios,
			// prepareData: 'prepareFilterOptionsList'
		};
		return multipurpose_response(storeArgs, `/orders/${itemId}`, extendedPayload);
	},

	fetch_user_orders(storeArgs, payload = {}) {
		const extendedPayload = { ...payload,
			stateProp: 'userOrdersList',
			saveMeta: { metaProp: 'userOrdersMeta' },			
			notNotify: true,
			axios:this.$axios,
		};
		return multipurpose_response(storeArgs, '/orders/owner', extendedPayload);
	},

	save_order(storeArgs, payload) {
		const extendedPayload = { ...payload,
			notSetToStore:true,
			axios:this.$axios,
			resultMessage: {text: 'Заказ сохранен' }
		};
		return save_data(storeArgs, `/orders`, extendedPayload);
	},

	/*delete_category_filter(storeArgs, payload) {
		return delete_item(storeArgs, `/products/${payload.id}`, payload);
	},*/

	set_user({ commit }, item = null) {
		const payload = { stateProp: 'itemData', value: item };
		commit('SET_STATE', payload);
	},
	set_orders({ commit }, items = []) {
		const payload = { stateProp: 'itemsList', value: items };
		commit('SET_STATE', payload);
	},
	set_user_orders({ commit }, items = []) {
		const payload = { stateProp: 'userOrdersList', value: items };
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
