---
title: Link使用
tags:
  - markdown
permalink: /article/link/
createTime: 2024/12/07 14:27:41
---



---

### 一、基本使用
#### 1.1 linkview和linkviewRandom、LinkEffect存放的位置


#### 1.2 需要在项目中添加的代码部分
##### 1.2.1 Rollview.lua


代码：
``` lua
	elseif oldRule == Const.GameRule.Normal and newRule == Const.GameRule.Link then -- 普通到link场景
		if not program  then 
			local logoTransform = select(4, ...) -- 从sceneview中传过来的logo的transform
			if logoTransform then -- 如果传来的图标位置不为空才打开linkview
				self.linkIconList = {} -- 这个是保存场景中的link图标
				for index, value in ipairs(self.reel.chesses) do
					for _, v in ipairs(value) do
						if v.value == Const.ChessType.Link then 
							if v.followers[2].transform.childCount > 0 then
								table.insert(self.linkIconList, v.followers[2].transform:GetChild(0)) 
							end
						end
					end
				end
				Globals.uiMgr:OpenView("LinkView", function(viewbase) -- 打开linkView
					viewbase.oneRound = self.oneRound
					viewbase.linkIconList = self.linkIconList
					viewbase.sceneLogoTrans = logoTransform -- 场景中的logo图标的位置
					viewbase.targetScore = self.oneRound:GetAlgorithm().LinkBet
					viewbase.reLoadData = self.oneRound:GetAlgorithm().reLoadData
				end)
			end
		elseif program == Const.LinkViewStatus.Transition then
			-- 在linkview中会把这三个图标隐藏，所以需要再次显示不然后续就直接是隐藏状态了的
			self:SetIsPop(false) -- 隐藏
		end
	elseif oldRule == Const.GameRule.Link and newRule == Const.GameRule.Normal then -- link到普通场景
		if program == Const.LinkViewStatus.Transition then -- [!code ++]
			self:SetIsPop(true) -- 显示
		elseif program == Const.LinkViewStatus.Hide  then
			Globals.uiMgr:HideView("LinkView")
			Globals.timerMgr:AddTimer(function()
				-- 播放特效，完了之后切换场景
				LMessage:Dispatch(LuaEvent.SmallGame.Reveal, Const.RevealType.Effect, Const.EffectType.BigWin, self.oneRound:GetAlgorithm().LinkBet, callback(self, "CheckSwitch"))
			end, 0, 0.5)
		end
```

---
##### 1.2.2 SceneView.lua

	需先获取logo图标，作为参数，类型为transform，替换框框中即可。



代码：

```lua
	elseif oldRule == Const.GameRule.Normal and newRule == Const.GameRule.Link then
		if not program then -- 在这个位置应该获取linkview的图标
			-- self.logoTransform是场景中的那个linkview图标，飞向的对象，需要自己在前面获取一下（类型是transform)
			-- local logoTransform = self.gameLogo and (self.gameLogo.gameObject.activeSelf and self.gameLogo or self.linkLogo) or self.logo -- 替换我就可以了
			local logoTransform = self.logoTransform -- 替换我就可以了
			local logoTrans = select(4, ...) -- 从sceneview中传过来的logo的transform
			if not logoTrans and logoTransform then -- 因为它还会自己调自己一次，所以要判断一下
				LMessage:Dispatch(LuaEvent.SmallGame.Reveal, Const.RevealType.Switch, Const.GameRule.Normal, Const.GameRule.Link, nil, logoTransform) -- rollview中处理
			end
			
		elseif program == Const.LinkViewStatus.Transition then -- 切换为linkview场景了
			self:SetIsPop(false)
		end
	elseif oldRule == Const.GameRule.Link and newRule == Const.GameRule.Normal and program and program == Const.LinkViewStatus.Transition then -- link到普通场景
		self:SetIsPop(true) -- 显示
```

##### 1.2.3 SoundModel.lua

```lua

	Music_Link = {id = "Sound/Music/Music_Link"}, -- Link的背景音乐
	-- Link 的特效音乐
	Link_Add_Score = {id = "Sound/Effect/Link/Link_Add_Score"}, -- add到下方得分
	Link_End_Effect = {id = "Sound/Effect/Link/Link_End_Effect", loop = false}, -- 结束时特效飞到最终分数框的那个特效的音乐
	Link_Jinbi = {id = "Sound/Effect/Link/Link_Jinbi"}, -- 金币飞和击到达的音乐
	Link_Number_Move = {id = "Sound/Effect/Link/Link_Number_Move", volume = 0.6}, -- 数字在移动过程中的音乐
	Link_Scroll = {id = "Sound/Effect/Link/Link_Scroll"}, -- 滚动时的音乐
	Link_Specialscore_Scroll = {id = "Sound/Effect/Link/Link_Specialscore_Scroll", loop = true}, -- 特殊分数滚动（已解锁）
	Link_Specialscore_Scroll_Lock = {id = "Sound/Effect/Link/Link_Specialscore_Scroll_Lock", loop = false}, -- 特殊分数滚动（未解锁）
	Link_Stop = {id = "Sound/Effect/Link/Link_Stop"},-- 滚动滚动的音效（改为五个全用一个音效，节约内存）
	Link_Start = {id = "Sound/Effect/Link/Link_Start"},-- 点击start按钮之后的音效
	Link_ScoreToTsuo = {id = "Sound/Effect/Link/Link_ScoreToTsuo"},-- 分数击中铁锁的声音
	Link_End_PgSound = {id = "Sound/Effect/Link/Link_End_PgSound"},-- 全部结束收集分数的声音
	Link_Transition_In = {id = "Sound/Effect/Link/Link_Transition_In"}, -- 进入Link的时候过场声音
	Link_Transition_Out = {id = "Sound/Effect/Link/Link_Transition_Out"}, -- 出去的时候
	Link_Zhadan_yr = {id = "Sound/Effect/Link/Link_Zhadan_yr", loop = true}, -- 炸弹引燃的声音，就是在等待爆炸
	Link_Zhadan_zj = {id = "Sound/Effect/Link/Link_Zhadan_zj"}, -- 炸弹撞击的音乐
```

##### 1.2.4 SoundController.lua
脚本的位置<br>

在OnPlay方法添加下列代码<br>

```lua
	elseif id == "link_view" then
		local program = select(2, ...)
		if program == Const.SoundType.Music_Link then -- 背景音乐
			Globals.soundMgr:PlayMusic(program)
		else -- 普通特效
			if program == Const.SoundType.Link_Transition_In then -- 在进场的时候要关掉原来bgm
				Globals.soundMgr:StopMusic()
			elseif program == Const.SoundType.Link_Zhadan_zj then -- 在撞击的时候要停止引燃音效
				self:OnStop("link_view", Const.SoundType.Link_Zhadan_yr)
			end
			Globals.soundMgr:PlayEffect(program)
		end
```
在OnStop中添加下列代码<br>

```lua
	local id, program = select(1, ...) -- id 和参数
	if id == "link_view" then
		Globals.soundMgr:StopEffect(program) -- 停止音乐
	end
```

##### 1.2.5 AssetsId.txt
文件位置<br>

添加代码，id冲突了自己手动修改一下，按住Shift+Alt的同时拖动鼠标快速选择一个矩形区域的内容<br>

```lua
2800|Bundle/Sound/Effect/Link/Link_Add_Score.mp3
2801|Bundle/Sound/Effect/Link/Link_End_Effect.mp3
2802|Bundle/Sound/Effect/Link/Link_Jinbi.mp3
2803|Bundle/Sound/Effect/Link/Link_Number_Move.mp3
2804|Bundle/Sound/Effect/Link/Link_Scroll.mp3
2805|Bundle/Sound/Effect/Link/Link_Specialscore_Scroll.mp3
2806|Bundle/Sound/Effect/Link/Link_Specialscore_Scroll_Lock.mp3
2807|Bundle/Sound/Effect/Link/Link_Stop.mp3
2808|Bundle/Sound/Effect/Link/Link_Start.mp3
2809|Bundle/Sound/Effect/Link/Link_ScoreToTsuo.mp3
2810|Bundle/Sound/Effect/Link/Link_End_PgSound.mp3
2812|Bundle/Sound/Effect/Link/Link_Transition_In.mp3
2813|Bundle/Sound/Effect/Link/Link_Transition_Out.mp3
2814|Bundle/Sound/Effect/Link/Link_Zhadan_yr.mp3
2815|Bundle/Sound/Effect/Link/Link_Zhadan_zj.mp3

2903|Bundle/Sound/Music/Music_Link.mp3
```
#### 1.3 资源部分
<a id='test'></a>
##### 1.3.1 CommonAtlas
在link/Art/Models/Prefabs 中拿到CommonAtlas，然后把框框中的添加到场景中<br>

##### 1.3.2 音效资源
特效的音效资源放到这个目录下<br>

背景音效放到这个目录下<br>


#### 1.4 断线重连部分
在RollView.lua文件中的场景表现==RevealScene==的==Request==请求中位置添加如下代码 </br>

```lua
elseif Globals.gameModel.rule == Const.GameRule.Link then
            LMessage:Dispatch(LuaEvent.SmallGame.Reveal, Const.RevealType.Switch, Const.GameRule.Normal, Const.GameRule.Link)
```
