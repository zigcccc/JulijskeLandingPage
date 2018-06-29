import Vue from 'vue';
import Vuex from 'vuex';

import { destinations } from '@/structure.json';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		destinations: destinations
	},
	mutations: {},
	actions: {},
	getters: {
		destinationsNames: state => {
			return state.destinations.map(destination => destination.name);
		}
	},
	setter: {}
});
