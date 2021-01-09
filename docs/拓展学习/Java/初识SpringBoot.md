---
title: 初识SpringBoot
tags: Spring
categories: java框架
keywords: java,spring boot,基础
description: spring boot的基础知识
abbrlink: cd6beb9c
date: 2019-07-14 20:45:24
---

## **SpringBoot 解释**
用来简化 Spring 开发的框架，使用更多的注解和特定的方式来进行配置

## **maven 配置**

```xml
// 作为SpringBoot的父级依赖，也指明当前项目是SpringBoot项目
    识别过来资源过滤
    识别插件的配置
    能够识别application.properties和application.yml类型的文件，同时也能支持profile-specific类型的文件
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.1.6.RELEASE</version>
    </parent>
    自动引入了web模块开发需要的相关jar包
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
    </dependencies>

    <properties>
        <java.version>1.8</java.version>
    </properties>

    // 可以将项目打包成一个可执行的jar包
    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>

```

## **SpringBoot 的注解**

@SpringBootApplication：表明当前类是是 SpringBoot 的主程序类，是启动当前项目的类（main）

@SpringBootConfiguration：表明当前类是 SpringBoot 的配置类，实质

@EnableAutoConfiguration：开启自动配置

@ResponseBody：表明方法 return 返回内容给客户端

@Controller：表明这是一个该类是处理 http 请求的类

@RestController：@ResponseBody 和@Controller 的结合，实现也是基于这两者的

@RequestMapping：配置 url 映射（请求接口）

@RequestParam：获取请求参数的值

- public String XXX(@PathVariable("id") Integer id)

## **配置文件**

SpringBoot 使用一个全局的配置文件，配置文件名是固定的 - application.properties - application.yml
作用：修改 SpringBoot 自动配置的默认值

## **yml 文件的语法**

基本语法 - 使用缩进表示层级关系 - 缩进时不允许使用 tab 键，只能空格键 - 大小写敏感 - 缩进格数需和同层级对齐即可
数据结构 - 对象：键值对的集合 - 数组：一组按次序排列的值 - 字面量：单个的，不可再分的值

## **读取配置文件的数据**

必须是个组件类，加入了 SpringBoot 容器，然后通过注解读取到相应的数据，该类拥有同样的数据定义，然后所创建的对象，就能得到该值  
 @ConfigurationProperties：

- 批量注入配置文件中的属性
- 支持松散语法
- 不支持 SpEl
- 支持 JSR303 数据类型校验
  @Vlaue：
- 一个个指定
- 不支持松散语法
- 支持 SpEl
- 不支持 JSR303 数据类型校验

```java
@Component
@ConfigurationProperties(prefix = "person")
@Validated
public class Person {
   // 支持JSR303数据类型校验
   @Email
   private String name; // name必须是email格式
}


也可以通过@Vlaue()赋值
```

## **读取其他配置文件**

@PropertySourse 读取指定配置文件(person.properties)

```java
@PropertySourse(value="classpath:person.properties")
```

@ImportResource:导入 Spring 的配置文件，让配置文件中的内容生效

## **Profile 切换多个配置文件**

在配置文件中指定
`spring.profiles.active=dev`
启动 dev 环境,如下，将启动 8001 端口

```yml

server:
    port: 8001
spring:
    profiles: dev
```

## **配置文件加载顺序**

spring boot 启动会默认扫描 application.properties 或者 application.yml 文件作为 spring boot 的默认文件

- file../config 项目文件夹的 config 文件夹下
- file../ 项目文件夹下
- classpath:/config 类(src)路径下的 config
- classpath:/ 类(src)路径的根文件
  springboot 会按以上优先级从高到低的顺序进行扫描，所有位置的文件都会被加载，高优先级的配置内容会覆盖低优先级的配置内容,如果没有相同的，会互补配置

## **日志记录**

```java
Logger logger = LoggerFactory.getLogger(MainStart.class);
// 级别高低： trace < debug < info < warn < error,日志只会生成当前级别及更高的级别，比当前级别低的日志会忽略
logger.trace("")
logger.debug("")
logger.info("")
logger.warn("")
logger.error("")
```

在配置文件中设置日志输出文件

```java
使用绝对路径创建日志文件
logging.file=D:/springboot.log
在当前项目的根文件夹的spring文件夹下的log文件夹下创建默认的spring.log文件
logging.path=/spring/log
在控制台输出的日志格式
logging.pattern.console=%d{yyyy-MM-dd} [%thread] %-5level %logger{50} - %msg%n
指定在日志文件中输出的格式
logging.pattern.console=%d{yyyy-MM-dd} [%thread] %-5level %logger{50} - %msg%n
```
