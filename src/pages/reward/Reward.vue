<template>
  <div class="border-top">
    <reward-sum></reward-sum>
    <reward-tab :navName="navName" :goldList="goldList" :incomeList="incomeList" @handleSwitchName="handleSwitchName"></reward-tab>
    <div class="margin-bottom"></div>
    <div class="withdraw-btn">
      <div @click="withdrawTips">立即提现</div>
    </div>
    <alert-model></alert-model>
  </div>
</template>

<script>
import RewardSum from './components/RewardSum';
import RewardTab from './components/RewardTab';
import AlertModel from '@/components/AlertModel';
import { getUserGold, getCashIncome } from '@/api/user';
export default {
  name: 'Reward',
  components: {
    RewardSum,
    RewardTab,
    AlertModel
  },
  data() {
    return {
      // 当前tab的名称 gold金币，income现金
      navName: 'gold',
      // 金币列表
      goldList: [],
      // 现金列表
      incomeList: [],
      // 暂无金币列表 true 无更多数据
      noDoldList: false,
      // 暂无现金列表 true 无更多数据
      noIncomeList: false,
      goldPageNo: 0,
      incomePageNo: 0
    };
  },
  mounted() {
    console.log('奖励页');
    this.resetData();
    this.getUserGoldDetail();
    this.getUserIncomeDetail();
    // 注册分享功能
    wx.showShareMenu({
      withShareTicket: true
    });
  },
  methods: {
    handleSwitchName(type) {
      this.navName = type;
    },
    // 初始化数据
    resetData() {
      this.goldList = [];
      this.incomeList = [];
      this.noDoldList = false;
      this.noIncomeList = false;
      this.goldPageNo = 0;
      this.incomePageNo = 0;
    },
    // 获取金币明细
    getUserGoldDetail() {
      getUserGold({
        pageNo: this.goldPageNo
      }).then(res => {
        var data = res.data;
        if (data.code === 0) {
          console.log(data);
          // 判断还有没有分页
          if (data.result.items.length !== 0) {
            this.goldList = [...this.goldList, ...data.result.items];
            if (data.result.items.length < data.result.pageSize) {
              this.noDoldList = true;
            }
          } else {
            this.noDoldList = true;
          }
        } else {
          console.log('服务器异常');
        }
      });
    },
    // 获取金钱明细
    getUserIncomeDetail() {
      getCashIncome({
        pageNo: this.incomePageNo
      }).then(res => {
        var data = res.data;
        if (data.code === 0) {
          console.log(data);
          if (data.result.items.length !== 0) {
            this.incomeList = [...this.incomeList, ...data.result.items];
            if (data.result.items.length < data.result.pageSize) {
              this.noIncomeList = true;
            }
          } else {
            this.noIncomeList = true;
          }
        } else {
          console.log('服务器异常');
        }
      });
    },
    withdrawTips() {
      // 通过vuex弹出弹出框
      const alertModelParams = {
        title: '温馨提示',
        content: '暂时只支持在淘新闻官方app进行提现，回复数字“1”即可获取app下载链接，安装成功在“我的”-“提现兑换”页面进行提现即可。',
        contentType: 'string',
        btn: '立即去提现',
        showModel: true,
        btnType: 'contact',
        cb() {
          console.log('提现弹窗：我知道了');
        }
      };
      this.$store.commit('OPEN_ALERT', alertModelParams);
    }
  },
  // 上拉触底
  onReachBottom() {
    if (this.navName === 'gold' && !this.noDoldList) {
      this.goldPageNo++;
      this.getUserGoldDetail();
    } else if (this.navName === 'income' && !this.noIncomeList) {
      this.incomePageNo++;
      this.getUserIncomeDetail();
    }
  },
  // 定义转发的内容
  onShareAppMessage(res) {
    return {
      title: '送你一个红包，快拆！',
      path: '/pages/feed/main',
      imageUrl: '/static/images/share-me.png'
    };
  }
};
</script>

<style lang="stylus" scope>
@import '~styles/mixin.styl'
.margin-bottom
  height 70px
.withdraw-btn
  position fixed
  height 64px
  bottom 0
  left 0
  right 0
  background #fff
  >div
    hor-ver-center-position()
    height 48px
    width 343px
    btn-linear-gradient()
    box-shadow 0 2px 4px 0 rgba(255, 86, 69, 0.5)
    border-radius 100px
    text-align center
    line-height 48px
    color #fff
</style>
