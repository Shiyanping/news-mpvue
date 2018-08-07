import request from '@/utils/request';
import apiHost from './config';

export function getSignStatus(query) {
  return request({
    url: apiHost.NE_HOST + 'weixinMiniProgram/signStatus',
    method: 'POST',
    data: query
  });
}

export function startSign(query) {
  return request({
    url: apiHost.NE_HOST + 'weixinMiniProgram/sign',
    method: 'POST',
    data: query
  });
}

export function getShareGold(query) {
  return request({
    url: apiHost.NE_HOST + 'weixinMiniProgram/share',
    method: 'POST',
    data: query
  });
}
