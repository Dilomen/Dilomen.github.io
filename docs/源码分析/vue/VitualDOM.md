## 概述

Virtual DOM 这个词放到现在，大家已经在熟悉不过了，也是经常被作为面试题考查的一项，其也是很多现在很多前端流行框架用来解放直接操作 DOM 劳动力的关键之处。

DOM 是 Document Object Model（文档对象模型），是一个很大的对象，操作起来非常的消耗性能，采用 Virtual DOM 可以将一个个原本真实的 DOM 大对象转化为更小的 VNode 节点对象，然后通过比较 VNode Tree 根据变化，最后再来使用真实的 DOM API 进行生成

而且随着业务场景越来越复杂，原来直接编写 DOM 的写法越来越难操作，Virtual 可以让你在开发中不用将精力放到操作 DOM 上

:::tip Virtual DOM 真的比真实 DOM 快吗
**这里是有误解的！**
Virtual DOM 一定没有自己**手动精确**改变 DOM 来的快！因为不需要各种对象 diff 比较步骤，但是是有前提的，那就是你知道怎么最小颗粒的去改变 DOM，回想 jquery 时代，即便是 API 简写了很多，面对复杂的场景，也是一个头疼的事情，所以从开发效率和维护成本考虑，Virtual DOM 的优势就大大体现出来，它能让我们不需要太关注 DOM 的处理，尤其是它能做的 DOM 更新颗粒度也会比一般我们自己使用整个 innerHTML 等 API 更细，所以性能会更高。
:::

## VNode

既然提到了 Virtual DOM 是将 DOM 节点创建一个 JS 对象，那就先看看这个对象里有啥

```js
export default class VNode {
  tag: string | void;
  data: VNodeData | void;
  children: ?Array<VNode>;
  text: string | void;
  elm: Node | void;
  ns: string | void;
  context: Component | void; // rendered in this component's scope
  key: string | number | void;
  componentOptions: VNodeComponentOptions | void;
  componentInstance: Component | void; // component instance
  parent: VNode | void; // component placeholder node

  // strictly internal
  raw: boolean; // contains raw HTML? (server only)
  isStatic: boolean; // hoisted static node
  isRootInsert: boolean; // necessary for enter transition check
  isComment: boolean; // empty comment placeholder? 是否是注释（空）节点
  isCloned: boolean; // is a cloned node?
  isOnce: boolean; // is a v-once node?
  asyncFactory: Function | void; // async component factory function
  asyncMeta: Object | void;
  isAsyncPlaceholder: boolean;
  ssrContext: Object | void;
  fnContext: Component | void; // real context vm for functional nodes
  fnOptions: ?ComponentOptions; // for SSR caching
  devtoolsMeta: ?Object; // used to store functional render context for devtools
  fnScopeId: ?string; // functional scope id support

  constructor(
    tag?: string,
    data?: VNodeData,
    children?: ?Array<VNode>,
    text?: string,
    elm?: Node,
    context?: Component,
    componentOptions?: VNodeComponentOptions,
    asyncFactory?: Function
  ) {
    this.tag = tag; // 标签名
    this.data = data; // 数据
    this.children = children; // 子节点
    this.text = text; // 文本内容
    this.elm = elm; // 真实DOM节点
    this.ns = undefined; // 命名空间
    this.context = context; // 上下文
    this.fnContext = undefined; // 函数组件上下文
    this.fnOptions = undefined; // 函数组件属性
    this.fnScopeId = undefined; // 函数组件ScopeId
    this.key = data && data.key; // 子节点key
    this.componentOptions = componentOptions; // 组件配置
    this.componentInstance = undefined; // 组件实例
    this.parent = undefined; // 父节点
    this.raw = false; // 是否是原生HTML
    this.isStatic = false; // 是否是静态节点
    this.isRootInsert = true; // 是否在根节点插入
    this.isComment = false; // 是否是注释节点
    this.isCloned = false; // 是否为克隆节点
    this.isOnce = false; // 是否是v-once节点
    this.asyncFactory = asyncFactory; // 异步工厂
    this.asyncMeta = undefined; // 异步meta
    this.isAsyncPlaceholder = false; // 是否异步占位
  }

  // DEPRECATED: alias for componentInstance for backwards compat.
  /* istanbul ignore next */
  get child(): Component | void {
    return this.componentInstance;
  }
}
```

## 执行位置

那么哪里会使用到这些创建呢  
首先通过模板编译篇章的学习，我们知道 render 函数（包括模板编译后的 render 函数）有大量的\_c，\_v 的方法，而这些就包含调用生成 VNode 的方法

```js
vm._c = function(a, b, c, d) {
  return createElement(vm, a, b, c, d, false);
};

function installRenderHelpers(target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}
```

#### 例子

```js
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<button>Hello World</button>',
});
// render函数
// `with(this){return _c('button',[_v('Hello World')])}`;
// render函数会调用创建VNode的方法创建整个VNode;
```

### 找到起源

既然我们知道\_c，\_v 这些是 render 函数用来创建 VNode 的，那么我们就要找到什么时候会执行 render 函数。

是的，就是以下的代码执行了 render 函数，并将 createElement 方法作为参数传递下去。具体 render 这部分请看生命周期篇章

```js
// src/core/instance/lifecycle.js
vm._update(vm._render(), hydrating);
// vm._render
() {
  vnode = render.call(vm._renderProxy, vm.$createElement)
}
```

vm.\_renderProxy 就是模板解析出来的 render 函数，再想到 render 函数最外层其实是一个\_c 包裹的字符串，而\_c 就是 createElement 方法

```js
code = `_c('${el.tag}'${
  data ? `,${data}` : '' // data
}${
  children ? `,${children}` : '' // children
})`;
```

所以 createElement 就成了突破口，因为它是创建各种 VNode 节点的起点

## 生成 VNode

### createElement

可以看到 createElement 只是做了一层封装，返回的\_createElement 才是我们真正需要的

```js
// vue/src/core/vdom/create-element.js
export function createElement(
  context: Component,
  tag: any,
  data: any,
  children: any,
  normalizationType: any,
  alwaysNormalize: boolean
): VNode | Array<VNode> {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType);
}
```

先来看一下参数:

- **context**: vm 实例
- **tag**: 标签名
- **data**: 自身属性
- **children**: 子元素
- **normalizationType**: 主要是区别用户使用的\$createElement 方法还是 render 函数执行的\_c，对于用户写的进行规范化
- **alwaysNormalize**: 同样也是看用户使用的是传递下去的$createElement方法还是模板生成render函数执行的_c，如果是$createElement 就是 true，\_c 就是 false，这是方法注册\$createElement 和\_c 的时候就确定的，其也是可以强制改变 normalizationType 的值

createElement 主要是根据实参来重新整理，将参数调整到正确的位置  
当 data 是个数组或者是个基本类型时，就说明它是子元素，属性一般以对象的形式存在  
normalizationType 属性就会变成第三个参数

```js
if (Array.isArray(data) || isPrimitive(data)) {
  normalizationType = children;
  children = data;
  data = undefined;
}
```

例子，当第二个参数是对象时（第二种情况），那么就是属性，当时一个数组时，那么就是子元素

```js
"with(this){return _c('div',[_v(_s(msg)+" World"),_c('button',[_v("点击")])])}"
"with(this){return _c('div',{staticClass:"a"},[_v(_s(msg)+" World"),_c('button',[_v("点击")])])}"
```

normalizationType 上面参数也讲到了，是用来区别执行$createElement还是_c的，这边强制改变，是因为vue在封装createElement的时候，已经是确定这个实参的，所以如果是使用$createElement，一定会被转回来

```js
if (isTrue(alwaysNormalize)) {
  normalizationType = ALWAYS_NORMALIZE;
}

vm._c = function(a, b, c, d) {
  return createElement(vm, a, b, c, d, false);
};
vm.$createElement = function(a, b, c, d) {
  return createElement(vm, a, b, c, d, true);
};
```

然后 createElement 将调整后的参数传给\_createElement

```js
export function _createElement(
  context: Component,
  tag?: string | Class<Component> | Function | Object,
  data?: VNodeData,
  children?: any,
  normalizationType?: number
): VNode | Array<VNode> {
  if (isDef(data) && isDef((data: any).__ob__)) {
    process.env.NODE_ENV !== 'production' &&
      warn(
        `Avoid using observed data object as vnode data: ${JSON.stringify(
          data
        )}\n` + 'Always create fresh vnode data objects in each render!',
        context
      );
    return createEmptyVNode();
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode();
  }
  // warn against non-primitive key
  if (
    process.env.NODE_ENV !== 'production' &&
    isDef(data) &&
    isDef(data.key) &&
    !isPrimitive(data.key)
  ) {
    if (!__WEEX__ || !('@binding' in data.key)) {
      warn(
        'Avoid using non-primitive value as key, ' +
          'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) && typeof children[0] === 'function') {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  let vnode, ns;
  if (typeof tag === 'string') {
    let Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if (
        process.env.NODE_ENV !== 'production' &&
        isDef(data) &&
        isDef(data.nativeOn)
      ) {
        warn(
          `The .native modifier for v-on is only valid on components but it was used on <${tag}>.`,
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag),
        data,
        children,
        undefined,
        undefined,
        context
      );
    } else if (
      (!data || !data.pre) &&
      isDef((Ctor = resolveAsset(context.$options, 'components', tag)))
    ) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(tag, data, children, undefined, undefined, context);
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode;
  } else if (isDef(vnode)) {
    if (isDef(ns)) applyNS(vnode, ns);
    if (isDef(data)) registerDeepBindings(data);
    return vnode;
  } else {
    return createEmptyVNode();
  }
}
```

如果带有 is 属性，那么就说明是动态组件，is 的值会被作为标签名

```js
if (isDef(data) && isDef(data.is)) {
  tag = data.is;
}
```

标签名不存在就返回空节点

```js
if (!tag) {
  return createEmptyVNode();
}
```

key 必须设置为 string/number 类型，这也是平时开发不小心就会遇到的警告

```js
if (
  process.env.NODE_ENV !== 'production' &&
  isDef(data) &&
  isDef(data.key) &&
  !isPrimitive(data.key)
) {
  if (!__WEEX__ || !('@binding' in data.key)) {
    warn(
      'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
      context
    );
  }
}
```

这里就要发挥 normalizationType 的作用了，之前说到这是区别两种创建方式，所以两者的处理方式也不同，首先都是对子元素进行规范化处理，最终返回都是返回一个处理后的数组

- 如果是\$createElement 方式（ALWAYS_NORMALIZE），那么就深度，如果子元素是简单类型，就返回文本节点，如果是数组，就递归数组处理
- 如果是默认的 render 函数渲染方式（SIMPLE_NORMALIZE），那么就只需要深度一层的子元素规范，因为子子元素已经被子元素规范过了（因为执行栈，所以一定是子组件执行完，出栈，再进行父组件的渲染）

```js
if (normalizationType === ALWAYS_NORMALIZE) {
  children = normalizeChildren(children);
} else if (normalizationType === SIMPLE_NORMALIZE) {
  children = simpleNormalizeChildren(children);
}
```

规范了什么？  
就是比如当没有 key 的时候，生成默认 key（v-for），两个靠近的文本子元素，会被合并成一个等等，其实也是优化吧

```js
// default key for nested array children (likely generated by v-for)
if (
  isTrue(children._isVList) &&
  isDef(c.tag) &&
  isUndef(c.key) &&
  isDef(nestedIndex)
) {
  c.key = `__vlist${nestedIndex}_${i}__`;
}

if (isTextNode(c) && isTextNode(last)) {
  // merge adjacent text nodes
  res[lastIndex] = createTextVNode(last.text + c.text);
}
```

如果是 HTML 或 SVG 的标签，即保留标签，不应该在保留标签上添加.native，如<button @click.native="handle"></button>

然后根据相关属性生成元素节点（HTML 元素节点或 SVG 元素节点）

```js
if (config.isReservedTag(tag)) {
  if (
    process.env.NODE_ENV !== 'production' &&
    isDef(data) &&
    isDef(data.nativeOn)
  ) {
    warn(...);
  }
  vnode = new VNode({ ... });
}
```

如果没有属性，或者没有 v-pre 的属性，并且在 components 属性中是注册该组件的，那么就生成组件节点

```js
if (
  (!data || !data.pre) &&
  isDef((Ctor = resolveAsset(context.$options, 'components', tag)))
) {
  // component
  vnode = createComponent(Ctor, data, context, children, tag);
}
```

:::tip 补充：处理子组件的信息
resolveAsset 方法会通过当前组件的 components 属性，找到对应的子组件的构造函数 Ctor，将其作为参数通过 Vue.extends 的继承方法，都添加到子组件$options中，其中包括子组件的render函数（怎么来的请看模板编译篇章vue-loader），所以之后在VNode子组件$mount 的时候可以直接从\$options.render 中获取到 render 函数，而不需要在进行模板编译

```js
Ctor = baseCtor.extend(Ctor);

Vue.extend = function(extendOptions) {
  Sub.options = mergeOptions(Super.options, extendOptions);
};
```

```js
Vue.prototype.$mount = function() {
  if (!options.render) {
    //模板编译
  }
  // 如果render函数存在就不需要模板编译
  return mount.call(this, el, hydrating);
};
```

:::

其余的直接根据参数创建 VNode 节点，以及 tag 标签不是字符串，直接是一个组件或者构造函数，那么就直接创建组件节点

```js
vnode = new VNode(tag, data, children, undefined, undefined, context);

else {
  vnode = createComponent(tag, data, context, children);
}
```

### 组件节点

在 createElement 中，我们也看到了很多 createComponent 的身影，其主要是创建组件 VNode

```js
export function createComponent(
  Ctor: Class<Component> | Function | Object | void,
  data: ?VNodeData,
  context: Component,
  children: ?Array<VNode>,
  tag?: string
): VNode | Array<VNode> | void {
  if (isUndef(Ctor)) {
    return;
  }

  const baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (process.env.NODE_ENV !== 'production') {
      warn(`Invalid Component definition: ${String(Ctor)}`, context);
    }
    return;
  }

  // async component
  let asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(asyncFactory, data, context, children, tag);
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  const propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children);
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  const listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    const slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  const name = Ctor.options.name || tag;
  const vnode = new VNode(
    `vue-component-${Ctor.cid}${name ? `-${name}` : ''}`,
    data,
    undefined,
    undefined,
    undefined,
    context,
    { Ctor, propsData, listeners, tag, children },
    asyncFactory
  );

  return vnode;
}
```

首先我们看到在 createElement 中，使用 createComponent 传入的 Ctor 有 2 种情况

- 如果 tag 是字符串且不是 HTML，SVG 元素节点，且在 components 属性中找到，那么直接根据 components，获取到组件资源
- 如果 tag 不是字符串，那么认为是组件节点

所以 Ctor 可以是一个类，或者函数，或者对象，以及找不到资源后返回的空

```js
export function createComponent(
  Ctor: Class<Component> | Function | Object | void
)
```

```js
if (isUndef(Ctor)) {
  return;
}
```

如果 Ctor 是一个对象的话，那么就是相关配置信息，就要使用基础的构造器，其实就是 Vue，所以 baseCtor.extend 就是 Vue.extend，就是利用原型链的继承方式，生成一个构造函数，具体 Vue.extends 可以查看 API 篇章

```js
const baseCtor = context.$options._base;

if (isObject(Ctor)) {
  Ctor = baseCtor.extend(Ctor);
}
```

如果没有 cid，说明不是 extends 而来的，那么就要找到具体的异步组件

```js
// async component
let asyncFactory;
if (isUndef(Ctor.cid)) {
  asyncFactory = Ctor;
  Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
}
```

设置组件的 v-model 属性，会根据 model 的属性配置，然后执行 on+配置的 event 来改变 v-model 绑定的属性值

```js
if (isDef(data.model)) {
  transformModel(Ctor.options, data);
}

function transformModel(options, data: any) {
  // ...
  const on = data.on || (data.on = {});
  const existing = on[event];
  const callback = data.model.callback;
  // ...
  on[event] = callback;
}
```

生成<em>函数式组件节点</em>

```js
// functional component
if (isTrue(Ctor.options.functional)) {
  return createFunctionalComponent(Ctor, propsData, data, context, children);
}
```

最终还是根据 VNode 类来生成 VNode 节点

```js
  const vnode = new VNode(
    `vue-component-${Ctor.cid}${name ? `-${name}` : ''}`,
    data,
    undefined,
    undefined,
    undefined,
    context,
    { Ctor, propsData, listeners, tag, children },
    asyncFactory
  );

  return vnode;
}
```

<a data-fancybox title="conponentVNode" href="/源码/vue源码/生命周期/conponentVNode.png"><img width="400px" title="conponentVNode" src="/源码/vue源码/生命周期/conponentVNode.png"/></a>

### 注释节点

将 isComment 变为 true

```js
//  创建注释节点
export const createEmptyVNode = (text: string = '') => {
  const node = new VNode();
  node.text = text;
  node.isComment = true;
  return node;
};
```

### 文本节点

直接将内容转成 String 类型即可

```js
export function createTextVNode(val: string | number) {
  return new VNode(undefined, undefined, undefined, String(val));
}
```

### 克隆节点

只是根据被复制节点的几个特殊属性进行拷贝，然后生成新的节点，最主要是将 isCloned 设置为 true，表明是克隆节点

```js
export function cloneVNode(vnode: VNode): VNode {
  const cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true; // 主要是将isCloned变成true
  return cloned;
}
```

#### 由上述分析，可得 VNode 可分为以下几种类型节点

- 元素节点
- 组件节点
- 函数式组件节点
- 注释节点
- 文本节点
- 克隆节点

## patch

render 根据以上的各种创建 VNode 的方法后就会变成一棵 VNode Tree 树，那么如何将这颗 VNode Tree 转成真实的 DOM 呢

再次回到这段代码，既然 vm.\_render()获得了整个 VNode 树，那么我们就从 vm.\_update()找线索

```js
vm._update(vm._render(), hydrating);
```

找到\_update 方法，确实可以发现该方法调用了 vm.\_\_patch\_\_来进行对 VNode 转化为真实 DOM 的操作

而且我们可以看到每次的 vnode 都会存储在\_vnode 属性上，所以就看\_vnode 有没有内容

- 没有：就是第一次渲染，直接将挂载节点作为旧的 VNode 和新的 VNode 进行比较，
- 有：就不是第一次渲染，那么就是更新操作，将新的 VNode 和旧的 VNode 比较，如果\_vnode 不存在，那么就是第一次渲染，直接将挂载节点作为旧的 VNode 和新的 VNode 进行比较

```js
Vue.prototype._update = function(vnode: VNode, hydrating?: boolean) {
  const prevVnode = vm._vnode;
  vm._vnode = vnode;
  // ...
  if (!prevVnode) {
    // initial render
    vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
  } else {
    // updates
    vm.$el = vm.__patch__(prevVnode, vnode);
  }
  // ...
};
```

找到方法的位置

```js
// vue/src/platforms/web/runtime/patch.js
import { createPatchFunction } from 'core/vdom/patch';
export const patch: Function = createPatchFunction({ nodeOps, modules });
// vue/src/platforms/web/runtime/index.js
Vue.prototype.__patch__ = inBrowser ? patch : noop;
```

由于 createPatchFunction 源码篇幅太大，这里就分段按顺序解析了

首先该方法返回了一个 patch 直接的结果，因为上面 patch 是 createPatchFunction 的执行结果，所以我们就看 patch 到底执行了什么

```js
export function createPatchFunction(backend) {
  // ...
  return function patch(oldVnode, vnode, hydrating, removeOnly) {};
}
```

如果新 VNode 不存在，那么就清空老的 VNode，递归销毁原有的所有 Vnode

```js
if (isUndef(vnode)) {
  if (isDef(oldVnode)) invokeDestroyHook(oldVnode);
  return;
}
```

:::tip invokeDestroyHook
这里 invokeDestroyHook 会调用组件 hook 中的 destroy 方法，而 destroy 则会调用组件实例（Vue 实例）的$destroy方法，也就是Vue.prototype.$destroy，这也就是生命周期篇章中，beforeDestroy 和 destroyed 的执行位置

```js
componentVNodeHooks = {
  destroy: function destroy(vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  },
};
```

:::

是否是初次渲染，即旧节点不存在，新节点存在，如果老 VNode 不存在，那么就相当于新建，直接使用新的 VNode，调用 createElm

```js
let isInitialPatch = false;
const insertedVnodeQueue = [];
if (isUndef(oldVnode)) {
  // empty mount (likely as component), create new root element
  isInitialPatch = true;
  createElm(vnode, insertedVnodeQueue);
}
```

如果旧节点存在，且旧节点不是一个 HTML 元素的话，那么直接进行新旧节点的比较，即更新 VNode Tree

```js
else {
  const isRealElement = isDef(oldVnode.nodeType);
  // 如果不是HTML元素节点，并且根VNode相同，那么进行新旧比较
  if (!isRealElement && sameVnode(oldVnode, vnode)) {
    patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly);
  }
}
```

如果 oldVnode 是 HTML 元素，那么就需要将它转化成 VNode

```js
if (isRealElement) {
  // ...
  oldVnode = emptyNodeAt(oldVnode);
}

function emptyNodeAt(elm) {
  return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm);
}
```

:::tip 为什么会有 HTML 元素
不是两棵 VNode Tree 树进行比较吗

会看上面的代码，调用 patch 的时候，在初始渲染（根节点）的时候，它的 oldNode 是\$el 挂载节点，所以是一个 HTML 元素节点，而之后的更新则都是两棵 VNode Tree 的比较

```js
if (!prevVnode) {
  // initial render
  vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
} else {
  // updates
  vm.$el = vm.__patch__(prevVnode, vnode);
}
```

:::

正因为是初始渲染，所以直接调用 createElm 来生成真实 DOM

```js
// create new node
createElm(
  vnode,
  insertedVnodeQueue,
  // extremely rare edge case: do not insert if old element is in a
  // leaving transition. Only happens when combining transition +
  // keep-alive + HOCs. (#4590)
  oldElm._leaveCb ? null : parentElm,
  nodeOps.nextSibling(oldElm)
);
```

如果父元素存在就销毁旧的节点，一般这边的父节点也就是 body 元素，因为我们 html 中一般会将#app 直接放到 body 下，那么这个操作就是要将原来的#app 元素去除

```js
const oldElm = oldVnode.elm;
const parentElm = nodeOps.parentNode(oldElm);

// destroy old node
if (isDef(parentElm)) {
  removeVnodes([oldVnode], 0, 0);
} else if (isDef(oldVnode.tag)) {
  invokeDestroyHook(oldVnode);
}
```

如图所示，当我们将断点打在销毁旧节点前，原来的#app 和我们新的#app 是共存的，所以需要删除旧的

<a data-fancybox title="删除旧节点" href="/源码/vue源码/VirtualDOM/删除旧节点.png">![删除旧节点](/源码/vue源码/模板编译/删除旧节点.png)</a>

最后返回整个 VNode 转化后的真实 DOM

```js
return vnode.elm;
```

那么初始化那边就有个疑问，为什么 html 上的#app 会和我们的冲突，不应该是我们的代码 innerHTML 到#app 上去的吗？（至少我之前一直以为是），这就要看关键方法 createElm 是怎么实现的了

### 创建节点

```js
function createElm(
  vnode,
  insertedVnodeQueue,
  parentElm,
  refElm,
  nested,
  ownerArray,
  index
) {
  if (isDef(vnode.elm) && isDef(ownerArray)) {
    // This vnode was used in a previous render!
    // now it's used as a new node, overwriting its elm would cause
    // potential patch errors down the road when it's used as an insertion
    // reference node. Instead, we clone the node on-demand before creating
    // associated DOM element for it.
    vnode = ownerArray[index] = cloneVNode(vnode);
  }

  vnode.isRootInsert = !nested; // for transition enter check
  if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
    return;
  }

  const data = vnode.data;
  const children = vnode.children;
  const tag = vnode.tag;
  // 创建元素节点
  if (isDef(tag)) {
    if (process.env.NODE_ENV !== 'production') {
      if (data && data.pre) {
        creatingElmInVPre++;
      }
      if (isUnknownElement(vnode, creatingElmInVPre)) {
        warn(
          'Unknown custom element: <' +
            tag +
            '> - did you ' +
            'register the component correctly? For recursive components, ' +
            'make sure to provide the "name" option.',
          vnode.context
        );
      }
    }

    vnode.elm = vnode.ns
      ? nodeOps.createElementNS(vnode.ns, tag)
      : nodeOps.createElement(tag, vnode);
    setScope(vnode);

    /* istanbul ignore if */
    if (__WEEX__) {
      //...
    } else {
      createChildren(vnode, children, insertedVnodeQueue);
      if (isDef(data)) {
        invokeCreateHooks(vnode, insertedVnodeQueue);
      }
      insert(parentElm, vnode.elm, refElm);
    }

    if (process.env.NODE_ENV !== 'production' && data && data.pre) {
      creatingElmInVPre--;
    }
    // 创建注释节点
  } else if (isTrue(vnode.isComment)) {
    vnode.elm = nodeOps.createComment(vnode.text);
    insert(parentElm, vnode.elm, refElm);
    // 创建文本节点
  } else {
    vnode.elm = nodeOps.createTextNode(vnode.text);
    insert(parentElm, vnode.elm, refElm);
  }
}
```

#### VNode 组件处理

如果创建组件 VNode 成功，那么直接走 createComponent 方法

```js
if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
  return;
}
```

先调用注册 componentVNodeHooks 的 init 方法

```js
function createComponent() {
  let i = vnode.data;
  if (isDef((i = i.hook)) && isDef((i = i.init))) {
    i(vnode, false /* hydrating */);
  }
  // ...
}
```

![componentsHook](/源码/vue源码/VirtualDOM/绑定的componentsHook.png)

:::tip VNode 上处理的组件钩子

```js
const componentVNodeHooks = {
  init(vnode: VNodeWithData, hydrating: boolean): ?boolean {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      const mountedNode: any = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      const child = (vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      ));
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch(oldVnode: MountedComponentVNode, vnode: MountedComponentVNode) {},

  insert(vnode: MountedComponentVNode) {},

  destroy(vnode: MountedComponentVNode) {},
};
```

可以看到当调用 init 的时候，如果实例存在就调用 prepatch，不存在就生成实例，并且调用挂载

```js
init(vnode, hydrating) {
  // ...
  var child = vnode.componentInstance = createComponentInstanceForVnode(
    vnode,
    activeInstance
  );
  child.$mount(hydrating ? vnode.elm : undefined, hydrating)
}
```

可以从这个生成实例的方法中看到，如果 是 inlineTemplate 内联模板，那么是已经有 render 了的，就是说不需要再模板编译了，如果不是内联模板，那么就还是进行模板编译  
然后生成实例其实就是继承 Vue 的构造函数生成的实例，那么调用$mount也能说得通，因为$mount 是挂载在 Vue 的原型链上的。然后子组件也会进行 render，patch 处理

```js
export function createComponentInstanceForVnode(
  vnode: any, // we know it's MountedComponentVNode but flow doesn't
  parent: any // activeInstance in lifecycle state
): Component {
  // ...
  const inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options);
}
```

:::

然后 initComponent 方法主要是将 componentInstance 中的\$el 真实 DOM 拿出来赋值给 elm 属性，然后添加到父元素

```js
if (isDef(vnode.componentInstance)) {
  initComponent(vnode, insertedVnodeQueue);
  insert(parentElm, vnode.elm, refElm);
  // ...
  return true;
}

function initComponent() {
  // ...
  vnode.elm = vnode.componentInstance.$el;
}
```

#### VNode 元素处理

如果不是组件，且有标签，那么就是元素，根据是否有命名空间，来选择 createElementNS 或 createElement 创建元素，就是调用 DOM API

```js
if (isDef(tag)) {
  vnode.elm = vnode.ns
    ? nodeOps.createElementNS(vnode.ns, tag)
    : nodeOps.createElement(tag, vnode);
}
```

```js
function createElement$1 (tagName, vnode) {
  var elm = document.createElement(tagName);
  return elm
}

function createElementNS (namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName)
}

var nodeOps = /*#__PURE__*/Object.freeze({
  createElement: createElement$1,
  createElementNS: createElementNS
}
```

然后开始将子元素进行递归操作，是数组的话，每一个调用 createElm，如果不是数组且文本内容是基本类型，那么直接使用 appendChild 添加

```js
createChildren(vnode, children, insertedVnodeQueue);

function createChildren(vnode, children, insertedVnodeQueue) {
  if (Array.isArray(children)) {
    // ...
    for (let i = 0; i < children.length; ++i) {
      createElm(
        children[i],
        insertedVnodeQueue,
        vnode.elm,
        null,
        true,
        children,
        i
      );
    }
  } else if (isPrimitive(vnode.text)) {
    nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)));
  }
}
```

#### VNode 注释节点

```js
else if (isTrue(vnode.isComment)) {
  vnode.elm = nodeOps.createComment(vnode.text);
  insert(parentElm, vnode.elm, refElm);
}

export function createComment(text: string): Comment {
  return document.createComment(text);
}
```

#### VNode 文本节点

```js
else {
  vnode.elm = nodeOps.createTextNode(vnode.text);
  insert(parentElm, vnode.elm, refElm);
}

export function createTextNode(text: string): Text {
  return document.createTextNode(text);
}
```

我们可以发现上面很多地方使用了 insert 方法，该方法就是使用了 DOM API，
父节点

- **存在**，那么比较 ref 的父元素和当前父元素，那么就将元素添加到 ref 的前面，这个只出现在 updateChildren 子节点比较的时候，即旧节点不存在新节点中的子节点或者在旧节点中找不到新节点相同的内容，那么就需要在旧节点未确定的子节点前添加这个新节点子节点（具体可以看下面的 diff 方法中的 isUndef(idxInOld) 和 !sameVnode(vnodeToMove, newStartVnode)）

- **不存在**，将子元素 appendChild 添加到父节点下

```js
function insert(parent, elm, ref) {
  if (isDef(parent)) {
    if (isDef(ref)) {
      if (nodeOps.parentNode(ref) === parent) {
        nodeOps.insertBefore(parent, elm, ref);
      }
    } else {
      nodeOps.appendChild(parent, elm);
    }
  }
}
```

所以一开始我们的内容会被直接 appendChild 添加到 body 下（如果#app 元素是写在 body 下的话）

### 移除节点

获取父节点，然后使用 removeChild 进行移除子节点

```js
function removeNode(el) {
  const parent = nodeOps.parentNode(el);
  if (isDef(parent)) {
    nodeOps.removeChild(parent, el);
  }
}
```

### 更新节点

```js
function patchVnode(
  oldVnode,
  vnode,
  insertedVnodeQueue,
  ownerArray,
  index,
  removeOnly
) {
  if (oldVnode === vnode) {
    return;
  }

  if (isDef(vnode.elm) && isDef(ownerArray)) {
    // clone reused vnode
    vnode = ownerArray[index] = cloneVNode(vnode);
  }

  const elm = (vnode.elm = oldVnode.elm);

  if (isTrue(oldVnode.isAsyncPlaceholder)) {
    if (isDef(vnode.asyncFactory.resolved)) {
      hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
    } else {
      vnode.isAsyncPlaceholder = true;
    }
    return;
  }

  // 如果新旧节点都是静态节点并且key相同，新节点是克隆节点和只渲染一次节点的话，就直接替换组件实例
  if (
    isTrue(vnode.isStatic) &&
    isTrue(oldVnode.isStatic) &&
    vnode.key === oldVnode.key &&
    (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
  ) {
    vnode.componentInstance = oldVnode.componentInstance;
    return;
  }

  let i;
  const data = vnode.data;
  if (isDef(data) && isDef((i = data.hook)) && isDef((i = i.prepatch))) {
    i(oldVnode, vnode);
  }

  const oldCh = oldVnode.children;
  const ch = vnode.children;
  if (isDef(data) && isPatchable(vnode)) {
    for (i = 0; i < cbs.update.length; ++i) cbs.update[i](oldVnode, vnode);
    if (isDef((i = data.hook)) && isDef((i = i.update))) i(oldVnode, vnode);
  }
  // 如果不是文本节点
  if (isUndef(vnode.text)) {
    // 新旧节点都有子节点
    if (isDef(oldCh) && isDef(ch)) {
      // 子节点不相同的话更新子节点
      if (oldCh !== ch)
        updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly);
    } else if (isDef(ch)) {
      if (process.env.NODE_ENV !== 'production') {
        checkDuplicateKeys(ch);
      }
      // 如果旧节点是文本，清空文本内容，将新节点的内容添加上去
      if (isDef(oldVnode.text)) nodeOps.setTextContent(elm, '');
      addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      // 如果旧节点存在子节点，而新节点不存在的话，就直接移除旧节点的子节点
    } else if (isDef(oldCh)) {
      removeVnodes(oldCh, 0, oldCh.length - 1);
      // 如果旧节点内容是文本，但是新节点不存在，直接清空
    } else if (isDef(oldVnode.text)) {
      nodeOps.setTextContent(elm, '');
    }
    // 都是文本节点直接替换文本内容
  } else if (oldVnode.text !== vnode.text) {
    nodeOps.setTextContent(elm, vnode.text);
  }
  if (isDef(data)) {
    if (isDef((i = data.hook)) && isDef((i = i.postpatch))) i(oldVnode, vnode);
  }
}
```

### diff 方法

updateChildren 方法就是比较新旧节点子元素

```js
function updateChildren(
  parentElm,
  oldCh,
  newCh,
  insertedVnodeQueue,
  removeOnly
) {
  let oldStartIdx = 0; // 旧节点开始索引
  let newStartIdx = 0; // 新节点开始索引
  let oldEndIdx = oldCh.length - 1; // 旧节点结束索引
  let oldStartVnode = oldCh[0]; // 旧节点开始子节点
  let oldEndVnode = oldCh[oldEndIdx]; // 旧节点结束子节点
  let newEndIdx = newCh.length - 1; // 新节点结束索引
  let newStartVnode = newCh[0]; // 新节点开始子节点
  let newEndVnode = newCh[newEndIdx]; // 新节点结束子节点
  let oldKeyToIdx, idxInOld, vnodeToMove, refElm;

  // removeOnly is a special flag used only by <transition-group>
  // to ensure removed elements stay in correct relative positions
  // during leaving transitions
  const canMove = !removeOnly;

  if (process.env.NODE_ENV !== 'production') {
    checkDuplicateKeys(newCh);
  }

  // 一旦新旧子节点有一个遍历完毕，退出
  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    // 如果旧节点开始节点不存在，那么就找后一个的节点
    if (isUndef(oldStartVnode)) {
      oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      // 如果旧节点结束节点不存在，那么就找前一个的节点
    } else if (isUndef(oldEndVnode)) {
      oldEndVnode = oldCh[--oldEndIdx];
      // 如果新旧节点的开始节点相同，那么就比较这两个开始节点的子节点
    } else if (sameVnode(oldStartVnode, newStartVnode)) {
      patchVnode(
        oldStartVnode,
        newStartVnode,
        insertedVnodeQueue,
        newCh,
        newStartIdx
      );
      oldStartVnode = oldCh[++oldStartIdx];
      newStartVnode = newCh[++newStartIdx];
      // 如果新旧节点的结束节点相同，那么就比较这两个结束节点的子节点
    } else if (sameVnode(oldEndVnode, newEndVnode)) {
      patchVnode(
        oldEndVnode,
        newEndVnode,
        insertedVnodeQueue,
        newCh,
        newEndIdx
      );
      oldEndVnode = oldCh[--oldEndIdx];
      newEndVnode = newCh[--newEndIdx];
      // 如果新节点的结束节点和旧节点的开始节点相同，那么就比较这两个子节点的子节点，并将其放到老节点结束节点的后面
    } else if (sameVnode(oldStartVnode, newEndVnode)) {
      // Vnode moved right
      patchVnode(
        oldStartVnode,
        newEndVnode,
        insertedVnodeQueue,
        newCh,
        newEndIdx
      );
      canMove &&
        nodeOps.insertBefore(
          parentElm,
          oldStartVnode.elm,
          nodeOps.nextSibling(oldEndVnode.elm)
        );
      oldStartVnode = oldCh[++oldStartIdx];
      newEndVnode = newCh[--newEndIdx];
      // 如果旧节点的结束节点和新节点的开始节点相同，那么就比较这两个子节点的子节点，并将其放到老节点开始索引指向的节点前面
    } else if (sameVnode(oldEndVnode, newStartVnode)) {
      // Vnode moved left
      patchVnode(
        oldEndVnode,
        newStartVnode,
        insertedVnodeQueue,
        newCh,
        newStartIdx
      );
      canMove &&
        nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
      oldEndVnode = oldCh[--oldEndIdx];
      newStartVnode = newCh[++newStartIdx];
    } else {
      // 查找旧节点子节点集合中的位置
      if (isUndef(oldKeyToIdx))
        oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
      idxInOld = isDef(newStartVnode.key)
        ? oldKeyToIdx[newStartVnode.key]
        : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
      // 如果在旧节点中不存在新节点开始节点的key，那么就创建新的节点
      if (isUndef(idxInOld)) {
        // New element
        createElm(
          newStartVnode,
          insertedVnodeQueue,
          parentElm,
          oldStartVnode.elm,
          false,
          newCh,
          newStartIdx
        );
        // 否者就拿到旧节点中找到的子节点，判断该节点是否和新节点的现开始索引下的子节相同
      } else {
        vnodeToMove = oldCh[idxInOld];
        // 相同的话，就继续比较两个子节点的子节点，并将其放到老节点开始索引指向的节点前面
        if (sameVnode(vnodeToMove, newStartVnode)) {
          patchVnode(
            vnodeToMove,
            newStartVnode,
            insertedVnodeQueue,
            newCh,
            newStartIdx
          );
          oldCh[idxInOld] = undefined;
          canMove &&
            nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
          // 不相同的话，就是相同的key不同的元素内容，直接创建
        } else {
          createElm(
            newStartVnode,
            insertedVnodeQueue,
            parentElm,
            oldStartVnode.elm,
            false,
            newCh,
            newStartIdx
          );
        }
      }
      newStartVnode = newCh[++newStartIdx];
    }
  }
  // 如果旧节点开始索引大于结束索引，那么就说明旧节点遍历完了，新节点还没有遍历完，所以没有遍历完的新子节点都要添加
  if (oldStartIdx > oldEndIdx) {
    refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
    addVnodes(
      parentElm,
      refElm,
      newCh,
      newStartIdx,
      newEndIdx,
      insertedVnodeQueue
    );
    // 如果新节点开始索引大于结束索引，那么就说明新节点遍历完了，旧节点还没有遍历完，所以剩下的旧子节点都要删除
  } else if (newStartIdx > newEndIdx) {
    removeVnodes(oldCh, oldStartIdx, oldEndIdx);
  }
}
```

```js
if (isUndef(oldStartVnode)) {
  oldStartVnode = oldCh[++oldStartIdx];
} else if (isUndef(oldEndVnode)) {
  oldEndVnode = oldCh[--oldEndIdx];
}
```

![patch_diff](/源码/vue源码/VirtualDOM/patch_diff.svg)

```js
if (sameVnode(oldStartVnode, newStartVnode))
```

![patch_diff](/源码/vue源码/VirtualDOM/patch_diff_1.svg)

```js
if (sameVnode(oldEndVnode, newEndVnode))
```

![patch_diff](/源码/vue源码/VirtualDOM/patch_diff_2.svg)

```js
if (sameVnode(oldStartVnode, newEndVnode))
```

![patch_diff](/源码/vue源码/VirtualDOM/patch_diff_3.svg)

```js
if (sameVnode(oldEndVnode, newStartVnode))
```

![patch_diff](/源码/vue源码/VirtualDOM/patch_diff_4.svg)

```js
if (isUndef(idxInOld))
```

![patch_diff](/源码/vue源码/VirtualDOM/patch_diff_5.svg)

```js
if (sameVnode(vnodeToMove, newStartVnode))
```

![patch_diff](/源码/vue源码/VirtualDOM/patch_diff_6.svg)

```js
if (oldStartIdx > oldEndIdx)
```

![patch_diff](/源码/vue源码/VirtualDOM/patch_diff_7.svg)

```js
if (newStartIdx > newEndIdx)
```

![patch_diff](/源码/vue源码/VirtualDOM/patch_diff_8.svg)

## 总结

首先\_render 方法会将 render 函数转化成一颗 VNode Tree，此时所有接下来的操作都要从这个 VNode Tree 展开，说明层次结构和相关信息都在这里确定了。  
然后在通过\_update 方法，进行 patch 操作，进行新旧节点的比较，一般元素就直接更新操作。

主要是遇到组件，一旦遇到子组件，就要生成子组件的实例（相当于 new Vue({})），然后执行子组件的\$mount 挂载操作，这个时候的子组件 render 函数是已经生成了的，所以\_render 直接可以将已有的 render 函数转化为 VNode Tree，然后依旧是\_update 方法，进行 patch 操作，最终转化成真实 DOM，然后加到父元素的下面，最终形成一个完整的真实 DOM
