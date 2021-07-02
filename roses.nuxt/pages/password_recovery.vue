<template>
	<div class="loginPage page">

		<section class="pageSection">
			<div class="mcontainer page-content-container">
				<div class="">
					<div class="sectionHeader sectionBlock">
						<h2 class="page-title medium capitalize-first">{{ $t('form.password_recovery') }}</h2>
					</div>

					<div class="sectionBlock content-wrapper">
						<form class="sectionBlock standard-form"
							@submit.prevent="submit">
							<div class="formRow" v-if="recovery_step == 1">
								<label class="">{{$t('form.email')}}</label>
								<input type="email" :placeholder="`${$t('form.email')}`" required 
									v-model="email"
									class="">
							</div>

							<div class="formRow" v-if="recovery_step == 2">
								<label class="">{{`${$t('form.remember_token_mail')}`}} </label>
								<input type="text" :placeholder="`${$t('form.remember_token')}`" required 
									v-model="remember_token"
									class="">
							</div>

							<div class="formRow" v-if="recovery_step == 3">
								<div class="formRow">
									<label>{{$t('form.password')}}</label>
									<input type="password" :placeholder="`${$t('form.password')}`"
										v-model="new_password">
								</div>
								
								<div class="formRow">
									<label>{{ $t('common.confirm_password')}}</label>				
									<input type="password" :placeholder="`${$t('common.confirm_password')}`"
										v-model="password_confirmation">
								</div>
							</div>

							<div class="formRow mrow flex center spaceBetween submitBlock">

								<div class=" wrapperBlock relative">
									<SimpleSpinner :active="isLoading" small/>
									<button type="submit" class="standardButton primary uppercase">{{$t('form.password_recover')}}</button>
								</div>
							</div>
						</form>

						<div class="addition-link">
							<nuxt-link class="password-link underline" :to="localePath('/registration')">{{$t('phrase.register_link')}}</nuxt-link>
						</div>

						<div class="addition-link">
							<nuxt-link class="password-link underline" :to="localePath('/login')">{{$t('phrase.login_link')}}</nuxt-link>
						</div>
					</div>
				</div>
			</div>
		</section>

	</div> 
</template>

<script>
	import { Notification } from 'element-ui';

	export default {
		name: 'password_recovery',
		layout: 'auth',

		computed: {
			isLoading() {
				return this.$store.state.auth.isLoading;
			},
		},
		
		data() {
			return {
				recovery_step: 1,
				email: process.env.NODE_ENV === 'development' ? 'u@u.com' : '',
				remember_token: '',
				new_password: '',
				password_confirmation: ''
			};
		},

		methods: {
			submit() {
				if (this.recovery_step == 1) {
					const payload = {	data: { email: this.email}, url: '/recovery-password/email'	};
					this.$store.dispatch('auth/recovery_password', payload )
						.then(() => {	
							this.recovery_step++;
							Notification.success({message: this.$t('phrase.recovery_email_send')});
						});

				} else if (this.recovery_step == 2) {
					const payload = { 
						data: { remember_token: this.remember_token},
						url: '/recovery-password/token'
					};

					this.$store.dispatch('auth/recovery_password', payload )
						.then(() => {	
							this.recovery_step++;
							Notification.success({message: this.$t('phrase.recovery_token_success')});
						});
				} else if (this.recovery_step == 3) {
					if (this.new_password !== this.password_confirmation) {
						setTimeout(() => {
							Notification.warning({message: this.$t('phrase.password_confirm_error') });
						}, 10);
						// return;
					} else {
						const payload = {
							data: { 
								remember_token: this.remember_token,
								new_password: this.new_password,
								password_confirmation: this.password_confirmation
							},
							url: '/recovery-password/reset'
						};

						this.$store.dispatch('auth/recovery_password', payload )
							.then(() => {	
								// this.recovery_step++;
								this.$router.push('/');								
								Notification.success({message: this.$t('phrase.password_reset_success')});
							});
					}

				} else {
					this.recovery_step = 1;
				}
				
			}
		}
	
	}
	
</script>