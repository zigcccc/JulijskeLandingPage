import Vue from 'vue';
import Vuex from 'vuex';
import latin_map from '@/utils/latinMap';

import { destinations } from '@/structure.json';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		heroHeight: 0,
		isPastHero: false,
		menuOpen: false,
		destinations: destinations,
		activeDestination: destinations[0]
	},
	mutations: {
		setHeroHeight(state, heroHeight) {
			state.heroHeight = heroHeight;
		},
		setActiveDestination(state, destination) {
			state.activeDestination = destination;
		},
		pastHero(state, cond) {
			state.isPastHero = cond;
		},
		toggleMenu(state) {
			state.menuOpen = !state.menuOpen;
		}
	},
	actions: {
		setHeroHeight({ commit }, payload) {
			commit('setHeroHeight', payload);
		},
		setActiveDestination({ commit }, payload) {
			commit('setActiveDestination', payload);
		},
		pastHero({ commit }, payload) {
			commit('pastHero', payload);
		},
		toggleMenu({ commit }) {
			commit('toggleMenu');
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
		},
		prevAndNext: (state, getters) => {
			let output = {};
			let destinations = getters.getDestinations;
			destinations.forEach(destination => {
				if (destination.index === state.activeDestination.index) {
					let prev =
						destination.index > 0
							? destinations[destination.index - 1]
							: undefined;
					let next =
						destination.index + 1 < destinations.length
							? destinations[destination.index + 1]
							: undefined;
					output = { prev, next };
				}
			});
			return output;
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
