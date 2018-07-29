<template>
  <div class="three-img-news news-item">
    <p class="news-title">{{data.title}}</p>
    <div class="three-img-list">
      <img v-for="(imgItem, index) in data.thumbArr" :key="index" :src="imgItem.url" alt="" class="news-image" :class="{'three-center-img': index == 1}">
    </div>
    <p class="news-source">
      <span class="source-title">{{data.uperName}}</span>
      <span>{{timeago}}</span>
    </p>
  </div>
</template>

<script>
import utils from '@/utils/index';
export default {
  name: 'ThreeImgItem',
  props: {
    data: Object
  },
  computed: {
    timeago() {
      return utils.timeago(this.data.pubTime);
    }
  }
};
</script>

<style scoped lang="stylus">
@import '~styles/feed.styl'
.three-img-news
  height auto
  overflow hidden
  .news-title
    height auto
  .three-img-list
    margin-bottom 6px
    .three-center-img
      margin 0 3px
</style>
