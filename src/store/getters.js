/** @format */

const getters = {
  token: state => state.jgptjgptUser.token,
  avatar: state => state.jgptUser.avatar,
  name: state => state.jgptUser.name,
  introduction: state => state.jgptUser.introduction,
  status: state => state.jgptUser.status,
  roles: state => state.jgptUser.roles,
  setting: state => state.jgptUser.setting,
  permission_routers: state => state.jgptPermission.routers,
  addRouters: state => state.jgptPermission.addRouters
};
export default getters;
