---
title: unity老版本迁移到新版本sortingLayer丢失问题
createTime: 2025/03/04 10:01:33
permalink: /work/replaceSortingLayer/
---
<style>
  .left2 {
    margin-left: 30px;
  }
</style>

## 一、layer丢失问题

从老版本unity迁移至新版本的unity，prefab出现`<unknown layer>`，每个`sorting Layers`也是对应的。
![image](https://oss.dyx666.icu/image/work/layerCengji.png)

因为层级中的`Unique ID`两个版本中的不一致

<div style="display: flex;width: 400px;">
  <img src="https://oss.dyx666.icu/image/work/layerTagDebug.png" alt="图片1" style="margin-right: 10px;"/>
  <img src="https://oss.dyx666.icu/image/work/layerId.png" alt="图片2" style="margin-right: 10px;"/>
</div>

## 二、解决方案
### 1、手动指定层级
一个一个手动指定`Sorting Layer ID`，对于少量需要修改的可以使用这种方案。

### 2、直接修改Unique ID
当有大量的`<unknown layer>`，手动指定会很繁琐，可以直接修改新版本中的`Unique ID`，使它和旧版的保持一致。
<img src="https://oss.dyx666.icu/image/work/layerId.png" />

### 3、修改prefab中的layer ID
用记事本打开一个有`<unknown layer>`的prefab，我们发现它的`m_SortingLayerID`属性是和老版的`Unique ID`对应的，所以我们只需要读取所有的prefab文件，通过`<key, value>`的形式修改`m_SortingLayerID`就可以了。
![image](https://oss.dyx666.icu/image/work/layerPrefabText.png)

#### 使用视频

把代码放到Editor文件夹下，然后在`Tool`菜单栏选择`Path Selector`，然后根据操作执行，完成之后需要重启Unity才能生效。

<video controls>
    <source src = "https://oss.dyx666.icu/video/work/layerUse.mp4" type = "video/mp4">
    不能播放
</video>

#### Editor代码

```c#
using UnityEngine;
using UnityEditor;
using System.IO;
using System.Collections.Generic;
using System;
using System.Diagnostics;
using System.Linq;

public class ReplaceSortingLayerUniqueIdEditor : EditorWindow
{
    private string oldFilePath = "";
    private string newFilePath = "";

    // 打开窗口的菜单项
    [MenuItem("Tools/Path Selector")]
    public static void ShowWindow()
    {
        GetWindow<ReplaceSortingLayerUniqueIdEditor>("Path Selector");
    }
    private bool findAllPrefabs = false; // 是否查找所有 Prefab 文件
    private string prefabPath = ""; // 选择的 Prefab 路径
    private List<string> prefabList = new List<string>(); // 存储找到的 Prefab 文件路径
    private Dictionary<string, bool> prefabToggleStates = new Dictionary<string, bool>(); // 存储每个 Prefab 的复选框状态
    private bool selectAllPrefabs = false; // 是否全选 Prefab
    private float progress = 0f; // 进度条的值
    private Vector2 scrollPosition; // 滚动条的位置
    // 绘制窗口内容
    private void OnGUI()
    {
        GUILayout.Label("选择两个路径（ProjectSettings文件夹下）", EditorStyles.boldLabel);

        // 第一个路径选择
        GUILayout.Label("请选择老版的TagManger.asset:");
        GUILayout.BeginHorizontal();
        GUILayout.TextField(oldFilePath, GUILayout.Width(500));
        GUILayout.EndHorizontal();
        GUILayout.BeginHorizontal();
        if (GUILayout.Button("浏览", GUILayout.Width(60)))
        {
            oldFilePath = EditorUtility.OpenFilePanel("选择路径 1", "", "");
        }
        GUILayout.EndHorizontal();

        // 第二个路径选择
        GUILayout.Label("请选择新版的TagManger.asset:");
        GUILayout.BeginHorizontal();
        GUILayout.TextField(newFilePath, GUILayout.Width(500));
        GUILayout.EndHorizontal();
        GUILayout.BeginHorizontal();
        if (GUILayout.Button("浏览", GUILayout.Width(60)))
        {
            newFilePath = EditorUtility.OpenFilePanel("选择路径 2", "", "");
        }
        GUILayout.EndHorizontal();

        // 显示选择的路径
        if (GUILayout.Button("显示路径"))
        {
            UnityEngine.Debug.Log("路径 1: " + oldFilePath);
            UnityEngine.Debug.Log("路径 2: " + newFilePath);
        }
        // 显示进度条
        EditorGUI.ProgressBar(GUILayoutUtility.GetRect(300, 20), progress, "进度");
        GUILayout.Space(20); // 添加一些间距
        // 复选框：是否查找所有 Prefab 文件
        findAllPrefabs = GUILayout.Toggle(findAllPrefabs, "查找所有 Prefab 文件");

        // 如果不查找所有 Prefab 文件，则允许选择特定路径
        if (!findAllPrefabs)
        {
            GUILayout.Label("选择 Prefab 路径:");
            GUILayout.BeginHorizontal();
            GUILayout.TextField(prefabPath, GUILayout.Width(300));
            if (GUILayout.Button("浏览 Prefab", GUILayout.Width(100)))
            {
                prefabPath = EditorUtility.OpenFolderPanel("选择 Prefab 路径", "", "");
            }
            GUILayout.EndHorizontal();
        }

        // 查找 Prefab 文件
        if (GUILayout.Button("查找 Prefab"))
        {
            prefabList.Clear();
            prefabToggleStates.Clear();

            if (findAllPrefabs)
            {
                UnityEngine.Debug.Log("查找所有 Prefab 文件");
                FindAllPrefabs();
            }
            else
            {
                if (!string.IsNullOrEmpty(prefabPath))
                {
                    UnityEngine.Debug.Log("查找指定路径下的 Prefab 文件: " + prefabPath);
                    FindPrefabsInPath(prefabPath);
                }
                else
                {
                    UnityEngine.Debug.LogWarning("未选择 Prefab 路径！");
                }
            }

        }




        // 显示找到的 Prefab 文件
        GUILayout.Label("找到的 Prefab 文件:", EditorStyles.boldLabel);
        // 全选/全不选复选框
        bool newSelectAllPrefabs = GUILayout.Toggle(selectAllPrefabs, "全选/全不选");
        if (newSelectAllPrefabs != selectAllPrefabs)
        {
            selectAllPrefabs = newSelectAllPrefabs;
            UpdateAllPrefabToggleStates(selectAllPrefabs); // 更新所有 Prefab 的复选框状态
        }
        scrollPosition = GUILayout.BeginScrollView(scrollPosition, GUILayout.Height(200)); // 设置滚动区域高度
        foreach (string prefab in prefabList)
        {
            string relativePath = prefab; // 获取相对路径
            if (!prefabToggleStates.ContainsKey(relativePath))
            {
                prefabToggleStates[relativePath] = true; // 初始化复选框状态
            }
            prefabToggleStates[relativePath] = GUILayout.Toggle(prefabToggleStates[relativePath], GetRelativePath(relativePath));
        }
        GUILayout.EndScrollView();
        // 打印勾选的 Prefab 文件
        if (GUILayout.Button("把所选的所有prefab的layerID修改为新的layerID"))
        {
            ChangeSelectedPrefabs();
        }


    }

    // 查找所有 Prefab 文件
    private void FindAllPrefabs()
    {
        string[] allPrefabs = Directory.GetFiles(Application.dataPath, "*.prefab", SearchOption.AllDirectories);
        foreach (string prefab in allPrefabs)
        {
            prefabList.Add(prefab);
        }
    }

    // 更新所有 Prefab 的复选框状态
    private void UpdateAllPrefabToggleStates(bool isSelected)
    {
        foreach (string prefab in prefabList)
        {
            string relativePath = prefab;
            prefabToggleStates[relativePath] = isSelected;
        }
    }
    // 获取相对路径（去掉根目录）
    private string GetRelativePath(string fullPath)
    {
        // 将完整路径转换为 Unity 项目相对路径
        string relativePath = fullPath.Replace(Application.dataPath, "Assets");
        return relativePath;
    }
    // 查找指定路径下的 Prefab 文件
    private void FindPrefabsInPath(string path)
    {
        if (Directory.Exists(path))
        {
            string[] prefabsInPath = Directory.GetFiles(path, "*.prefab", SearchOption.AllDirectories);
            foreach (string prefab in prefabsInPath)
            {
                prefabList.Add(prefab);
            }
        }
        else
        {
            UnityEngine.Debug.LogWarning("路径不存在: " + path);
        }
    }

    // 修改勾选的 Prefab 文件
    private void ChangeSelectedPrefabs()
    {
        if (string.IsNullOrEmpty(oldFilePath) || string.IsNullOrEmpty(newFilePath))
        {
            UnityEngine.Debug.LogError("oldFilePaht为空或newFilePath为空");
            return;
        }
        Dictionary<int, Tuple<int, int>> replacementRules = GetSortingLayerIdMap(oldFilePath, newFilePath);
        if (replacementRules.Count <= 0)
        {
            UnityEngine.Debug.LogError("请给定正确的oldFilePaht为空或newFilePath " + replacementRules.Count);
            return;
        }
        progress = 0f; // 重置进度条
        int count = prefabToggleStates.Count(a => a.Value);
        int i = 0;
        foreach (var kvp in prefabToggleStates)
        {
            if (kvp.Value) // 如果复选框被勾选
            {
                ReplaceSortingLayerIds(replacementRules, kvp.Key);
                progress = (float)(++i) / count; // 更新进度
            }
        }
    }

    #region 根据路径修改prefab的layer
    private static int GetInt(long id)
    {
        return (int)id;
    }

    // 获取ID
    private static List<int> GetUniqueIDs(string filePath)
    {


        // 用于保存提取的数字
        List<int> uniqueIDs = new List<int>();

        // 读取文件
        using (StreamReader reader = new StreamReader(filePath))
        {
            string line;
            while ((line = reader.ReadLine()) != null)
            {
                // 检查是否包含 "uniqueID:"
                if (line.Contains("uniqueID:"))
                {
                    // 提取数字部分
                    string[] parts = line.Split(new[] { ' ' }, StringSplitOptions.RemoveEmptyEntries);
                    if (parts.Length > 1 && long.TryParse(parts[1], out long uniqueID))
                    {
                        uniqueIDs.Add(GetInt(uniqueID));
                    }
                }
            }
        }
        return uniqueIDs;
    }

    // 根据文件路径获取映射
    private static Dictionary<int, Tuple<int, int>> GetSortingLayerIdMap(string oldFilePath, string newFilePath)
    {
        // key:原先的sortLayerID，value:(新的sortLayerID, 新的SortingLayer)
        Dictionary<int, Tuple<int, int>> sortingLayerIdMap = new Dictionary<int, Tuple<int, int>>();
        List<int> o = GetUniqueIDs(oldFilePath), n = GetUniqueIDs(newFilePath);
        for (int i = 0; i < o.Count && i < n.Count; ++i)
        {
            sortingLayerIdMap.Add(o[i], Tuple.Create(n[i], i));
        }
        return sortingLayerIdMap;
    }

    // 根据replacementRules规则修改路径为filePath的prefab
    private void ReplaceSortingLayerIds(Dictionary<int, Tuple<int, int>> replacementRules, string filePath)
    {

        // 文件路径
        //string filePath = "C:\\Users\\WIN\\Desktop\\unityProject\\Demo2022_2\\Assets\\SmallGame\\Bundle\\Prefab\\UI\\Slot\\Main\\SlotObject.prefab"; // 替换为你的文件路径

        // 定义替换规则（key 为旧值，value 为新值）
        //Dictionary<int, Tuple<int, int>> replacementRules = GetSortingLayerIdMap(oldFilePath, newFilePath);

        // 读取文件内容到内存
        List<string> lines = new List<string>();
        using (StreamReader reader = new StreamReader(filePath))
        {
            string line;
            while ((line = reader.ReadLine()) != null)
            {
                lines.Add(line);
            }
        }

        // 修改文件内容
        for (int i = 0; i < lines.Count; i++)
        {
            if (lines[i].Contains("m_SortingLayerID:"))
            {
                // 提取当前行的数字
                string[] parts = lines[i].Split(new[] { ' ' }, StringSplitOptions.RemoveEmptyEntries);
                if (parts.Length > 1 && int.TryParse(parts[1], out int currentID))
                {
                    // 检查是否需要替换
                    if (replacementRules.ContainsKey(currentID))
                    {
                        // 替换为新值
                        lines[i] = lines[i].Replace($"m_SortingLayerID: {currentID}", $"m_SortingLayerID: {replacementRules[currentID].Item1}");
                        //lines[i + 1] = $" m_SortingLayer: {replacementRules[currentID].Item2}";
                        UnityEngine.Debug.Log($"已替换：{currentID} -> {replacementRules[currentID]}");
                    }
                }
            }
        }

        // 将修改后的内容写回文件
        using (StreamWriter writer = new StreamWriter(filePath))
        {
            foreach (string line in lines)
            {
                writer.WriteLine(line);
            }
        }

        Console.WriteLine("文件修改完成！");
    }

    #endregion
}
```

