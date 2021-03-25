# NLPSentimentAnalysis 前端指南

本文为 NLPSentimentAnalysis 解决方案的前端开发部分提供指南。

[TOC]

## 技术栈

1. Node.js
2. React
3. Electron

## 开发环境配置

1. 安装 node.js。
2. clone 已有代码。仓库地址： https://github.com/icedancemelody/NLPSentimentAnalysis.git 。
3. 安装依赖。项目目录下执行 `npm install` 命令。

## 调试运行方法

要启动两个终端，一个运行前端代码，一个运行 Electron。

1. 运行前端：
   - 执行 `npm run react-start` （要关掉弹出的网页，网页版是不可用的）
2. 运行 Electron：
   - 确保 `main.js` 中 `const dev = ture`
   - 在另一个终端执行 `npm run electron-start`，若成功则可看到应用已经启动

## 打包方法

尚未成功打包，待补充说明。

1. 确保 `main.js` 中 `const dev = false`
2. 执行 `npm run build` ：构建 react 网页版
3. 执行 `npm run make` ：打包为安装包。若不成功，过程中应该能成功打包 package，可以以 exe 运行