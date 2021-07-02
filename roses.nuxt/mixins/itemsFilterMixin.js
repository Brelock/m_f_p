import { findItemBy } from '@/helpers';

const itemsFilterMixin = {
	computed: {
		/*fetched_on_ssr() {
			return this.$store.state.products.fetched_on_ssr;
		},*/

		activeFiltersList() {
			let result = [];

			if (this.filters.brandId) {
				const id = this.filters.brandId;
				const brandItem = findItemBy('id', id, this.brandsList);
				if (brandItem) {
					const item = {
						brandId: brandItem.id,
						title_ru: brandItem.title_ru,
						title_uk: brandItem.title_uk
					}
					result.push(item);
				}
				// result.push({brandId:id, title: getItemValue(id, 'title_ru', this.brandsList) })
			}
			// console.log(this.filters)
			if (this.filters.filterOptionIds.length) {
				const ids = this.filters.filterOptionIds;

				for (let i = 0; i < ids.length; i++) {
					const item = findItemBy('id', ids[i], this.filterOptionsList);

					if (item) {
						result.push(item);
					}
					// result.push({optionId:ids[i], title: getItemValue(ids[i], 'title_ru', this.filterOptionsList) });						
				}
			}
			return result;
		}
	},
	methods: {
		/*fetchItems(filters) {
			const payload = { params: { ...filters } };
			this.fetch_items(payload);
		},*/
		removeFilter({ id, brandId, all }) {
			if (brandId) {
				this.setFilters({ brandId: null });
			} else if (id) {
				this.setFilterOptionIds(id);
			} else if (all) {
				this.setFilters({ brandId: null, filterOptionIds: [] });
			}
		},

		setFilters(filters) {
			// console.log(filters)
			// const newFilters = { ...this.filters, ...filters };
			this.set_filters({ ...this.filters, ...filters });
		},

		setFiltersBrand({ val, id }) {
			this.setFilters({ brandId: val ? id : null });
		},

		setFilterOptionIds(id) {
			let newFilterOptionIds = [...this.filters.filterOptionIds];
			if (newFilterOptionIds.some(o => o === id)) {
				newFilterOptionIds = newFilterOptionIds.filter(o => o !== id);
			} else {
				newFilterOptionIds.push(id);
			}

			// const newFilters = { ...this.filters, filterOptionIds: newFilterOptionIds };
			this.setFilters({ filterOptionIds: newFilterOptionIds });
		},

		handleSort(prop) {
			const data = {
				orderByColumn: prop,
				orderByMethod: this.filters.orderByMethod == 'asc' ? 'desc' : 'asc'
			};
			// console.log(data)
			this.setFilters(data);
		}
	},

	watch: {
		/*filters: function(old, newV) {
			this.fetchItems(filters);	
		}	*/	

		filters(filters) {

			// console.log('4 filters:');
			// if (!this.fetched_on_ssr) {
				this.fetchItems(filters);				
			// } else {
			// 	this.$store.dispatch('products/set_state', {
			// 		stateProp: 'fetched_on_ssr',
			// 		value: false,
			// 	})
			// }
		},
	}
};

export default itemsFilterMixin;
