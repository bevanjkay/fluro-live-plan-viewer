const state = {
	counter:0,
}

///////////////////////////////////

const mutations = {
	counter(state, payload) {
		state.counter = payload || 0;
	},
}

///////////////////////////////////

const getters = {
	
}

///////////////////////////////////

const actions = {
	increment({commit}, payload) {
		if(payload === undefined) {
			payload = 1;
		}

		var currentValue = this.state.counter;
		commit('counter', currentValue += payload);
	},
	decrement({commit}, payload) {
		if(payload === undefined) {
			payload = 1;
		}

		var currentValue = this.state.counter;
		commit('counter', currentValue -= payload);
	}    
}

///////////////////////////////////

export default {
	state,
	mutations,
	getters,
	actions,
}
