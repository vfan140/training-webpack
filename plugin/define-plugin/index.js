/**
 * DefinePlugin用于创建一组编译时可配置的全局变量。
 * 因为变量是在编译时配置的，所以可以通过当前环境的不同(development、production)来创建不同的变量。
 */
const ConstDependency = require('webpack/lib/dependencies/ConstDependency')


class DefinePlugin {
  /**
   * @param {*} definitions ：全局变量配置
   */
  constructor(definitions) {
    this.definitions = definitions
  }
  apply (compiler) {

    compiler.hooks.compilation.tap('~DefinePlugin', (compilation, { normalModuleFactory }) => {

      const handler = parser => {
        Object.keys(this.definitions).forEach(key => {
          parser.hooks.expression.for(key).tap('~DefinePlugin', expr => {

            // Parser.parse过程中可以通过订阅不同的钩子插入dependency实例，每个dependency实例保存了代码位置(range)和替换字符，在最终生成文件时，会用替换字符替换对应位置的代码。
            var dep = new ConstDependency(this.definitions[key], expr.range, false)
            dep.loc = expr.loc 
            parser.state.current.addDependency(dep)
            return true
            
          })
        })
      }

      /**
       *  通过normalModuleFactory可以获取parser实例
       *    Parser创建过程：
       *        1、JavascriptModulesPlugin订阅normalModuleFactory的createParser钩子
       *        2、NormalModuleFactory调用create方法创建模块时，会触发createParser钩子创建Parser
       *    Parser.parse
       *        1、NormalModule调用build时，会触发Parser.parse
       */
      normalModuleFactory.hooks.parser
        .for('javascript/auto')
        .tap('~DefinePlugin', handler)

    })
  }
}

module.exports = DefinePlugin