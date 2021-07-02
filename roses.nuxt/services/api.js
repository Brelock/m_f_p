import { combineHeaders, parsePayload } from './api_helpers';
import { findItemBy, cloneDeep, cloneArr } from '@/helpers';
// import { headerMenuData, brands } from '../store_common/fakeData';

// ===============
const api = (axios, method, url, payload ) => {
	const { headers, data, params, mod_url } = parsePayload(payload);
	// console.log('headers', headers, 'url: ', url);
	return axios({
		method,
		url: mod_url || url,
		// headers: combineHeaders(headers),
		headers: headers,
		params: params,
		data: data
	});
};

/*const fakeApi = (axios, method, urlArg, payload ) => {
	const { headers, data, params, mod_url } = parsePayload(payload);
	let url = mod_url || urlArg;
	let response = {
		data: {
			data: null,
			messages: []
		},
		status: 400
	};

	const hasId = url.match(/\d+/);
	let itemId;

	if (hasId && hasId.length) {
		itemId = +hasId[0];
		// console.log(itemId)
	}
	// const itemId = url.replace(/\d+/);
	if (itemId) {
		url = url.replace(/\d+/, ':id');
	}

	// console.log('url: ', url)

	return new Promise((resolve, reject) => {

		if (method === 'GET') {

			switch (url) {

				case '/products/combined':
				// console.log(headerMenuData) 
					response.status = 200;
					response.data.data = headerMenuData;
				break;

				case '/products/top':
					response.status = 200;	
					response.data.data = products.filter(p => p.topOfTheDay)[0];
				break;

				case '/products/bestSellers':
					response.status = 200;
					response.data.data = products.filter(p => p.bestSeller);
				break;

				case '/products/newProducts':
					response.status = 200;
					response.data.data = products.filter(p => p.isNew);
				break;

				case '/products/discounts':
					response.status = 200;
					response.data.data = products.filter(p => p.discount_price);
				break;

				case '/products/favorited':
					response.status = 200;
					response.data.data = products.filter(p => p.is_favorited);
				break;

				case '/products/cart':
					response.status = 200;
					response.data.data = products.filter(p => p.in_cart);
				break;

				// ----brands-----
				case '/brands':
					response.status = 200;
					response.data.data = [...brands];
				break;
				
				default: console.error('no correct url');
			}
		}
		if (method === 'PUT') {
			// const id = 1;
			const {item, index} = findItemBy('id', itemId, products, {returnIndex: true});

			switch (url) {

				case '/products/:id/toggle_favorited':
					if (item) {
						let itemCopy = {...item};
						itemCopy.is_favorited = !itemCopy.is_favorited;
						products[index] = itemCopy;
						response.data.data = products[index];
						response.status = 200;
					}
				break;

				case '/products/:id/toggle_cart':
					if (item) {
						let itemCopy = {...item};
						itemCopy.in_cart = !itemCopy.in_cart;
						products[index] = itemCopy;
						response.data.data = products[index];
						response.status = 200;
					}
				break;
				
				default: console.error('no correct url');
			}
		}
		setTimeout(() => {
			if (response.status === 200) {
				resolve(response);				
			} else {
				response.data.messages.push('missing endpoint');	
				reject(response);
			}

			// console.log('response status: ', response.status)
		}, 100);
	});
};*/

export { api/*, fakeApi*/ };