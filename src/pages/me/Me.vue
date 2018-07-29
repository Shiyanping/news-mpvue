<template>
  <div>
    <user-info></user-info>
    <sign></sign>
    <download></download>
    <alert-model></alert-model>
  </div>
</template>

<script>
// 登录组件
import sign from './components/Sign';
import UserInfo from './components/UserInfo';
import Download from './components/Download';
// 弹出层组件
import AlertModel from '@/components/AlertModel';
export default {
  name: 'Me',
  components: {
    sign,
    UserInfo,
    Download,
    AlertModel
  },
  data() {
    return {};
  },
  methods: {
    handleConfirmCb() {
      this.$store.commit('SET_ALERT', { showModel: false });
    }
  }
};
</script>

<style lang="stylus">
page
  height 100%
  background #f9f9f9
</style>
