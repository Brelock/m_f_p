<template functional>
	<client-only>
		<div class="remoteBlock sectionBlock">
			<div class="title article-title text-center capitalize-first">{{props.i18n.t('form.sign_in_through')}}</div>
			<div class="remoteRow mrow flex ">
				<div class="wrapperBlock">
					<button type="button" @click="listeners.onSubmit('facebook')">
						<img src="@/assets/img/facebook_login.png" alt="login facebook">
					</button>
				</div>
				<div class="wrapperBlock">
					<button type="button" @click="listeners.onSubmit('google')">
						<img src="@/assets/img/gmail_login.png" alt="login gmail">
					</button>
				</div>
			</div>
		</div>
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
