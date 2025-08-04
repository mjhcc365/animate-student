import Image from "next/image";
import { useRef } from "react";
import { gsap } from "gsap";
import { useScroll } from "../../hooks/useScroll";

const Header = () => {
  const headerRef = useRef<HTMLElement>(null);
  const isEnlarged = useRef(false);

  const handleScroll = (e: any) => {
    const scrollY = e.scroll;
    const shouldEnlarge = scrollY < 100;

    // 当滚动位置小于100且当前未放大时
    if (!shouldEnlarge && !isEnlarged.current) {
      gsap.to(headerRef.current, {
        scale: 1.3,
        duration: 1,
        ease: "power2.out",
        transformOrigin: "center center",
      });
      isEnlarged.current = true;
    }
    // 当滚动位置大于等于100且当前已放大时
    else if (shouldEnlarge && isEnlarged.current) {
      gsap.to(headerRef.current, {
        scale: 1,
        duration: 1,
        ease: "power2.out",
      });
      isEnlarged.current = false;
    }
  };

  useScroll(handleScroll);

  return (
    <header
      ref={headerRef}
      className="border-b border-stone-800 bg-stone-900/80 backdrop-blur-sm sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex w-full  h-auto py-4 gap-4">
          <div className="flex w-full justify-between items-center space-x-3">
            <Image
              src="/logo.svg"
              alt="Animate Student Logo"
              width={32}
              height={32}
              className="h-8 w-auto"
            />
            <span className="text-xs text-stone-400 bg-stone-800 px-2 py-1 rounded-full">
              网站特效案例库
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
