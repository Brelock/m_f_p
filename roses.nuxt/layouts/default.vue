<template>
	<div class="mainWrapper">
		<div class="contentWrapper relative">
			<client-only>
				<SimpleSpinner :active="authLoading || showSpinner" big />				
			</client-only>

			<Header />
			
			<!-- <transition name="component-fade" mode="out-in"> -->
				<nuxt-child/>
			<!-- </transition> -->
		</div>
		<Footer />

		<CoverOverlay :active="overlay.show" :z="overlay.zIndex" @onClick="overlayClick" />
	</div>
</template>

<script>
import { mapState/*, mapActions*/ } from 'vuex';
import CoverOverlay from '@/components/CoverOverlay';
import Cookies from 'universal-cookie';

	export default {
		// middleware: ['auth'],
		components: {
			CoverOverlay,
			Header: () => import('@/components/header/Header.vue'),
			Footer: () => import('@/components/Footer.vue'),
		},

		/*head () {
			return {
				title: 'layout title',
			}
		},*/

		/*data: () => ({
			showSpinner: false
		}),*/

		computed: {
			...mapState({
				overlay: state => state.global.overlay,
				routerError: state => state.global.routerError,
				showSpinner: state => state.global.showSpinner,
				authLoading: state => state.auth.isLoading,
				authUser: state => state.auth.authUser
				// seo_meta_tags: state => state.seo.meta_tags_list,
			}),		

			/*catalogData() {
				return this.$store.state.categories.catalogData;
			}*/
		},

		methods: {
			overlayClick() {
				this.$store.dispatch('global/show_overlay', {	show: false });
			},

			setUserToGtag(user) {
				const id = user ? user.id : null;
				this.$gtag.set({'user_id': id})
			},

			checkErrors({context}) {
				if (context) {
					this.$store.dispatch('global/set_router_error', context.nuxtState.error);
				}
			}
		},

		mounted() {
			// console.log('layout mounted')
			const cookies = new Cookies();
			// console.log('layout mounted redirectToCheckout', cookies.get('redirectToCheckout'))

			if ( cookies.get('redirectToCheckout') ) {
				cookies.remove('redirectToCheckout');				
				this.$router.push('/checkout');
			}

			this.setUserToGtag(this.authUser);
			this.checkErrors(this.$root);
		},

		watch: {
			authUser(user) {
				this.setUserToGtag(user);
			},

			routerError(error) {
				// console.log(error)
				if (error) {
					this.$router.push('/error_page')					
				}
			},

			'$route'() {
				this.$store.dispatch('global/set_show_spinner', true);

				setTimeout(() => {
					this.$store.dispatch('global/set_show_spinner', false);
				}, 500);
				// console.log(route.path)
			}

		}

	}	
</script>

<style lang="scss">
	.fade-enter-active, .fade-leave-active {
		transition: opacity .2s ease-in;
	}
	.fade-enter, .fade-leave-to {
		opacity: 0;
	}

</style>

