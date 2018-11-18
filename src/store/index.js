/** @format */

import Vue from 'vue';
import Vuex from 'vuex';
import jgptUser from './modules/smart-assistant-jgpt/user';
import jgptPermission from './modules/smart-assistant-jgpt/permission';
import getters from './getters';

import { VUEX_DEFAULT_CONFIG } from '@/config';

Vue.use(Vuex);
// 加入Module state默认就局部化了
// getters actions 默认是全局的 namespace:true
export default new Vuex.Store({
  ...VUEX_DEFAULT_CONFIG,
  modules: {
    jgptUser,
    jgptPermission
  },
  getters
});
