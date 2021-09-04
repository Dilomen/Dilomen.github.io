const sidebar = {
  "/前端/": [
    {
      title: "HTML",
      children: ["客户端存储", "你不知道的DOM_API"],
    },
    {
      title: "CSS",
      children: ["水平垂直居中", 'matrix'],
    },
    {
      title: "网络",
      children: ["常见的状态码", "get和post的区别", "HTTP连接"],
    },
    {
      title: "浏览器",
      children: ["页面优化小技巧", "浏览器缓存机制", "Chrome调试", "客户端渲染和服务端渲染", "深入了解现代浏览器", "重绘和回流"],
    },
  ],
  "/编程语言/": [
    {
      title: "JavaScript",
      children: [
        "编译原理与运行机制",
        "基本类型和引用类型",
        "闭包与作用域",
        "Event Loop",
        "原型链和继承",
        "数组",
        "this",
        "异步机制",
        "Promise",
        "Symbol",
        "postMessage",
        "js模拟传统面向对象功能",
        "aysnc-await",
        "柯里化函数和复合函数",
        "常用函数"
        // 'js查缺补漏01'
      ],
    },
    {
      title: "TypeScript",
      children: ["TypeScript基础知识"],
    },
  ],
  "/框架、库/React/": [
    {
      title: "React",
      children: [
        "生命周期",
        "高阶组件",
        "context",
        "setState",
        "Hooks"
        // "记一次react+ts的环境搭建，并上传到npm"
      ],
    },
  ],
  "/框架、库/Vue/": [
    {
      title: "Vue",
      children: ["生命周期", "响应式机制"],
    },
  ],
  "/框架、库/微信小程序/": [
    {
      title: "微信小程序",
      children: ["基础知识"],
    },
  ],
  "/源码分析/": [
    {
      title: "vue",
      children: ["运行机制", "响应式", "模板编译", "VitualDOM", "生命周期"],
    },
    {
      title: "axios",
      children: ["axios源码分析", "axios源码分析（二）"],
    },
    {
      title: "react-router",
      children: [],
    },
    {
      title: "vue-router",
      children: ['基本知识', 'hash', 'history', 'static'],
    },
    {
      title: "react",
      children: ["Component"],
    },
    {
      title: "antd",
      children: ["form"],
    }
  ],
  "/计算机通用/": [
    {
      title: "计算机基础",
      children: ["数据结构", "位运算", "操作系统"],
    },
    {
      title: "设计模式",
      children: [
        "设计模式介绍",
        "工厂模式",
        "观察者模式",
        "单例模式",
        "代理模式",
        "策略模式",
        "数据访问对象模式",
      ],
    },
    {
      title: "web安全",
      children: ["web安全简述", "XSS"],
    },
    {
      title: "算法",
      children: ["排序", "遍历"],
    },
    {
      title: "leetcode",
      children: ["无重复字符的最长子串", "Z字形变换", "循环依赖"],
    },
  ],
  "/打包工具/": [
    {
      title: "webpack",
      children: ["基本配置", "loader", "plugin", "性能优化", "webpack"],
    },
    {
      title: "rollup",
      children: ["搭建组件库", "基本知识"],
    },
  ],
  "/单元测试/": [
    {
      title: "Jest",
      children: ["基本知识", "简单使用"],
    },
    {
      title: "ReactTestLibrary",
      children: ["基本知识", "查询", "事件","简单使用"],
    },
    {
      title: "VueTestUtils",
      children: ["基本知识", "简单使用"],
    },
    {
      title: "Mocha",
      children: [],
    },
  ],
  "/WebGL学习/": [
    {
      title: "基础学习",
      children: ["基础知识"]
    }
  ],
  "/拓展学习/Node/": [
    {
      title: "基础知识",
      children: ["基础知识"]
    },
    {
      title: "深入浅出Node笔记",
      children: [
        "01_Node简介",
        "02_模块机制",
        "03_异步I:O",
        "04_异步编程",
        "07_网络编程",
        "09_玩转进程"
        // "10_单元测试"
      ]
    }
  ],
  "/拓展学习/": [
    {
      title: "Java",
      children: [
        "基础知识",
        "Java学习01",
        "Java学习02",
        "Java学习03",
        "java实现八大排序",
        "Java的基本数据结构",
        "Java-IO文件系统",
        "初识Spring",
        "初识SpringBoot",
      ],
    },
    {
      title: "技术了解",
      children: ["Redis", "Docker", "消息队列", "Mock", "Nginx"],
    },
    {
      title: "技术杂谈",
      children: ["关于重构的那点事", "优秀文章", "优秀的个人博客"],
    }
  ],
};

Object.keys(sidebar).map((key) => {
  sidebar[key].map((item) => {
    item.children.map((child, index) => {
      item.children[index] = { title: `${child}` };
      /\/框架、库/.test(key)
        ? (item.children[index].path = `${child}`)
        : (item.children[index].path = `${item.title}/${child}`);
    });
  });
});

module.exports = sidebar;
