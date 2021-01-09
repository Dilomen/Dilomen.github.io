## 概述

async/await 是 ES7 提出的一个异步方案，其实现了以同步的方式编写异步代码。

## 实现

总所周知，该方案是基于 Generater 和 Promise 实现的语法糖。那么我们就先从 Generate 开始看吧

Generater 符合 Iterator 迭代器协议，生成一个单链表的形式的 Iterator，通过 next 调用进行有序执行

```js
function* gen() {
  yield console.log(1);
  yield console.log(2);
  yield console.log(3);
  return ...
}

let g = gen();
g.next(); // 1
g.next(); // 2
g.next(); // 3
```

这里，我们就发现和 async/await 的形式很像，将\*换成 async，yield 换成 await

```js
async function gen() {
  await console.log(1);
  await console.log(2);
  await console.log(3);
  return ...
}
let g = gen();
g.next(); // 1
g.next(); // 2
g.next(); // 3
```

而 async/await 则会自动有序的调用 next 函数

```js
async function gen() {
  await console.log(1);
  await console.log(2);
  await console.log(3);
}

async function run() {
  let g = gen();
  g.next(); // 1
  g.next(); // 2
  g.next(); // 3
  return ...
}

run().then()
```

再封装下 run 函数（自动调用 next）

```js
const run = (generator) => {
  let result;
  const g = generator();
  const next = () => {
    const result = g.next();
    if (result.done) {
      return result.value;
    }
    next();
  };
  return next();
};
run();
```

加上异步

```js
function* generator() {
  yield new Promise((resolve) => {
    resolve(1);
  });
  yield new Promise((resolve) => {
    resolve(2);
  });
  yield new Promise((resolve) => {
    resolve(3);
  });
  return 4;
}

const run = (generator) => {
  const g = generator();
  const next = () => {
    const result = g.next();
    if (result.done) {
      return result.value;
    }
    result.value.then(() => {
      next();
    });
  };
  return new Promise((resolve) => {
    resolve(next());
  });
};
run(generator).then((data) => {
  console.log(data); // 4
});
```

再将 yield 替换成 await 就很好理解了
