"use client";

import NavLink from "./modules/Demos/NavLink";
import Parallax from "./modules/Demos/Parallax";
import AirPods from "./modules/Demos/AirPods";

export default function Home() {
  return (
    <div>
      {/* 动画1 - 错位动画 实现DNA双螺旋结构 */}
      {/* <div></div> */}
      {/* 动画2 - 错位动画 实现毛毛虫效果 */}
      {/* <div></div> */}
      {/* 动画3 - 锚点链接 - 仿codepen  */}
      {/* <NavLink /> */}
      {/* 动画4 - 视差效果 - 滚动，对不同dom 设置不同的动画，形成视差效果 */}
      {/* <Parallax /> */}
      {/* 动画5 - 根据滚动 - 改变Image */}
      <AirPods />
    </div>
  );
}
