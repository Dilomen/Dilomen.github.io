---
title: 记一次react+ts的环境搭建，并上传到npm
tags: React
categories: React
keywords: 前端,React
description: 使用webpack搭建react + typescript的环境，并上传到npm
abbrlink: 3a0cd7b9
date: 2019-08-30 14:25:34
---

> 在 github 创建了一个由 react 搭建的 UI 组件库，最初为了方便直接使用了 create-react-app 官方脚手架搭建了项目，虽然方便了，但是显得太臃肿以及不够灵活。因此自己使用 webpack 来重新搭建整个环境

项目地址：**https://github.com/Dilomen/Dark-Compontent**  
通过 **npm install dark-ui -D** 指令进行安装使用

## react 环境

### **创建 package.json**

在项目文件夹下输入指令，创建 package.json 文件

```js
npm init
```

webpack 创建环境

```js
npm install webpack webpack-cli --save-dev
```

react 的环境

```js
npm install react react-dom
```

babel 相关,babel7 和 6 的依赖会有些差别

```js
npm install @babel/cli @babel/core @babel/preset-env @babel/preset-react --save-dev
```

### **创建文件**

#### 1. 创建一下目录

- 根目录
  - src
    - index.jsx
    - index.css
  - index.html
  - babel.config.js
  - webpack.config.js
  - package.json
  - ...

#### 2. index.html 内容

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
    />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

#### 3. index.jsx

```jsx
import React from "react";
import ReactDOM from "react-dom";
import "./index.css"; // 随便在src下建一个index.css测试样式是否导入
ReactDOM.render(<p>Hello World</p>, document.getElementById("root"));
```

#### 4. babel.config.js

```js
module.exports = {
  presets: ["@babel/preset-env", "@babel/preset-react"]
};
```

#### 5. webpack.config.js

- 先安装依赖

```js
npm install html-webpack-plugin clean-webpack-plugin  --save-dev
```

```js
npm install style-loader css-loader file-loader url-loader --save-dev
```

- 编写 webpack.config.js 文件

```js
// 导入
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// CleanWebpackPlugin的导入，看版本，之前的版本的默认，不需要加{}
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports = {
  // 这里输入输出是一对一的，如果想一对多，多对多请参考 webpack 配置
  // 输入文件：
  entry: [path.resolve(__dirname, "./src/index.js")],
  output: {
    path: path.resolve(__dirname, "./build"),
    filename: "[hash:8].js"
  },
  // 识别后缀
  resolve: {
    extensions: [".js", ".jsx", "ts", "tsx"]
  },
  // 插件
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./index.html"
    })
  ],
  // 不同类型文件的模块
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.(jpg|png|svg)$/,
        loader: ["file-loader"]
      },
      {
        test: /\.(woff|woff2|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=10000"
      }
    ]
  }
};
```

#### 6. 修改 package.json

```json
"scripts": {
    "dev": "npm run start",
    "start": "webpack-dev-server --config webpack.config.js",
    "build": "webpack --config webpack.config.js"
  }
```

#### 7. 执行 npm run start

## sass/scss 等环境

```js
npm install html-webpack-plugin cnode-sass sass-loader  --save-dev
```

然后在 webpack.config.js 文件中的 module 下添加

```js
module: {
    rules: [
        {
            test: /\.scss$/,
            loaders: ['style-loader', 'css-loader', 'sass-loader']
        },
        ...
    ]
}
```

## typescript 环境

tip: 由于本人 ts 的功力有限，暂时还没有学习 ts 文件声明，而下面的@types/\*的依赖就是为了你不需要在写文件声明

安装依赖

如果在全局安装了就不要再执行下面的指令

```js
npm install typescript ts-loader source-map-loader --save-dev
```

#### 1. 生成 tsconfig.json

- 执行下面的指令就会自动生成

```
tsc -init
```

- 修改 tsconfig.json

```json
{
  "compilerOptions": {
    "sourceMap": true,
    "noImplicitAny": true,
    "module": "commonjs",
    "target": "es5",
    "jsx": "react",
    "esModuleInterop": true
  },
  "exclude": ["node_modules"]
}
```

#### 2. webpack 配置 ts

ts 关于 react

```js
npm install @types/react @types/react-dom
```

在 webpack.config.js 文件下 modules 的 rules 中添加

```js
{
    test: /\.ts(x?)$/,
    exclude: /node_modules/,
    use: ["ts-loader"]
},
{
    enforce: "pre",
    test: /\.js$/,
    loader: "source-map-loader"
}
```

## jest 环境

前端单元测试 —— jest

#### 1. 安装依赖

```js
js环境就装
npm install jest react-test-renderer --save-dev
ts环境就装
npm install @types/jest @types/react-test-renderer --save-dev
```

#### 2. 修改 package.json

```json
"scripts": {
  ...
  "test": "jest"
}
```

## 如何上传到 npm

> tip:接下来的部分属于个人项目，别的项目可能需要有所改变

ts 和 scss 不能执行，最终还是要转化成 js 和 css 的，由于没有找到更好的办法，这边直接使用 gulp 将 scss 实时编译成 css，在 js 中直接引入 css

- 1.在根目录下创建一个 gulpfile.js 文件

```
npm install gulp gulp-sass --save-dev
```

```js
let gulp = require("gulp");
let sass = require("gulp-sass");
gulp.task("sass", function() {
  return gulp
    .src("src/components/**/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("src/style/"));
});
gulp.task("watch", function() {
  gulp.watch("./src/components/**/*.scss", gulp.series("sass"));
});
```

- 2.执行以下命令监听 scss，实时转化为 css

```js
gulp watch
```

- 3.然后在 ts 或者 js 中直接引入的是 style 下的 css

### 进入正题

#### 1. 新建一个文件夹，生成一个 package.json

#### 2. 将上面项目文件中的 component 和 style（视自己项目情况而定，就是一般 src 下的记个文件夹）放到该目录下，将 component 改名为 lib，**这个也可以通过不改名，通过 babel 指令来生成 lib，就是将编译好的放到 lib 里，如果考虑到 js 版本，还是建议使用 babel，这边就不再叙述了**

#### 3.编辑 tsconfig.js，通过 tsc 指令将 ts 转化为 js

```js
// tsconfig.js
{
  "compilerOptions": {
    "outDir": "./lib",
    "noImplicitAny": false,
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "commonjs",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react",
    "baseUrl": "./",
    "paths": { "*": ["types/*"] }
  },
  "exclude": ["node_modules"],
  "include": ["lib/*"]
}
```

#### 4. 修改 package.js,一定要写明

- name 名称 ：你 npm 项目的名称怎么少得了，如果重复就不能上传
- version 版本号 ： 每次上传都必须比上次高
- file ：传上去的文件

```json
{
  "name": "dark-ui",
  "version": "0.1.2",
  "description": "react开发的UI组件",
  "main": "./lib/index.js",
  "files": [
    "lib",
    "style"
  ],
  "keywords": [
    "react",
    "component"
  ],
  "author": "dilomen",
  "dependencies": {},
  "devDependencies": {
    "react": "^16.9.0",
    "react-dom": "^16.9.0"
    ...
  }
}
```

#### 5. 上传吧，记得登录哦（npm login）

```
npm publish
```

然后你就可以通过 npm install 来安装你的项目啦
