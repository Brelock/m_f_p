<template>
	<div class="not-found-page">
		<div class="wrapper wrapper-full-page flex align-center justify-center">
			<div class="full-page">
				<div class="page-content">
					<h2 class="title page-title">{{$t('phrase.success_order')}}</h2>

					<div class="description">{{$t('phrase.success_order_description')}}</div>

					<div class="section-image">
						<img src="@/assets/img/success_checkout.png" alt="img" />
					</div>

					<NuxtLink class="el-button standardButton primary" :to="localePath('/')">{{$t('menu.to_main')}}</NuxtLink>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { seoMixin } from '@/mixins';
	import { getSeoLink } from "@/helpers";

	export default {
		name: 'success_page',
		mixins: [seoMixin],

		computed: {
			instancePropName: () => 'seo_data',

			seo_data() {
				return {
					title_ru: this.$t('phrase.success_order'),
					title_he: this.$t('phrase.success_order'),
					seo_description_ru: this.$t('phrase.success_order'),
					seo_description_he: this.$t('phrase.success_order'),
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