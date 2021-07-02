import isEmpty from 'lodash/isEmpty';
import { product_actions } from '@/constants/global';

// import store from '@/store';
// import { isEmptyString } from '@/utils/validate';

const findItemBy = (property, value, itemsList = [], settings = {}) => {
	const { notStrict, returnIndex } = settings;
	let result = null;
	let index = null;
	if (itemsList.length) {
		for (let i = 0; i < itemsList.length; i++) {
			if (itemsList[i][property]) {
				if (notStrict) {
					if (itemsList[i][property] == value) {
						result = itemsList[i];
						index = i;
						break;
					}
				} else {
					if (itemsList[i][property] === value) {
						result = itemsList[i];
						index = i;
						break;
					}
				}
			}
		}
	}
	return returnIndex ? { item: result, index: index } : result;
};

const setObjectVal = (obj, accessors, val) => {
	var parts = accessors.split('.');

	for(var i = 0; i < parts.length-1; i++) {
		obj = obj[parts[i]] 
	}

	obj[parts[parts.length-1]] = val;
};

const getObjectVal = (obj, accessors, settings) => {

	let objCopy = (!!settings && !!settings.withoutDeep) ? { ...obj } : cloneDeep(obj);
	const parts = accessors.split('.');

	for (let i = 0; i < parts.length; i++) {
		objCopy = objCopy[parts[i]];
		if (isEmpty(objCopy)) {
			if (!objCopy) return null;
		}
	}

	return objCopy;
};

const getItemValue = (id, prop, list, index = null) => {
	const item = findItemBy('id', id, list);
	// console.log(item, id, list)
	if (item) {
		const val = getObjectVal(item, prop);
		if (val) {
			return index != undefined ? val[index] : val;
		}
	}
	return '';
};

const concatValues = (initialData, additionalData, { props }) => {
	let result = cloneDeep(initialData);

	for (let prop of props) {
		// console.log(result[prop], additionalData[prop])
		if (result[prop]) {
			if (additionalData[prop]) {
				if (result[prop] instanceof Array) {
					result[prop] = mergeArrays(result[prop], additionalData[prop]);
				} else if (result[prop] instanceof Object) {
					result[prop] = { ...result[prop], ...additionalData[prop] };
				} else {
					result[prop] = additionalData[prop];
				}
			}
		} else {
			result[prop] = additionalData[prop];
		}
	}
	return result;
};

const mergeArrays = (array1, array2, { duplicateCheckProp }) => {
	let newList = [];

	for (let i = 0; i < array1.length; i++) {
		newList.push(array1[i]);
	}

	for (let j = 0; j < array2.length; j++) {
		if (duplicateCheckProp) {
			if (array1.every(i1 => i1[duplicateCheckProp] !== array2[j][duplicateCheckProp])) {
				newList.push(array2[j]);
			}
		}
	}
	return newList;
};
/*const hasRightsToRoute = route => {
	let result = { hasAccess: true, reason: '' };
	try {
		for (let i = 0; i < route.matched.length; i++) {
			const { meta } = route.matched[i];

			if (!isEmpty(meta)) {
				const { isAuthenticated, authUser, first_loading_app } = store.state.auth;

				if (meta.auth) {
					result.hasAccess = isAuthenticated;
					result.reason = first_loading_app ? 'first_loading' : 'not_auth';
					if (!result.hasAccess) break;
				}

				if (meta.userTypes) {
					result.hasAccess = isAuthenticated ? meta.userTypes.some(type => authUser.type === type) : false;
					result.reason = first_loading_app ? 'first_loading' : 'limited_access';

					if (!result.hasAccess) break;
				}
			}
		}
	} catch (e) {
		console.log(e);
	}

	// console.log(next)
	return result;
};*/

const compareValues = (key, order = 'asc') => {
	return function innerSort(a, b) {
		try {
			if (!a || !b) {return 0;}
			if ( !a.hasOwnProperty(key) || !b.hasOwnProperty(key) ) {
				// property doesn't exist on either object
				return 0;
			}

			const varA = (typeof a[key] === 'string')
				? a[key].toUpperCase() : a[key];
			const varB = (typeof b[key] === 'string')
				? b[key].toUpperCase() : b[key];

			let comparison = 0;
			if (varA > varB) {
				comparison = 1;
			} else if (varA < varB) {
				comparison = -1;
			}
			return (
				(order === 'desc') ? (comparison * -1) : comparison
			);
		} catch (e) {console.log(e)}
	};
};

const groupBy = (list, key) => {
	return list.reduce(function(pv, ci) {
		// (pv[ci[key]] = pv[ci[key]] || []).push(ci);
		let npv = pv[getObjectVal(ci, key)];
		(pv[getObjectVal(ci, key)] = pv[getObjectVal(ci, key)] || []).push(ci);
		return pv;
	}, {});
};

const getPageType = (params, containerName) => {
	let isContainer = params.hasOwnProperty(containerName);
	let pageType = null;
	// console.log(params)
	if (isContainer) {
		if (!!params[containerName]) {
			const queryTypeSplitted = params[containerName].split('_');

			if (queryTypeSplitted.length > 1) {
				if (queryTypeSplitted[0] === 'c') { pageType = {alias:'categories', label: 'Категория'} }
				if (queryTypeSplitted[0] === 'p') { pageType = {alias:'products', label: 'Товар'} }
			} else {
				if (queryTypeSplitted[0] === 'orders') { pageType = {alias:'orders', label: 'Мои Заказы'} }
			}
		} else {
			pageType = {alias:'default', label: ''}			
		}
	}
	
	return pageType
};

const getParentPageRoute = path => {
	const routeParts = path.split('/');
	let route = '/';

	if (routeParts.length) {
		routeParts.splice(routeParts.length - 1, 1);
		route = routeParts.join('/');
	}
	return route;
};

// -------------------------
const updateFormData = (itemData, formData, additionalRules = {}) => {
	let item = cloneDeep(itemData);
	let newFormData = {};

	for (let prop in formData) {
		// console.log(prop, item[prop])
		// console.log(item[prop])
		if (item[prop]) {
			newFormData[prop] = item[prop];
		} else if (typeof item[prop] === 'boolean' || item[prop] === 0) {
			newFormData[prop] = item[prop];
		}
	}

	newFormData = { ...newFormData, ...additionalRules };

	return newFormData;
};

/*const isValid = (value, { method }) => {
	let result = true;

	if (method == 'isEmptyString') {
		result = !isEmptyString(value);
	}

	return result;
};*/

const cloneObj = o => ({ ...o });
const cloneArr = arr => [...arr];
const cloneDeep = item => JSON.parse(JSON.stringify(item));

const removeObjProps = (obj, props) => {
	let newObj = { ...obj };
	for (let i = 0; i < props.length; i++) {
		delete newObj[props[i]];
	}
	return newObj;
};

// -----------Product---------
const createActionBlock = action_state => {
	let result = '';

	const product_action = findItemBy('id', action_state, product_actions);
	if (product_action) {
		const {className, name} = product_action;
		const item = `<div class="action-block ${className} absolute">
										<span class="uppercase">${name}</span>
									</div>`;
		result += item;
	}

	/*for (let i = 0; i < actions.length; i++) {
		const product_action = findItemBy('id', actions[i], product_actions);
		if (product_action) {
			const {className, name} = product_action;
			const item = `<div class="action-block ${className} absolute">
											<span class="uppercase">${name}</span>
										</div>`;
			result += item;
		}

	}*/
	return result;
};

const getProdImgSrc = (picture, id, prop) => {
	// console.log(picture, id)
	if (prop && picture && picture[prop]) {
		return picture[prop];
	}
	if (picture && picture.picture_file_name) {
		return picture.picture_file_name;
	}
	return '';
};

// ----------Date-------------
const getYmdDateString = ({ dateObj, ms, withTime }) => {
	if (dateObj || ms) {
		const date = dateObj || new Date(ms);
		let y = date.getFullYear();
		let m = date.getMonth() + 1;
		let d = date.getDate();

		m = m < 10 ? `0${m}` : m;
		d = d < 10 ? `0${d}` : d;

		if (withTime) {
			let h = date.getHours();
			let mins = date.getMinutes();
			let s = date.getSeconds();
			
			h = h < 10 ? `0${h}` : h;
			mins = mins < 10 ? `0${mins}` : mins;
			s = s < 10 ? `0${s}` : s;

			return `${y}-${m}-${d} ${h}:${mins}:${s}`;
		}

		return `${y}-${m}-${d}`;
	}
	return '-';
};

const cleanDateString = str => {
	let result = '';

	const splited = str.split('T');
	if (splited.length > 1) {
		result += splited[0];

		const secondPart = splited[1].split('.');
		if (secondPart.length > 1) {
			result += ' ' + secondPart[0];
		}
	} else {
		result = str;
	}

	return result;
};

// --------------
const setupCategoryCrumbsList = (category, categoriesList) => {
	let crumbs = [];

	function getParentCat(catId) {
		try {
			let result = [];
			const item = findItemBy('id', catId, categoriesList);
			result.push(item);

			if (item.parent_id) {
				const parentCat = getParentCat(item.parent_id);
				if (parentCat.length) {
					for (let i = 0; i < parentCat.length; i++) {
						result.push(parentCat[i]);				
					}
				}
			}
			return result;
		} catch(e) {console.warn(e)}
	};	

	const parentCatsList = getParentCat(category.id);
	if (parentCatsList.length) {
		for (let i = 0; i < parentCatsList.length; i++) {
			const crumb = { 
				id: parentCatsList.length + 1 - i,
				to: `/c_${parentCatsList[i].alias}`,
				title_ru: parentCatsList[i].title_ru,
				title_uk: parentCatsList[i].title_uk
			}
			crumbs.unshift(crumb);
		}

		const homeItem = {id:1, to:'/', title_ru:'Главная', title_uk:'בית' };
		crumbs.unshift(homeItem);
	}
	return crumbs;
};

const getLocaleCode = code => {
	if (code) {
		return code == 'he' ? 'uk' : code;
	}
	return code;
};

const getPrice = (price, quantity, settings) => {
	let num = +price;

	if ( (num ^ 0) === num ) {
		return settings && settings.valueOnly ? num * quantity : `${num * quantity}₪`;
	} else {
		return settings && settings.valueOnly ? (num * quantity).toFixed(2) : `${(num * quantity).toFixed(2)}₪`;
	}
};

const buildRating = rating => {
	let result = '';
	for (let i = 0; i < 5; i++) {
		const isActive = i < rating;
		const item = `<li><i class="icomoon ${isActive ? 'active' : ''}"></i></li>`;
		result += item;
	}
	return result;
};

const getSeoLink = route => {
	return `https://zermarket.co.il${route.path				
		.toLowerCase()
		.replace(/\/$/, '')}`
};

const getAlias = url => {
	const urlArr = url.split('_');

	if (urlArr.length > 1) {
		return urlArr[1]
	}

	return null;
};

const setupLabel = (item, { accessors, delimeter }) => {
	let label = '';
	for (let i = 0; i < accessors.length; i++) {
		const val = getObjectVal(item, accessors[i]);

		if (val) {
			const delr = i < 2 ? '-' : delimeter;
			label += `${delr} ${val} `;
		}
	}
	return label.slice(2, label.length);
};


export {
	findItemBy,
	// hasRightsToRoute,
	getPageType,
	cloneObj,
	cloneArr,
	cloneDeep,
	removeObjProps,
	updateFormData,
	getParentPageRoute,
	// isValid,
	setObjectVal,
	getObjectVal,
	getItemValue,
	concatValues,
	mergeArrays,
	createActionBlock,
	getProdImgSrc,
	compareValues,
	groupBy,
	getYmdDateString,
	cleanDateString,
	setupCategoryCrumbsList,
	getLocaleCode,
	getPrice,
	buildRating,
	getSeoLink,
	getAlias,
	setupLabel
};
