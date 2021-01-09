---
title: Java IO文件系统
tags: java基础知识
categories: java基础知识
keywords: java,基础
description: java的基础知识
abbrlink: 2bbb1753
date: 2019-06-27 23:02:08
---

## **流分类**

- 字节流：按照字节读取数据(InputStream, OutputStream)，常操作于音频，视频等
- 字符流：按照字符读取数据(Reader,Writer),因为文件编码的不同，
  从而有了对字符进行高效操作的字符流对象，但是它的底层还是基于字节流的，常操作于文本

## **File**

- 创建一个文件，如果不写路径，就会在项目的根目录下生成

```java
File file = new File("./src/7.txt");
file.createNewFile();
```

- exists()：判断是否存在
- isDirectory()：判断是否是目录
- isFile()：判断是否是文件
- getName()：文件名
- getPath()：目录路径
- mkdir()：创建一个文件夹
- mkdirs()：创建多个文件夹，如果需求目录不存在，就会创建所有需求目录

## **常用方法**

- InputStream:字节输入流的父类，数据单位为字节
  - int read()
  - void close()
- OutputStream:字节输出流的父类，数据单位为字节
  - void write(int)
  - void flush() 刷新此输出流并强制任何缓冲的输出字节被写出
  - void close()
- Reader:字符输入流的父类，数据单位为字符
  - int read()
  - void close()
- Writer:字符输出流的父类，数据单位为字符
  - void write(String)
  - void flush() 刷新流
  - void close()
