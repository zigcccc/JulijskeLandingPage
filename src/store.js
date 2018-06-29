import Vue from 'vue';
import Vuex from 'vuex';
import latin_map from '@/utils/latinMap';

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
			return state.destinations.map(destination => {
				let destinationID = destination.name
					.toLowerCase()
					.split(' ')
					.join('-')
					.latinise();
				return {
					name: destination.name,
					id: destinationID
				};
			});
		}
	},
	setter: {}
});

String.prototype.latinise = function() {
	return this.replace(/[^A-Za-z0-9]/g, function(x) {
		return latin_map[x] || x;
	});
};
