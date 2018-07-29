const alert = {
  state: {
    params: {
      title: '',
      content: '',
      contentType: 'string',
      btn: '',
      showModel: false
    }
  },

  mutations: {
    SET_ALERT: (state, obj) => {
      Object.assign(state.params, obj);
    },
    CLOSE_ALERT: (state) => {
      state.params.showModel = false;
    }
  },

  actions: {
    // 用户名登录
    // LoginByUsername({ commit }, userInfo) {
    //   const username = userInfo.username.trim();
    //   return new Promise((resolve, reject) => {
    //     loginByUsername(username, userInfo.password)
    //       .then(response => {
    //         const data = response.data;
    //         commit('SET_TOKEN', data.token);
    //         setToken(response.data.token);
    //         resolve();
    //       })
    //       .catch(error => {
    //         reject(error);
    //       });
    //   });
    // }
  }
};

export default alert;
