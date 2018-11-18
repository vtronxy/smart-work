/** @format */

import { loginByUsername, logout, getUserInfo } from '@/api/login';
import { getToken, setToken, removeToken } from '@/utils/auth';

const user = {
  state: {
    user: '',
    status: '',
    code: '',
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: [], // role对象具备该用户下面的menuList
    currentRole: ''
  },

  // mutation默认是全局的
  mutations: {
    SET_CODE: (state, code) => {
      state.code = code;
    },
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction;
    },
    SET_STATUS: (state, status) => {
      state.status = status;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
      state.currentRole = roles[0]; // 默认使用第一个权限 作为默认权限
    },
    SET_CURRENT_ROLE: (state, role) => {
      state.currentRole = role; // 设置当前系统使用角色
    }
  },

  // actions中可以使用 async函数
  // actions使用 大驼峰命名
  actions: {
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      // todo 使用加密传输 userName 与 password
      const username = userInfo.username.trim();
      return new Promise((resolve, reject) => {
        // 登录的用户ajax请求
        loginByUsername(username, userInfo.password)
          .then(response => {
            const data = response.data;
            commit('SET_TOKEN', data.token); // 保存到store中
            setToken(response.data.token);
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    // 获取用户信息 角色及对应的路由表 在路由的钩子中调用
    GetUserInfo({ commit, state, dispatch }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token) // 登录的token查询用户的角色
          .then(response => {
            if (!response.data) {
              // 由于mockjs 不支持自定义状态码只能这样hack
              reject('error');
            }
            const data = response.data;

            if (data.roles && data.roles.length > 0) {
              // 验证返回的roles是否是一个非空数组,并且设置了第一个 权限作为默认权限
              commit('SET_ROLES', data.roles);
            } else {
              reject('getInfo: roles must be a non-null array !');
            }

            commit('SET_NAME', data.name);
            commit('SET_AVATAR', data.avatar);
            commit('SET_INTRODUCTION', data.introduction);
            // add by yanxu6,默认选择第一个权限
            dispatch('GenerateRoutes', data.roles[0]);
            resolve(response); // response就是role
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    // 后端 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token)
          .then(() => {
            commit('SET_TOKEN', '');
            commit('SET_ROLES', []);
            removeToken();
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '');
        removeToken();
        resolve();
      });
    },
    //动态的改变 用户权限 修改左侧的菜单
    ChangeRoles({ commit, dispatch }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role);
        setToken(role);
        getUserInfo(role).then(response => {
          const data = response.data;
          commit('SET_ROLES', data.roles);
          commit('SET_NAME', data.name);
          commit('SET_AVATAR', data.avatar);
          commit('SET_INTRODUCTION', data.introduction);
          dispatch('GenerateRoutes', data); // 动态修改权限后 重绘侧边菜单
          resolve();
        });
      });
    }
  }
};

export default user;
