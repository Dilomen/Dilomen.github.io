## 简述

Symbol 作为 ES6 新加入的基本数据类型，其主要是用来创建对象的<em>匿名属性（私有属性）</em>。同时其也是作为一种**唯一标识**的属性。

## 基本使用

可以通过全局函数 Symbol 来创建一个 Symbol，接受一个可选参数(为了代码的阅读性和维护性，还是建议写)作为 Symbol 实例的描述由于 Symbol 是原始值，所以<em>不能使用 new 的方式</em>来创建。

### 检测

因为是基本类型，所以同样支持 typeof 检测类型

```js
let TYPE_INIT = Symbol("init");
console.log(typeof TYPE_INIT);
```

### 唯一性

每一个 symbol 被创建都是唯一的，互不相等

```js
let a = Symbol();
let b = Symbol();
let c = Symbol("c");
console.log(a == b, b == c, c == a); // false false false ,==都不等于===就不用说了吧
```

### 作为对象属性

symbol 可以用作 key，但是它是<em>不可枚举</em>的，当使用 Object.keys 或者 for in 时是拿不到 symbol 属性的。但是它是可以被作为计算属性的。

```js
let TYPE_INIT = Symbol("init");
let obj = { [TYPE_INIT]: "init", a: 1 };
console.log(obj[TYPE_INIT]); // 'init'
console.log(Object.keys(obj)); // ['a']
for (let key in obj) {
  console.log(key); // 'a'
}
```

可以通过 <em>Object.getOwnPropertySymbols</em> 来获取对象中包含所有 Symbol 自有属性的数组,也可以通过反射<em>Reflect.ownKeys</em>来获取所有的自有属性

```js
let obj = {
  [Symbol("a")]: 1,
  [Symbol("b")]: 3,
  b: 2,
};

console.log(Object.getOwnPropertySymbols(obj)); // [Symbol(a), Symbol(b)]
console.log(Reflect.ownKeys(obj)); // ["b", Symbol(a), Symbol(b)]
```

### 共享体系

如果需要同一个 Symbol 来标识唯一个标识符，即 key(描述)相同的 symbol 是同一个 symbol，不同的环境可以共享 symbol。那么就需要使用到<em>Symbol 注册表</em>，类似全局环境作用域的共享环境。**当再次创建同一个描述的 symbol 时，Symbol.for 方法会先在注册表中查询，如果有，直接返回已有的 Symbol，没有则创建新的 Symbol**，类似单例模式。

```js
let a = Symbol.for("init");
let b = Symbol.for("init");
console.log(a === b); // true
```

注册表的 symbol 可以通过 <em>Symbol.keyFor 方法</em> 来获取 key 值(描述)，如果没有注册就获取不到 (undefined)

```js
let a = Symbol("init");
let b = Symbol.for("init");
console.log(Symbol.keyFor(a)); // undefined
console.log(Symbol.keyFor(b)); // 'init'
```

## 应用场景

1. 当我们需要去定义一些常量，常见的如 redux

```js
const TYPE_INIT = "TYPE_INIT";
那么我们就可以使用;
const TYPE_INIT = Symbol("TYPE_INIT");
```

2. 可以作为类的私有变量

```js
var Person = (function() {
  var symbol = Symbol("name");
  class Person {
    constructor(name) {
      this[symbol] = name;
    }
  }
  return Person;
})();
var person = new Person("name");
console.log(person[Symbol("name")]); // undefined 再也不能创建相同symbol
```
