[English](./README_EN.md) | 简体中文

# 贪吃蛇游戏 (Snake Game) - Qwik + Vite

一个使用 Qwik 框架构建的经典贪吃蛇游戏。

## 游戏特性

- 🎮 经典贪吃蛇游戏玩法
- ⌨️ 键盘方向键控制移动
- ⏸️ 空格键暂停/继续游戏
- 📊 实时分数统计
- 🎯 碰撞检测（墙壁和自身）
- 🍎 食物收集和蛇身增长系统
- 🎨 简洁美观的界面设计

## 技术栈

- **Qwik** - 高性能前端框架
- **Vite** - 快速的开发构建工具
- **TypeScript** - 类型安全的 JavaScript
- **CSS** - 样式设计

## 快速开始

### 安装依赖

```bash
npm install
# 或
pnpm install
# 或
yarn install
```

### 开发模式

```bash
npm run dev
```

打开 [http://localhost:5173](http://localhost:5173) 即可开始游戏。

### 构建生产版本

```bash
npm run build
```

构建后的文件将输出到 `dist` 目录。

## 游戏操作

- **方向键** - 控制蛇的移动方向（上、下、左、右）
- **空格键** - 暂停/继续游戏
- **开始/重新开始按钮** - 开始新游戏或游戏结束后重新开始
- **暂停/继续按钮** - 暂停或继续当前游戏

## 游戏规则

1. 控制蛇吃到红色的食物
2. 每吃到一个食物，得分增加 10 分，蛇身增长一节
3. 避免撞到墙壁或自己的身体
4. 尽可能获得更高的分数！

## 项目结构

```
src/
├── app.tsx                 # 主应用组件
├── components/
│   ├── SnakeGame.tsx      # 游戏核心逻辑组件
│   └── SnakeGame.css      # 游戏样式
├── main.tsx               # 应用入口
└── assets/                # 静态资源

```

## 关于 Qwik

本项目使用 Qwik 的 CSR (Client Side Rendering) 模式。了解更多关于 Qwik 的信息，请访问 [Qwik 官网](https://qwik.dev)。
