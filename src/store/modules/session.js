
///////////////////////////////////

const state = {
    user:null,
}

///////////////////////////////////

const mutations = {
    user(state, payload) {

    	console.log('SET USER', state, payload)
        state.user = payload;
        // console.log('Set State user to ', data)

        // console.log('AFTEr', state.user)
    },
}

///////////////////////////////////

const getters = {
    user(state) {
        return state.user;
    },
    accessToken(state) {
        if (!state.user) {
            return;
        }

        return state.user.token;
    },
    refreshToken(state) {
        if (!state.user) {
            return;
        }

        return state.user.refreshToken;
    },
}

///////////////////////////////////

const actions = {
    logout({
        commit
    }) {
        console.log('Logout!')
        commit('user', null);
    }
}

///////////////////////////////////

export default {
    state,
    mutations,
    getters,
    actions,
}