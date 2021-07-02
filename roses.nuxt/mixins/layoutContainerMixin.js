// import { getPageType /*, getParentPageRoute*/ } from '@/helpers';
// import { Notification } from 'element-ui';

const layoutContainerMixin = {
	
	/*data: () => ({
		contentReady: true,
	}),*/

	computed: {
		pageType() {
			return this.$store.state.global.page_type;
		},

		contentReady() {
			return this.$store.state.global.catalog_contentReady;
		},
	},

	methods: {
		
	},

	watch: {
		/*pageType(type, oldType) {
			if (type != oldType) {
				this.contentReady = false;
				console.log('watch pageType', type, oldType)
			}

			setTimeout(() => {
				this.contentReady = true;
			}, 1000);

		}*/
	},


	created() {
		// this.setup_navbar(this.navbarSettings);
	},

	beforeMount() {
	
	},

};

export default layoutContainerMixin;
