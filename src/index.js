/** @format */

import 'iview/src/styles/index.less';
import '@/styles/theme/iviewTheme.less';
import '@/styles/public.less';

import Vue from 'vue';
import App from './App';

// 导入插件
import plugin from '@/plugins';
import router from '@/router';
import store from '@/store';
import iView from 'iview';

// 导入自定义指令 index.js 会使用Vue.use()来注册指令
import '@/directives';

Vue.config.productionTip = false;

Vue.use(plugin);
Vue.use(iView);

window.app = new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
});
