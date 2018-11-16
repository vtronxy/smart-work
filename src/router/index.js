/** @format */

import Vue from 'vue';
import Router from 'vue-router';

import { constantRouterMap } from './modules/smart-assistant-jgpt';
import { ROUTER_DEFAULT_CONFIG } from '@/config';
import {
  routerBeforeEachFunc,
  routerAfterEachFunc
} from '@/config/interceptor/router';

Vue.use(Router);

let routerInstance = new Router({
  ...ROUTER_DEFAULT_CONFIG,
  routes: constantRouterMap
});

// 注入拦截器
routerInstance.beforeEach(routerBeforeEachFunc);
routerInstance.afterEach(routerAfterEachFunc);

export default routerInstance;
