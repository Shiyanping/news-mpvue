import Vue from 'vue';
import Reward from './Reward';

const app = new Vue(Reward);
app.$mount();

export default {
  config: {
    navigationBarTitleText: '收入明细'
  }
};
