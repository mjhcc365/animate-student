"use client";
import Image from "next/image";
import { useRef } from "react";
import { gsap } from "gsap";
import { useScroll } from "../../../hooks/useScroll";
import { useRouter } from "next/navigation";

interface HeaderProps {
  dict: any;
  currentLang: "zh" | "en";
}

const Header = ({ dict, currentLang }: HeaderProps) => {
  const headerRef = useRef<HTMLElement>(null);
  const isEnlarged = useRef(false);
  const router = useRouter();

  const handleScroll = (e: any) => {
    const scrollY = e.scroll;
    const shouldEnlarge = scrollY < 100;

    // 当滚动位置小于100且当前未放大时
    if (!shouldEnlarge && !isEnlarged.current) {
      gsap.to(headerRef.current, {
        scale: 1.1,
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

  // 语言切换函数
  const switchLanguage = (newLang: "zh" | "en") => {
    const currentPath = window.location.pathname;
    const newPath = currentPath.replace(`/${currentLang}`, `/${newLang}`);
    router.push(newPath);
  };

  useScroll(handleScroll);

  return (
    <header
      ref={headerRef}
      className="border-b border-stone-800 bg-stone-900/80 backdrop-blur-sm sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex w-full h-auto py-4 gap-4">
          <div className="flex w-full justify-between items-center space-x-3">
            <Image
              src="/logo.svg"
              alt={dict?.common?.logoAlt || "Animate Student Logo"}
              width={32}
              height={32}
              className="h-8 w-auto"
            />
            <div className="flex items-center space-x-4">
              <span className="text-xs text-stone-400 bg-stone-800 px-2 py-1 rounded-full">
                {dict?.common?.siteTitle || "网站特效案例库"}
              </span>

              {/* 语言切换按钮 */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => switchLanguage("zh")}
                  className={`text-xs px-2 py-1 rounded ${
                    currentLang === "zh"
                      ? "bg-blue-600 text-white"
                      : "bg-stone-700 text-stone-300 hover:bg-stone-600"
                  } transition-colors`}
                >
                  中文
                </button>
                <button
                  onClick={() => switchLanguage("en")}
                  className={`text-xs px-2 py-1 rounded ${
                    currentLang === "en"
                      ? "bg-blue-600 text-white"
                      : "bg-stone-700 text-stone-300 hover:bg-stone-600"
                  } transition-colors`}
                >
                  English
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
