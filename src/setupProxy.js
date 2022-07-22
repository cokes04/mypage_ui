const { createProxyMiddleware } = require('http-proxy-middleware');

const e = process.env.NODE_ENV
const api_gateway = e === "production" ? "http://ec2-52-79-211-111.ap-northeast-2.compute.amazonaws.com:9100" : "http://localhost:9100"

module.exports = function(app){
  app.use(
      createProxyMiddleware('/api', {
          target: api_gateway,
          changeOrigin: true
      })
  )
};