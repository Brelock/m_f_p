<template>
	<div class="loginPage page">

		<section class="pageSection">
			<div class="mcontainer page-content-container">
				<div class="">
					<div class="sectionHeader sectionBlock">
						<h2 class="page-title medium capitalize-first">{{ $t('menu.entry') }}</h2>
					</div>

					<div class="sectionBlock content-wrapper">
						<LoginBlock :successRedirect="{path:'/'}"/>

						<RemoteLoginBlock	@onSubmit="socialLoginSubmit"	:i18n="$i18n"/>

						<div class="addition-link">
							<nuxt-link class="password-link underline" :to="localePath('/registration')">{{$t('phrase.register_link')}}?</nuxt-link>
						</div>
					</div>
				</div>
			</div>
		</section>

	</div> 
</template>

<script>

	export default {
		name: 'login',
		layout: 'auth',
		components: {
			LoginBlock: () => import('@/components/auth/LoginBlock.vue'),
			RemoteLoginBlock: () => import('@/components/auth/RemoteLoginBlock.vue')
		},

		methods: {
			socialLoginSubmit(provider) {
				this.$store.dispatch('auth/sign_in_social', {provider: provider});
				// this.sign_in({ method:'GET', url: `/social-auth/${provider}` });
			},
		}
	
	}
	
</script>