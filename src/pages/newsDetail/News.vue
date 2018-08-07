<template>
  <div>
    <news-detail v-if="articleContent" :articleContent="articleContent"></news-detail>
    <div class="margin-bottom"></div>
    <div class="fixed-footer">
      <p class="go-home" @click="goHome">返回首页</p>
      <button class="share-wechat" open-type="share">
        <img src="/static/images/wechat-icon.png" alt=""> 分享给朋友
      </button>
    </div>
  </div>
</template>

<script>
import newsDetail from './components/Content';
import { getNewsDetail } from '@/api/news';
export default {
  name: 'News',
  components: {
    newsDetail
  },
  data() {
    return {
      articleContent: {},
      pageQuery: null
    };
  },
  mounted() {
    // 获取分享详情页的参数
    this.pageQuery = this.$root.$mp.query;
    getNewsDetail(this.pageQuery.id).then(res => {
      const data = res.data;
      this.articleContent = {};
      if (data.code === 0) {
        this.articleContent = data.result;
      } else {
        console.log('网络异常');
      }
    });
    // 注册分享功能
    wx.showShareMenu({
      withShareTicket: true
    });
  },
  methods: {
    // 返回首页
    goHome() {
      let url = '/pages/feed/main';
      wx.switchTab({ url });
    }
  },
  // 使用右上角的转发
  onShareAppMessage(res) {
    let imgUrl = '/static/images/share-article-default.png';
    if (this.articleContent.imgList.length !== 0) {
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
.fixed-footer
  position fixed
  bottom 0
  left 0
  right 0
  display flex
  justify-content space-between
  height 48px
  > p
    display flex
    justify-content center
    align-items center
    height 100%
  .go-home
    width 128px
    text-align center
    background #fff
    color #323232
    box-shadow inset 0 0 0 0 #E5E5E5
  .share-wechat
    display flex
    align-items center
    justify-content center
    width 247px
    background-image linear-gradient(-90deg, #FE9763 0%, #FF6464 100%)
    box-shadow 0 2px 4px 0 rgba(255, 86, 69, 0.5)
    color #fff
    border-radius 0px
    img
      width 24px
      height 20px
      margin-right 8px
</style>
