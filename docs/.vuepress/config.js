const nav = require('./nav')
const sidebar = require('./sidebar')
module.exports = {
  title: "DILOMEN'S BLOG",
  description: " ",
  head: [
    ["meta", { name: "description", content: "前端进阶之路" }],
    ["meta", { name: "keywords", content: "前端博客,前端进阶,前端学习分享,web前端技术,前端进阶" }],
    ["meta", { name: "baidu-site-verification", content: "1habgJadYO" }],
    ["link", { rel: "icon", href: "/logo.ico" }],
    ["link", { rel: "manifest", href: "/manifest.json" }],
    ['script', { src: 'https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.slim.min.js' }],
    ['script', { src: 'https://cdn.bootcdn.net/ajax/libs/fancybox/3.5.7/jquery.fancybox.min.js' }],
    ['link', { rel: 'stylesheet', type: 'text/css', href: 'https://cdn.bootcdn.net/ajax/libs/fancybox/3.5.7/jquery.fancybox.min.css' }]
  ],
  themeConfig: {
    nav,
    sidebar,
    sidebarDepth: 4,
    // lastUpdated: "Last Updated",
    // serviceWorker: true,
    smoothScroll: true,
    collapsable: true,
  },
  plugins: [
    // 'permalink-pinyin',
    // ['autobar', { 'pinyinNav': true }],
    { name: "page-plugin", globalUIComponents: ['fixed'] },
    [
      "vuepress-plugin-comment",
      {
        choosen: "valine",
        options: {
          el: "#valine-vuepress-comment",
          appId: "deVrmAxQCuA3yzJO5DAWfFrT-gzGzoHsz",
          appKey: "0Xb5v4q8gRTn3BHH4R4gDBYL",
          placeholder: '留下一点你的足迹吧~~'
        },
      },
    ],
    'vuepress-plugin-baidu-autopush'
  ],
};
