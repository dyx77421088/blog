---
title: 2.开始UDP通信
createTime: 2024/12/11 13:58:52
permalink: /lockStep/start/
---

<style>
  .left2 {
    margin-left: 30px;
  }
</style>

## 一、udpServer
<span class="left2" />在项目中创建==UdpServer.cs==，用来处理Udp服务接收的消息和发送消息。在`Start()`方法中开启UDP服务指定端口，并在`ReceiveMessages()`中循环接收所有的UDP消息。

``` c#
public class UdpServer
{
    private static int port = 5000;
    private static UdpClient udpServer = new UdpClient(port);
    public static void Start()
    {
        Console.WriteLine("UDP 聊天服务器已启动，等待消息...");
        IPEndPoint remoteEndPoint = new IPEndPoint(IPAddress.Any, port);
        ReceiveMessages();
    }
    /// <summary>
    /// 循环接收信息
    /// </summary>
    private static void ReceiveMessages()
    {
        // 接收所有ip发送过来的UDP消息
        IPEndPoint clientEndPoint = new IPEndPoint(IPAddress.Any, 0);
        // 一直接收消息
        while (true)
        {
            try
            {
                byte[] receivedData = udpServer.Receive(ref clientEndPoint);
                Console.WriteLine(Encoding.UTF8.GetString(receivedData));
            }
            catch (SocketException ex)
            {
                Console.WriteLine($"SocketException: {ex.Message}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception: {ex.Message}");
            }
        }
    }
}
```
<span class="left2" />在==Program.cs==执行start()方法

``` c#
static void Main(string[] args)
{
    UdpServer.Start();
}
```

## 二、udpClient
<span class="left2" />新建一个控制台项目（仅学习，后面客户端用的是unity），在==Program.cs==中开启客户端，并循环发送消息。注意：这个端口号必须要和服务端的端口号一致。通过UdpClient.Send方法发送字节数组到指定的远程终端。

``` c#
private const int port = 5000;
private const string ip = "127.0.0.1";
private static UdpClient udpClient = new UdpClient();
// 请替换为实际的服务器 IP
private static IPEndPoint serverEndPoint = new IPEndPoint(IPAddress.Parse(ip), port); 

static void Main()
{
    // 0：自己分配端口号 也可以指定具体的端口
    udpClient.Client.Bind(new IPEndPoint(IPAddress.Any, 0)); // [!code highlight]
    Thread sendThread = new Thread(SendMessage);
    sendThread.Start();
    Console.WriteLine("UDP 聊天客户端已启动，输入消息发送（输入 'exit' 退出）:");
}
private static void SendMessage()
{
    // 循环发送消息
    while (true)
    {
        string str = Console.ReadLine();
        if (str.ToLower() == "exit") break;

        byte[] msg = Encoding.UTF8.GetBytes(str);
        udpClient.Send(msg, msg.Length, serverEndPoint);// [!code highlight]
    }
    //清理资源
    udpClient.Close();
}
```

## 三、发送消息
<span class="left2" />首先运行服务端，然后运行两个客户端，在客户端可以往服务端一直发送消息。

<span class="left2" />![image](https://oss.dyx666.icu/gif/server/sendMsg.gif)


