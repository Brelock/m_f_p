import { setupCategoryCrumbsList } from '@/helpers';
import pathLacales from '@/constants/pathLacales';

const breadcrumbsFromPathMixin = {
	computed: {
		crumbs() {
			let pathArray = this.$route.path.split("/");
			pathArray.shift();

			let result = [
				{id:1, to:'/', title_ru:'Главная', title_uk:'בית' }
			];

			let breadcrumbs = pathArray.reduce((breadcrumbArray, path, idx) => {
				if (path != 'he') {
					breadcrumbArray.push({
						id: idx + 2,
						path: path,
						to: breadcrumbArray[idx - 1]
						? "/" + breadcrumbArray[idx - 1].path + "/" + path
						: "/" + path,
						// text: this.getCrumbName(path),
						title_ru: pathLacales[`${path}_ru`],
						title_uk: pathLacales[`${path}_uk`]
						// active: idx === breadcrumbArray.length - 1
					});
				}
				// console.log(path)
				return breadcrumbArray;
			}, []);
			
			return [...result, ...breadcrumbs];
		},
	}
};

export default breadcrumbsFromPathMixin;
