const getters = {
  alert: state => state.alert.params,
  token: state => state.user.token,
  userId: state => state.user.userId,
  userInfo: state => state.user.userInfo,
  systemInfo: state => state.user.systemInfo,
  isSign: state => state.user.isSign,
  signDays: state => state.user.signDays,
  gold: state => state.user.gold,
  balance: state => state.user.balance
};
export default getters;
