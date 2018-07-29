<template>
  <div class="sign-box">
    <div class="sign-rule">
      <p>签到送金币</p>
      <p class="sign-rule-btn" @click="openSignRule">签到规则</p>
    </div>
    <p class="sign-btn">签到</p>
    <p class="sign-tips">今天签到可领10金币</p>
    <ul class="sign-list">
      <li class="sign-item">
        <div>+10</div>
        <p>第1天</p>
      </li>
      <li class="sign-item">
        <div>+10</div>
        <p>第2天</p>
      </li>
      <li class="sign-item">
        <div class="success">已领</div>
        <p>第3天</p>
      </li>
      <li class="sign-item">
        <div>+10</div>
        <p>第4天</p>
      </li>
      <li class="sign-item">
        <div>+10</div>
        <p>第5天</p>
      </li>
      <li class="sign-item">
        <div>+10</div>
        <p>第6天</p>
      </li>
      <li class="sign-item">
        <div>+10</div>
        <p>第7天</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Sign',
  methods: {
    openSignRule() {
      // 通过vuex弹出弹出框
      const alertModelParams = {
        title: '签到规则',
        content: `<p style="text-align:left">1、连续签到规则：第一天签到 10 金币、第二天签到为 15 金币、以此类推，第七天为 45 金币。</p>
        <br>
        <p style="text-align:left">2、签到7天为一个周期，后续连续不间断为第七天奖励。</p>
        <br>
        <p style="text-align:left">3、若连续签到中断从第一天算起。</p>
        <br>
        <p style="text-align:left">4、签到成功之后分享小程序可以获得 5 金币。</p>`,
        contentType: 'html',
        btn: '我知道了',
        showModel: true,
        cb() {
          console.log('签到弹窗：我知道了');
        }
      };
      this.$store.commit('SET_ALERT', alertModelParams);
    }
  }
};
</script>

<style lang="stylus" scoped>
.sign-box
  padding 24px 12px
  height auto
  border-bottom 1px solid #dfdfdf
  background #fff
  margin-top 10px
  .sign-rule
    display flex
    justify-content space-between
    align-items center
    margin-bottom 23px
    font-family PingFangSC-Medium
    font-size 14px
    color #323232
    .sign-rule-btn
      width 66px
      height 24px
      line-height 24px
      background #FFFFFF
      border 1px solid #E5E5E5
      border-radius 100px
      font-size 11px
      color #323232
      text-align center
  .sign-btn
    width 190px
    height 44px
    line-height 44px
    background-image linear-gradient(-90deg, #FE9763 0%, #FF6464 100%)
    box-shadow 0 2px 4px 0 rgba(255, 86, 69, 0.5)
    border-radius 100px
    font-family PingFangSC-Semibold
    font-size 16px
    color #FFFFFF
    text-align center
    margin 0 auto 12px
  .sign-tips
    font-size 12px
    color #8E8E8E
    letter-spacing 1px
    text-align center
    margin-bottom 23px
  .sign-list
    display flex
    justify-content flex-start
    .sign-item
      width 44px
      margin-right 7.2px
      &:last-child
        margin-right 0
      > div
        width 100%
        height 44px
        background #FFE0D4
        border-radius 50%
        font-size 14px
        color #FF743A
        letter-spacing 0.09px
        text-align center
        line-height 44px
        margin-bottom 6px
        &.success
          background #FF743A
          color #fff
      > p
        font-size 10px
        color #8E8E8E
        letter-spacing 0.06px
        text-align center
</style>
