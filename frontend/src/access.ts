/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: API.CurrentUser } | undefined) {
  const { currentUser } = initialState ?? {};
  return {
    canAdmin: currentUser && currentUser.role === 'admin',
    canBand: currentUser && currentUser.role === 'band',
    canFan: currentUser && currentUser.role === 'fan',
  };
}
