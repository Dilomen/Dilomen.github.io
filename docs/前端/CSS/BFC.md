## 概述

BFC (Block formatting context)，又叫块状格式化上下文，就是一个隔离的独立容器，容器内的元素的属性不会影响到外界的文档流，在容器内相当于又是一个“文档流”，从左至右排布，只存在 block（块状）元素中

## 解决问题

只要元素满足下面任一条件即可触发 BFC 特性：

- body 根元素
- 浮动元素：float 除 none 以外的值
- 绝对定位元素：position (absolute、fixed)
- display 为 inline-block、table-cells、flex
- overflow 除了 visible 以外的值 (hidden、auto、scroll)
