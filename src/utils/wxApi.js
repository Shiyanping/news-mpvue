export function getWxCode() {
  return new Promise((resolve, reject) => {
    wx.login({
      success: function(res) {
        if (res.code) {
          resolve(res.code);
        } else {
          reject(res.errMsg);
        }
      }
    });
  });
}
