<template>
  <div class="border-top">
    <!-- feed 流 -->
    <div v-for="item in newsList" :key="item.id" @click="openArticleDetail(item.id)">
      <div class="news-item border-bottom" v-if="item.type == 'ad'">
        <ad unit-id="adunit-aaccf6009d5ca578"></ad>
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
    <div class="float-msg" v-if="showFloat" @click="receiveReward">
      <img src="/static/images/float.png">
    </div>
    <float-msg-model :showFloatModel="showFloatModel" :redPackageInfo="redPackageInfo" @closeFloatModel="closeFloatModel" @goMePage="goMePage"></float-msg-model>
    <p class="loading-down">数据加载中...</p>
  </div>
</template>

<script>
import FloatMsgModel from './components/FloatMsgModel';
import { getNewsList } from '@/api/news';
import utils from '@/utils/index';
import defaultImg from '@static/images/default-article-icon.png';
export default {
  name: 'Feed',
  components: {
    FloatMsgModel
  },
  computed: {},
  data() {
    return {
      // 判断是刷新列表还是加载更多
      addNewsType: 'add',
      // feed流
      newsList: [],
      // 是否是从其他用户分享的文章详情页进入的
      shareArticle: false,
      // 其他用户分享的文章id
      shareArticleId: null,
      // 是否显示浮层
      showFloat: false,
      // 是否显示浮层的弹窗
      showFloatModel: false,
      redPackageInfo: {}
    };
  },
  created() {
    wx.showLoading({
      title: '加载中'
    });

    this.addNewsType = 'add';
    this.getFeedList();
  },
  async mounted() {
    console.log('feed');

    this.$store.dispatch('GetRegisterInfo').then(() => {
      // 获取用户积分及红包情况
      this.getCreditPage();
      // 获取用户信息
      this.$store.dispatch('GetUserInfo');
    });

    // 获取分享详情页的参数
    const pageQuery = this.$root.$mp.query;
    this.shareArticle = pageQuery.source === 'shareArticle';
    this.shareArticleId = pageQuery.id;
    // 分享的文章从feed流自动跳入详情页
    if (this.shareArticle) {
      this.openArticleDetail(this.shareArticleId);
    }
    // 注册分享功能
    wx.showShareMenu({
      withShareTicket: true
    });
  },
  methods: {
    // 获取新闻列表
    getFeedList(type) {
      getNewsList({
        times: 1,
        direction: 1
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
        for (i = 0; i < len; i += 4) {
          data.result.splice(i + 1, 0, {
            type: 'ad'
          });
        }

        if (this.addNewsType === 'add') {
          this.newsList = [...this.newsList, ...data.result];
        } else {
          this.newsList = data.result;

          // 停止下拉
          wx.stopPullDownRefresh();
        }

        setTimeout(() => {
          wx.hideLoading();
        }, 300);
      });
    },
    // 打开详情页
    openArticleDetail(id) {
      let url = this.shareArticle ? '/pages/newsDetail/main?shareArticle=true&id=' + id : '/pages/newsDetail/main?id=' + id;
      wx.navigateTo({ url });
    },
    // 领取新手奖励 打开弹窗，关闭浮层
    receiveReward() {
      this.showFloatModel = true;
      this.showFloat = false;
    },
    // 关闭新手奖励弹窗
    closeFloatModel(type) {
      this.showFloatModel = false;
      // 未领取红包关闭弹窗，显示浮层
      if (type === 'noReceive') {
        this.showFloat = true;
      }
    },
    // 领取新手奖励成功，跳转签到页面
    goMePage() {
      let url = '/pages/me/main';
      this.showFloat = false;
      this.showFloatModel = false;
      wx.switchTab({ url });
    },
    // 拉取用户金币现金及是否有红包
    getCreditPage() {
      this.$store.dispatch('GetCreditPage').then(res => {
        if (res.redBagList) {
          this.showFloatModel = true;
          this.redPackageInfo = res.redBagList;
        } else {
          this.showFloat = false;
        }
      });
    },
    errorLoadImg(item) {
      item.url = defaultImg;
    }
  },
  // 定义转发的内容
  onShareAppMessage(res) {
    return {
      title: '送你一个红包，快拆！',
      path: '/pages/feed/main',
      imageUrl: '/static/images/share-me.png'
    };
  },
  // 下拉刷新
  onPullDownRefresh() {
    // 开始下拉
    wx.showLoading({
      title: '加载中'
    });
    this.addNewsType = 'refresh';
    this.getFeedList();
  },
  // 上拉触底
  onReachBottom() {
    wx.showLoading({
      title: '加载中'
    });
    this.addNewsType = 'add';
    this.getFeedList();
  }
};
</script>

<style lang="stylus">
@import '~styles/feed.styl'
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
page
  .float-msg
    position fixed
    right 11.3px
    bottom 38.3px
    width 79.6px
    height 89.5px
    img
      width 100%
      height 100%
  .loading-down
    text-align center
    padding 10px 0
    font-size 14px
    color #666666
</style>
