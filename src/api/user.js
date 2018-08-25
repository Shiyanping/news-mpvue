import request from '@/utils/request';
import apiHost from './config';

// 注册小程序
export function getRegisterInfo(query) {
  return request({
    url: apiHost.NE_HOST + 'user/registerLoginMiniProgram',
    method: 'POST',
    data: query
  });
}

// 获取用户余额，今天获得的金币及新手红包状态
export function getCreditPage(query) {
  return request({
    url: apiHost.NE_HOST + 'weixinMiniProgram/creditPage',
    method: 'POST',
    data: query
  });
}

// 开启新手红包
export function redBagCost(query) {
  return request({
    url: apiHost.NE_HOST + 'weixinMiniProgram/redBagCost',
    method: 'POST',
    data: query
  });
}

// 获取用户金币明细
export function getUserGold(query) {
  return request({
    url: apiHost.NE_HOST + 'weixinMiniProgram/gold',
    method: 'POST',
    data: query
  });
}

// 获取用户收入明细
export function getCashIncome(query) {
  return request({
    url: apiHost.NE_HOST + 'weixinMiniProgram/cashIncome',
    method: 'POST',
    data: query
  });
}

// 获取用户头像等信息
export function getMiniProgramInfo(query) {
  return request({
    url: apiHost.NE_HOST + 'weixinMiniProgram/getMiniProgramInfo',
    method: 'POST',
    data: query
  });
}

// 更新用户头像名称信息
export function updateMiniProgramInfo(query) {
  return request({
    url: apiHost.NE_HOST + 'weixinMiniProgram/updateMiniProgramInfo',
    method: 'POST',
    data: query
  });
}
