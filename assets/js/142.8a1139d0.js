(window.webpackJsonp=window.webpackJsonp||[]).push([[142],{534:function(t,e,r){"use strict";r.r(e);var a=r(28),s=Object(a.a)({},(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[r("h2",{attrs:{id:"概述"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#概述"}},[t._v("#")]),t._v(" 概述")]),t._v(" "),r("p",[t._v("现代浏览器的功能日渐强大，Chrome 更是“独树一帜”，对于浏览器的认识能让我们的认知和对于一些性能提升都有很大的帮助")]),t._v(" "),r("p",[t._v("本文主要是对"),r("a",{attrs:{href:"https://developers.google.com/web/updates/2018/09/inside-browser-part1",target:"_blank",rel:"noopener noreferrer"}},[t._v("Inside look at modern web browser"),r("OutboundLink")],1),t._v("文章的收获总结")]),t._v(" "),r("h2",{attrs:{id:"进程和线程"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#进程和线程"}},[t._v("#")]),t._v(" 进程和线程")]),t._v(" "),r("blockquote",[r("p",[t._v("以 Chrome 为例")])]),t._v(" "),r("h4",{attrs:{id:"chrome-有-4-个进程-分别是浏览器进程-渲染进程-插件进程-gpu-进程"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#chrome-有-4-个进程-分别是浏览器进程-渲染进程-插件进程-gpu-进程"}},[t._v("#")]),t._v(" Chrome 有 4 个进程，分别是"),r("em",[t._v("浏览器进程，渲染进程，插件进程，GPU 进程")])]),t._v(" "),r("table",[r("thead",[r("tr",[r("th",[t._v("线程")]),t._v(" "),r("th",[t._v("作用")])])]),t._v(" "),r("tbody",[r("tr",[r("td",[t._v("Browser Process")]),t._v(" "),r("td",[t._v("控制 chrome 应用部分，即提供的地址栏，书签，历史记录，文件访问等等")])]),t._v(" "),r("tr",[r("td",[t._v("Renderer Process")]),t._v(" "),r("td",[t._v("每个窗口页面的展示")])]),t._v(" "),r("tr",[r("td",[t._v("Plugin Process")]),t._v(" "),r("td",[t._v("控制网站的所有插件，如 flash")])]),t._v(" "),r("tr",[r("td",[t._v("GPU Process")]),t._v(" "),r("td",[t._v("处理 GPU 相关任务")])])])]),t._v(" "),r("p",[r("a",{attrs:{"data-fancybox":"",title:"chrome进程",href:"/前端/chrome进程.png"}},[r("img",{attrs:{src:"/%E5%89%8D%E7%AB%AF/chrome%E8%BF%9B%E7%A8%8B.png",alt:"chrome进程"}})])]),t._v(" "),r("blockquote",[r("p",[t._v("摘自 "),r("a",{attrs:{href:"https://developers.google.com/web/updates/2018/09/inside-browser-part1",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://developers.google.com/web/updates/2018/09/inside-browser-part1"),r("OutboundLink")],1)])]),t._v(" "),r("p",[t._v("打开【更多工具】-> 【任务管理器】就可以看到浏览器当前跑的进程")]),t._v(" "),r("h4",{attrs:{id:"由图可以看到每个标签页和插件都会创建独立的一个进程"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#由图可以看到每个标签页和插件都会创建独立的一个进程"}},[t._v("#")]),t._v(" 由图可以看到每个标签页和插件都会创建独立的一个进程")]),t._v(" "),r("div",{staticClass:"custom-block tip"},[r("p",{staticClass:"custom-block-title"},[t._v("那么为什么要这设计呢,会不会太浪费资源")]),t._v(" "),r("p",[t._v("这主要是为了提升体验而不得不做的选择，因为进程都是独立空间的，可以保证一个页面的崩溃不会影响另一个页面。")]),t._v(" "),r("p",[t._v("当然 chrome 也不会无限制的创建进程，当到达一定的范围（取决于设备的内存和 CPU 能力）时，它就会"),r("em",[t._v("将同一个站点的标签页放到同一个进程")])]),t._v(" "),r("p",[t._v("当然为当设备条件不允许资源匮乏下的情况下，Chrome 为了节省资源会选用以下其中一种")]),t._v(" "),r("ul",[r("li",[t._v("Process-per-site-instance (default) - 同一个 site-instance 使用一个进程")]),t._v(" "),r("li",[t._v("Process-per-site - 同一个 站点 使用一个进程")]),t._v(" "),r("li",[t._v("Process-per-tab - 每个 tab 使用一个进程")]),t._v(" "),r("li",[t._v("Single process - 所有 tab 共用一个进程")])]),t._v(" "),r("h5",{attrs:{id:"site-同站-同一个站点-就是域名和协议一样-如-a-baidu-com-和-b-baidu-com-且都是-https"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#site-同站-同一个站点-就是域名和协议一样-如-a-baidu-com-和-b-baidu-com-且都是-https"}},[t._v("#")]),t._v(" "),r("em",[t._v("site 同站")]),t._v("（同一个站点）：就是域名和协议一样，如 a.baidu.com 和 b.baidu.com,且都是 https")]),t._v(" "),r("h5",{attrs:{id:"site-instance-就是通过-js-代码-如-window-open-或者-html-如-a-target-blank-打开的同-site-页面"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#site-instance-就是通过-js-代码-如-window-open-或者-html-如-a-target-blank-打开的同-site-页面"}},[t._v("#")]),t._v(" "),r("em",[t._v("site-instance")]),t._v('：就是通过 JS 代码（如 window.open）或者 HTML（如<a\\ target="_blank">）打开的同 site 页面')])]),t._v(" "),r("blockquote",[r("p",[r("a",{attrs:{"data-fancybox":"",title:"chrome正在跑的进程",href:"/前端/chromeProcessRunning.png"}},[r("img",{attrs:{src:"/%E5%89%8D%E7%AB%AF/chromeProcessRunning.png",alt:"chrome正在跑的进程"}})])])]),t._v(" "),r("p",[t._v("当设备硬件有很大的支持下，Chrome 会将各个服务"),r("em",[t._v("拆分成不同的服务进程")]),t._v("，以此来提供更高的稳定性，正如上图所示的 Network Service，Storage Service 都是属于服务进程。但是当设备条件不允许下，那么为了节省内存，Chrome 会将这些服务进程组合成一个进程\n"),r("a",{attrs:{"data-fancybox":"",title:"chrome服务进程",href:"/前端/chrome服务进程.png"}},[r("img",{attrs:{src:"/%E5%89%8D%E7%AB%AF/chrome%E6%9C%8D%E5%8A%A1%E8%BF%9B%E7%A8%8B.png",alt:"chrome服务进程"}})])]),t._v(" "),r("blockquote",[r("p",[t._v("摘自 "),r("a",{attrs:{href:"https://developers.google.com/web/updates/2018/09/inside-browser-part1",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://developers.google.com/web/updates/2018/09/inside-browser-part1"),r("OutboundLink")],1)])]),t._v(" "),r("div",{staticClass:"custom-block tip"},[r("p",{staticClass:"custom-block-title"},[t._v("网站隔离")]),t._v(" "),r("p",[t._v("每一个嵌套在页面的 iframe 页面也会有一个独立的渲染器进程（Renderer Process）")])]),t._v(" "),r("h4",{attrs:{id:"浏览器进程有-3-个线程"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#浏览器进程有-3-个线程"}},[t._v("#")]),t._v(" 浏览器进程有 3 个线程")]),t._v(" "),r("table",[r("thead",[r("tr",[r("th",[t._v("线程")]),t._v(" "),r("th",[t._v("作用")])])]),t._v(" "),r("tbody",[r("tr",[r("td",[t._v("UI thread")]),t._v(" "),r("td",[t._v("用于绘制浏览器的按钮和输入字段")])]),t._v(" "),r("tr",[r("td",[t._v("network thread")]),t._v(" "),r("td",[t._v("用于对网络的数据处理")])]),t._v(" "),r("tr",[r("td",[t._v("storage thread")]),t._v(" "),r("td",[t._v("用于控制对文件的访问")])])])]),t._v(" "),r("h2",{attrs:{id:"导航请求"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#导航请求"}},[t._v("#")]),t._v(" 导航请求")]),t._v(" "),r("p",[t._v("导航栏输入\n1、当在导航栏输入内容后确认，浏览器会先"),r("em",[t._v("判断内容")]),t._v("是 URL 还是搜索查询？")]),t._v(" "),r("ul",[r("li",[t._v("搜索查询，将内容交给搜索引擎，开始搜索")]),t._v(" "),r("li",[t._v("URL，开始 DNS 解析、建立 TLS 连接等等的一系列操作")])]),t._v(" "),r("p",[t._v("2、UI 线程告知 network 线程，"),r("em",[t._v("请求资源")])]),t._v(" "),r("p",[t._v("3、network 线程读取相应内容，就会告知 UI 线程，如果是 HTML 就开始进行渲染，如果是文件，就进入下载请求")]),t._v(" "),r("p",[t._v("4、然后 UI 线程就会让浏览器进程通过 IPC 来调度渲染器进程及向其发送数据流（包括 HTML 等），整个导航就完成了，"),r("em",[t._v("文档开始加载")])]),t._v(" "),r("p",[t._v("5、当遇到 HTML 内部需要加载资源的时候，渲染器进程会通知浏览器进程去执行网络线程来请求资源")]),t._v(" "),r("p",[t._v("6、当页面加载完成，渲染器进程就会通知浏览器进程")]),t._v(" "),r("h2",{attrs:{id:"页面渲染"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#页面渲染"}},[t._v("#")]),t._v(" 页面渲染")]),t._v(" "),r("p",[t._v("渲染器进程的主要工作就是将 HTML，CSS，js 的代码转化为可以与用户交互的页面")]),t._v(" "),r("div",{staticClass:"custom-block tip"},[r("p",{staticClass:"custom-block-title"},[t._v("JS 为什么会阻塞代码的执行")]),t._v(" "),r("p",[t._v("因为 JS 有控制 DOM 的能力，如果 HTML 和 JS 同时执行的话会混乱，所以当遇到 JS 代码时，会阻塞 HTML 的加载")])]),t._v(" "),r("p",[t._v("1、首先渲染器进程会收到浏览器发送过来的 HTML 内容，并生成 document 对象，即"),r("em",[t._v("生成 DOM 树")])]),t._v(" "),r("p",[t._v("2、接着进程下的主线程开始执行"),r("em",[t._v("计算 CSS 样式")]),t._v("，并赋给 DOM 树")]),t._v(" "),r("p",[t._v("3、开始"),r("em",[t._v("计算布局方位")]),t._v("，确定元素的位置，生成 Layout 树")]),t._v(" "),r("p",[t._v("4、确定"),r("em",[t._v("渲染顺序")]),t._v("，先是背景，再试文字，再确定矩形")]),t._v(" "),r("p",[t._v("5、最后渲染页面，将页面的各个部分分成若干份（栅格化），组合成 60fps 频率的帧来展示页面，如果发生滚动，就会组"),r("em",[t._v("合成新的帧")])]),t._v(" "),r("p",[r("a",{attrs:{"data-fancybox":"",title:"chrome渲染合成",href:"/前端/chrome渲染合成2.gif"}},[r("img",{attrs:{src:"/%E5%89%8D%E7%AB%AF/chrome%E6%B8%B2%E6%9F%93%E5%90%88%E6%88%902.gif",alt:"chrome渲染合成"}})])]),t._v(" "),r("blockquote",[r("p",[t._v("合成就是若干份的页面合成成一个页面")])]),t._v(" "),r("p",[r("a",{attrs:{"data-fancybox":"",title:"chrome渲染合成",href:"/前端/chrome渲染合成.gif"}},[r("img",{attrs:{src:"/%E5%89%8D%E7%AB%AF/chrome%E6%B8%B2%E6%9F%93%E5%90%88%E6%88%90.gif",alt:"chrome渲染合成"}})])]),t._v(" "),r("blockquote",[r("p",[t._v("滚动的话，就光栅化更多的页面来补充缺失的部分，形成新的帧进行渲染")])]),t._v(" "),r("p",[r("a",{attrs:{"data-fancybox":"",title:"chrome渲染合成",href:"/前端/chrome渲染合成3.png"}},[r("img",{attrs:{src:"/%E5%89%8D%E7%AB%AF/chrome%E6%B8%B2%E6%9F%93%E5%90%88%E6%88%903.png",alt:"chrome渲染合成"}})])]),t._v(" "),r("h2",{attrs:{id:"事件处理"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#事件处理"}},[t._v("#")]),t._v(" 事件处理")])])}),[],!1,null,null,null);e.default=s.exports}}]);