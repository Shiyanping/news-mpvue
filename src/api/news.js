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
