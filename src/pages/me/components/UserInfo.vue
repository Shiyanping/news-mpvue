<template>
  <div class="user-info">
    <img src="/static/images/avator.png" class="user-info-avator">
    <div class="user-info-detail">
      <p class="user-name font-weight">请登录</p>
      <p class="user-reward">
        <span class="gold-detail">金币
          <span class="font-weight">45</span>
        </span>
        <span>零钱
          <span class="font-weight">4.12</span>
        </span>
      </p>
    </div>
    <p class="withdraw" @click="openRewardPage">提现</p>
  </div>
</template>

<script>
export default {
  name: 'Sign',
  methods: {
    // 打开用户奖励列表
    openRewardPage() {
      var url = '/pages/reward/main?uid=' + 1;
      wx.navigateTo({ url });
    }
  }
};
</script>

<style lang="stylus" scoped>
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
    background-image linear-gradient(-90deg, #FE9763 0%, #FF6464 100%)
    border-radius 14px 0 0 14px
    font-family PingFangSC-Medium
    font-size 14px
    color #FFFFFF
    text-align center
</style>
