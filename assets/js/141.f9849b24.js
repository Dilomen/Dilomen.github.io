(window.webpackJsonp=window.webpackJsonp||[]).push([[141],{530:function(a,t,e){"use strict";e.r(t);var r=e(28),s=Object(r.a)({},(function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[e("h2",{attrs:{id:"_304-状态码"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_304-状态码"}},[a._v("#")]),a._v(" 304 状态码")]),a._v(" "),e("blockquote",[e("p",[a._v("请求资源时，当资源返回 304 的状态码时，那么就说明该资源是从缓存下中获取的。")])]),a._v(" "),e("h2",{attrs:{id:"缓存判断"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#缓存判断"}},[a._v("#")]),a._v(" 缓存判断")]),a._v(" "),e("p",[a._v("用户发送请求，浏览器查看是否有缓存，且缓存是否过期，如果缓存未过期，就直接使用缓存，如果过期，就向服务器请求资源")]),a._v(" "),e("h2",{attrs:{id:"缓存性质"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#缓存性质"}},[a._v("#")]),a._v(" 缓存性质")]),a._v(" "),e("p",[a._v("浏览器的缓存分为"),e("strong",[a._v("强缓存")]),a._v("和"),e("strong",[a._v("协商缓存")])]),a._v(" "),e("h4",{attrs:{id:"强缓存"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#强缓存"}},[a._v("#")]),a._v(" 强缓存")]),a._v(" "),e("p",[a._v("用户发送的请求，直接从客户端缓存中获取，不发送请求到服务器，不与服务器发生交互行为")]),a._v(" "),e("h4",{attrs:{id:"协商缓存"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#协商缓存"}},[a._v("#")]),a._v(" 协商缓存")]),a._v(" "),e("p",[a._v("用户发送的请求，发送到服务器后，由服务器判定是否从缓存中获取资源")]),a._v(" "),e("ul",[e("li",[a._v("共同点：都是从客户端的缓存中获取资源")]),a._v(" "),e("li",[a._v("区别：强缓存不与服务器交互，协商缓存需要与服务器交互")])]),a._v(" "),e("h2",{attrs:{id:"过程"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#过程"}},[a._v("#")]),a._v(" 过程")]),a._v(" "),e("p",[a._v("浏览器判定是否有缓存\n检验缓存是否过期\n如果为未过期，直接进行强缓存，如果过期了，那就进行协商缓存，由服务器来检测是否使用缓存")]),a._v(" "),e("h4",{attrs:{id:"强缓存可以通过设置两种-http-header-实现-expires-和-cache-control"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#强缓存可以通过设置两种-http-header-实现-expires-和-cache-control"}},[a._v("#")]),a._v(" 强缓存可以通过设置两种 HTTP Header 实现：Expires 和 Cache-Control")]),a._v(" "),e("ul",[e("li",[e("p",[a._v("Expires 是设置的资源失效日期告知浏览器")])]),a._v(" "),e("li",[e("p",[a._v("Cache-Control 是 HTTP1.1 提出来的，是取代 Expires 的更好办法")]),a._v(" "),e("ul",[e("li",[a._v("max-age: 使用如 max-age=100，就在 100 秒后资源失效")]),a._v(" "),e("li",[a._v("public 表示响应可以被客户端和代理服务器缓存")]),a._v(" "),e("li",[a._v("private 表示响应只能被客户端缓存")])])])]),a._v(" "),e("p",[a._v("两者同时存在的话，Cache-Control 优先级高于 Expires")]),a._v(" "),e("h4",{attrs:{id:"协商缓存可以通过设置两种-http-header-实现-last-modified-和-etag"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#协商缓存可以通过设置两种-http-header-实现-last-modified-和-etag"}},[a._v("#")]),a._v(" 协商缓存可以通过设置两种 HTTP Header 实现：Last-Modified 和 ETag")]),a._v(" "),e("p",[a._v("浏览器检测是否有 Last-Modified，有就添加 If-Modified-Since，然后下一次请求就会对比 If-Modified-Since 和服务器最后修改时间是否一致，如果一致，就返回 304 状态码和空的响应体，如果小于最后修改时间，就返回新的资源")]),a._v(" "),e("p",[a._v("ETag 是 HTTP1.1 提出的，是取代 Last-Modified 更好的办法，ETag 是服务器响应请求时，返回当前资源文件的唯一标识符（hash值），只要文件有变化，ETag 就会重新生成，再次发送请求时，ETag 的值会存入 If-None-Match，发送给服务器，由服务器来判断是否被修改")])])}),[],!1,null,null,null);t.default=s.exports}}]);