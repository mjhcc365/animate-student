# Animate Student - 网站特效案例库

一个专注于收集和展示现代网站特效案例的项目，涵盖物理效果、视差滚动、3D 动画等多种动画技术。

## 🎯 项目目标

记录和展示各种网站特效实现方案，为前端开发者提供动画效果的参考和学习资源。

## 🛠️ 技术栈

### 核心框架

- **Next.js 15** - React 全栈框架
- **React 18** - 用户界面库
- **TypeScript** - 类型安全

### 动画库

- **GSAP (GreenSock)** - 专业级动画库，支持复杂的时间轴和缓动效果
- **Three.js** - 3D 图形库，用于创建 3D 场景和模型
- **React Three Fiber** - Three.js 的 React 渲染器
- **React Spring** - 基于物理的动画库

### 物理引擎

- **Matter.js** - 2D 物理引擎，用于重力、碰撞等效果
- **Cannon.js** - 3D 物理引擎，支持 3D 物理模拟
- **Planck.js** - 高性能 2D 物理引擎

### 3D 建模工具

- **Blender** - 开源 3D 建模软件，用于创建 3D 模型和动画
- **Three.js Editor** - 在线 3D 场景编辑器

### 其他工具

- **Lenis** - 平滑滚动库
- **Zustand** - 状态管理
- **Tailwind CSS** - 原子化 CSS 框架
- **Simplex Noise** - 噪声算法，用于自然动画效果

## 📚 特效案例分类

### 1. 物理效果 (Physics Effects)

- [ ] 重力效果 - 物体自由落体
- [ ] 碰撞检测 - 物体间的物理碰撞
- [ ] 粒子系统 - 爆炸、烟花效果
- [ ] 流体模拟 - 液体流动效果
- [ ] 布料模拟 - 旗帜、布料飘动

### 2. 视差滚动 (Parallax Scrolling)

- [x] 基础视差 - 不同层级的滚动速度
- [ ] 深度视差 - 3D 空间中的视差效果
- [ ] 鼠标视差 - 鼠标移动触发的视差
- [ ] 倾斜视差 - 设备倾斜感应
- [ ] 视差卡片 - 卡片层叠效果

### 3. 滚动动画 (Scroll Animations)

- [x] 滚动触发动画 - 元素进入视口时触发
- [x] 进度条动画 - 基于滚动进度的动画
- [x] 滚动进度指示器 - 页面滚动进度
- [ ] 滚动路径动画 - 沿路径移动的动画
- [ ] 滚动变形 - 元素形状变化

### 4. 3D 效果 (3D Effects)

- [ ] 3D 卡片翻转 - 鼠标悬停翻转效果
- [ ] 3D 场景导航 - 3D 空间中的导航
- [ ] 3D 产品展示 - 产品 360 度展示
- [ ] 3D 文字效果 - 立体文字动画
- [ ] 3D 粒子系统 - 3D 空间中的粒子

### 5. 交互动画 (Interactive Animations)

- [x] 导航链接动画 - 悬停和点击效果
- [ ] 按钮动画 - 各种按钮交互效果
- [ ] 表单动画 - 输入框和表单动画
- [ ] 加载动画 - 页面和组件加载
- [ ] 过渡动画 - 页面间过渡效果

### 6. 特殊效果 (Special Effects)

- [x] 彩虹效果 - 颜色渐变动画
- [ ] 玻璃拟态 - 毛玻璃效果
- [ ] 霓虹效果 - 发光文字和边框
- [ ] 故障效果 - 数字故障艺术
- [ ] 全息效果 - 3D 全息投影

## 🚀 快速开始

### 安装依赖

```bash
yarn install
```

### 开发模式

```bash
yarn dev
```

### 构建生产版本

```bash
yarn build
```

## 📁 项目结构

```
animate-student/
├── app/
│   ├── modules/
│   │   ├── Demos/           # 特效案例
│   │   │   ├── AirPods/     # 滚动图片切换
│   │   │   ├── NavLink/     # 导航链接动画
│   │   │   ├── Parallax/    # 视差效果
│   │   │   ├── SlideCards/  # 滑动卡片
│   │   │   └── Basic/       # 基础动画
│   │   ├── Rainbow/         # 彩虹效果
│   │   ├── Scroll/          # 滚动动画
│   │   └── ThreeDemos/      # Three.js 案例
│   ├── hooks/               # 自定义钩子
│   └── globals.css          # 全局样式
├── public/                  # 静态资源
└── README.md               # 项目文档
```

## 🎨 案例展示

### 已实现的案例

1. **NavLink** - 导航链接悬停动画
2. **Parallax** - 基础视差滚动效果
3. **AirPods** - 滚动触发的图片切换
4. **SlideCards** - 滑动卡片效果
5. **Rainbow** - 彩虹渐变动画
6. **Scroll** - 滚动进度动画

### 计划实现的案例

- [ ] 物理弹球效果
- [ ] 3D 产品展示
- [ ] 粒子爆炸效果
- [ ] 流体动画
- [ ] 全息投影效果

## 📖 学习资源

### GSAP 学习

- [GSAP 官方文档](https://greensock.com/docs/)
- [GSAP 时间轴教程](https://greensock.com/docs/v3/GSAP/Timeline)
- [GSAP ScrollTrigger 插件](https://greensock.com/docs/v3/Plugins/ScrollTrigger)

### Three.js 学习

- [Three.js 官方文档](https://threejs.org/docs/)
- [React Three Fiber 文档](https://docs.pmnd.rs/react-three-fiber/)
- [Three.js 示例](https://threejs.org/examples/)

### 物理引擎学习

- [Matter.js 文档](https://brm.io/matter-js/)
- [Cannon.js 文档](https://schteppe.github.io/cannon.js/)

## 🤝 贡献指南

欢迎提交新的特效案例！请遵循以下步骤：

1. Fork 本项目
2. 创建新的特性分支
3. 在 `app/modules/Demos/` 下创建新的案例文件夹
4. 实现特效并添加文档
5. 提交 Pull Request

## 📄 许可证

MIT License

## 🔗 相关链接

- [项目演示](https://your-demo-url.com)
- [问题反馈](https://github.com/your-username/animate-student/issues)
- [讨论区](https://github.com/your-username/animate-student/discussions)
