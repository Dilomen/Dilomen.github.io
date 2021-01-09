## 简述

Component 是 React 所有组件（类形式）都必须继承的接口和抽象类。

首先看到 Component 继承于 ComponentLifecycle，也就是生命周期，暂且不管，看看其余结构

```js
interface Component<P = {}, S = {}, SS = any>
  extends ComponentLifecycle<P, S, SS> {}
```

context 的处理，可以通过 contextType 就近寻找 context

```js
static contextType?: Context<any>;
context: any;
```

constructor，可见新版本 prop 规定了只读，以及将 context 移除

```js
constructor(props: Readonly<P>);
// 废弃
constructor(props: P, context?: any);
```

setState 可以看出第一个参数可以是函数也可以是对象，但是同一个上下文内最好统一，第二个参数是一个回调函数。所以我们调用的 this.setState 也都是继承于 Component 的

```js
setState<K extends keyof S>(
    state: ((prevState: Readonly<S>, props: Readonly<P>) => (Pick<S, K> | S | null)) | (Pick<S, K> | S | null),
    callback?: () => void
): void;
```

forceUpdate 可以手动强制渲染当前组件，render 就是我们所要渲染的组件内容

```js
forceUpdate(callback?: () => void): void;
render(): ReactNode;
```

props 和 state

```js
readonly props: Readonly<P> & Readonly<{ children?: ReactNode }>;
state: Readonly<S>;
```

refs，之前的refs是通过this.refs.content
```js
// 废弃
refs: {
    [key: string]: ReactInstance
};
```
