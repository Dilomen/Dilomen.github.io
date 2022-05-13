## 概述

- plugin 可以对 webpack 的实例 compiler 进行处理，是对 loader 无法实现功能的补充

## 简单配置

loader 是一个函数，plugin 则必须是一个 class，需要使用它的实例来进行配置

```js
plugins: [new HtmlWebpackPlugin({ template: "./src/index.html" })];
```

## 简单实现一个 plugin

#### 1. 首先创建以下的文件结构

```md
│ ├─src
│ │ └─index.js
│ ├─plugins
│ │ └─console-webpack-plugin.js
│ ├─webpack.config.js
│ ├─node_modules
│ ├─package.json
```

#### 2. 编写 ConsoleWebpackPlugin

> 由官方文档可知，plugin 会有一个 apply 的属性，将会被 webpack 实例对象所调用

```js
// console-webpack-plugin.js
class ConsoleWebpackPlugin {
  constructor() {}
  // compiler是webpack构建的实例
  apply(compiler) {
    console.log("ConsoleWebpackPlugin 执行了！！！");
    compiler.plugin('done', function() {
      console.log('打包完成');
    });
  }
}
module.exports = ConsoleWebpackPlugin;
```

#### 3. 配置 webpack.config.js

```js
// webpack.config.js
const ConsoleWebpackPlugin = require("./plugin/console-webpack-plugin");
plugins: [new ConsoleWebpackPlugin()];
```

#### 4. 执行指令，就可以看见控制台执行了 ConsoleWebpackPlugin 的 apply 方法

:::tip 执行顺序
plugin 的执行顺序（单指同步代码）是从上到下，从先到后
:::

## 常用的 plugin

### HtmlWebpackPlugin

```js
const HtmlWebpackPlugin = require("html-webpack-plugin");
```

生成一个 html 文件，并且将打包好的 js 文件以 script 的方式引入，css 文件以 link 的方式引入

### HotModuleReplacementPlugin

启动热加载

### MiniCssExtractPlugin

导出 css 文件

```js
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
```

### UglifyJsPlugin

压缩 JS

### webpack.ProvidePlugin

全局引入，就不需要在每个 js 文件开头 import 引入

````js
new webpack.ProvidePlugin({
    React: 'react',
    ReactDOM: 'react-dom'
})
```
````
