<template>
	<div :class="['sub-menu auth-sub-menu parent-width for-user', {'js_hide':isLoading}]" v-if="authUser">
		<div class="sub-menu-container">
			<ul class="group">
				<li class="capitalize-first d-block"><nuxt-link :to="localePath('/profile')">{{ $t('menu.yourProfile') }}</nuxt-link></li>
				<li class="capitalize-first d-block"><nuxt-link :to="localePath('/profile/orders')">{{ $t('common.orders') }}</nuxt-link></li>
				<li class="capitalize-first d-block"><nuxt-link :to="localePath('/profile/reviews')">{{ $t('common.reviews') }}</nuxt-link></li>
			</ul>

			<ul class="group">
				<li>
					<i class="icomoon icon-exit1"></i>
					<span class="hover primary capitalize-first d-block" @click="handleLogout">{{ $t('menu.logout') }}</span>
				</li>
			</ul>
		</div>
	</div>

	<div :class="['sub-menu auth-sub-menu', {'js_hide':isLoading}]" v-else>
		<AuthTabsBlock :tabsList="tabsList" />
		<!-- <RemoteLoginBlock	@onSubmit="socialLoginSubmit"	/> -->
	</div>
</template>

<script>
import { mapActions } from 'vuex';
import { Notification } from 'element-ui';

export default {
	components: {
		AuthTabsBlock: () => import('../auth/AuthTabsBlock.vue'),		
		// RemoteLoginBlock: () => import('../auth/RemoteLoginBlock.vue'),		
	},

	props: {
		authUser: {
			type: Object,
			default: null
		}
	},

	/*data() {
		return {
			// loginTabActive: true,
			// registerTabActive: false,
		};
	},*/

	computed: {
		isLoading() {
			return this.$store.state.auth.isLoading;
		},

		tabsList() {
			return [
				{ title: `${this.$t('menu.entry')}`, prop: 'loginTabActive' },
				{ title: `${this.$t('menu.registration')}`, prop: 'registerTabActive' },
			];
		},

		/*test: (e) => {
			console.log(e.$t)
			return 23
		}*/
		 
	},

	methods: {
		...mapActions({
			logout: 'auth/logout',
			// sign_in: 'auth/sign_in'
		}),

		/*socialLoginSubmit(provider) {
			this.sign_in({ method:'GET', url: `/social-auth/${provider}` });
		},*/

		handleLogout() {
			this.logout();
		}
	}
};
</script>