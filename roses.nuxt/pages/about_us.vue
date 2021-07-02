<template>
	<div class="page">

		<section class="pageSection">
			<div class="mcontainer">
				<div class="sectionHeader sectionBlock">
					<BreadCrumbs :items="crumbs" :i18n="$i18n" @localePath="localePath"/>

					<h2 class="page-title medium capitalize-first">{{ $t('menu.company_us') }}</h2>
				</div>
			
				<div class="sectionBlock content-container whiteBlock medium">
					<div class="description">
						<p class="about-content">{{ $t('about.first_content_section') }}</p>
						<br>
						<p class="about-content">{{ $t('about.secondary_content_section') }}</p>
						<br>
						<p class="about-content">{{ $t('about.range_content_section') }}</p>
						<br>
						<p class="about-content">{{ $t('about.three_content_section') }}</p>
						<br>
						<p class="about-content">{{ $t('about.four_content_section') }}</p>
						<br>
						<p class="about-content">{{ $t('about.five_content_section') }}</p>
						<br>
						<p class="about-content">{{ $t('about.six_content_section') }}</p>
						<br>
						<p class="about-content">{{ $t('about.seven_content_section') }}</p>
						<br>
						<p class="about-content">{{ $t('about.eight_content_section') }}</p>
						<br>
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
		name: 'delivery_payment',
		mixins: [breadcrumbsFromPathMixin, seoMixin],
		
		computed: {
			instancePropName: () => 'seo_data',

			seo_data() {
				return {
					title_ru: this.$t('menu.about_us'),
					title_he: this.$t('menu.about_us'),
					seo_description_ru: this.$t('menu.about_us'),
					seo_description_he: this.$t('menu.about_us'),
				}
			},
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
		}

	}
	
</script>