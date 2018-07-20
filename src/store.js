import Vue from 'vue';
import Vuex from 'vuex';
import latin_map from '@/utils/latinMap';

import { destinations } from '@/structure.json';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		language: 'sl',
		appLoading: true,
		influencersPopupVisible: false,
		heroHeight: 0,
		isPastHero: false,
		windowWidth: 0,
		pastDestinations: false,
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
		},
		setAppLoading(state, payload) {
			state.appLoading = payload;
		},
		pastDestinations(state, payload) {
			state.pastDestinations = payload;
		},
		setWindowWidth(state, payload) {
			state.windowWidth = payload;
		},
		changeLanguage(state, payload) {
			if (payload === 'sl' || payload === 'en') {
				state.language = payload;
				localStorage.setItem('lang', payload);
			} else {
				state.language = 'en';
			}
		},
		toggleInfluencersPopup(state) {
			state.influencersPopupVisible = !state.influencersPopupVisible;
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
		},
		setAppLoading({ commit }, payload) {
			commit('setAppLoading', payload);
		},
		pastDestinations({ commit }, payload) {
			commit('pastDestinations', payload);
		},
		setWindowWidth({ commit }, payload) {
			commit('setWindowWidth', payload);
		},
		changeLanguage({ commit }, payload) {
			commit('changeLanguage', payload);
		},
		toggleInfluencersPopup({ commit }) {
			commit('toggleInfluencersPopup');
		}
	},
	getters: {
		doneLoading: state => {
			return !state.appLoading;
		},
		getActiveDestination: state => {
			return state.activeDestination;
		},
		isPastDestinations: state => {
			return state.pastDestinations;
		},
		getDestinations: state => {
			return state.destinations.map(destination => {
				let destinationID = destination.name['en']
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
		},
		getDestinationsContactInfo: state => {
			return state.destinations.map(destination => {
				return {
					name: destination.name,
					web: destination.url,
					phone: destination.phone,
					email: destination.email
				};
			});
		},
		getWindowWidth: state => {
			return state.windowWidth;
		},
		getLanguage: state => {
			return state.language;
		},
		influencersPopupState: state => {
			return state.influencersPopupVisible;
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
