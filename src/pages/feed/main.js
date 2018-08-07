import Vue from 'vue';
import Feed from './Feed';

const app = new Vue(Feed);
app.$mount();

export default {
  config: {
    navigationBarTitleText: '淘新闻',
    enablePullDownRefresh: true,
    onReachBottomDistance: 50,
    backgroundTextStyle: 'dark'
  }
};
