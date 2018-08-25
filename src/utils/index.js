// 工具方法
const utils = {
  /**
   * 时间格式化
   * 用法：utils.dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss')
   * @param {string} date - 当前时间
   * @param {string} format - 格式化之后的格式
   */
  dateFormat: function(date, format) {
    if (format === undefined) {
      format = date;
      date = new Date();
    }
    let map = {
      M: date.getMonth() + 1, // 月份
      d: date.getDate(), // 日
      h: date.getHours(), // 小时
      m: date.getMinutes(), // 分
      s: date.getSeconds(), // 秒
      q: Math.floor((date.getMonth() + 3) / 3), // 季度
      S: date.getMilliseconds() // 毫秒
    };
    format = format.replace(/([yMdhmsqS])+/g, function(all, t) {
      let v = map[t];
      if (v !== undefined) {
        if (all.length > 1) {
          v = '0' + v;
          v = v.substr(v.length - 2);
        }
        return v;
      } else if (t === 'y') {
        return (date.getFullYear() + '').substr(4 - all.length);
      }
      return all;
    });
    return format;
  },
  /**
   * 将时间格式化成刚刚，几分钟前形式
   * 用法：utils.timeago(dateTimeStamp)
   * @param {string} dateTimeStamp - 时间戳
   */
  timeago: function(dateTimeStamp) {
    let minute = 1000 * 60; // 把分，时，天，周，半个月，一个月用毫秒表示
    let hour = minute * 60;
    let day = hour * 24;
    let week = day * 7;
    let month = day * 30;
    let now = new Date().getTime(); // 获取当前时间毫秒
    let diffValue = now - dateTimeStamp; // 时间差

    if (diffValue < 0) {
      return;
    }
    let minC = diffValue / minute; // 计算时间差的分，时，天，周，月
    let hourC = diffValue / hour;
    let dayC = diffValue / day;
    let weekC = diffValue / week;
    let monthC = diffValue / month;
    let result;
    if (monthC >= 1 && monthC <= 3) {
      result = ' ' + parseInt(monthC) + '月前';
    } else if (weekC >= 1 && weekC <= 3) {
      result = ' ' + parseInt(weekC) + '周前';
    } else if (dayC >= 1 && dayC <= 6) {
      result = ' ' + parseInt(dayC) + '天前';
    } else if (hourC >= 1 && hourC <= 23) {
      result = ' ' + parseInt(hourC) + '小时前';
    } else if (minC >= 1 && minC <= 59) {
      result = ' ' + parseInt(minC) + '分钟前';
    } else if (diffValue >= 0 && diffValue <= minute) {
      result = '刚刚';
    } else {
      let datetime = new Date();
      datetime.setTime(dateTimeStamp);
      let Nyear = datetime.getFullYear();
      let Nmonth = datetime.getMonth() + 1 < 10 ? '0' + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
      let Ndate = datetime.getDate() < 10 ? '0' + datetime.getDate() : datetime.getDate();
      result = Nyear + '-' + Nmonth + '-' + Ndate;
    }
    return result;
  }
};

export default utils;
