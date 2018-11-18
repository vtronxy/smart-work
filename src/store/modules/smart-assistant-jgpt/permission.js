/** @format */

import {
  asyncRouterMap,
  constantRouterMap
} from '@/router/modules/smart-assistant-jgpt';

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
// function hasPermission(roles, route) {
//   if (route.meta && route.meta.roles) {
//     return roles.some(role => route.meta.roles.includes(role));
//   } else {
//     return true;
//   }
// }

/**
 *
 * @param currentRole // 当前用户具备的
 * @param route  // 待检查的route对象
 */
function hasPermission(currentRole, route) {
  // if (route.meta && route.meta.roles) {
  //   return roles.some(role => route.meta.roles.includes(role));
  // } else {
  //   return true;
  // }
  return currentRole.menuList.includes(route.path);
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRouterMap 所有有待权限认证的路由配置
 * @param currentRole 当前用户 具备的路由表
 */
function filterAsyncRouter(routes, currentRole) {
  const res = [];

  routes.forEach(route => {
    const tmp = { ...route };
    if (hasPermission(currentRole, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRouter(tmp.children, currentRole);
      }
      res.push(tmp);
    }
  });

  return res;
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers;
      state.routers = constantRouterMap.concat(routers);
    }
  },
  actions: {
    GenerateRoutes({ state, commit }, currentRole) {
      return new Promise(resolve => {
        let accessedRouters = filterAsyncRouter(asyncRouterMap, currentRole);
        // 动态的控制左侧菜单的 显示隐藏
        commit('SET_ROUTERS', accessedRouters);
        resolve();
      });
    }
  }
};

export default permission;
