/** @format */

import axios from './axios';
import api from './api';
import eventbus from './eventbus';
import download from './download';
import loadingView from './loadingView';
import renderTip from './toolTip';

export default {
  install: (Vue, options) => {
    // 挂载实例
    Vue.prototype.$ajax = axios;
    Vue.prototype.$api = api;
    Vue.prototype.$bus = eventbus;
    Vue.prototype.$download = download;
    Vue.prototype.$loadingView = loadingView;
    Vue.prototype.$renderTip = renderTip;
  }
};
