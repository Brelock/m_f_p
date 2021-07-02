import { setupCategoryCrumbsList } from '@/helpers';

const breadcrumbsMixin = {
	computed: {
		flatCategoriesList() {
			return this.$store.getters['categories/flatCategoriesList'];
		},

		breadcrumbs() {
			const { category, flatCategoriesList, isProductPage, currentItem } = this;
			if (category && flatCategoriesList) {
				let crumbs = setupCategoryCrumbsList(category, flatCategoriesList);
				// console.log()
				if (isProductPage && currentItem) {
					const item = {
						id: crumbs[crumbs.length-1].id + 1,
						to: {	
							name:'catalog',
							params: { 'catalog': `p_${currentItem.alias}` } 
						},
						title_ru: currentItem.title_ru,
						title_uk: currentItem.title_uk
					}
					crumbs.push(item);
				}

				return crumbs;
			}
			return [];
		},
	}
};

export default breadcrumbsMixin;
