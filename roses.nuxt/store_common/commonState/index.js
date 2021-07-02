const dataState = {
	itemsList: [],
	itemData: null
};

const filtersState = {
	filters: {
		max: 10,
		page: 1,
		orderByColumn: '',
		orderByMethod: '',
		q: ''
	},
	fetchedMeta: {}
};

/*const sortingState = {
	sortingData: {
		orderByColumn: '',
		orderByMethod: ''
	}
};*/

const statusState = {
	isLoading: false,
	isSaving: false
};

export { dataState, statusState, filtersState /*, sortingState*/ };
