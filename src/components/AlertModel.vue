<template>
  <div class="alert-model" v-show="modelParams.showModel">
    <div class="popup">
      <img src="/static/images/close-model.png" class="close-popup" @click="closeModel">
      <p class="popup-title" v-text="modelParams.title"></p>
      <p class="popup-content" v-text="modelParams.content" v-if="modelParams.contentType==='string'"></p>
      <wxParse className="popup-content" :content="modelParams.content" v-else/>
      <button class="popup-btn" @tap="handleConfirm" v-if="modelParams.btnType == ''">{{modelParams.btn}}</button>
      <button class="popup-btn" @tap="handleConfirm" v-else :open-type="modelParams.btnType">{{modelParams.btn}}</button>
    </div>
  </div>
</template>

<script>
import wxParse from 'mpvue-wxparse';
export default {
  name: 'AlertModel',
  components: {
    wxParse
  },
  computed: {
    modelParams() {
      return this.$store.getters.alert;
    }
  },
  methods: {
    // 关闭弹窗操作
    closeModel() {
      this.$store.commit('CLOSE_ALERT');
    },
    // 确认按钮操作
    handleConfirm() {
      this.$store.commit('CLOSE_ALERT');
      // 执行确认按钮的回调函数
      this.modelParams.cb && this.modelParams.cb();
    }
  }
};
</script>

<style lang="stylus" type="text/stylus">
@import '~styles/mixin.styl'
.alert-model
  position fixed
  top 0
  left 0
  right 0
  bottom 0
  background rgba(0, 0, 0, 0.5)
  .popup
    position absolute
    left 50%
    top 50%
    transform translate(-50%, -50%)
    width 252px
    height auto
    background #fff
    padding 24px
    border-radius 8px
    .close-popup
      position absolute
      right 8px
      top 8px
      width 24px
      height 24px
    .popup-title
      font-family PingFangSC-Medium
      font-size 20px
      color #333333
      text-align center
      line-height 24px
    .popup-content
      font-size 16px
      color #666666
      text-align center
      line-height 24px
      margin 8px 0 24px
      .font-orange
        color #FF743A
        display inline-block
    .popup-btn
      width 236px
      height 48px
      text-align center
      line-height 48px
      btn-linear-gradient()
      box-shadow 0 2px 4px 0 rgba(255, 86, 69, 0.5)
      border-radius 100px
      font-family PingFangSC-Medium
      color #fff
</style>
