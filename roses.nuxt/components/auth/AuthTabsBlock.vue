<template>
	<div :class="['authBlock', {'inlineRemote': inlineRemote}, className]">
		<div :class="['contentNavBar profileTabsNavBar tabsNav flex wrap',
			{'justify': justify}]">
			<div
				v-for="tab in tabsList"
				:key="`tab_${tab.title}`"
				:class="['capitalize-first tabButton bold', { active: tab.prop == activeTab }]"
				@click="toggleTab(tab)"
				v-text="tab.title"
			></div>

			<!-- <div :class="['tabButton', {'active': loginTabActive}]"
				@click="toggleLoginTab"><b>Вход</b>
			</div>
			<div :class="['tabButton', {'active': registerTabActive}]"
				@click="toggleRegisterTab"><b>Регистрация</b>
			</div> -->
		</div>

		<!-- <div id="profile-tabs-group" class="toggleBlocks-list sectionBlock fade-animation js_animate">
			<div :class="['toggleBlock', {'active': loginTabActive}]">content</div>
			<div :class="['toggleBlock', {'active': loginTabActive}]">content</div>
		</div> -->
		
		<div class="toggleBlocks-list sectionBlock">
			<transition name="standard-fade" mode="out-in">
				<div class="contactsTab" v-if="activeTab == tabsList[0].prop" 
					:key="`tab-${tabsList[0].prop}`">
					<LoginBlock/>
				</div>
				
				<div class="contactsTab" v-if="activeTab == tabsList[1].prop" 
					:key="`tab-${tabsList[1].prop}`">
					<RegisterBlock/>				
				</div>
			</transition>
		</div>

		<div class="blocks-delimenter" v-if="inlineRemote">или</div>		

		<RemoteLoginBlock	@onSubmit="socialLoginSubmit"	:i18n="$i18n"/>
	</div>
</template>

<script>
// import { animateBlock } from '@/helpers/domHelpers';
import { tabsMixin } from '@/mixins';

// import { Notification } from 'element-ui';

export default {
	mixins: [tabsMixin],
	components: {
		LoginBlock: () => import('./LoginBlock.vue'),		
		RegisterBlock: () => import('./RegisterBlock.vue'),		
		RemoteLoginBlock: () => import('./RemoteLoginBlock.vue'),
	},

	props: {
		tabsList: {
			type: Array,
			required: true
		},
		justify: Boolean,
		inlineRemote: Boolean,
		className: {
			type: String,
			default: ''
		}
	},

	/*data() {
		return {
			// loginTabActive: true,
			// registerTabActive: false,
		};
	},*/

	methods: {
		socialLoginSubmit(provider) {
			this.$store.dispatch('auth/sign_in_social', {provider: provider});
			// this.sign_in({ method:'GET', url: `/social-auth/${provider}` });
		},
		/*toggleLoginTab(e) {
			if (!this.loginTabActive) {
				this.loginTabActive = true;
				this.registerTabActive = false;
				animateBlock('#profile-tabs-group');
			}
		},*/
	}
};
</script>