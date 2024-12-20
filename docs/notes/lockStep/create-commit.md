---
title: 5.创建公用的类库
createTime: 2024/12/10 17:25:33
permalink: /lockStep/hyen1oy6/
---

## 一、创建类库

<span class="left2" />有些类，比如工具类、配置啥的，在unity客户端和服务端是用的是一样的，那么就没必要两边都写了，到时候只需要从服务端导出.dll类库，然后就可以导入unity中了。在`LockStepServer`项目中右击查看属性，查看目标框架是什么，后面类库要和这个框架匹配，不然是用不了的。

![image](https://oss.dyx666.icu/image/server/commit/objFrame.png)
<span class="left2" />==右击解决方案== => ==添加== => ==新建项目==。搜索类库然后下一步创建，我这边使用的版本是.NET Framework 4.7.2。

<div style="display: flex;width: 240px;" class="left2">
  <img src="https://oss.dyx666.icu/image/server/commit/add.png" alt="图片1" style="margin-right: 10px;"/>
  <img src="https://oss.dyx666.icu/image/server/commit/leiku2.png" alt="图片2" style="margin-right: 10px;"/>
  <img src="https://oss.dyx666.icu/image/server/commit/wancheng.png" alt="图片3" />
</div>

在Commit中的创建Config/NetCofig.cs，用来配置一些网络信息。
``` c#
namespace Commit.Config
{
    public class NetConfig
    {
        // 服务器tcp的端口号
        public static int TCP_PORT = 5000;
        // 服务器udp的端口号
        public static int UDP_PORT = 12345;
        // ip地址
        public static string IP = "127.0.0.1";
    }
}
```
## 二、使用类库

右击`Commit` => 重新生成，然后在文件夹中找到==Commit.dll==文件。

![image](https://oss.dyx666.icu/image/server/commit/reSc.png)

右击`LockSetpServer`项目中的`引用`，在浏览中选择==Commit.dll==文件

![image](https://oss.dyx666.icu/image/server/commit/addCommit.png)

把==UdpServer.cs==中的一些网络配置改为`Commit`中的==NetConfig.cs==中的配置。
``` c#
private static UdpClient udpServer = new UdpClient(NetConfig.UDP_PORT);
// 用来存放客户端的连接
private static List<IPEndPoint> clients = new List<IPEndPoint>();
public static void Start()
{
    Console.WriteLine("UDP 聊天服务器已启动，等待消息...");

    IPEndPoint remoteEndPoint = new IPEndPoint(IPAddress.Any, NetConfig.UDP_PORT);
    ReceiveMessages();
}
```

## 三、unity使用类库
在unity项目中右击新建一个文件夹`Plugins`，其中放插件相关的文件。这个是特殊文件夹，所以必须要为这个名字。再把==Commit.dll==复制到该文件夹中。

![image](https://oss.dyx666.icu/image/server/commit/unityCommit.png)

哪里用到了配置信息就在哪里修改。
``` c#
// 发送给谁， 
private IPEndPoint serverEndPoint = new IPEndPoint(IPAddress.Parse(NetConfig.IP), NetConfig.UDP_PORT);
```
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