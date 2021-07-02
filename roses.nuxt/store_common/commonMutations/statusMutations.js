export default {
	SET_STATUS_LOADING: (state, status) => {
		state.isLoading = status;
	},

	SET_STATUS_SAVING: (state, status) => {
		state.isSaving = status;
	}
};
