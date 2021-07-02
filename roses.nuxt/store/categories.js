import { dataState, statusState, filtersState } from '../store_common/commonState';
import { fetch_items, multipurpose_response } from '../store_common/commonActions';
import { dataMutations, statusMutations } from '../store_common/commonMutations';
// import { prepareDataFunctions } from '@/services/api_helpers';

// initial products state
const scopedState = {
	catalogLoading: false,
	// postsSomeData: {}
	menuCategoriesList: [],
	popularCategoriesList: []
	// flatCategoriesList: []
	// currentCategory: null,
};

const state = () => ({ ...dataState, ...statusState, ...filtersState, ...scopedState });
const mutations = { ...dataMutations, ...statusMutations};

const getters = {
	flatCategoriesList: ({menuCategoriesList}) => {
		// let result = [];
		function getItem({ id, title_ru, title_uk, parent_id, alias }) {
			return { 
				id:id,
				title_ru:title_ru,
				title_uk:title_uk,
				parent_id:parent_id,
				alias: alias
			};
		};

		function getChildrenCat(categoriesList) {
			let resultArray = [];
			let childrenCategories = [];

			for (let i = 0; i < categoriesList.length; i++) {
				resultArray.push( getItem(categoriesList[i]) );

				if (categoriesList[i].children.length) {
					childrenCategories = getChildrenCat(categoriesList[i].children);

					if (childrenCategories.length) {
						for (let j = 0; j < childrenCategories.length; j++) {
							resultArray.push( getItem(childrenCategories[j]) );
						}
					}
				}
			}
			return resultArray;
		}

		return getChildrenCat(menuCategoriesList)
	},
};

// actions
const actions = {
	fetch_categories(storeArgs, payload = {}) {
		// const newPayload = {...payload, stateProp:'itemsList'}
		return fetch_items(storeArgs, '/categories', payload);
	},

	fetch_menu_data(storeArgs, payload = {}) {
		const newPayload = { ...payload,
			method: 'GET',
			notNotify: true,
			// notSetToStore: true,
			stateProp: 'menuCategoriesList',
			loadingProp: 'catalogLoading',
			axios:this.$axios,
			// action: { actionName:'update_cookies_hash', alternateResponseProp:'headers' }
			// prepareData: 'setupCatalogItems'
		};

		return multipurpose_response(storeArgs, `/categories`, newPayload);/*.then(catalog => {
			const flatCategoriesList = get
			commit('SET_STATE',  { stateProp: 'flatCategoriesList', value: flatCategoriesList });
		});*/
		/*multipurpose_response(storeArgs, `/categories`, newPayload).then(categories => {
			multipurpose_response(storeArgs, `/products`, newPayload).then(products => {
				const items = prepareDataFunctions.setupCatalogItems(categories, products);
				const mutationPayload = { stateProp: 'menuCategoriesList', value: items };
				commit('SET_STATE', mutationPayload);
			})
		})*/
	},

	fetch_category(storeArgs, payload = {}) {
		const newPayload = { ...payload,
			method: 'GET',
			notNotify: true,
			stateProp: 'itemData',
			// loadingProp: 'catalogLoading',
			alternateResponseProp: 'data',
			axios:this.$axios,
			params: { ...payload.params, withChildren:true }
		};

		return multipurpose_response(storeArgs, `/categories/${payload.itemAlias}`, newPayload);
	},

	fetch_popular_categories(storeArgs, payload = {}) {
		const newPayload = { ...payload,
			method: 'GET',
			notNotify: true,
			stateProp: 'popularCategoriesList',
			// loadingProp: 'catalogLoading',
			// alternateResponseProp: 'data',
			axios:this.$axios,
			params: { ...payload.params, onlyPopular:true }
		};

		return multipurpose_response(storeArgs, `/categories`, newPayload);
	},

	set_category({ commit }, item = null) {
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
