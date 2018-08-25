import store from '@/store';
// 网络请求
export default function request(config) {
  const header = {
    'Content-Type': 'application/x-www-form-urlencoded'
  };
  if (store.getters.token) {
    header['token'] = store.getters.token;
  }
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.url,
      data: config.data,
      method: config.method,
      header,
      success(res) {
        if (res.statusCode === 200 && res.data.code === 0) {
          resolve(res);
        } else {
          reject(res);
          errorTips();
        }
      },
      fail(error) {
        reject(error);
        errorTips();
      }
    });
  });
}

function errorTips() {
  wx.showToast({
    title: '网络开小差了，请稍后重试',
    icon: 'none',
    duration: 2000
  });
}
