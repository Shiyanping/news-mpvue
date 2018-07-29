<template>
  <div>
    <news-detail v-if="articleContent" :articleContent="articleContent"></news-detail>
    <div class="fixed-footer">
      <p class="go-home" @click="goHome">返回首页</p>
      <p class="share-wechat">
        <img src="/static/images/wechat-icon.png" alt=""> 分享给朋友
      </p>
    </div>
  </div>
</template>

<script>
import newsDetail from './components/Content';
export default {
  name: 'News',
  components: {
    newsDetail
  },
  data() {
    return {
      articleContent: {
        id: 6436402,
        title: '大叔连续一年只吃土豆，瘦掉100斤变身男神！',
        uperName: '奇闻007',
        uperUpdateTime: 1528880622000,
        uperId: null,
        typeId: 2,
        tags: '奇闻,土豆,瘦身',
        content:
          '<p>　　对于想减肥的人来说，最快也最安全的方法就是适当地调整饮食与运动。双管齐下只要能坚持的话，肯定能收到相当显著的效果。但是世界上也有一些能躺着决不坐着，能坐着决不站着的懒人一族，他们如果想减肥又不想运动的话，不妨借鉴下这名澳洲男子的做法。</p> \n<div> \n <img src="http://newsimg1.coohua.com/20180613/upload/023368EB88494EF98EFDE27E7C0EE0A2.jpg?x-oss-process=image/resize,w_550/format,jpg"> \n</div> \n<p>　　AndrewTaylor，一位土生土长的澳大利亚胖大叔，他说自己印象当中从小到大就没有太瘦过，而且由于生性爱静不爱动，再加上平时摄入过多热量的饮食，使得身体发福越来越厉害，以至于威胁到了自己的健康。</p> \n<div> \n <img src="http://newsimg2.coohua.com/20180613/upload/608F8F185DBE4F0CA45E938C515FD41C.jpg?x-oss-process=image/resize,w_550/format,jpg"> \n</div> \n<p>　　而医生警告他这种现状不能再继续维持下去，否则心脏与血管将产生非常大的病变可能，听后他决定独创一种特殊的单种食物摄入减肥法。而这种理论来源于科学家们认为常期只摄入一种食物会大量消耗身体脂肪。</p> \n<div> \n <img src="http://newsimg3.coohua.com/20180613/upload/4C6387D42A9F49D49A30ED630BA9DFAB.jpg?x-oss-process=image/resize,w_550/format,jpg"> \n</div> \n<p>　　所以在长达一年时间之内，他每天每顿都只以土豆加入少量红薯调味做为主食，既能满足身体对于热量的需求，这种食物又富含淀粉可以使他不感到饥饿，就凭着这道减肥食品他成功地减掉了110磅（约50公斤）的体重。而且为了达到最佳的效果，他无论如何处理这些食材，但都抱着决有添加半点油类与肉类的宗旨，全部都只用清水煮来吃，虽然在常人眼中也许吃上一天就感到乏味扔掉餐盘跑步去了，但是AndrewTaylor却可以坚持下来</p> \n<div> \n <img src="http://information.coohua.com/20180613/upload/6DA2E49750F54CE88AF80FBE0F96098F.jpg?x-oss-process=image/resize,w_550/format,jpg"> \n</div> \n<p>　　结果看来，他减掉体重之后皮肤有些松驰显得不太健康，但是非常神奇的是：他用这种方法不但不用刻意节食，而且完全不用运动就瘦身成功，而且身体各项机能经过检查均处于正常范围之内，简直让人觉得不可思议，看来科学家们的理论还是有实践基础的。但是健康学家们也指出，长期只食用一种食物会造成营养不良，减肥的同时最好还是要注意饮食均衡才是对自己最大的负责。</p> \n<div> \n <img src="http://newsimg1.coohua.com/20180613/upload/8017B3B4D5BA43E6991037AE69BF5483.jpg?x-oss-process=image/resize,w_550/format,jpg"> \n</div> \n<p>　　<b></b><i></i> <br></p>\n<p style="font-size:12px;color:#999">文章图片均来自网络，如有问题，请联系淘新闻删除</p>',
        figPlan: 0,
        logDay: '20180613'
      }
    };
  },
  methods: {
    goHome() {
      var url = '/pages/feed/main';
      console.log(url);
      wx.switchTab({ url });
    }
  }
};
</script>

<style lang="stylus">
.fixed-footer
  position fixed
  bottom 0
  left 0
  right 0
  display flex
  justify-content space-between
  height 48px
  > p
    display flex
    justify-content center
    align-items center
    height 100%
  .go-home
    width 128px
    text-align center
    background #fff
    color #323232
    box-shadow inset 0 0 0 0 #E5E5E5
  .share-wechat
    width 247px
    background-image linear-gradient(-90deg, #FE9763 0%, #FF6464 100%)
    box-shadow 0 2px 4px 0 rgba(255, 86, 69, 0.5)
    color #fff
    img
      width 24px
      height 20px
      margin-right 8px
</style>
