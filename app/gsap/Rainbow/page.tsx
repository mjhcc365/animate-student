"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { createNoise2D } from "simplex-noise";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import "./index.css";

gsap.registerPlugin(ScrollTrigger);

const CIRCLE_NUM = 5000;

const Rainbow = () => {
  const demoRef = useRef(null);

  useGSAP(() => {
    // 只查找 demoRef 范围内的 .circle，避免全局查找
    const circles = gsap.utils.toArray<HTMLElement>(".circle", demoRef.current);
    const simplex = createNoise2D();

    const main = gsap.timeline({
      scrollTrigger: {
        trigger: demoRef.current,
        scrub: 0.7,
        start: "top 25%",
        end: "bottom bottom",
      },
    });

    circles.forEach((circle, i) => {
      const n1 = simplex(i * 0.003, i * 0.0033);
      const n2 = simplex(i * 0.002, i * 0.001);
      main.to(circle, {
        opacity: 1,
        // 可选：让每个圆有轻微缩放和随机延迟，效果更自然
        scaleX: 3 + n1 * 2,
        scaleY: 3 + n2 * 2,
        translateX: n2,
        rotate: n2 * 270,
        boxShadow: `0 0 0 .2px hsla(${Math.floor(i * 0.3)}, 70%, 70%, .6)`,
      }); // 同步推进
    });

    // 返回 timeline 便于 useGSAP 自动清理
    return () => main.kill();
  }, [{ scope: demoRef }]);

  return (
    <div ref={demoRef} className="wrapper">
      <div id="content">
        {new Array(CIRCLE_NUM).fill(undefined).map((_, index) => {
          return (
            <div
              key={index}
              data-seed={`circle-${index + 1}`}
              className="circle"
            />
          );
        })}
      </div>
    </div>
  );
};

export default Rainbow;
