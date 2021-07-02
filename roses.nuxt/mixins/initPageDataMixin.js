import { getAlias /*, getParentPageRoute*/ } from '@/helpers';
import { Notification } from 'element-ui';

const initPageDataMixin = {
	data() {
		return {
			// loadContent: false
		};
	},

	methods: {
		fetchPageData(alias, options = {}) {
			// const actionName = this.fetchActionName || 'fetch_item';

			this['fetch_item']({ itemAlias: alias, notNotifyError: true, ...options })
				.then(() => {
					try {
						if (options.fetchActions && options.fetchActions.list.length) {
							this.doResponses({ 
								actions: options.fetchActions.list,
								...options.fetchActions.payload
							});
						}
						if (options.fetchMethods && options.fetchMethods.length) {
							for (const method of options.fetchMethods) {
								this[method]();
							}
						}
					} catch(e) {console.warn(e)}
					
					// this.loadContent = true;
				})
				.catch(error => {
					if (error.response.status === 404) {
						this.$router.push('/');
						setTimeout(() => {
							Notification({
								type: 'warning',
								title: 'Redirect',
								message: `${this.pageType.label} с псевдонимом "${alias}" не обнаружена(а)`
							}, 2000);
						}, 200);
					}
				});
		},
	},

	// watch: {},

	created() {
		// this.setup_navbar(this.navbarSettings);
	},

	beforeMount() {
		const alias = getAlias( this.$route.params[this.containerName] );
		console.log(this.currentItem, alias)
		// const { alias } = this.$route.params;

		// const param = itemId || alias;
		
		if (alias && !this.currentItem) {
			this.fetchPageData(alias, {fetchActions: this.startFetchActions, fetchMethods: this.fetchMethods});
		}
		// console.log(this.$router.history.current.fullpath)
	},

	/*beforeMount() {
		// console.log(this.$route.params.id)
		const { params } = this.$route;

		if (getPageType(params)) {
			// if (params.id === 'new') {
				// this.loadContent = true;
			// } else {
				this.fetchPageData(params.id, { notNotify: true });
			// }
		} else {
			this.$router.push({ name: 'NotFoundPage' });
		}
	},*/

	beforeDestroy() {
		// this.set_page_type('');
		if (!this.withoutClearItem) {
			this.set_item(null);
		}

		// this.setup_navbar({});
	}
};

export default initPageDataMixin;
