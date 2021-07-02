// import { dataState, statusState, filtersState, sortingState } from '../commonState';
// import { multipurpose_response } from '../store_common/commonActions';
import { dataMutations } from '../store_common/commonMutations';

const itemsModules = [
	// { moduleName: 'companies', action: 'set_companies_filters' },
	// { moduleName: 'plants', action: 'set_plants_filters'},
	// { moduleName: 'controllers', action: 'set_controllers_filters' },
	// { moduleName: 'sensors', action: 'set_sensors_filters' }
];

const state = () => ({
	overlay: {
		show: false,
		text: '',
		zIndex: 2600
	},
	navbarSettings: {
		showCreateButton: false
	},
	globalFilters: {
		plantId: null
	},

	locale: null,
	page_type: '',
	catalog_contentReady: false,
	catalog_content_isLoad: false,
	current_category_request: null,

	routerError: null,
	showSpinner: false
});

const mutations = { ...dataMutations };
const getters = {};

// actions
const actions = {
	show_overlay({ commit }, data) {
		const payload = { stateProp: 'overlay', value: data };
		commit('SET_STATE', payload);
	},
	setup_navbar({ commit }, data = {}) {
		const payload = { stateProp: 'navbarSettings', value: data };
		commit('SET_STATE', payload);
	},

	set_global_filters({ commit, dispatch, rootState }, { setForAll, globFilters, itemsFilters }) {
		const payload = { stateProp: 'globalFilters', value: globFilters };
		commit('SET_STATE', payload);

		if (setForAll) {
			for (let moduleItem of itemsModules) {
				const { moduleName, action } = moduleItem;
				const newItemFilters = { ...rootState[moduleName].filters, ...itemsFilters };
				dispatch(`${moduleName}/${action}`, newItemFilters, { root: true });
			}
		}
	},

	set_page_type({ commit }, value) {
		const payload = { stateProp: 'page_type', value: value };
		commit('SET_STATE', payload);
	},

	set_catalog_content_ready({ commit }, value) {
		const payload = { stateProp: 'catalog_contentReady', value: value };
		commit('SET_STATE', payload);
	},

	set_catalog_content_load({ commit }, value) {
		const payload = { stateProp: 'catalog_content_isLoad', value: value };
		commit('SET_STATE', payload);
	},

	set_current_category_request({ commit }, value) {
		const payload = { stateProp: 'current_category_request', value: value };
		commit('SET_STATE', payload);
	},
	set_router_error({ commit }, value) {
		const payload = { stateProp: 'routerError', value: value };
		commit('SET_STATE', payload);
	},
	set_show_spinner({ commit }, value) {
		const payload = { stateProp: 'showSpinner', value: value };
		commit('SET_STATE', payload);
	},

	set_state({ commit }, payload) {
		commit('SET_STATE', payload);
	},

	

	/*emit_submit_item_form({ commit }, data = {}) {
		const payload = { stateProp: 'navbarSettings', value: data };
		commit('SET_STATE', payload);
	}*/
};

export default {
	state,
	getters,
	actions,
	mutations
};
