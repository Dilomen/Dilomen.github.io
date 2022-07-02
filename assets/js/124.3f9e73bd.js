(window.webpackJsonp=window.webpackJsonp||[]).push([[124],{510:function(t,s,a){"use strict";a.r(s);var n=a(28),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h2",{attrs:{id:"前言"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#前言"}},[t._v("#")]),t._v(" 前言")]),t._v(" "),a("p",[t._v("高级编程语言根据执行状态可分为"),a("em",[t._v("编译型语言")]),t._v("和"),a("em",[t._v("解释型语言")])]),t._v(" "),a("ul",[a("li",[a("p",[t._v("编译型语言"),a("br"),t._v("\n源程序 -> 中间代码 -> 目标代码 -> 执行")])]),t._v(" "),a("li",[a("p",[t._v("解释型语言"),a("br"),t._v("\n源程序 -> 边解释边执行")])])]),t._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[t._v("TIP")]),t._v(" "),a("p",[t._v("javaScript 被指明为解释型语言，是因为其直接解释执行，而不需要编译为中间代码。\n但是也可以看到 js 在执行前还是会做优化的，比如变量提升等操作，这是由于浏览器厂商为了提升 JS 的性能所做的 "),a("em",[t._v("JIT（即时编译）")]),t._v("，它会将一些循环等重复工作先编译成一个版本，当再次遇到就不需要在编译，而是直接用编译好的。")])]),t._v(" "),a("h2",{attrs:{id:"编译过程"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#编译过程"}},[t._v("#")]),t._v(" 编译过程")]),t._v(" "),a("p",[t._v("解释型语言也是需要编译的，编译过程由宿主环境（浏览器或 Node）来执行完成")]),t._v(" "),a("ul",[a("li",[a("p",[t._v("词法分析：")]),t._v(" "),a("ul",[a("li",[a("p",[t._v("词法规则：符号书写规则，如非法字符，关键字或标识符拼写错误")])]),t._v(" "),a("li",[a("p",[t._v("处理：把语句分解成词法单元，即 Token")]),t._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" a "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v("\n会被词法分析器识别为："),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" a"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v("  并且加上识别标识\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br")])])])])]),t._v(" "),a("li",[a("p",[t._v("语法分析")]),t._v(" "),a("ul",[a("li",[t._v("语法规则：符号构成语法成分的规则，如语法结构出错，if endif 不匹配")]),t._v(" "),a("li",[t._v("处理：将 Token 转化为"),a("em",[t._v("抽象语法树（AST）")])])])]),t._v(" "),a("li",[a("p",[t._v("语义分析")]),t._v(" "),a("ul",[a("li",[t._v("语义规则：语义检查，如死循环，零除数，其它逻辑错误")])])])]),t._v(" "),a("h2",{attrs:{id:"预解析"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#预解析"}},[t._v("#")]),t._v(" 预解析")]),t._v(" "),a("p",[t._v("该操作会将变量声明 var 和函数声明 function 做提升操作，"),a("em",[t._v("函数声明要比变量声明优先级更高")]),t._v("。")]),t._v(" "),a("p",[t._v("变量声明时只是"),a("em",[t._v("声明")]),t._v("，而函数声明时是"),a("em",[t._v("声明+定义（赋值）")])]),t._v(" "),a("p",[t._v("1、函数先声明并赋值了，所以输出的就是 function")]),t._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("a")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" a"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nconsole"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("a"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// function a() {}")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br")])]),a("p",[t._v("2、函数先声明并赋值了，但是 a 又被赋值成 1 了，所以输出的就是 1")]),t._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("a")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" a "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nconsole"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("a"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 1")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br")])]),a("h2",{attrs:{id:"执行机制"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#执行机制"}},[t._v("#")]),t._v(" 执行机制")]),t._v(" "),a("p",[t._v("JavaScript 是一门单线程语言（因为要保证不能冲突操作 DOM），所以在执行的时候会出现堵塞的情况，为了避免长时间的等待，JS 引入了异步的概念，将等待的任务先放到异步队列，然后当同步代码执行完毕，再 Event Loop 来调取异步队列的任务")]),t._v(" "),a("p",[t._v("对于一些事件的处理和处理函数的调用是异步")]),t._v(" "),a("ul",[a("li",[t._v("浏览器事件，如页面加载完成")]),t._v(" "),a("li",[t._v("ajax 网络请求事件")]),t._v(" "),a("li",[t._v("用户操作事件，如点击，键盘")]),t._v(" "),a("li",[t._v("计时器事件，setTimeout")])]),t._v(" "),a("h4",{attrs:{id:"调用栈"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#调用栈"}},[t._v("#")]),t._v(" 调用栈")]),t._v(" "),a("p",[t._v("由于 JavaScript 是单线程的，所以只能在某一刻执行某个代码，而不能同时执行。\n一旦函数发生调用当前的执行上下文就必须停止，并创建新的函数执行上下文，直到函数执行完成，将函数执行上下文销毁，返回到调用的执行上下文。所以被称为调用栈，是一种先进后出的数据结构。")]),t._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("outer")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'outer'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("inner")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("inner")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'inner'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("outer")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br")])]),a("ol",[a("li",[t._v("程序开始，就会创建一个全局执行上下文")]),t._v(" "),a("li",[t._v("首先全局调用了 outer 函数，所以创建了 outer 函数执行上下文")]),t._v(" "),a("li",[t._v("在 outer 里又调用了 inner 函数，所以有创建了 inner 函数上下文")]),t._v(" "),a("li",[t._v("inner 函数执行完成，回到 outer 函数执行上下文")]),t._v(" "),a("li",[t._v("outer 函数执行完成，回到全局执行上下文\n"),a("a",{attrs:{"data-fancybox":"",title:"js调用栈",href:"/JavaScript/js调用栈.png"}},[a("img",{attrs:{src:"/JavaScript/js%E8%B0%83%E7%94%A8%E6%A0%88.png",alt:"js调用栈"}})])])]),t._v(" "),a("p",[t._v("同样也可以在 chrome 浏览器的调试中观察到")]),t._v(" "),a("p",[a("a",{attrs:{"data-fancybox":"",title:"js调用栈_chrome",href:"/JavaScript/js调用栈_chrome.png"}},[a("img",{attrs:{src:"/JavaScript/js%E8%B0%83%E7%94%A8%E6%A0%88_chrome.png",alt:"js调用栈_chrome"}})])]),t._v(" "),a("h4",{attrs:{id:"事件循环-event-loop"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#事件循环-event-loop"}},[t._v("#")]),t._v(" 事件循环(Event Loop)")]),t._v(" "),a("p",[t._v("JavaScript 是只有一个主线程和一个调用栈，调用栈会将要执行的任务通知主线程，让主线程来执行。")]),t._v(" "),a("ul",[a("li",[t._v("1:调用栈顺序调用任务队列中任务")]),t._v(" "),a("li",[t._v("2:当调用栈发现异步任务时，会将异步代码放到异步队列，接着执行下面的代码")]),t._v(" "),a("li",[t._v("3:同步代码执行完毕，当主线程处于闲置状态，那么就会去查看异步队列中是否有任务，如果有那就执行第一个任务")])]),t._v(" "),a("h4",{attrs:{id:"宏任务-macro-task-和微任务-micro-task"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#宏任务-macro-task-和微任务-micro-task"}},[t._v("#")]),t._v(" 宏任务（macro-task）和微任务（micro-task）")]),t._v(" "),a("p",[t._v("宏任务包括：script(整体代码), setTimeout, setInterval, setImmediate（NodeJs）, I/O, UI rendering。\n微任务包括: process.nextTick（NodeJs）, Promise, Object.observe(已废弃), MutationObserver(html5 新特性)")]),t._v(" "),a("h4",{attrs:{id:"总结"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#总结"}},[t._v("#")]),t._v(" 总结")]),t._v(" "),a("p",[t._v("调用栈会先执行宏（队列）任务，然后当调用栈为空时（即任务执行完毕），再调用微（队列）任务，直到再次为空，再调用宏（队列）任务，以此循环")])])}),[],!1,null,null,null);s.default=e.exports}}]);