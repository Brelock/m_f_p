import { dataState, statusState, filtersState } from '../store_common/commonState';
import { fetch_items, delete_item, save_data, multipurpose_response } from '../store_common/commonActions';
import { dataMutations, statusMutations } from '../store_common/commonMutations';
// import { prepareDataFunctions } from '@/services/api_helpers';

// initial products state
const scopedState = {
	// itemData: {}

};

const state = () => ({ ...dataState, ...statusState, ...filtersState, ...scopedState });
const mutations = { ...dataMutations, ...statusMutations};

const getters = {
	// favoritedProducts: state => state.users,
};

// actions
const actions = {
	// get_context_pyload() {	return {axios:this.$axios, router:this.$router} },

	fetch_cart(storeArgs, payload = {}) {
		// console.log(storeArgs.rootState.auth.cookie_hash)
		const extendedPayload = { ...payload,
			axios:this.$axios,
			stateProp: 'itemData',
			alternateResponseProp: 'data',
			notNotify: true,
		}
		return multipurpose_response(storeArgs, `/cart`, extendedPayload);
	},

	edit_cart_item(storeArgs, payload) {
		const extendedPayload = { ...payload,
			axios:this.$axios,
			notNotify: true,
			notSetToStore: true
		}
		return save_data(storeArgs, `/cart/edit-item`, extendedPayload);
	},

	cart_checkout(storeArgs, payload) {
		const extendedPayload = { ...payload,
			axios:this.$axios,
			// notNotify: true,
			action: {actionName:'fetch_cart'},
			resultMessage: {text: "Ваш заказ принят! Спасибо!"},
			notSetToStore: true
		}
		return save_data(storeArgs, `/cart/checkout`, extendedPayload);
	},

	remove_from_cart(storeArgs, payload) {
		const extendedPayload = { ...payload,
			axios:this.$axios,
			action: {actionName:'fetch_cart'},
			resultMessage: {text: "Товар удален из корзины"}
		}
		// console.log(payload)
		return delete_item(storeArgs, `/cart/delete-item/${payload.itemId}`, extendedPayload);
	},

	set_cart({ commit }, item = {}) {
		const payload = { stateProp: 'itemData', value: item };
		commit('SET_STATE', payload);
	},


	// -------------------

};


export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
};
