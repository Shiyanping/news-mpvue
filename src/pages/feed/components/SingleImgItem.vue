<template>
  <div class="single-img-news news-item">
    <div class="single-img-text">
      <p class="news-title">{{data.title}}</p>
      <p class="news-source">
        <span class="source-title">{{data.uperName}}</span>
        <span>{{timeago}}</span>
      </p>
    </div>
    <img :src="data.thumbArr[0].url" class="news-image">
  </div>
</template>

<script>
import utils from '@/utils/index';
export default {
  name: 'SingleImgItem',
  props: {
    data: Object
  },
  computed: {
    timeago() {
      return utils.timeago(this.data.pubTime);
    }
  },
  methods: {
  }
};
</script>

<style scoped lang="stylus">
@import '~styles/feed.styl'
.single-img-news
  display flex
  justify-content space-between
  height 96px
  .news-title
    width 222px
</style>
