<template>
  <div>
    <news-detail v-if="articleContent" :articleContent="articleContent"></news-detail>
    <div class="margin-bottom"></div>
    <div class="fixed-footer">
      <div class="go-home" @click="goHome">
        <p class="receive-red-package" v-if="isShare && hasRedPackage">
          <img src="/static/images/share-detail-package.png">
        </p>
        <span>返回首页</span>
        <img src="/static/images/receive-redpackage.png" class="float-red-package" v-if="isShare && hasRedPackage">
      </div>
      <button class="share-wechat" open-type="share">
        <img src="/static/images/wechat-icon.png"> 分享给朋友
      </button>
    </div>
  </div>
</template>

<script>
import newsDetail from './components/Content';
import { getNewsDetail } from '@/api/news';
import { getCreditPage } from '@/api/user';
const app = getApp();
export default {
  name: 'News',
  components: {
    newsDetail
  },
  data() {
    return {
      articleContent: {},
      pageQuery: null,
      // 是否为分享的文章
      isShare: false,
      // 判断是否有新手红包
      hasRedPackage: false
    };
  },
  mounted() {
    // 获取分享详情页的参数
    this.pageQuery = this.$root.$mp.query;
    this.isShare = this.pageQuery.shareArticle === 'true';
    getNewsDetail(this.pageQuery.id).then(res => {
      const data = res.data;
      this.articleContent = data.result;
      // 埋点
      this.remoteLog({
        event: 'WebPageView',
        page: '资讯明细页',
        name: '内容小程序'
      });
    });

    // 从分享打开的用户，需要获取新手红包状态
    if (this.isShare) {
      this.getRedPackage();
    }

    // 注册分享功能
    wx.showShareMenu({
      withShareTicket: true
    });
  },
  onUnload() {
    Object.assign(this.$data, this.$options.data());
  },
  methods: {
    // 返回首页
    goHome() {
      let url = '/pages/feed/main';
      wx.switchTab({ url });
    },
    getRedPackage() {
      getCreditPage({}).then(res => {
        const data = res.data;
        // 判断用户是否有新手红包
        if (data.result.redBagList) {
          this.hasRedPackage = true;
        } else {
          this.hasRedPackage = false;
        }
      });
    },
    // 埋点
    remoteLog(params) {
      app.sensors.track(params.event, {
        element_page: params.page,
        element_name: params.name
      });
    }
  },
  // 使用右上角的转发
  onShareAppMessage(res) {
    let imgUrl = '/static/images/share-article-default.png';
    if (this.articleContent.imgList != null && this.articleContent.imgList.length !== 0) {
      imgUrl = this.articleContent.imgList[0];
    }
    return {
      title: this.articleContent.title,
      path: '/pages/feed/main?source=shareArticle&id=' + this.pageQuery.id,
      imageUrl: imgUrl
    };
  }
};
</script>

<style lang="stylus">
@import '~styles/mixin.styl'
.fixed-footer
  position fixed
  bottom 0
  left 0
  right 0
  display flex
  justify-content space-between
  height 48px
  box-shadow 0px -1px 3px rgba(0, 0, 0, 0.15)
  .go-home
    position relative
    hor-ver-center-flex()
    width 149px
    height 100%
    background #fff
    color #323232
    font-size 16px
  .receive-red-package
    margin-right 6px
    img
      width 30px
      height 27.9px
  .float-red-package
    position absolute
    top -19px
    left 10px
    width 66px
    height 31px
    max-width auto
    animation iconJump .5s ease-in-out 0s infinite alternate
    @-webkit-keyframes iconJump
      0%
        top -19px
      100%
        top -22px
  .share-wechat
    hor-ver-center-flex()
    flex 1
    btn-linear-gradient()
    color #fff
    border-radius 0px
    img
      width 24px
      height 20px
      margin-right 8px
</style>
