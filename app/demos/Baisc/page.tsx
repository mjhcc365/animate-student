"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef } from "react";

/** 测试基础的变化属性 */
const Baisc = () => {
  const demoRef = useRef(null);

  useGSAP(() => {
    gsap.to(".bg-red", {
      backgroundColor: "blue",
      color: "white", // 字体颜色
      x: 100,
      y: 100,
      //   width: 200, // 宽度
      //   height: 100, // 高度
      //   borderRadius: "50%", // 圆角
      //   boxShadow: "0 0 20px #000", // 阴影
      //   skewX: 30, // X轴倾斜
      //   skewY: 10, // Y轴倾斜
      //   rotation: 360, // 旋转
      //   opacity: 0.5, // 透明度
      //   scale: 1.2, // 缩放
      //   filter: "blur(2px)", // 模糊
      duration: 2,
      repeat: -1,
      yoyo: true,
      //   yoyoEase: "power2.inOut",
      //   delay: 0.5, // 延迟
      //   ease: "elastic.out(1, 0.3)", // 缓动
    });
  }, [{ scope: demoRef }]);
  return (
    <div ref={demoRef}>
      <div className="w-100 h-100 bg-red">Baisc dom </div>
    </div>
  );
};

export default Baisc;
