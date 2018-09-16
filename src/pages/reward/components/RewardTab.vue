<template>
  <div>
    <div class="reward-nav">
      <p @click="switchNav('gold')" :class="{active: navName === 'gold'}">
        金币
        <span class="nav-active-border" v-show="navName === 'gold'"></span>
      </p>
      <p @click="switchNav('income')" :class="{active: navName === 'income'}">
        现金
        <span class="nav-active-border" v-show="navName === 'income'"></span>
      </p>
    </div>
    <ul class="reward-list" v-show="navName === 'gold'">
      <li class="reward-item" v-for="(item, index) in goldListFormat" :key="index">
        <div>
          <p class="reward-name">{{item.desc}}</p>
          <p class="reward-time">{{item.createTimeStr}}</p>
        </div>
        <p class="reward-num" :class="{'less': item.plus === 0}" v-text="item.amountStr"></p>
      </li>
    </ul>
    <ul class="reward-list" v-show="navName === 'income'">
      <li class="reward-item" v-for="(item, index) in incomeListFormat" :key="index">
        <div>
          <p class="reward-name">{{item.desc}}</p>
          <p class="reward-time">{{item.createTimeStr}}</p>
        </div>
        <p class="reward-num" :class="{'less': item.plus === 0}" v-text="item.amountStr"></p>
      </li>
    </ul>
  </div>
</template>

<script>
import utils from '@/utils/index';
export default {
  name: 'RewardTab',
  data() {
    return {};
  },
  props: {
    navName: String,
    goldList: Array,
    incomeList: Array
  },
  computed: {
    goldListFormat() {
      return this.goldList.map(value => {
        value.createTimeStr = utils.dateFormat(new Date(value.createTime), 'yyyy-MM-dd hh:mm:ss');
        if (value.plus === 0) {
          value.amountStr = `-${value.amount}金币`;
        } else if (value.plus === 1) {
          value.amountStr = `+${value.amount}金币`;
        }
        return value;
      });
    },
    incomeListFormat() {
      return this.incomeList.map(value => {
        value.createTimeStr = utils.dateFormat(new Date(value.createTime), 'yyyy-MM-dd hh:mm:ss');
        if (value.plus === 0) {
          value.amountStr = `-${value.amount / 100}元`;
        } else if (value.plus === 1) {
          value.amountStr = `+${value.amount / 100}元`;
        }
        return value;
      });
    }
  },
  methods: {
    switchNav(navName) {
      this.$emit('handleSwitchName', navName);
    }
  }
};
</script>

<style lang="stylus" scoped type="text/stylus">
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
    &.active
      color #FF3300
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
    &.less
      color #00d100
  .reward-name
    line-height 22px
  .reward-time
    font-size 14px
    color #999999
    line-height 20px
</style>
