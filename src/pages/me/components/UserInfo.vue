<template>
  <div class="user-info">
    <img :src="userInfo.avatarUrl" class="user-info-avator" v-if="userInfo.avatarUrl && userInfo.avatarUrl !== ''">
    <img src="/static/images/avator.png" class="user-info-avator" v-else>
    <div class="user-info-detail">
      <p class="user-name font-weight" v-if="userInfo.nickName && userInfo.nickName !== ''" v-text="userInfo.nickName"></p>
      <button open-type="getUserInfo" lang="zh_CN" @getuserinfo="onGotUserInfo" class="user-name font-weight" v-else>请登录</button>
      <p class="user-reward" @click="openRewardPage">
        <span class="gold-detail">金币
          <span class="font-weight">{{gold}}</span>
        </span>
        <span>零钱
          <span class="font-weight">{{balance}}</span>
        </span>
      </p>
    </div>
    <p class="withdraw" @click="openRewardPage">提现</p>
  </div>
</template>

<script>
export default {
  name: 'Sign',
  computed: {
    userInfo() {
      return this.$store.getters.userInfo;
    },
    gold() {
      return this.$store.getters.gold;
    },
    balance() {
      return this.$store.getters.balance / 100;
    }
  },
  mounted() {},
  methods: {
    // 打开用户奖励列表
    openRewardPage() {
      let url = '/pages/reward/main?uid=' + 1;
      wx.navigateTo({ url });
    },
    // 获取用户信息
    onGotUserInfo(e) {
      console.log(e);
      if (e.target.userInfo) {
        console.log('授权成功');
        this.$store.dispatch('UpdateUserInfo', e.target);
      } else {
        console.log('授权失败');
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~styles/mixin.styl'
.font-weight
  font-family PingFangSC-Semibold
.user-info
  position relative
  padding 24px
  overflow hidden
  background #fff
  .user-info-avator
    float left
    width 60px
    height 60px
    border-radius 100px
    margin-right 16px
  .user-info-detail
    float left
    padding-top 10px
    .user-name
      font-size 20px
      color #323232
      line-height 20px
      margin-bottom 9px
      padding 0
      text-align left
    .user-reward
      font-size 13px
      color #8E8E8E
      line-height 18px
      .gold-detail
        margin-right 24px
      .font-weight
        color #000
  .withdraw
    position absolute
    right 0
    top 24px
    width 60px
    height 28px
    line-height 28px
    btn-linear-gradient()
    border-radius 14px 0 0 14px
    font-family PingFangSC-Medium
    font-size 14px
    color #FFFFFF
    text-align center
</style>
