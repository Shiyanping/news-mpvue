import { sa } from './utils/sensorsdata';
import Vue from 'vue';
import App from './App';
import store from './store';

sa.init();

Vue.config.productionTip = false;
App.mpType = 'app';

Vue.prototype.$store = store;

const app = new Vue(App);
app.$mount();

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: ['^pages/feed/main'],
    window: {
      navigationBarBackgroundColor: '#Ff6464',
      navigationBarTextStyle: '#fff'
    },
    tabBar: {
      color: '#8E8E8E',
      selectedColor: '#FF3300',
      backgroundColor: '#ffffff',
      list: [
        {
          pagePath: 'pages/feed/main',
          text: '新闻',
          iconPath: 'static/images/feed.png',
          selectedIconPath: 'static/images/feed-click.png'
        },
        {
          pagePath: 'pages/me/main',
          text: '我的',
          iconPath: 'static/images/me.png',
          selectedIconPath: 'static/images/me-click.png'
        }
      ]
    }
  }
};
