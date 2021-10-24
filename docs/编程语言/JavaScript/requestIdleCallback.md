## 概述

requestIdleCallback 是让一些低优先级的函数能够在浏览器空间状态下执行的一个 API.
是 React Fiber 机制也是实现了类似功能的.

- 低优先级: 就是不需要被立即执行,且不是别的函数的执行依赖等等的内容
- 空闲状态: 当前帧在执行完别的任务后,还有剩余时间,且该时间内没有别的内容被执行(下文有关执行的详细内容)

该 API 目前目前在 IE 和 Safari 浏览器中没有被支持
<a data-fancybox title="requestIdleCallback的浏览器支持情况" href="/JavaScript/requestIdleCallback的浏览器支持情况.png">![requestIdleCallback的浏览器支持情况](/JavaScript/requestIdleCallback的浏览器支持情况.png)</a>

## 使用

该 API 接受一个函数 callback,该函数即是在空闲状态下被执行的函数

第二个参数为可选,是一个对象,可以传入一个 timeout,表示如果一旦超过这个 timeout 设置时间,该函数依旧没有被执行的话,不管当前是否是空闲状态都会被放入队列执行

```js
const handle = window.requestIdleCallback(callback, options);

const handle = window.requestIdleCallback(callback, { timeout: 1000 });
```

callback 会接收一个 idleDeadline 的参数,该参数包含以下两个信息

- didTimeout: 是否超时,即该方法被注册到现在是否超过了 timeout 设置的时间
- timeRemaining: 剩余时间,当前帧执行完别的内容后的剩余时间,调用的时候必须写成 idleDeadline.timeRemaining,或者以 call 的形式,因为该方法的 this 需要指向 idleDeadline

## 执行

首先当浏览器上的显示内容都是一帧一帧渲染出来,当 FPS 在 60 时,即 1s 能够渲染 60 帧(<em>1000ms/60=16ms/帧</em>)的时候,用户在视觉体验上才没有卡顿的感觉.

再来看一帧内容上会执行哪些内容,用户的交互、js 的执行、以及 requestAnimationFrame 的调用，布局计算以及页面的重绘等工作

<a data-fancybox title="页面的执行内容" href="/JavaScript/页面的执行内容.webp">![页面的执行内容](/JavaScript/页面的执行内容.webp)</a>

<a data-fancybox title="页面的执行内容2" href="/JavaScript/页面的执行内容2.png">![页面的执行内容2](/JavaScript/页面的执行内容2.png)</a>

那么一帧在执行完以上内容(不一定每一帧都有以上的执行内容)后,还有剩余的时间,比如 16ms 只被用了 10ms,那么剩余的 6ms 就会被 requestIdleCallback 用来执行 callback 内容

<a data-fancybox title="requestIdleCallback在performance下的执行时机" href="/JavaScript/requestIdleCallback在performance下的执行时机.png">![requestIdleCallback在performance下的执行时机](/JavaScript/requestIdleCallback在performance下的执行时机.png)</a>

## 实战

> 没有别的多余内容的执行情况下

1. 没有超时并且还有剩余时间

```js
const handle = (idleDeadline) => {
  console.log(`当前是否超时: ${idleDeadline.didTimeout}`); // false
  console.log(`剩余时间是: ${idleDeadline.timeRemaining()}`); // 10.8, 这个数值不一定
};

window.requestIdleCallback(handle, {
  timeout: 1000,
});
```

2. 超时了,一定执行,其会被放入队列中等待执行,不会在放到下一帧,所以剩余时间也是 0

```js
const handle = (idleDeadline) => {
  console.log(`当前是否超时: ${idleDeadline.didTimeout}`); // true
  console.log(`剩余时间是: ${idleDeadline.timeRemaining()}`); // 0
};

window.requestIdleCallback(handle, {
  timeout: 10,
});

requestAnimationFrame(() => {
  const now = +new Date(),
    useTime = 100;
  while (+new Date() < now + useTime);
  console.log(`requestAnimationFrame执行了${useTime}ms时间`);
});
```

3. 设置一堆低优先级的任务,在每一帧空闲状态下执行,并且不会超时的情况下,每个任务开始前都会看当前是否处于空闲状态,或者说是否还有没有用完的时间片,如果有就执行,<em>不管该内容的执行时间是否会大于剩余时间,都会执行完</em>,如果没有,且没有超时,那么就会放到下一帧的去执行

```js
const taskItem = (name, time) => {
  const now = +new Date(),
    timespent = 10;
  while (+new Date() < now + timespent);
};
let task = [
  (time) => taskItem("A", time),
  (time) => taskItem("B", time),
  (time) => taskItem("C", time),
  (time) => taskItem("D", time),
];
let handle = (idleDeadline) => {
  if (task.length === 0) return;
  while (
    (idleDeadline.didTimeout || idleDeadline.timeRemaining() > 0) &&
    task.length > 0
  ) {
    console.log(`剩余${idleDeadline.timeRemaining()}ms时间`);
    task[task.length - 1]();
    task.pop();
  }
  if (task.length === 0) {
    return;
  } else {
    console.log("当前没有空余时间了");
    window.requestIdleCallback(handle, {
      timeout: 1000,
    });
  }
};
window.requestIdleCallback(handle, {
  timeout: 1000,
});

// 剩余14.6ms时间
// 剩余1.8ms时间
// 当前没有空余时间了
// 剩余9.6ms时间
// 当前没有空余时间了
// 剩余7.1ms时间
```

## 兼容方案

可以从浏览器的支持程度可见,该 API 还是需要一定的兼容方案的,而 React 就是自己利用 MessageChannel 实现类似功能.

简单模拟

```js
let deadline;
let pendingCallback = null;
let initTime = performance.now();
let timeout = null;
const channel = new MessageChannel();
window.requestHostCallback = function(callback, options) {
  // 一帧结束的时间: 利用每一帧开始的时间 + 一帧使用的时间(这个不同设备有不同的值)
  requestAnimationFrame((rafTime) => {
    deadline = rafTime + 1000 / 60;
    pendingCallback = callback;
    options && (timeout = options.timeout);
    channel.port2.postMessage(null);
  });
};

channel.port1.onmessage = () => {
  // 是否有剩余时间: 一帧结束的时间 - 当前时间
  let timeRemaining = deadline - performance.now();
  timeRemaining = timeRemaining < 0 ? 0 : timeRemaining;
  const didTimeout = timeout
    ? timeout + initTime < performance.now()
      ? true
      : false
    : false;
  if (timeRemaining || didTimeout) {
    pendingCallback &&
      pendingCallback({
        didTimeout,
        timeRemaining,
      });
  }
};
```
