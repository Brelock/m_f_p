const itemsFetchSetMixin = {
	methods: {
		/*initialAsyncFetch(store, { actions, params, options = {} }) {
			for (let i = 1; i < actions.length; i++) {
	  		store.dispatch(actions[i])({ params: params, ...options });				
			}
		},*/

		initialResponse({ action, params, options = {} }) {
			return new Promise((resolve, reject) => {
				this[action]({ params: params, ...options })
					.then(data => {
						resolve(data);
					})
					.catch(error => {
						reject(error);
					});
			});
		},

		initialResponses(payload) {
			const { actions, params } = payload;
			this[actions[0]]({ params: params }).then(() => {
				if (actions.length > 1) {
					this.doResponses(payload);
				}
			});
		},

		doResponses({ actions, params, itemId }) {
			for (let i = 1; i < actions.length; i++) {
				// console.log(params)
				if (this[actions[i]]) {
					this[actions[i]]({ params: params, itemId: itemId });
				}
			}
		},

		cleanLists(lists) {
			for (let list of lists) {
				this[list]([]);
			}
		}
	}
};

export default itemsFetchSetMixin;
