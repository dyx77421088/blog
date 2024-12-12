---
title: unity中的partial关键字的使用
tags:
  - c#
createTime: 2024/12/12 09:39:01
permalink: /article/afepa8es/
---
## 一、Partial关键字
::: tip partial关键字的说明
<span class="left2" />在 C# 中，partial 关键字用于定义一个类、结构体或接口的部分实现。这种方式允许你将一个类型的定义拆分到多个文件中，便于管理和组织代码。使用 partial 关键字的主要原因包括：  
+ 代码组织：在大型项目中，将类分成多个部分可以使代码更易于理解和维护。例如，你可以将不同功能的代码分离到不同的文件中。
+ 协作开发：多个开发人员可以并行工作在同一个类的不同部分，避免了代码冲突。例如，一个开发者可以负责业务逻辑，而另一个开发者可以负责用户界面。
+ 自动生成代码：某些工具（如 Visual Studio 的设计器）会自动生成代码，并将这些代码放在 partial 类中。通过使用 partial，你可以在不修改自动生成的部分的情况下扩展类的功能。
:::

假如你有一个Car.cs类，可以将其功能分成多个部分：  
::: code-tabs
@tab Car.Part1.cs
``` c#
public partial class Car
{
    public string Make { get; set; }
    public string Model { get; set; }
}
```
@tab Car.Part2.cs 
``` c#
public partial class Car
{
    public void Start()
    {
        Console.WriteLine("Car started!");
    }

    public void Stop()
    {
        Console.WriteLine("Car stopped!");
    }
}

```

@tab 使用示例
``` c#
public class Program
{
    public static void Main(string[] args)
    {
        Car myCar = new Car
        {
            Make = "Toyota",
            Model = "Corolla"
        };

        myCar.Start();
        Console.WriteLine($"This is a {myCar.Make} {myCar.Model}.");
        myCar.Stop();
    }
}
```
:::
<span class="left2" />在这个示例中，Car类被拆分成了两部分，一个包含属性，一个包含方法。注意：在给类取名字的时候两个类的名字必须相同，然后用.xxx区分为不同的文件，比如上面就用的是Car.Part1.cs 和 Car.Part2.cs 其中Car表示都是Car.cs，用.Part1和.Part2区分为两个不同的文件。


## 二、Unity应用场景
<span class="left2" /> 假如你要写一个PlayerBehaviour.cs用来实现玩家的操作。那么可以使用Partial关键字来把功能分离到多个文件中。  

::: code-tabs
@tab PlayerBehaviour.cs

``` c#
public partial class PlayerBehaviour : MonoBehaviour
{
    // 可以在这里定义一些属性
    public int hp;

    private void Update()
    {
        // 行走
        UpdateWalk();
    }

    // 攻击
    public void Attack() 
    {
        Fire();
    }
}
```
@tab PlayerBehaviour.Movement.cs

``` c#
public partial class PlayerBehaviour : MonoBehaviour
{
    private void UpdateWalk()
    {
        // TODD 处理角色移动的逻辑
    }
}
```

@tab PlayerBehaviour.Attack.cs

``` c#
public partial class PlayerBehaviour : MonoBehaviour
{
    // 开枪
    private void Fire()
    {
        // TODD 处理角色开枪的逻辑
    }
}
```
:::
<style>
  .left2 {
    margin-left: 30px;
  }
</style>