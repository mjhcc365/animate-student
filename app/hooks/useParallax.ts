import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// 注册插件（只注册一次）
gsap.registerPlugin(ScrollTrigger);

export interface UseParallaxOptions {
  selector?: string; // 选择器，默认查找 data-speed
  scrollTrigger?: gsap.DOMTarget | gsap.plugins.ScrollTriggerInstanceVars;
}

/**
 * 通用视差滚动 hook
 * @param ref 容器ref
 * @param options 可选配置
 */
export function useParallax(
  ref: React.RefObject<HTMLElement>,
  options: UseParallaxOptions = {}
) {
  const { selector = "[data-speed]", scrollTrigger = {} } = options;

  useGSAP(
    () => {
      gsap.to(selector, {
        y: (i, el) => {
          const speed = parseFloat(el.getAttribute("data-speed") || "0");
          return (1 - speed) * ScrollTrigger.maxScroll(window);
        },
        scrollTrigger: {
          start: 0,
          end: "max",
          invalidateOnRefresh: true,
          scrub: 0,
          ...scrollTrigger,
        },
      });
    },
    { scope: ref }
  );
}
