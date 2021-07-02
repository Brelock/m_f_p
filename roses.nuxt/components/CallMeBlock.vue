<template>
	<!-- <div class="search-bar"> -->
		<form class="standard-form sub-menu-container"
			@submit.prevent="submit">
			<div class="formRow">
			  <input type="text" :placeholder="`${$t('form.first_name')}`"
			  	v-model="formData.user_name">
			</div>

			<div class="formRow">
			  <input type="tel" placeholder="+972" required 
			  	v-model="formData.phone">
			</div>

			<div class="formRow">
				<button type="submit" class="standardButton primary uppercase">{{$t('menu.callback_me')}}</button>
			</div>
		</form>
	<!-- </div> -->
</template>

<script>
export default {
	data() {
		return {
			formData: {
				user_name: '',
				phone: ''
			}
		};
	},
	methods: {
		submit() {
			this.$emit('submit', this.formData);
		}
	},
};
</script>
