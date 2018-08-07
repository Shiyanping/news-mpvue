import Vue from 'vue';
import Vuex from 'vuex';
import alert from './modules/alert';
import user from './modules/user';
import getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    alert,
    user
  },
  getters
});

export default store;
