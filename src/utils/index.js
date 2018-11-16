/** @format */

HTMLElement.prototype.getOffset = function(stopSelectorElement) {
  let offsetParent = this.offsetParent;
  let top = this.offsetTop,
    left = this.offsetLeft;
  while (offsetParent) {
    top += offsetParent.offsetTop;
    left += offsetParent.offsetLeft;
    offsetParent = offsetParent.offsetParent;
    if (stopSelectorElement && offsetParent === stopSelectorElement) {
      break;
    }
  }
  return {
    top: top,
    left: left,
    width: this.offsetWidth,
    height: this.offsetHeight
  };
};
//日期对象扩展
Date.prototype.format = function(format) {
  let o = {
    'M+': this.getMonth() + 1, //month
    'd+': this.getDate(), //day
    'h+': this.getHours(), //hour
    'm+': this.getMinutes(), //minute
    's+': this.getSeconds(), //second
    'q+': Math.floor((this.getMonth() + 3) / 3), //quarter
    S: this.getMilliseconds() //millisecond
  };
  if (/(y+)/.test(format)) {
    format = format.replace(
      RegExp.$1,
      (this.getFullYear() + '').substr(4 - RegExp.$1.length)
    );
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      );
    }
  }
  return format;
};
