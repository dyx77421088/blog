---
title: 4.unity和服务器的通信
createTime: 2024/12/19 16:47:21
permalink: /lockStep/unity-udp/
---
<style>
  .left2 {
    margin-left: 30px;
  }
</style>

本篇主要是讲unity和服务端的通信，其中会用到[partial关键字](../../preview/partial.md)和[观察者设计模式](../../preview/observer.md)，请自行查阅。
## 一、效果演示

<video controls>
    <source src = "https://oss.dyx666.icu/video/server/unityUdp.mp4" type = "video/mp4">
    不能播放
</video>

## 二、Unity Udp通信
在`Script/Server/Client`中创三个cs文件，分别为：  
1. ==UdpClient.Request.cs==，用来处理发送请求
2. ==UdpClient.Response.cs==,用来处理接收的请求
3. ==UdpClient.cs==,用来管理生命周期、发送、接收请求等。

::: code-tabs
@tab UdpClient.cs
``` c#
public partial class UdpClient : MonoBehaviour
{
    private static UdpClient instance; // 单例模式

    public static UdpClient Instance { get { return instance; } }
    private void Awake()
    {
        instance = this;
        DontDestroyOnLoad(gameObject);
    }
    void Start()
    {
        InitUdpClient();
        StartReceiving();
    }
}
```
@tab UdpClient.Requset.cs
``` c#
public partial class UdpClient
{
    private const int port = 12345;
    // 谁在发送，发送请求的udp
    private System.Net.Sockets.UdpClient udpClient = new System.Net.Sockets.UdpClient();
    // 发送给谁， 
    private IPEndPoint serverEndPoint = new IPEndPoint(IPAddress.Parse("127.0.0.1"), 5000);

    private void InitUdpClient()
    {
        udpClient.Client.Bind(new IPEndPoint(IPAddress.Any, 0)); // 0：自己分配端口号 也可以指定具体的端口
    }
}
```
@tab UdpClient.Response.cs
``` c#
public partial class UdpClient
{
    // 开启协程，接收消息
    private void StartReceiving()
    {
        // 使用协程接收数据
        StartCoroutine(ReceiveData());
    }

    // 启动协程
    private IEnumerator ReceiveData()
    {
        while (true)
        {
            yield return new WaitForSeconds(0.1f); // 限制接收频率，可以调整

            if (udpClient.Available > 0)
            {
                ReceiveMessages(); // 处理接收的信息
            }
        }
    }

    private void ReceiveMessages()
    {
        IPEndPoint listenEndPoint = new IPEndPoint(IPAddress.Any, port);
        try
        {
            byte[] receivedData = udpClient.Receive(ref listenEndPoint); // 收到消息
            // 处理接收到的消息 TODD
        }
        catch (ObjectDisposedException)
        {
            Debug.Log("UdpClient已关闭。");
            //break; // 可以选择停止接收
        }
        catch (Exception ex)
        {
            Debug.Log($"异常: {ex.Message}");
        }
    }
}
```
:::


假设我们要输入用户名、密码进行登陆，那么我们可以考虑向服务器发送一个字符串: "用户名+空格+密码",然后服务器解析后判断是否匹配，再响应给客户端。注意，其中省略了[观察者设计模式](../../preview/observer.md)的构建。

::: code-tabs
@tab UdpClient.cs
``` c#
public partial class UdpClient : MonoBehaviour
{
    private static UdpClient instance; // 单例模式

    public static UdpClient Instance { get { return instance; } }
    private void Awake()
    {
        instance = this;
        RequestSubScribe(); // 开启request中的订阅 // [!code ++]
        DontDestroyOnLoad(gameObject);
    }
    void Start()
    {
        InitUdpClient();
        StartReceiving();
    }

    private void OnDestroy() // [!code ++]
    { // [!code ++]
        RequestUnSubScribe(); // 销毁request中的订阅 // [!code ++]
    } // [!code ++]
}
```
@tab UdpClient.Requset.cs
``` c#
public partial class UdpClient
{
    private const int port = 12345;
    // 谁在发送，发送请求的udp
    private System.Net.Sockets.UdpClient udpClient = new System.Net.Sockets.UdpClient();
    // 发送给谁， 
    private IPEndPoint serverEndPoint = new IPEndPoint(IPAddress.Parse("127.0.0.1"), 5000);

    public void RequestSubScribe() // [!code ++]
    { // [!code ++]
        Events.LoginRequest += Login; // 登陆 // [!code ++]
    } // [!code ++]
    public void RequestUnSubScribe() // [!code ++]
    { // [!code ++]
        Events.LoginRequest -= Login; // [!code ++]
    } // [!code ++]

    private void InitUdpClient()
    {
        udpClient.Client.Bind(new IPEndPoint(IPAddress.Any, 0)); // 0：自己分配端口号 也可以指定具体的端口
    }

    private void Login(string userName, string password) // [!code ++]
    { // [!code ++]
        string str = userName + " " + password; // [!code ++]
        byte[] msg = Encoding.UTF8.GetBytes(str); // [!code ++]
        udpClient.Send(msg, msg.Length, serverEndPoint); // [!code ++]
    } // [!code ++]
}
```
@tab UdpClient.Response.cs
``` c#
public partial class UdpClient
{
    // 开启协程，接收消息
    private void StartReceiving()
    {
        // 使用协程接收数据
        StartCoroutine(ReceiveData());
    }

    // 启动协程
    private IEnumerator ReceiveData()
    {
        while (true)
        {
            yield return new WaitForSeconds(0.1f); // 限制接收频率，可以调整

            if (udpClient.Available > 0)
            {
                ReceiveMessages(); // 处理接收的信息
            }
        }
    }

    private void ReceiveMessages()
    {
        IPEndPoint listenEndPoint = new IPEndPoint(IPAddress.Any, port);
        try
        {
            byte[] receivedData = udpClient.Receive(ref listenEndPoint); // 收到消息
            Events.LoginResponse.Call(Encoding.UTF8.GetString(receivedData)); // [!code ++]
        }
        catch (ObjectDisposedException)
        {
            Debug.Log("UdpClient已关闭。");
            //break; // 可以选择停止接收
        }
        catch (Exception ex)
        {
            Debug.Log($"异常: {ex.Message}");
        }
    }
}
```
@tab Events.Request.cs
``` c#
public partial class Events
{
    public static Event<string, string> LoginRequest;// 登陆请求
}
```
@tab Events.Response.cs
``` c#
public partial class Events
{
    public static Event<string> LoginResponse; // 登陆响应
}
```
:::

在`Script/Server`文件夹下再创建一个==LoginServer.cs==，用来处理登陆的逻辑。场景中的登陆按钮绑定`ClickLogin`方法，然后获取用户名和密码的文本信息，再发送登陆请求。`LoginResponse`方法订阅登陆响应事件（在==UdpClient.Response.cs==会调用`Events.LoginResponse.Call`）
``` c#
public class LoginServer : MonoBehaviour
{
    public InputField userName;
    public InputField password;
    public Text message;

    private void Awake()
    {
        SubScribe();
    }

    private void SubScribe()
    {
        Events.LoginResponse += LoginResponse; // 登陆请求
        Events.LoginSuccess += OnLoginSuccess; // 登陆成功
    }
    private void UnSubScribe()
    {
        Events.LoginResponse -= LoginResponse;
        Events.LoginSuccess -= OnLoginSuccess;
    }

    /// 获得登陆消息的响应信息
    public void LoginResponse(string str)
    {
        message.text = str;
    }

    // 绑定的按钮事件
    public void ClickLogin()
    {
        Events.LoginRequest.Call(userName.text, password.text); // 发送登陆请求
    }

    private void OnDestroy()
    {
        UnSubScribe();
    }
}
```

## 三、服务端 Udp通信
前面都是unity中的操作，在服务端也是很简单的，只需要处理一下接收到的信息，再进行比较之后发送给客户端就可以了。  

**服务端中的UdpServer.cs**
``` c#
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
            // 处理接收到的消息// [!code focus]
            HandleLoginMessage(receivedData, clientEndPoint);// [!code focus]
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

private static void HandleLoginMessage(byte[] loginInfo, IPEndPoint client)// [!code focus]
{// [!code focus]
    string[] strs = Encoding.UTF8.GetString(loginInfo).Split(' ');// [!code focus]
    string message = CheckLogin(strs[0], strs[1]) ? "登陆成功" : "用户名或密码错误";// [!code focus]
    byte[] msg = Encoding.UTF8.GetBytes(message);// [!code focus]
    udpServer.Send(msg, msg.Length, client);// [!code focus]
}// [!code focus]

private static bool CheckLogin(string userName, string password)// [!code focus]
{// [!code focus]
    if ("张三".Equals(userName) && "123456".Equals(password)) return true;// [!code focus]
    else if ("里斯".Equals(userName) && "666666".Equals(password)) return true;// [!code focus]
    else if ("admin".Equals(userName) && "admin".Equals(password)) return true;// [!code focus]
    return false;// [!code focus]
}// [!code focus]   
```


