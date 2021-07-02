import { dataState, statusState } from '../store_common/commonState';
import { fetch_items, save_data, delete_item , multipurpose_response} from '../store_common/commonActions';
import { dataMutations, statusMutations } from '../store_common/commonMutations';

// initial products state
const scopedState = {
	// postsSomeData: {}
	attributeGroupsList: [],
	attributeGroup: null,
	attributeOptionsList: [],
	attributeOption: null
	// category_filters: []
};

const state = () => ({ ...dataState, ...statusState, ...scopedState });
const mutations = { ...dataMutations, ...statusMutations };
const getters = {
	// favoritedProducts: state => state.users,
};

// actions
const actions = {
	fetch_attributes(storeArgs, payload = {}) {
		const newPayload = { ...payload,
			axios:this.$axios,
			// prepareData: 'prepareProductsList'
		};
		return fetch_items(storeArgs, `/attributes`, newPayload);
	},

	fetch_attribute(storeArgs, payload = {}) {
		const extendedPayload = { ...payload,
			stateProp: 'itemData',
			notNotify: true,
			axios:this.$axios,
			// prepareData: 'prepareFilterOptionsList'
		};
		return multipurpose_response(storeArgs, `/attributes/${itemId}`, extendedPayload);
	},

	fetch_attribute_groups(storeArgs, payload = {}) {
		const extendedPayload = { ...payload,
			stateProp: 'attributeGroupsList',
			notNotify: true,
			axios:this.$axios,
		};
		return multipurpose_response(storeArgs, '/attribute-groups', extendedPayload);
	},

	fetch_attribute_group(storeArgs, payload = {}) {
		const extendedPayload = { ...payload,
			stateProp: 'attributeGroup',
			notNotify: true,
			axios:this.$axios,
		};
		return multipurpose_response(storeArgs, `/attribute-groups/${itemId}`, extendedPayload);
	},

	fetch_attribute_options(storeArgs, payload = {}) {
		const extendedPayload = { ...payload,
			stateProp: 'attributeOptionsList',
			notNotify: true,
			axios:this.$axios,
		};
		return multipurpose_response(storeArgs, '/attribute-option', extendedPayload);
	},

	fetch_attribute_option(storeArgs, payload = {}) {
		const extendedPayload = { ...payload,
			stateProp: 'attributeOption',
			notNotify: true,
			axios:this.$axios,
		};
		return multipurpose_response(storeArgs, `/attribute-option/${itemId}`, extendedPayload);
	},

	/*save_category_filter(storeArgs, payload) {
		const extendedPayload = { ...payload, stateProp: 'itemData' };
		return save_data(storeArgs, `/products`, extendedPayload);
	},

	delete_category_filter(storeArgs, payload) {
		return delete_item(storeArgs, `/products/${payload.id}`, payload);
	},*/

	set_attributes({ commit }, items = []) {
		const payload = { stateProp: 'itemsList', value: items };
		commit('SET_STATE', payload);
	},
	set_attribute({ commit }, item = null) {
		const payload = { stateProp: 'itemData', value: item };
		commit('SET_STATE', payload);
	},
	set_attribute_groups({ commit }, items = []) {
		const payload = { stateProp: 'attributeGroupsList', value: items };
		commit('SET_STATE', payload);
	},
	set_attribute_group({ commit }, item = null) {
		const payload = { stateProp: 'attributeGroup', value: item };
		commit('SET_STATE', payload);
	},
	set_attribute_options({ commit }, items = []) {
		const payload = { stateProp: 'attributeOptionsList', value: items };
		commit('SET_STATE', payload);
	},
	set_attribute_option({ commit }, item = null) {
		const payload = { stateProp: 'attributeOption', value: item };
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
