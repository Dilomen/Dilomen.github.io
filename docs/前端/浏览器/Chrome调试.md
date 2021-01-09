### console.table

按表格展示数据内容

### 查看接口请求是哪里执行的

可以点开 network 下的接口请求，找到 Initiator，这里会出现接口接口请求的执行栈

<a data-fancybox title=""接口执行代码位置定位"" href="/前端/接口执行代码位置定位.png">!["接口执行代码位置定位"](/前端/接口执行代码位置定位.png)</a>

### 查看请求连接时间

可以由下图可知

- DNS 域名解析 12μs
- 建立 TCP 使用了 60ms
- 建立 HTTPS 连接使用了 43.35ms
- 从建立连接到接受到数据，等待了 31.83ms
- 资源下载用了 0.2ms

<a data-fancybox title=""查看连接时间"" href="/前端/查看连接时间.png">!["查看连接时间"](/前端/查看连接时间.png)</a>

### 查看元素上的绑定事件

查找元素的 Event Listeners，点开绑定的事件，就可以知道在相应操作时所执行了哪些事件

<a data-fancybox title=""元素上的绑定事件"" href="/前端/元素上的绑定事件.png">!["元素上的绑定事件"](/前端/元素上的绑定事件.png)</a>

### 浏览器直接修改文件

> 场景：当我们在浏览器中直接调试样式等操作时，希望操作的步骤同步到文件时，可以通过以下方式：

打开 Sources，找到 Filesystem，点击 Add folder to workspace，加入自己的工作目录即可

<a data-fancybox title=""浏览器直接修改文件"" href="/前端/浏览器直接修改文件.png">!["浏览器直接修改文件"](/前端/浏览器直接修改文件.png)</a>

然后就可以修改浏览器中的“文件”，或者在样式调试中修改，所修改的内容会同步到文件

### 监控页面的重绘（性能检测）

> 场景：我们需要对页面进行性能优化的时候，希望能看到哪些内容被重绘了
> <a data-fancybox title=""浏览器直接修改文件"" href="/前端/重绘监控01.png '浏览器直接修改文件'">!["浏览器直接修改文件"](/前端/重绘监控01.png '浏览器直接修改文件')</a>

点击“三点“拓展，选择 More tools,然后点击 Rendering
<a data-fancybox title=""浏览器直接修改文件"" href="/前端/重绘监控02.png '浏览器直接修改文件'">!["浏览器直接修改文件"](/前端/重绘监控02.png '浏览器直接修改文件')</a>
选择想要显示高亮的内容

### 设备模拟网络请求

<a data-fancybox title=""浏览器直接修改文件"" href="/前端/设备模拟网络请求01.png">!["浏览器直接修改文件"](/前端/设备模拟网络请求01.png)</a>

可以查看不同网络和不同设备，在请求内容的不同表现

<a data-fancybox title=""浏览器直接修改文件"" href="/前端/设备模拟网络请求02.png">!["浏览器直接修改文件"](/前端/设备模拟网络请求02.png)</a>

### 测试当前页面的方法和添加新的方法

Source 下的 snippet 可以编辑新的代码在当前页面下执行

<a data-fancybox title=""snippet测试方法"" href="/前端/snippet测试方法.png 'snippet测试方法'">!["snippet测试方法"](/前端/snippet测试方法.png 'snippet测试方法')</a>

### Performance

记录和运行分析应用程序所有的活动

<a data-fancybox title=""Performance"" href="/前端/Performance.png">!["Performance"](/前端/Performance.png)</a>

> 转载于[https://blog.csdn.net/kongduxue/article/details/82017491](https://blog.csdn.net/kongduxue/article/details/82017491)

同时还有一个 performance 的全局对象，包含各种性能数据

<a data-fancybox title=""performance对象"" href="/前端/performance对象.png">!["performance对象"](/前端/performance对象.png)</a>

```js
performance = {
  // memory 是非标准属性，只在 Chrome 有
  //这个属性提供了一个可以获取到基本内存使用情况的对象
  memory: {
    usedJSHeapSize: 10000000, // JS 对象（包括V8引擎内部对象）占用的内存
    totalJSHeapSize: 10000000, // 可使用的内存
    jsHeapSizeLimit: 2190000000, // 内存大小限制
  },

  //  navigation: 提供操作（包含在 timing 里时间）的有用上下文
  //包括页面是加载还是刷新、发生了多少次重定向，等等。
  navigation: {
    redirectCount: 0, // 重定向次数
    type: 0, // 0   正常进入的页面（即非刷新、非重定向等）
    // 1   通过 window.location.reload() (即刷新页面)
    // 2   通过浏览器的前进后退按钮进入的页面（历史记录）
    // 255 非以上方式进入的页面
  },

  timing: {
    // 同一个浏览器上下文的上一个文档卸载(unload)结束时的UNIX时间戳。
    //如果没有上一个文档，这个值会和fetchStart相同。
    navigationStart: 1441112691935,

    // 上一个文档unload事件抛出时的UNIX时间戳。
    //如果没有上一个文档,这个值会返回0.
    unloadEventStart: 0,

    // 和 unloadEventStart 相对应，unload事件处理完成时的UNIX时间戳。
    //如果没有上一个文档,这个值会返回0.
    unloadEventEnd: 0,

    // 第一个HTTP重定向开始时的UNIX时间戳。
    //如果没有重定向，或者重定向中的一个不同源，这个值会返回0.
    redirectStart: 0,

    // 最后一个HTTP重定向完成时（也就是说是HTTP响应的最后一个比特直接被收到的时间）的UNIX时间戳。
    //如果没有重定向，或者重定向中的一个不同源，这个值会返回0.
    redirectEnd: 0,

    // 浏览器准备好使用HTTP请求来获取(fetch)文档的UNIX时间戳。这个时间点会在检查任何应用缓存之前。
    fetchStart: 1441112692155,

    // DNS 域名查询开始的UNIX时间戳。
    //如果使用了持续连接(persistent connection)，或者这个信息存储到了缓存或者本地资源上，这个值将和fetchStart一致。
    domainLookupStart: 1441112692155,

    // DNS 域名查询完成的时间.
    //如果使用了本地缓存（即无 DNS 查询）或持久连接，则与 fetchStart 值相等
    domainLookupEnd: 1441112692155,

    // HTTP（TCP） 域名查询结束的UNIX时间戳。
    //如果使用了持续连接(persistent connection)，或者这个信息存储到了缓存或者本地资源上，这个值将和 fetchStart一致。
    connectStart: 1441112692155,

    // HTTP（TCP） 返回浏览器与服务器之间的连接建立时的Unix毫秒时间戳。
    // 如果建立的是持久连接，则返回值等同于fetchStart属性的值。
    //连接建立指的是所有握手和认证过程全部结束。
    connectEnd: 1441112692155,

    // HTTPS 返回浏览器与服务器开始安全链接的握手时的Unix毫秒时间戳。
    //如果当前网页不要求安全连接，则返回0。
    secureConnectionStart: 0,

    // 返回浏览器向服务器发出HTTP请求时（或开始读取本地缓存时）的Unix毫秒时间戳。
    requestStart: 1441112692158,

    // 返回浏览器从服务器收到（或从本地缓存读取）第一个字节时的Unix毫秒时间戳。
    //如果传输层在开始请求之后失败并且连接被重开，该属性将会被数制成新的请求的相对应的发起时间。
    responseStart: 1441112692686,

    // 返回浏览器从服务器收到（或从本地缓存读取，或从本地资源读取）最后一个字节时（如果在此之前HTTP连接已经关闭，则返回关闭时）的Unix毫秒时间戳。
    responseEnd: 1441112692687,

    // 当前网页DOM结构开始解析时（即Document.readyState属性变为“loading”、相应的 readystatechange事件触发时）的Unix毫秒时间戳。
    domLoading: 1441112692690,

    // 当前网页DOM结构结束解析、开始加载内嵌资源时（即Document.readyState属性变为“interactive”、相应的readystatechange事件触发时）的Unix毫秒时间戳。
    domInteractive: 1441112693093,

    // 当解析器发送DOMContentLoaded 事件，即所有需要被执行的脚本已经被解析时的Unix毫秒时间戳。
    domContentLoadedEventStart: 1441112693093,

    // 当所有需要立即执行的脚本已经被执行（不论执行顺序）时的Unix毫秒时间戳。
    domContentLoadedEventEnd: 1441112693101,

    // 当前文档解析完成，即Document.readyState 变为 'complete'且相对应的readystatechange 被触发时的Unix毫秒时间戳
    domComplete: 1441112693214,

    // load事件被发送时的Unix毫秒时间戳。如果这个事件还未被发送，它的值将会是0。

    loadEventStart: 1441112693214,

    // 当load事件结束，即加载事件完成时的Unix毫秒时间戳。如果这个事件还未被发送，或者尚未完成，它的值将会是0.
    loadEventEnd: 1441112693215,
  },
};
```

> 转载于[https://www.cnblogs.com/yuqing6/p/8463113.html](https://www.cnblogs.com/yuqing6/p/8463113.html)

同时该对象可以通过其 now 方法来更加精确的计算任务所使用的时间,

```js
function computed() {
  const startTime = performance.now();
  doSomeThing();
  const endTime = performance.now();
  return endTime - startTime;
}
```

### 持续更新中...
