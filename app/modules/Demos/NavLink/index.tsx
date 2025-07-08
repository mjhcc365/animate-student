import gsap from "gsap";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";
import { useGSAP } from "@gsap/react";

import "./index.css";
// 滚动效果
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const NavLink = () => {
  const demoRef = useRef(null);

  useGSAP(
    () => {
      // 给line-1添加动画
      gsap.from(".line-1", {
        scrollTrigger: {
          trigger: ".line-1", // 触发时机，当.line-1 元素进入视口时触发动画
          scrub: true, // 使动画与滚动条的滚动位置同步，用户滚动时动画会相应地进行。
          start: "top bottom", // .line-1 的top 到达 viewport的bottom
          end: "top top", // .line-1 的top 到达 viewport 的top
        },
        scaleX: 0, //
        transformOrigin: "left center",
        ease: "none",
      });

      // --- ORANGE PANEL ---
      gsap.from(".line-2", {
        scrollTrigger: {
          trigger: ".orange",
          scrub: true,
          pin: true, // orange会被“固定”在视口中。
          start: "top top",
          end: "+=100%", // += 相对位置 ，100% 是指当前viewport的高度。
          // 实际上就是额外增加了一个dom，高度是 viewport的高度
        },
        scaleX: 0,
        transformOrigin: "left center",
        ease: "none",
      });

      // --- PURPLE/GREEN PANEL ---
      var tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".purple",
          scrub: true,
          pin: true,
          start: "top top",
          end: "+=100%",
        },
      });

      tl.from(".purple p", {
        scale: 0.3,
        rotation: 45,
        autoAlpha: 0,
        ease: "power2",
      })
        .from(
          ".line-3",
          { scaleX: 0, transformOrigin: "left center", ease: "none" },
          0
        )
        .to(".purple", { backgroundColor: "#00bae2" }, 0);
    },
    { scope: demoRef }
  );
  return (
    <div ref={demoRef}>
      <div className="border h-200">border-200</div>
      <div id="one" className="description panel blue">
        <div>
          <h1>Navigation links with smooth scrolling</h1>
          <p>
            ScrollTrigger works great with navigation links within the page! Try
            clicking one of the links above and see how ScrollTrigger stays
            perfectly synced.
          </p>
          <div className="scroll-down">
            Scroll down<div className="arrow"></div>
          </div>
        </div>
      </div>
      <section id="two" className="panel red bg-red">
        <span className="bg-red line line-1"></span>
        <p>
          This line's animation will begin when it enters the viewport and
          finish when its top edge hits the top of the viewport, staying
          perfectly in sync with the scrollbar because it has{" "}
          <code>scrub:&nbsp;true</code>
        </p>
      </section>
      <section id="three" className="panel bg-pink-light orange">
        <span className="line line-2"></span>
        <p>
          This orange panel gets pinned when its top edge hits the top of the
          viewport, then the line's animation is linked with the scroll position
          until it has traveled 100% of the viewport's height (
          <code>end: "+=100%"</code>), then the orange panel is unpinned and
          normal scrolling resumes. Padding is added automatically to push the
          rest of the content down so that it catches up with the scroll when it
          unpins. You can set <code>pinSpacing: false</code> to prevent that if
          you prefer.
        </p>
      </section>

      <section id="four" className="panel purple simple">
        <span className="line line-3"></span>
        <p>
          This panel gets pinned in a similar way, and has a more involved
          animation that's wrapped in a timeline, fading the background color
          and animating the transforms of the paragraph in addition to the line,
          all synced with the scroll position perfectly.
        </p>
      </section>

      <section id="five" className="panel gray">
        <p>DONE!</p>
      </section>

      <div
        className="border"
        style={{
          height: 400,
        }}
      ></div>
      <nav>
        {["one", "two", "three", "four", "five"].map((keyWord) => {
          return (
            <div onClick={() => {}} key={keyWord}>
              <a href={`#${keyWord}`}>{`Section${keyWord}`}</a>
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export default NavLink;
