<template>
	<div class="sidebarWrapper">
	  	<!-- :data-text="$t('phrase.show_menu')" -->
	  	<!-- :data-text-active="$t('phrase.show_menu')" -->
	  <div class="sidebarOpenButton accordionButton mcol-md-hide flex center"
		  data-target="sidebarDropdown"
		  @click="toggleDropdown"
	  >
	    <div class="title-container">
	      <div class="title section-title medium">
	      	<span class="capitalize buttonText">{{$t('phrase.show_menu')}}</span>
	      </div>
	    </div>
	    
	    <div class="arrow-button-container push-right">
	      <i class="icomoon icon-arrow2"></i>
	    </div>
	  </div>
	  
	  <div id="sidebarDropdown" class="sidebar-dropdown hiddenContent height submenuWrapper">
	    <div class="sidebar-container" v-if="authUser">
	      <div class="sidebar-item personal-data">
	        <div class="item-container">
	          <div class="name section-title capitalize">{{ authUser.first_name }}</div>
	          <div class="email">{{ authUser.email }}</div>
	        </div>
	      </div>
	  
	      <div :class="['sidebar-item cart-item', {'active': cartLenght}]">
	        <div class="item-container">
	        	<nuxt-link :to="localePath('/cart')" class="section-title capitalize-first"
	        	v-text="`${$t('common.in_cart')} ${cartLenght} ${$t('common.products_2')}`"></nuxt-link>
	        </div>
	      </div>
	  
	      <div :class="['sidebar-item', {'active': activePath =='/profile/orders'}]">
	        <div class="item-container capitalize-first">
	        	<nuxt-link :to="localePath('/profile/orders')" v-text="$t('titles.my_orders')"></nuxt-link>
	        </div>
	      </div> 
	  
	      <div :class="['sidebar-item', {'active': activePath =='/profile'}]">
	        <div class="item-container capitalize-first">
	        	<nuxt-link :to="localePath('/profile')" v-text="$t('titles.personal_data')"></nuxt-link>
	        </div>
	      </div> 
	  
	      <div :class="['sidebar-item', {'active': activePath =='/profile/reviews'}]">
	        <div class="item-container capitalize-first">
	        	<nuxt-link :to="localePath('/profile/reviews')" v-text="$t('titles.my_reviews')"></nuxt-link>
	        </div>
	      </div>
	  
	      <div class="sidebar-item exit-item">
	        <div class="item-container">
	        	<span class="link-with-icon">
	        		<i class="icomoon icon-exit1"></i>
	        		<span class="hover primary capitalize" @click="logout">{{$t('menu.logout')}}</span>
	        	</span>
	        </div>
	      </div>                       
	    </div>
	  </div>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex';
	import { cartLenght } from '@/mixins';
	import { dropDown } from "@/helpers/domHelpers";
	
	export default {
		mixins: [cartLenght],

		data() {
			return {
				activePath: '',
				sidebarDropdownHeight: ''
			};
		},

		computed: {
			...mapState({
				authUser: state => state.auth.authUser,
				cartData: state => state.cart.itemData,
			}),
		},

		methods: {
			...mapActions({
				logout: 'auth/logout',				
			}),

			toggleDropdown(e) {
				dropDown(e, { onlyMobile: true });
			},
		},

		watch: {
			'$route'(route) {
				this.activePath = route.path;
			}
		},

		beforeMount() {
			this.activePath = this.$route.path;
			// console.log(this.$route)
		}
	}
	
</script>