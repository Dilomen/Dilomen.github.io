## 核心概念

- Entry：入口，输入对象
- Module：模块，webpack 会根据入口找出所有的模块（文件）
- Chunk：代码块，一个代码块由一个或者多个模块组成，用于代码的合并和分割
- Loader：模块转化器，将对应的模块（文件）根据规则匹配转成所需内容
- Plugin：插件，监听 webpack 构建过程，并在对应的生命周期中做出对应的事件

## 打包流程

1. 首先会将指令和配置文件合并参数，命令行接口参数的优先级，高于配置文件参数，即命令行会覆盖配置文件参数
2. 注册所有配置的 Plugin 插件，因为 plugin 插件需要监听整个 webpack 构建的生命周期，在对应的时间执行对应的事件处理
3. 然后根据 Entry 入口，递归的解析各个依赖模块（文件），解析的同时会根据规则配置对不同的模块进行不同的 loader 处理，以此获取所需的内容
4. 根据 Entry 和各个模块的依赖关系，组成一个个 Chunk 代码块
5. 将 Chunk 代码块输出到文件系统

<a data-fancybox title="/框架/webpack运行机制.png" href="/框架/webpack运行机制.png">![/框架/webpack运行机制.png](/框架/webpack运行机制.png)</a>

## tree-shaking

去除依赖模块中没有使用的内容

```js
// a.js
export function a() {}
export function b() {}

// c.js
import { a } from "./a";
```

那么 b 的内容就不会被打包到 bundle 中，一般是 tree-shaking 做一些标识，在 uglifyjs 压缩代码时根据标识进行删除

## 实现打包器思路
根据导入文件递归查询每一个依赖文件，并对文件（单指js文件）通过fs.readFileSync读出内容，进行babel.parse转成AST，再转成对应版本代码（如ES6转ES5），然后再次对文件内的依赖文件（通过遍历AST的ImportDeclaration的type取得）进行保存，继续递归，形成一个均带有code和依赖文件路径内容超级对象。
```js
{"./src/index.js":{"dependencies":{"./message.js":"./src/message.js"},"code":"\"use strict\";\n\nvar _message = require(\"./message.js\");\n\nconsole.log(_message.message);"},"./src/message.js":{"dependencies":{"./word.js":"./src/word.js"},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.message = void 0;\n\nvar _word = require(\"./word.js\");\n\nvar message = \"say \".concat(_word.word);\nexports.message = message;"},"./src/word.js":{"dependencies":{},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.word = void 0;\nvar word = \"hello\";\nexports.word = word;"}});
```

然后对这个对象进行递归处理，编写require方法，让对象遇到require方式就去寻找对应的依赖路径下的代码，并通过eval执行

