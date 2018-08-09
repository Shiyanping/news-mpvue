export function getWxCode() {
  return new Promise((resolve, reject) => {
    wx.login({
      success(res) {
        console.log('成功：' + res);
        if (res.code) {
          resolve(res.code);
        } else {
          reject(res.errMsg);
        }
      },
      fail(error) {
        console.log('失败：' + error);
      }
    });
  });
}
