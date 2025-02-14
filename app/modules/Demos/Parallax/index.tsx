import gsap from "gsap";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";
import { useGSAP } from "@gsap/react";

import "./index.css";
// 滚动效果
gsap.registerPlugin(ScrollTrigger);

const Parallax = () => {
  const demoRef = useRef(null);

  useGSAP(
    () => {
      // Q1 如何获取data-speed
      // Q2 ScrollTrigger.maxScroll(window)
      gsap.to("[data-speed]", {
        // y = s * h
        // 速度s : data-speed
        // 距离h : 能够滚动的最大的高度
        y: (i, el) =>
          (1 - parseFloat(el.getAttribute("data-speed"))) *
          ScrollTrigger.maxScroll(window),
        scrollTrigger: {
          start: 0, // 滚动触发的起始位置，0 表示页面顶部
          end: "max", // 滚动触发的结束位置，"max" 表示页面的最大滚动高度
          invalidateOnRefresh: true, // 在窗口刷新时，是否使 ScrollTrigger 失效并重新计算
          scrub: 0, // 设置为 0 表示没有延迟，动画会立即与滚动同步
        },
      });
    },
    { scope: demoRef }
  );
  return (
    <div ref={demoRef} className="box-container">
      <div className="box green" data-speed="0.25">
        0.25
      </div>
      <div className="box purple" data-speed="0.4">
        0.4
      </div>
      <div className="box orange" data-speed="0">
        0
      </div>
      <div className="box red" data-speed="1">
        1
      </div>
      <div className="box blue" data-speed="0.75">
        0.75
      </div>
    </div>
  );
};

export default Parallax;
