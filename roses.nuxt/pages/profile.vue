<template>
	<div class="profilePage cabinet-category page">

		<section class="pageSection">
			<div class="mcontainer">
				<div class="sectionHeader sectionBlock">
					<BreadCrumbs :items="crumbs" :i18n="$i18n" @localePath="localePath"/>

					<h2 class="page-title medium capitalize-first">{{ $t('titles.profile_page') }}</h2>
				</div>
			
				<div class="sectionBlock">

					<div class="flex wrap">
						<aside class="sidebar mcol-xs-12 mcol-md-3 accordionMenu">
							<Navbar/>
						</aside>

						<div class="content-wrapper mcol-xs-12 mcol-md-9">
							<transition name="component-fade" mode="out-in">
								<nuxt-child/>
							</transition>
						</div>
					</div>

				</div>
			</div>
		</section>

	</div> 
</template>

<script>
	import { breadcrumbsFromPathMixin, seoMixin } from '@/mixins';
	import { getSeoLink } from "@/helpers";

	export default {
		name: 'profile',
		mixins: [breadcrumbsFromPathMixin, seoMixin],

		components: {
			Navbar: () => import('@/components/profile/Navbar.vue'),
		},
		middleware: 'auth',

		computed: {
			instancePropName: () => 'seo_data',

			seo_data() {
				return {
					title_ru: this.$t('titles.profile_page'),
					title_he: this.$t('titles.profile_page'),
					seo_description_ru: this.$t('titles.profile_page'),
					seo_description_he: this.$t('titles.profile_page'),
				}
			},
		},
		
		validate({store}) {
			// console.log('validate', store.state.auth.isAuthenticated)
			return store.state.auth.isAuthenticated;
		},

		async fetch({store, route}) {
			await store.dispatch('seo/fetch_meta_tags', {
				params:	{redirect_uri: getSeoLink(route) }
			});

			if (store.state.categories.menuCategoriesList.length < 1) {
				await store.dispatch('categories/fetch_menu_data', {
					params:	{ max: -1, withChildren:true }
				});
			}
		},

	}
	
</script>