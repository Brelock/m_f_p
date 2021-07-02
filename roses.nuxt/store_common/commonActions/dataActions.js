const set_items = ({ commit }, items) => {
	commit('SET_ITEMS', items);
};

/*const set_state = ({ commit }, data=[]) => {
	commit('SET_MULTIPLE_STATE', data);
};*/

export { set_items };
