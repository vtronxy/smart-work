/** @format */

import router from '@/router';
import store from '@/store';
import { getToken } from '@/utils/auth'; // getToken from cookie
import iView from 'iview';

//设置加载条的高度
iView.LoadingBar.config({
  height: 3
});

const whiteList = ['/login']; // no redirect whitelist
export function routerBeforeEachFunc(to, from, next) {
  iView.LoadingBar.start();
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  if (getToken()) {
    // determine if there has token是否登录
    /* has token*/
    if (to.path === '/login') {
      next({ path: '/' });
      iView.LoadingBar.finish(); //hack 技巧 if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      if (store.getters.roles.length === 0) {
        // 判断当前用户是否已拉取完user_info信息
        store
          .dispatch('GetUserInfo')
          .then(res => {
            // 拉取user_info
            const roles = res.data.roles; // note: roles must be a array! such as: ['editor','develop']

            store.dispatch('GenerateRoutes', { roles }).then(() => {
              // 根据roles权限生成可访问的路由表
              router.addRoutes(store.getters.addRouters); // 动态添加可访问路由表
              next({ ...to, replace: true }); // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
            });
          })
          .catch(err => {
            store.dispatch('FedLogOut').then(() => {
              iView.Message.error(
                err || 'Verification failed, please login again'
              );
              next({ path: '/' });
            });
          });
      } else {
        // 没有
        next();
      }
    }
  } else {
    /* has no token*/
    // 白名单里面初始化
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next();
    } else {
      next(`/login?redirect=${to.path}`); // 否则全部重定向到登录页
      iView.LoadingBar.finish(); // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
}

export function routerAfterEachFunc(to, from) {
  iView.LoadingBar.finish();
}
