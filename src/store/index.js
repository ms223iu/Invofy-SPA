import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: {
      authenticated: false
    }
  },

  getters: {
    isAuthenticated(state) {
      return state.user.authenticated;
    }
  },

  mutations: {
    SET_AUTHENTICATED(state, boolean) {
      state.user.authenticated = boolean;
    }
  },

  actions: {
    /*ACTION_AUTHORIZE({ commit, state }, data) {
      state.user.authenticated = true;
    },

    ACTION_LOGOUT({ commit, state }, data) {
      state.user.authenticated = false;
    }*/
  }
});

export default store;
