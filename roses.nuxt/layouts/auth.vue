<template>
	<div class="mainWrapper">
		<div class="contentWrapper relative">
		
			<transition name="component-fade" mode="out-in">
				<nuxt />
			</transition>
		</div>

	</div>
</template>

<script>
	export default {
		computed: {
			meta () {
				return [
				{ hide: 'description', name: 'description', content: 'Главная' }
				]
			},
			overlay() {
				return this.$store.state.global.overlay;
			},
			authLoading() {
				return this.$store.state.auth.isLoading;
			}
		},

		head () {
			const canonical = `https://mysite.com${this.$route.path
				.toLowerCase()
				.replace(/\/$/, '')}`
			return {
				meta: [
					...this.meta
				],
				script: [
					// { src: 'https://markknol.github.io/console-log-viewer/console-log-viewer.js' }
				],
				link: [{ rel: 'canonical', href: canonical }]
			}
		},
	}	
</script>

