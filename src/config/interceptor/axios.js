/** @format */

import axios from 'axios';
import { getToken } from '@/utils/auth';
import store from '@/store';
import { CONSOLE_REQUEST_ENABLE, CONSOLE_RESPONSE_ENABLE } from '../index';

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

let loadinginstance,
  loadCount = 0,
  loadingNameArray = [];

/**
 * 请求成功拦截器
 * @param req 请求参数
 * @returns {*}
 */
export function requestSuccessFunc(req) {
  //展示模态对话框
  loadCount++;
  let loadingName = `load${loadCount}`;
  window.loadingView.show(loadingName);
  loadingNameArray.push(loadingName);
  req.cancelToken = source.token;
  CONSOLE_REQUEST_ENABLE &&
    console.info('requestInterceptorFunc', `url:${req.url}`, req);
  // 自定义请求拦截逻辑，处理权限，请求发送监控等
  if (store.getters.token) {
    req.headers['X-Token'] = getToken(); // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
  }

  return req;
}

/**
 * 请求失败拦截器
 * @param reqError 失败信息
 * @returns {Promise.<*>}
 */
export function requestFailFunc(reqError) {
  // 关闭模态对话框
  loadCount--;
  if (!loadCount) {
    loadingNameArray.forEach(item => window.loadingView.hide(item));
  }
  // 自定义请求失败逻辑，处理断网，请求发送监控等
  return Promise.reject(reqError);
}

/**
 * 响应成功拦截器
 * @param res 返回数据
 * @returns {*}
 */
export function responseSuccessFunc(response) {
  // 关闭模态对话框
  loadCount--;
  if (!loadCount) {
    loadingNameArray.forEach(item => window.loadingView.hide(item));
  }
  // 自定义响应成功逻辑，全局拦截接口，根据不同业务做不同处理，响应成功监控等
  CONSOLE_RESPONSE_ENABLE && console.info('responseInterceptorFunc', response);
  if (response && response.data.data) {
    return response.data.data;
  } else {
    // 异常处理
    console.log('warning', response.data.msg);
    return Promise.reject(
      'error：' + (response && response.data && response.data.msg)
    );
  }
}

/**
 * 响应失败拦截器
 * @param resError 失败信息
 * @returns {Promise.<*>}
 */
export function responseFailFunc(resError) {
  // 关闭模态对话框
  loadCount--;
  if (!loadCount) {
    loadingNameArray.forEach(item => window.loadingView.hide(item));
  }
  if (resError.toString().indexOf('Network') > -1) {
    resError.message = '网络连接异常';
    source.cancel(resError.message);
    console.log(resError.message);
  }
  // 响应失败，可根据resError信息做监控处理
  return Promise.reject(resError);
}
