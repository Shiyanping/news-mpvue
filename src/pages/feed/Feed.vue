<template>
  <div class="border-top homePage">
    <!--feed流tab-->
    <div class="feed_tab_container">
      <div class="feed_tab">
        <div class="feed_tab_item" v-for="(item, $index) in newsTabs" :key="$index" @click="checkFeedTab(item.key)" :class="item.key == addNewsTab && 'feed_tab_active'">
          <template v-if="item.key == 3">
            <navigator target="miniProgram" open-type="navigate" app-id="wx8e7ab82331241c58" path="pages/index/index?channel=taoredianJiankang" version="release">
              {{item.value}}
              <img src="/static/images/tabRedback.png">
            </navigator>
          </template>
          <template v-else>
            {{item.value}}
          </template>
        </div>
      </div>
    </div>
    <!--淘热点导流健康知识汇-->
    <!--推荐列表-->
    <navigator target="miniProgram" open-type="navigate" app-id="wx8e7ab82331241c58" path="pages/index/index?channel=taoredianIndex" version="release" v-if="false">
      <div class="single-img-news news-item border-bottom">
        <div class="single-img-text">
          <p class="news-title">天天领红包，现金红包送不停！</p>
          <p class="news-source">
            <span class="source-title"></span>
            <span></span>
          </p>
        </div>
        <img src="/static/images/commentRedback.png" mode="aspectFill" class="news-image">
      </div>
    </navigator>
    <!--健康列表-->
    <navigator target="miniProgram" open-type="navigate" app-id="wx8e7ab82331241c58" path="pages/index/index?channel=taoredianIndex" version="release">
      <div class="three-img-news news-item border-bottom" v-if="addNewsTab == 0">
        <p class="news-title">看健康知识，领红包，3元就能提现！月赚上千元！</p>
        <div class="three-img-list healthImage">
          <img mode="aspectFill" src="/static/images/healthyRedback.png" class="news-image">
        </div>
        <!--<p class="news-source">-->
          <!--<span class="source-title">{{item.uperName}}</span>-->
          <!--<span>{{item.pubTimeFormat}}</span>-->
        <!--</p>-->
      </div>
    </navigator>
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
      addNewsTab: 0,
      newsTabs: [
        {key: 0, value: '推荐'},
        {key: 1, value: '搞笑'},
        {key: 2, value: '奇闻'},
        {key: 3, value: '健康'},
        {key: 4, value: '娱乐'},
        {key: 5, value: '美食'},
        {key: 6, value: '情感'},
        {key: 7, value: '育儿'},
        {key: 9, value: '科技'},
        {key: 13, value: '时尚'},
        {key: 15, value: '汽车'},
        {key: 16, value: '体育'},
        {key: 20, value: '生活'}
      ],
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
    checkFeedTab(tab) {
      if (tab === this.addNewsTab || parseInt(tab) === 3) return;
      this.addNewsTab = tab;
      this.addNewsType = 'refresh';
      wx.showLoading({
        title: '加载中'
      });
      this.getFeedList();
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
      let url = this.shareArticle ? ('/pages/newsDetail/main?shareArticle=true&id=' + id + '&type=' + this.addNewsTab) : ('/pages/newsDetail/main?id=' + id + '&type=' + this.addNewsTab);
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

<style lang="stylus" type="text/stylus">
@import '~styles/feed.styl'
.homePage
  padding-top 80rpx
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
.feed_tab_container
  height 80rpx
  width 100%
  overflow hidden
  box-shadow 0 0 0 0 #E5E5E5
  border-bottom 1px solid #E5E5E5
  position fixed
  left 0
  top 0
  z-index 1
  background #fff
  .feed_tab
    display flex
    justify-content flex-start
    flex-wrap nowrap
    width 100%
    height 110rpx
    overflow-x scroll
    font-family PingFangSC-Regular
    font-size 32rpx
    color #323232
    .feed_tab_active
      font-family PingFangSC-Medium
      font-size 34rpx
      color #Ff6464
    .feed_tab_item
      min-width 110rpx
      height 68rpx
      line-height 80rpx
      text-align center
      flex-shrink 0
      img
        width 28rpx
        height 34rpx
        vertical-align middle
        margin-bottom 6rpx
        margin-left -8rpx
.healthImage
  width 702rpx
  height 360rpx!important
  image
    width 100%
    height 100%
</style>
