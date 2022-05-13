## 概述

- loader 可以在加载模块前对源代码进行处理操作，并生成想要的内容

## 简单配置

- 一般使用 webpack.config.js 文件进行配置 loader，对不同的文件模块进行处理

```js
module.exports = {
    ...
    module: {
        rules: [
            {
                // 一旦匹配到对应的规则，内容就会被指定的loader进行处理
                test: /\.js$/,
                loader: 'babel-loader
            }
        ]
    }
    ...
}
```

- test 书写配置规则

```js
test: /\.js$/;
```

- loader 同样可以使用单个和多个，书写可以使用 loader,loaders 或者 use

```js
loader: "babel-loader";
loaders: ["style-loader", "css-loader"];
loaders: [{ loader: "style-loader", options: {} }, "css-loader"];
use: "babel-loader";
use: ["style-loader", "css-loader"];
use: [{ loader: "style-loader", options: {} }, "css-loader"];
```

- include/exclude 可以缩小处理的范围

```js
exclude: /node_modules/;
```

- oneOf 从上到下，一旦匹配规则就使用规则下的 loader

```js
{
  test: /.svg$/,
  oneOf: [{
    resourceQuery: /inline/, // 可在svg文件后加?inline， import SVG from icon.svg?inline
    use: 'url-loader'
  }, {
    use: 'raw-loader'
  }]
}
```

## 简单实现一个 loader

> 该 loader 的实现功能是替换 js 源代码中的部分代码

#### 1. 首先创建以下的文件结构

```md
│ ├─src
│ │ └─index.js
│ ├─loaders
│ │ └─replaceLoader.js
│ ├─webpack.config.js
│ ├─node_modules
│ ├─package.json
```

#### 2. 编写自定义 loader 和 src 下的 index.js

```js
// replaceLoader.js
module.exports = function(content) {
  // content便是源代码
  return content.replace("hello", "hello world");
};
// index.js
function sayHello() {
  console.log("hello");
}
```

#### 3. 在 webpack.config.js 配置自定义的 replaceLoader

```js
...
module: {
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: [
        {
          // 找到loaders文件夹下的replaceLoader，必须使用绝对路径
          loader: path.resolve(__dirname, "./loaders/replaceLoader.js")
        }
      ]
    }
  ];
}
...
```

- 如果觉得这样写路径比较麻烦，可以配置和 module 同一级的参数 resolveLoader

```js
resolveLoader: {
  // 这样webpack在node_modules中找不到对应的loader，就会在loaders文件夹下找
  modules: ["node_modules", "./loaders"];
}
```

```js
{
  //   配置了resolveLoader，就可以直接写loader名了，可以省去路径
  loader: "replaceLoader";
}
```

#### 4. 执行 webpack 打包

```js
eval(
  'function sayHello() {\n    console.log("hello world");\n}\n\n//# sourceURL=webpack:///./src/index.js?'
);
```

由此可见，replaceLoader 被执行了，源代码中的 hello 被替换成了 hello world

> 如果配置了 option，loader 中就可以通过 this.query 取到，还有很多的参数，可参考 <https://www.webpackjs.com/api/loaders/>

## 验证 loader 执行顺序

#### 1. 再在 loader 创建一个 watchLoader.js

```js
module.exports = function(content) {
  console.log(content);
};
```

#### 2. 配置 webpack.config.js

```js
use: [
  {
    loader: "watchLoader"
  },
  {
    loader: "replaceLoader"
  }
];
```

#### 3. 执行 webpack

```js
//  在控制台输出:
function sayHello() {
  console.log("hello world");
}
```

说明是 replaceLoader 先执行将源码修改，在执行 watchLoader 的

:::tip 验证成功
loader 是按**先执行后面再前面**的顺序执行的
:::

## 常用的 loader 配置

### babel-loader

- babel-loader 按照 babel 的配置，可以将 js 代码转化为对应的版本或者需求的代码

```js
{
  test: /\.jsx?$/,
  exclude: /node_modules/,
  loader: 'babel-loader',
  options: {
    // babel的配置
  }
}
```

### ts-loader

```js
{
  test: /\.tsx?$/,
  exclude: /node_modules/,
  loader: "ts-loader"
}
```

### style-loader | css-loader

```js
// 开发环境

{
  test: /\.css$/,
  use: ['style-loader', "css-loader"]
}

// 生产环境
{
    test: /\.css$/,
    use: [MiniCssExtractPlugin.loader, {
      loader: "css-loader",
      // 具体的options可自行配置
      options: {
        modules: {
          localIdentName: "[local]_[hash:5]",
        }
      }
    }]
  }]
}
```

### sass-loader

```js
// 开发环境

{
  test: /\.css$/,
  use: ['style-loader', "css-loader"]
}
// 生产环境

{
  test: /\.scss$/,
  loaders: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
}
```

### url-loader

url-loader 可以将超出限制大小的文件按 file-loader 功能一样将静态文件转化为一个**路由**来访问，将小于限制大小的文件转化为**DataURL**(Base64 码)访问

```js
{
  test: /\.(jpe?g|png|woff|woff2|ttf|eot)$/,
  use: [
    {
      loader: 'url-loader',
      options: {
        limit: 10000
      }
    }
  ]
}
```

### raw-loader

raw-loader 将文件内容直接读出来

```js
{
  test: /.svg$/,
  oneOf: [{
    resourceQuery: /inline/, // 可在svg文件后加?inline， import SVG from icon.svg?inline
    use: 'url-loader'
  }, {
    use: 'raw-loader'
  }]
}
```
