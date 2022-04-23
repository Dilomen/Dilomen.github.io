## 简述

> Promise 作为 ES6 提出的一种异步解决方案，其有效的解决了之前由 callback 造成的回调地狱写法，当然过长的链式调用也不利于维护和调试。

### Promise 三种状态

- 进行中（**pending**）：操作还未开始
- 结束后进入以下两种状态中的一种：
  - 1：成功（**Fulfilled**）：操作成功
  - 2：失败（**Rejected**）：由于程序出错或别的原因，未能成功

### 自身方法

都是返回**一个 promise 对象**

#### all: 处理多个 Promise 对象，当所有 promise 对象处理完成，返回对象中包含所有的 promise 集合的状态，但是只要有一个 promise 对象返回失败（reject），那么 all 方法直接走 catch 事件

```js
var promise = Promise.all([new Promise(), new Promise()]);
```

#### race: 处理多个 Promise 对象，只要一个完成就返回完成对象的状态

```js
var promise = Promise.race([new Promise(), new Promise()]);
```

#### reject: 返回一个失败状态的 Pomise 对象

```js
var promise = new Promise((resolve, reject) => reject(err));
```

#### resolve: 返回一个成功状态的 Promise 对象，如果是 resolve(new Promise)，具体状态由内部决定

```js
var promise = Promise.resolve(Promise.resolve('interior'));
promise.then((data) => console.log(data)); // interior
```

### prototype 上的方法

#### then:截获到 resolve 出的数据或者链式调用到前者返回的 promise 对象

```js
var promise = new Promise((resolve, reject) => resolve(true));
promise.then((data) => console.log(data)); // true
promise.then((data) => data).then((data) => console.log(data)); // true
```

#### catch:截获到 reject 出的数据,或者 throw 抛出的错误

```js
var promise = new Promise((resolve, reject) => reject('Error'));
promise.catch((err) => console.log(err));
```

#### finally:无论返回的啥状态，都会被执行

```js
var promise = new Promise((resolve, reject) => reject('Error'));
promise.catch((err) => console.log(err));
```

### 链式调用

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

### 简单实现

```js
class Promise {
  static STATUS_PEDDING = 'pending';
  static STATUS_FULFILLED = 'fulfilled';
  static STATUS_REJECTED = 'rejected';
  constructor(executor) {
    this.state = Promise.STATUS_PEDDING;
    this.value = undefined;
    this.reason = undefined;
    this.execList = [];
    const resolve = (value) => {
      if (this.state === Promise.STATUS_PEDDING) {
        this.state = Promise.STATUS_FULFILLED;
        this.value = value;
        setTimeout(() => {
          this.execList.forEach((fn) => fn());
        }, 0);
      }
    };
    const reject = (reason) => {
      if (this.state === Promise.STATUS_PEDDING) {
        this.state = Promise.STATUS_REJECTED;
        this.reason = reason;
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
      // 加入定时器，让同步代码先执行
      setTimeout(() => {
        function execFn() {
          let result = onFufilled && onFufilled(_self.value);
          resolve(result);
        }
        // 解决有setTimeout等延时的情况
        if (_self.state === Promise.STATUS_PEDDING) {
          _self.execList.push(execFn);
        } else if (_self.state === Promise.STATUS_FULFILLED) {
          execFn();
        } else if (_self.state === Promise.STATUS_REJECTED) {
          onRejected && onRejected(_self.reason);
          reject(_self.reason);
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

## 实现一个 PromiseChain 方法，使得传入的 promise 数组按顺序执行

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
