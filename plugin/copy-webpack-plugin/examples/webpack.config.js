const path = require('path')
// const CopyWebpackPlugin = require('copy-webpack-plugin')
const CopyWebpackPlugin = require('../index')

module.exports = {
  // 开发模式
  mode: 'development',
  // 入口
  entry: path.join(__dirname, 'index.js'),
  // 插件
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'examples/assets',
          to: 'assets'
        }
      ]
    })
  ]
}