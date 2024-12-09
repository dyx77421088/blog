---
title: Dotween曲线之Ease.OutBounce和DOLocalJump
createTime: 2024/12/07 16:15:14
permalink: /article/dbuei2ub/
tags:
  - DoTween
  - C#
  - Unity
---

<!-- <video width = "320" height = "240" controls>
	<source src = "https://oss.dyx666.icu/image/down.mp4" type = "video/mp4">
	不能播放
</video> -->

::: tip 曲线OutBounce
:::

---
Ease.OutBounce 通常用于在物体移动或缩放等动画结束时，产生一种轻微反弹的效果。例如，你可以在物体的移动动画结束时，给物体添加一个小的反弹动作，使动画看起来更加生动。

#### 使用
```c#
targetObj.DOLocalMove(targetPos.localPosition, 0.7f).SetEase(Ease.OutBounce);
```
<img src="https://oss.dyx666.icu/image/down3.gif" width=150 />



::: tip DOLocalJump 方法
:::

---
DOLocalJump 的基本用法是使某个 Transform 在其本地空间中进行跳跃，并且具备固定的高度和平滑的运动。该方法可以让物体在 Y 轴上跳跃，并随附设置跳跃的次数、跳跃高度和持续时间。
#### 方法签名
```c#
public static Tweener DOLocalJump(Transform target, Vector3 jumpEndValue, float jumpPower, int numJumps, float duration, bool snap = false);
```
#### 参数解释
+ ==target==: 目标 Transform，即你想要移动的物体。
+ ==jumpEndValue==: 跳跃结束的位置，这是一个 Vector3 值，表示跳跃要达到的最终本地坐标。
+ ==jumpPower==: 跳跃的高度，决定物体跳跃的竖直高度。
+ ==numJumps==: 跳跃的次数，表示物体在动画期间将进行多少次跳跃。
+ ==duration==: 动画的总持续时间，单位为秒。
+ ==snap==: 一个布尔值，决定是否在跳跃结束的时候让物体的坐标对齐（默认为 false）。
  
#### 使用
```c#
targetObj.DOLocalJump(targetPos.localPosition, 0.5f, 2, 0.7f).SetEase(Ease.OutBounce);
```
<img src="https://oss.dyx666.icu/image/down2.gif" width=150 />


[更多曲线及使用效果](https://easings.net/zh-cn#)