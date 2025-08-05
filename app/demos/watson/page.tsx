"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

import "./fonts.css";
import "./animations.css";
import "./page.css";

const Watson = () => {
  const descriptionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const bottomSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 创建主时间线
    const mainTl = gsap.timeline();

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

      // 标题字母逐个出现动画
      mainTl.to(titleLetters, {
        opacity: 1,
        y: 0,
        rotationX: 0,
        scale: 1,
        duration: 0.06,
        stagger: 0.1,
        ease: "back.out(1.7)",
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

      // 为每个文字元素添加动画
      mainTl.to(
        textElements,
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.3,
          stagger: 0.05,
          ease: "power3.out",
        },
        "-=0.5"
      );

      // 为下划线元素添加特殊动画
      mainTl.to(
        underlineElements,
        {
          "--underline-scale": 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
        },
        "-=0.3"
      );

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
        // 将emoji动画添加到主时间线
        mainTl.add(emojiTl, "-=0.3");
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
        mainTl.add(iconTl, "-=0.3");
      }
    }
    // Call to Action 动画 - 使用同一个 timeline
    // if (ctaRef.current) {
    //   const ctaLink = ctaRef.current.querySelector("a");

    //   if (ctaLink) {
    //     // 设置初始状态
    //     gsap.set(ctaLink, {
    //       opacity: 0,
    //       y: 30,
    //       scale: 0.9,
    //     });

    //     // CTA链接动画 - 添加到主时间线
    //     mainTl.to(
    //       ctaLink,
    //       {
    //         opacity: 1,
    //         y: 0,
    //         scale: 1,
    //         duration: 1,
    //         ease: "back.out(1.7)",
    //       },
    //       "-=0.5"
    //     );
    //   }
    // }

    // Bottom Section 动画 - 使用同一个 timeline
    if (bottomSectionRef.current) {
      const leftColumn = bottomSectionRef.current.querySelector("#left-column");
      const leftContent = leftColumn?.querySelectorAll(".line-animate");

      if (leftContent && leftContent.length > 0) {
        // 设置初始状态
        gsap.set(leftContent, {
          opacity: 0,
          y: 40,
          rotationX: 20,
        });
        // 创建独立的时间线
        const leftContentTl = gsap.timeline();
        // 左列内容动画
        leftContentTl.to(leftContent, {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 1.5,
          stagger: 0.08,
          ease: "power3.out",
        });
      }
    }

    // 清理函数
    return () => {
      mainTl.kill();
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
        <div ref={ctaRef} className="text-center mb-16">
          <a href="#" className="text-xl font-watson-medium md:text-2xl">
            More (About) Us →
          </a>
        </div>

        {/* Bottom Section - Two Columns */}
        <div
          ref={bottomSectionRef}
          className="grid grid-flow-col bottom-section gap-4 items-start"
        >
          {/* Left Column - Recent Content */}
          <div id="left-column" className="font-watson-medium">
            <div className="line-animate">
              <h2 className="text-sm font-watson-bold mb-6">(Recently)</h2>
            </div>
            <div>
              <div className="text-lg leading-tight mb-4">
                <div className="line-animate">We're searching for an </div>
                <div className="line-animate">
                  accomplished Art Director and{" "}
                </div>
                <div className="line-animate">
                  Motion designer.
                  <a href="#" className="underline ml-2">
                    Learn more →
                  </a>
                </div>
              </div>
              <div className="text-lg leading-tight break-all">
                <div className="line-animate">Recent campaigns include Jam</div>
                <div className="line-animate">
                  es Gunn & WB's "Superman", A2
                </div>
                <div className="line-animate">
                  4's "Eddington", and Tom Cruis
                </div>
                <div className="line-animate">
                  e's "Mission Impossible, The Fin
                </div>
                <div className="line-animate">al Reckoning."</div>
              </div>
            </div>
            <div className="mt-16 pt-4 leading-tight border-gray-800 font-watson-caption ">
              <div className="foot-small-font space-y-4 font-watson-medium ">
                <div className="line-animate">(CONTACT)</div>
                <div>
                  <div className="line-animate">NEW BUSINESS:</div>
                  <div className="line-animate">NEWBUSINESS@WATSONDG.COM</div>
                </div>
                <div>
                  <div className="line-animate">ADDRESS </div>
                  <div className="line-animate">
                    5900 WILSHIRE BLVD, STE. 2050
                  </div>
                  <div className="line-animate">LOS ANGELES, CA 90036</div>
                </div>
                <div>
                  <div className="line-animate">PHONE:</div>
                  <div className="line-animate">+1 323 465 9225</div>
                </div>
              </div>
            </div>
          </div>
          {/* Right Column - Location and Image */}
          <div className="relative h-full flex-col items-end">
            <div className="text-sm font-watson-bold mb-6">LA + London</div>
            {/* Placeholder for the photograph */}
            <div className="absolute bottom-0 right-0 w-full h-44 bg-gray-800 rounded-lg flex items-center justify-center">
              <span className="text-gray-400 text-sm">
                Photo: Three women with magazines
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Watson;
