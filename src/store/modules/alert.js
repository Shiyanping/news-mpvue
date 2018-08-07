const alert = {
  state: {
    params: {
      // 弹框title
      title: '',
      // 弹框内容，如果是要渲染 html 需要将 contentType 改为 html，字符串 contentType 为 string
      content: '',
      // 弹框内容的形式
      contentType: 'string',
      // 弹窗按钮的文案
      btn: '',
      // 弹窗按钮的类型 contact：客服，默认为空
      btnType: '',
      // 是否展示弹窗
      showModel: false,
      // 弹窗按钮的回调函数
      cb: null
    },
    resetParams: {
      // 弹框title
      title: '',
      // 弹框内容，如果是要渲染 html 需要将 contentType 改为 html，字符串 contentType 为 string
      content: '',
      // 弹框内容的形式
      contentType: 'string',
      // 弹窗按钮的文案
      btn: '',
      // 弹窗按钮的类型 contact：客服，默认为空
      btnType: '',
      // 是否展示弹窗
      showModel: false,
      // 弹窗按钮的回调函数
      cb: null
    }
  },

  mutations: {
    OPEN_ALERT: (state, obj) => {
      Object.assign(state.params, state.resetParams, obj);
    },
    CLOSE_ALERT: state => {
      state.params.showModel = false;
    }
  }
};

export default alert;
