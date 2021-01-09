---
title: axios源码分析（一）
tags: 源码分析
categories: 源码分析
abbrlink: f1ebfebe
date: 2019-11-17 23:36:33
keywords:
description:
---

> 项目中经常会使用到 axios 拦截器的封装，本文就从拦截器开始浅入

## 主入口 axios.js

> 该文件主要展示的是创建一个 axios 的对象

### 创建对象实例

首先如果你没有自定义的配置，那么就直接使用 createInstance 创建的默认配置的对象，如果你有需要加的配置，那么就需要使用 axios.create()

```js
// 创建一个默认实例
var axios = createInstance(defaults);

// 创建工厂根据导入的配置构建实例
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};
```

- 以下就是我们使用 api 的用法，直接使用或二次封装 axios，传入一个配置对象

```js
// 直接使用
import axios from 'axios'
axios.get('/test').then(res => ...)
// 对axios进行自定义配置后使用
const ajax = axios.create({
  headers: { Accept: "application/json;charset=utf-8" },
  timeout: 90000
});
```

### createInstance 方法

> createInstance 方法，就是生成一个 Axios 的对象实例

```js
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  // bind(fn, thisArg)   fn.apply(thisArg, args)
  // 将Axios的原型方法绑定到context上，可以使用context.request，并赋值给instance，这样就直接可以使用instance()来执行，不需要instance.request
  var instance = bind(Axios.prototype.request, context);

  // extend(a, b, thisArg)  a[key] = bind(val, thisArg);
  // 将Axios原型对象上的方法和属性都绑定到Axios生成的对象上，同时赋值给instance,这样也提供了instance.request的使用，this都是指向context
  utils.extend(instance, Axios.prototype, context);

  // extend(a, thisArg) a[key] = val;
  // 将Axios生成的对象context的自身方法属性都赋值给instance
  utils.extend(instance, context);
  // instance = {
  //  request: func,
  //  ...Axios.prototype,    Axios原型对象上的方法和属性,就是get,post等请求方法
  //  ...context             context自身的方法和属性
  // }
  // 所有的方法this指向都是Axios生成的对象context
  return instance;
}
```

最终我们得到的实例，也就是我们可使用的 api 的所拥有的方法如下：

<a data-fancybox title="axios实例方法" href="https://blog.dilomen.top/image/axios方法.png">![axios实例方法](https://blog.dilomen.top/image/axios方法.png)</a>

## Axios.js

### Axios 有什么

1. 先找到 Axios 的构造函数，成员变量包括一个**配置**，和我们 api 使用的**请求和响应的拦截器**

```js
// --------------------------源码------------------------------
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}
// --------------------------源码------------------------------
```

2. 然后是 Axios 的原型对象，一个是 request 方法，其余是以下的绑定 http 方法，这里的方法会根据实例对象调用的 method 来配置，执行 request 方法，所以这里可见上面生成的实例对象的方法都是这边继承的

```js
// --------------------------源码------------------------------
utils.forEach(
  ["delete", "get", "head", "options"],
  function forEachMethodNoData(method) {
    Axios.prototype[method] = function(url, config) {
      return this.request(config);
    };
  }
);

utils.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
  Axios.prototype[method] = function(url, data, config) {
    return this.request(config);
  };
});
// --------------------------源码------------------------------
```

3. 原型上的 request 方法，**重重之中**，因为它就是请求的整一个过程

```js
// --------------------------源码------------------------------
Axios.prototype.request = function request(config) {
  ...
  // 对传入的配置进行一些合并处理
  config = mergeConfig(this.defaults, config);
  ...
  // dispatchRequest请求方法，使用xhr.js或http.js中的ajax，是真正向后端发送请求的方法
  var chain = [dispatchRequest, undefined];
  // 这个config就是我们请求拦截request的接收到的参数，包括我们自己的配置和default.js中的config配置
  var promise = Promise.resolve(config);
// --------------------------源码------------------------------
```

- 由于 request 是 InterceptorManager 生成的对象，所以 request.forEach 指向的是 InterceptorManager 原型链上的 forEach 方法,查看 forEach 方法

```js
// InterceptorManager.prototype.forEach = function forEach(fn) {
//   utils.forEach(this.handlers, function forEachHandler(h) {
//     if (h !== null) {
//       fn(h);
//     }
//   });
// };
```

- 可以看到他将 InterceptorManager 的执行栈 this.handlers 中的每一个栈取出来，并执行参数方法

```js
// --------------------------源码------------------------------
this.interceptors.request.forEach(function unshiftRequestInterceptors(
  interceptor
) {
  chain.unshift(interceptor.fulfilled, interceptor.rejected);
});
// --------------------------源码------------------------------
```

- 以下是 this.handlers 的数据结构

```js
// this.handlers = [{
//    fulfilled: fulfilled,
//    rejected: rejected
//  }，{
//    fulfilled: fulfilled,
//    rejected: rejected
//  }]
//  utils.forEach(obj, fn) --> fn.call(null, obj[key], key, obj);
//  将handlers的每一项添加到chain前面
//  chain.unshift(fulfilled, rejected)
```

```js
// --------------------------源码------------------------------
this.interceptors.response.forEach(function pushResponseInterceptors(
  interceptor
) {
  chain.push(interceptor.fulfilled, interceptor.rejected);
  // --------------------------源码------------------------------
});
```

- 最终 chain 就会形成以下的结构

```js
// chain = [
//   interceptor.fulfilled, interceptor.rejected,
//   dispatchRequest, undefined,
//   interceptor.fulfilled, interceptor.rejected
// ]
```

- 将我们请求的配置和默认的配置传入，然后就可以根据 promise 的链式调用，按顺序执行，保证请求在 dispatchRequest 前执行，响应在 dispatchRequest 后执行, 具体做了类似于以下操作,

```js
// const config = {data: 1}
// var promise = Promise.resolve(config)
// chain = [
// (request) => {return {request: {data: 1}}}, (err) => Promise.reject(err),
// (res) => Promise.resolve().then(() => {console.log(res);return {response:{status: 200}}}).catch((err) => Promise.reject(err)), undefined,
// (response) => {console.log(response);return response}, (err) => Promise.reject(err)
// ]
// 所以就是上一个 Promise 结束，才能执行，后面的，从而形成一条 promise 链
```

- promise 由于是 then 执行的，所以返回一个 Promise,具体看 Promise 的源码，then 会**执行传入的函数**并 return 一个 Promise 对象。方便后面继续链式调用
  > Promise 的解读：https://blog.csdn.net/Dilomen/article/details/83757142

```js
// --------------------------源码------------------------------
while (chain.length) {
  promise = promise.then(chain.shift(), chain.shift());
}
// --------------------------源码------------------------------
```

- 这个 promise 就是我们 axios.get(url)后的结果，也就是响应拦截器的接受到的参数 response

```js
// --------------------------源码------------------------------
  return promise;
};
// --------------------------源码------------------------------
```

#### 先看一波简单使用

- 首先是请求拦截器的使用：这里就是 request 就是上面 this.request 中合并的 config，是一个对象

```js
axios.interceptors.request.use(request => {
  return request;
});
```

属性和方法如图所示：

<a data-fancybox title="request" href="https://blog.dilomen.top/image/axios_request.png">![request](https://blog.dilomen.top/image/axios_request.png)</a>

- 接着是响应拦截器的使用：这里是 dispatchRequest 返回的响应内容

```js
axios.interceptors.response.use(
  response => {
    return response
  },
  err => {
    return Promise.reject(err)
  }
}
```

> 为什么 err 错误就必须再 Promise.reject 来包一层？

- 其实也可以直接输出，但是包一层，那就是最外层，无需关心里面有多少个 reject，最外层的 catch 一定都能将他们捕获到

属性和方法如图所示：
<a data-fancybox title="response" href="https://blog.dilomen.top/image/axios_response.png">![response](https://blog.dilomen.top/image/axios_response.png)</a>

- 这样我们在使用 api 时，就可以直接是用返回的 Promise 结果，这个结果是上面 this.request 返回的结果

```js
ajax
  .get(url)
  .then(data => console.log(data))
  .catch(err => console.log(err));
```
