---
title: 3.服务端广播，简易的多人聊天
createTime: 2024/12/11 14:49:35
permalink: /lockStep/8gtf4irn/
---

<style>
  .left2 {
    margin-left: 30px;
  }
</style>

## 一、UdpServer
<span class="left2" />在==UdpServer.cs==中添加一个集合用来存放发送过消息的客户端。创建一个用来处理接收消息的方法，并广播给其它所有添加进集合的客户端，在收到消息之后调用HandleBroadcastMessage()方法，完整的代码如下：

``` c#
private static int port = 5000;
private static UdpClient udpServer = new UdpClient(port);
// 用来存放客户端的连接
private static List<IPEndPoint> clients = new List<IPEndPoint>();// [!code ++]
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
            // 处理接收到的消息
            HandleBroadcastMessage(receivedData, clientEndPoint);// [!code ++]
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

/// <summary>// [!code ++]
/// 处理接收到的消息// [!code ++]
/// </summary>// [!code ++]
/// <param name="msg">消息</param>// [!code ++]
/// <param name="client">发送这个消息的客户端</param>// [!code ++]
private static void HandleBroadcastMessage(byte[] msg, IPEndPoint client)// [!code ++]
{// [!code ++]
    // 如果这个客户端没有被添加进来，那么就添加到这个集合中// [!code ++]
    if (!clients.Contains(client))// [!code ++]
    {// [!code ++]
        clients.Add(client);// [!code ++]
    }// [!code ++]
    // 把这个消息广播给所有的客户端（出去发送者）// [!code ++]
    foreach (IPEndPoint endpoint in clients)// [!code ++]
    {// [!code ++]
        if (!endpoint.Equals(client))// [!code ++]
        {// [!code ++]
            udpServer.Send(msg, msg.Length, endpoint);// [!code ++]
        }// [!code ++]
    }// [!code ++]
}// [!code ++]
```

## 二、UdpClient
<span class="left2" />在==Program.cs==中添加一个ReceiveMessages()方法用来处理接收到的消息，在main()方法中开启接收消息的线程，完整代码如下:

``` c#
private const string ip = "127.0.0.1";
private static UdpClient udpClient = new UdpClient();
// 请替换为实际的服务器 IP
private static IPEndPoint serverEndPoint = new IPEndPoint(IPAddress.Parse(ip), port); 

static void Main()
{
    udpClient.Client.Bind(new IPEndPoint(IPAddress.Any, 0)); // 0：自己分配端口号 也可以指定具体的端口
    // 发送消息的线程
    Thread sendThread = new Thread(SendMessage);
    sendThread.Start();
    // 接收消息的线程// [!code ++]
    Thread receiveThread = new Thread(ReceiveMessages);// [!code ++]
    receiveThread.Start();// [!code ++]
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
        udpClient.Send(msg, msg.Length, serverEndPoint);
    }
    //清理资源
    udpClient.Close();
}

private static void ReceiveMessages()// [!code ++]
{// [!code ++]
    IPEndPoint listenEndPoint = new IPEndPoint(IPAddress.Any, port);// [!code ++]
    while (true)// [!code ++]
    {// [!code ++]
        try// [!code ++]
        {// [!code ++]
            byte[] receivedData = udpClient.Receive(ref listenEndPoint); // 收到消息// [!code ++]
            Console.WriteLine("收到一则消息:" + Encoding.UTF8.GetString(receivedData));// [!code ++]
        }// [!code ++]
        catch (ObjectDisposedException)// [!code ++]
        {// [!code ++]
            Console.WriteLine("UdpClient已关闭。");// [!code ++]
            break; // 可以选择停止接收// [!code ++]
        }// [!code ++]
        catch (Exception ex)// [!code ++]
        {// [!code ++]
            Console.WriteLine($"异常: {ex.Message}");// [!code ++]
        }// [!code ++]
    }// [!code ++]
}// [!code ++]
```

## 三、多人聊天
<video controls>
    <source src = "https://oss.dyx666.icu/video/server/chat.mp4" type = "video/mp4">
    不能播放
</video>