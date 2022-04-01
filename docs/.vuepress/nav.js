const nav = [
  { text: "主页", link: "/" },
  {
    text: "前端",
    link: "/前端/",
    items: [
      {
        text: "综合",
        items: [
          { text: "HTML", link: "/前端/HTML/" },
          { text: "CSS", link: "/前端/CSS/水平垂直居中" },
          { text: "浏览器", link: "/前端/浏览器/浏览器缓存机制" },
          { text: "网络", link: "/前端/网络/常见的状态码" },
        ],
      },
      {
        text: "编程语言",
        items: [
          {
            text: "JavaScript",
            link: "/编程语言/JavaScript/基本类型和引用类型",
          },
          {
            text: "TypeScript",
            link: "/编程语言/TypeScript/TypeScript基础知识",
          },
        ],
      },
      {
        text: "框架 | 库",
        items: [
          { text: "React", link: "/框架、库/React/生命周期" },
          { text: "Vue", link: "/框架、库/Vue/生命周期" },
          { text: "微信小程序", link: "/框架、库/微信小程序/基础知识" },
          { text: "打包工具", link: "/打包工具/webpack/基本配置" },
          { text: "单元测试", link: "/单元测试/Jest/基本知识" },
        ],
      }
    ],
  },
  {
    text: "源码分析",
    items: [
      { text: "vue", link: "/源码分析/vue/运行机制" },
      { text: "axios", link: "/源码分析/axios/axios源码分析" },
      { text: "react", link: "/源码分析/react/Component" },
      { text: 'antd', link: "/源码分析/antd/form" },
      { text: "react-router", link: "/源码分析/react-router/" },
      { text: "vue-router", link: "/源码分析/vue-router/基本知识" }
    ]
  },
  // {
  //   text: "WebGL",
  //   link: '/WebGL/学习',
  //   items: [
  //     { text: "WebGL学习", link: "/WebGL/学习/基础知识" },
  //   ]
  // },
  {
    text: "计算机通用",
    link: "/计算机通用/",
    items: [
      { text: "计算机基础", link: "/计算机通用/计算机基础/数据结构" },
      { text: "设计模式", link: "/计算机通用/设计模式/设计模式介绍" },
      { text: "web安全", link: "/计算机通用/web安全/web安全简述" },
      { text: "算法", link: "/计算机通用/算法/排序" },
      // { text: "leetcode", link: "/计算机通用/leetcode/无重复字符的最长子串" },
    ],
  },
  {
    text: "拓展学习",
    link: "/Java/基础知识",
    items: [
      { text: "Java", link: "/拓展学习/Java/基础知识" },
      { text: "技术了解", link: "/拓展学习/技术了解/Redis" },
      { text: "技术杂谈", link: "/拓展学习/技术杂谈/关于重构的那点事" },
      { text: "Node", link: "/拓展学习/Node/基础知识/基础知识" },
    ],
  },
  { text: "关于", link: "/about" },
  { text: "Github", link: "https://github.com/Dilomen" },
];

module.exports = nav;
