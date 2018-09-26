import request from '@/utils/request';
import apiHost from './config';

// 拉取 feed 流
export function getNewsList(query) {
  return request({
    url: apiHost.INFO_HOST + 'api/news/wx',
    method: 'POST',
    data: query
  });
}

// 获取文章详情
export function getNewsDetail(id) {
  return request({
    url: apiHost.INFO_HOST + 'api/news/wx/' + id,
    method: 'POST',
    data: {}
  });
}

// 获取悬浮广告信息
export function getFloatAd() {
  return request({
    url: apiHost.HEATH_HOST + '/hkc/config/adRedBagConfig',
    method: 'GET',
    data: {miniProgramType: 2}
  });
}
