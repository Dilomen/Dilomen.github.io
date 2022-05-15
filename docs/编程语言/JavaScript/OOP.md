---
title: js模拟传统面向对象（java为例）功能
tags: js知识补充
categories: js
keywords: js,javaScript,面向对象
description: js模拟传统面向对象（java为例）功能
abbrlink: fe917ec
date: 2019-08-25 21:40:29
---

tip:抛开 ES6 中 class，因为其本身就只是个语法糖，下面是使用 function 来实现的

#### **面向对象的三大基本特征**

封装：可以利用 js 的特性来模拟公有化，私有化等等的功能
继承：js 是通过原型链继承的，可以结合思想，模拟出父类和子类的关系
多态：js 同样可以模拟重写父类的方法，来实现不同的功能（由于 js 函数对参数没有像 java 那样严格，需要自己加参数判断，但是也没有那个必要）

#### **私有变量**

- private 私有化，被其定义的变量就是私有变量，即只有本类才能访问，外界访问不到

  - 那么想到的第一个就是 js 的函数有作用域，在**其内部直接定义的变量**就符合这个条件

```js
function Test() {
  var a = 1;
}
```

#### **静态变量或静态方法**

直接.后面加变量或静态方法就可以了

```js
Test.a = 1
Test.sayHello() {
    console.log("Hello")
}
```

**但是我觉得还是有必要把我傻逼式的想法过程记录一下：**

- static 定义的变量或方法可以直接使用类调用

  - 第一个想到一定是对象，直接通过属性调用呗，但是我们这边需要的是类，即在 js 中必须是函数
  - 再想想，java 中 static 定义的会直接进行先执行赋值（具体就不深入了,其实两者并没有关系，只是直接执行，让我联想到了立即执行函数，哈哈），那么我想到的了，立即执行函数

    ```js
    var Test = (function() {
      var a = 1;
    })();
    ```

    显然缺了点什么，连 return 都没有 Test 都没东西啊，返回 a\?也不对，看来里面还得套一层

```js
var book = (function() {
  var a = 1;
  var getA = function() {
    return a;
  };
  return {
    a,
    getA
  };
})();
```

- 空气突然宁静，这不又是返回一个对象啊，再想想函数本身就是对象，利用对象的特性，直接赋值不就可以了。。。。。

#### **“个性”的属性和方法**

构造函数可以使每个生成的新对象都有自己的属性或方法

```js
function Test(name, age) {
  this.name = name;
  this.age = age;
}
var test1 = new Test("a", 22);
var test2 = new Test("b", 24);
```

#### **共有属性或方法**

- 在 java 中可以使用不同的子类可以共用父类的某个方法或者某个属性，都是用 public 或 protected 定义

- 在 js 中同样可以使用原型来实现这个功能，首先原型链继承，就是指继承了这条“链”的任何一个对象都可以共享这条“链”上的属性或方法

```js
function Test(name, age) {}
Test.prototype = {
  b: 1,
  say() {
    console.log("我在原型链上");
  }
};
var test1 = new Test();
var test2 = new Test();
```

这样就既有自有属性方法还有共用属性方法

#### **抽象方法**

- 虽然 js 的 abstract 是关键保留字，但是它并没有实现它
- 面向对象中父类经常是抽象类，所以这边就以这个为例

```js
function Sup() {}
Sup.prototype.say = function() {
  throw new Error("我是抽象的，你不重写，我就报错");
};
function Sub() {}
Sub.prototype = new Sup();
// 如果不重写就会报错
Sub.prototype.say = function() {
  console.log("我重写了，你不要报错了");
};
```

- 这样就实现了子类必须实现父类的抽象方法
- 包括多态，也是子类去重写父类的方法，但是 js 对参数并不严格，也就是这里的继承，不会帮你判断，需要自己做处理，可以使用 arguments 来进行判断，如果不处理，那么它就是多态和重载的结合
