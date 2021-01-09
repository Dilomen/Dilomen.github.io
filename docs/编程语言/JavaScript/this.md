## this 到底指向谁

this 的指向取决于谁调用，谁(上一级)调用，this 就指向谁

#### 1. 没有上级对象，就是 window 对象，如果在严格模式下，会是 undefined

```js
var a = 1;
function test() {
  console.log(this.a);
}
test(); // 1  --> this指向了window
```

```js
var a = 1;
function test() {
  "use strict";
  console.log(this.a);
}
test(); // a is undefined
```

#### 2. 有上一级调用的，就指向上一级

```js
var a = 1;
var obj = {
  a: 2,
  test: function() {
    console.log(this.a);
  }
};
obj.test(); // 2  --> this指向了obj
```

```js
var objSup = {
  a: 3,
  obj
};
objSup.obj.test(); // 2 --> 即使再多一层，也是指向上一级
```

#### 3. 如果方法被赋值给一个变量，那么同样的规则转移到那个变量上，即根据谁调用那个变量，this 就指向谁

```js
var a = 1;

var obj = {
  a: 2,
  test: function() {
    console.log(this.a);
  }
};

var b = obj.test;
b(); // 1 --> 由于是window调用的，所以this指向window
```

#### 4. new 会将 this 指向生成的实例对象

```js
var Test = function() {
  this.a = 1;
};
var test = new Test();
console.log(test.a); // 1 --> this指向了生成的test实例对象
```

#### 5. setTimeout 的 this 指向在非严格模式下，是指向 window，在严格模式下，是 undefined

```js
var a = 1;
var obj = {
  a: 2,
  test: function() {
    setTimeout(function() {
      console.log(this.a);
    }, 10);
  }
};
obj.test(); // 1 --> this指向了window
```

#### 6. 立即执行函数的 this 指向 window

因为立即执行函数一般都是直接由 window 调用

```js
var a = 1;
var obj = {
  a: 2,
  test: function() {
    console.log("1", this.a); // 2
    (function() {
      console.log("2", this.a); // 1
    })();
  }
};
obj.test();
```

#### 7. 箭头函数

- 箭头函数是根据外层（**函数或全局**）作用域来决定 this，而不是看谁调用
  - tip:如果直接将箭头函数赋值给对象的属性,该箭头函数的 this 指向全局，因为对象不是函数，所以外层作用域为全局
- 箭头函数无法通过 bind,call,apply 来直接修改（可以间接修改）
- 改变作用域中 this 的指向可以改变箭头函数的 this
- 直接将箭头函数赋值给对象的属性,该箭头函数的 this 指向全局
- 不可以使用 new 命令

```js
var name = "window";

var person1 = {
  name: "person1",
  show1: function() {
    console.log(this.name);
  },
  show2: () => console.log(this.name),
  show3: function() {
    return function() {
      console.log(this.name);
    };
  },
  show4: function() {
    return () => console.log(this.name);
  }
};
var person2 = { name: "person2" };

person1.show1(); // person1调用,所以this -> person1
person1.show1.call(person2); // call绑定person2,所以this -> person2

person1.show2(); // 外层作用域是window,所以this -> window
person1.show2.call(person2); // 箭头函数不能通过call来改变this，所以this -> window

person1.show3()(); // 第一次执行，this指向了返回的函数作用域，第二次直接算全局调用，所以this -> window
person1.show3().call(person2); // 第二次绑定在person2上，所以this -> person2
person1.show3.call(person2)(); // 第一次绑定在person2上，但是第二次还是返回函数作用域，由全局调用，所以this -> window

person1.show4()(); // 第一次指向返回的箭头函数，由于箭头函数指向外层作用域，所以this -> person1
person1.show4().call(person2); // 第一次指向返回的箭头函数，call无法改变箭头函数的指向，所以this -> person1
person1.show4.call(person2)(); // 先绑定到了person2，返回的箭头函数的外层作用域便成了person2，所以this -> person2
```

```js
var name = "window";

function Person(name) {
  this.name = name;
  this.show1 = function() {
    console.log(this.name);
  };
  this.show2 = () => console.log(this.name);
  this.show3 = function() {
    return function() {
      console.log(this.name);
    };
  };
  this.show4 = function() {
    return () => console.log(this.name);
  };
}

var personA = new Person("personA"); // this -> personA
var personB = new Person("personB"); // this -> personB

personA.show1(); // this指向生成的对象，所以this -> personA
personA.show1.call(personB); // call绑定personB，所以this -> personB

personA.show2(); // personA是new绑定的，生成新的构造函数作用域，箭头函数的外层作用域就是personA函数，所以this -> personA
personA.show2.call(personB); // 箭头函数步伐通过call改变this指向，所以this -> personA

personA.show3()(); // 返回的是函数，第二次直接是全局调用该返回函数，所以this -> window
personA.show3().call(personB); // 返回的函数被绑定在personB上，所以this -> personB
personA.show3.call(personB)(); // 由于第二次的调用是全局的，所以this -> window

personA.show4()(); // 第一次返回的是箭头函数，外层作用域是personA，所以this -> personA
personA.show4().call(personB); // 箭头函数无法通过call改变，所以this -> personA
personA.show4.call(personB)(); // 先绑定personB的函数作用域，返回的箭头函数就指向了personB外层作用域，所以this -> personB
```

### this 指向问题

```js
var num = 1;
var myObject = {
  num: 2,
  add: function() {
    this.num = 3;
    (function() {
      console.log(this.num); // 直接执行函数this -> window
      this.num = 4; // 改变全局的变量num -> 4
    })();
    console.log(this.num);
  },
  sub: function() {
    console.log(this.num);
  }
};
myObject.add(); // 由于myObject调用函数，所以this指向myObject，所以this.num会覆盖num:2, 然后直接执行函数指向全局，所以先输出 1 ，然后输出自己this中的num，已被覆盖的 3
console.log(myObject.num); // myObject的num已被覆盖成3，所以输出 3
console.log(num); // 全局的num，已被改为 4
var sub = myObject.sub;
sub(); // 全局调用，所以this指向全局，输出 4
```

## 显式绑定

既然 this 这么容易出现指向问题，那么我们就需要通过显式绑定 this 的指向来减少因 this 引发的问题

JS 提供了 call，apply，bind 三种方法

- call 和 apply 都是改变某个函数运行时上下文的 this，两者区别只是第二个参数，apply 需要传一个数组，而 call 需要拆分开

```js
var a = 1;
var obj = {
  a: 2,
  test: function(m, n) {
    console.log(this.a, m, n);
  }
};
obj.test.call(window, 1, 2); // 1 1 2
obj.test.apply(window, [1, 2]); // 1 1 2
```

- bind 会创建一个新函数，称为绑定函数，所以每次执行，绑定函数会将 this 指向传入第一个的一个参数，然后调用原函数

```js
var a = 1;
var obj = {
  a: 2,
  test: function(m, n) {
    console.log(this.a, m, n);
  }.bind(window)
};
obj.test(1, 2); // 1 1 2
```

- call 和 apply 都是立即执行，而 bind 返回一个函数，需要再调用才执行