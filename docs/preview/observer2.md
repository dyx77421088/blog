---
title: 观察者设计模式2
tags:
  - 设计模式
createTime: 2024/12/12 11:51:37
permalink: /article/nul2i8ot/
---

<style>
  .left2 {
    margin-left: 30px;
  }
</style>

<span class="left2" /> 在前面的 [文章](./observer.md) 我们已经知道了如何简单地使用观察者设计模式，同时也留下了一些问题：带参数的事件、如何优化写法。细心的同学就会发现我们前面写的==Event.cs==用的是 [partial](./partial.md) 关键字，我们可以在==Event.cs==中处理多个数据。  

Event.T.cs
``` c#
public partial class Event<T> : IEvent
{
    private readonly List<Action<T>> subscribers;
    public Event(string name) : base(name)
    {
        subscribers = new List<Action<T>>();
    }

    /// <summary>
    /// 订阅的活动依次执行
    /// </summary>
    public void Call(T pram)
    {
        for (int i = subscribers.Count - 1; i >= 0; i--)
        {
            subscribers[i].Invoke(pram); // 执行
        }
    }

    public static Event<T> operator +(Event<T> e, Action<T> action)
    {
        e.CheckName(action);
        e.subscribers.Add(action);
        return e;
    }

    public static Event<T> operator -(Event<T> e, Action<T> action)
    {
        e.subscribers.Remove(action);
        return e;
    }

    private void CheckName(Action<T> action)
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
public partial class Events
{
    public static Event<int> PlayerSwapWeapon = new Event<int>("PlayerSwapWeapon");// 切换武器 // [!code focus]
    public static Event FireRequest = new Event("FireRequest"); // 开枪的请求
    public static Event ReloadRequest = new Event("ReloadRequest"); // 换弹夹的请求
    public static Event JumpRequest = new Event("JumpRequest"); // 跳跃的请求
}
```
DesktopInput.cs
``` c#
// 武器的下标从0开始
Events.PlayerSwapWeapon.Call(0);
```

PlayerBehaviour.Attack.cs
``` c#
// 换武器
private void OnSwapWeapon(int index)
{
    // TODD 根据按的键来切换对应的武器
}
```

PlayerBehaviour.cs
``` c#
// 在这里面注册订阅
private void SubScribe()
{
    Events.PlayerSwapWeapon += OnSwapWeapon;
    // 省略其它的订阅....
}
private void UnSubScribe()
{
    Events.PlayerSwapWeapon -= OnSwapWeapon;
    // 省略其它的订阅....
}
```


<span class="left2" /> 在==Event.T.cs==中只需要增加一个泛型就可以用来传参了，如果有两个或更多的参数也是同理，==Event.TT.cs== 、 ==Event.TTT.cs==。

---
<span class="left2" />使用反射给Events中的静态参数实例化。我们可以用反射给 public static 修饰的 Event 全部自动实例化，所以在==Events.Input.cs==就不需要再实例化了。不知道反射也没关系，只需要知道加了==Events.cs==中的代码之后，后面的事件就不需要实例化就可以直接使用了。  

Events.Input.cs
``` c#
public partial class Events
{
    public static Event<int> PlayerSwapWeapon;// 切换武器
    public static Event FireRequest; // 开枪的请求
    public static Event ReloadRequest; // 换弹夹的请求
    public static Event JumpRequest; // 跳跃的请求
}
```

Events.cs
``` c#
public partial class Events
{
    // 这个的主要功能是后面的订阅就不用实例化了，直接用！
    static Events()
    {
        FieldInfo[] fields = typeof(Events).GetFields(BindingFlags.Public | BindingFlags.Static);

        foreach (FieldInfo field in fields)
        {
            // IsSubclassOf 检测是否是这个类的子类
            if (field.FieldType.IsSubclassOf(typeof(IEvent)))
            {
                // 反射的方法设置值，如果设置的对象为静态的第一个参数设置为null
                // Activator.CreateInstance 实例化对象,field.FieldType对象的类型
                Debug.Log(field.Name);
                field.SetValue(null, Activator.CreateInstance(field.FieldType, field.Name));
            }
        }
    }
}
```


