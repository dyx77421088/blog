import {defineNavbarConfig} from 'vuepress-theme-plume'

export const navbar = defineNavbarConfig([
    {text: '首页', link: '/'},
    {text: '博客', link: '/blog/'},
    {text: '标签', link: '/blog/tags/'},
    {text: '归档', link: '/blog/archives/'},
    {
        text: '笔记',
        items: [
            {text: '工作的一些笔记', link: '/work/', icon: 'flat-color-icons:command-line'},
            {text: 'ps的一些使用', link: '/ps/', icon: 'flat-color-icons:camera'},
        ]
    },
])
