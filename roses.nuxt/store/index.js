/*import Vue from 'vue';
import Vuex from 'vuex';

import global from './modules/global';
import auth from './modules/auth';
import users from './modules/users';
import companies from './modules/companies';
import controllers from './modules/controllers';
import plants from './modules/plants';
import sensors from './modules/sensors';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		global: global,
		auth: auth,
		users: users,
		companies: companies,
		controllers: controllers,
		plants: plants,
		sensors: sensors
	}
});*/

import Cookies from 'universal-cookie';

export const state = () => {};

export const mutations = {};
export const getters = {};

export const actions = {
  nuxtServerInit(store, context) {
    const cookies = new Cookies(context.req.headers.cookie);
    const access_token = cookies.get('access_token');
    const authUser = cookies.get('authUser');
    const cookie_hash = cookies.get('cookie_hash');
    // console.log('cookie_hash from cookies', cookie_hash)
    // const bodyFontAttr = cookies.get('bodyFontAttr');
    if ( access_token ) {
      store.commit("auth/AUTH_TOKEN_SUCCESS", { token: access_token, axios:this.$axios });
    }
    if ( authUser ) {
      store.commit('auth/AUTH_USER_SUCCESS', authUser);
    }

    if (
        cookie_hash &&
        cookie_hash != undefined &&
        cookie_hash != null &&
        cookie_hash != 'null' &&
        cookie_hash != 'undefined'
        ) {
      store.commit('auth/SET_COOKIES_HASH', cookie_hash);
    } else {
      store.commit('auth/ERROR_COOKIES_HASH');
    }

    


    /*if ( bodyFontAttr ) {
      store.commit('font/SET_FONT_SIZE', bodyFontAttr);
    }*/
  },
}

