export default {
    state: {
        token: '',
        type_flag: true,
        search_list: []
    },
    mutations: {
        update_token(state, token) {
            state.token = token;
        },
        update_search_list(state, list) {
            state.search_list.push(list)
        }
    },
    actions: {
        update_tokens_async({ commit }, token) {
            commit('update_token', token);
        },
        update_list_async({ commit }, token) {
            commit('update_search_list', token);
        }
    }
};