<template>
  <div>
    <div class="task-box" v-for="(item, $index) in taskList" :key="$index">
      <p class="task-box-title">
        <span class="orange-icon"></span>
        <span v-text="item.taskTile" class="task-box-title-text"></span>
      </p>
      <ul class="task-list">
        <li class="border-bottom" v-for="taskItem in item.list" :key="taskItem.id" @click="openTaskDetail(taskItem)">
          <div class="task-top-detail">
            <div class="task-detail">
              <p class="task-title">
                <span v-text="taskItem.title"></span>
                <span>详情
                  <img src="/static/images/detail-arraw-open.png" alt="" v-if="taskItem.isExpand">
                  <img src="/static/images/detail-arraw.png" alt="" v-else>
                </span>
              </p>
              <p class="task-reward" :class="{red: taskItem.h5IconSmall == 1}">
                <img src="/static/images/red-package.png" alt="" v-if="taskItem.h5IconSmall == 1">
                <img src="/static/images/gold.png" alt="" v-else>
                <span v-text="taskItem.h5Hint"></span>
              </p>
            </div>
            <button v-if="item.taskType == 'new'" class="task-btn" open-type="contact" @click="createClipboard">{{taskItem.h5ActionText}}</button>
            <div v-else class="task-btn" v-text="taskItem.h5ActionText" @click.stop="openDownloadTips"></div>
          </div>
          <div class="task-open-detail" v-text="taskItem.desc" v-if="taskItem.isExpand"></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Download',
  data() {
    return {
      taskList: [
        {
          taskTile: '新手任务',
          taskType: 'new',
          list: [
            {
              taskId: 1,
              title: '登录官方APP淘新闻',
              h5Hint: '+1~100元',
              desc: '下载安装淘新闻APP，手机号注册后绑定微信即可获得最高100元现金奖励，100%中奖，APP支持1元提现。',
              h5ActionText: '回复1去登录',
              h5Jump: '',
              h5IconSmall: 1,
              isExpand: false
            }
          ]
        },
        {
          taskTile: '日常任务',
          taskType: 'daily',
          list: [
            {
              taskId: 1,
              title: '阅读任意新闻',
              h5Hint: '+10金币/次',
              desc: '点击任意新闻，完整阅读新闻及评论即可获得奖励，每天有50次奖励哦。',
              h5ActionText: '去看新闻',
              h5IconSmall: 0,
              isExpand: false
            },
            {
              taskId: 2,
              title: '邀请收徒',
              h5Hint: '+6元',
              desc: '邀请好友下载淘新闻APP，好友连续使用8天，您将获得6元奖励。',
              h5ActionText: '去收徒',
              h5IconSmall: 1,
              isExpand: false
            },
            {
              taskId: 3,
              title: '看视频领金币',
              h5Hint: '+20金币/次',
              desc: '观看完视频即可获得奖励，每天可领取5次奖励。',
              h5ActionText: '去看视频',
              h5IconSmall: 0,
              isExpand: false
            }
          ]
        }
      ]
    };
  },
  methods: {
    // 展开任务详情
    openTaskDetail(item) {
      item.isExpand = !item.isExpand;
    },
    openDownloadTips() {
      // 通过vuex弹出弹出框
      const alertModelParams = {
        title: '小程序暂不支持日常任务',
        content: `请前往淘新闻APP做任务`,
        contentType: 'string',
        btn: '回复1获取下载链接',
        showModel: true,
        btnType: 'contact'
      };
      this.$store.commit('OPEN_ALERT', alertModelParams);
      this.createClipboard();
    },
    createClipboard() {
      wx.setClipboardData({
        data: '6666691',
        success: function (res) {
          wx.hideToast(); // 关键代码，剪贴成功立马给我隐藏提示
        }
      });
    }
  }
};
</script>

<style lang="stylus" scoped type="text/stylus">
@import '~styles/mixin.styl'
.task-box
  overflow hidden
  padding 0 16px
  width 100%
  box-sizing border-box
  margin-top 10px
  background #fff
.task-box-title
  width 100%
  display flex
  align-items center
  height 25px
  font-size 18px
  color #323232
  margin-top 16px
  .orange-icon
    width 3px
    height 16px
    background-image -webkit-linear-gradient(right, #fe9763 0%, #ff6464 100%)
    background-image linear-gradient(-90deg, #fe9763 0%, #ff6464 100%)
    border-radius 100px
    margin-right 8px
  .task-box-title-text
    -webkit-box-flex 1
    -webkit-flex 1
    -ms-flex 1
    flex 1
    font-weight 900
.task-top-detail
  height 80px
  display flex
  align-items center
.task-detail
  -webkit-box-flex 1
  -webkit-flex 1
  -ms-flex 1
  flex 1
.task-title, .task-reward
  display flex
  align-items center
.task-title
  margin-bottom 5px
  height 24px
  > span:nth-of-type(1)
    font-weight 900
    font-size 16px
    color #333333
  > span:nth-of-type(2)
    display flex
    align-items center
    font-weight 900
    font-size 12px
    color #8e8e8e
    margin-left 8px
    > img
      width 6px
      height 4px
      margin-left 3px
.task-reward
  font-size 12px
  color #ff9d00
  height 17px
  &.red
    color #ff5645
    > img
      width 14px
      height 17px
  > img
    width 16px
    height 16px
    margin-right 4px
.task-btn
  hor-ver-center-flex()
  height 30px
  border 1px solid #ff5645
  border-radius 100px
  font-size 14px
  color #ff6a63
  padding 0 16px
.task-open-detail
  display block
  width 100%
  overflow hidden
  font-size 12px
  color #8e8e8e
  line-height 18px
  padding-bottom 15px
</style>
