<template>
	<footer class="mainFooter">
		<section class="mcontainer ">
			<div class="flex wrap sections-list">
				<div class="section-block mcol-xs-12 mcol-sm-6 mcol-md-3 flex column">
					<h4 class="block-title">{{$t('phrase.we_online')}}</h4>

					<div class="hot-line">
						<a href="tel:036552525">03&nbsp;655&nbsp;2525</a>
					</div>

					<div class="footer-description">
						<p>{{$t('temporary.copyright_one')}}</p>
					</div>

					<!-- <h4 class="block-title push-down">Присоединяйтесь</h4>
					<ul class="social-media-list">
						<li class=""><a href="#" class="icomoon icon-google-plus"></a></li>
						<li class=""><a href="#" class="icomoon icon-linkedin"></a></li>
						<li class=""><a href="#" class="icomoon icon-vk"></a></li>
						<li class=""><a href="#" class="icomoon icon-odnoklassniki"></a></li>
						<li class=""><a href="#" class="icomoon icon-facebook"></a></li>
						<li class=""><a href="#" class="icomoon icon-twitter"></a></li>
					</ul> -->

				</div>

				<!-- <div class="section-block mcol-xs-12 mcol-sm-6 mcol-md-3">
					<h4 class="block-title">Name logotype</h4>

					<ul class="footer-menu">
						<li><a href="#">О компании</a></li>
						<li><a href="#">Магазины</a></li>
						<li><a href="#">Контакты</a></li>
						<li><a href="#">Пресс-центр</a></li>
						<li><a href="#">Работа в Name Logotype</a></li>
						<li><a href="#">Политика</a></li>
						<li><a href="#">Партнерам</a></li>
						<li><a href="#">Каталог товаров</a></li>
					</ul>
				</div> -->

				<div class="section-block mcol-xs-12 mcol-sm-6 mcol-md-3">
					<h4 class="block-title">{{$t('phrase.popular_categories')}}</h4>

					<ul class="footer-menu">
						<li v-for="item in popularCategoriesList"
							:key="`footer-item-${item.id}`"
						>
							<nuxt-link
								:to="
									localePath({
										name: 'catalog',
										params: { catalog: `c_${item.alias}` },
									})
								"
							>{{ item[`title_${locale}`] }}</nuxt-link>
						</li>
					</ul>
				</div>

				<div class="section-block mcol-xs-12 mcol-sm-6 mcol-md-3 ml-auto">
					<h4 class="block-title">{{$t("temporary.help_buyer")}}</h4>

					<ul class="footer-menu">
						<li><nuxt-link :to="localePath('/about_us')">{{$t("menu.company_us")}}</nuxt-link></li>
						<li><nuxt-link :to="localePath('/delivery_payment')">{{$t("menu.delivery_payment")}}</nuxt-link></li>
						<li><nuxt-link :to="localePath('/contacts')">{{$t("menu.contacts")}}</nuxt-link></li>
					</ul>
				</div>

			</div>
		</section>

		<section class="bottomFooter">
			<!-- ______ -->
			<div class="mcontainer">
				<div class="contentContainer flex wrap spaceBetween">
					<div class="rights  mcol-xs-12 mcol-sm-6">© «mir roz», 2021</div>
					<a href="https://zengineers.company" target="_blank" class="zengineers mcol-xs-12 mcol-sm-6">
						<span>{{$t('temporary.developed')}}</span><span class="zengi-logo"><ZengiLogo/></span>
					</a>
				</div>
			</div>
		</section>
	</footer>
</template>


<script>
	import { mapState, mapActions } from "vuex";
  import ZengiLogo from '@/assets/svg/zengineers-logo.svg';
	import { getLocaleCode } from "@/helpers";

	export default {
		components: {
			ZengiLogo
		},
		computed: {
			...mapState({
				popularCategoriesList: (state) => state.categories.popularCategoriesList,
				categoriesLoading: (state) => state.categories.isLoading,
			}),

			// getLocaleCode: () => getLocaleCode,

			locale() {
				return getLocaleCode(this.$i18n.locale);
			},
		},

		methods: {
			...mapActions({
				fetch_popular_categories: 'categories/fetch_popular_categories',
			})
		},

		created() {
			if (this.popularCategoriesList.length < 1) {
				this.fetch_popular_categories();				
			}
		}
	}

</script>
