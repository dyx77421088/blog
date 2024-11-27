---
title: proto快速转换成c#
createTime: 2024/11/27 22:59:35
permalink: /article/8khle4h4/
tags:
  - proto
---
## proto快速转换成c#

在Utils中的Program.cs中替换proto的路径
``` csharp
  string protoDirectory = @"C:\Users\WIN\Desktop\unityProject\Server\LockStepDemo1\Commit\Proto"; // 替换为你的.proto文件目录路径
  string outputDirectory = @"C:\Users\WIN\Desktop\unityProject\Server\LockStepDemo1\Commit\Proto\output"; // 替换为输出目录
```
![image](https://github.com/user-attachments/assets/e4575b51-417c-45bc-8862-8a7ab7916e68)

---
注意，新增的文件添加进来是不会显示到项目中的需要手动添加进来。</br>

![image](https://github.com/user-attachments/assets/ae557650-ece7-4731-b9b7-fa1927c59483)

## 导出公共的dll类库
右击commit => 重新生成 编译完成之后dll文件可以在bin/debug中找到

![image](https://github.com/user-attachments/assets/158070b3-c70b-45ce-9c47-cd7ae7903564)

然后在服务端的引用中添加该引用

![image](https://github.com/user-attachments/assets/b6c00187-125f-4e6f-84f4-ffe47c34c946)
![image](https://github.com/user-attachments/assets/da6b8d1d-8b86-417a-9a99-66c221651ce2)

在unity中就是自己创建一个Plugins文件夹，然后把dll文件拖进来就可以了

![image](https://github.com/user-attachments/assets/23c6f668-86bf-4d25-8a7a-ea5761b499e2)

## 使用protobuf
### 1、安装protobuf

右击引用 => 管理NuGet程序包 => 浏览中搜索protobuf => 安装

![image](https://github.com/user-attachments/assets/a11b5914-52c2-4c6c-996b-e7630e1ebd6c)

![image](https://github.com/user-attachments/assets/77916615-3f4d-41ab-9106-6eae3dbd087a)

下载了之后在debug中就可以看到protobuf.dll，然后在unity 