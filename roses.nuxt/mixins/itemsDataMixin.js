// import { getPageType /*, getParentPageRoute*/ } from '@/helpers';
import { Notification } from 'element-ui';

const itemsDataMixin = {

	methods: {
		fetchItems(filters) {
			const payload = { params: { ...filters } };
			this.fetch_items(payload);
		},

		setFilters(filters) {
			const newFilters = { ...this.filters, ...filters };
			this.set_filters(newFilters);
		}
	},

	watch: {
		filters(filters) {
			this.fetchItems({ ...filters });
		},
	},

	created() {
		this.fetchItems({ ...this.filters });
	},

	beforeDestroy() {
		// this.set_page_type('');
		if (!this.withoutClearItem) {
			this.set_items([]);
		}
	}
};

export default itemsDataMixin;
