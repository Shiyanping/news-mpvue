<template>
  <div class="sign-box">
    <div class="sign-rule">
      <p>签到送金币</p>
      <p class="sign-rule-btn" @click="openSignRule">签到规则</p>
    </div>
    <p class="sign-btn" @click="startSign" v-if="!isSign">签到</p>
    <p class="sign-btn active" v-else>明天可领{{nextDayReward}}金币</p>
    <p class="sign-tips" v-if="!isSign">今天签到可领{{dayReward}}金币</p>
    <p class="sign-tips" v-else-if="signDays == 1 && isSign">已签到1天</p>
    <p class="sign-tips" v-else>已连续签到{{signDays}}天</p>
    <ul class="sign-list">
      <li class="sign-item" v-for="item in rewardList" :key="item.day">
        <div v-if="(signCycleDays == item.day && isSign) || (signCycleDays > item.day)" class="success">已领</div>
        <div v-else>+{{item.reward}}</div>
        <p v-if="(signCycleDays == item.day && isSign) || (signCycleDays > item.day)">已领取</p>
        <p v-else>第{{item.day}}天</p>
      </li>
    </ul>
    <div class="sign-success-model" v-if="showSignModel">
      <div class="sign-content">
        <img src="/static/images/close-model.png" class="close-model" @click="closeSignModel">
        <img src="/static/images/sign-success-icon.png" class="sign-success-icon">
        <p class="sign-success-content">签到成功</p>
        <p class="sign-success-num" v-text="'+'+signGold+'金币'"></p>
        <button open-type="share" class="sign-share-btn" @click="handleSignModelShare">分享再赚5金币</button>
      </div>
    </div>
  </div>
</template>

<script>
import { startSign } from '@/api/sign';
export default {
  name: 'Sign',
  data() {
    return {
      showSignModel: false,
      // 签到获得的金币数
      signGold: 0,
      rewardList: [
        {
          day: 1,
          reward: 18
        },
        {
          day: 2,
          reward: 28
        },
        {
          day: 3,
          reward: 58
        },
        {
          day: 4,
          reward: 158
        },
        {
          day: 5,
          reward: 18
        },
        {
          day: 6,
          reward: 28
        },
        {
          day: 7,
          reward: 368
        }
      ]
    };
  },
  computed: {
    isSign() {
      return this.$store.getters.isSign;
    },
    signDays() {
      return this.$store.getters.signDays;
    },
    token() {
      return this.$store.getters.token;
    },
    signCycleDays() {
      return this.signDays % 7 === 0 ? 7 : this.signDays % 7;
    },
    nextDayReward() {
      return this.signCycleDays >= 7 ? this.rewardList[0].reward : this.rewardList[this.signCycleDays].reward;
    },
    dayReward() {
      return this.rewardList[this.signCycleDays - 1].reward;
    }
  },
  methods: {
    // 签到
    startSign() {
      startSign({
        token: this.token
      })
        .then(res => {
          const data = res.data;
          if (data.code === 0) {
            this.isSign = true;
            this.$store.commit('SET_SIGN', {
              isSign: true,
              signDays: this.signDays++
            });
            this.signGold = data.result.amount;
            this.$store.commit('ADD_GOLD', data.result.amount);
            this.showSignModel = true;
          } else {
            console.log('网络异常');
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    closeSignModel() {
      this.showSignModel = false;
    },
    // 签到弹窗点击分享后加奖励
    handleSignModelShare() {
      this.closeSignModel();
      this.$store.dispatch('AddShareGold');
      console.log('签到弹窗分享按钮出发：加奖励');
    },
    // 打开签到规则弹窗
    openSignRule() {
      // 通过vuex弹出弹出框
      const alertModelParams = {
        title: '签到规则',
        content: `<p style="text-align:left">第一天签到<span class="font-orange">18</span>金币、第二天签到为<span class="font-orange">28</span>金币、以此类推，第七天为<span class="font-orange">368</span>金币。</p>
        <br>
        <p style="text-align:left">2、签到7天为一个周期，后续将重新从第一天算起。</p>
        <br>
        <p style="text-align:left">3、若连续签到中断从第一天算起。</p>
        <br>
        <p style="text-align:left">4、签到成功之后分享小程序可以获得<span class="font-orange">5</span>金币。</p>`,
        contentType: 'html',
        btn: '我知道了',
        showModel: true,
        cb() {
          console.log('签到弹窗：我知道了');
        }
      };
      this.$store.commit('OPEN_ALERT', alertModelParams);
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
    &.active
      background #ffa590
      color rgba(255, 255, 255, 0.7)
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
