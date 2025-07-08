"use client";

import NavLink from "./modules/Demos/NavLink";
import Parallax from "./modules/Demos/Parallax";
import AirPods from "./modules/Demos/AirPods";
import SlideCards from "./modules/Demos/SlideCards";
import Baisc from "./modules/Demos/Baisc";
import Rainbow from "./modules/Rainbow";
import Scoll from "./modules/Scroll";
// import ThreeDemo from "./modules/ThreeDemos/index";

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
      {/* <AirPods /> */}
      {/*  */}
      {/* 动画6 - 根据滚动 - 实现跑马灯效果  */}
      {/* <SlideCards /> */}
      {/* react - threejs  */}
      {/* <ThreeDemo /> */}

      {/* 测试可以改变的属性  & 已经如何设置*/}
      {/* <Baisc /> */}
      {/* 动画7 - 根据滚动 - 实现彩虹效果 */}
      <Rainbow />
      {/* <Scoll /> */}
    </div>
  );
}
