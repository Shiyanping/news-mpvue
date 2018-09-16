<template>
  <div>
    <news-detail v-if="articleContent" :articleContent="articleContent"></news-detail>

    <!--健康知识汇推荐位-->
    <navigator target="miniProgram" open-type="navigate" app-id="wx8e7ab82331241c58" path="pages/index/index?channel=taoredianNewsend" version="release">
      <div class="detai_navhealth">
        <img src="/static/images/detail_health.png" class="detai_navhealth_bg"></img>
        <img src="/static/images/detail_health_btn.png" class="detai_navhealth_fg"></img>
      </div>
    </navigator>
    <!--相关推荐-->
    <div class="relate_comment">
      <span class="line"></span>
      <span class="word">相关推荐</span>
    </div>
    <!-- feed 流 -->
    <div v-for="item in newsList" :key="item.id" @click="openArticleDetail(item.id)">
      <div class="news-item border-bottom" v-if="item.type == 'ad'">
        <ad unit-id="adunit-5d77c79f9a74a576"></ad>
      </div>
      <div class="three-img-news news-item border-bottom" v-else-if="item.thumbMode === 3">
        <p class="news-title">{{item.title}}</p>
        <div class="three-img-list">
          <img v-for="(imgItem, i) in item.thumbArr" mode="aspectFill" :key="i" :src="imgItem.url" class="news-image" @error="errorLoadImg(imgItem)" :class="{'three-center-img': i == 1}">
        </div>
        <p class="news-source">
          <span class="source-title">{{item.uperName}}</span>
          <span>{{item.pubTimeFormat}}</span>
        </p>
      </div>
      <div class="single-img-news news-item border-bottom" v-else-if="item.thumbMode === 1">
        <div class="single-img-text">
          <p class="news-title">{{item.title}}</p>
          <p class="news-source">
            <span class="source-title">{{item.uperName}}</span>
            <span>{{item.pubTimeFormat}}</span>
          </p>
        </div>
        <img :src="item.thumbArr[0].url" mode="aspectFill" v-if="item.thumbArr[0] != null" class="news-image" @error="errorLoadImg(item.thumbArr[0])">
      </div>
      <div class="no-img-news news-item border-bottom" v-else>
        <p class="news-title">{{item.title}}</p>
        <p class="news-source">
          <span class="source-title">{{item.uperName}}</span>
          <span>{{item.pubTimeFormat}}</span>
        </p>
      </div>
    </div>

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
import { getNewsDetail, getNewsList } from '@/api/news';
import { getCreditPage } from '@/api/user';
import utils from '@/utils/index';
import defaultImg from '@static/images/default-article-icon.png';
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
      hasRedPackage: false,
      addNewsTab: 0,
      addNewsType: 'refresh',
      newsList: []
    };
  },
  mounted() {
    // 获取分享详情页的参数
    this.pageQuery = this.$root.$mp.query;
    this.isShare = this.pageQuery.shareArticle === 'true';
    this.addNewsTab = parseInt(this.pageQuery.type);
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

    // 获取feed流
    this.getFeedList();
  },
  onUnload() {
    Object.assign(this.$data, this.$options.data());
  },
  methods: {
    // 返回首页
    goHome() {
      wx.navigateBack({ delta: 2 });
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
    },
    // 获取新闻列表
    getFeedList(type) {
      getNewsList({
        times: 1,
        direction: 1,
        typeId: this.addNewsTab || ''
      }).then(res => {
        const data = res.data;

        // 格式化时间
        data.result = data.result.map(value => {
          value.pubTimeFormat = utils.timeago(value.pubTime);
          return value;
        });

        // 返回的结果每四个分一组，在第二项添加一个空位置，方便添加广告
        let i = 0;
        const len = data.result.length;
        for (i = 0; i < len; i += 5) {
          data.result.splice(i + 1, 0, {
            type: 'ad'
          });
        }

        if (this.addNewsType === 'add') {
          this.newsList = [...this.newsList, ...data.result];
        } else {
          this.newsList = data.result;
        }

        setTimeout(() => {
          wx.hideLoading();
        }, 300);
      });
    },
    // 打开详情页
    openArticleDetail(id) {
      let url = '/pages/newsDetail/main?shareArticle=true&id=' + id + '&type=' + this.addNewsTab;
      wx.redirectTo({ url });
    },
    errorLoadImg(item) {
      item.url = defaultImg;
    }
  },
  // 上拉触底
  onReachBottom() {
    wx.showLoading({
      title: '加载中'
    });
    this.addNewsType = 'add';
    this.getFeedList();
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

<style lang="stylus" type="text/stylus">
@import '~styles/feed.styl'
@import '~styles/mixin.styl'
.relate_comment
  border-top 16rpx solid rgb(250, 250, 250)
  padding 48rpx 24rpx 16rpx
  line-height 54rpx
  .line
    display inline-block
    width 6rpx
    height 32rpx
    background-image linear-gradient(-90deg, #FE9763 0%, #FF6464 100%)
    border-radius 200rpx
    vertical-align middle
  .word
    font-family PingFangSC-Medium
    font-size 36rpx
    color #323232
    display inline-block
    margin-left 16rpx
    vertical-align  middle
.three-img-news
  height auto
  overflow hidden
  .news-title
    height auto
  .three-img-list
    margin-bottom 6px
    height 74px
    overflow-y hidden
    .three-center-img
      margin 0 3px
.no-img-news
  height auto
  .news-title
    width 100%
    height auto
.single-img-news
  display flex
  justify-content space-between
  height 96px
  .news-title
    width 222px
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
.detai_navhealth
  width 100%
  height 192rpx
  position relative
  background #fff
  border-top 16rpx solid #fafafa
  .detai_navhealth_bg
    width 88.54%
    height 170rpx
    margin 11rpx 22rpx
  .detai_navhealth_fg
    width 130rpx
    height 130rpx
    position absolute
    right 38rpx
    top 0
    bottom 0
    margin auto
    animation openAnimation .8s ease-in-out infinite
  @-webkit-keyframes openAnimation
    0%
      transform scale(0.7)
    49.99%
      transform scale(0.7)
    50%
      transform scale(1)
    99.99%
      transform scale(1)
    100%
      transform scale(0.7)
</style>
