## 概述

Hooks 是 React16.8 推出的产物。

官方描述的是其可以让你在不需编写类的情况下，还能使用组件状态和其他 React 功能。

回顾之前的版本，React 允许使用 Class 类和 Function 纯函数两种方式来编写 React 组件。虽然纯函数是 React 更为推荐的方式，但是其缺少了部分类所具备的能力，比如没有状态管理，那么 Hooks 就是为了解决类似问题，让你更好的在没有使用类的情况下，编写组件。

而且其更为重要的功能是，它能为开发者在编写 React 代码的时候，通过一些 API 方式更加直观的表现 state、context、refs 及生命周期的使用，更加<em>方便封装和复用</em>，且逻辑更加清晰、代码更加简洁，将作用在一起的逻辑更好的划分。

:::tip
Hook 是渐进式的  
即其不会影响原有的一些开发方式，Hook 与 Class 共存，但是推荐你可以使用 Hook 来开发或者改变原有的代码
:::

## useState

提供给组件一个管理状态的功能

```js
const [state, setState] = useState(initialState);
```

以前的版本

```jsx
class ManageTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1,
    };
  }

  changeCount = () => {
    this.setState({
      count: 2,
    });
  };

  render() {
    return <p onClick={changeCount}>{this.state.count}</p>;
  }
}
```

使用 Hook

```jsx
import { useState } from "react";
function ManageTest(props) {
  const [count, setCount] = useState(2);
  return <p onClick={changeCount}>{count}</p>;
}
```

#### 注意点

- 返回一个状态和改变状态的方法，并通过数组结构的方式获取
- 支持初始化基本变量和应用类型

```js
const [text, setText] = useState("hello");
const [info, setInfo] = useState({ name: "Jack", age: 22 });
```

- 改变状态的方法，可以直接接受被改变后的数据，也可以接受一个返回改变数据的函数

```js
setCount(2);
setCount(count + 1);
setCount((preCount) => preCount + 1);
```

- 直接写数据会被合并

```js
const [count, setCount] = useState(1);
setCount(count + 1); // 2
setCount(count + 1); // 2
```

- 直接数据和使用函数也会合并

```js
const [count, setCount] = useState(1);
setCount(count + 1); // 2
setCount((preCount) => preCount + 1); // 2
setCount(count + 1); // 2
```

- 只有函数作为参数和函数之间则不会合并，都会执行

```js
const [count, setCount] = useState(1);
setCount((preCount) => preCount + 1); // 2
setCount((preCount) => preCount + 1); // 3
```

## useEffect

可以充当 componentDidMount，componentDidUpdate 和 componentWillUnmount 三个生命周的作用

```js
useEffect((effect: Function), [dep]);
```

以前的版本

```jsx
class Test extends React.Component {
  componentDidMount() {
    /* do something */
    setInterval(/* do something */);
  }
  componentDidUpdate() {
    /* do something */
  }
  componentWillUnmount() {
    clearInterval(/* do something */);
  }
}
```

使用 Hook

```jsx
import { useEffect } from "react";
function Test() {
  useEffect(() => {
    /* do something */
    setInterval(/* do something */);
    return () => {
      clearInterval(/* do something */);
    };
  }, []);
}
```

#### 注意点

- 可以通过 return 返回一个方法来清除组件销毁时的一些造成副作用的东西，比如内存泄漏
  return 后的函数,当 deps 为空数组时其就是 unmount 的作用,当 deps 不是空数组,有依赖时,会在依赖改变的时候进行执行先执行,再进行前部分内容,相当于“unmount”=>updated,当然在组件卸载时,无论有无依赖都会被执行 return 后的内容,执行顺序就是代码顺序,谁写在前面,谁就先执行

```jsx
useEffect(() => {
  /* do something */
  return () => {
    clearInterval(/* do something */);
  };
}, []);
```

- 第二个参数，相当于 effect 的依赖项，只有当该参数内的数据发生变化时，effect 才会执行。相当于帮助你做了 update 时的判断。
  - 如果<em>没有写第二个参数</em>，就是<em>每次都会执行</em>，不管什么数据更新
  - 如果第二个参数是<em>空数组</em>，那么只会执行 Mount 和 Unmount
  - 如果是如\[count]，那么只有当 count 发生变化的时候，才会执行 effect 函数

## useContext

提供更加便捷的方式使用 Context

```js
const value = useContext(MyContext);
```

以前的版本

```jsx
const Context = React.createContext()
<Context.Provider value={{text: 'Hello'}}>
    <Test />
</Context.Provider>

class Test extends React.Component {
    render() {
        return <Context.Consumer>
            { ({text}) => <p>{text}</p> }
        </Context.Consumer>
    }
}
```

使用 Hooks

```jsx
const Context = React.createContext()
<Context.Provider value={text: 'Hello'}>
    <Test />
</Context.Provider>

function Test() {
    const context = useContext(Context)
    return <p>{context.text}</p>
}
```

#### 注意点

- 参数直接就是 Context，而不是 Consumer 和 Provider

```js
useContext(Context);
```

## userReducer

借用了类似 redux 的使用方式，对复杂状态的统一管理方式

```js
const [state, dispatch] = useReducer(reducer, initialArg, init);
```

```js
const initialState = {count: 0}
function reducer(state, action) {
    switch(action.type) {
        case 'add':
            return { count: ++state.count }
        case 'reduce':
            return { count: --state.count }
        default
            return state.count
    }
}

function Test() {
    const [state, dispatch] = useReducer(reducer, initialState)
    return (<>
        {state.count}
        <button onClick={() => dispatch({type: 'add'})}>+</button>
        <button onClick={() => dispatch({type: 'reduce'})}>-</button>
    </>)
}
```

## useMemo

如果你学过 vue，你就一定知道计算属性 computed，那么 useMemo 也就是返回这个一个根据依赖项而生成的数据

```js
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

```js
import React, { useMemo } from "react";
function Test(props) {
  const { count } = props;
  const handleValue = (value) => {
    return value * 2;
  };
  const value = useMemo(() => handleValue(count), [count]);
  return <p>{value}</p>;
}
```

#### 注意点

- 可以将一些经常要被重复计算数据利用 useMemo 来做“缓存”，从而提升性能
- 传入 useMemo 的函数会在渲染期间执行
- 如果没有依赖数组，useMemo 在每次渲染时都会计算新的值

## useCallback

返回一个回调函数，该函数执行会根据所依赖项的变化而变化，所以其就是返回的和 useMemo 不一样而已，useCallback(fn, deps) 相当于 useMemo(() => fn, deps)。

```js
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

```js
import React, { useCallback } from "react";

function Test(props) {
  const { count } = props;
  const handleValue = (a) => {
    return a * 2;
  };
  const getValue = useCallback(() => handleValue(count), [count]);
  return <p>{getValue()}</p>;
}
```

## useRef

获取组件的真实 DOM

```js
const refContainer = useRef(initialValue);
```

```js
function Test() {
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  });
  return <input ref={inputRef} />;
}
```

## 自定义 Hook

可以借助已有的 Hook 进行拓展，也可以自己从零编写

比如，模拟登陆状态

```js
import { useState, useEffect } from "react";
function useFriend() {
  const [inOnline, setIsOnline] = useState("未登陆");
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOnline("已登录");
    }, 1000);
    return () => clearTimeout(timer);
  }, [inOnline]);
  return inOnline;
}
export default useFriend;
```
