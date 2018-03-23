import Vue from 'vue';
import VueCookie from 'vue-cookie';
import Vuex from 'vuex';
window.axios = require('axios');
import router from './router';
import Buefy from 'buefy';
import VeeValidate, { Validator } from 'vee-validate';
import sv from 'vee-validate/dist/locale/sv';
import store from './store';
import App from './App.vue';

Validator.localize('sv', sv);

Vue.use(Vuex);
Vue.use(VueCookie);
Vue.use(Buefy);
Vue.use(VeeValidate);

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
});
