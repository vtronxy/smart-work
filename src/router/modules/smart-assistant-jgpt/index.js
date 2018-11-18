/** @format */
import Layout from '@/views/smart-assistant-jgpt/layout';
import DefaultPage from '@/views/smart-assistant-jgpt/default';
// 这个三个模块 不需要验证用户的权限
export const constantRouterMap = [
  {
    path: '',
    name: 'dashboard',
    meta: { title: '面板', by: 'yanxu6' },
    component: resovle => require(['@/views/dashboard'], resovle)
  },
  {
    path: '/login',
    name: 'login',
    meta: { title: '登录', by: 'yanxu6' },
    component: resovle => require(['@/views/login'], resovle)
  },

  {
    path: '/user',
    name: 'user',
    meta: { title: '用户中心', by: 'yanxu6' },
    component: resovle => require(['@/views/user'], resovle)
  }
];
//需要进行 权限验证的模块
export const asyncRouterMap = [
  {
    path: '/jgpt',
    name: 'jgpt',
    meta: { title: '监管平台', by: 'yanxu6' },
    redirect: 'default',
    component: Layout,
    children: [
      {
        path: 'default',
        name: 'default',
        meta: { title: '监管平台-home', by: 'yanxu6' },
        component: DefaultPage
      },
      {
        path: 'schoolManage',
        name: 'schoolManage',
        meta: { title: '学校管理', by: 'yanxu6' },
        component: resovle =>
          require([
            '@/views/smart-assistant-jgpt/school-count/school-manage'
          ], resovle)
      },
      {
        path: 'schoolResource',
        name: 'schoolResource',
        meta: { title: '学校资源池', by: 'yanxu6' },
        component: resovle =>
          require([
            '@/views/smart-assistant-jgpt/school-count/school-resource'
          ], resovle)
      },
      {
        path: 'schoolAdd',
        name: 'schoolAdd',
        meta: { title: '学校新增', by: 'yanxu6' },
        component: resovle =>
          require([
            '@/views/smart-assistant-jgpt/school-count/school-add'
          ], resovle)
      },
      {
        path: 'schoolContact',
        name: 'schoolContact',
        meta: { title: '学校联系人', by: 'yanxu6' },
        component: resovle =>
          require([
            '@/views/smart-assistant-jgpt/school-count/school-contact'
          ], resovle)
      }
    ]
  }
];
