import { Notification } from 'element-ui';
import { statusState } from '../store_common/commonState';
import { multipurpose_response } from '../store_common/commonActions';
import { statusMutations, dataMutations } from '../store_common/commonMutations';
import { getResponseMessage, isSuccessStatus, handleError, setHttpToken } from '@/services/api_helpers';
import { api } from '@/services/api';
// import router from '@/router';
import { getLocaleCode } from '@/helpers';
import Cookies from 'universal-cookie';
const cookies = new Cookies();


let cookie_hash_from_cookies = cookies.get('cookie_hash');
// const token = cookies.get('access_token');
// let user = cookies.get('authUser');
// console.log('store from cookies: ', cookie_hash, user)
/*if (user) {
	user = JSON.parse(cookies.get('authUser'));
}*/

// auth state
const state = () => ({
	...statusState,
	preventRequests: false,
	authUser: null,
	isAuthenticated: false,
	access_token: null,
	cookie_hash: '',
	cookie_hash_from_cookies: cookie_hash_from_cookies,
	// authUser: !!token && !!user ? user : null,
	// isAuthenticated: !!user || false,
	// access_token: token || null,

	first_loading_app: true,
	notifyOnClient: null,
	dispatchOnClient: null,
	userFetchedOnServer: false,
	recoveryLoading: false
	// cookie_hash: !!cookie_hash ? cookie_hash : '',
});

// console.log('store state: ', state())


// getters
const getters = {};

// actions
const actions = {
	sign_in({ commit, dispatch }, payload) {
		commit('SET_STATUS_LOADING', true);

		api(this.$axios, 'POST', '/auth/login', payload)
			.then(response => {
				// console.log(response)
				// console.log('sign_in', response.headers['cookie-hash'])
				
				dispatch('update_cookies_hash', response.headers);
				// let x = response.headers.cookie_hash;
				if (isSuccessStatus(response)) {
					const { access_token, user } = response.data.data;

					if (access_token) {
						// this.$router.push('/');
						const i18n = this.$i18n;

						dispatch('update_auth_data', response);
						Notification.success({/*title: 'sdfsdf',*/ 
							message: `<span class="capitalize-first">${i18n.t('phrase.welcome')}</span>, <span class="capitalize">${user.full_name}</span>`/*, duration: 0*/,
							dangerouslyUseHTMLString: true
						});
					} else {
						commit('AUTH_CLEAR', { axios:this.$axios });
					}

					if (response.headers['cookie-hash']) {
						dispatch('cart/fetch_cart', {}, {root:true});
					}
				} else {
					const message = getResponseMessage(response);
					// console.log(message)
					Notification.error({ /*title: `Error`,*/ message: message || 'wrong response status', duration: 0 });
				}
				commit('SET_STATUS_LOADING', false);
			})
			.catch(error => {
				// console.log(error)
				commit('AUTH_CLEAR', { axios:this.$axios });
				handleError(error, { that:this, commit: commit, loading: true, notify: true });
			});
	},

	sign_in_social({ commit, dispatch }, payload) {
		commit('SET_STATUS_LOADING', true);

		api(this.$axios, 'GET', `/social-auth/${payload.provider}?location=${getLocaleCode(this.$i18n.locale)}`, payload)
			.then(response => {
				// console.log(response)
				// console.log('sign_in', response.headers['cookie-hash'])
				
				dispatch('update_cookies_hash', response.headers);
				// let x = response.headers.cookie_hash;
				if (isSuccessStatus(response)) {
					const { data } = response;

					if (data) {
						if (this.$router.history.current.path == '/checkout') {
							cookies.set('redirectToCheckout', true);
						}
						window.location.href = data;

						// dispatch('social_auth_request', {url:data});
					} else {
						commit('AUTH_CLEAR', { axios:this.$axios });
					}

				} else {
					const message = getResponseMessage(response);
					Notification.error({ /*title: `Error`,*/ message: message || 'wrong response status', duration: 0 });
					commit('SET_STATUS_LOADING', false);
				}
			})
			.catch(error => {
				// console.log(error)
				commit('AUTH_CLEAR', { axios:this.$axios });
				handleError(error, { that:this, commit: commit, loading: true, notify: true });
			});
	},

	get_auth_user({ commit, dispatch }, payload = {}) {
		// console.log('get_auth_user', this.$axios)
		commit('SET_STATUS_LOADING', true);
		const { token, notifyWhenSuccess, fetchOnServer } = payload;
		if (token) {
			commit('AUTH_TOKEN_SUCCESS', { token: token, axios:this.$axios });
		}
		// dispatch('get_auth_user')

		return new Promise((resolve, reject) => {
			api(this.$axios, 'GET', '/auth/user')
			// api(this.$axios, 'GET', '/auth/user')
				.then(response => {
					// console.log('response', response)

					dispatch('update_cookies_hash', response.headers);
					// console.log('get_auth_user then');
					if (isSuccessStatus(response)) {
						if (response.data.data) {
							const { user } = response.data.data;
							commit('AUTH_USER_SUCCESS', user);
							
							if (notifyWhenSuccess) {
								const i18n = this.$i18n;
								Notification.success(`${i18n.t('phrase.welcome')} ${user.full_name}`);
							}
							if (fetchOnServer) {
								commit('SET_STATE',{stateProp:'userFetchedOnServer', value: true});								
							}
						} else {
							commit('AUTH_CLEAR', { axios:this.$axios });
						}
						resolve(response.data);
					} else {
						const message = getResponseMessage(response);
						reject(response);
						Notification.error({ /*title: `Error`,*/ message: message || 'wrong response status' });
					}
					commit('SET_STATUS_LOADING', false);
				})
				.catch(error => {
					// console.log('error', error)
					commit('AUTH_CLEAR', { axios: this.$axios });
					commit('SET_STATUS_LOADING', false);
					
					const i18n = this.$i18n;
					const notify_value = { type:'warning', message:`${i18n.t('phrase.token_expired')}` };
					commit('SET_STATE',{stateProp:'notifyOnClient', value: notify_value});

					const dispatch_value = { action:'auth/clear_auth', payload:null };
					commit('SET_STATE',{stateProp:'dispatchOnClient', value: dispatch_value});

					reject(error);
					// console.log(error)
					/*handleError(error, {
						commit: commit,
						reject: reject,
						customMessage: 'auth user not fetched',
						loading: true
					});*/
				});
		});
	},

	sign_up(storeArgs, payload = {}) {
		const i18n = this.$i18n;
		const newPayload = { ...payload,
			method: 'POST',
			notSetToStore: true,
			// notNotify: true,
			resultMessage: {text: i18n.t('phrase.register_success')},
			axios:this.$axios,
			action: { actionName:'update_auth_data' }
		};

		return multipurpose_response(storeArgs, `/users/register`, newPayload);
	},

	recovery_password({ commit/*, dispatch*/ }, payload) {
		commit('SET_STATE', {stateProp: 'recoveryLoading', value: true,});

		// console.log(payload)
		api(this.$axios, 'POST', '', payload)
			.then(response => {
				// console.log(response)
				// console.log('sign_in', response.headers['cookie-hash'])
				
				// dispatch('update_cookies_hash', response.headers);
				// let x = response.headers.cookie_hash;
				if (!isSuccessStatus(response)) {
					// const { access_token } = response.data.data;
					const message = getResponseMessage(response);
					Notification.error({ /*title: `Error`,*/ message: message || 'wrong response status', duration: 0 });
				}
				commit('SET_STATE', {stateProp: 'recoveryLoading', value: false,});

			})
			.catch(error => {
				// console.log(error)
				commit('AUTH_CLEAR', { axios:this.$axios });
				commit('SET_STATE', {stateProp: 'recoveryLoading', value: false,});
				handleError(error, { that:this, commit: commit, loading: true, notify: true });				
			});
	},

	logout({ commit }) {
		commit('SET_STATUS_LOADING', true);
		this.$router.push('/');
		commit('AUTH_CLEAR', { axios: this.$axios });

		const i18n = this.$i18n;		
		setTimeout(() => {
			commit('SET_STATUS_LOADING', false);
			Notification.success({message: i18n.t('phrase.succes_logout') }, 0);
		}, 100);
	},

	clear_auth({ commit }) {
		commit('AUTH_CLEAR', { axios: this.$axios });
	},

	update_auth_data({ commit }, response) {
		// console.log(response)
		const { access_token, user } = response.data.data;
		// const { access_token, user } = response.data.data;
		commit('AUTH_TOKEN_SUCCESS', { token: access_token, axios:this.$axios });
		commit('AUTH_USER_SUCCESS', user);
	},

	update_cookies_hash({ commit, state }, headers) {

		let cookie_hash = headers['cookie-hash'];
		if (state.cookie_hash !== cookie_hash || !cookie_hash_from_cookies) {
			// console.log('update_cookies_hash', state.cookie_hash, cookie_hash, cookie_hash_from_cookies)
			// state.cookie_hash = cookie_hash || null;
			if (
				cookie_hash &&
				cookie_hash != undefined &&
				cookie_hash != null &&
				cookie_hash != 'null' &&
				cookie_hash != 'undefined'
			) {
				commit('SET_COOKIES_HASH', cookie_hash);
			} else {
				commit('ERROR_COOKIES_HASH');
			}
		}

		/*if (!cookie_hash_from_cookies || cookie_hash_from_cookies == 'undefined' || cookie_hash_from_cookies == 'null') {
			cookies.set('cookie_hash', '');
		}*/
	},

	set_data({ commit }, data) {
		commit('SET_STATE', data);
	}
};

// mutations
const mutations = {
	...statusMutations,
	...dataMutations,

	AUTH_TOKEN_SUCCESS: (state, {token}) => {
		// console.log(token, axios)
		// axios.setToken(token, 'Bearer')

		// axios.setToken(token);
		cookies.set('access_token', token);
		state.access_token = token;
	},

	AUTH_USER_SUCCESS: (state, user) => {
		cookies.set('authUser', JSON.stringify(user));
		state.preventRequests = false;
		state.authUser = user;
		state.isAuthenticated = true;
	},

	AUTH_CLEAR: (state, { axios }) => {
		cookies.remove('access_token');
		cookies.remove('authUser');
		// console.log('AUTH_CLEAR token: ', cookies.get('access_token'), cookies.get('authUser'));
		setHttpToken({token:null, axios:axios});
		state.preventRequests = true;
		state.isAuthenticated = false;
		state.access_token = null;
		state.authUser = null;
	},

	SET_COOKIES_HASH: (state, cookie_hash) => {
		// console.log('success', state.cookie_hash, cookie_hash)
		state.cookie_hash = cookie_hash || null;
		cookie_hash_from_cookies = state.cookie_hash;
		cookies.set('cookie_hash', cookie_hash);			
	},

	ERROR_COOKIES_HASH: (state) => {
		state.cookie_hash = null;
		cookies.remove('cookie_hash');
    // const cookie_hash = cookies.get('cookie_hash');

		// console.log('error', state.cookie_hash, cookie_hash)
	}
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
};
