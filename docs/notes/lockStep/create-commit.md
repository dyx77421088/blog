---
title: 2.创建公用的类库
createTime: 2024/12/10 17:25:33
permalink: /lockStep/hyen1oy6/
---

## 一、创建类库

<span class="left2" />有些类，比如工具类、配置啥的，在unity客户端和服务端是用的是一样的，那么就没必要两边都写了，到时候只需要从服务端导出.dll类库，然后就可以导入unity中了。

<span class="left2" />==右击解决方案== => ==添加== => ==新建项目==。搜索类库然后下一步创建，我这边使用的版本是.NET 8.0

<div style="display: flex;width: 240px;" class="left2">
  <img src="https://oss.dyx666.icu/image/server/commit/add.png" alt="图片1" style="margin-right: 10px;"/>
  <img src="https://oss.dyx666.icu/image/server/commit/leiku.png" alt="图片2" style="margin-right: 10px;"/>
  <img src="https://oss.dyx666.icu/image/server/commit/wancheng.png" alt="图片3" />
</div>

<style>
  .my-h {
        /* height: 5px; */
        /* display: flex;     
        align-items: center; */
  }
  .my-image {
    margin-left: 30px;
    width: 600px;
    height: 400px;
  }
  .left2 {
    margin-left: 30px;
  }
</style>