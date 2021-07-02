<template>
	<div class="tab-container">
		<client-only>
			<form class="sectionBlock standard-form"
				@submit.prevent="submit">
				<div class="formRow flex wrap center"
					:class="[{'mcol-xs-12 mcol-sm-8 mcol-lg-7': adaptive}]">
					<label v-show="labels" class="capitalize-first mcol-xs-12 mcol-sm-4 mcol-lg-5">{{$t('form.first_name')}}</label>
					<input type="text" :placeholder="`${$t('form.first_name')}`" required 
						v-model="formData.first_name"
						:class="[{'mcol-xs-12 mcol-sm-8 mcol-lg-7': adaptive}]">
				</div>
				<div class="formRow flex wrap center"
					:class="[{'mcol-xs-12 mcol-sm-8 mcol-lg-7': adaptive}]">
					<label v-show="labels" class="capitalize-first mcol-xs-12 mcol-sm-4 mcol-lg-5">{{$t('form.last_name')}}</label>

					<input type="text" :placeholder="`${$t('form.last_name')}`" required 
						v-model="formData.last_name"
						:class="[{'mcol-xs-12 mcol-sm-8 mcol-lg-7': adaptive}]">
				</div>
		
				<div class="formRow flex wrap center"
					:class="[{'mcol-xs-12 mcol-sm-8 mcol-lg-7': adaptive}]">
					<label v-show="labels" class="capitalize-first mcol-xs-12 mcol-sm-4 mcol-lg-5">{{$t('form.email')}}</label>

					<input type="email" :placeholder="`${$t('form.email')}`" required
						v-model="formData.email"
						:class="[{'mcol-xs-12 mcol-sm-8 mcol-lg-7': adaptive}]">
				</div>
		
				<!-- <div class="formRow customCheckboxContainer">
					<el-checkbox v-model="formData.subscribeConditions" v-if="!isProfilePage">
						<span class="">{{$t('form.subscribe_cond_1')}}
							<nuxt-link :to="localePath('/')" class="link">{{$t('form.subscribe_cond_2')}}</nuxt-link>.
						</span>
					</el-checkbox>							
				</div> -->
		
				<div class="formRow flex wrap center" v-if="!user || !user.provider"
					:class="[{'mcol-xs-12 mcol-sm-8 mcol-lg-7': adaptive}]">
					<label v-show="labels" class="capitalize-first mcol-xs-12 mcol-sm-4 mcol-lg-5">{{$t('form.password')}}</label>
					<input type="password" :placeholder="`${$t('form.password')}`"
						required 
						v-model="formData.password"
						:class="[{'mcol-xs-12 mcol-sm-8 mcol-lg-7': adaptive}]">
				</div>
		
				<div class="formRow flex wrap center" :class="[{'mcol-xs-12 mcol-sm-8 mcol-lg-7': adaptive}]" v-if="!user || !user.provider">
					<label v-show="labels" class="capitalize-first mcol-xs-12 mcol-sm-4 mcol-lg-5">{{ $t('common.confirm_password')}}</label>				
					<input type="password" :placeholder="`${$t('common.confirm_password')}`"
						required 
						v-model="formData.password_confirm"
						:class="[{'mcol-xs-12 mcol-sm-8 mcol-lg-7': adaptive}]">
				</div>

				<div class="formRow flex wrap center" :class="[{'mcol-xs-12 mcol-sm-8 mcol-lg-7': adaptive}]" v-if="withPhone">
					<label v-show="labels" class="capitalize-first mcol-xs-12 mcol-sm-4 mcol-lg-5">{{$t('form.phone')}}</label>				
					<input type="tel" :placeholder="`${$t('form.phone')}`"
						v-model="formData.phone_number"
						:class="[{'mcol-xs-12 mcol-sm-8 mcol-lg-7': adaptive}]">
				</div>
		
				<div class="formRow" :class="[{'mcol-xs-12 mcol-sm-8 mcol-lg-7': adaptive}]">
					<div class="buttonWrapper relative"
					:class="[{'mcol-xs-12 mcol-sm-8 mcol-lg-7 push-right': adaptive}, {'wrapperBlock ':!adaptive}]">
						<!-- <span class="relative"> -->
							<SimpleSpinner :active="isLoading" small />
							<button type="submit" class="standardButton primary uppercase"
								v-text="isProfilePage ? `${$t('common.save')}`:`${$t('menu.registration')}`"
							></button>
						<!-- </span> -->
					</div>
				</div>
		
				<!-- <div class="formRow customCheckboxContainer" v-if="!isProfilePage">
					<el-checkbox v-model="formData.personalData">
						<span class="">{{$t('form.personal_data_approve')}}.</span>
					</el-checkbox>
				</div> -->
			</form>
		</client-only>
	</div>
</template>

<script>
import { Notification } from 'element-ui';
import { updateFormData, getLocaleCode } from '@/helpers';

export default {
	props: {
		labels: Boolean,
		adaptive: Boolean,
		isProfilePage: Boolean,
		withPhone: Boolean,
		user: {
			type: Object,
			default: ()=>(null)
		}
	},

	data() {
		return {			
			formData: {
				first_name: '',
				last_name: '',
				email: '',
				password: '',
				password_confirm: '',
				subscribeConditions: false,
				personalData: false,
				phone_number: '',
				location: null,
			},
		};
	},

	computed: {
		isLoading() {
			return this.$store.state.auth.isLoading;
		},
	},

	methods: {
		submit() {
			// console.log(this.formData)
			let isValid = true;
			/*if (!this.isProfilePage && (!this.formData.subscribeConditions || !this.formData.personalData) ) {
				isValid = false;
				Notification.warning({message: this.$t('phrase.personal_data_needs_approve')});
			}*/

			if (this.formData.password !== this.formData.password_confirm) {
				isValid = false;
				setTimeout(() => {
					Notification.warning({message:this.$t('phrase.password_confirm_error')});
				}, 10);
			}


			if (isValid) {
				this.formData.location = getLocaleCode(this.$i18n.locale);

				if (this.isProfilePage && this.user) {
					const payload = { data: this.formData, itemId: this.user.id };
					this.$store.dispatch('users/save_user', payload).then(() => {
						this.$fb.fbq('track', 'CompleteRegistration', {
							content_name: 'Регистрация пользователя',
							content_type: 'user',
							status: 'Регистрация успешно выполнена'
						});
					});					
				} else {
					this.$store.dispatch('auth/sign_up', { data: this.formData });					
				}
				// this.sign_up({ data: this.formData });				
			}
				/*.then((data) => {
					// console.log(data)
					// this.set_user_data()
					// this.sign_in({ data: this.loginData });					
				});*/
		}
	},

	watch: {
		user(user) {
		// console.log('register watch')

			if (user) {
				this.formData = updateFormData(user, this.formData);
			}
		}
	},

	created() {
		if (this.user) {
		// console.log('register created', this.user)
			this.formData = updateFormData(this.user, this.formData);
		}
		// if (this.user) {}
	}
};
</script>