# webpack学习

通过阅读webpack插件、loader的核心逻辑来深入了解webpack。

### 插件

* CleanWebpackPlugin

CleanWebpackPlugin用于清理webpack指定输出目录。

```js
// 使用
new CleanWebpackPlugin()

// 清除ouput配置的目录

```

```js
// 核心逻辑
apply (compiler) {
  this.output = compiler.options.output.path
  compiler.hooks.emit.tap('clean-webpack-plugin', () => {
    // del库，采用glob模式删除文件
    del.sync(`**/*`, { cwd: this.output })
  })
}

```

* CopyWebpackPlugin

CopyWebpackPlugin用于拷贝文件到构建结果中。

```js
// 使用
new CopyWebpackPlugin({
  patterns: [
    {
      from: 'examples/assets',
      to: 'assets'
    }
  ]
})

// from目录相对于项目根路径、to目录相对于输出目录

```

```js
// 核心逻辑

compilation.hooks.additionalAssets.tapAsync('~', async (callback) => {
  // 读取文件内容content，并生成source实例，插入compilation.assets
  compilation.assets[to] = new RawSource(content)
})

```

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

