import Vue from 'vue';
import Vuex from 'vuex';
import latin_map from '@/utils/latinMap';

import { destinations } from '@/structure.json';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		heroHeight: 0,
		destinations: destinations,
		activeDestination: destinations[0]
	},
	mutations: {
		setHeroHeight(state, heroHeight) {
			state.heroHeight = heroHeight;
		}
	},
	actions: {
		setHeroHeight({ commit }, payload) {
			commit('setHeroHeight', payload);
		}
	},
	getters: {
		getDestinations: state => {
			return state.destinations.map(destination => {
				let destinationID = destination.name
					.toLowerCase()
					.split(' ')
					.join('-')
					.latinise();
				return {
					...destination,
					id: destinationID
				};
			});
		}
	},
	setter: {}
});

export default store;

String.prototype.latinise = function() {
	return this.replace(/[^A-Za-z0-9]/g, function(x) {
		return latin_map[x] || x;
	});
};
