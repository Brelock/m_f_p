<template>
	<div class="tab-container">
		<form class="sectionBlock standard-form"
			@submit.prevent="submit">
			<transition name="standard-fade" mode="out-in">
				<div class="formRow" key="login-block" v-if="!showRecoveryPassword">
					<div class="formRow flex wrap center" 
						:class="[{'mcol-xs-12 mcol-sm-8 mcol-lg-7': adaptive}]">
						<label v-show="labels" class="mcol-xs-12 mcol-sm-4 mcol-lg-5">{{$t('form.email')}}</label>
						<input type="email" :placeholder="`${$t('form.email')}`" required 
							v-model="formData.email"
							:class="[{'mcol-xs-12 mcol-sm-8 mcol-lg-7': adaptive}]">
					</div>
					<div class="formRow flex wrap center">
						<label v-show="labels" class="mcol-xs-12 mcol-sm-4 mcol-lg-5">{{ $t('form.password') }}</label>
						<input type="password" :placeholder="`${$t('form.password')}`"
							v-model="formData.password"
							:class="[{'mcol-xs-12 mcol-sm-8 mcol-lg-7': adaptive}]">
					</div>
				</div>

				<div class="formRow" key="recovery-block" v-else>
					<PasswordRecovery ref="PasswordRecovery"
						@finish="showRecoveryPassword = false"
						:isLoading="recoveryLoading"
					/>
				</div>
			</transition>
	
			<div class="formRow mrow flex center spaceBetween submitBlock">
				<div class="mcol-xs-6 wrapperBlock relative">
					<!-- <div class="relative"> -->
						<SimpleSpinner :active="isLoading || recoveryLoading" small/>
						<button type="submit" class="standardButton primary uppercase"
							v-text="showRecoveryPassword ? $t('form.submit') : $t('form.sign_in')"></button>
					<!-- </div> -->
				</div>
				<div class="mcol-xs-6 wrapperBlock text-center">
					<div class='password-link underline link capitalize-first'
						@click="showRecoveryPassword = !showRecoveryPassword"
						v-text="showRecoveryPassword ? $t('common.cancel') : $t('form.password_forget')+'?'">
					</div>
					<!-- <nuxt-link class='password-link underline' :to="localePath('/password_recovery')">{{$t('form.password_forget')}}?</nuxt-link> -->
				</div>
			</div>
		</form>
	</div>
</template>

<script>

export default {
	components: {
		PasswordRecovery: () => import('./PasswordRecovery.vue'),		
	},
	props: {
		labels: Boolean,
		adaptive: Boolean,
		successRedirect: {
			type: Object,
			default: () => ({})
		}
	},
	data() {
		return {
			showRecoveryPassword: false,
			formData: {
				email: process.env.NODE_ENV === 'development' ? 'admin@gmail.com' : '',
				password: process.env.NODE_ENV === 'development' ? '123456' : '',
			}
		};
	},

	computed: {
		isLoading() {
			return this.$store.state.auth.isLoading;
		},
		recoveryLoading() {
			return this.$store.state.auth.recoveryLoading;
		},
	},

	methods: {
		submit() {
			// console.log(this.formData)
			if (this.showRecoveryPassword) {
				this.$refs.PasswordRecovery.submit();
			} else {
				this.$store.dispatch('auth/sign_in', { data: this.formData })
					.then(() => {
						if (this.successRedirect.path) {
							this.$router.push(this.successRedirect.path);
						}
					});
			}
			
		}
	}
};
</script>