# 合成大草莓 (Merge Big Strawberry)

一个基于 React 和 TypeScript 构建的 2048 风格的 Emoji 合成游戏。

## 游戏特色

- **经典 2048 玩法**: 合并 Emoji 直到合成大草莓 (2048)
- **分数追踪**: 记录当前分数和最高分 (持久化存储在 localStorage)
- **键盘控制**: 使用方向键移动方块
- **响应式设计**: 适配桌面和移动设备
- **胜负检测**: 自动检测游戏胜利或失败
- **新游戏按钮**: 随时重新开始游戏

## 玩法说明

1. 使用 **方向键** 移动方块
2. 当两个相同的 Emoji 相遇时，它们会 **合并成一个新的**
3. 目标是合成 **草莓 (2048)**
4. 当没有更多移动步数时，游戏结束

## 进化图鉴

- 2: 🌱
- 4: 🌿
- 8: 🌳
- 16: 🌲
- 32: 🍎
- 64: 🍊
- 128: 🍋
- 256: 🍌
- 512: 🍉
- 1024: 🍇
- 2048: 🍓

## 截图

![2048 Game Initial State](https://github.com/user-attachments/assets/c960de3e-ffa3-404d-afb7-9711747d08ca)
![2048 Game After Move](https://github.com/user-attachments/assets/dd7ae73f-1f34-4414-9084-22851a11eb6b)

## 快速开始

本项目使用 [Vite](https://vitejs.dev/) 构建。

### 前置要求

- Node.js (版本 16 或更高)
- npm 或 yarn

### 安装

1. 克隆仓库
2. 安装依赖:
   ```bash
   npm install
   ```

## 可用脚本

在项目目录中，你可以运行:

### `npm start`

使用 Vite 在开发模式下运行应用。\
打开 [http://localhost:3000](http://localhost:3000) 在浏览器中查看。

如果进行编辑，页面将重新加载。

### `npm test`

启动测试运行器 (Vitest)。

### `npm run build`

将应用构建为生产版本到 `build` 文件夹。\
它在生产模式下正确打包 React 并优化构建以获得最佳性能。

## 技术栈

- **React 19**: UI 库
- **TypeScript**: 类型安全的 JavaScript
- **Tailwind CSS**: 实用优先的 CSS 框架
- **Vite**: 构建工具

## 项目结构

```
src/
├── App.tsx           # 主应用组件
├── Game.tsx          # 游戏组件 (UI 和逻辑)
├── gameLogic.ts      # 核心游戏逻辑 (棋盘操作, 移动)
└── index.tsx         # 应用入口点
```

## 了解更多

你可以在 [Vite 文档](https://vitejs.dev/guide/) 中了解更多信息。

要学习 React，请查看 [React 文档](https://reactjs.org/)。
