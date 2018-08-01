import Vue from 'vue';
import App from './App.vue';
import VueAnalytics from 'vue-analytics';
import VueGtm from 'vue-gtm/dist/vue-gtm.min.js';
import Meta from 'vue-meta';
import * as Cookie from 'js-cookie';
import VeeValidate from 'vee-validate';
import store from './store';

Vue.use(VeeValidate);

Vue.config.productionTip = false;

const trackingDisabled =
	String(Cookie.get('ga_fb_allowed')) === 'false' ? true : false;

Vue.use(VueAnalytics, {
	id: 'UA-122922765-1',
	debug: {
		enabled: false
	}
});

Vue.use(VueGtm, {
	debug: false,
	enabled: !trackingDisabled
});

Vue.use(Meta);

new Vue({
	store,
	render: h => h(App)
}).$mount('#app');
