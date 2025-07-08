import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useEffect } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import "./index.css";

gsap.registerPlugin(ScrollTrigger);

const Scroll = () => {
  const demoRef = useRef(null);

  useGSAP(() => {
    // gsap.to(".box", {
    //   scrollTrigger: {
    //     trigger: ".box", // 以 .box 为触发点
    //     start: "top 80%", // .box 顶部到视口 80% 处时开始
    //     end: "top 30%", // .box 顶部到视口 30% 处时结束
    //     // scrub: true, // 滚动进度和动画进度同步
    //     markers: true, // 显示触发点辅助线（开发时用）
    //   },
    //   x: 400, // 向右移动 400px
    //   rotation: 360, // 旋转一圈
    //   backgroundColor: "#1890ff", // 变色
    //   duration: 2,
    // });
    ScrollTrigger.create({
      trigger: ".box",
      start: "top 80%",
      end: "top 30%",
      markers: true,
      onEnter: () => console.log("进入视口"),
      onLeave: () => console.log("离开视口"),
      onUpdate: (self) => console.log("滚动进度", self.progress),
    });
  }, []);

  return (
    <div ref={demoRef} className="container">
      <div className="spacer">滚动下去</div>
      <div className="box">我是动画盒子</div>
      <div className="spacer">继续滚动</div>
    </div>
  );
};

export default Scroll;
