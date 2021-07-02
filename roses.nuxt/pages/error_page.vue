<template>
	<div class="not-found-page"
	>
	<!-- v-if="error.statusCode === 404 || error.statusCode === 500" -->
		<div class="wrapper wrapper-full-page flex align-center justify-center">
			<div class="full-page">
				<div class="page-content">
					<h2 class="title page-title">УПС!</h2>

					<div class="description">
						{{$t('temporary.descript_error')}}
					</div>

					<div class="section-image">
						<img src="@/assets/img/404-page.png" alt="404" />
					</div>

					<div class="d-i-block button-container" @click="linkClick">
						<nuxt-link :to="localePath('/')"
							class="el-button standardButton primary"
							
						>{{$t('temporary.home_error_page')}}</nuxt-link>						
					</div>
				</div>
			</div>
		</div>
	</div>

</template>

<script>

	export default {
		// props: ['error'],
		layout: 'error', // you can set a custom layout for the error page

		computed: {
			error() {
				return this.$store.state.global.routerError
			}
		},

		methods: {
			linkClick() {
				const payload = { stateProp: 'showSpinner', value: true };
				this.$store.dispatch('global/set_state', payload);				
			}
		},

		beforeDestroy() {
			this.$store.dispatch('global/set_router_error', null);
		}
	}
</script>