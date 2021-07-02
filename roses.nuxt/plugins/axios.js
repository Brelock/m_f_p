import { setHttpToken, setCookieHash } from '@/services/api_helpers';

const checkAuthorizationHeaders = (config) => {
		// console.log('check: ',  config.headers.common, config.headers.common.Authorization, 'auth')
	if (!!config.headers.common && !!config.headers.common.Authorization && !!config.headers.common.Authorization != 'null') {
		return true;
	}
	return false;
};

const checkCookieHashHeaders = (config) => {
	if (!!config.headers.common && !!config.headers.common['cookie-hash'] && !!config.headers.common['cookie-hash'] != 'null') {
		return true;
	}
		// console.log('check: ',  config.headers.common, config.headers.common['cookie-hash'], 'hash')
	return false;
};

export default function ({ $axios, store, redirect, app }) {
	$axios.defaults.xsrfHeaderName = 'X-XSRF-TOKEN';
	$axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest';
	$axios.defaults.headers.Accept = 'application/json, cookie-hash';
	$axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8';
	// $axios.defaults.headers['cookie-hash'] = null;
	$axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? 
		// 'http://shop.loc:8089/api' :
		// 'https://api.zengi.zengineers.company/api' :
		// 'https://api.zengi.zengineers.company/api';
		'https://api.zermarket.co.il/api' :
		'https://api.zermarket.co.il/api';
  
  $axios.onRequest(config => {
		config.headers.common['Accept-Language'] = store.$i18n.locale;
		
		if ( !checkAuthorizationHeaders(config) ) {
			const token = store.state.auth.access_token;
			setHttpToken({token:token, axiosConfig:config});
		}

		// console.log('onRequest headers', !checkAuthorizationHeaders(config, 'cookie-hash'))

		if ( !checkCookieHashHeaders(config) ) {
			const cookie_hash = store.state.auth.cookie_hash;
			setCookieHash({cookie_hash:cookie_hash, axiosConfig:config});
		}
		// const { cookie_hash } = store.state.auth;
  })

  /*$axios.onResponse(response => {
		// console.log('onResponse headers', response.config.url, response.headers)
  })*/

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
		}
		if (code === 401) {
			// console.log('axios error 401')
			store.commit('auth/AUTH_CLEAR', {axios: $axios}, { root: true });
			store.commit('auth/SET_STATE', {isLoading: false}, { root: true });
			// store.dispatch('auth/logout', { root: true });
      redirect('/');
			// redirect(app.localePath('/login?message=login1'))
    }
  })
}
