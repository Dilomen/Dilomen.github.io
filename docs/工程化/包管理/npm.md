## 概述

npm(Node Package Manager)是 JavaScript 的包管理器，其主要提供了 CLI 的命令行操作和注册表，允许用户上传“包”和在注册表中搜索下载可用的“包”，以达到整个 JS 生态的成果共享。

## CLI 指令

[官方指令指导](https://docs.npmjs.com/cli/v8/commands)

常用的几个指令

### npm init

创建一个 package.json 文件，相当于初始化一个具有包管理的项目

```js
npm init
```

```js
// 跳过所有的提示选择直接生成
npm init --yes
```

创建自定义的问答来生成 package.json

```js
// 新建.npm-init.js文件
touch ~/.npm-init.js
```

```js
// ~/.npm-init.js
const name = prompt('name?', 'my-app');
const version = prompt('version?', '0.0.1');
module.exports = {
  name: name,
  version: version,
};
```

再执行 npm init 指令就会执行设置的问答并输出 module.exports 导出的内容

<a data-fancybox title="npm_init" href="/工程化/npm_init_prompt.png">![npm_init](/工程化/npm_init_prompt.png)</a>

### npm config

设置 npm 配置文件

```js
// 设置源地址
npm config set registry https://registry.npmjs.org/
// 设置源为淘宝镜像
npm config set registry http://registry.npm.taobao.org/
```

### npm link

常用于未发布包的调试工作，它会在/usr/local/lib/node_modules 文件下存放一个快捷方式指向你的“预发布包”

```js
/usr/local/bin/yourpakagename -> /usr/local/lib/node_modules/yourpackagename/xxx
/usr/local/lib/node_modules/yourpackagename/xxx -> /Users/username/Documents/xxx(your real project path)
```

然后在使用项目中，执行以下指令就可以绑定到“预发布包”

```js
npm link yourpackagename
```

> 推荐更好的方式：yalc，这边就不展开了

### npm publish

发布当前包到 npm 注册表

### npm update

会将依赖更新到 semver 约束下的最新版本

### npm audit

查看项目中的依赖是否存在漏洞

```js
// 自动安装任何兼容的更新
npm audit fix
```

## package.json

> <https://docs.npmjs.com/cli/v8/configuring-npm/package-json>

| 属性名           | 描述                           |
| ---------------- | ------------------------------ |
| name             | 项目名称                       |
| version          | 项目的版本号                   |
| description      | 项目的描述                     |
| author           | 项目的作者                     |
| main             | 主入口文件                     |
| scripts          | 脚本执行指令                   |
| dependencies     | 用户发布环境时所依赖的包       |
| devDependencies  | 用于本地环境开发时候所依赖的包 |
| peerDependencies | 同版本依赖                     |
| homepage         | 项目主页的 url                 |
| license          | 许可证:限制用户的使用权        |

#### 依赖

- dependencies

生产环境使用的依赖，也就是会被发布上去，被使用到的内容

```js
npm install xxxx
npm install --save xxxx
```

- devDependencies

开发环境使用的依赖，比如 eslint，jest 等属于项目本身健壮性建设的依赖无需发布，减少体积

```js
npm install --save-dev xxxx
```

#### 版本

遵循[semver 原则](https://semver.org/lang/zh-CN/)

> major.minor.patch 主版本号.次版本号.修补版本号

| 写法         | 表示                                                          |
| ------------ | ------------------------------------------------------------- |
| ​​​​>version | 必须大于某个版本                                              |
| =version     | 必须大于等于某个版本                                          |
| <version     | 必须小于某个版本                                              |
| <=version    | 必须小于等于某个版本                                          |
| ^version     | 会升级到最新的次版本号,大于等于指定版本，但是小于指定大版本前 |
| ~version     | 会升级到最新的修订版本号                                      |

^1.1.0 --> 1.1.0 <= 版本 < 2.0.0  
~1.1.5 --> 1.1.5 <= 版本 < 1.2.0  
~1.1 --> 1.1.0 <= 版本 < 1.2.0  
~2 --> 2.0.0 <= 版本 < 3.0.0  
1.1.x -> 1.1.0 <= 版本 < 1.2.0  
1.1.0 - 1.3.0 --> 1.1.0 <= 版本 <= 1.3.0  
version1 || version2 或

#### scripts 脚本

```json
scripts: {
  "test": "jest"
}
```

npm run xxx 执行时会将当前项目下 node_modules 的 bin 文件设置为 PATH 环境变量，这样就可以执行 scripts 配置的项目内依赖包的指令

## lock 文件

package-lock.json 文件会锁版本，

但是在 npm@5.1.0 后，npm install 指令会重新生成一个 package-lock.json  
会根据 package.json 优先级来更新 node_modules 中包的版本，也就是说如果 package.json 所需要安装的包版本大于 package-lock.json 的规定版本，那么 node_modules 中包就会按照 package.json 的版本来

> https://github.com/npm/npm/issues/17979

解决办法：

- package.json 中依赖写固定版本
- 执行 npm shrinkwrap，生成 npm-shrinkwrap.json 文件，当 npm install 时，就会优先读取该文件
- 使用 npm ci 指令，而不是 npm install

### 依赖安装

npm2 => npm3

在 npm2 时，所有的依赖的依赖都会安装到自己的 node_modules 下，比如 A 和 B 同时依赖了 C 的同一个版本

```md
node_modules/
  ├─┬ A
  │ ├── C
  ├─┬ B
  │ └── C
```

而在 npm3 后，就为了优化空间和安装速度，就会共享安装，就是将依赖的依赖提到最外层，当别的依赖遇到了相同版本的子依赖就无需在安装，如果不同版本就安装在自己的 node_modules 下

```md
node_modules/
  ├─┬ A
  ├─┬ B
  ├─┬ C
```

<a data-fancybox title="npm3 安装" href="/工程化/npm3_dep_install_1.png">![npm3 安装](/工程化/npm3_dep_install_1.png)</a>

如果被复用的子依赖版本不是最多的，就不能达到最大程度优化

<a data-fancybox title="npm3 安装" href="/工程化/npm3_dep_install_2.png">![npm3 安装](/工程化/npm3_dep_install_2.png)</a>

> 图片转自 <https://www.zoo.team/article/npm-details>

参考文献

- [npm 官方文档](https://docs.npmjs.com/)
- [npm 依赖管理中被忽略的那些细节](https://www.zoo.team/article/npm-details)
- [Node.js 进阶-npm 知识](https://juejin.cn/post/6846687601982701575)
