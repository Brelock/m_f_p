import { filtersState, statusState } from '../store_common/commonState';
import { fetch_items, save_data, delete_item , multipurpose_response} from '../store_common/commonActions';
import { dataMutations, statusMutations } from '../store_common/commonMutations';

// initial products state
const scopedState = {
	meta_tags: null,
};

const state = () => ({ ...statusState, ...filtersState, ...scopedState });
const mutations = { ...dataMutations, ...statusMutations };
const getters = {
	// favoritedProducts: state => state.orders,
};

// actions
const actions = {
	fetch_meta_tags(storeArgs, payload = {}) {
		const extendedPayload = { ...payload,
			axios:this.$axios,
			notNotify: true,
			notNotifyError: true,
			stateProp: 'meta_tags',
			// prepareData: 'prepareProductsList'
		};
		return multipurpose_response(storeArgs, `/seo/meta-tags`, extendedPayload);
	},

	set_meta_tags({ commit }, items = null) {
		const payload = { stateProp: 'meta_tags', value: items };
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
