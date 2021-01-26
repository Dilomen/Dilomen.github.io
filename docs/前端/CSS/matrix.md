## 概述

我们经常会使用 css 中的 transform 属性来转变元素（图形）。常用的有 rotate 旋转，translate 移动，scale 缩放，skew 拉伸，而这些其实都是基于 matrix 之上封装的 API。所以它们能做到的，matrix 都能做到，且更加灵活以及易于扩展。

matrix 是一种通过 6 个数值来指定一个二维图形进行矩阵转换。

```css
transform: matrix(a, b, c, d, tx, ty);
```

$$
\left[
\begin{matrix}
a &c &tx
\\b &d &ty
\\0 &0 &1
\end{matrix}
\right]
*
\left[
\begin{matrix}
x
\\y
\\1
\end{matrix}
\right]
=
\left[
\begin{matrix}
ax+cy+tx
\\bx+dy+ty
\\0+0+1
\end{matrix}
\right]
$$

x,y 就是需要转化的点，通过矩阵转换后，变成到相应的地方

## 用法

### 移动

最后两个数是作为移动的参数，根据坐标轴，x 轴负数即是往左，y 即是往下，相反就是往右和往上

```css
transform: matrix(1, 0, 0, 1, x轴移动, y轴移动);
```

向左移动 100px

```css
transform: matrix(1, 0, 0, 1, -100, 0);
/* 等价于 */
transform: translateX(-100px);
```

向下移动 100px

```css
transform: matrix(1, 0, 0, 1, 0, 100);
/* 等价于 */
transform: translateY(100px);
```

向左移动 50px，向上移动 100px

```css
transform: matrix(1, 0, 0, 1, -50, -100);
/* 等价于 */
transform: translate(-50, -100);
```

### 缩放

第一个参数和第四个参数分别作为 x 轴的缩放比例和 y 轴的缩放比例，cos90 和 sin90 都是 1

```css
transform: matrix(x轴缩放, 0, 0, y轴缩放, tx, ty);
```

可以理解为 1 就是 100%，那么对应的数值就是 1 的倍数

宽度缩小 0.5 倍

```css
transform: matrix(0.5, 0, 0, 1, 0, 0);
/* 等价于 */
transform: scaleX(0.5);
```

高度放大 2 倍

```css
transform: matrix(1, 0, 0, 2, 0, 0);
/* 等价于 */
transform: scaleY(2);
```

整体放大 3 倍

```css
transform: matrix(3, 0, 0, 3, 0, 0);
/* 等价于 */
transform: scale(3);
```

### 旋转

旋转就要涉及到三角函数中的 sin 正弦和 cos 余弦，根据旋转的角度来代入对应的参数

```css
transform: matrix(cosθ, sinθ, -sinθ, cosθ, 0, 0);
```

旋转 30°

$$
sin30°=1/2
$$

$$
cos30°=\sqrt 3 / 2 ≈ 0.866025
$$

```css
transform: matrix(0.866025, 0.5, -0.5, 0.866025, 0, 0);
/* 等价于 */
transform: rotate(30deg);
```

### 拉伸

拉伸需要使用到正切 tan

```css
transform: matrix(1, tan(θy), tan(θx), 1, 0, 0);
```

x 轴拉伸 30°

```css
transform: matrix(1, 1, 0.57735, 1, 0, 0);
/* 等价于 */
transform: skewX(30deg);
```

y 轴拉伸 30

```css
transform: matrix(1, 0.57735, 1, 1, 0, 0);
/* 等价于 */
transform: skewY(30deg);
```

x 轴拉伸 30°，y 轴拉伸 30°

```css
transform: matrix(1, 0.57735, 0.57735, 1, 0, 0);
/* 等价于 */
transform: skew(30deg, 30deg);
```
