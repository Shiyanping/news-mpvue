<template>
  <div class="border-top">
    <!-- feed 流 -->
    <div v-for="item in newsList" :key="item.id" @click="openArticleDetail(item.id)">
      <div class="three-img-news news-item border-bottom" v-if="item.thumbMode === 3">
        <p class="news-title">{{item.title}}</p>
        <div class="three-img-list">
          <img v-for="(imgItem, i) in item.thumbArr" :key="i" :src="imgItem.url" class="news-image" @error="errorLoadImg(imgItem)" :class="{'three-center-img': i == 1}">
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
        <img :src="item.thumbArr[0].url" v-if="item.thumbArr[0] != null" class="news-image" @error="errorLoadImg(item.thumbArr[0])">
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
import { getWxCode } from '@/utils/wxApi';
import { getNewsList } from '@/api/news';
import utils from '@/utils/index';
import defaultImg from '@static/images/default-article-icon.png';
export default {
  name: 'Feed',
  components: {
    FloatMsgModel
  },
  computed: {
    userId() {
      return this.$store.getters.userId == null ? '' : this.$store.getters.userId;
    }
  },
  data() {
    return {
      // 是否是从其他用户分享的文章详情页进入的
      showArticle: false,
      // 其他用户分享的文章id
      shareArticleId: null,
      // 是否显示浮层
      showFloat: false,
      // 是否显示浮层的弹窗
      showFloatModel: false,
      // 判断是刷新列表还是加载更多
      addNewsType: 'add',
      // feed流
      newsList: [],
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
    // 注册分享功能
    wx.showShareMenu({
      withShareTicket: true
    });
    // 获取用户设备信息
    const systemInfo = wx.getSystemInfoSync();
    this.$store.commit('SET_SYSTEMINFO', systemInfo);
    // 获取用户 code
    const code = await getWxCode();

    this.$store.dispatch('GetRegisterInfo', code).then(() => {
      // 获取用户积分及红包情况
      this.getCreditPage();
      // 获取用户信息
      this.$store.dispatch('GetUserInfo');
    });

    // 获取分享详情页的参数
    const pageQuery = this.$root.$mp.query;
    this.showArticle = pageQuery.source === 'shareArticle';
    this.shareArticleId = pageQuery.id;
    // 分享的文章从feed流自动跳入详情页
    if (this.showArticle) {
      this.openArticleDetail(this.shareArticleId);
    }
  },
  methods: {
    // 打开详情页
    openArticleDetail(id) {
      let url = '/pages/newsDetail/main?id=' + id;
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
    // 获取新闻列表
    getFeedList(type) {
      getNewsList({
        times: 1,
        userId: this.userId,
        direction: 1
      }).then(res => {
        const data = res.data;
        if (data.code === 0) {
          // 格式化时间
          data.result = data.result.map(value => {
            value.pubTimeFormat = utils.timeago(value.pubTime);
            return value;
          });
          if (this.addNewsType === 'add') {
            this.newsList = [...this.newsList, ...data.result];
          } else {
            this.newsList = data.result;

            // 停止下拉
            wx.stopPullDownRefresh();
          }
          wx.hideLoading();
        } else {
          console.log('网络异常');
        }
      });
    },
    // 拉取用户金币现金及是否有红包
    getCreditPage() {
      this.$store.dispatch('GetCreditPage').then(res => {
        if (res.redBagList) {
          // this.showFloat = true;
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
      title: '淘新闻'
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
