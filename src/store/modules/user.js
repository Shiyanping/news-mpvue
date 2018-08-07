import { getRegisterInfo, getCreditPage, getMiniProgramInfo, updateMiniProgramInfo } from '@/api/user';
import { getSignStatus, getShareGold } from '@/api/sign';

const user = {
  state: {
    token: '',
    userId: null,
    systemInfo: {},
    os: 'android',
    userInfo: {},
    // 是否签到
    isSign: false,
    // 连续签到了多少天
    signDays: 1,
    // 用户金币
    gold: 0,
    // 用户余额
    balance: 0
  },

  mutations: {
    // 设置token
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    // 设置用户id
    SET_USERID: (state, userId) => {
      state.userId = userId;
    },
    // 添加用户设备信息
    SET_SYSTEMINFO: (state, systemInfo) => {
      state.systemInfo = systemInfo;
      state.os = systemInfo.system.indexOf('iOS') !== -1 ? 'ios' : 'android';
    },
    // 设置签到状态
    SET_SIGN: (state, info) => {
      state.isSign = info.isSign;
      state.signDays = info.signDays;
    },
    // 加金币
    ADD_GOLD: (state, num) => {
      state.gold += num;
    },
    // 加积分
    ADD_BALANCE: (state, balance) => {
      state.balance += balance;
    },
    // 添加用户信息
    SET_USERINFO: (state, info) => {
      state.userInfo = info;
    }
  },

  actions: {
    // 将注册的信息进行存储
    GetRegisterInfo({ commit, state }, code) {
      return new Promise((resolve, reject) => {
        getRegisterInfo({
          code,
          anMobileBrand: state.systemInfo.brand,
          anMobileRom: state.systemInfo.model,
          os: state.os
        })
          .then(res => {
            const data = res.data;
            commit('SET_USERID', data.result.userId);
            commit('SET_TOKEN', data.result.token);
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    // 获取签到状态
    GetSignInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getSignStatus({})
          .then(res => {
            const data = res.data;
            if (data.code === 0) {
              commit('SET_SIGN', data.result);
              resolve(data.code);
            } else {
              reject(data.result.message);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    // 获取用户金币余额及红包状态
    GetCreditPage({ commit }) {
      return new Promise((resolve, reject) => {
        getCreditPage({}).then(res => {
          const data = res.data;
          if (data.code === 0) {
            commit('ADD_GOLD', data.result.todayGold);
            commit('ADD_BALANCE', data.result.balance);
            resolve(data.result);
          } else {
            reject(data.result.message);
          }
        });
      });
    },
    // 用户分享加金币
    AddShareGold({ commit }) {
      return new Promise((resolve, reject) => {
        getShareGold({}).then(res => {
          const data = res.data;
          if (data.code === 0) {
            console.log(data);
            commit('ADD_GOLD', data.result);
            resolve();
          } else {
            reject(data.result.message);
          }
        });
      });
    },
    // 获取用户头像信息
    GetUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getMiniProgramInfo({}).then(res => {
          const data = res.data;
          if (data.code === 0) {
            commit('SET_USERINFO', data.result);
            resolve();
          } else {
            reject(data.result.message);
          }
        });
      });
    },
    // 更新用户头像信息
    UpdateUserInfo({ commit }, info) {
      commit('SET_USERINFO', info);
      return new Promise((resolve, reject) => {
        updateMiniProgramInfo({
          nickName: info.nickName,
          avatarUrl: info.avatarUrl
        }).then(res => {
          const data = res.data;
          if (data.code === 0) {
            console.log(data);
            resolve();
          } else {
            reject(data.result.message);
          }
        });
      });
    }
  }
};

export default user;
