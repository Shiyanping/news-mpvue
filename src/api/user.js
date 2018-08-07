import request from '@/utils/request';
import apiHost from './config';

export function getRegisterInfo(query) {
  return request({
    url: apiHost.NE_HOST + 'user/registerLoginMiniProgram',
    method: 'POST',
    data: query
  });
}

export function getCreditPage(query) {
  return request({
    url: apiHost.NE_HOST + 'weixinMiniProgram/creditPage',
    method: 'POST',
    data: query
  });
}

export function redBagCost(query) {
  return request({
    url: apiHost.NE_HOST + 'weixinMiniProgram/redBagCost',
    method: 'POST',
    data: query
  });
}

export function getUserGold(query) {
  return request({
    url: apiHost.NE_HOST + 'weixinMiniProgram/gold',
    method: 'POST',
    data: query
  });
}

export function getCashIncome(query) {
  return request({
    url: apiHost.NE_HOST + 'weixinMiniProgram/cashIncome',
    method: 'POST',
    data: query
  });
}

export function getMiniProgramInfo(query) {
  return request({
    url: apiHost.NE_HOST + 'weixinMiniProgram/getMiniProgramInfo',
    method: 'POST',
    data: query
  });
}

export function updateMiniProgramInfo(query) {
  return request({
    url: apiHost.NE_HOST + 'weixinMiniProgram/updateMiniProgramInfo',
    method: 'POST',
    data: query
  });
}
