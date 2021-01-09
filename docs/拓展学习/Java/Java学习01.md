---
title: Java学习01
tags: java基础知识
categories: java基础知识
keywords: java,基础
description: java的基础知识
abbrlink: 4853d0c0
date: 2019-06-25 20:03:11
---

## Java 分为 3 大版本

- JavaSE: 标准版，主要用于开发和部署桌面，服务器以及嵌入式设备和实时环境中的 Java 应用程序，是 JavaEE 和 JavaME 的基础
- JavaEE: 企业版，主要针对企业应用的开发，网站，系统等等
- JavaME: 主要针对移动设备和嵌入式设备

## Java 的优势

- 跨平台/可移植性
- 分布式
- 多线程

## Java 的运行机制

Java 首先将编写好的 Java 源文件*.java 利用编译器（javac）将源程序编译成字节码文件*.class，最后利用虚拟机（解释器）解释执行。

## JRE(Java Runtime Enviromment)和 JDK（Java Development Kit）

JRE 包含：Java 虚拟机，库函数，运行 Java 应用程序所必须的文件
JDK 包含：JRE，以及增加编译器和调试器等用于程序开发的文件

## 源文件 class 数量

- 一个源文件只能声明一个 public 类，可以包含多个 class

```java
// Person.java
public class Person {
    public static void main(String args[]) {
        System.out.println("Hello World");
    }
}
// 错误 public class Test {}
class Test {}
```

- 不同的 class 会被编译成独立的.class 文件，即上面的 java 文件会被编译成 Person.class 和 Test.class

## 注释

```java
// 单行注释

/*
*多行注释
*/

/**
*文档注释
*@params 参数
**/
```

## 变量类别

- 局部变量： 方法或语句快内部定义的变量，生命周期在方法开始到结束或语句块执行完毕为止,**必须初始化**

```java
{
    int i = 1; // 局部变量
}
```

- 成员变量（实例变量）：在方法外部，类的内部定义的变量，生命周期伴随对象始终，**未赋值的成员变量会被初始化默认值**

```java
public class Hello {
    private int i; // 成员变量
    public String getName() {
        System.out.println(i);
    }
}
```

- 静态变量：使用 static 关键字声明，可直接通过类访问，生命周期伴随类的始终,未赋值也会被初始化成默认值

```java
static int i
```

## 数据类型

- 基本数据类型：
  - 数值型
    - 整数类型：byte,short,int,long
    - 浮点类型：float,double
  - 字符型
    - char
  - 布尔型：boolean
- 引用数据类型
  - 类（class）
  - 接口（interface）
  - 数组

## 整型

```java
int a = 15;
int b = 015; // 13， 以0开头的是八进制
int c = 0x15; // 21， 以0x开头是十六进制
```

## String 不可变对象

- 不可变的 Unicode 字符序列

```java
String str = "aaaaa";
String str2 = str.substring(1,2); // 只能在建一个对象
```

- 字符串比较必须用 equals()而不是==

## Stringbuilder 和 StringBuffer

- 由于 String 发生变化就需要新建一个对象，消耗性能，所以当字符串需要多次改变时因采用 Stringbuilder 和 StringBuffer
- 两者都是可修改的“String 对象”
- StringBuffer 线程安全，效率低（一般使用它），StringBuilder 线程不安全，效率高

```java
StringBuilder stringBuilder = new StringBuilder();
stringBuilder.append("a");
stringBuilder.insert(0, "h");
stringBuilder.setCharAt(1, 's');
stringBuilder.reverse();
```

## date 日期

```java
// 最新
Date date = new Date();
```

```java
DateFormat df = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
// 把时间对象按照“格式字符串指定的格式” 转化成相应的字符串
df.format(new Date());
// 把相应格式的时间转化为时间对象
df.parse("2011-05-12 12:09:34");
// 使用格式来获取信息,如D表示本时间对象是所处年份的第几天
DateFormat df = new SimpleDateFormat("D");
df.format(new Date()); //
```

## Calendar

```java
Calendar calendar = new GregorianCalendar(2019, 10 , 9 ,22, 10 ,40);
int year = calendar.get(Calendar.YEAR); // 年
int month = calendar.get(Calendar.MONTH); // 月
int weekday = calendar.get(Calendar.DAY_OF_MONTH); // 星期
```

## java的按值传递和按引用传递

如果传递的参数是**基本类型**或者**基本类型的包装类**,还有**String**类型，那么**直接传递值**，即发生的变化不会影响到原来的变量

如果传递的是**引用类型**（类，数组，接口），那么会**传递内存地址**，所发生的改变会影响到之前的对象
