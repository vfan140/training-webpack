const path = require('path')
// const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CleanWebpackPlugin = require('../index')

module.exports = {
  // 开发模式
  mode: 'development',
  // 入口
  entry: path.join(__dirname, 'index.js'),
  // 插件
  plugins: [
    new CleanWebpackPlugin()
  ]
}