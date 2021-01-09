## 概述

这里主要是举列一些 HTML5 的新 DOM API，这些 API 可能平时很少用到，甚至都没见过，但是“书到用时方恨少”，我们还是需要先积累，当真的用的时候，我们就可以利用这些 API 大大提高生产效率

## IntersectionObserver

可以检测某个元素是否进入了页面可视区域。往往被用以图片懒加载的场景，当图片元素出现到页面可视区域时，才加载图片以减少消耗。

#### methods

disconnect() 停止监听工作
observe(元素) 监听一个元素
unobserve(元素) 停止监听特定的元素

#### 简单使用

```js
var observer = new IntersectionObserver(callback);
function callback(entries) {
  entries.forEach((item) => {
    // 表示出现在可视区了
    if (item.intersectionRatio > 0) {
      console.log(item.target); // 获取元素节点
    }
  });
}
observer.observe(document.querySelectorAll('.class'));
```

## MutationObserver

监听 DOM 树的变化，对目标DOM进行observe，并进行所需的配置要求

```js
let observe = new MutationObserver(function(mutations, observe) {
  mutations.forEach((record) => {
    console.log(record.type); // 观察的类型：childList，subtree，attributeFilter，characterData
    console.log(record.target); // 元素
    console.log(record.addedNodes); // 添加的节点
    console.log(record.removedNodes); // 删除的节点
  });
});
let target = document.getElementById('target');
observe.observe(target, {
  childList: true, // 只观察子代的变化
  subtree: true, // 观察到子孙代的变化
  attributeFilter: ['class'], // 观察属性变化
  characterData: true, // 只观察文本节点的内容变化
});
target.appendChild(document.createTextNode('新增Text节点'));
target.childNodes[0].textContent = '改变子节点的后代';
```
