<template>
  <div v-if="showFloatModel">
    <div class="model-bg" v-if="!isReceive">
      <div class="model-box get-user-info-model">
        <img src="/static/images/new-red-package.png" class="model-box-bg">
        <img src="/static/images/red-package-close.png" class="red-package-close" @click="closeRedPackageModel">
        <p class="new-red-package-title">恭喜获得一个新手红包</p>
        <p class="new-red-package-content">最高200元随机红包</p>
        <p class="no-get-info-tips" v-if="!agreeGetUserInfo">请先同意授权登录才可领取红包</p>
        <button open-type="getUserInfo" lang="zh_CN" @getuserinfo="onGotUserInfo" class="model-get-user-info"></button>
      </div>
    </div>
    <div class="model-bg" v-else>
      <div class="model-box reward-model">
        <img src="/static/images/open-red-package.png" class="model-box-bg">
        <img src="/static/images/red-package-close.png" class="red-package-close" @click="closeRedPackageModel">
        <p class="reward-model-title">恭喜获得</p>
        <p class="reward-model-subtitle">新手红包</p>
        <p class="reward-model-num">{{redNum}}
          <span>元</span>
        </p>
        <p class="reward-model-btn" @click="goMe">去签到赚钱</p>
      </div>
    </div>
  </div>
</template>

<script>
import { redBagCost } from '@/api/user';
export default {
  name: 'FloatMsgModel',
  props: {
    showFloatModel: Boolean,
    redPackageInfo: Object
  },
  data() {
    return {
      // 是否领取了奖励 false未领取 true领取
      isReceive: false,
      // 是否同意授权
      agreeGetUserInfo: true,
      // 开红包奖金
      redNum: 0
    };
  },
  computed: {
    token() {
      return this.$store.getters.token;
    }
  },
  methods: {
    // 关闭新手奖励弹窗
    closeRedPackageModel() {
      this.$emit('closeFloatModel');
    },
    // 获取用户信息
    onGotUserInfo(e) {
      console.log(e);
      if (e.target.userInfo) {
        console.log('授权成功');
        this.openRedBag();
        this.$store.dispatch('UpdateUserInfo', e.target.userInfo);
      } else {
        console.log('授权失败');
        this.agreeGetUserInfo = false;
      }
    },
    openRedBag() {
      redBagCost({
        creditKey: this.redPackageInfo.creditKey,
        token: this.token
      }).then(res => {
        const data = res.data;
        console.log(data);
        if (data.code === 0) {
          this.redNum = data.result / 100;
          this.isReceive = true;
        } else {
          wx.showToast({
            title: '网络异常，请稍后重试',
            icon: 'none',
            duration: 2000
          });
        }
      });
    },
    // 跳转签到
    goMe() {
      this.$emit('goMePage');
    }
  }
};
</script>

<style scoped lang="stylus">
@import '~styles/mixin.styl'
.model-bg
  model()
  .model-box
    position absolute
    left 50%
    top 50%
    transform translate(-50%, -50%)
    width 290px
    height 352px
    .model-box-bg
      width 100%
      height 100%
    .red-package-close
      position absolute
      top 10px
      right 15px
      width 15px
      height 15px
    >p, >button
      position absolute
      left 50%
      transform translateX(-50%)
      width 290px
      text-align center
    .new-red-package-title
      top 58px
      font-family PingFangSC-Medium
      font-size 24px
      color #FFFFFF
      letter-spacing 0.15px
    .new-red-package-content
      top 100px
      color #FDE96D
    .no-get-info-tips
      top 134px
      width 236px
      height 26px
      background #febec4
      border-radius 100px
      font-size 14px
      color #EE3239
      line-height 26px
    .model-get-user-info
      width 116px
      height 116px
      top 173px
    .reward-model-title
      top 72px
      font-size 16px
      color #8E8E8E
    .reward-model-subtitle, .reward-model-num, .reward-model-title
      font-family PingFangSC-Semibold
    .reward-model-subtitle
      top 100px
      font-size 24px
      color #323232
    .reward-model-num
      top 137px
      color #FF3300
      font-size 40px
      >span
        position relative
        left -10px
        font-size 30px
    .reward-model-btn
      width 220px
      height 48px
      line-height 48px
      bottom 38px
      font-size 16px
      color #FF3300
      background #FFFFFF
      border-radius 100px
</style>
