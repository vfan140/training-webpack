const path = require('path')
const webpack = require('webpack')
const DefinePlugin = require('../index.js')

module.exports = {
  // 开发模式
  mode: 'development',
  // 入口
  entry: path.join(__dirname, 'index.js'),
  // 插件
  plugins: [

    // new webpack.DefinePlugin({
    //   VERSION: JSON.stringify('1.0.0')
    // })

    new DefinePlugin({
      VERSION: JSON.stringify('1.0.0')
    })
  ]
}