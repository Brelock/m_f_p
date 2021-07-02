<template>
	<header id="mainHeader" class="mainHeader">
		<CoverOverlay
			:active="overlay.show"
			:z="overlay.zIndex"
			@onClick="()=>toggleAuthModal()"
		/>

		<div class="top-section">
			<div class="mcontainer">
				<div class="content-wrapper flex center">
					<div class="headerSectionBlock firstPartBlock flex center">
						<div class="buttonWrapper section-element mcol-md-hide">
							<button
								type="button"
								class="burgerButton mobileMenuButton"
								@click="openMobileMenu"
							>
								<div class=""><i class="icomoon icon-menu-burger"></i></div>
							</button>
						</div>

						<div class="logoBlock section-element mcol-md-auto">
							<div class="logo-wrapper">
								<nuxt-link :to="localePath('/')">
									<div class="imgWrapper">
										<mainLogo/>
										<!-- <img :src="mainLogo" alt="logo"> -->
									</div>
									<!-- <div class="logo-type">name <span>logotype</span></div> -->
								</nuxt-link>
							</div>
						</div>
					</div>

					<div class="headerSectionBlock flex center secondPartBlock">
						<div class="section-element searchBlock">
							<SearchBar
								@submit="(data) => setProductsFilters(data, { search: true })"
								:options="searchbarOptions"
								:query="products_filters.q"
								:clearable="true"
							/>
						</div>

						<div class="section-element langBlock menu mcol-xs-hide mcol-md-show">
							<div class="menu-button lang-buttons" @click="toggleMenu">
								<i class="icomoon gradientIcon icon-lang"></i>
								<span
									class="link uppercase"
									:class="{ active: locale.code == $i18n.locale }"
									v-for="locale in $i18n.locales"
									:key="locale.code"
									@click="changeLocale(locale.code)"
								>
									{{ locale.code }}
								</span>
							</div>
							<div class="sub-menu mobile">
								<div class="sub-menu-container">
									<ul class="items-list">
										<li>
											<span
												class="link uppercase"
												:class="{ active: locale.code == $i18n.locale }"
												@click="$i18n.setLocale(locale.code)"
												v-for="locale in $i18n.locales"
												:key="locale.code"
												>{{ locale.code }}</span
											>
										</li>
									</ul>
								</div>
							</div>
						</div>

						<div class="section-element accountBlock menu same-width">
							<div class="menu-button" @click="()=>toggleAuthModal()">
								<i class="icomoon gradientIcon icon-login"></i>
								<span>{{ $t("menu.profile") }}</span>
							</div>

							<ProfileSubmenu :authUser="authUser" />
						</div>

						<div
							class="section-element same-width cartBlock menu"
							:class="[{ active: cartLenght }]"
						>
							<nuxt-link
								class="menu-button"
								:to="localePath('/cart')"
							>
								<i class="icomoon gradientIcon icon-basket relative">
									<span class="quantity" v-if="cartLenght">
										<span>{{ cartLenght }}</span>
									</span>
								</i>
								<span v-if="cartLenght" class="text"
									>{{ $t("common.summ") }} <br />
									<b v-text="cartData.final_amount"></b>
								</span>
								<span v-else class="text capitalize-first"
									>{{ $t("common.cart_empty") }}
								</span>
							</nuxt-link>

							<div :class="['sub-menu', { js_hide: closeHoverMenues }]">
								<div class="menu-header flex spaceBetween center title">
									<div class="page-title medium capitalize-first">
										{{ $t("common.cart") }}
									</div>
								</div>

								<ProductsSubmenuList
									v-if="cartLenght"
									@event="handleEvent"
									:itemsLoading="cartLoading || cartSaving"
									:isCart="true"
									:cartList="cartData.orderProducts"
									:i18n="$i18n"
									@localePath="localePath"
								/>

								<div class="menu-footer flex spaceBetween" v-if="cartLenght">
									<div class="info-block">
										<div class="">{{ $t("common.summ") }}</div>
										<div class="total-price">
											<b v-text="`${cartData.final_amount}₪`"></b>
										</div>
									</div>

									<span @click="handleLinkClick">
										<nuxt-link
											:to="localePath('/cart')"
											class="standardButton primary uppercase"
											v-text="$t('phrase.goto_cart')"
										></nuxt-link>
									</span>
									<!-- <a href="/cart.html" class="standardButton primary uppercase">перейти в корзину</a> -->
								</div>

								<div v-else class="section-title">
									{{ $t("common.list_empty") }}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="bottom-section">
			<div class="menuMainWrapper">
				<div
					class="menuBlock relative 1secondPartBlock"
					:class="{ active: mobileMenuOpen }"
				>
					<nav
						id="navMenuWrapper"
						class="navMenuWrapper sectionBlock hiddenContent left"
						:class="{ js_showSlide: mobileMenuOpen }"
					>
						<div
							id="navMenuContainer"
							class="navMenuContainer mcontainer backgroundMock"
						>
							<div class="menuButtonsContainer flex spaceBetween mcol-md-hide">
								<button
									id="prevMenuButton"
									type="button"
									class="prevMenuButton"
									@click="stepBack"
								>
									<i class="icomoon icon-arrow2"></i>
								</button>
								<button
									type="button"
									class="closeMenuButton"
									@click="closeMobileMenu"
								>
									<i class="icomoon icon-cross1"></i>
								</button>
							</div>

							<ul id="navMenu" :class="['navMenu menu-section', { 'hide-sub-menues': !isMobile && closeHoverMenues }]">
								<li class="mobile-search wrapperBlock">
									<SearchBar
										@submit="
											(data) => setProductsFilters(data, { search: true })
										"
										:options="searchbarOptions"
										:query="products_filters.q"
										:clearable="true"
									/>
								</li>

								<NavMenuItem
									v-for="category in menuData"
									@toggleSubMenu="toggleSubMenu"
									:key="`prod_nav_cat-${category.id}`"
									:item="category"
									:i18n="$i18n"
									@localePath="localePath"
								/>

								<!-- ======================== -->
								
								<li class="menu-group phoneBlock menu">
									<div
										class="link phones-menu-button mcol-xs-hide mcol-md-show-inline"
										data-target="phones-menu"
										@click="toggleDropdown"
									>
										<!-- <span class="button-text md">еще</span> -->
										<span class="button-text full">03&nbsp;655&nbsp;2525</span>
										<i class="icomoon icon-arrow2"></i>
									</div>
									<!-- <li><a href="tel:+38(800)7004343">+38 (800) 700-43-43</a></li> -->
									<div
										id="phones-menu"
										class="sub-menu phones-menu hiddenContent height"
									>
										<!-- v-show="phonesMenuOpen"> -->
										<!-- :class="{'active': phonesMenuOpen}"> -->
										<ul class="phones-list">
											<li>
												<div>
													<div class="phone-num">
														<i class="icomoon icon-phone-call"></i> 
														<span>03&nbsp;655&nbsp;2525</span>
													</div>
													<div class="info-block">
														{{$t('temporary.copyright_one')}}
													</div>
												</div>
											</li>
											<li>
												<div>
													<div class="phone-num">
														<i class="icomoon icon-phone-call"></i> 
														<span>+972512250083</span>
													</div>
													<div class="info-block">
														Whatsapp
													</div>
												</div>
											</li>
										</ul>
									</div>
								</li>
								<li class="menu-group call-me-group menu">
									<div
										class="call-me-button menu-group_button standardButton secondary-inverted capitalize-first"
										data-target="call-me-menu"
										@click="toggleDropdown"
									>
										{{ $t("menu.callback_me") }}
									</div>

									<div
										id="call-me-menu"
										class="sub-menu call-me-menu hiddenContent height"
									>
										<CallMeBlock @submit="callMe" />
									</div>
								</li>
								<li class="menu-group langBlock mobile mcol-md-hide">
									<div class="">
										<i class="icomoon icon-lang"></i>
										<span
											class="link uppercase"
											:class="{ active: locale.code == $i18n.locale }"
											v-for="locale in $i18n.locales"
											:key="locale.code"
											@click="changeLocale(locale.code)"
											>{{ locale.code }}</span
										>
									</div>
								</li>
							</ul>
						</div>
					</nav>
				</div>
			</div>
		</div>

		<!-- <div class="mobile-quick-menu mcol-md-hide">
			<div class="mcontainer">
				<ul class="menu-list">
					<li
						v-for="(category, idx) in menuData"
						v-if="idx < 3"
						:key="`prod_quick_nav_cat-${category.id}`"
					>
						<nuxt-link
							:to="
								localePath({
									name: 'catalog',
									params: {
										catalog: `c_${category.alias}`,
										alias: category.alias,
									},
								})
							"
							v-text="category[`title_${$i18n.locale}`]"
						></nuxt-link>
					</li>
				</ul>
			</div>
		</div> -->

		<CustomModal
			:className="'auth-dialog'"
			v-if="isMobile"
			:title="$t('menu.profile')"
			:active="authModalShow"
			@onClose="()=>toggleAuthModal()"
		>
			<div class="popUpContainer">
				<ProfileSubmenu :authUser="authUser" />
			</div>
		</CustomModal>
	</header>
</template>

<script>
import { mapState, mapActions } from "vuex";

import SearchBar from "@/components/SearchBar";
import NavMenuItem from "./NavMenuItem.vue";
import CoverOverlay from "@/components/CoverOverlay";

import { eventHandler, itemsFetchSetMixin, cartLenght } from "@/mixins";
import { toggleSubMenu, stepBack, dropDown, scrollTo } from "@/helpers/domHelpers";
import { getParamsFromUrl } from '@/services/api_helpers';

// import { logoImg, mockImg } from '@/constants/global';
import mainLogo from '@/assets/svg/main-logo.svg';
import { Notification } from 'element-ui';

export default {
	mixins: [eventHandler, itemsFetchSetMixin, cartLenght],
	components: {
		SearchBar,
		NavMenuItem,
		CoverOverlay,
		mainLogo,
		// NavMenuItem: () => import('./NavMenuItem.vue'),
		ProfileSubmenu: () => import("./ProfileSubmenu.vue"),
		ProductsSubmenuList: () => import("./ProductsSubmenuList.vue"),
		CallMeBlock: () => import("@/components/CallMeBlock.vue"),
		CustomModal: () => import("@/components/CustomModal.vue"),
	},

	computed: {
		...mapState({
			menuData: (state) => state.categories.menuCategoriesList,
			favoritedProducts: (state) => state.products.favoritedProducts,
			cartData: (state) => state.cart.itemData,
			authUser: (state) => state.auth.authUser,
			userFetchedOnServer: (state) => state.auth.userFetchedOnServer,
			notifyOnClient: (state) => state.auth.notifyOnClient,
			dispatchOnClient: (state) => state.auth.dispatchOnClient,
			cookie_hash: (state) => state.auth.cookie_hash,
			categoriesLoading: (state) => state.categories.isLoading,
			productsLoading: (state) => state.products.isLoading,
			cartLoading: (state) => state.cart.isLoading,
			cartSaving: (state) => state.cart.isSaving,
			products_filters: (state) => state.products.filters,
			// overlay: state => state.global.overlay,
		}),

		// isMobile: () => isMobile,
		// mockImg: () => mockImg,
		searchbarOptions() {
			return {
				suffix: "icomoon icon-search gradientIcon",
				shadow: true,
			};
		},

		isLoading() {
			return this.categoriesLoading || this.productsLoading;
		},

		toggleSubMenu: () => toggleSubMenu,
		stepBack: () => stepBack,
		dropDown: () => dropDown,
	},

	data: function() {
		// this.$i18n.locale = 'ru';
		return {
			locale: 'ru',
			authModalShow: false,
			isMobile: false,
			submenuWrapperHeight: "",
			closeHoverMenues: false,
			mobileMenuOpen: false,
			phonesMenuOpen: false,
			/*filters: {
					q: ''
				}*/
			overlay: {
				show: false,
				zIndex: 1700,
			},
		};
	},

	/*data: () => ({
		
	}),*/

	methods: {
		...mapActions({
			// fetch_catalog_items: 'categories/fetch_catalog_items',
			fetch_products: "products/fetch_products",
			fetch_favorited: "products/fetch_favorited",
			fetch_cart: "cart/fetch_cart",
			remove_from_cart: "cart/remove_from_cart",
			toggle_favorited: "products/toggle_favorited",
			// toggle_cart: 'products/toggle_cart',
			get_auth_user: "auth/get_auth_user",
			callback_request: "other_requests/callback_request",
			set_products_filters: "products/set_filters",
			set_auth_data: "auth/set_data",
			// show_overlay: 'global/show_overlay',
		}),

		/*changeRoute(data) {
				console.log(data)
				this.$router.push({ name: 'catalog', params: { 'catalog': data.path, catId: data.catId } })
			},*/

		/*handleNavLinkClick(data) {
			console.log(data)
			// this.localePath(data);
			this.handleLinkClick();
		},*/

		overlayClick() {
			this.authModalShow = !this.authModalShow;
			this.overlay.show = false;
		},

		toggleAuthModal(options) {
			// console.log(action)
			if (this.isMobile) {
				let show = options && options.action != undefined ? 
					options.action :
					!this.authModalShow;
				this.authModalShow = show;
				this.overlay.show = this.authModalShow;

				const type = this.authModalShow ? "add" : "remove";
				document.body.classList[type]("js_overflowHidden");
			}
		},

		handleLinkClick() {
			this.closeHoverMenues = true;
			setTimeout(() => {
				this.closeHoverMenues = false;
			}, 300);
		},

		setProductsFilters(filters, settings) {
			// console.log(filters);
			if (settings && settings.search) {
				this.isSearch = true;
			}
			this.set_products_filters({ ...this.products_filters, ...filters });
		},

		fetchProducts(filters) {
			const payload = {
				params: { ...filters },
			};
			this.fetch_products(payload);
		},

		callMe(formData) {
			this.$fb.fbq('track', 'Contact');

			this.callback_request({ data: formData });
		},

		// --------
		/*calcMenuHeight({ timeout }) {
			setTimeout(() => {
				const navMenuContainer = document.getElementById("navMenuContainer");
				this.submenuWrapperHeight = `${navMenuContainer.offsetHeight}px`;
				// console.log(navMenuContainer.offsetHeight)
			}, timeout || 0);
		},*/

		toggleMenu({ target }) {
			const button = target.closest(".menu-button");
			button.classList.toggle("active");
		},
		toggleDropdown(e) {
			dropDown(e, { onlyMobile: true });
			// this.calcMenuHeight({ timeout: 300 });
		},
		openMobileMenu() {
			document.body.classList.add("js_pageOverlayOpen");
			this.mobileMenuOpen = true;
			// this.calcMenuHeight({});
		},
		closeMobileMenu() {
			document.body.classList.remove("js_pageOverlayOpen");
			this.mobileMenuOpen = false;
			const openSubs = document
				.getElementById("navMenuWrapper")
				.getElementsByClassName("js_showSlide");
			for (let i = 0; i < openSubs.length; i++) {
				openSubs[i].classList.remove("js_showSlide");
			}
		},

		setRTLAttr(code) {
			if (code == 'he') {
				document.body.setAttribute('dir', 'rtl');
			} else {
				document.body.removeAttribute('dir');
			}
		},

		changeLocale(locale) {
			if (locale === this.$i18n.locale) {
				return;
			}

			import(`@/lang/${locale}-${locale.toUpperCase()}`).then(loc_module => {
				// console.log(loc_module)
				this.$i18n.locale = locale;
				this.$i18n.setLocaleMessage(locale, loc_module.default);
				window.history.replaceState('', '', this.switchLocalePath(locale));			
				this.setRTLAttr(locale);
			})
		}
	},

	watch: {
		products_filters(filters) {
			if (this.isSearch) {
				this.$router.push("search");

				this.isSearch = false;
				this.fetchProducts({ ...filters });
			}
		},
		cookie_hash(hash) {
			if (hash) {
				console.log(hash)
				this.fetch_cart();
				// this.$nextTick()
				// 		.then(() => {
							
				// 		})
			}
		},
		'$route'() {
			// console.log(route) 
			/*if (this.isMobile) {
				console.log(1)
			} else {
			}*/

			this.handleLinkClick();
			this.closeMobileMenu();				
			this.toggleAuthModal({action: false});				
			scrollTo('mainHeader');
		}
	},

	mounted() {
		this.isMobile = document.documentElement.clientWidth < 992;

		this.setRTLAttr(this.$i18n.locale)
		// if (this.$route.fullPath != '/') {

			// const { token } = getTokenFromUrl(this.$route.fullPath);
		const { token, message } = getParamsFromUrl(this.$route.fullPath);

		if ((this.authUser && !this.userFetchedOnServer) || token) {
			let payload = {};
			if (token) {
				payload.token = token;
				payload.notifyWhenSuccess = true;
			}
			// console.log(window.location.hash)
			// console.log(token)
			this.get_auth_user(payload);
			this.set_auth_data({stateProp:'userFetchedOnServer', value:false});
		}
		if (message) {
			Notification({
				type: 'warning',
				title: decodeURI(message),
				// message: message
			});
		}

		if (this.notifyOnClient) {
			const { message, type  } = this.notifyOnClient;
			Notification({
				type: type,
				message: message,
			});
			this.set_auth_data({stateProp:'notifyOnClient', value:null});
		}

		if (this.dispatchOnClient) {
			const { action, payload  } = this.dispatchOnClient;
			this.$store.dispatch(action, payload )
			this.set_auth_data({stateProp:'dispatchOnClient', value:null});
		}
		// }

		if (this.cookie_hash && this.cookie_hash != 'null') {
			this.fetch_cart();
		}

		/*const actions = ['', 'fetch_favorited'];
			this.initialResponse({ action: 'fetch_cart'})
				.then(() => {
					this.doResponses({ actions: actions, params: { max: -1 } });
				})*/
		// this.initialResponses({ actions: actions, params: { max: -1 } })
		// this.fetch_catalog_items();
		// this.fetch_favorited();
		// console.log('created')
		// this.fetch_catalog_items();
	},
};
</script>
