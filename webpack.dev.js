const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const env = require('dotenv').config({ path: '.env' }).parsed;

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    port: env.CLIENT_PORT,
    historyApiFallback: true,
    proxy: [{
      context: ['/auth', '/api'],
      target: 'http://0.0.0.0:' + env.SERVER_PORT
    }]
  }
});
