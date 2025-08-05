"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./fonts.css";
import "./animations.css";
import "./page.css";

// 注册ScrollTrigger插件
gsap.registerPlugin(ScrollTrigger);

const Watson = () => {
  const descriptionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // 标题动画
    if (titleRef.current) {
      const titleLetters = titleRef.current.querySelectorAll("span");

      // 设置标题字母初始状态
      gsap.set(titleLetters, {
        opacity: 0,
        y: 100,
        rotationX: -90,
        scale: 0.5,
      });

      // 创建标题动画时间线
      const titleTl = gsap.timeline({
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      // 标题字母逐个出现动画
      titleTl.to(titleLetters, {
        opacity: 1,
        y: 0,
        rotationX: 0,
        scale: 1,
        duration: 1.2,
        stagger: 0.1,
        ease: "back.out(1.7)",
      });

      // 为每个字母添加悬停动画
      titleLetters.forEach((letter) => {
        letter.addEventListener("mouseenter", () => {
          gsap.to(letter, {
            scale: 1.2,
            rotationY: 15,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        letter.addEventListener("mouseleave", () => {
          gsap.to(letter, {
            scale: 1,
            rotationY: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });
    }

    if (descriptionRef.current) {
      // 获取所有文字元素
      const textElements =
        descriptionRef.current.querySelectorAll("span, sup, div");
      const underlineElements =
        descriptionRef.current.querySelectorAll(".text-underline");

      // 设置初始状态
      gsap.set(textElements, {
        opacity: 0,
        y: 40,
        rotationX: 20,
      });

      // 设置下划线初始状态
      gsap.set(underlineElements, {
        "--underline-scale": 0,
      });

      // 创建动画时间线
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: descriptionRef.current,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none reverse",
        },
      });

      // 为每个文字元素添加动画
      tl.to(textElements, {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 1.5,
        stagger: 0.08,
        ease: "power3.out",
      });

      // 为下划线元素添加特殊动画
      tl.to(
        underlineElements,
        {
          "--underline-scale": 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
        },
        "-=0.3"
      ); // 稍微提前开始下划线动画

      // 为表情符号添加交替出现动画
      const emojiContainer =
        descriptionRef.current.querySelector(".emoji-container");
      if (emojiContainer) {
        const emojis = emojiContainer.querySelectorAll(".emoji");

        // 设置初始状态 - 确保所有emoji都是隐藏的
        gsap.set(emojis, {
          opacity: 0,
          scale: 0.5,
          rotation: -10,
          immediateRender: true,
        });

        // 创建emoji交替出现的时间线
        const emojiTl = gsap.timeline({
          repeat: -1,
          repeatDelay: 0.5,
        });

        // 第一个emoji循环
        emojiTl
          .to(emojis[2], {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.4,
            ease: "back.out(1.7)",
          })
          .to(
            emojis[2],
            {
              opacity: 0,
              scale: 0.5,
              rotation: -10,
              duration: 0.3,
              ease: "power2.in",
            },
            "+=0.8"
          )
          // 第二个emoji循环
          .to(
            emojis[1],
            {
              opacity: 1,
              scale: 1,
              rotation: 0,
              duration: 0.4,
              ease: "back.out(1.7)",
            },
            "+=1"
          )
          .to(
            emojis[1],
            {
              opacity: 0,
              scale: 0.5,
              rotation: -10,
              duration: 0.3,
              ease: "power2.in",
            },
            "+=1"
          )
          // 第三个emoji循环
          .to(emojis[0], {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.4,
            ease: "back.out(1.7)",
          })
          .to(
            emojis[0],
            {
              opacity: 0,
              scale: 0.5,
              rotation: -10,
              duration: 0.3,
              ease: "power2.in",
            },
            "+=1"
          );
        // 将emoji动画添加到主时间线;
        tl.add(emojiTl, "-=0.3");
      }

      // 为图标容器添加交替出现动画
      const iconContainer =
        descriptionRef.current.querySelector(".icon-container");
      if (iconContainer) {
        const icons = iconContainer.querySelectorAll(".icon-item");

        // 设置初始状态 - 确保所有图标都是隐藏的
        gsap.set(icons, {
          opacity: 0,
          scale: 0.5,
          rotation: -10,
          immediateRender: true,
        });

        // 创建图标交替出现的时间线
        const iconTl = gsap.timeline({
          repeat: -1,
          repeatDelay: 0.5,
        });

        // 第一个图标循环
        iconTl
          .to(icons[2], {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.4,
            ease: "back.out(1.7)",
          })
          .to(
            icons[2],
            {
              opacity: 0,
              scale: 0.5,
              rotation: -10,
              duration: 0.3,
              ease: "power2.in",
            },
            "+=0.8"
          )
          // 第二个图标循环
          .to(
            icons[1],
            {
              opacity: 1,
              scale: 1,
              rotation: 0,
              duration: 0.4,
              ease: "back.out(1.7)",
            },
            "+=1"
          )
          .to(
            icons[1],
            {
              opacity: 0,
              scale: 0.5,
              rotation: -10,
              duration: 0.3,
              ease: "power2.in",
            },
            "+=1"
          )
          // 第三个图标循环
          .to(icons[0], {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.4,
            ease: "back.out(1.7)",
          })
          .to(
            icons[0],
            {
              opacity: 0,
              scale: 0.5,
              rotation: -10,
              duration: 0.3,
              ease: "power2.in",
            },
            "+=1"
          );
        // 将图标动画添加到主时间线
        tl.add(iconTl, "-=0.3");
      }
    }

    // 清理函数
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

      // 清理标题字母的事件监听器
      if (titleRef.current) {
        const titleLetters = titleRef.current.querySelectorAll("span");
        titleLetters.forEach((letter) => {
          letter.removeEventListener("mouseenter", () => {});
          letter.removeEventListener("mouseleave", () => {});
        });
      }
    };
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden font-watson-regular">
      {/* Main Content Container */}
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Navigation Keywords */}
        <div className="text-sm text-black bg-white px-4 py-2 rounded-lg inline-block mb-8 compact-text">
          <span>(1) Partnerships, (2) Capabilities, (3) Conversations</span>
        </div>

        {/* Main Title */}
        <h1
          ref={titleRef}
          className="text-9xl text-center md:text-9xl font-watson-caption  title-letters"
        >
          <span className="p-1">W</span>
          <span className="p-1">A</span>
          <span className="p-1">T</span>
          <span className="p-1">S</span>
          <span className="p-1">O</span>
          <span className="p-1">N</span>
        </h1>

        {/* Main Description */}
        <div
          ref={descriptionRef}
          className="text-center text-4xl font-watson-bold  md:text-2xl leading-tight mb-6 max-w-4xl font-watson-medium "
        >
          <div>
            <span className="font-watson-regular">(Los Angeles)</span> is a
          </div>
          <div>
            <span className="text-underline">brand &</span>
          </div>
          <div>
            <span className="text-underline">entertainment</span>
            <sup className="text-sm">(1)</sup>
          </div>

          <div>
            <span>creative</span>
            <span className="text-4xl emoji-container">
              <span className="emoji emoji-1">😛</span>
              <span className="emoji emoji-2">🤔</span>
              <span className="emoji emoji-3">😎</span>
            </span>
            <span>studio,</span>
          </div>

          <div>
            <span> led by </span>
            <span className="text-underline">craft</span>
            <sup className="text-sm">(2)</sup>
            <span> — </span>
          </div>

          <div>
            <span>in</span>
            <span className="inline-block align-middle mx-2 icon-container">
              <div className="icon-item icon-1 w-6 h-6 bg-black border border-white rounded-sm flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
              <div className="icon-item icon-2 w-6 h-6 bg-blue-500 border border-white rounded-sm flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
              <div className="icon-item icon-3 w-6 h-6 bg-green-500 border border-white rounded-sm flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
            </span>
            <span> search of </span>
          </div>

          <div>
            <span className="text-underline">conversation</span>
            <sup className="text-sm">(3)</sup>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mb-16">
          <a
            href="#"
            className="text-xl font-watson-medium md:text-2xl  hover:no-underline transition-all"
          >
            More (About) Us →
          </a>
        </div>

        {/* Bottom Section - Two Columns */}
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left Column - Recent Content */}
          <div>
            {/* <div>
              <h2 className="text-sm font-watson-bold mb-6">(Recently)</h2>
              <div className="text-sm font-watson-bold mb-6">LA + London</div>
            </div> */}
            <div className="space-y-6">
              <div>
                <p className="text-lg leading-relaxed mb-4">
                  We're searching for an accomplished Art Director and Motion
                  designer.
                  <a href="#" className="underline hover:no-underline ml-2">
                    Learn more →
                  </a>
                </p>
              </div>

              <div>
                <p className="text-lg leading-relaxed">
                  Recent campaigns include James Gunn & WB's "Superman", A24's
                  "Eddington", and Tom Cruise's "Mission Impossible, The Final
                  Reckoning."
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Location and Image */}
          <div className="flex flex-col items-end">
            {/* Placeholder for the photograph */}
            <div className="w-48 h-32 bg-gray-800 rounded-lg flex items-center justify-center">
              <span className="text-gray-400 text-sm">
                Photo: Three women with magazines
              </span>
            </div>
          </div>
        </div>

        {/* Footer Contact Information */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="text-sm space-y-1 font-watson-caption">
            <div>(CONTACT)</div>
            <div>NEW BUSINESS:</div>
            <div className="font-mono">NEWBUSINESS@WATSONDG.COM</div>
            <div>ADDRESS</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Watson;
