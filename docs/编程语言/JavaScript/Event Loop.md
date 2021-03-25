## 概述

Event Loop 即事件循环，是 JS 执行的代码时，协调各种操作（事件，网络，用户交互等）的一种解决方式。

<a data-fancybox title="Event Loop" href="/JavaScript/EventLoop.gif">![Event Loop](/JavaScript/EventLoop.gif)</a>

> 转载于<https://medium.com/@jonathan_wong/what-are-javascript-event-loops-30c72a6ab674>

首先 JS 是通过调用栈取队列中的任务顺序执行的，那么根据分类，它会先进行宏任务（Macrotask）队列的任务执行，当宏任务队列为空后，并且调用栈为空，那么执行微任务，微任务为空后，再执行宏任务，以此循环便是 Event Loop 的执行机制

## 背景

由于 JS 作为一门单线程语言，所以一旦发生堵塞，那么就会造成页面"卡死"或者资源浪费，所以就需要将任务进行分类（宏任务和微任务）处理

- Microtask 微任务
  - process.nextTick
  - promise
  - Object.observe (废弃)
  - MutationObserver
- Macrotask 宏任务
  - setTimeout
  - setImmediate
  - setInterval
  - I/O
  - UI 渲染

#### setTimeout

```js
Promise.resolve().then(() => {
  console.log('async');
});
setTimeout(() => {
  console.log('setTimeout');
}, 0);
```

上述执行结果：async setTimeout

#### 不是宏任务先执行，再执行微任务的吗？setTimeout 作为宏任务是怎么做到在微任务之后执行的呢

虽然 JS 是单线程的，但是浏览器是多线程的呀！所以 JS 可以通过一些 webAPI 来处理这些异步操作，如 setTimeout，DOM 操作，以及 AJAX 请求，这些处理都会先交给浏览器，当执行对应的回调时，那么浏览器就会把回调加入到宏任务队列中
:::tip 图解
<a data-fancybox title="Event Loop" href="/JavaScript/EventLoop.png">![Event Loop](/JavaScript/EventLoop.png)</a>
:::

setTimeout 会在整个同步代码执行完成以及任务队列（微任务）都完成之后再执行，也就是说即使设置的时间为 0，也是会被阻塞的

```js
let i = 0
for (i = 0; i < 100000; i++) {
  i++;
}
console.log(i)
new Promise((resolve) => {
  let i = 0
  for (i = 0; i < 200000; i++) {
    i++;
  }
  resolve(i);
}).then((data) => {
  console.log(data);
});
setTimeout(() => {
  console.log(300000);
}, 0);

先输出100000,再输出200000，再输出300000
```

#### 实现简单的逻辑

```js
while (true) {
  while (MacrotaskQueue.hasTasks()) {
    let task = MacrotaskQueue.shift();
    execute(task);
  }
  while (Microtask.hasTasks()) {
    let task = MacrotaskQueue.shift();
    execute(task);
  }
  // 重绘
  if (isRepaintTime) {
    repaint();
  }
}
```

## 浏览器剖析

> 由于 Chrome 占比比较大，所以就以 Chrome 为例

首先编写以下代码

```html
<body>
  <div class="box"></div>
</body>
<style>
  .box {
    width: 100px;
    height: 100px;
  }
</style>
<script>
  new Promise((resolve) => {
    resolve(2);
  }).then((data) => {
    console.log(data);
  });
  console.log(1);
  setTimeout(() => {
    console.log(3);
  }, 100);
</script>
```

首先借助 chrome detvool 中的 performance，可以看到有多个执行的线程，而我们的代码主要是由主线程来执行的

![performance_thread](/JavaScript/performance_thread.png)

## 关于 Node

Node 的 Event Loop 的话，不用考虑 DOM 等操作，但是也多了两个新 API：nextTick 和 setImmediate
<a data-fancybox title="Node Event Loop" href="/JavaScript/NodeEventLoop.png">![Node Event Loop](/JavaScript/NodeEventLoop.png)</a>

> 转载于<https://www.c-sharpcorner.com/article/node-js-event-loop/>

由图可知其是为了实现异步 I/O 将某些任务交给了线程池来工作，当线程池有事件完成，就会通知，然后 Event Loop 就会取到处理后的结果
