题目：将一个给定字符串根据给定的行数，以从上往下、从左到右进行 Z 字形排列  
比如输入字符串为 "LEETCODEISHIRING" 行数为 3 时，排列如下：

```txt
L   C   I   R
E T O E S I I G
E   D   H   N
```

输出结果为："LCIRETOESIIGEDHN"

解题思路：列 n 个字符串，对每一个字符进行位置判断，添加到对应的字符串后

> https://leetcode-cn.com/problems/zigzag-conversion/

```js
var convert = function (s, numRows) {
  let sLength = s.length;
  if (!sLength) return '';
  let a = new Array(numRows);
  let pair = numRows * 2 - 2;
  let k = 0,
    j = 0;
  while (k < sLength) {
    let m = k % pair;
    if (numRows <= m && m < 2 * numRows - 1) {
      for (let i = 1; i < numRows - 1 && k < sLength; i++) {
        a[numRows - i - 1] = (a[numRows - i - 1] || '') + s[k];
        k++;
      }
    } else {
      for (let i = 0; i < numRows && k < sLength; i++) {
        a[i] = (a[i] || '') + s[k];
        k++;
      }
    }
    j++;
  }
  return a.join('');
};
```

进一步，如果是排列成题目样式，使用二维数组

```js
var convert = function (s, numRows) {
  let sLength = s.length;
  if (!sLength) return '';
  let pair = numRows * 2 - 2;
  let n = sLength / pair;
  let m = sLength % pair;
  let col = m > numRows ? 2 : 1;
  var a = new Array();
  for (let i = 0; i < numRows; i++) {
    a[i] = new Array();
    for (let j = 0; j < n * (numRows - 1); j++) {
      a[i][j] = undefined;
    }
  }
  let j = 0;
  k = 0;
  while (k < sLength) {
    if (numRows <= k % pair && k % pair < 2 * numRows - 1) {
      for (let i = 1; i < numRows - 1; i++) {
        a[numRows - i - 1][j] = s[k];
        k++;
        j++;
      }
    } else {
      for (let i = 0; i < numRows; i++) {
        a[i][j] = s[k];
        k++;
      }
      j++;
    }
  }
  let str = '';
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < a[0].length; j++) {
      if (a[i][j]) {
        str += a[i][j] + ' ';
      } else {
        str += '  ';
      }
    }
    str += '\n';
  }
  return str;
};
```
