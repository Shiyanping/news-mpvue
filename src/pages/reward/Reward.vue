<template>
  <div>
    <reward-sum></reward-sum>
    <reward-tab></reward-tab>
    <div class="withdraw-btn" @click="withdrawTips">立即提现</div>
    <alert-model></alert-model>
  </div>
</template>

<script>
import RewardSum from './components/RewardSum';
import RewardTab from './components/RewardTab';
import AlertModel from '@/components/AlertModel';
export default {
  name: 'Reward',
  components: {
    RewardSum,
    RewardTab,
    AlertModel
  },
  data() {
    return {};
  },
  methods: {
    withdrawTips() {
      // 通过vuex弹出弹出框
      const alertModelParams = {
        title: '提示',
        content: '回复数字“1”，获取提现链接，安装后在“我的”-“兑换提现”页面进行提现。',
        contentType: 'string',
        btn: '知道了',
        showModel: true,
        cb() {
          console.log('提现弹窗：我知道了');
        }
      };
      this.$store.commit('SET_ALERT', alertModelParams);
    }
  }
};
</script>

<style lang="stylus">
.withdraw-btn
  position fixed
  bottom 8px
  left 50%
  height 48px
  width 343px
  transform translateX(-50%)
  background-image linear-gradient(-90deg, #FE9763 0%, #FF6464 100%)
  box-shadow 0 2px 4px 0 rgba(255, 86, 69, 0.5)
  border-radius 100px
  text-align center
  line-height 48px
  color #fff
</style>
