---
title: 初识spring
tags: Spring
categories: java框架
keywords: java,spring,基础
description: spring的基础知识
abbrlink: 912dd9c5
date: 2019-07-06 10:02:08
---

## **程序的耦合**

- 耦合：程序间的依赖关系
  - 类之间的依赖
  - 方法之间的依赖
- 解耦
  - 降低程序间的依赖关系
- 实际开发中需注意
  - 编译期不依赖，运行时才依赖
- 解耦的思路
  - 使用反射来创建对象，而避免使用 new 关键字
  - 再通过读取配置文件来获取要创建的对象全限定类名（如 com...., 主要时方便后期维护）


## **IOC 控制反转**

把创建对象的权利交给框架的重要特征
包含依赖注入（DI）和依赖查找
作用：消减计算机的耦合（解耦代码中的依赖关系）


## **依赖注入**

- 在当前类需要用到其他类的对象，由 spring 为我们提供，我们只需要在配置文件中说明
- 依赖注入：

  - 能注入的数据：
    - 基本类型和 String
    - 其他 bean 类型（在配置文件中或者注解配置过的 bean）
    - 复杂类型/集合类型
  - 注入的方式

    - 使用构造函数提供
      - 优势：在获取 bean 对象时，注入数据时必须的操作，否则对象无法创建成功
      - 弊端：改变了 bean 对象实例化方式，使我们在创建对象时，如果用不到这些数据，也必须提供

    ```java
    public class AccountServiceImpl implements IAccountService {
        private String name;
        private Integer age;
        private Date birthday;
        public AccountServiceImpl(String name, Integer age, Date birthday) {
            this.name = name;
            this.age = age;
            this.birthday = birthday;
        }
    }
    配置文件,ref表示指定其他bean类型的数据
    <bean id="accountService" class="com.spring.service.impl.AccountServiceImpl">
            <constructor-arg name="name" value="aaa" type="java.lang.String"></constructor-arg>
            <constructor-arg name="age" value="11" type="java.lang.Integer"></constructor-arg>
            <constructor-arg name="birthday" ref="now"></constructor-arg>
    </bean>
    <bean id="now" class="java.util.Date"/>
    ```

    - 使用 set 方法提供（比构造函数常用）:
      - 优势：解决构造函数的弊端，不需要所有属性提供
      - 弊端：如果有某个成员必须有值，则没有执行相应 set 的方法

    ```java
    <bean id="accountService2" class="com.spring.service.impl.AccountServiceImpl2">
            <property name="name" value="bbb"></property>
    </bean>
    集合的表示
    <bean id="accountService2" class="com.spring.service.impl.AccountServiceImpl2">
            <property name="name" value="bbb"></property>
            <property name="myList">
                    <list>
                            <value>1</value>
                            <value>2</value>
                            <value>3</value>
                    </list>
            </property>
            <property name="map">
                    <props>
                            <prop key="a">1</prop>
                            <prop key="b">2</prop>
                            <prop key="c">3</prop>
                    </props>
            </property>
    </bean>
    ```

    - 使用注解提供 ：使用更简洁的方式来实现上面的功能

      - 添加以下声明,用来告知 spring 在创建容器时要扫描的包，配置所需要的标签不是在 beans 的约束中，而是一个名称为 context 名称空间和约束中

      ```xml
      <beans xmlns="http://www.springframework.org/schema/beans"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xmlns:context="http://www.springframework.org/schema/context"
      xsi:schemaLocation="http://www.springframework.org/schema/beans
      http://www.springframework.org/schema/beans/spring-beans-3.0.xsd
      http://www.springframework.org/schema/context
      http://www.springframework.org/schema/context/spring-context-3.0.xsd">
      // com.spring就是要被扫描的包
      <context:component-scan base-package="com.spring"></context:component-scan>
      ```

      - Component:

        - 作用：用于把当前类对象存入 spring 容器中
        - 属性：value 用于指定 bean 的 id，如果不设置，默认为首字母小写的当前类名

        ```java
        @Component  bean的id就是accountServiceImpl3
        @Component(value="aaa")  bean的id就是aaa,如果只有一个属性，可以简写@Component(“aaa")
        public class AccountServiceImpl3 {}
        ```

        - Component 的三个"子类"：作用和属性与 Component 一样，能够更好的理解，逻辑更清晰
          - Controller:一般用在表现层
          - Service:一般用在业务层
          - Repository:一班用在持久层

      - Autowired ：相当于\<property\>的作用

        - 作用：自动按照类型注入，只要容器中有唯一的一个 bean 对象类型和要注入的变量类型匹配，就可以注入成功

        ```java
        @Service("AccountDao")
        public class AccountDaoImpl1 implements IAccountDao {
            public void saveAccount() {
                System.out.println("保存了");
            }
        }

        @Autowired
        private IAccountDao accountDao; //注入成功
        public void saveAccount() {
            accountDao.saveAccount();
        }
        ```

        如果出现两个，就会查找和变量名（如 IAccountDao）是否一致的，如果都不一致，就会异常

        ```java
        @Service("AccountDaoImpl")
        ...
        @Service("AccountDao")
        ...
        @Autowired
        private IAccountDao accountDao;
        ```

      - Qualifier:
        - 作用：在按照类中注入的基础上，再按照名称注入，它在给类成员注入时不能单独使用,需要@Autowired，但是在给方法参数注入
        - 属性：value： 用于指定 bean 的 id
      - Resource:
        - 作用：直接按照 bean 的 id 注入，可以独立使用
        - 属性：name：用于指定 bean 的 id
      - Autowired，Qualifier，Resource 只能注入其他 bean 类型的数据，不能注入基本类型和 String，集合类型的注入只能通过 xml 来实现
      - Value：
        - 作用：用于注入基本类型和 String 类型的数据
        - 属性：value：用于指定数据的值，它可以使用 spring 的 spEL（spring 的 el 表达式）
          - SpEL 的写法：\${表达式}
      - Scope：\<bean>标签中的 scope 属性
        - 作用：用于指定 bean 的作用范围
        - 属性：value：指定范围的取值。常用：singleton,prototype
      - PreDestroy 和 Postconstruct：分别和 init-mrthod 和 destroy-method 属性一致
        作用：指定初始化时执行方法和销毁时执行方法

## **使用注解来替代 xml 配置文件**

- Configuaration
  - 作用：指定当前类是一个配置类
- ComponentScan

  - 作用：用于通过注解指定 spring 在创建容器时要扫描的包
  - 属性：value，和 basePackages 的作用是一样的，用于指定创建容器时要扫描的包

  ```java
  @Configuration
  @ComponentScan(basePackages = "com.spring")
  // 等同于 <context:component-scan base-package="com.spring"></context:component-scan>
  ```

- Bean

  - 作用：用于把当前方法的返回值作为 bean 对象存入 spring 的 ioc 容器中
  - 属性：name：用于指定 bean 的 id，当不写时，默认值是当前方法的名称

  ```java
  @Bean
  public QueryRunner createQueryRunner(DataSource dataSource) {
      return new QueryRunner(dataSource);
  }
  ```

- 修改读取内容,将原来读取 xml 配置文件改成读取配置类

  ```java
  ApplicationContext ac = new AnnotationConfigApplicationContext(SpringConfiguration.class);
  ```

- Import：带有 Import 的都是父配置类，被导入的都是子配置类

  - 作用：导入其他的配置类
  - 属性：value：用于指定其他配置类的字节码

  ```java
  @Import(Jdbcconfig.class)
  ```

- PropertySource

  - 作用：用于指定 properties 文件位置
  - 属性：value：指定文件的名称和路径，关键字 classpath,表示类路径下

  ```java
  就可以使用@Value读取properties文件
  @PropertySource("classpath:jdbcConfig.properties")
  ```

  就可以使用@Value 读取 properties 文件下设置的变量

  ```java
  @Value("${jdbc.driver}")
  private String driver;
  ```

## **Spring 中的 AOP 术语**

- Joinpoint(连接点)：在 spring，指的是方法，Spring 只支持方法类型的连接点
- Pointcut(切入点)：被进行拦截操作的 Joinpoint，所以切入点一定是连接点，但连接点不一定是切入点
- Advice(通知/增强)：拦截 Joinpoint 后所执行的就是通知
- Introduction(引介)：引介是一种特殊的通知在不修改类代码的前提下，Introduction 可以在运行期为类动态地添加一些方法或 Field
- Target(目标)：代理目标对象
- Weaving(织入)：是指把增强应用到目标对象来创建新的代理对象的过程，spring 采用动态代理织入
- Aspect(切面)：是切入点和通知（引介）的结合

## **Spring 中通过配置文件设置切面**

spring 中基于 XML 的 AOP 配置步骤

- 1.把通知 Bean 也交给 spring 来管理
- 2.使用 aop:config 标签表明开始 AOP 的配置
- 3.使用 aop:aspect 标签表明切面
  - id 属性：是给切面提供唯一标识
  - ref 属性：是指定通知类 bean 的 Id
- 4.在 aop：aspect 标签的内部使用对应标签来配置通知的类型

  - 常用的有：before（前置），after-returning（后置），after-throwing（异常），after（最终）等，以 before 为例
  - aop:before:表示配置的前置通知

    - method 属性：用于指定 Logger 类中哪个方法是前置通知

      - pointcut 属性：用于指定切入点表达式，该表达式的含义指的是对业务层中哪些方法增强

    - 切入点表达式的写法：
      - 关键字：execution(表达式)
      - 表达式：
        - 访问修饰符 返回值 包名...类名.方法名(参数列表)
        - 如果需要切入类名下的多个方法，可以使用通配符
          - 访问修饰符可以省略
          - 返回值使用使用通配符\*表示任意返回值
          - 包名可以使用通配，可以用..表示当前包及其子包
          - 方法名也可以使用通配符
          - \- _.._(..) 通常写

```xml
<bean id="accountService" class="com.spring.aopdemo.service.impl.AccountServiceImpl"></bean>
<bean id="logger" class="com.spring.aopdemo.utils.Logger"></bean>
// 这样在执行AccountServiceImpl下的所有方法前都会执行Logger类下的printLog方法
<aop:config>
    <aop:aspect id="logAdvice" ref="logger">
            <aop:before method="printLog" pointcut="execution(* com.spring.aopdemo.service.impl.*.*(..))"></aop:before>
    </aop:aspect>
</aop:config>
```

也可以通过 spring 提供的接口 ProceedingJoinPoint 自己用代码实现

```java
<aop:config>
    <aop:pointcut id="pt1" expression="execution(* com.spring.aopdemo.service.impl.*.*(..))"/>
    <aop:aspect id="logAdvice" ref="logger">
        <aop:around method="aroundPringLog" pointcut-ref="pt1"></aop:around>
    </aop:aspect>
</aop:config>

public Object aroundPringLog(ProceedingJoinPoint pjp) {
        Object rtValue = null;
        try {
            Object[] args = pjp.getArgs();
            System.out.println("前置方法");
            rtValue = pjp.proceed(args);
            System.out.println("后置方法");
        } catch (Throwable t) {
            System.out.println("异常方法");
        } finally {
            System.out.println("最终方法");
        }
        return rtValue;
    }
```

## **使用注解来设置切面**

```java
<aop:aspectj-autoproxy></aop:aspectj-autoproxy>

@Aspect // 声明这是一个碗切面类
public class Logger {
    @Pointcut("execution(* com.spring.aopdemo.service.impl.*.*(..))")
    private void pt1() {}

    @Around("pt1()")
    public Object aroundPrintLog(ProceedingJoinPoint pjp) {
        ...
    }
}
```
