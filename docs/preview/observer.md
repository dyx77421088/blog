---
title: 观察者设计模式1
tags:
  - 设计模式
createTime: 2024/12/12 10:34:22
permalink: /article/k4dw3hzh/
---


## 一、设计模式
::: tip 观察者设计模式
<span class="left2" />观察者设计模式（Observer Pattern）是一种行为型设计模式，它定义了一种一对多的依赖关系，使得==当对象状态发生变化时，所有依赖于它的对象都能得到通知并自动更新==。这种模式广泛应用于事件处理系统、数据流等场景。
:::

<span class="left2" />观察者设计模式简单来说就是在某一个点需要执行一系列的操作，如：鼠标点击左键（点），创建子弹并向前发射（操作1），UI界面修改子弹的个数（操作2）。  
<span class="left2" />注：本篇会用到 [partial关键字](./partial.md)

## 二、具体实现

IEvent.cs
``` c#
public abstract class IEvent
{
    protected readonly string name;

    protected IEvent(string name)
    {
        this.name = name;
    }

    protected void ThrowNameException()
    {
        UnityEngine.Debug.LogException(new System.Exception("提交了相同的event: " + name));
    }
}
```

Event.cs
``` c#
public partial class Event : IEvent
{
    // 订阅
    private readonly List<Action> subscribers;
    public Event(string name) : base(name)
    {
        subscribers = new List<Action>();
    }

    /// <summary>
    /// 订阅的活动依次执行
    /// </summary>
    public void Call()
    {
        for (int i = subscribers.Count - 1; i >= 0; i--)
        {
            subscribers[i].Invoke(); // 执行
        }
    }

    public static Event operator +(Event e, Action action)
    {
        e.CheckName(action);
        e.subscribers.Add(action);
        return e;
    }

    public static Event operator -(Event e, Action action)
    {
        e.subscribers.Remove(action);
        return e;
    }

    private void CheckName(Action action)
    {
        // 如果已经包含了这个名字的action就抛出
        if (subscribers.Contains(action))
        {
            ThrowNameException();
        }
    }
}
```
Events.Input.cs
``` c#
/// <summary>
/// 从键盘输入出发的事件
/// </summary>
public partial class Events
{
    public static Event FireRequest = new Event("FireRequest"); // 开枪的请求
    public static Event ReloadRequest = new Event("ReloadRequest"); // 换弹夹的请求
    public static Event JumpRequest = new Event("JumpRequest"); // 跳跃的请求
}
```
<span class="left2" />在上面几个cs文件就把观察者设计模式简单的定义好了，在==Event.cs==中用subscribers集合来存放该事件中所有需要执行的操作，在调用Call()方法就会把所有的订阅依次执行一次。在==Events.Input.cs==中定义了三个事件，那么要怎么实现呢。

DesktopInput.cs
``` c#
public class DesktopInput : MonoBehaviour
{
    [Header("一些键的控制")]
    [Tooltip("跳跃")]public KeyCode jumpKeyCode = KeyCode.Space;
    [Tooltip("换弹")] public KeyCode reloadKeyCode = KeyCode.R;

    // Update is called once per frame
    private void Update()
    {
        // 跳跃
        if (Input.GetKeyDown(jumpKeyCode))
        {
            Events.JumpRequest.Call();
        }
        // 开枪
        if (Input.GetMouseButton(0))
        {
            Events.FireRequest.Call();
        }
        // 换弹
        if (Input.GetKeyDown(reloadKeyCode))
        {
            Events.ReloadRequest.Call();
        }
    }
}
```

PlayerBehaviour.cs

``` c#
public partial class PlayerBehaviour : MonoBehaviour
{
    // 可以在这里定义一些属性
    public int hp;

    private void Awake()
    {
        // 注册一些订阅
        SubScribe();
    }

    private void OnDestroy()
    {
        // 注销订阅
        UnSubScribe();
    }

    private void Update()
    {
        // 行走
        UpdateWalk();
    }

    // 一些订阅
    private void SubScribe()
    {
        Events.ReloadRequest += OnReloadRequest;
        Events.FireRequest += OnFireRequest;
        Events.JumpRequest += OnJumpRequested;
    }
    // 注销一些订阅
    private void UnSubScribe()
    {
        Events.ReloadRequest -= OnReloadRequest;
        Events.FireRequest -= OnFireRequest;
        Events.JumpRequest -= OnJumpRequested;
    }
}
```
PlayerBehaviour.Movement.cs

``` c#
public partial class PlayerBehaviour : MonoBehaviour
{
    private void UpdateWalk()
    {
        // TODD 处理角色移动的逻辑
    }
    private void OnJumpRequested()
    {
        // TODD 处理角色跳跃的逻辑
    }
}
```

PlayerBehaviour.Attack.cs

``` c#
public partial class PlayerBehaviour : MonoBehaviour
{
    // 开枪
    private void OnFireRequest()
    {
        // TODD 处理角色开枪的逻辑
    }
    // 换弹夹的请求
    private void OnReloadRequest()
    {
        // TODD 处理角色换弹夹的的逻辑
    }
}
```
PlayerBulletUI.cs
``` c#
public class PlayerBulletUI  : MonoBehaviour
{
    // 可以在这里定义一些属性
    public Text buttleText;

    private void Awake()
    {
        // 注册一些订阅
        SubScribe();
    }

    private void OnDestroy()
    {
        // 注销订阅
        UnSubScribe();
    }

    // 一些订阅
    private void SubScribe()
    {
        Events.FireRequest += UpdateBullet;
    }
    // 注销一些订阅
    private void UnSubScribe()
    {
        Events.FireRequest -= UpdateBullet;
    }

    public void UpdateBullet()
    {
        // TODD
    }
}
```

<span class="left2" />在==DesktopInput.cs==中获得从玩家的操作，再通过这个点来执行所有的订阅。如：角色按左键进行发射子弹，在==PlayerBehaviour.Attack.cs==中会执行OnFireRequest()方法，在==PlayerBulletUI.cs==中执行UpdateBullet()方法修改子弹数UI。
<style>
  .left2 {
    margin-left: 30px;
  }
</style>

## 三、思考
<span class="left2" />在==Events.Input.cs==中我们定义的三个事件都是不能传参数的，但我们难免会用到入参，那么要怎么实现呢？在定义事件的时候每次都要new一个Event，可以如何优化？进阶版：[观察者设计模式2](./observer2.md)