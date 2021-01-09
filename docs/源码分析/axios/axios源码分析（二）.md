---
title: axios源码分析（二）
abbrlink: c1fd1266
date: 2019-11-19 16:11:01
tags: 源码分析
categories: 源码分析
keywords:
description:
---

> 既然是 ajax 库，那么肯定有调用原生 ajax 的地方，可以在 lib 下的 adapters 中的 http.js 和 xhr.js 中找到

**回想下原生 ajax 的写法：**

```js
let xhr = new XMLHttpRequest()
xhr.open('get', url)
xhr.setHeader(...)
xhr.onreadystatechange = () => {}
// ...各种设置
xhr.send()
```

### 首先查看 xhr.js

这里返回了一个 Promise 对象，对象内的内容便是请求的 ajax

1. 以下基本都是原生的方法

```js
var requestData = config.data;
var requestHeaders = config.headers;
var request = new XMLHttpRequest();
request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);
request.timeout = config.timeout;
request.onabort = ...
request.onerror = ...
request.ontimeout = ...
request.send()
```

2. 重点来看以下几个方法

- onreadystatechange  
  在原生中，该函数是监听请求状态的，这里处理的是返回以下的内容，这里的返回是 Promise 对象的返回，即使用 then 和 catch 调取

```js
response = {
  data: responseData,
  status: request.status,
  statusText: request.statusText,
  headers: responseHeaders,
  config: config,
  request: request
};
settle(resolve, reject, response);
// settle：（主要是resolve(response);reject(err)）
```

- progress  
  这里请求绑定了 progress 监听事件，这样我们就可以调用 onDownloadProgress 和 onUploadProgress 来构建进度变化的回调函数

```js
// Handle progress if needed
if (typeof config.onDownloadProgress === "function") {
  request.addEventListener("progress", config.onDownloadProgress);
}

// Not all browsers support upload events
if (typeof config.onUploadProgress === "function" && request.upload) {
  request.upload.addEventListener("progress", config.onUploadProgress);
}
```

使用：显示当前进度比例

```js
ajax.post("http://www.dilomen.top:3000/upload",
      formData,
      {
        headers: {'content-type': 'application/x-www-form-urlencoded'},
        onUploadProgress: progress => {
          console.log(progress.loaded / progress.total)
        }
      }
```

3. cancelToken
   本来一直以为 onabort 取消请求也同样可以像 onUploadProgress 一样，调用，但是事实是不行！！！它有特殊的处理方式，当然本质还是去调用了原生的 onabort 事件

- 首先查看 cancel 文件夹下的文件，这里都是用来处理取消请求的
  主要是 CancelToken 文件

- 找到 CancelToken 构造函数，这里返回了一个 Cancel 的生成的对象,Cancel 的成员变量只有一个 message，所以返回的就是一个带有 message 消息的对象

```js
function Cancel(message) {
  this.message = message;
}
```

- CancelToken.source 返回一个包含 token 属性和 cancel 函数的对象

使用：取消请求

```js
const cancelToken = axios.CancelToken;
const source = CancelToken.source();
// 执行下面的语句就取消请求了
source.cancel("取消");
```

### dispatchRequest.js

xhr.js 的任务是基本 ajax 的配置，dispatchRequest 就是将请求的结果 而发送 ajax 的重任就交给了 dispatchRequest.js 文件，

```js
var adapter = config.adapter || defaults.adapter;
return adapter(config).then(function onAdapterResolution(response) {
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );
    return response;
  }, ...);
```
