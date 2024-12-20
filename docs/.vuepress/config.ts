import { viteBundler } from '@vuepress/bundler-vite'
import { defineUserConfig } from 'vuepress'
import { plumeTheme } from 'vuepress-theme-plume'

export default defineUserConfig({
  base: '/',
  lang: 'zh-CN',
  title: 'DYX666',
  description: '',
  head: [
    ['link', {rel: 'icon', type: 'image/png', sizes: '32x32', href: '/plume.svg'}],
  ],

  bundler: viteBundler(),

  theme: plumeTheme({
    // 添加您的部署域名
    hostname: 'https://dyx666.icu',
    plugins: {
      /**
       * Shiki 代码高亮
       * @see https://theme-plume.vuejs.press/config/plugins/code-highlight/
       */
      shiki: {
        // 强烈建议预设代码块高亮语言，插件默认加载所有语言会产生不必要的时间开销
        languages: [
          'shell', 'bash', 'typescript', 'javascript',
          'c#', 'lua', 'protobuf'
        ],
      },

      /**
       * markdown enhance
       * @see https://theme-plume.vuejs.press/config/plugins/markdown-enhance/
       */
      markdownEnhance: {
        demo: true,
      //   include: true,
      //   chart: true,
      //   echarts: true,
      //   mermaid: true,
      //   flowchart: true,
      },

      /**
       *  markdown power
       * @see https://theme-plume.vuejs.press/config/plugin/markdown-power/
       */
      // markdownPower: {
      //   pdf: true,
      //   caniuse: true,
      //   plot: true,
      //   bilibili: true,
      //   youtube: true,
      //   icons: true,
      //   codepen: true,
      //   replit: true,
      //   codeSandbox: true,
      //   jsfiddle: true,
      //   repl: {
      //     go: true,
      //     rust: true,
      //     kotlin: true,
      //   },
      // },

      /**
       * 评论 comments
       * @see https://theme-plume.vuejs.press/guide/features/comments/
       */
      // comment: {
      //   provider: 'Artalk', // "Artalk" | "Giscus" | "Twikoo" | "Waline"
      //   comment: true,
      //   repo: '',
      //   repoId: '',
      //   categoryId: '',
      //   mapping: 'pathname',
      //   reactionsEnabled: true,
      //   inputPosition: 'top',
      // },
      
      
    },

    // 公告板
    // bulletin: {
    //   layout: 'top-right',
    //   title: '公告板标题',
    //   content: '公告板内容',
    // },
    // 全局加密
    // encrypt: {
    //   global: true,
    //   admin: ['123456'],
    // },
    encrypt: {
      rules: {
        // // 可以是 md 文件的相对路径，对该文件加密
        // '前端/基础.md': '123456',
        // // 可以是 文件夹的路径，对该目录下所有文章加密
        // '/notes/vuepress-theme-plume/': '123456',
        // // 可以是 访问地址的请求路径，对该访问路径下所有文章加密
        // '/vuepress-theme-plume/': '123456',
        // // 可以是 具体的某个页面的请求路径，对该页面加密
        // '/article/f8dnci3/': '123456',
        // // 如果是 `^` 开头，则匹配该正则表达式的页面也会加密
        // '^/(a|b)/': '123456',

        'notes/work/password.md': 'dyx666',
      }
    },
  }),
})
