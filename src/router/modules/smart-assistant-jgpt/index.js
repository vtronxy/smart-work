/** @format */

export const constantRouterMap = [
  {
    path: '',
    name: 'dashboard',
    meta: { title: '面板', by: 'yanxu6' },
    component: resovle => require(['@/views/dashboard/index'], resovle)
  },
  {
    path: '/login',
    name: 'login',
    meta: { title: '登录', by: 'yanxu6' },
    component: resovle => require(['@/views/login/index'], resovle)
  },

  {
    path: '/user',
    name: 'user',
    meta: { title: '用户中心', by: 'yanxu6' },
    component: resovle => require(['@/views/user/index'], resovle)
  }
];

export const asyncRouterMap = [
  {
    path: '/jgpt',
    name: 'jgpt',
    meta: { title: '监管平台', by: 'yanxu6' },
    redirect: 'default',
    component: resovle =>
      require(['@/views/smart-assistant-jgpt/index'], resovle),
    children: [
      {
        path: 'default',
        name: 'default',
        meta: { title: '监管平台', by: 'yanxu6' },
        component: resovle =>
          require(['@/views/smart-assistant-jgpt/index'], resovle)
      },
      {
        path: 'default',
        name: 'default',
        meta: { title: '学校管理', by: 'yanxu6' },
        component: resovle =>
          require(['@/views/smart-assistant-jgpt/index'], resovle)
      }
    ]
  }
];
