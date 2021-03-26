# NLPSentimentAnalysis 前端指南

本文为 NLPSentimentAnalysis 解决方案的前端开发部分提供指南。

[TOC]

## 技术栈和工具

1. Node.js
2. React
3. Electron
4. Inno Setup Compiler

## 开发环境配置

1. 安装 node.js。
2. clone 已有代码。仓库地址： https://github.com/icedancemelody/NLPSentimentAnalysis.git 。
3. 安装依赖。项目目录下执行 `npm install` 命令。

## 调试运行方法

要启动两个终端，一个运行前端代码，一个运行 Electron。

1. 运行前端：
   - 执行 `npm run react-start` （要关掉弹出的网页，网页版是不可用的）
2. 运行 Electron：
   - 确保 `main.js` 中 `const devMode = ture`
   - 在另一个终端执行 `npm run electron-start`，若成功则可看到应用已经启动

## 打包方法

不使用 electron-forge，使用 Inno Setup Compiler。

> Inno Setup Compiler 下载地址：https://files.jrsoftware.org/is/6/innosetup-6.1.2.exe 。使用浏览器访问该地址将直接下载。使用教程搜一搜就好了，简单的配置。

1. 确保 `main.js` 中 `const devMode = false`
2. 执行 `npm run build` ：构建 react 网页版
3. 执行 `npm run package` ：打包为绿色版程序，程序文件夹在 `./out`
4. 删除打包出来的程序文件夹中的 `resources/app/node_modules/.cache` 文件夹，否则无法打包安装包
5. 使用 Inno Setup Compiler 打包

## 面向 Python 程序的接口

Python 程序放在 py 目录下，通过同目录下的 json 文件与前端传输数据。

- 前端向 Python 传：`py/dataToPy.json`
- Python 向前端传：`py/dataToNodeJs.json`

注意写入和读取使用 UTF-8 编码。

前端向 Python 传两种数据结构，一种对应单条分析，一种对应批量分析。数据结构如下：

1. 单条分析：

```json
{
    "comment": "评论内容"
}
```

2. 批量分析：

```json
{
    "data": [
        "评论内容1",
        "评论内容2",
        "评论内容3",
    ]
}
```

Python 向前端传两种数据结构，一种对应单条分析，一种对应批量分析。数据结构如下：

1. 单条分析：

```json
{
    "theDimension": "评论角度",
    "theAttitude": "评论态度",
    "theTextFeatures": "文字特征",
    "theReply": "自动回复"
}
```

2. 多条分析：

```json
{
    "data": [
        {
            "commentText": "评论内容",
            "dimension": "评论角度",
            "attitude": "正/负",
            "textFeatures": "文字特征",
            "reply": "自动回复"
        },
        {
            "commentText": "评论内容",
            "dimension": "评论角度",
            "attitude": "正面/负面",
            "textFeatures": "文字特征",
            "reply": "自动回复"
        }
    ]
}
```

