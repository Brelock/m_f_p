<template>
	<div class="page">

		<section class="pageSection">
			<div class="mcontainer">
				<div class="sectionHeader sectionBlock">
					<BreadCrumbs :items="crumbs" :i18n="$i18n" @localePath="localePath"/>

					<h2 class="page-title medium capitalize-first">{{ $t('menu.privacy_policy') }}</h2>
				</div>
			
				<div class="sectionBlock content-container whiteBlock medium">
					<div class="description">
						<p>Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона, а также реальное распределение букв и пробелов в абзацах, которое не получается при простой дубликации "Здесь ваш текст.. Здесь ваш текст.. Здесь ваш текст.." Многие программы электронной вёрстки и редакторы HTML используют Lorem Ipsum в качестве текста по умолчанию, так что поиск по ключевым словам "lorem ipsum" сразу показывает, как много веб-страниц всё ещё дожидаются своего настоящего рождения. За прошедшие годы текст Lorem Ipsum получил много версий. Некоторые версии появились по ошибке, некоторые - намеренно (например, юмористические варианты).</p>

						<p>Есть много вариантов Lorem Ipsum, но большинство из них имеет не всегда приемлемые модификации, например, юмористические вставки или слова, которые даже отдалённо не напоминают латынь. Если вам нужен Lorem Ipsum для серьёзного проекта, вы наверняка не хотите какой-нибудь шутки, скрытой в середине абзаца. Также все другие известные генераторы Lorem Ipsum используют один и тот же текст, который они просто повторяют, пока не достигнут нужный объём. Это делает предлагаемый здесь генератор единственным настоящим Lorem Ipsum генератором. Он использует словарь из более чем 200 латинских слов, а также набор моделей предложений. В результате сгенерированный Lorem Ipsum выглядит правдоподобно, не имеет повторяющихся абзацей или "невозможных" слов.</p>
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
					title_ru: this.$t('menu.privacy_policy'),
					title_he: this.$t('menu.privacy_policy'),
					seo_description_ru: this.$t('menu.privacy_policy'),
					seo_description_he: this.$t('menu.privacy_policy'),
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