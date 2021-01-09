---
title: Java学习02
tags: java基础知识
categories: java基础知识
keywords: java,基础
description: java的基础知识
abbrlink: d15a817a
date: 2019-06-26 11:26:35
---

## **Java 虚拟机的内存**

Java 虚拟机的内存分为三个区域：栈 stack,堆 heap,方法区 method area

- 栈

  - 栈描述的是方法执行的内存模型，每个方法被调用度会创建一个栈帧（存储**局部变量**，操作数，方法出口）
  - JVM 为每个线程创建一个栈，用于存放该线程执行方法的信息（实际参数，局部变量等）
  - 栈属于线程私有，不能实现线程间的共享
    - 栈是一个连续的内存空间，速度快

- 堆
  - 堆用于存储创建好的**对象**和数组（数组也是对象）
  - JVM 只有一个堆，被所有线程共享
  - 堆是一个不连续的内存空间，分配灵活，速度慢
- 方法区
  - JVM 只有一个方法区，被所有线程共享
  - 方法区实际**也是堆**，只有用于存储类，常量相关的信息
  - 用来存放程序中永远是不变或唯一的内容 （类信息，**静态变量**，Class 对象，字符常量等）

## **静态 static 继承**

- 先继承上一层的 static 变量或方法，如果没有，再往上寻找
- static 的继承不具有多态性

## **package**

- 像文件夹一样对类进行分类管理
- 包名：**域名倒着写**即可，再加上模块名，便于内部管理类
  两个不同的包的类访问对方需要通过 import 来引入

## **方法重写 override**

- 方法名和形参列表相同
- 返回值类型和声明异常类型，子类要小于等于父类
- 访问权限，子类要大于等于父类

### **内部类的作用**

- 好处：每个内部类都能独立的继承一个接口的实现，无论外围类是否继承类某个接口的实现，对内部类都是没有影响的

- 内部类标识符：每个类都会产生一个.class 文件，所以内部类，会变成**外围类名\$内部类名.class**的形式，\$为标识符

## **生成内部静态类和内部非静态类的对象**

```java
public class TestInnerClass {
    public static void main(String[] args) {
        // 非静态类
        Outer.Inner inner = new Outer().new Inner();
        inner.show();
        // 静态类
        Outer.StaticInner staticInner = new Outer.StaticInner();
    }
}
class Outer {
    private int age = 10;
    class Inner {
        int age = 20;
        public void show() {
            int age  = 30;
            System.out.println("外部类的成员变量age:"+Outer.this.age);
            System.out.println("内部类部类的成员变量age:"+this.age);
            System.out.println("内部类的局部变量age:"+ age);
        }
    }
    static class StaticInner {
    }
}
```

## **hashCode**

两个内容相同（equals()为 true）的对象必须具有相等的 hashCode

## **可选参数...**

```java
//编译器就可以识别这是一个数组
public Test(String... strArray) {
    for (String str : strArray) {
        System.out.println(str);
    }
}
//还可以在前面加别的不同类型的参数来配合重载
public Test(Integer i, String... strArray) {}
```

## **构造器和多态**

- 构造器不具有多态性，只有基类才能有权限对自己的元素进行初始化，所以每个子类都需要**调用基类的构造器**
- 可以通过 super 来调用指定的基类构造器，如果没有指定（没有 super）就会调用基类的默认构造器

```java
// 调用基类的默认构造方法
class Test {
    Test() {System.out.println("Test的构造方法")}
}
class Testchild extends Test {
    Testchild() {System.out.println("Testchild的构造方法")}
}
new Testchild();
// Test的构造方法
// Testchild的构造方法
```

## **构造器是如何动态绑定方法的？**

```java
public class Glyph {
    Glyph() {
        System.out.println("Glyph before draw()");
        draw();
        System.out.println("Glyph after draw()");
    }
    void draw() {
        System.out.println("Glyph.draw()");
    }
}
public class RoundGlopy extends Glyph {
    private int radius = 1;
    RoundGlopy(Integer r) {
        radius = r;
        System.out.println("RoundGlyph radius: "+radius);
    }
    void draw() {
        System.out.println("RoundGlyph draw() radius: "+radius);
    }
}
new RoundGlopy(5);

// Glyph before draw()
// RoundGlyph draw() radius: 0
// Glyph after draw()
// RoundGlyph radius: 5

```

1. 在其他任何事物发生之前，分配给对象的存储空间会被初始化成二进制的零
2. 然后再调用基类的构造器，接着调用了被子类覆盖的 draw()方法，此时 RoundGlopy 的构造器还没有被调用，且 radius 未被赋值
3. 调用 RoundGlopy 构造器

### **向上转型**

test 就只能访问基类 Test 存在的方法，如果被覆盖，就会访问 Test2 中的，但是访问不了 Test2 独有（拓展）的方法

```java
Test test = new Test2();
```
