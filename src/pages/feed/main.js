import Vue from 'vue';
import Feed from './Feed';

const app = new Vue(Feed);
app.$mount();

export default {
  config: {
    navigationBarTitleText: '新闻',
    enablePullDownRefresh: true,
    onReachBottomDistance: 50
  }
};
