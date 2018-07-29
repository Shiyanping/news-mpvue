<template>
  <div>
    <div class="reward-nav">
      <p @click="switchNav('gold')" :class="{active: navName === 'gold'}">
        金币
        <span class="nav-active-border" v-show="navName === 'gold'"></span>
      </p>
      <p @click="switchNav('money')" :class="{active: navName === 'money'}">
        现金
        <span class="nav-active-border" v-show="navName === 'money'"></span>
      </p>
    </div>
    <ul class="reward-list" v-show="navName === 'gold'">
      <li class="reward-item">
        <div>
          <p class="reward-name">阅读奖励</p>
          <p class="reward-time">2017-07-12 11:33:21</p>
        </div>
        <p class="reward-num">+10金币</p>
      </li>
    </ul>
    <ul class="reward-list" v-show="navName === 'money'">
      <li class="reward-item">
        <div>
          <p class="reward-name">阅读奖励</p>
          <p class="reward-time">2017-07-12 11:33:21</p>
        </div>
        <p class="reward-num">+10元</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'RewardTab',
  data() {
    return {
      // 区分是阅读奖励tab 还是现金奖励tab
      navName: 'gold'
    };
  },
  methods: {
    switchNav(navName) {
      this.navName = navName;
    }
  }
};
</script>

<style lang="stylus" scoped>
.reward-nav
  box-shadow 0 0 4px 0 rgba(0, 0, 0, 0.1)
  height 45px
  display flex
  justify-content space-between
  > p
    flex 1
    text-align center
    line-height 45px
    font-size 16px
    color #8E8E8E
    position relative
    .nav-active-border
      position absolute
      background #FF3300
      width 40px
      height 3px
      bottom 0
      left 50%
      transform translateX(-50%)
.reward-item
  border-bottom 0.5px solid #e5e5e5
  height 60px
  display flex
  justify-content space-between
  align-items center
  padding 8.8px 16px
  box-sizing border-box
  font-size 16px
  .reward-num
    color #FF3300
  .reward-name
    line-height 22px
  .reward-time
    font-size 14px
    color #999999
    line-height 20px
</style>
