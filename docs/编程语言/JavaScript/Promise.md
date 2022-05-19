## 前言

> 本文对 JS 早期的其他异步实现方式不在具体展开（不在本文范畴内）。

【Promise 的历史】

- 最初由大佬们发表论文确立这种异步程序执行的概念，
- 之后 jQuery 等库实现了 Deferred API 的方式，解决 callback 书写的回调地狱，并可以使用链式调用。
- 2010 年，CommonJS 实现的 Promise/A 规范流行起来
- 为了统一不同库的差异性，产来了[Promise/A+](https://promisesaplus.com/)规范，也是 ES6 规范实现的范本

> Promise 作为 ES6 提出的一种异步解决方案，其有效的解决了之前由 callback 造成的回调地狱写法，当然过长的链式调用也不利于维护和调试。

## 状态

- 进行中（**pending**）：操作还未开始
- 结束后进入以下两种状态中的一种：
  - 1：成功（**Fulfilled**）：操作成功
  - 2：失败（**Rejected**）：由于程序出错或别的原因，未能成功

## 静态方法

都是返回**一个 promise 对象**

### resolve

返回一个成功状态的 Promise 对象，如果是 resolve(new Promise)，具体状态由内部决定

```js
var promise = Promise.resolve('interior');
promise.then((data) => console.log(data)); // interior
```

### reject

返回一个失败状态的 Pomise 对象

```js
var promise = Promise.reject('error');
promise.catch((err) => console.log(err)); // error
```

### all

处理多个 Promise 对象，当所有 promise 对象处理完成，返回对象中包含所有的 promise 集合的状态，但是只要有一个 promise 对象返回失败（reject），那么 all 方法直接走 catch 事件

```js
var promise = Promise.all([new Promise(), new Promise()]);
```

### race

处理多个 Promise 对象，只要一个完成就返回完成对象的状态

```js
var promise = Promise.race([new Promise(), new Promise()]);
```

## 原型方法

### then

截获到 resolve 出的数据或者链式调用到前者返回的 promise 对象

```js
var promise = new Promise((resolve, reject) => resolve(true));
promise.then((data) => console.log(data)); // true
promise.then((data) => data).then((data) => console.log(data)); // true
```

### catch

截获到 reject 出的数据,或者 throw 抛出的错误

```js
var promise = new Promise((resolve, reject) => reject('Error'));
promise.catch((err) => console.log(err));
```

promise 中报的错需要该 API 捕获，try/catch 无法捕获到，因为 try/catch 是捕获同步代码的异常，异步代码执行时，执行上下文已经不太 try/catch 中了

```js
try {
var promise = new Promise((resolve, reject) => {
    throw new Error('aaaaa')});
} catch(err) {
    console.log(err)； // 无法捕获
}
```

### finally

无论返回的啥状态，都会被执行

```js
var promise = new Promise((resolve, reject) => reject('Error'));
promise.catch((err) => console.log(err));
```

## 链式调用

首先能链式调用一定是前者返回的对象下有可执行的对应方法，该方法又返回了对象，然后就可以不断的链式调用

- 比如方法都会返回 this，那么就可以一直取到第一个对象

```js
var obj = {};
obj.sayHello = function() {
  console.log('Hello');
  return this;
};
obj
  .sayHello()
  .sayHello()
  .sayHello();
```

- 同理，那么能链式调用 then，catch，finally，一定是因为返回了 promise 对象，但这是由 Promise 内部封装返回的，我们 return 出来的数据会内部返回对象进行包装，用 resolve 包裹

```js
var promise = new Promise((resolve, reject) => resolve('true'));
promise.then((data) => data).then((data) => data);
// 相当于 ==>
// 只不过这层Promise是有then方法中封装的，无需我们自己处理
promise
  .then((data) => Promise.resolve(data))
  .then((data) => Promise.resolve(data));
```

## 实现

首先定义构造函数，它有返回的 value，当前的状态 state 和错误时返回的 reason。

### 状态存储

```js
class Promise {
  constructor() {
    this.state = 'pending';
    this.value = undefined;
    this.reason = undefined;
  }
}
```

它接受一个执行函数，并将 resolve 和 reject 作为参数

```js
// new Promise((resolve, reject) => {});
class Promise {
  constructor(executor) {
    this.state = 'pending';
    this.value = undefined;
    this.reason = undefined;
    const resolve = () => {};
    const reject = () => {};
    // 也就是传入的函数会被直接作为同步代码直接执行！
    executor(resolve, reject);
  }
}
```

### then 处理

当我们用 then 去调用的时候需要根据当前的状态处理不同的情况。其接受两个参数 onFufilled 方法和 onRejected 方法，分别作为成功状态和失败状态执行的内容。

```js
// new Promise((resolve, reject) => {}).then((data) => {}, (err) => {});
class Promise {
  // constructor ...
  then(onFufilled, onRejected) {
    // setTimeout会改变this执行，所以做缓存
    const _self = this;
    // 因为这部分代码是模拟微任务，借助setTimeout来实现，让同步代码等宏任务先执行完成
    setTimeout(() => {
      // 如果前面的内容还没有执行完成
      if (_self.state === 'pending') {
      }
      // 如果前面的内容处理完成了并成功了
      else if (_self.state === 'fulfilled') {
      }
      // 如果前面的内容处理完成了但失败了
      else if (_self.state === 'rejected') {
      }
    }, 0);
  }
}
```

成功和失败，就是直接调用对应的函数（这边链式调用先不考虑，减少思考负担）

```js
if (_self.state === 'pending') {
}
// 如果前面的内容处理完成了并成功了
else if (_self.state === 'fulfilled') {
  onFufilled && onFufilled();
}
// 如果前面的内容处理完成了但失败了
else if (_self.state === 'rejected') {
  onRejected && onRejected();
}
```

而还未结束的状态，就需要前面内容执行完成，也就是等待 resolve 的通知（调用）

```js
// new Promise((resolve) => {
//   // 阻塞代码
//   resolve(value);
// }).then((value) => {});
```

因此它需要将待执行的内容存储起来，在状态完成时（调用 resolve 或者 reject）进行执行

```js
class Promise {
  constructor(executor) {
    this.execFufillList = [];
    this.execRejectList = [];
    const resolve = (value) => {
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.value = value;
        this.execFufillList.forEach((fn) => fn());
      }
    };
    const reject = (reason) => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.reason = reason;
        this.execRejectList.forEach((fn) => fn());
      }
    };
  }

  then(onFufilled, onRejected) {
    // ...
    if (_self.state === 'pending') {
      this.execFufillList.push(onFufilled);
      this.execRejectList.push(onRejected);
    }
  }
}
```

### 链式调用实现

到此基本的执行就解决了，那还有一个问题就是链式调用，返回一个 promise，并且会把之前的内容携带

首先是两个静态方法，接受对应的数据和原因作为参数，返回一个新的 Promise 实例，并调用对应的成功或失败处理

```js
class Promise {
  static resolve(value) {
    return new Promise((resolve, reject) => {
      resolve(value);
    });
  }

  static reject(reason) {
    return new Promise((resolve, reject) => {
      reject(reason);
    });
  }
}
```

then 也是同理

```js
then() {
  // ...
  if (_self.state === Promise.STATUS_PEDDING) {
    function execFn() {
      let result = onFufilled && onFufilled(_self.value);
      resolve(result);
    }
    _self.execList.push(execFn);
  } else if (_self.state === Promise.STATUS_FULFILLED) {
     let result = onFufilled && onFufilled(_self.value);
      resolve(result);
  } else if (_self.state === Promise.STATUS_REJECTED) {
    onRejected && onRejected(_self.reason);
    reject(_self.reason);
  }
}
```

### catch 实现

catch 和 then 的第二个参数 onRejected 处理其实一样

```js
catch(fn) {
  return this.then(null, fn);
}
```

### 完整代码

```js
class Promise {
  static STATUS_PEDDING = 'pending';
  static STATUS_FULFILLED = 'fulfilled';
  static STATUS_REJECTED = 'rejected';
  constructor(executor) {
    this.state = Promise.STATUS_PEDDING;
    this.value = undefined;
    this.reason = undefined;
    this.execFufillList = [];
    this.execRejectList = [];
    const resolve = (value) => {
      if (this.state === Promise.STATUS_PEDDING) {
        this.state = Promise.STATUS_FULFILLED;
        this.value = value;
        this.execFufillList.forEach((fn) => fn());
      }
    };
    const reject = (reason) => {
      if (this.state === Promise.STATUS_PEDDING) {
        this.state = Promise.STATUS_REJECTED;
        this.reason = reason;
        this.execRejectList.forEach((fn) => fn());
      }
    };

    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  then(onFufilled, onRejected) {
    const promise = new Promise((resolve, reject) => {
      const _self = this;
      setTimeout(() => {
        function execFufillFn() {
          let result = onFufilled && onFufilled(_self.value);
          resolve(result);
        }
        function execRejectFn() {
          onRejected && onRejected(_self.reason);
          reject(_self.reason);
        }
        if (_self.state === Promise.STATUS_PEDDING) {
          _self.execFufillList.push(execFufillFn);
          _self.execRejectFn.push(execRejectFn);
        } else if (_self.state === Promise.STATUS_FULFILLED) {
          execFufillFn();
        } else if (_self.state === Promise.STATUS_REJECTED) {
          execRejectFn();
        }
      }, 0);
    });
    return promise;
  }

  catch(fn) {
    return this.then(null, fn);
  }

  static resolve(value) {
    return new Promise((resolve, reject) => {
      resolve(value);
    });
  }

  static reject(value) {
    return new Promise((resolve, reject) => {
      reject(value);
    });
  }

  static race(promises) {
    return new Promise((resolve, reject) => {
      for (let i = 0; i < promises.length; i++) {
        promises[i]
          .then((data) => {
            resolve(data);
          })
          .catch((err) => err);
      }
    });
  }

  static all(promises) {
    let length = promises.length;
    let arr = new Array(length);
    return new Promise((resolve, reject) => {
      for (let i = 0; i < length; i++) {
        promises[i]
          .then((data) => {
            arr[i] = data;
          })
          .catch((err) => reject(err));
      }
      resolve(arr);
    });
  }
}
```

## 拓展一下

实现一个 PromiseChain 方法，使得传入的 promise 数组按顺序执行

```js
const promise1 = () =>
  new Promise((resolve) => {
    console.log('执行promise1');
    setTimeout(() => {
      resolve('执行promise2');
    }, 1000);
  });
const promise2 = (data) =>
  new Promise((resolve) => {
    console.log(data);
    resolve('执行promise3');
  });
const promise3 = (data) =>
  new Promise((resolve) => {
    setTimeout(() => {
      console.log(data);
      resolve('执行完毕');
    }, 50);
  });

function promiseChain(promiseList) {
  let promise = promiseList.shift();
  while (promiseList.length) {
    if (promise instanceof Function) promise = promise();
    // then 接受两个参数 onFufilled, onRejected 作为结果的调用，then返回一个promise
    promise = promise.then(promiseList.shift(), (err) => console.log(err));
  }
  promise.then((data) => console.log(data));
  return promise;
}

promiseChain([promise1, promise2, promise3]);
```

```js
// 使用async/await
async function promiseChain(promiseList) {
  let preData = null;
  for (let promise of promiseList) {
    preData = await promise(preData);
  }
}
```

## 参考

- 《JavaScript 高级程序设计》（第 4 版）
- 《JavaScript 忍者秘籍》（第 2 版）
- 《深入理解 ES6》
