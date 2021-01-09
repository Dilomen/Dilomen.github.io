---
title: Java的基本数据类型和引用类型
tags: java基础知识
categories: java基础知识
keywords: java,基础
description: java的基础知识
abbrlink: a68cf580
date: 2019-07-15 22:12:49
---

## **基本类型**

- 整型： byte,short,int,long （分别占用 1 子节，2 子节，4 子节，8 子节）
- 浮点型：float,double
- 布尔值：boolean
- 字符型：char

## **单位转换**

1 位（字节） = 8 比特（位数）

## **占用内存**

| 基本数据类型 | 占用字节 | 默认值 | 包装类    | 取值范围        |
| ------------ | -------- | ------ | --------- | --------------- |
| byte         | 1        | 0      | Byte      | -2^7 ～-2^7-1   |
| short        | 2        | 0      | Short     | -2^15 ～-2^15-1 |
| int          | 4        | 0      | Integer   | -2^31 ～-2^31-1 |
| long         | 8        | 0L     | Long      | -2^63 ～-2^63-1 |
| float        | 4        | 0.0f   | Float     |
| double       | 8        | 0.0d   | Double    |
| char         | 2        | 'u000' | Character |
| boolean      |          | false  | Boolean   |

## **为什么要有包装类？**

由于基本类型没有**对象**的特性（没有属性，方法可调用），使用包装类就可以调用 Object 的属性或方法

- eg：String a = Integer.toString(1111);

## **装箱和拆箱**

装箱：基本类型 -> 对应包装类

```java
int m = 100;
Integer s = new Integer(m);
```

拆箱：包装类 -> 对应基本类型

```java
Integer s = new Integer(100);
int m = s;
```

自动装箱和自动拆箱

```java
int m = 100;
Integer obj = m; // 自动装箱
int n = obj; // 自动拆箱
```

Integer 陷阱：当值在**bytes 的取值范围内（-128 ～ 127）**，自动装箱就会直接从常量池中获取，而大于这个范围，它就会创建新对象

```java
Integer i1 = 97;
Integer i2 = 97;
System.out.println(i1 == i2); // true
System.out.println(i1.equals(i2)); // true

Integer i3 = 197;
Integer i4 = 197;
System.out.println(i3 == i4); // false
System.out.println(i3.equals(i4)); // true
```

## **数据类型之间的转换**

自动转换：**小->大**
eg:转换前的数据类型的位数要**低于**转换后的数据类型

```java
char c1='a';
int i1 = c1;
```

强转换：大->小  
eg:在被转换数据前加括号要转化的类型，这种转化容易造成内存溢出或精度的下降

```java
char c1='a';
int i1 = c1;
```

tip:只有 boolean 不参与数据类型的转换

## **引用类型**

Java 有 5 种引用类型（对象类型）：类 接口 数组 枚举 标注

JVM 的**内存空间**：

| Heap 堆空间      | Stack 栈空间               | 代码区              |
| ---------------- | -------------------------- | ------------------- |
| new Student（）  | Student stu                | Student.class       |
| 分配对象         | 临时变量                   | 类的定义            |
| 分配空间创建实例 | 将实例的地址赋值给引用 stu | 加载 class 到代码区 |
