/** @format */

export default [
  {
    name: 'userList',
    method: 'POST',
    desc: '用户列表',
    path: '/users', // 一定是以 '/' 开头
    params: {
      pageNo: 1,
      pageSize: 20,
      name: 'aa'
    }
  },
  {
    name: 'userInfo',
    method: 'GET',
    desc: '用户详情',
    path: '/getUser',
    params: {
      uid: ''
    }
  }
];
