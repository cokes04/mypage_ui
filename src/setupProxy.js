const { createProxyMiddleware } = require('http-proxy-middleware');

const e = process.env.NODE_ENV
const api_gateway = e === "production" ? "ec2-52-79-211-111.ap-northeast-2.compute.amazonaws.com" : "http://localhost:9100"

module.exports = function(app){
  app.use(
      createProxyMiddleware('/api', {
          target: api_gateway,
          changeOrigin: true
      })
  )
};

