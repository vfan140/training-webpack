# webpack学习

通过阅读webpack插件、loader的核心逻辑来深入了解webpack。

### 插件

*  DefinePlugin

DefinePlugin用于创建一组编译时可配置的全局变量。因为变量是在编译时配置的，所以可以通过当前环境不同(development、production)来创建不同的变量。

```js
// 使用
new webpack.DefinePlugin({
  VERSION: JSON.stringify('1.0.0')
})

// DefinePlugin插件配置的全局变量并不是我们理解的那样往代码里注入window.xx对象，而是采用字符串替换的形式来调整我们使用的全局变量，所以在配置变量时，变量值如果是字符串必须包含引号本身，通常使用JSON.stringify('xx')达到效果。

```

```js
// 核心逻辑

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

normalModuleFactory.hooks.parser
  .for("javascript/auto")
	.tap("DefinePlugin", handler)

```

### loader

### Parser

