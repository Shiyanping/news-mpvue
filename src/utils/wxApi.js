// wx.login 获取 code
export function getWxCode() {
  return new Promise((resolve, reject) => {
    wx.login({
      success(res) {
        if (res.code) {
          resolve(res.code);
        } else {
          reject(res.errMsg);
        }
      },
      fail(error) {
        console.log(error);
      }
    });
  });
}
