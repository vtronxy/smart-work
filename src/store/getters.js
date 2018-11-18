/** @format */
// getter action mutation 默认是在全局的环境下 设置namespace:true可以改变这个情况
const getters = {
  token: state => state.jgptjgptUser.token,
  avatar: state => state.jgptUser.avatar,
  name: state => state.jgptUser.name,
  introduction: state => state.jgptUser.introduction,
  status: state => state.jgptUser.status,
  roles: state => state.jgptUser.roles, // 当前用户具备的权限角色
  currentRole: state => state.jgptUser.currentRole, // 当使用的用户角色
  permission_routers: state => state.jgptPermission.routers, // 完成的路由表
  addRouters: state => state.jgptPermission.addRouters // 动态添加的路由权限
};
export default getters;
