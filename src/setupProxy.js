const { createProxyMiddleware } = require('http-proxy-middleware');

const e = process.env.NODE_ENV
const api_gateway = e === "production" ? "http://host.docker.internal:9100" : "http://localhost:9100"

module.exports = function(app){
  app.use(
      createProxyMiddleware('/api', {
          target: api_gateway,
          changeOrigin: true
      })
  )
};

