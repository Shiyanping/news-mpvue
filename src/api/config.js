const environment = 'development';

const nePool = {
  // development: 'http://test-xwz.coohua.top/',
  development: 'http://114.215.103.173:9140/',
  production: 'https://xwz.coohua.com/'
};

const infoPool = {
  // development: 'https://info.coohua.com/',
  development: 'http://115.28.185.77:9090/',
  production: 'https://info.coohua.com/'
};

const commentPool = {
  development: 'http://115.28.185.77:9090/',
  production: 'https://info.coohua.com/'
};

const NE_HOST = nePool[environment];
const INFO_HOST = infoPool[environment];
const COMMENT_HOST = commentPool[environment];

const hostConfig = {
  NE_HOST,
  INFO_HOST,
  COMMENT_HOST
};

export default hostConfig;
