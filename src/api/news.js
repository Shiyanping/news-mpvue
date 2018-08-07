import request from '@/utils/request';
import apiHost from './config';

export function getNewsList(query) {
  return request({
    url: apiHost.INFO_HOST + 'api/news/wx',
    method: 'POST',
    data: query
  });
}

export function getNewsDetail(id) {
  return request({
    url: apiHost.INFO_HOST + 'api/news/wx/' + id,
    method: 'POST',
    data: {}
  });
}
