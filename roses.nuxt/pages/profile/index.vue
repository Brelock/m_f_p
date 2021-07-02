<template>
	<!-- <div class="content-wrapper mcol-xs-12 mcol-md-9"> -->
		<form action="/" class="standard-form content-container view-content">
			<client-only>
				<div class="form-section">
					<div class="title page-title capitalize-first">{{ $t('titles.personal_data') }}</div>
					<RegisterBlock	labels adaptive isProfilePage withPhone
						:user="authUser"
					/>
				</div>
			</client-only>
		</form>
	<!-- </div> -->
</template>

<script>
	import { mapState } from 'vuex';
	// import { eventHandler } from '@/mixins';
	
	export default {
		name: 'personalData',
		// mixins: [eventHandler],
		components: {
			RegisterBlock: () => import('@/components/auth/RegisterBlock.vue'),
		},

		computed: {
			...mapState({
				authUser: state => state.auth.authUser,
			}),
		},

		/*mounted() {
			console.log('profile mounted')
		},

		beforeDestroy() {
			console.log('profile destroy')
		}*/

	}
	
</script>