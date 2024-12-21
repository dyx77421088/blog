---
title: 使用giscus给博客添加评论
tags:
    - github
    - giscus
createTime: 2024/12/21 13:52:02
permalink: /article/wzimpfwc/
---

1. 在github中[安装giscus](https://github.com/apps/giscus)
2. 选择一个公开的仓库作为评论存放的地方（可以选择一个新的仓库）
3. 在仓库 => ==Settings== => ==General== => ==勾选Discussions==
4. 在[giscus官网](https://giscus.app/zh-CN)中检测是否满足条件，并找到四个关键参数。
<div style="display: flex;width: 240px;" class="left2">
    <img src="https://oss.dyx666.icu/image/giscus.png" alt="图片1" style="margin-right: 10px;"/>
    <img src="https://oss.dyx666.icu/image/giscus2.png" alt="图片2" style="margin-right: 10px;"/>
    <img src="https://oss.dyx666.icu/image/giscus3.png" alt="图片3" />
</div>

5. 在主题中配置属性

::: code-tabs
@tab config.ts
``` ts
import { defineUserConfig } from 'vuepress'
import { plumeTheme } from 'vuepress-theme-plume'

export default defineUserConfig({
  theme: plumeTheme({
    plugins: {
      comment: {
        provider: 'Giscus', // "Artalk" | "Giscus" | "Twikoo" | "Waline"
        comment: true,
        repo: '复制的1',
        repoId: '复制的2',
        category: "复制的3",
        categoryId: '复制的4',
        mapping: 'pathname',
        reactionsEnabled: true,
        inputPosition: 'bottom',
      }
    }
  })
})
```
:::

[更多评论服务提供商及使用](https://theme-plume.vuejs.press/guide/features/comments/)