<template>
	<div class="loginPage page">

		<section class="pageSection">
			<div class="mcontainer page-content-container">
				<div class="">
					<div class="sectionHeader sectionBlock">
						<h2 class="page-title medium capitalize-first">{{ $t('menu.registration') }}</h2>
					</div>
				
					<div class="sectionBlock content-wrapper">
						<RegisterBlock :successRedirect="{path:'/'}"/>
					</div>
				</div>
			</div>
		</section>

	</div> 
</template>

<script>

	export default {
		name: 'registration',
		layout: 'auth',
		components: {
			RegisterBlock: () => import('@/components/auth/RegisterBlock.vue'),					
		},
	
	}
	
</script>