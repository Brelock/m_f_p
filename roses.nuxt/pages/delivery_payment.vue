<template>
	<div class="page">

		<section class="pageSection">
			<div class="mcontainer">
				<div class="sectionHeader sectionBlock">
					<BreadCrumbs :items="crumbs" :i18n="$i18n" @localePath="localePath"/>

					<h2 class="page-title medium capitalize-first">{{ $t('menu.delivery_payment') }}</h2>
				</div>
			
				<div class="sectionBlock content-container whiteBlock medium">
					<div class="info-list">
						<div class="info-block-item">
							<div><b>{{ $t('delivery_payment.how_to_order') }}</b></div>
						</div>

						<div class="info-block-item">
							<div>{{ $t('delivery_payment.we_did_everything') }}</div>
							<div><b>{{ $t('delivery_payment.orders_are_accepted') }}</b></div>
							<div>{{ $t('delivery_payment.first_orders') }}</div>
							<div>{{ $t('delivery_payment.secondary_orders') }}</div>
							<div>{{ $t('delivery_payment.three_orders') }}</div>
							<div>{{ $t('delivery_payment.four_orders') }}</div>
						</div>

						<div class="info-block-item">
							<div><b>{{ $t('delivery_payment.payment_subtitle') }}</b></div>
							<div>{{ $t('delivery_payment.three_payment_section') }}</div>
							<div>{{ $t('delivery_payment.first_payment_section') }}</div>
							<div>{{ $t('delivery_payment.secondary_payment_section') }}</div>
							<div>{{ $t('delivery_payment.four_payment_section') }}</div>
						</div>

						<div class="info-block-item">
							<div><b>{{ $t('delivery_payment.we_are_working') }}</b></div>
						</div>

						<div class="info-block-item">
							<div>{{ $t('delivery_payment.our_service_area') }}</div>
							<div>{{ $t('delivery_payment.express_delivery') }}</div>
							<div>{{ $t('delivery_payment.express_transported') }}</div>
							<br>
							<div><b>{{ $t('delivery_payment.secondary_delivery_section') }}</b></div>
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
		name: 'delivery_payment',
		mixins: [breadcrumbsFromPathMixin, seoMixin],

		computed: {
			instancePropName: () => 'seo_data',

			seo_data() {
				return {
					title_ru: this.$t('menu.delivery_payment'),
					title_he: this.$t('menu.delivery_payment'),
					seo_description_ru: this.$t('menu.delivery_payment'),
					seo_description_he: this.$t('menu.delivery_payment'),
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