<template>
  <div>
    <user-info></user-info>
    <sign></sign>
    <download></download>
    <alert-model></alert-model>
  </div>
</template>

<script>
// 登录组件
import sign from './components/Sign';
// 用户信息组件
import UserInfo from './components/UserInfo';
// 下载app组件
import Download from './components/Download';
// 弹出层组件
import AlertModel from '@/components/AlertModel';
export default {
  name: 'Me',
  components: {
    sign,
    UserInfo,
    Download,
    AlertModel
  },
  data() {
    return {};
  },
  computed: {},
  mounted() {
    wx.showLoading({
      title: '加载中'
    });
    this.getSignInfo();
    // 注册分享功能
    wx.showShareMenu({
      withShareTicket: true
    });
  },
  methods: {
    getSignInfo() {
      this.$store.dispatch('GetSignInfo').then(code => {
        if (code === 0) {
          wx.hideLoading();
        }
      });
    }
  },
  // 定义转发的内容
  onShareAppMessage(res) {
    return {
      title: '淘新闻',
      path: '/pages/feed/main',
      imageUrl: '/static/images/share-me.png'
    };
  }
};
</script>

<style lang="stylus">
@import '~styles/mixin.styl'
page
  height 100%
  background #f9f9f9
.sign-success-model
  model()
  .sign-content
    flex-direction column
    hor-ver-center-flex()
    width 300px
    height 257px
    background #fff
    border-radius 8px
    hor-ver-center-position()
    .close-model
      position absolute
      top 8px
      right 8px
      width 24px
      height 24px
    .sign-success-icon
      width 76px
      height 76px
    .sign-success-content, .sign-success-num, .sign-share-btn
      font-family PingFangSC-Medium
    .sign-success-content
      font-size 16px
      color #333333
      line-height 24px
    .sign-success-num
      font-size 28px
      color #FF743A
      line-height 24px
      margin 12px 0 24px
    .sign-share-btn
      width 236px
      height 48px
      background-image linear-gradient(-90deg, #FE9763 0%, #FF6464 100%)
      box-shadow 0 2px 4px 0 rgba(255, 86, 69, 0.5)
      border-radius 100px
      color #FFFFFF
      text-align center
      line-height 48px
</style>
