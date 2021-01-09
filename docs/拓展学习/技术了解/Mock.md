## 概述

Mock 是模拟后端数据，方便前后端分离的一种工具

## 使用

### String

#### 指定重复次数

```md
"name|num": "string";
"name|2": "string";
"name": "stringstring"
```

#### 在 min-max 范围内随机重复次数

```md
"name|min-max": "string";
"name|1-4": "string";
"name": "stringstringstring"
```

### Number

#### 在 min-max 范围内随机取值

```md
"age|min-max": number;
"age|1-4": 3;
"age": 2
```

#### 范围内的浮点数

```md
"age|min-max.dmin-dmax": number;
"age|1-4.5-6": number;
```

#### 自动+1

```md
"age|+num": number;
"age|+1": 3;
"age": 3
```

### Boolean

#### 随机生成一个 boolean，各占 50%

```md
"isSign|1": boolean;
```

### Object

#### 从 object 中随机抽取 1 个项

```md
"name|1": array;
"name|1": ["a", "b", "c"];
```

### Array

#### 从 array 中随机选取n个

#### 特殊类型

```json
"ip": "@ip"; // 生成随机ip
"title": "@title"; // 生成随机英文标题
"ctitle": "@ctitle"; // 生成随机中文标题
"name": "@name"; // 生成随机英文名
"cname": "@cname"; // 生成随机中文名

"cname": "@cname(4,5)"; // 选择字数

"date": "@date"; // 生成随机日期时间
"time": "@time"; // 生成随机日期时间
"datetime": "@datetime"; // 生成随机日期时间
```
