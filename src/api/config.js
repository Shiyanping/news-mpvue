const environment = 'production';

const nePool = {
  development: 'http://test-xwz.coohua.top/',
  // development: 'https://test-xwz.coohua.top/',
  staging: 'http://172.16.11.190:9140/',
  production: 'https://xwz.chengyudashen.com/'
};

const infoPool = {
  // development: 'https://test-info.coohua.top/',
  development: 'http://test-info.coohua.top/',
  staging: 'http://172.16.11.189:9140/',
  production: 'https://info.chengyudashen.com/'
};

const commentPool = {
  development: 'http://115.28.185.77:9090/',
  production: 'https://info.coohua.com/'
};

const remoteLog = {
  development: 'https://dcs.chengyudashen.com/data/v1?project=newsearn_test',
  staging: 'https://dcs.chengyudashen.com/data/v1?project=newsearn_test',
  production: 'https://dcs.chengyudashen.com/data/v1?project=newsearn'
};

const NE_HOST = nePool[environment];
const INFO_HOST = infoPool[environment];
const COMMENT_HOST = commentPool[environment];
const REMOTE_LOG = remoteLog[environment];

const hostConfig = {
  NE_HOST,
  INFO_HOST,
  COMMENT_HOST,
  REMOTE_LOG
};

export default hostConfig;
