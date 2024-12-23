---
title: 7.网络传输之Protobuf2
createTime: 2024/12/23 14:57:16
permalink: /lockStep/protobuf2/
---

[在前面](./proto.md)我们讲到如何简单地使用protobuf，但是项目中不可能只会有一个类型的proto，而对于不同的请求传过来的不同的参数的时候，可以用`enum`（枚举类型）来判断传过来的数据类型，在存储数据的时候用`oneof`存到同一个位置。  

## 一、Commit
::: code-tabs
@tab Proto/Status.proto
``` protobuf
syntax = "proto3";

// 返回的状态的类型
enum StatusType {
    ST_ERROR = 0; // 错误
    ST_SUCCESS = 1; // 成功
}
message Status {
    int32 id = 1;
    string msg = 2;
    StatusType st = 3;
}
``` 

@tab Proto/User.proto
``` protobuf
syntax = "proto3";

message User {
    string name = 1;
    int32 id = 2;
    string password = 3;
}
```

@tab Proto/Request.proto
``` protobuf
syntax = "proto3";
// 导入外部的proto文件
import "User.proto"; 
import "Status.proto";

// 请求的类型
enum RequestType {
     // 未知请求
    RT_UNKNOWN = 0;
     // 登陆请求
    RT_LOGIN = 1;
}
// 夹带的参数（也就是data的类型）
enum RequestData {
    // 未知类型
    RD_UNKNOWN = 0; 
    // 类型为User
    RD_USER = 1; 
    // 类型为status
    RD_STATUS = 2;

}
// 基础请求类型
message BaseRequest {
    // 是谁发送的请求(也就是userId)
    int32 userId = 1; 
    RequestType requestType = 2;
    RequestData requestData = 3;
    // oneof表示这里面的占用相同的地址
    oneof data { 
        User user = 4;
        Status status = 5;
    }
}
```

@tab Utils/ProtoBufUtils.cs
``` c#
/// <summary>
/// 序列化相关的工具类
/// </summary>
public class ProtoBufUtils
{
    public static BaseRequest DeSerializeBaseRequest(byte[] data)
    {
        return BaseRequest.Parser.ParseFrom(data);
    }
    public static byte[] SerializeBaseRequest(BaseRequest baseRequest)
    {
        return baseRequest.ToByteArray();
    }
}
```
:::
其中==Request.proto==用来存放所有的请求信息，然后通过请求的类型`RequestType`和数据类型`RequestType`来判断夹带的参数`data`是什么，然后再建一个==ProtoBufUtils.cs==用来序列化和反序列化。再和之前一样先[proto转C#](proto.md#二、proto转c)(记得把转换的c#包含到项目中)。最后把`Commit`项目[生成dll文件](create-commit.md#二、使用类库)。

## 二、服务端 LockStepServer
::: code-tabs
@tab UdpServer.cs
``` c#
/// <summary>
/// 循环接收信息
/// </summary>
private static void ReceiveMessages()
{
    // 省略循环体和trycatch具体可看前面的文章...
    byte[] receivedData = udpServer.Receive(ref clientEndPoint);
    BaseRequest requset = ProtoBufUtils.DeSerializeBaseRequest(receivedData);
    // 处理接收到的消息
    HandleReceivedData(requset, clientEndPoint);
}
// 根据不同的请求类型和数据类型到对应的处理
private static void HandleReceivedData(BaseRequest request, IPEndPoint client)
{
    if (request.RequestType == RequestType.RtLogin) // 如果是登陆请求
    {
        if (request.RequestData == RequestData.RdUser) // 且携带的数据是user
        {
            HandleLoginMessage(request, client); // 处理登陆请求
        }
    }
}
// 处理登陆请求
private static void HandleLoginMessage(BaseRequest request, IPEndPoint client)
{
    BaseRequest baseRequest = new BaseRequest()
    {
        RequestType = RequestType.RtLogin,
        RequestData = RequestData.RdStatus,
        Status = new Status()
    };
    if (CheckLogin(request.User.Name, request.User.Password))
    {
        baseRequest.Status.St = StatusType.StSuccess;
        baseRequest.Status.Msg = "登陆成功！";
    }
    else
    {
        baseRequest.Status.St = StatusType.StError;
        baseRequest.Status.Msg = "用户名或密码错误";
    }
    byte[] msg = ProtoBufUtils.SerializeBaseRequest(baseRequest);
    udpServer.Send(msg, msg.Length, client);
}
private static bool CheckLogin(string userName, string password)
{
    if ("张三".Equals(userName) && "123456".Equals(password)) return true;
    else if ("里斯".Equals(userName) && "666666".Equals(password)) return true;
    else if ("admin".Equals(userName) && "admin".Equals(password)) return true;
    return false;
}
```
:::

## 三、Unity

::: code-tabs
@tab Events.Response.cs
``` c#
public static Event<BaseRequest> LoginResponse; // 登陆响应
```
@tab UdpClient.Request.cs
``` c#
private void Login(string userName, string password)
{
    BaseRequest request = new BaseRequest()
    {
        RequestType = RequestType.RtLogin,
        RequestData = RequestData.RdUser,
        User = new User()
        {
            Name = userName,
            Password = password
        }
    };
    byte[] msg = ProtoBufUtils.SerializeBaseRequest(request); // 实体类 => byte数组
    udpClient.Send(msg, msg.Length, serverEndPoint);
}
```

@tab UdpClient.Request.cs
``` c#
private void ReceiveMessages()
{
    IPEndPoint listenEndPoint = new IPEndPoint(IPAddress.Any, NetConfig.UDP_PORT);
    try
    {
        byte[] receivedData = udpClient.Receive(ref listenEndPoint); // 收到消息
        BaseRequest requset = ProtoBufUtils.DeSerializeBaseRequest(receivedData);
        // 处理接收到的消息
        HandleReceivedData(requset);
        
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
// 根据不同的请求类型和数据类型到对应的处理
private void HandleReceivedData(BaseRequest request)
{
    if (request.RequestType == RequestType.RtLogin) // 如果是登陆请求
    {
        if (request.RequestData == RequestData.RdStatus) // 且携带的数据是status
        {
            Events.LoginResponse.Call(request); // 那么就是登陆请求后服务端给响应的status数据
        }
    }
}
```

@tab LoginServer.cs
``` c#
/// <summary>
/// 获得登陆消息的响应信息
/// </summary>
/// <param name="baseRequest">响应信息</param>
public void LoginResponse(BaseRequest request)
{
    message.text = request.Status.Msg;
}
```
:::

## 四、完整结构和代码
<div style="display: flex;width: 340px;" class="left2">
  <img src="https://oss.dyx666.icu/image/server/jiegou/Commit1.png" alt="图片1" style="margin-right: 10px;"/>
  <img src="https://oss.dyx666.icu/image/server/jiegou/LockStepServer1.png" alt="图片2" style="margin-right: 10px;"/>
  <img src="https://oss.dyx666.icu/image/server/jiegou/unity1.png" alt="图片2" style="margin-right: 10px;"/>
</div>

::: code-tabs
@tab NetConfig.cs
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
@tab Request.proto
``` protobuf
syntax = "proto3";
// 导入外部的proto文件
import "User.proto"; 
import "Status.proto";

// 请求的类型
enum RequestType {
     // 未知请求
    RT_UNKNOWN = 0;
     // 登陆请求
    RT_LOGIN = 1;
}
// 夹带的参数（也就是data的类型）
enum RequestData {
    // 未知类型
    RD_UNKNOWN = 0; 
    // 类型为User
    RD_USER = 1; 
    // 类型为status
    RD_STATUS = 2;

}
// 基础请求类型
message BaseRequest {
    // 是谁发送的请求(也就是userId)
    int32 userId = 1; 
    RequestType requestType = 2;
    RequestData requestData = 3;
    // oneof表示这里面的占用相同的地址
    oneof data { 
        User user = 4;
        Status status = 5;
    }
}
```

@tab Status.proto
``` protobuf
syntax = "proto3";

// 返回的状态的类型
enum StatusType {
    ST_ERROR = 0; // 错误
    ST_SUCCESS = 1; // 成功
}
message Status {
    int32 id = 1;
    string msg = 2;
    StatusType st = 3;
}
```
@tab User.proto
``` protobuf
syntax = "proto3";

message User {
    string name = 1;
    int32 id = 2;
    string password = 3;
}

```
@tab ProtoBufUtils.cs
``` c#
using Google.Protobuf;

namespace Commit.Utils
{
    /// <summary>
    /// 序列化相关的工具类
    /// </summary>
    public class ProtoBufUtils
    {
        public static BaseRequest DeSerializeBaseRequest(byte[] data)
        {
            return BaseRequest.Parser.ParseFrom(data);
        }
        public static byte[] SerializeBaseRequest(BaseRequest baseRequest)
        {
            return baseRequest.ToByteArray();
        }
    }
}
```
:::


::: code-tabs
@tab Program.cs
``` c#
using LockStepServer.Server;
using System.Diagnostics;
using System.IO;
using System;

namespace LockStepServer
{
    internal class Program
    {
        static void Main(string[] args)
        {
             UdpServer.Start();

            //Protobuf2Cs();
        }

        // .proto转换为csharp
        static void Protobuf2Cs()
        {
            string protoDirectory = @"C:\Users\WIN\Desktop\unityProject\LockStepServer\Commit\Proto"; // 替换为你的.proto文件目录路径
            string outputDirectory = @"C:\Users\WIN\Desktop\unityProject\LockStepServer\Commit\Proto\output"; // 替换为输出目录

            // 确保输出目录存在
            Directory.CreateDirectory(outputDirectory);

            // 获取所有 .proto 文件
            string[] protoFiles = Directory.GetFiles(protoDirectory, "*.proto");

            foreach (string protoFile in protoFiles)
            {
                ConvertProtoToCs(protoFile, outputDirectory);
            }

            Console.WriteLine("所有 .proto 文件已成功转换为 C#。");
        }

        static void ConvertProtoToCs(string protoFile, string outputDirectory)
        {
            //protoc--csharp_out =.person.proto

            // 获取 .proto 文件所在目录
            string protoDirectory = Path.GetDirectoryName(protoFile);

            // 运行 protoc 命令
            var processStartInfo = new ProcessStartInfo
            {
                FileName = "protoc",
                Arguments = $"--proto_path=\"{protoDirectory}\" --csharp_out=\"{outputDirectory}\" \"{protoFile}\"",
                RedirectStandardOutput = true,
                RedirectStandardError = true,
                UseShellExecute = false,
                CreateNoWindow = true
            };

            using (var process = Process.Start(processStartInfo))
            {
                process.WaitForExit();

                string output = process.StandardOutput.ReadToEnd();
                string error = process.StandardError.ReadToEnd();

                if (process.ExitCode != 0)
                {
                    Console.WriteLine($"转换文件 {protoFile} 时出错: {error}");
                }
                else
                {
                    Console.WriteLine($"成功转换: {protoFile}");
                }
            }
        }
    
    
    }
}

```

@tab UdpServer.cs
``` c#
using Commit.Config;
using Commit.Utils;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Xml.Linq;

namespace LockStepServer.Server
{
    public class UdpServer
    {
        private static UdpClient udpServer = new UdpClient(NetConfig.UDP_PORT);
        // 用来存放客户端的连接
        private static List<IPEndPoint> clients = new List<IPEndPoint>();
        public static void Start()
        {
            Console.WriteLine("UDP 聊天服务器已启动，等待消息...");

            IPEndPoint remoteEndPoint = new IPEndPoint(IPAddress.Any, NetConfig.UDP_PORT);

            //const uint IOC_IN = 0x80000000;
            //int IOC_VENDOR = 0x18000000;
            //int SIO_UDP_CONNRESET = (int)(IOC_IN | IOC_VENDOR | 12);

            ////因为我使用的是UdpClient, 所以先get出Socket（Client）来。
            //udpServer.Client.IOControl((int)SIO_UDP_CONNRESET, new byte[] { Convert.ToByte(false) }, null);
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
                    BaseRequest requset = ProtoBufUtils.DeSerializeBaseRequest(receivedData);
                    // 处理接收到的消息
                    HandleReceivedData(requset, clientEndPoint);
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
        // 根据不同的请求类型和数据类型到对应的处理
        private static void HandleReceivedData(BaseRequest request, IPEndPoint client)
        {
            if (request.RequestType == RequestType.RtLogin) // 如果是登陆请求
            {
                if (request.RequestData == RequestData.RdUser) // 且携带的数据是user
                {
                    HandleLoginMessage(request, client); // 处理登陆请求
                }
            }
        }
        // 处理登陆请求
        private static void HandleLoginMessage(BaseRequest request, IPEndPoint client)
        {
            BaseRequest baseRequest = new BaseRequest()
            {
                RequestType = RequestType.RtLogin,
                RequestData = RequestData.RdStatus,
                Status = new Status()
            };
            if (CheckLogin(request.User.Name, request.User.Password))
            {
                baseRequest.Status.St = StatusType.StSuccess;
                baseRequest.Status.Msg = "登陆成功！";
            }
            else
            {
                baseRequest.Status.St = StatusType.StError;
                baseRequest.Status.Msg = "用户名或密码错误";
            }
            byte[] msg = ProtoBufUtils.SerializeBaseRequest(baseRequest);
            udpServer.Send(msg, msg.Length, client);
        }

        private static bool CheckLogin(string userName, string password)
        {
            if ("张三".Equals(userName) && "123456".Equals(password)) return true;
            else if ("里斯".Equals(userName) && "666666".Equals(password)) return true;
            else if ("admin".Equals(userName) && "admin".Equals(password)) return true;
            return false;
        }
    }
}
```
:::

::: code-tabs
@tab Events.Request.cs
``` c#
// 请求
namespace LockStep
{
    public partial class Events
    {
        
        public static Event<string, string> LoginRequest;// 登陆请求
    }

}
```
@tab Events.Response.cs
``` c#
// 响应
namespace LockStep
{
    public partial class Events
    {
        public static Event<BaseRequest> LoginResponse; // 登陆响应

        public static Event<int> LoginSuccess; // 登陆成功！
    }

}
```
@tab UdpClient.cs
``` c#
// 响应
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public partial class UdpClient : MonoBehaviour
{
    private static UdpClient instance; // 单例模式

    public static UdpClient Instance { get { return instance; } }
    private void Awake()
    {
        instance = this;
        RequestSubScribe(); // 开启request中的订阅
        DontDestroyOnLoad(gameObject);
    }
    void Start()
    {
        InitUdpClient();
        StartReceiving();
    }

    private void OnDestroy()
    {
        RequestUnSubScribe(); // 销毁request中的订阅
    }
}

```
@tab UdpClient.Request.cs
``` c#

using System.Net.Sockets;
using System.Net;
using System.Text;
using LockStep;
using UnityEngine;
using Commit.Config;
using Google.Protobuf;
using Commit.Utils;

public partial class UdpClient
{
    // 谁在发送，发送请求的udp
    private System.Net.Sockets.UdpClient udpClient = new System.Net.Sockets.UdpClient();
    // 发送给谁， 
    private IPEndPoint serverEndPoint = new IPEndPoint(IPAddress.Parse(NetConfig.IP), NetConfig.UDP_PORT);

    public void RequestSubScribe()
    {
        Events.LoginRequest += Login; // 登陆
    }
    public void RequestUnSubScribe()
    {
        Events.LoginRequest -= Login;
    }

    private void InitUdpClient()
    {
        udpClient.Client.Bind(new IPEndPoint(IPAddress.Any, 0)); // 0：自己分配端口号 也可以指定具体的端口
    }

    private void Login(string userName, string password)
    {
        BaseRequest request = new BaseRequest()
        {
            RequestType = RequestType.RtLogin,
            RequestData = RequestData.RdUser,
            User = new User()
            {
                Name = userName,
                Password = password
            }
        };
        byte[] msg = ProtoBufUtils.SerializeBaseRequest(request); // 实体类 => byte数组
        udpClient.Send(msg, msg.Length, serverEndPoint);
    }
}
```
@tab UdpClient.Response.cs
``` c#
using Commit.Config;
using Commit.Utils;
using LockStep;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using UnityEngine;

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
        IPEndPoint listenEndPoint = new IPEndPoint(IPAddress.Any, NetConfig.UDP_PORT);
        try
        {
            byte[] receivedData = udpClient.Receive(ref listenEndPoint); // 收到消息
            BaseRequest requset = ProtoBufUtils.DeSerializeBaseRequest(receivedData);
            // 处理接收到的消息
            HandleReceivedData(requset);
            
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

    private void HandleReceivedData(BaseRequest request)
    {
        if (request.RequestType == RequestType.RtLogin) // 如果是登陆请求
        {
            if (request.RequestData == RequestData.RdStatus) // 且携带的数据是status
            {
                Events.LoginResponse.Call(request); // 那么就是登陆请求后服务端给响应的status数据
            }
        }
    }


}

```

:::









