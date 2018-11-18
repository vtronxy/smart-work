/** @format */

// axios 默认配置
export const AXIOS_DEFAULT_CONFIG = {
  timeout: 20000,
  maxContentLength: 20000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  baseURL: 'http://aaa'
};

// 开启请求参数打印
export const CONSOLE_REQUEST_ENABLE = true;
// 开启响应参数打印
export const CONSOLE_RESPONSE_ENABLE = true;

// Router 默认配置
export const ROUTER_DEFAULT_CONFIG = {
  mode: 'history',
  base: '/'
};

// API 默认配置
export const API_DEFAULT_CONFIG = {
  mockBaseURL: 'http://yapi.demo.qunar.com/mock/12982/flytest/v1', // mock地址
  mock: false, // 是否开启mock
  debug: false, // 是否开启debug模式
  sep: '/' // 接口调用分隔符
};

// vuex 默认配置
export const VUEX_DEFAULT_CONFIG = {
  strict: process.env.NODE_ENV !== 'production'
};
