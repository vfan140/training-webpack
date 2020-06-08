const del = require('del')

class CleanWebpackPlugin {
  constructor() {

  }
  apply (compiler) {
    this.output = compiler.options.output.path
    compiler.hooks.emit.tap('clean-webpack-plugin', () => {
      del.sync(`**/*`, { cwd: this.output })
    })
  }
}

module.exports = CleanWebpackPlugin