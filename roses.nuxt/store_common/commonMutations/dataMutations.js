import { findItemBy, cloneDeep, setObjectVal, concatValues } from '@/helpers';

export default {
	/*SET_ITEMS: (state, items) => {
		state.itemsList = items || [];
	},*/

	SET_STATE: (state, { stateProp, value, concatData }) => {
		if (concatData) {
			state[stateProp] = concatValues(state[stateProp], value, concatData);
		} else {
			state[stateProp] = value;
		}
	},

	/*SET_MULTIPLE_STATE: (state, {stateProps, value}) => {
		for (var i = 0; i < stateProps.length; i++) {
			const { prop, value } = stateProps[i]
			state[prop] = value;
		}
	},*/

	UPDATE_STORE: (state, {stateProps, value}) => {
		for (let i = 0; i < stateProps.length; i++) {
			let propCopy = cloneDeep(state[stateProps[i]]);

			if (propCopy instanceof Array) {
				const {index} = findItemBy('id', value.id, propCopy, {returnIndex: true});
				if (index !== null) {
					propCopy[index] = value;
				}
			} else if (propCopy.id === value.id) {
				propCopy = value;
			}
			state[stateProps[i]] = propCopy;
		}
	},

	SET_NESTED_STATE: (state, { stateProp, value }) => {
		setObjectVal(state, stateProp, value);
	},

	SET_FILTERS: (state, { filter, val }) => {
		state.filters[filter] = val;
	}
	/*SET_SORTING: (state, { filter, val }) => {
		state.filters[filter] = val;
	}*/
};
