const HtmlWebPackPlugin = require("html-webpack-plugin");
const env = require('dotenv').config({ path: '.env' }).parsed;

const htmlWebpackPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html"
});

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [ htmlWebpackPlugin ],
  devServer: {
    port: env.CLIENT_PORT,
    proxy: [{
      context: ['/auth', '/api'],
      target: 'http://0.0.0.0:' + env.SERVER_PORT
    }]
  }
};
