import Vue from 'vue';
import VueCookie from 'vue-cookie';
import Vuex from 'vuex';
window.axios = require('axios');
import router from './router';
import Buefy from 'buefy';
import App from './App.vue';

Vue.use(Vuex);
Vue.use(VueCookie);
Vue.use(Buefy);

import store from './store';

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
});
