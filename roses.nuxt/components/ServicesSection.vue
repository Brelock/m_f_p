<template functional>
	<client-only>
		<section class="pageSection services-section">
			<div class="mcontainer">
				<div class="list-wrapper">
					<div class="flex wrap mrow services-list">
						<div class="mcol-xs-12 mcol-md-3 services-item">
							<div class="icon-block">
								<i class="icomoon gradientIcon with-gradient icon-delivery"></i>
							</div>
							<h5 class="section-title medium">{{props.i18n.t('services.delivery')}}</h5>
						</div>
					
						<div class="mcol-xs-12 mcol-md-3 services-item">
							<div class="icon-block">
								<i class="icomoon gradientIcon with-gradient icon-present"></i>
							</div>
							<h5 class="section-title medium">{{props.i18n.t('services.bonuses')}}</h5>
						</div>
					
						<div class="mcol-xs-12 mcol-md-3 services-item">
							<div class="icon-block">
								<i class="icomoon gradientIcon with-gradient icon-pay"></i>
							</div>
							<h5 class="section-title medium">{{props.i18n.t('services.payment')}}</h5>
						</div>
					
						<div class="mcol-xs-12 mcol-md-3 services-item">
							<div class="icon-block">
								<i class="icomoon gradientIcon with-gradient icon-security"></i>
							</div>
							<h5 class="section-title medium">{{props.i18n.t('services.service')}}</h5>
						</div>
					</div>
				</div>
			</div>
		</section>
	</client-only>
</template>

<script>
export default {
	functional: true,
	props: {
		i18n: {
			type: Object,
			default:() => {}
		},
	}
};
</script>
