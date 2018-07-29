<template>
  <div>
    <div v-for="newItem in newsList" :key="newItem.id" @click="openArticleDetail">
      <three-img-item v-if="newItem.thumbMode === 3" :data="newItem"></three-img-item>
      <single-img-item v-else :data="newItem"></single-img-item>
    </div>
  </div>
</template>

<script>
import SingleImgItem from './components/SingleImgItem';
import ThreeImgItem from './components/ThreeImgItem';
export default {
  name: 'Feed',
  components: {
    SingleImgItem,
    ThreeImgItem
  },
  data() {
    return {
      newsList: [
        {
          commentNum: 44,
          figPlan: 99999,
          gallery: false,
          id: 7426482,
          isVideo: 0,
          logDay: '20180724',
          priority: 11,
          pubTime: 1532401015488,
          tags: '溥仪,河南,金碗,老农,文物,鉴定,祖传,生活',
          thumbArr: [
            {
              url: 'http://newsimg1.coohua.com/20180724/upload/39EC53955ED74FD0BF866BB0AE1A8ACF.jpg?x-oss-process=image/resize,w_150/format,jpg'
            },
            {
              url: 'http://newsimg2.coohua.com/20180724/upload/B02077B1879C4D31B14212571E9FFA35.jpg?x-oss-process=image/resize,w_150/format,jpg'
            },
            {
              url: 'http://newsimg3.coohua.com/20180724/upload/0F9351513B5F4EFB9038A5D839CA5455.jpg?x-oss-process=image/resize,w_150/format,jpg'
            }
          ],
          thumbMode: 3,
          title: '河南老乡拿出一个金碗，鉴定后相关人员劝其上交，老乡：我不交！',
          uperName: '风和日丽聊体育'
        },
        {
          commentNum: 0,
          gallery: false,
          id: 7574764,
          isVideo: 0,
          priority: 11,
          pubTime: 1532755433426,
          tags: '加工,胃癌,致癌物质,导致,食物,致癌,肉制品,增加',
          thumbArr: [
            {
              url: 'http://newsimg2.coohua.com/20180728/upload/9AAFED6A46714835811094D7A07A1FC1.jpg?x-oss-process=image/resize,w_150/format,jpg'
            },
            {
              url: 'http://newsimg3.coohua.com/20180728/upload/EA832E664E98434FA79C849674014536.jpg?x-oss-process=image/resize,w_150/format,jpg'
            },
            {
              url: 'http://information.coohua.com/20180728/upload/6B6E8EA19CFA487A8EA97A1D2BCDB291.jpg?x-oss-process=image/resize,w_150/format,jpg'
            }
          ],
          thumbMode: 3,
          title: '在癌症面前、少吃腌的、熏的、腊的肉类',
          uperName: '51养生网'
        },
        {
          commentNum: 0,
          gallery: false,
          id: 7528583,
          isVideo: 0,
          priority: 15,
          pubTime: 1532645760000,
          tags: '',
          thumbArr: [
            {
              url: 'https://image.010lf.com/2018/07/27/29676228616a4ffc64daf4b6c9c32caa_480x-_80.jpeg?x-oss-process=image/resize,w_150/format,jpg'
            },
            {
              url: 'https://image.010lf.com/2018/07/27/5dbe7a08891676d9df05fc6fbff4903f_480x-_80.jpeg?x-oss-process=image/resize,w_150/format,jpg'
            },
            {
              url: 'https://image.010lf.com/2018/07/27/8508c19a081c97f83b0452fe6f7cb4ce_480x-_80.jpeg?x-oss-process=image/resize,w_150/format,jpg'
            }
          ],
          thumbMode: 3,
          title: '上了985、211才知道，读书无用论都是骗人的！',
          uperName: '环京津新闻网',
          url: 'http://m.whzxi.com/share/xwz_article/article_http_zzSg_beiqing.html'
        },
        {
          commentNum: 0,
          gallery: false,
          id: 7571431,
          isVideo: 0,
          priority: 11,
          pubTime: 1532747573629,
          tags: '交规,奇葩,开车,莫斯科,准备好,超速,法国,穿衣服',
          thumbArr: [
            {
              url: 'http://newsimg3.coohua.com/20180728/upload/78883ED592FB4DCA9476476FCAFEE346.jpg?x-oss-process=image/resize,w_150/format,jpg'
            },
            {
              url: 'http://information.coohua.com/20180728/upload/AA991202F1D349DF88AB1808FC3BF9F0.jpg?x-oss-process=image/resize,w_150/format,jpg'
            },
            {
              url: 'http://newsimg1.coohua.com/20180728/upload/07C90E315E95402897A8D30002E3C1BC.jpg?x-oss-process=image/resize,w_150/format,jpg'
            }
          ],
          thumbMode: 3,
          title: '世界上的“奇葩交规”知多少',
          uperName: '光明网'
        },
        {
          commentNum: 0,
          gallery: false,
          id: 7572548,
          isVideo: 0,
          priority: 11,
          pubTime: 1532749917457,
          tags: '离婚,孩子,生活,嫁给,何洁,张柏芝,马蓉,中的',
          thumbArr: [
            {
              url: 'http://information.coohua.com/20180728/upload/CCFBA261333D4B458C70D7BDEDE82CB5.jpg?x-oss-process=image/resize,w_150/format,jpg'
            },
            {
              url: 'http://newsimg1.coohua.com/20180728/upload/44548A7C0C484B49913070CA4CB5396D.jpg?x-oss-process=image/resize,w_150/format,jpg'
            },
            {
              url: 'http://newsimg2.coohua.com/20180728/upload/23EBDE03EDCC42DDAB0A83F017132A77.jpg?x-oss-process=image/resize,w_150/format,jpg'
            }
          ],
          thumbMode: 3,
          title: '离过婚的女星你敢娶吗？网友：最后一位给我一亿都不要！',
          uperName: '娱小圈工作室'
        },
        {
          commentNum: 0,
          figPlan: 99999,
          gallery: false,
          id: 7575795,
          isVideo: 0,
          logDay: '20180728',
          priority: 15,
          pubTime: 1532756220000,
          tags: '',
          thumbArr: [
            {
              url: 'https://image.010lf.com/2018/07/28/560561e32c274dae6031a0076e176acc_480x-_80.png?x-oss-process=image/resize,w_150/format,jpg'
            },
            {
              url: 'https://image.010lf.com/2018/07/28/c943ea79c54190a8ef0c63a0948ee04d_480x-_80.png?x-oss-process=image/resize,w_150/format,jpg'
            },
            {
              url: 'https://image.010lf.com/2018/07/28/3f4f8ce7698fb9ed74374c4ec9b90150_480x-_80.png?x-oss-process=image/resize,w_150/format,jpg'
            }
          ],
          thumbMode: 3,
          title: '女子在外打工，半夜和三岁儿子视频，母亲的电话，让她哭红了眼！',
          uperName: '环京津新闻网',
          url: 'http://m.whzxi.com/share/xwz_article/article_http_zzSg_beiqing.html'
        },
        {
          commentNum: 0,
          gallery: false,
          id: 7572752,
          isVideo: 0,
          priority: 15,
          pubTime: 1532747760000,
          tags: '菜谱,大全,做法,大图,步骤,烹饪,技巧,美食,视频,教学,好吃,健康,家常菜,减肥,增肌,开胃,养生,食谱,教程,做菜',
          thumbArr: [
            {
              url: 'https://cdn.haochu.com//d/file/20121205/b6cca08f436207049ee7d5d328b342db.jpg?p=small?x-oss-process=image/resize,w_150/format,jpg'
            }
          ],
          thumbMode: 1,
          title: '好厨美食季：别怪我没提醒你啊，做蚝油翡脆包菜卷，其实不是一件简单的事情',
          uperName: '好厨网',
          url: 'https://m.haochu.com/api/kuhuataodetail?id=11909'
        },
        {
          commentNum: 0,
          gallery: false,
          id: 7574706,
          isVideo: 0,
          priority: 11,
          pubTime: 1532755272847,
          tags: '段子,搞笑,农夫,手机,哥们,妹子,白菜,商人',
          thumbArr: [
            {
              url: 'http://newsimg2.coohua.com/20180728/upload/4AB537C3E0604E8D9B103C6DD1DC92A7.jpg?x-oss-process=image/resize,w_150/format,jpg'
            },
            {
              url: 'http://newsimg3.coohua.com/20180728/upload/906990797C6547C0BABBC022E9C4E4D7.jpg?x-oss-process=image/resize,w_150/format,jpg'
            },
            {
              url: 'http://information.coohua.com/20180728/upload/CE663C13381A486198F9C14A053F4BDA.jpg?x-oss-process=image/resize,w_150/format,jpg'
            }
          ],
          thumbMode: 3,
          title: '搞笑图片幽默段子笑话：这只烤鸡还真悠闲，不知道味道如何？',
          uperName: '情感故事杂货铺'
        },
        {
          commentNum: 0,
          gallery: false,
          id: 7573323,
          isVideo: 0,
          priority: 11,
          pubTime: 1532751376644,
          tags: '婆婆,孩子,知道,说话,在家,儿子,红包,小姑子',
          thumbArr: [
            {
              url: 'http://newsimg1.coohua.com/20180728/upload/AFA8932B0CF546EAB7ED60ED80E99156.jpg?x-oss-process=image/resize,w_150/format,jpg'
            },
            {
              url: 'http://newsimg2.coohua.com/20180728/upload/9FFA6D408B7A46C585B31CBE275CA5C2.jpg?x-oss-process=image/resize,w_150/format,jpg'
            },
            {
              url: 'http://newsimg3.coohua.com/20180728/upload/1EA04DF19B7D4159B8CF84E7D098A1C6.jpg?x-oss-process=image/resize,w_150/format,jpg'
            }
          ],
          thumbMode: 3,
          title: '小姑子结婚，婆婆却要俺给10万元红包，俺说一段话后她不说话了',
          uperName: '陈姐说心事'
        },
        {
          commentNum: 38,
          figPlan: 0,
          gallery: false,
          id: 7395675,
          isVideo: 0,
          logDay: '20180723',
          priority: 10,
          pubTime: 1532315807142,
          tags: '故事，青楼，皇妃',
          thumbArr: [
            {
              url: 'http://newsimg3.coohua.com/20180723/upload/38A0DB87766547C2BECB6A85B95D7E39.jpg?x-oss-process=image/resize,w_150/format,jpg'
            },
            {
              url: 'http://information.coohua.com/20180723/B85FBD2CF10D4D51882EC3BC50F1FDCB?x-oss-process=image/resize,w_150/format,jpg'
            }
          ],
          thumbMode: 1,
          title: '青楼里的皇妃',
          uperName: '故事大全'
        },
        {
          commentNum: 0,
          gallery: false,
          id: 7267127,
          isVideo: 0,
          priority: 11,
          pubTime: 1531935728957,
          tags: '女子,路人,留言,意见,网友,文字,选择,衣服',
          thumbArr: [
            {
              url: 'http://information.coohua.com/20180719/upload/27007DDC761240F4872B2816FCF1E6EC.jpg?x-oss-process=image/resize,w_150/format,jpg'
            },
            {
              url: 'http://newsimg1.coohua.com/20180719/upload/FE1573E3664A4089B12D16AF736A8741.jpg?x-oss-process=image/resize,w_150/format,jpg'
            },
            {
              url: 'http://newsimg2.coohua.com/20180719/upload/C6258AB61A96497C87D2E2DF300522B0.jpg?x-oss-process=image/resize,w_150/format,jpg'
            }
          ],
          thumbMode: 3,
          title: '街头出一只“狐狸”，引发众人热议，随后却让大家都沉默了',
          uperName: '辣影大片'
        }
      ]
    };
  },
  methods: {
    openArticleDetail() {
      var url = '/pages/newsDetail/main?id=' + 1;
      wx.navigateTo({ url });
    }
  }
};
</script>

<style lang="stylus">
</style>
