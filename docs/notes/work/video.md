---
title: videoMgr的使用
createTime: 2024/12/17 13:55:30
permalink: /work/video/
---

<style>
  .left2 {
    margin-left: 30px;
  }
</style>

## 一、资源
### 1. 视频存放路径
<span class="left2" />`Video`的资源和`Sound`同级，有使用的资源需要在==SmallGame/AssetsId.txt==中增加，同样，==Pack.txt==的打包信息也要修改（`Files:Bundle/Video`和`Bundle/Prefab/VideoMgr`)。  

![image](https://oss.dyx666.icu/image/work/videoUrl.png)
### 2. Shader
<span class="left2" />视频在使用剔除材质的时候会用到一些Shader，已上传到框架中，在`SmallGame/Bundle/Shader`下

## 二、快速上手
::: code-tabs
@tab 普通使用
``` lua
Globals.videoMgr:Play({
  url = "Video/Cutscene_NGtoFG", -- 你的视频url
})
```
@tab 进阶使用
``` lua
-- 在init中准备视频
function TransitionView:Initialize() 
  -- 使用rawImage可以处理视频翻转问题
  self.rawImage = self:GetChild("rawImage", ClassType.RawImage)
  self.videoAsset = {
    url = "Video/Cutscene_NGtoFG", -- 你的视频url
    renderMode = UnityEngine.Video.VideoRenderMode.RenderTexture, 
    isPrepare = true, -- 准备
    rawImage = self.rawImage,
    frameListener = {
      [-5] = callback(self, "OnVideoComplete")
    },
  }
  -- 准备视频
  Globals.videoMgr:Play(self.videoAsset)
end
-- 在某个节点play视频
function TranstionView:Play() 
  self.videoAsset.isPrepare = false -- 准备完成
  self.rawImage.gameObject:SetActive(true)
  Globals.videoMgr:Play(self.videoAsset)
end

-- 视频播放完成
function TransitionView:OnVideoComplete()	
	Globals.videoMgr:Stop(self.videoAsset)
  -- 接下来的操作TODD
end

```
:::


## 三、VideoItem API
### 1、说明
API已被更新，具体使用查看VideoItem.lua
<!-- ### 1、InitVideo(rawImage, width, height)
> 参数及返回值

| 参数名      | 类型       | 默认值  | 描述            |
| -------- | -------- | ---- | ------------- |
| rawImage | RawImage |      | 控制视频在ui上显示的位置 |
| width    | number   | 1080 | 控制显示的宽        |
| height   | number   | 1920 | 控制显示的高        |

---

| 返回值的类型 | 说明                                   |
| ------ | ------------------------------------ |
| VideoItem | 返回self，主要用于链式 |

> 使用

<span class="left2" />在VideoItem.lua中，`New`会自动调用`InitVideo`，通过`RenderTexture`把video关联到RawImage上。

``` lua
self.rawImage = self:GetChild("video", ClassType.RawImage)
-- 创建video，显示的位置为self.rawImage
self.video = VideoItem.New(self.transform, self.mBaseView, self.rawImage) 
```
<div style="display: flex;width: 350px;margin-left: 30px;">
    <img src="https://oss.dyx666.icu/image/work/videoOut1.png" alt="图片1" style="margin-right: 10px;"/>
    <img src="https://oss.dyx666.icu/image/work/videoOut2.png" alt="图片2"/>
</div>

### 2、PlayVideo(url, isLooping)
> 参数及返回值

| 参数名      | 类型       | 默认值  | 描述            |
| -------- | -------- | ---- | ------------- |
| url      | string |      | 播放哪个video |
| isLooping    | bool   |  | 是否循环播放        |

---

| 返回值的类型 | 说明                                   |
| ------ | ------------------------------------ |
| VideoItem | 返回self，主要用于链式 |

> 方法说明

<span class="left2" />指定播放url下的视频

> 使用

``` lua
-- video
self.rawImage = self:GetChild("video", ClassType.RawImage)
-- 创建video，显示的位置为self.rawImage
self.video = VideoItem.New(self.transform, self.mBaseView, self.rawImage) 

self.video:PlayVideo("Video/Book", true) -- 普通的播放视频 -- [!code highlight]
```

![image](https://oss.dyx666.icu/image/work/playVideo.png) -->

<!-- ### 3、Pause()
> 参数及返回值


| 返回值的类型 | 说明                                   |
| ------ | ------------------------------------ |
| VideoItem | 返回self，主要用于链式 |

> 方法说明

<span class="left2" />暂停播放视频

> 使用
``` lua
-- video
self.rawImage = self:GetChild("video", ClassType.RawImage)
-- 创建video，显示的位置为self.rawImage
self.video = VideoItem.New(self.transform, self.mBaseView, self.rawImage) 

self.video:PlayVideo("Video/Book", true) -- 普通的播放视频
self.video:Pause() -- [!code highlight]
```

### 4、Play()
> 参数及返回值


| 返回值的类型 | 说明                                   |
| ------ | ------------------------------------ |
| VideoItem | 返回self，主要用于链式 |
> 方法说明

<span class="left2" />继续播放视频

> 使用
``` lua
-- video
self.rawImage = self:GetChild("video", ClassType.RawImage)
-- 创建video，显示的位置为self.rawImage
self.video = VideoItem.New(self.transform, self.mBaseView, self.rawImage) 

self.video:PlayVideo("Video/Book", true) -- 普通的播放视频
self.video:Play() -- [!code highlight]
```

### 5、AddFrameLinsterByUrl(url, frameIdx, listener, isSecond)
> 参数及返回值

| 参数名      | 类型       | 默认值  | 描述            |
| -------- | -------- | ---- | ------------- |
| url      | string |      | 给哪个url的视频添加事件监听 |
| frameIdx    | number   |  | 第几帧        |
| listener  | function   |  | 事件        |
| isSecond    | bool   |  | 是否为秒（为ture，那么就是第frameIdx秒)        |

---

| 返回值的类型 | 说明                                   |
| ------ | ------------------------------------ |
| VideoItem | 返回self，主要用于链式 |

> 方法说明

<span class="left2" /> 因为可能在某个条件下可能会切换其它的视频，如：进入之后idle，那么就要用url区分给哪个视频下的多少帧添加的事件。一秒有多少帧主要是看视频的属性，在资源文件夹中右击视频查看属性。

<img src="https://oss.dyx666.icu/image/work/zhen.png" style="width:200px" alt="图片2"/>

> 使用

``` lua
self.video:PlayVideo("Video/Book", true) -- 播放Video.Book.mp4，循环播放
          :AddFrameLinsterByUrl("Video/Book", 0.5, function ()-- [!code highlight]
			MyLog("第0.5秒触发的监听")-- [!code highlight]
		  end, true)-- [!code highlight]
		  :AddFrameLinsterByUrl("Video/Book", 25, function ()-- [!code highlight]
			MyLog("第25帧触发的监听")-- [!code highlight]
		  end, false)-- [!code highlight]
``` -->

### 6、DOAlpha(alpha, time)
> 参数及返回值

| 参数名      | 类型       | 默认值  | 描述            |
| -------- | -------- | ---- | ------------- |
| alpha      | number |      | 透明度（取值为0~1) |
| time    | number   |  | 持续时间        |

---

| 返回值的类型 | 说明                                   |
| ------ | ------------------------------------ |
| VideoItem | 返回self，主要用于链式 |

> 方法说明

<span class="left2" /> 在time秒之后把视频的透明度平滑地修改为alpha。

> 使用

<!-- ``` lua
self.video:PlayVideo("Video/Book", true) -- 播放Video.Book.mp4，循环播放
          :AddFrameLinsterByUrl("Video/Book", 1, function ()
            self.video:DOAlpha(0, 1) -- [!code highlight]
          end, true)
          :AddFrameLinsterByUrl("Video/Book", 3, function ()
            self.video:DOAlpha(1, 1) -- [!code highlight]
          end, true)
``` -->

### 7、SetMaterial(materialType, param)
> 参数及返回值

| 参数名      | 类型       | 默认值  | 描述            |
| -------- | -------- | ---- | -------------------------------- |
| materialType      | enum |      | 可以选的类型为`Const.VideoMaterialType.Color`、`Const.VideoMaterialType.Image` |
| param    | table   |  | 传入的参数，image类型：\{maskTex:Texture\}，Color类型：\{removeColor:Color\} |

---

| 返回值的类型 | 说明                                   |
| ------ | ------------------------------------ |
| VideoItem | 返回self，主要用于链式 |

> 方法说明

<span class="left2" /> 有需求播放具有透明通道的视频，可以使用shader对视频进行剔除，现在能使用的类型有静态的图片、或者是每帧下的颜色。

> 使用

<!-- ``` lua
-- video
self.rawImage = self:GetChild("video", ClassType.RawImage)
-- 创建video，显示的位置为self.rawImage
self.video = VideoItem.New(self.transform, self.mBaseView, self.rawImage) 

-- self.video:PlayVideo("Video/Book", true) -- 普通的播放视频

self.video:PlayVideo("Video/Book", true) -- 播放Video.Book.mp4，循环播放
          :SetMaterial(Const.VideoMaterialType.Color, {removeColor = Color.black}) -- 剔除黑色部分-- [!code highlight]
``` -->
**左边是正常的视频播放，右边的是把黑色剔除了之后的视频。**

<img src="https://oss.dyx666.icu/gif/videoMgr/colorRemove.gif" style="width:200px" alt="图片2"/>

<!-- ``` lua
-- video
self.rawImage = self:GetChild("video", ClassType.RawImage)
-- 创建video，显示的位置为self.rawImage
self.video = VideoItem.New(self.transform, self.mBaseView, self.rawImage) 

self.video:PlayVideo("Video/Book", true) -- 播放Video.Book.mp4，循环播放

Globals.resMgr:LoadSprite("Slot/Main/SlotAtlas", "imageRemove/queko", function (sp)-- [!code highlight]
  self.video:SetMaterial(Const.VideoMaterialType.Image, {maskTex = sp.texture}) -- [!code highlight]
end)-- [!code highlight]
``` -->
**右边是进行剔除的图片，左边是根据图片剔除之后的效果视频。ps：剔除的部分为图片中透明的部分。**

<img src="https://oss.dyx666.icu/gif/videoMgr/imageRemove.gif" style="width:200px" alt="图片2"/>

