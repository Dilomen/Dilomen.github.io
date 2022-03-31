## 概述

Fiber 是 React 为了解决组件更新时，阻塞当前更优先级的操作，比如输入内容变成卡顿。
这个原因主要是因为原先的 React 渲染机制，就是同步的，<em>直到整个渲染完成</em>，才会去执行我们后续的操作。

> [有 react fiber，为什么不需要 vue fiber](https://mp.weixin.qq.com/s/JehTlyFIjmoA7pmqaj4Ncg)

React 原先是以栈的形式执行渲染整个 Render 树，执行完才能执行后面的操作

```md
[parent, child1, child2]

parent render
  => child1 render => child1 mount
  => child2 render => child2 mount
  => parent mount
```

<a data-fancybox title="react_fiber_1" href="/框架/react_fiber_1.png">![react_fiber_1](/框架/react_fiber_1.png)</a>

但是使用了 Fiber，每当时间片用完，都会停止当前的内容，来看是否有更高优先级的操作，如果有就执行，执行完，再<em>重新执行</em>刚才被打断的内容
<a data-fancybox title="react_fiber_2" href="/框架/react_fiber_2.png">![react_fiber_2](/框架/react_fiber_2.png)</a>

一个 Fiber 有两个更新阶段

- 第一阶段 Reconciliation Phase

  - componentWillMount
  - componentWillReceiveProps
  - shouldComponentUpdate
  - componentWillUpdate

- 第二阶段 Commit Phase
  - componentDidMount
  - componentDidUpdate
  - componentWillUnmount

第一阶段是会被中断的，第二阶段是一定不会被中断的

<a data-fancybox title="react_fiber_3" href="/框架/react_fiber_3.png">!["react_fiber_3"](/框架/react_fiber_3.png)</a>

:::tip
为什么使用 Fiber 之后 componentWillMount 等生命周期会被执行多次？

因为这些生命周期是第一阶段的，如果被打断了，那么下次再重新执行的时候，该生命周期下的内容就会被再次执行，所以写代码的时候需要注意，这些生命周期中是否有一次执行更改的内容，以免出现问题
:::

<a data-fancybox title="react_fiber_4" href="/框架/react_fiber_4.png">!["react_fiber_4"](/框架/react_fiber_4.png)</a>
