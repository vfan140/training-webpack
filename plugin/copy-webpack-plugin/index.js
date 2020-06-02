/**
 *  CopyWebpackPlugin用于拷贝文件到构建结果中
 */
const path = require('path')
const globby = require('globby')
const fs = require('fs-extra')
const { RawSource } = require('webpack-sources')

class CopyWebpackPlugin {
  constructor(options) {
    this.patterns = options.patterns
  }
  apply (compiler) {
    compiler.hooks.compilation.tap('~CopyWebpackPlugin', compilation => {
      // 关键点1：绑定additionalAssets钩子
      compilation.hooks.additionalAssets.tapAsync('~CopyWebpackPlugin', async (callback) => {
        for (let i = 0; i < this.patterns.length; i++) {
          const pattern = this.patterns[i]
          // 使用globby获取所有文件路径
          const paths = await globby(pattern.from)
          for (let j = 0; j < paths.length; j++) {
            // 读取文件内容
            const content = await fs.readFile(path.join(process.cwd(), paths[j]), 'utf8')
            const to = path.join(pattern.to, path.relative(pattern.from, paths[j]))
            // 关键点2：将source实例插入到compilation.assets
            compilation.assets[to] = new RawSource(content)
          }
        }
        callback()
      })
    })
  }
}

module.exports = CopyWebpackPlugin