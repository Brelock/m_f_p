import { Notification } from 'element-ui';
import { getObjectVal } from '@/helpers';

const combineHeaders = headers => {
	if (headers) return headers;

	return headers;
	// headers = {'Content-Type': 'multipart/form-data'}
};

const setHttpToken = ({token, axiosConfig, axios}) => {
	try {
		const config = axiosConfig || axios.defaults;
		if (token) {
			// console.log(config)
	    config.headers.common['Authorization'] = `Bearer ${token}`;
		} else {
	    config.headers.common['Authorization'] = null;
		}
	} catch(e) {console.warn(e)}
	// console.log('2: ',axios.defaults.headers.common.Authorization)
};
const setCookieHash = ({cookie_hash, axiosConfig, axios}) => {
	try {
		const config = axiosConfig || axios.defaults;
		if (cookie_hash && cookie_hash != 'null') {
		// console.log('setCookieHash ', cookie_hash)
	    config.headers.common['cookie-hash'] = `${cookie_hash}`;
		} else {
	    config.headers.common['cookie-hash'] = null;
		}
	} catch(e) {console.warn(e)}
	// console.log('2: ',axios.defaults.headers.common.Authorization)
};

const prepareParams = getParams => {
	let result = {};
	for (let prop in getParams) {
		if (getParams[prop] || typeof getParams[prop] === 'boolean') {
			result[prop] = getParams[prop];
		}
	}

	return result;
};

const parsePayload = payloadData => {
	const result = {};
	// console.log(payloadData)
	if (payloadData) {
		const payload = { ...payloadData };

		// if (!isEmpty(payload)) {
		if (payload.params) result.params = prepareParams(payload.params);
		if (payload.data) result.data = payload.data;
		if (payload.url) result.mod_url = payload.url;
		if (payload.headers) result.headers = payload.headers;
		// }
	}
	return result;
};

const combineUrl = (initialUrl, params) => {
	let url = initialUrl;
	if (params) {
		// if (params.itemId) url = `${url}/${params.itemId}`;
		// const getParams = toUrl(params);
		const getParams = params;
		url = getParams ? `${url}?${getParams}` : url;
	}
	// console.log(url)
	return url;
};

const getParamsFromUrl = (url, paramName) => {
	const urlSplitted = url.split('?');
	let pathOnly = urlSplitted[0];
	let result = {
		pathOnly: pathOnly
	};

	if (urlSplitted && urlSplitted.length > 1) {
		const params = urlSplitted[urlSplitted.length - 1].split('&');
		for (let i = 0; i < params.length; i++) {
			let param = params[i];

			if (/#_=_/.test(param)) {
				param = param.replace('#_=_', '');		
			}

			const paramSplitted = param.split('=');
			result[ paramSplitted[0] ] = paramSplitted[1];
		}
	}

	/*if (param && window && window.location.hash && window.location.hash == '#_=_' ) {
		window.location.hash = '';
		param = param.replace(/#_=_/, '');
	}*/

	// console.log('url', urlSplitted[0])
	return result;
};

const isSuccessStatus = ({ status, data, config }) => {
	if (status >= 200 && status < 300) {
		// console.log(config);
		if (data && data.status) {
			return true;
		} else if (data || data != undefined) {
			return true;
		} else if (config && config.url == '/cart') {
			return true;
		}
	}
	return false;
};

const getResponseMessage = originalResponse => {
	let message = '';

	if (originalResponse) {
		const response = originalResponse.data ? originalResponse.data : originalResponse.response;

		if (response && response.data) {
			// console.log(response.data)
			const { messages, credit_card_number } = response.data;

			if (messages instanceof Array) {
				for (let i = 0; i < messages.length; i++) {
					for (let j = 0; j < messages[i].length; j++) {
						const comma = j === messages[i].length - 1 ? '.' : ', ';
						message += `${messages[i][j]}${comma}`;
					}
				}
			} 
			if (credit_card_number && credit_card_number.length) {
				for (let j = 0; j < credit_card_number.length; j++) {
					message += `${credit_card_number[j]}`;
				}
			}
		}
	}

	return message;
};

const getResultMessage = (resultMessageData, itemData) => {
	let message = '';
	if (resultMessageData) {
		const { is_true, is_false, flag, text } = resultMessageData;
		if (text) {
			message = text;
		} else if (flag && itemData) {
			message = itemData[flag] ? is_true : is_false;
		}
	}

	return message;
};

const getResponseValue = (response, payload) => {
	let result;
	const { alternateResponseProp, prepareData } = payload;
	if (alternateResponseProp) {
		result = getObjectVal(response, payload.alternateResponseProp, {withoutDeep:true});
	} else {
		result = response.data.data;
	}
	if (prepareData) {
		result = prepareDataFunctions[prepareData](result);
	}
	return result;
};

const handleError = (error, { commit, customMessage, reject = null, loading, notify, loadingProp }) => {
	try {
		const message = getResponseMessage(error);
		// console.log(error.response)
		if (error.response) {
			if (error.response.status === 401) {
				// commit('auth/AUTH_CLEAR', { root: true });

				// router.push('/');
				// commit('SET_STATUS_LOADING', false);
				// commit('SET_STATUS_SAVING', false);

				// if (reject) reject(error);
				Notification.warning({
					title: `Ограничение`,
					message: message || 'Эта операция только для авторизированных пользователей'
				});
				// return;
			}
		}
		// console.log(reject)
		
		if (loading) {
			if (loadingProp) {
				commit('SET_STATE', { stateProp: loadingProp, value: false });
			} else {
				commit('SET_STATUS_LOADING', false);
				commit('SET_STATUS_SAVING', false);
			}
		}
		if (notify) {
			Notification.error({ /*title: `Error`,*/ message: customMessage || message || error.message, duration: 0 });
		}

		if (reject) {
			reject(error);
		}

	} catch (e) {
		console.log(e);
	}
};

const prepareDataFunctions = {
	prepareProductsList: products => {
		let itemsList = [];

		for (let i = 0; i < products.length; i++) {
			let item = { ...products[i] };
			item.category_name_ru = products[i].category.title_ru;
			item.category_name_uk = products[i].category.title_uk;
			delete item.category;
			
			itemsList.push(item);
		}
		return itemsList;
	},

	prepareFilterOptionsList: options => {
		let itemsList = [];

		for (let i = 0; i < options.length; i++) {
			const { id, title_ru, title_uk } = options[i];

			let item = { 
				id: id,
				title_ru: title_ru,
				title_uk: title_uk
			};
			
			itemsList.push(item);
		}
		return itemsList;
	},

	prepareCitiesList: cities => {
		// console.time('cityList')
		let itemsList = [];

		for (let i = 0; i < cities.length; i++) {
			const city = cities[i];
			let item = {
				id: city.id,
				description_ru: city.description_ru, 
				description_uk: city.description_uk,
			}
			itemsList.push(item);
		}
		// console.timeEnd('cityList')

		return itemsList;
	},
	/*setupCatalogItems: (categories, products) => {
		
		function getSubCat(parentCat, categoriesList) {
			
			let otherCategories = [];
			let parentCategories = [];

			for (let i = 0; i < categoriesList.length; i++) {
				if (!categoriesList[i].parent_id || categoriesList[i].parent_id === parentCat.id) {
					parentCategories.push(categoriesList[i]);
				} else {
					otherCategories.push(categoriesList[i]);	
				}
			}

			if (otherCategories.length && parentCategories.length) {
				for (let i = 0; i < parentCategories.length; i++) {
					const currentSubCats = getSubCat(parentCategories[i], otherCategories);
					if (currentSubCats && currentSubCats.length) {
						parentCategories[i].sub_categories = currentSubCats;
					}
				}
				return parentCategories;						
			} else {
				return parentCategories;
			}
		}

		return getSubCat(categories, categories);
	}*/
};

// const isPrevent = () => this.$store.state.auth.preventRequests;
const isPrevent = () => false;

const	initialAsyncFetch = (store, { actions, params, options = {} }) => {
	// console.log(store.dispatch('products/fetch_top_of_the_day'))
	for (let i = 1; i < actions.length; i++) {
		// store.dispatch(actions[i])({ params: params, ...options });				
		store.dispatch(actions[i]);
	}
};

// -------------
const checkResponseCount = (count, category, resolve, {state, dispatch}) => {
	const currentCatId = state.global.current_category_request;
	// console.log('checkResponseCount ', currentCatId, category.id, `count=${count}`)
	if (currentCatId === category.id && count === 2) {
		dispatch('categories/set_category', category);
		dispatch('global/set_catalog_content_ready', true);
		dispatch('global/set_catalog_content_load', false);
		resolve();
	}
};

const fetch_category = (payload, store) => {
	store.dispatch('global/set_catalog_content_load', true);
	let accessCount = 0;

	return new Promise(function(resolve, reject) {
		store.dispatch('categories/fetch_category', payload).then(function(category) {
			store.dispatch('global/set_current_category_request', category.id);
			// console.log(category)
			if (category && category.children.length < 1) {

				/*function checkResponseCount(count, categoryId) {
					const currentCatId = store.state.global.current_category_request;
					console.log('checkResponseCount ', currentCatId, categoryId, `count=${count}`)
					if (currentCatId === categoryId && count === 2) {
						store.dispatch('global/set_catalog_content_ready', true);
						resolve();
					}
				}*/

				fetch_category_filters(category.id, store.dispatch).then(function(categoryId) {
					accessCount++;
					checkResponseCount(accessCount, category, resolve, store);
				}).catch(e => {
					console.warn(e)
					reject();
				});
				/*fetch_filter_options(category.id).then(() => {
					accessCount++;
					checkResponseCount(accessCount);
				}).catch(e => {
					console.warn(e)
					reject();
				});*/

				fetch_prices_and_products(category.id, store).then(function(categoryId) {
					accessCount++;
					checkResponseCount(accessCount, category, resolve, store);
				}).catch(e => {
					console.warn(e)
					reject();
				});
			} else {
				store.dispatch('categories/set_category', category);
				store.dispatch('global/set_catalog_content_ready', true);
				store.dispatch('global/set_catalog_content_load', false);				
				resolve();
			}

		}).catch(error => {
			console.warn(error)
			store.dispatch('global/set_router_error', error);
			reject();
		})
	})
};

const fetch_product = (payload, store) => {
	store.dispatch('global/set_catalog_content_load', true);

	return new Promise(function(resolve, reject) {
		store.dispatch('products/fetch_product', payload).then(product => {
			let accessCount = 0;
			// console.log(product)
			const checkResponseCount2 = (accessCount) => {
				// console.log(accessCount)
				if (accessCount === 1) {
					store.dispatch('products/set_product', product);
					store.dispatch('global/set_catalog_content_ready', true);
					store.dispatch('global/set_catalog_content_load', false);					
					resolve();
				}
			}

			fetch_published_reviews(product.id, store.dispatch).then(() => {
				accessCount++;
				checkResponseCount2(accessCount);
			}).catch(e => {
				console.warn(e)
				reject();
			});

			store.dispatch('global/set_catalog_content_ready', true);
			store.dispatch('global/set_catalog_content_load', false);
		}).catch(error => {
			console.warn(error);
			store.dispatch('global/set_router_error', error);
			reject();
		})
	})
};

const fetch_published_reviews = async function(productId, dispatch) {
	const filters = { max: 10, page: 1 };
	const payload = { 
		params: { ...filters, productId: productId },
		notLoading: true
	};
	await dispatch('reviews/fetch_published_reviews', payload)
};

const fetch_products = async function(categoryId, filters, dispatch) {
	const payload = { params: { categoryId: categoryId, ...filters } };
	await dispatch('products/fetch_products', payload)
};

const fetch_category_filters = async function(categoryId, dispatch) {
	const payload = { params: { max: -1, categoryId: categoryId } };					
	return await dispatch('filters/fetch_category_filters', payload)
		.then(() => categoryId)
};

const fetch_prices_and_products = (categoryId, {dispatch, state}) => {
	const payload = {	params: {categoryId: categoryId } };
	// console.log(1)
	return new Promise(function(resolve, reject) {
		dispatch('products/fetch_prices', payload).then(data => {
			dispatch('products/set_state', {
				stateProp: 'fetched_on_ssr',
				value: true,
			})

			const priceFilters = {
				minPrice: data.min,
				maxPrice: data.max
			};
			let accessCount = 0;
			const newFilters = {...state.products.filters, ...priceFilters, filterOptionIds: []};

			dispatch('products/set_filters', newFilters)

			fetch_products(categoryId, newFilters, dispatch).then(() => {
				resolve(categoryId);
			});							

			
			// console.log('1', data);
			// resolve();

			/*.catch((e)=> {
				reject(e);
			});*/
		})
		.catch(e => {
			console.log(e);
			reject(e);
		})
	})
};


export {
	combineHeaders,
	setHttpToken,
	setCookieHash,
	// toUrl,
	parsePayload,
	combineUrl,
	handleError,
	getResponseMessage,
	isSuccessStatus,
	isPrevent,
	getResultMessage,
	getResponseValue,
	prepareDataFunctions,
	initialAsyncFetch,
	getParamsFromUrl,

	fetch_category,
	fetch_product
};
