## 简述

context 是为了方便多层传递数据而诞生的。
当我们需要使用到一个数据，需要传递多层的时候，props 往往显得心累，而我们又不需要引入 redux 的时候，可以使用 react 的 context

## 简单使用

首先使用 createContext 创建一个一个 context，它会有两个方法 Provider 和 Consumer,功能如同字义，一个是提供者，就是数据的发起者，一个是消费者，就是数据的接受者

createContext 生成的 Provider 对应 Cosumer 是一对，所以需要创建一个 JS 文件，将生成的两者导出，我们才能更好的在不同文件下使用

接受一个默认值 deaultValue，只有当组件所处的树中<em>没有匹配到 Provider 时</em>，其 defaultValue 参数才会<em>生效</em>，即 Consumer 拿到的 context 会是默认值

```js
import { Component, createContext } from "react";
const { Consumer: MyConsumer, Provider: MyProvider } = createContext(
  deaultValue
);
export { MyConsumer, MyProvider };
```

创建一个 最外层文件 App.js -> 父级文件 Wrap.js -> 子级文件 Inner.js

App.js

```js
ReactDOM.render(
  <MyProvider value={{ a: 1 }}>
    <Wrap />
  </MyProvider>,
  document.getElementById("root")
);
```

Wrap.js

```js
import { Component } from "react";
import Inner from "./Inner";
class Wrap extends Component {
  render() {
    return <Inner></Inner>;
  }
}
export default Wrap;
```

```js
import { Component } from "react";
import { MyConsumer } from "./Provider";
class Inner extends Component {
  render() {
    return (
      <MyConsumer>
        {(context) => {
          console.log(context);
        }}
      </MyConsumer>
    );
  }
}

export default Inner;
```

就可以看见在 Inner 组件中得到并输出了由最外层的 context 数据,而不是通过像 props 需要一层一层的传递下来的

<a data-fancybox title="" href="https://img-blog.csdnimg.cn/20200108215410225.png">![1](https://img-blog.csdnimg.cn/20200108215410225.png)</a>

```js
import { Component, createContext } from "react";
const { Consumer: MyConsumer, Provider } = createContext();
class MyProvider extends Component {
  render() {
    // ...
    return (
      <Provider value={{ ...this.props.value }}>
        ...
        {this.props.children}
        ...
      </Provider>
    );
  }
}
export { MyConsumer, MyProvider };
```

## 过时的 API（16.3 版本前）

废弃原因：当消费者组件 A 改变 context 内容时，如果中间组件 B 不依赖 context，那么 **shouldComponentUpdate** 就不会发觉变化，如果返回了 false，就不会 rerender,最终导致后面的依赖 context 的子组件也不会 rerender，这不是我们想要的结果。而新版 API 会有穿透的能力

使用方式：组件添加  childContextTypes  和  getChildContext，那么它下面的所有组件都能通过 contextTypes 获取到 context

```js
class MessageList extends React.Component {
  getChildContext() {
    return { color: "red" };
  }

  render() {
    return <Message />;
  }
}

MessageList.childContextTypes = {
  color: PropTypes.string,
};
```

```js
class Message extends React.Component {
  // B如果不依赖context，就可能影响下面子组件的rerender
  // shouldComponentUpdate(nextProps, prevState) {
  //  if (...) {
  //      return false;
  //  }
  //  return true;
  // }
  render() {
    return <Button>点击</Button>;
  }
}
```

```js
class Button extends React.Component {
  render() {
    return (
      // 通过this.context访问
      <button style={{ background: this.context.color }}>
        {this.props.children}
      </button>
    );
  }
}
// 子孙组件可通过contextTypes就能获取到context
Button.contextTypes = {
  color: PropTypes.string,
};
```
