---
title: react的setState的执行机制
tags: React
categories: React
keywords: 前端,React
description: react的setState的执行机制
abbrlink: 15288dbd
date: 2019-08-19 20:42:05
---

## 介绍

react 中组件本身的状态是通过 state 来维护的，但是 state 不能直接进行修改，必须使用 setState 方法，将修改的 state 和原来的 state 进行比较，**组成一个新的 state**

## 使用

```js
constructor(props) {
    super(props);
    this.state = {
        value: 1
    }
}
componentDidMount() {
    this.setState({
        value: 2 // 这样value就会变成2
    })
}
```

## 此时我想在同个作用域下用这个 value 了，但是获取不到？

```js
componentDidMount() {
    this.setState({
        value: 2
    })
    console.log(this.state.value)
}
```

结果输出的还是 1，我明明已经改变它了，可是我却取不到，尚且先认为 setState 是一个异步操作，输出语句作为同步代码先执行了（js 先执行完同步代码再调取异步队列）  
**那么此刻我该如何解决？**  
解决方式（待补充）：

- async/await

```JS
async componentDidMount() {
    await this.setState({
        value: 2
    })
    console.log(this.state.value)
}
```

- setState 的第二个参数是个回调函数，可以利用它来获取

```JS
componentDidMount() {
    this.setState({
        value: 2
    }, () => {console.log(this.state.value)})
}
```

## 如果在 componentDidMount 使用多个会如何?

```js
componentDidMount() {
    this.setState({
        value: this.state.value + 1
    })
    this.setState({
        value: this.state.value + 1
    })
}
```

**结果竟然输出了 2，你哪怕是异步，也不能这么玩啊，那么问题在哪？**  
首先了解到，setState 会将钩子函数中的 state 进行**合并操作**，先将每一个 setState 加入一个 state 状态维护的队列，最终组成一个 state，然后进行渲染，那么以上两个相同的 setState 就会被合并成一个，所以只是进行了一个 setState 操作  
**为何要采取这种合并的方式**
因为 state 一变就会触发组件的重新渲染，合并能够减少渲染的次数，起到了**提高性能**的作用

## 解决合并的办法

最快解决办法就是使用函数而不是直接使用对象,这样 state 就不会合并操作

```js
componentDidMount() {
    this.setState((prevState, props) => ({
      value: prevState.value + 1
    }))
    this.setState((prevState, props) => ({
      value: prevState.value + 1
    }))
}
```

## setState 真的是异步操作吗？

首先 setState 本身不是异步代码写的，这是可以确认的，但是一遇到 setState，他就会被放到状态队列，等待被合并，所以此时它不能立即获取到新的 state，所以**可以认为是一个”异步“，但它也可能是同步的**

```JS
componentDidMount() {
    setTimeout(() => {
        this.setState({
            value: this.state.value + 1
        })
        this.setState({
            value: this.state.value + 1
        })
        console.log(this.state.value)
    })
}
```

以上的代码输出了 3，就因为多加了一个 setTimeout 定时器？  
setState 只在**合成事件和钩子函数**中是“异步”的，在**原生事件和 setTimeout**中都是同步的

## 再来深入

### 首先是 15 版本的：

- **enqueueUpdate**  
  setState 最终是通过 enqueueUpdate 函数执行 state 更新

```js
function enqueueUpdate(component) {
  ensureInjected();
  // 不需要合并更新(直接同步更新)
  if (!batchingStrategy.isBatchingUpdates) {
    batchingStrategy.batchedUpdates(enqueueUpdate, component);
    return;
  }
  // 合并更新（放到状态队列合并）
  dirtyComponents.push(component);
}
```

- **isBatchingUpdates**
  该变量是取决是否进行合并更新，true 就是进行合并更新，false 就是不进行
  在进入钩子函数前，该变量初始值为 true，当前置钩子的合并更新（包括没有进行更新操作）完成，该值就会变成 false，所以在 setTimeout 中是同步执行，不会进行合并操作

### 以下是 react16.4 之后的源码

可以看到 setState 方法是 Component 的原型方法，当我们的组件继承了 Component，我们可以通过原型链来调取 setState 方法，该方法接受 2 个参数，前者是必须是对象或者返回对象的函数，即改变的 state，后者是一个 state 改变后的回调函数

- 前面就是一个报错提示，如果第一个参数传入的不是对象或函数就报错

```js
Component.prototype.setState = function(partialState, callback) {
  invariant(
    typeof partialState === "object" ||
      typeof partialState === "function" ||
      partialState == null,
    "setState(...): takes an object of state variables to update or a " +
      "function which returns an object of state variables."
  );
  this.updater.enqueueSetState(this, partialState, callback, "setState");
};
```

- 重点就是 this.updater.enqueueSetState 方法  
  如果没有在 Component 构造函数中传入 updater 参数，那么体就会使用默认的 ReactNoopUpdateQueue

```js
this.updater = updater || ReactNoopUpdateQueue;
```

- 在 ReactNoopUpdateQueue 对象中找到以下属性，

```js
enqueueSetState: function(
    publicInstance,
    partialState,
    callback,
    callerName,
  ) {
    warnNoop(publicInstance, 'setState');
  }
```

## 总结

- setState 在钩子函数中是”异步”操作，需要等待合并，才能取到结果
- setState 在**原生事件和 setTimeout**中都是同步的，可以直接取到结果
