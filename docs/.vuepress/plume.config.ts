import { defineThemeConfig } from 'vuepress-theme-plume'
import { navbar } from './navbar'
import { notes } from './notes'

/**
 * @see https://theme-plume.vuejs.press/config/basic/
 */
export default defineThemeConfig({
  logo: '/plume.svg',
  appearance: true,
  footer: {
    message: '',
    copyright: 'Copyright © 2024-present dyx'
  },


  profile: {
    avatar: '/plume.svg',
    name: 'DYX',
    description: '666',
    circle: true, // 是否为圆形头像
    location: 'ChangSha, China',
    // organization: '',
  },

  navbar,
  notes,

  // 社交链接
  social: [
    {icon: 'github', link: 'https://github.com/dyx77421088'},
  ],

  blog: {
    // 配置 封面图 布局位置
    // postCover: 'left', // 'left' | 'right' | 'odd-left' | 'odd-right' | 'top'
    postCover: {
      layout: 'left',
      ratio: '16:9',
      width: 300,
      compact: false
    }
  },
})
