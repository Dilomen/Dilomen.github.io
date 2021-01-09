---
title: TypeScript的学习01
tags: TypeScript
categories: 前端
keywords: 前端,TypeScript
description: TypeScript的学习
abbrlink: 936dfcfa
date: 2019-06-27 23:02:08
---

#### --安装--

```ts
npm install typescript -g
```

#### --创建 tsconfig.json 配置文件--

```ts
tsc --init
```

#### --数据类型--

- 布尔类型（boolean）
- 数字类型（number）
- 字符串类型（string）
- 数组类型（array）
  - `let arr:number[] = [1,2,3]`
  - `let arr:Array<number> = [1,2,3]`
- 元组类型（tupln）
  - 元组类型允许表示一个已知元素数量和类型的数组
  - `let arr:[number, string, number, number]= [1,'hello',2,3]`
- 枚举类型（enum）

  - ```ts
      enum Flag = {
          success = 1, // 也可不赋值，默认值从(下标)0开始
          error = 0
      }
      let s:Flag = Flag.success
    ```

  - 常量枚举会直接写入到程序中，不会有多余的代码产生

    ```ts
    const enum temp = {
      success,
      error
    }
    ```

- 任意类型（any）
- null 和 undefined
- void 类型
- never 类型

#### **可选参数**

- 在参数定义类型前面加个？

```ts
function test(name?:string) {
}
test() 如何不加‘？’就一定要传入该参数，否则报错
```

#### **类的修饰符**

- public:公有
  - 在类里面，子类，类外面都可以访问
- protected:保护类型
  - 在类里面，子类里面可以访问，在类外面没法访问
- private:私有
  - 在类里面可以访问，子类，类外部度不能访问

#### **abstract 抽象类**

- 抽象类下声明的抽象方法无须在本类实现
- 抽象类里也可以写和普通类一样的方法，变量，构造函数等

```ts
abstract class Animal {
  abstract call(): any;
  eat() {
    console.log('1');
  }
}
```

- 抽象类的子类必须实现抽象类里面的抽象方法

```ts
class Dog extends Animal {
  call() {
    console.log('狗');
  }
}
```

#### **interface 接口**

- 规范属性和方法

  ```ts
  interface Person {
    name: string;
    age: number;
    fullName(firstName: string, lastName: string): string;
  }
  function getPerson(person: Person): void {
    console.log(person.fullName('hello', 'world'));
  }
  var fullName: Person['fullName'] = function(firstName, lastName) {
    return firstName + lastName;
  };
  getPerson({ name: 'lili', age: 22, fullName });
  ```

- 可索引接口

  - 对数组的约束

  ```ts
  interface UserArr {
    [index: number]: string;
  }
  var arr: UserArr = ['aaa', 'bbb'];
  console.log(arr[0]);
  ```

  - 对对象的约束

  ```ts
  interface UserObj {
    [index: string]: string;
  }
  var obj: UserObj = { name: 'aaa', age: '22' };
  ```

  - 对类的约束

  ```ts
  interface Animal {
    name: string;
    eat(str: string): void;
  }
  class Dog implements Animal {
    name = 'food';
    eat() {
      console.log(name);
    }
  }
  ```

- 接口拓展

```ts
interface Animal {
  eat(): void;
}
interface Person extends Animal {
  work(): void;
}
class Test implements Person {
  eat() {
    console.log('eat');
  }
  work() {
    console.log('work');
  }
}
```

#### **泛型**

- 支持不特定的数据类型 要求：传入的参数和返回的参数一致

```ts
function getValue<T>(value: T): T {
  return value;
}
getValue<number>(123);
getValue<string>('123');
```

```ts
class List<T> {
  public list: T[] = [];
  add(value: T): void {
    this.list.push(value);
  }
}
let arrList = new List<string>();
arrList.add('123');
```

#### **泛型接口**

```ts
interface Jerry<T> {
  (value: T): T;
}
function JerryDemo<T>(value: T): T {
  return value;
}
let myJerryDemo: Jerry<string> = JerryDemo;
myJerryDemo('123');
```

#### **命名空间 namespace**

- 避免同个文件下命名冲突的问题
- 不同的命名空间不能访问对方的命名空间

```ts
namespace A {
  let a = 0;
}
namespace B {
  let a = 2;
}
```

- 可以通过命名空间的名称来获取空间内的内容，但是需要使用**export**暴露出来

```ts
namespace B {
  export const a = 2;
}
let b = B.a;
console.log(b);
```

#### **装饰器**

为目标进行包装成需要的结果

#### 执行顺序

```js
function f() {
  console.log('f() evaluated');
  return function() {
    console.log('f(): called');
  };
}
function g() {
  console.log('g() evaluated');
  return function() {
    console.log('g(): called');
  };
}
class C {
  @f()
  @g()
  method() {}
}

// 类似洋葱模型: f() evaluated => g() evaluated => g(): called => f(): called
```

#### 类装饰器

对类的**构造函数**进行更改

```js
@sealed
class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  greet() {
    return 'Hello, ' + this.greeting;
  }
}
// 装饰类的构造函数为其唯一参数
function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}
```

#### 方法装饰器

```js
class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }

  @enumerable(false)
  greet() {
    return 'Hello, ' + this.greeting;
  }
}

function enumerable(value: boolean) {
  /**
   * target: 静态成员的类的构造函数或实例成员的类的原型
   * propertyKey: 成员的名称 => string 方法名
   * descriptor: 成员的属性描述符
   */
  return function(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    descriptor.enumerable = value;
  };
}
```
