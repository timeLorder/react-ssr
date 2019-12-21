module.exports = {
  title: 'React-SSR', //页面标题
  apiServer: 'http://localhost:9090', //接口地址
  apiPrev: '/api', //Client端请求用到的前缀 要和server/index.js里的代理保持一致
  tokenName: 'X-Token' //token字段名
}