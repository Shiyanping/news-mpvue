import Vue from 'vue';
import Vuex from 'vuex';
import alert from './modules/alert';
import getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    alert
  },
  getters
});

export default store;
