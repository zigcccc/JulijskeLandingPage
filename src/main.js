import Vue from 'vue';
import App from './App.vue';
import VueAnalytics from 'vue-analytics';
import VueFacebookPixel from 'vue-analytics-facebook-pixel';
import VeeValidate from 'vee-validate';
import store from './store';

Vue.use(VeeValidate);

Vue.config.productionTip = false;

Vue.use(VueAnalytics, {
	id: 'UA-122922765-1'
});

Vue.use(VueFacebookPixel);

new Vue({
	store,
	render: h => h(App)
}).$mount('#app');
