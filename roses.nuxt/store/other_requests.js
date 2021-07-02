import { statusState } from '../store_common/commonState';
import { multipurpose_response } from '../store_common/commonActions';
import { dataMutations, statusMutations } from '../store_common/commonMutations';

// initial products state
const scopedState = {
	
};

const state = () => ({ ...statusState, ...scopedState });
const mutations = { ...dataMutations, ...statusMutations };
const getters = {
	// favoritedProducts: state => state.users,
};

// actions
const actions = {
	callback_request(storeArgs, payload = {}) {
		const newPayload = { ...payload,
			method: 'POST',
			notSetToStore: true,
			axios:this.$axios,
			resultMessage: {text: 'Мы перезвоним вам в ближайшее время'}
		};

		return multipurpose_response(storeArgs, `/requests`, newPayload);
	},
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
};
