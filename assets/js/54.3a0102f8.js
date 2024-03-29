(window.webpackJsonp=window.webpackJsonp||[]).push([[54],{444:function(t,v,_){"use strict";_.r(v);var e=_(28),a=Object(e.a)({},(function(){var t=this,v=t.$createElement,_=t._self._c||v;return _("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[_("h2",{attrs:{id:"异步-i-o"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#异步-i-o"}},[t._v("#")]),t._v(" 异步 I/O")]),t._v(" "),_("p",[t._v("异步 I/O 是 Node 的一大特色，也是其非阻塞 I/O 的一种实现方法")]),t._v(" "),_("p",[t._v("由于 Node 是单线程（JS 层），所以必须串行执行任务，那么一个 I/O 操作的阻塞就会造成 CPU 的资源浪费，所以异步 I/O 可以让单线程远离阻塞，更好的利用 CPU")]),t._v(" "),_("p",[t._v("单线程的场景下")]),t._v(" "),_("ul",[_("li",[_("strong",[t._v("阻塞 I/O")]),_("br"),t._v("\n在 I/O 调用结束前，不能进行别的任务的执行，造成 CPU 等待，浪费资源")]),t._v(" "),_("li",[_("strong",[t._v("非阻塞 I/O")]),_("br"),t._v("\n发起 I/O 调用后，立即返回，返回后即可执行别的任务"),_("br"),t._v("\n但是返回的只是状态，而不是完整的数据，之后需要通过轮询的方式去查看数据是否获取完全\n"),_("blockquote",[_("p",[t._v("注：轮询是一种比较性能低的方式，理想的是通过 I/O 完成后主动返回给应用程序，就不需要每次查看是否数据完整")])])])]),t._v(" "),_("h2",{attrs:{id:"node-中的实现"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#node-中的实现"}},[t._v("#")]),t._v(" Node 中的实现")]),t._v(" "),_("p",[t._v("虽然 Node 的上层（JS 层）是单线程，但是下层（C++）则是多线程，其 I/O 处理会交给底层的线程池处理")]),t._v(" "),_("h4",{attrs:{id:"事件循环"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#事件循环"}},[t._v("#")]),t._v(" 事件循环")]),t._v(" "),_("p",[t._v("这个词对于前端并不陌生，但是 EventLoop 在浏览器同样存在，但是两端还是有区别的")]),t._v(" "),_("ul",[_("li",[_("p",[t._v("浏览器端:"),_("br"),t._v("\n宏任务 -> 所有微任务 -> 宏任务 -> 所有微任务")])]),t._v(" "),_("li",[_("p",[t._v("node:"),_("br"),t._v("\n一个阶段的宏任务微任务 -> 一个阶段的宏任务微任务")])])]),t._v(" "),_("blockquote",[_("p",[t._v("这里不做过多叙述")])]),t._v(" "),_("h4",{attrs:{id:"观察者"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#观察者"}},[t._v("#")]),t._v(" 观察者")]),t._v(" "),_("p",[t._v("事件循环是一个"),_("strong",[t._v("生产者/消费者模型")]),t._v("，异步 I/O 和网络请求等是事件的生产者，并有观察者判断当前是否有事件，有则执行")]),t._v(" "),_("h4",{attrs:{id:"请求对象"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#请求对象"}},[t._v("#")]),t._v(" 请求对象")]),t._v(" "),_("p",[t._v("当我们代码使用 Node 的 API 进行 I/O 处理时，其会先调用 C++内建模块，然后通过 libuv 进行系统调用。JS 的调用会立即返回，这时就可以执行别的任务，而 I/O 操作会在线程池中等待执行，从而不阻塞别的任务的执行")]),t._v(" "),_("h4",{attrs:{id:"执行回调"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#执行回调"}},[t._v("#")]),t._v(" 执行回调")]),t._v(" "),_("p",[t._v("当线程池中的 I/O 操作执行完毕后，就会通过对应的方法，通知上层，将线程池中有执行完的请求放入 I/O 观察者队列，I/O 观察者观察到队列中有待处理的事件，就会执行")]),t._v(" "),_("h2",{attrs:{id:"api"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#api"}},[t._v("#")]),t._v(" api")]),t._v(" "),_("p",[t._v("process.nextTick 和 setImmediate 是 node 异步特有的 api")]),t._v(" "),_("p",[t._v("两者都会比 setTimeout 性能更优，process.nextTick优先级高于setImmediate")]),t._v(" "),_("ul",[_("li",[t._v("process.nextTick\n"),_("ul",[_("li",[t._v("属于idle观察者，先于I/O观察者")]),t._v(" "),_("li",[t._v("回调是保存在一个数组中")]),t._v(" "),_("li",[t._v("每轮循环，会将数组中的回调函数全部执行完")])])]),t._v(" "),_("li",[t._v("setImmediate\n"),_("ul",[_("li",[t._v("属于check观察者，后于I/O观察者")]),t._v(" "),_("li",[t._v("回调是保存在一个链表中")]),t._v(" "),_("li",[t._v("每轮循环，只执行链表中的一个回调函数")])])])])])}),[],!1,null,null,null);v.default=a.exports}}]);