const getters = {
  alert: state => state.alert.params,
  userInfo: state => state.user.userInfo,
  token: state => state.user.token,
  isSign: state => state.user.isSign,
  signDays: state => state.user.signDays,
  gold: state => state.user.gold,
  balance: state => state.user.balance
};
export default getters;
