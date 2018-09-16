<template>
  <div class="reward-sum">
    <div class="reward-box">
      <div>
        <p class="reward-title">金币余额</p>
        <p class="reward-num">{{gold}} <img src="/static/images/gold-icon.png" alt=""></p>
      </div>
      <div>
        <p class="reward-title">现金余额</p>
        <p class="reward-num">{{balance}}
          <span>元</span>
        </p>
      </div>
    </div>
    <p class="reward-tips">金币每天凌晨会自动兑换成现金，当前汇率20金币=0.01元</p>
  </div>
</template>

<script>
export default {
  name: 'RewardSum',
  computed: {
    gold() {
      return this.$store.getters.gold;
    },
    balance() {
      return this.$store.getters.balance / 100;
    }
  }
};
</script>

<style lang="stylus" scoped type="text/stylus">
@import '~styles/mixin.styl'
.reward-sum
  padding 16px 16px 12px
  box-sizing border-box
  background #f9f9f9
  .reward-box
    display flex
    width 343px
    height 96px
    background #FFFFFF
    box-shadow 0 0 6px 0 rgba(0, 0, 0, 0.06)
    border-radius 8px
    margin 0 auto
    background #fff
    padding 24px 0 16px
    box-sizing border-box
    > div
      flex 1
      hor-ver-center-flex()
      flex-direction column
      &:first-child
        border-right 1px solid #E8E8E8
      .reward-title, .reward-num
        hor-ver-center-flex()
        width 100%
      .reward-title
        font-size 14px
        color #666666
        margin-bottom 8px
      .reward-num
        font-family PingFangSC-Semibold
        font-size 24px
        color #333333
        > img
          width 17px
          height 17px
          margin-left 4px
        > span
          font-size 16px
          position relative
          top 1px
  .reward-tips
    text-align center
    font-size 12px
    color #8E8E8E
    margin-top 12px
</style>
