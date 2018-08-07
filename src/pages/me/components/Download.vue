<template>
  <div class="download-box">
    <button open-type="contact" class="download-btn">
      <img src="/static/images/download.png">
    </button>
  </div>
</template>

<script>
export default {
  name: 'Download'
};
</script>

<style lang="stylus" scoped>
.download-box
  padding 58px 0 32px
  .download-btn
    display block
    width 343px
    height 97px
    margin 0 auto
    padding 0;
    img
      width 100%
      height 100%
</style>
