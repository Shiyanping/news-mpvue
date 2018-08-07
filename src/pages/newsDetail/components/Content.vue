<template>
  <div class="article-content">
    <p class="article-title" v-if="articleContent.title">{{articleContent.title}}</p>
    <p class="article-uperName" v-if="articleContent.uperName">{{articleContent.uperName}}</p>
    <p class="article-updateTime" v-if="articleContent.uperUpdateTime">{{uperUpdateTimeFormat}}</p>
    <wxParse :content="articleContent.content" @preview="preview" v-if="articleContent.content" :imageProp="imageProp" />
  </div>
</template>

<script>
import utils from '@/utils/index';
import wxParse from 'mpvue-wxparse';
export default {
  name: 'NewsDetail',
  props: {
    articleContent: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      imageProp: {
        lazyLoad: true
      }
    };
  },
  components: {
    wxParse
  },
  computed: {
    uperUpdateTimeFormat() {
      return utils.dateFormat(new Date(this.articleContent.uperUpdateTime), 'yyyy-MM-dd hh:mm');
    }
  },
  methods: {
    preview(src, e) {
      // do something
      console.log(src + ',' + e);
    }
  }
};
</script>

<style lang="stylus" scoped>
.article-content
  padding 24px 16px
  box-sizing border-box
  line-height 25px
  border-top 1px solid #dfdfdf
  .article-title
    font-family PingFangSC-Semibold
    font-size 25px
    line-height 38px
    margin-bottom 12px
  .article-uperName
    font-family PingFangSC-Semibold
    font-size 14px
    color #FF743A
  .article-updateTime
    font-size 14px
    color #8E8E8E
    margin-bottom 12px
</style>
