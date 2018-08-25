import request from '@/utils/request';
import apiHost from './config';

// 获取签到状态
export function getSignStatus(query) {
  return request({
    url: apiHost.NE_HOST + 'weixinMiniProgram/signStatus',
    method: 'POST',
    data: query
  });
}

// 签到
export function startSign(query) {
  return request({
    url: apiHost.NE_HOST + 'weixinMiniProgram/sign',
    method: 'POST',
    data: query
  });
}

// 签到后的分享
export function getShareGold(query) {
  return request({
    url: apiHost.NE_HOST + 'weixinMiniProgram/share',
    method: 'POST',
    data: query
  });
}
