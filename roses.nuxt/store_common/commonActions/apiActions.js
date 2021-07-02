import {
	getResponseMessage,
	getResultMessage,
	isSuccessStatus,
	handleError,
	isPrevent,
	getResponseValue,
} from '@/services/api_helpers';
import { Notification } from 'element-ui';
import { api/*, fakeApi*/ } from '@/services/api';

const getOptions = payload => {
	const { notNotify, notSetToStore, notLoading, axios, notNotifyError } = payload;

	return {
		loading: !notLoading,
		notify: !notNotify,
		toStore: !notSetToStore,
		notifyError: !notNotifyError,
		axios: axios,
		// router: router,
		// updateStore: stateProps		
	};
};

const fetch_items = ({ commit, dispatch }, url, payload = {}) => {
	if (isPrevent()) return;
	const { loading, notify, toStore, axios, notifyError } = getOptions(payload);

	if (loading) commit('SET_STATUS_LOADING', true);

	return new Promise((resolve, reject) => {
		api(axios, 'GET', url, payload)
		// fakeApi(axios, 'GET', url, payload)
			.then(response => {
				
				// console.log(response)
				dispatch('auth/update_cookies_hash', response.headers, {root:true});
				if (isSuccessStatus(response)) {
					// const value = getResponseValue(response, payload);

					try {
						if (toStore) {
							commit('SET_STATE', {
								stateProp: 'itemsList',
								value: getResponseValue(response, payload)
							});

							if (response.data.meta) {
								commit('SET_STATE', {
									stateProp: 'fetchedMeta',
									value: response.data.meta
								});
							}
						}

						resolve(response.data);
					} catch (e) {
						console.log(e);
					}
				} else {
					const message = getResponseMessage(response);
					reject(response);
					Notification.error({ /*title: `Error`,*/ message: message || 'wrong response status', duration: 0 });
				}
				// setTimeout(() => {
				if (loading) commit('SET_STATUS_LOADING', false);
				// }, 2000);
			})
			.catch(error => {
				handleError(error, { commit:commit, reject:reject, loading:loading, notify: notifyError });
			});
	});
};

const save_data = ({ state, commit, dispatch }, payloadUrl, payload = {}) => {
	if (isPrevent()) return;
	const { loading, notify, toStore, axios, notifyError } = getOptions(payload);

	if (loading) commit('SET_STATUS_SAVING', true);

	let options;
	if (payload.data.id || payload.itemId) {
		options = {
			method: 'PUT',
			url: `${payloadUrl}/${payload.data.id || payload.itemId}`,
			// resultMessage: 'saved',
			updateRoute: false
			// returnParentRoute: true
		};
	} else {
		options = {
			method: 'POST',
			url: payloadUrl,
			// resultMessage: 'created',
			updateRoute: true
			// returnParentRoute: true
		};
	}
	const { method, url, updateRoute } = options;
	// console.log(options)
	return new Promise((resolve, reject) => {
		api(axios, method, url, payload)
			.then(response => {
				// dispatch('auth/update_cookies_hash', response.headers, {root:true});

				if (isSuccessStatus(response)) {
					try {
						const { stateProp, resultMessage, action, updateItem } = payload;
						const value = getResponseValue(response, payload);

						if (toStore) {
							commit('SET_STATE', {
								stateProp: stateProp,
								value: value
							});
						}
						resolve({ data: response.data, updateRoute: updateRoute });
						if (notify) Notification.success({ title: `${resultMessage.text}`, duration: 0 });

							// console.log(value)
						if (action) {
							if (action.valueToPayload) {
								dispatch(action.actionName, value, {root: action.root});
							} else {
								dispatch(action.actionName, response, {root: action.root});
							}
						}

						// if (updateItem && value) {
						// 	const listProp = stateProp || 'itemsList';
						// 	const {item, index} = findItemBy('id', value.id, state[listProp], {returnIndex:true} );
						// 	if (item) {
						// 		const newList = [...state[listProp] ];
						// 		newList[index] = item
						// 		commit('SET_STATE', {})
						// 	}
						// }
					} catch (e) {
						console.warn(e);
					}
				} else {
					const message = getResponseMessage(response);
					reject(response);
					Notification.error({ /*title: `Error`,*/ message: message || 'wrong response status', duration: 0 });
				}

				if (loading) commit('SET_STATUS_SAVING', false);
			})
			.catch(error => {
				// console.log('catch', reject)
				handleError(error, { commit: commit, reject: reject, loading: loading, notify: notifyError });
			});
	});
};

const multipurpose_response = ({ commit, dispatch }, url, payload = {}) => {
	if (isPrevent()) return;
	const { loading, toStore, notify, notifyError, axios } = getOptions(payload);

	const { method, loadingProp } = payload;

	if (loading) {
		if (loadingProp) {
			commit('SET_STATE', { stateProp: loadingProp, value: true });
		} else {
			commit('SET_STATUS_LOADING', true);
		}
	}
	
	return new Promise((resolve, reject) => {
		api(axios, method, url, payload)
			.then(response => {
				// console.log('multipurpose_response', response)
				if (isSuccessStatus(response)) {
					try {
						dispatch('auth/update_cookies_hash', response.headers, {root:true});
						const { stateProp, nestedStateProp, action, resultMessage, concatData, stateProps, saveMeta } = payload;
						const value = getResponseValue(response, payload);
						// console.log(response, value)

						if (toStore) {
							if (nestedStateProp) {
								commit('SET_NESTED_STATE', {
									stateProp: nestedStateProp,
									value: value,
									concatData: concatData
								});
							} else {
								commit('SET_STATE', {
									stateProp: stateProp,
									value: value,
									concatData: concatData
								});
							}

							if (stateProps) {
								commit('UPDATE_STORE', {
									stateProps: stateProps,
									value: value
								});
							}

							if (saveMeta && response.data.meta) {
								commit('SET_STATE', {
									stateProp: saveMeta.metaProp,
									value: response.data.meta
								});
							}
						}

						if (action) {
							if (action.valueToPayload) {
								// console.log(value)
								dispatch(action.actionName, value, {root: action.root});
							} else {
								dispatch(action.actionName, response, {root: action.root});
							}
							// dispatch(action.actionName, getResponseValue(response, action));
						}
						// console.log(response)
						// resolve({ data: response.data });

						resolve(value);
						const message = getResultMessage(resultMessage, response.data.data);
						if (notify) Notification.success({ title: `${resultMessage.text}`, duration: 2500 });
					} catch (e) {
						console.warn(e);
					}
				} else {
					const message = getResponseMessage(response);
					reject(response);
					Notification.error({ /*title: `Error`,*/ message: message || 'wrong response status', duration: 0 });
				}

				if (loading) {
					if (loadingProp) {
						commit('SET_STATE', { stateProp: loadingProp, value: false });
					} else {
						commit('SET_STATUS_LOADING', false);
					}
				}
			})
			.catch(error => {
				// console.log('catch', reject)
				handleError(error, { commit: commit, reject: reject, loading: loading, notify: notifyError });
			});
	});
};

const delete_item = ({ commit, dispatch }, url, payload = {}) => {
	if (isPrevent()) return;
	const { loading, notify, axios } = getOptions(payload);

	if (loading) commit('SET_STATUS_SAVING', true);

	return new Promise((resolve, reject) => {
		api(axios, 'DELETE', url)
			.then(response => {
				if (isSuccessStatus(response)) {
					try {
						const { action, resultMessage } = payload;

						resolve(response.data);

						if (action) {
							// dispatch(action.actionName, getResponseValue(response, action));
							dispatch(action.actionName, response, {root: action.root});
						}
						const message = getResultMessage(resultMessage, response.data.data);
						if (notify) Notification.success({ title: `${resultMessage.text}`, duration: 2500 });
					} catch (e) {
						console.log(e);
					}
				}

				if (loading) commit('SET_STATUS_SAVING', false);
			})
			.catch(error => {
				handleError(error, { commit: commit, reject: reject, loading: loading, notify: notify });
			});
	});
};

export { fetch_items, /*fetch_data,*/ save_data, delete_item, multipurpose_response };
