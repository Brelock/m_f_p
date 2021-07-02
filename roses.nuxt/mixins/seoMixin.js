import { getLocaleCode, getSeoLink } from "@/helpers";
import isEmpty from 'lodash/isEmpty';

const seoMixin = {
	/*data() {
		return {

		};
	},
*/
	computed: {
		seo_meta_tags() {
			return this.$store.state.seo.meta_tags;
		},
		meta () {
			const { instancePropName, seo_meta_tags, $i18n } = this;

			// console.log('seo mixin1', this, this[instancePropName])
			let hasMetaTags = false;

			if (seo_meta_tags instanceof Array && seo_meta_tags.length) { 
				hasMetaTags = true
			} else if (seo_meta_tags && !isEmpty(seo_meta_tags)) {
				hasMetaTags = true
			}

			const locale = getLocaleCode($i18n.locale);
			let seo_title, title, seo_description, image, instance;

			if (instancePropName && this[instancePropName]) {
				instance = this[instancePropName];
				image = instance.pictures && instance.pictures.length ? instance.pictures[0].picture_thumb_file_name : null;
			}

			if (hasMetaTags) {
				seo_title = seo_meta_tags[`seo_title_${locale}`];
				title = seo_meta_tags[`title_${locale}`];
				seo_description = seo_meta_tags[`seo_description_${locale}`];
			} else if (instance) {
				seo_title = instance[`seo_title_${locale}`];
				title = instance[`title_${locale}`];
				seo_description = instance[`seo_description_${locale}`];
			} else {
				return [];
			}
				// const description = this[instancePropName][`description_${locale}`];

			let meta = [
				{
					hid: 'title',
					name: 'title',
					content: seo_title || title
				},
				{
					hid: 'description',
					name: 'description',
					content: seo_description,
				},
				{
					hid: 'og:site_name',
					property: 'og:site_name',
					content: 'https://zermarket.co.il'
				},
				{
					hid: 'og:title',
					property: 'og:title',
					content: seo_title || title
				},
				{
					hid: 'og:description',
					property: 'og:description',
					content: seo_description
				},
				/*{
					hid: 'og:image:secure_url',
					property: 'og:image:secure_url',
					content: this.image
				},
				{
					hid: 'og:image:alt',
					property: 'og:image:alt',
					content: this.title
				}*/
			];

			if (image) {
				meta.push({
					hid: 'og:image',
					property: 'og:image',
					content: image
				})
			}
					// console.log(meta)

			// console.log('seo mixin2', this[instancePropName])
			return meta;								
		},

		head_title() {
			// console.log('meta.length', this.meta.length)
			if (this.meta.length) {
				return this.meta[0].content
			} else
			return '';
		}
	},

	head () {
		const canonical = getSeoLink(this.$route);
		// const meta = this.meta.splice(0,1);
		// console.log('seo mixin title', this.head_title, canonical)
		return {
			title: this.head_title,
			meta: [...this.meta],
			script: [
				// { src: 'https://markknol.github.io/console-log-viewer/console-log-viewer.js' }
			],
			link: [{ rel: 'canonical', href: canonical }]
		}
	},

	methods: {
		// https://zengi.zengineers.company/
		/*getLink() {
			// console.log(this.$route.path)
			// return `http://shop.loc:8089/${this.$route.path
			return `https://api.zermarket.co.il${this.$route.path				
				.toLowerCase()
				.replace(/\/$/, '')}`
		}*/
	},

	/*watch: {
		'$route'(route) {
		console.log(route)
			this.$store.dispatch('seo/fetch_meta_tags', {
				params:	{redirect_uri: getSeoLink(route) }
			});
		}
	},*/

	beforeMount() {
		// console.log(this.seo_meta_tags)
		this.$store.dispatch('seo/fetch_meta_tags', {
			params:	{redirect_uri: getSeoLink(this.$route) }
		});
		/*const payload = {
			params: {redirect_uri: this.getLink() }
		}*/
		/*this.$store.dispatch('seo/fetch_meta_tags', payload)
			.then(response => {

				console.log('response: ', response)						
			});*/
	},

	/*beforeDestroy() {
		this.$store.dispatch('seo/set_meta_tags')
	}*/
};

export default seoMixin;
