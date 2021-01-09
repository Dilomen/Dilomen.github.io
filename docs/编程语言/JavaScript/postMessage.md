## 简述

window.postMessage 是一种跨域的解决方式，往往使用在 iframe 内嵌页面和父页面的信息传递。

## 语法

```js
otherWindow.postMessage(message, targetOrigin, [transfer]);
```

- otherWindow:表示 iframe 窗口（iframe.contentWindow）或者父窗口
- messgae:可以理解为消息的类型标识，消息的 type 值
- targetOrigin:指定哪些窗口（协议，主机地址，端口都需一致）可接受到信息，可以使用"\*"，表示不限制，但是出于安全考虑，还是建议有限制
- transfer:可选参数，会和 message 一样传递给接收方，(暂时不明确用处)

## 使用

一个页面绑定监听 message 事件，另一个页面可通过 postMessage 发送消息。

1.首先开启两个 node 服务，分别返回以下的 html 静态文件

```html
<!-- 3000端口：父窗口index.html -->
<p>3000</p>
<iframe id="myFrame" src="http://localhost:3001" frameborder="0"></iframe>
```

```html
<!-- 3001端口：iframe窗口child.html -->
<div style="background: rgb(117, 117, 194);">
  我是iframe页面
  <p>3001</p>
</div>
```

2.首先实现父传子，在子页面绑定 message 事件，父页面发送消息

```js
// index.html
myFrame.postMessage({ a: 1, b: 2 }, "http://localhost:3001");
```

```js
// child.html
function receiveMessage(event) {
  if (event.origin !== "http://localhost:3000") return;
  console.log("父传子", event.data); // { a: 1, b: 2 },
}
window.addEventListener("message", receiveMessage, false);
```

!!!但是往往出现父页面发送了消息，子页面还没有执行到监听 message 事件，所以更好的方式是子页面在监听完成后告知父页面，然后父页面在发送消息，确保子页面一定能够接收到消息。

3.那么父页面就要监听绑定 message 事件了，如子页面监听成功，向父页面发送一个"ready"的消息，父页面接收到该消息后就将对应的数据发送给子页面

```js
// index.html
var myFrame = document.getElementById("myFrame").contentWindow;

function receiveMessage(event) {
  // 如果来源不是指定源，那么就拒绝
  if (event.origin !== "http://localhost:3001") return;
  if (event.data === "ready") {
    myFrame.postMessage({ a: 1, b: 2 }, "http://localhost:3001");
  }
}
window.addEventListener("message", receiveMessage, false);
```

```js
// child.html
window.parent.postMessage("ready", "http://localhost:3000");
```

4.这样就实现了父传子，子传父，但是还不够灵活，比如我们还希望通过自己的触发事件来传递消息。

```js
// child.html
<button id="btn" onclick="handleMessage()">
  传给父级
</button>;
function handleMessage() {
  window.parent.postMessage("childClick", "http://localhost:3000");
}
```

```js
// index.html
if (event.data === "childClick") {
  console.log("子传父触发");
}
```
