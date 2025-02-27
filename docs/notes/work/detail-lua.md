---
title: 框架lua使用
createTime: 2025/02/27 14:10:06
permalink: /work/detail-lua/
---

## lua代码详解
### 1、使用技巧
* 打开项目在资源管理器中找到`lua`文件夹，拖动到`VSCode`上打开项目。
* 在`VSCode`中左侧的放大镜按钮可以全局搜索代码，在文件中使用快捷键==Ctrl+F==局部搜索。
* 使用快捷键==Ctrl+P==可快捷打开文件，如输入`main.lua`。
### 2、结构构成
<img src="https://oss.dyx666.icu/image/work/lua1.png" style="margin:10px" />

我们所有所写的代码都放到`GameExtend`文件夹中，其它的文件夹中的都是框架中的代码，不能直接修改，可以通过“继承”来完成。 

### 3、基本使用

在框架中，我们使用的最多的为`SceneView.lua`和`RollView.lua`。对应场景中的`SlotView/scene`和`SlotView/scroll`。

<div style="display: flex;width: 200px;margin-left: 30px;">
 <img src="https://oss.dyx666.icu/image/work/lua2.png" alt="图片1" style="margin-right: 10px;"/>
 <img src="https://oss.dyx666.icu/image/work/lua3.png" alt="图片2"/>
</div>

```lua
function RollView:Initialize()
	-- 获得场景中的scroll/back/normal节点的transform
	self.normal = self:GetChild("back/normal")
	-- 获得场景中的scroll/follow节点的挂载的animator组件
	self.anim = self:GetChild("follow", ClassType.Animator)
end
```

==在框架中，C#API在lua基本能使用==

```lua
-- 修改缩放
self.normal.localScale = Vector3(1, 2, 3)
-- 隐藏该节点，注：调用方法需要使用冒号而不是点
self.normal.gameObject:SetActive(false)
-- 同样可以从transform中获取挂载的组件
self.normalAnim = self.normal:GetComponent(ClassType.Animator)
self.normalAnim:SetTrigger("trigger")
```
### 4、继承

如若继承`OneRound.lua`：
* 在`GameExtend`文件夹中新建一个`OneRound.lua`(名字可以不同，路径可以放到原`OneRound.lua`路径修改为`GameExtend`之后的)。
* 在继承的`OneRound.lua`文件中的重写方法。

```lua
-- 父类的路径
local OneRound = require "GameLogic.Module.Slot.Game.OneRound"
-- 子类名称和继承的父类OneRound
OneRound = BaseClass("OneRoundEditor", OneRound)
-- 重写父类的AlterMatrix方法
function OneRound:AlterMatrix()
-- TODD 新的逻辑
end
return OneRound
```
* 在`GameExtend/Config/ClassData.lua`中声明`OneRound.lua`为我们所写的路径下的（把之前的注释掉，如果有）。
```lua
OneRound = "GameExtend.Module.Slot.Game.OneRound",
```

### 5、数据通信

* 本框架使用[观察者设计模式](https://baike.baidu.com/item/%E8%A7%82%E5%AF%9F%E8%80%85%E6%A8%A1%E5%BC%8F/5881786)进行通信，简单来说是通过(key, value)存放`订阅名`和`订阅内容`。注册：添加键为key的方法到value集合中，通知：执行所有的键为key的订阅。
* 使用==LMessage:Dispatch==通知，使用==LMessage:Register==或==self:BindEvent==注册，其中`self:BindEvent`会多一层检测，它在表中只会有一个key的订阅。

```lua
function UIShareInterface:BindEvent(evantName, func_name)
    if not self.eventMap then
        self.eventMap = {}
    end
    if not self.eventMap[evantName] then
        self.eventMap[evantName] = LMessage:Register(evantName, func_name, self)
    end    
end
```
*  在`SceneView.lua`中会在加载后会使进度条增加，然后在`LoadingController.lua`处理UI显示。在全局搜索中可以看到有哪些文件注册和哪些通知的。
<img src="https://oss.dyx666.icu/image/work/lua4.png" alt="图片1" style="zoom:30%;margin-top:20px;"/>
<img src="https://oss.dyx666.icu/image/work/lua5.png" alt="图片1" style="zoom:30%;"/>

### 6、RollView和SceneView常用的方法
~~其中的♥表示需要重写的程度~~
* ==Initialize==♥♥♥♥♥：初始化的时候调用。一般用于初始化场景中的用到的各个节点。
* ==OnPrepare==♥♥：在加载完成之后调用。用于重连等地方使用。
* ==OnOneRound==♥：在游戏中，点击开始一局游戏的时候调用。
* ==OnFinishRound==♥：棋子滚动结束的时候调用，然后会调用==RevealScene==
* ==RevealScene==♥♥♥：在棋子滚动结束时调用。在计算结果之前如若有啥表现都可以写到这里面。
* ==RevealResult==♥：==RevealScene==之后调用，计算当前矩阵的获奖情况。一般用框架的，不需要重写。
* ==RevealEffect==♥：在==RevealResult==计算获奖后选择不同的表现效果。一般用框架的，不需要重写。
* ==RevealSwitch==♥♥♥♥♥♥：==RevealResult==计算的获奖结果如果有特殊奖，会跳转到免费游戏等特殊玩法中，在这里面处理转场表现。
* ==RevealFinish==♥：一局结束之后调用。一般用框架的，不需要重写。
* ==RevealChess==♥♥♥：棋子有多种状态，包括但不限于待机(Idle)、Respin、完成(Finish)。在改变棋子的状态的时候的回调。

### 7、一些常用的一些其它方法


#### 1、GetChild

使用频率：♥♥♥♥♥♥

> 方法说明

通过路径获得对应的节点，或获得节点上挂载的组件。

> 使用

```lua
-- 获得normal/root路径下的节点的transform
self.root = self:GetChild("normal/root")
-- 获得normal/image路径下的节点上挂载的Image
self.image = self:GetChild("normal/image", ClassType.Image)
```

#### 2、callback

使用频率：♥♥♥♥

> 方法说明

返回一个方法，通常用于回调，可以带参数。

> 使用

```lua
function RollView:Initialize()
	self.click = ButtonItem.New(self:GetChild("click"), self)
	self.click:AddOnClick(self.click, callback(self, "Stop", 1))
end
-- 回调方法
function RollView:Stop(idx)
end
```

#### 3、Mylog

使用频率：♥♥♥♥

> 方法说明

以log的形式打印。

> 使用

```lua
MyLog("hello world")
```

#### 4、DelayCall

使用频率：♥♥♥♥♥

> 方法说明

延时x秒后执行方法，异步的。

> 使用

```lua
-- 延时4秒后执行function
Globals.timerMgr:DelayCall(function ()
	self.effWinObj:SetActive(false)
end, 4)
```

#### 5、Dispatch

使用频率：♥♥♥♥♥

> 方法说明

数据之间的通信，以RollView和SceneView为主，其它的lua文件或者他们之间相互通信都要用到。

> 使用

```lua
-- 通知注册了LuaEvent.SmallGame.Reveal的方法，后三个为参数。整体为从normal切换为bonus
LMessage:Dispatch(LuaEvent.SmallGame.Reveal, Const.RevealType.Switch, Const.GameRule.Normal, Const.GameRule.Bonus)
```

#### 6、Pop及Push

使用频率：♥♥♥

> 方法说明

用抽屉的形式控制资源，有就拿，不够就new，用完就放到抽屉中。

> 使用

![image](https://oss.dyx666.icu/image/work/lua6.png)

![image](https://oss.dyx666.icu/image/work/lua7.png)

获得`SlotObject`下的fly资源，加载之后在回调中调它的位置之类的参数，然后用`Push`回收，回收到场景中的`Pool`节点下。

```lua
Globals.poolMgr:Pop("Slot/Main/SlotObject", "fly", callback(self, "OnLoadObject"))

function RollView:OnLoadObject(args, object)
	if object.name == "fly" then
		local trans = object.transform
		trans:SetParent(self.effectRoot)
		trans.localScale = Vector3.one * 9.6
		-- 1秒之后回收
		Globals.timerMgr:DelayCall(function ()
			Globals.poolMgr:Push("fly", object)
		end, 1)
	end
end
```

#### 7、DOTween

使用频率：♥♥♥♥♥♥

> 方法说明

所有的动画控制表现啥的都要用DOTween，框架中的lua也是可以和C#中一样正常使用。更多使用需自行学习。

> 使用

```lua
-- 0.5秒缩放为1.4
self.num.transform:DOScale(Vector3.one * 1.4, 0.5)
-- 0.6秒移动到targetPos位置
self.transform:DOLocalMove(targetPos, 0.6):SetEase(EaseType.OutBounce)
```
