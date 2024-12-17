---
title: videoMgr的使用
createTime: 2024/12/17 13:55:30
permalink: /work/video/
---

## 一、资源
Video的资源和`Sound`同级，有使用的资源需要在==SmallGame/AssetsId.txt==中增加，同样，==Pack.txt==的打包信息也要修改。  
![image](https://oss.dyx666.icu/image/work/videoUrl.png)

## 二、快速上手
::: code-tabs
@tab 普通使用
``` lua
-- video
self.rawImage = self:GetChild("video", ClassType.RawImage)
-- 创建video，显示的位置为self.rawImage
self.video = VideoItem.New(self.transform, self.mBaseView, self.rawImage) 

self.video:PlayVideo("Video/Book", true) -- 普通的播放视频
```
@tab 进阶使用
``` lua
self.rawImage = self:GetChild("video", ClassType.RawImage)
-- 创建video，显示的位置为self.rawImage
self.video = VideoItem.New(self.transform, self.mBaseView, self.rawImage) 

self.video:PlayVideo("Video/Book", true) -- 播放Video.Book.mp4，循环播放
            :SetMaterial(Const.VideoMaterialType.Color, {removeColor = Color.black}) -- 剔除黑色部分
            :AddFrameLinsterByUrl("Video/Book", 0.5, function ()
                self.video:SetAlpha(0) -- 直接修改透明度为0
            end, true) -- 在路径为Video/Book的视频的第n秒添加事件监听
            :AddFrameLinsterByUrl("Video/Book", 1.5, function ()
                self.video:DOAlpha(1, 1) -- 经过1秒后修改透明度为1
            end, true)
```
:::