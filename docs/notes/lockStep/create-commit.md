---
title: 2.创建公用的类库
createTime: 2024/12/10 17:25:33
permalink: /lockStep/hyen1oy6/
---

## 一、创建类库

<span style="margin-left: 30px;" />有些类，比如工具类、配置啥的，在unity客户端和服务端是用的是一样的，那么就没必要两边都写了，到时候只需要从服务端导出.dll类库，然后就可以导入unity中了。

+ ==右击解决方案== => ==添加== => ==新建项目==
  <span style="margin-top: 30px;" />

  ![image](https://oss.dyx666.icu/image/server/commit/add.png)
+ 搜索类库然后下一步创建，我这边使用的版本是.NET 8.0
    <span style="margin-top: 30px;" />

  ![image](https://oss.dyx666.icu/image/server/commit/leiku.png)
+ 创建成功之后就可以在项目中看到了
    <span style="margin-top: 30px;" />

  ![image](https://oss.dyx666.icu/image/server/commit/wancheng.png)