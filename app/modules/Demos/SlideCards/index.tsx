import gsap from "gsap";
import { ReactElement, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
// import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";
import { useGSAP } from "@gsap/react";

import "./utils";

const DOM_NUM = 30;
// 滚动效果
gsap.registerPlugin(ScrollTrigger);

import "./index.css";

const spacing = 0.1; // spacing of the cards (stagger)
const snap = gsap.utils.snap(spacing); // 吸附，对齐

const buildSeamlessLoop = (items: ReactElement[], spacing: number) => {
  // 从开始到结束后，快速回到开始的位置
  // 也就是从开始到结束，分成了10次动画
  let overlap = Math.ceil(1 / spacing);
  // 计算在原始序列中开始无缝循环的时间
  let startTime = items.length * spacing + 0.5;
  // 计算循环结束时回到开始时间的位置
  let loopTime = (items.length + overlap) * spacing + 1;

  //  创建一个 GSAP 时间线，用于存放所有的实际动画，初始状态为暂停
  let rawSequence = gsap.timeline({ paused: true });

  let seamlessLoop = gsap.timeline({
    paused: true,
    repeat: -1,
    onRepeat() {
      this._time === this._dur && (this._tTime += this._dur - 0.01);
    },
  });

  let l = items.length + overlap * 2;
  let time = 0;

  gsap.set(items, { xPercent: 400, opacity: 0, scale: 0 });

  new Array(l).fill("").forEach((_, index) => {
    //
    let time = index * spacing;
    rawSequence
      .fromTo(
        items[index],
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          zIndex: 100,
          duration: 0.5,
          yoyo: true,
          repeat: 1,
          ease: "power1.in",
          immediateRender: false,
        },
        time
      )
      .fromTo(
        items[index],
        { xPercent: 400 },
        { xPercent: -400, duration: 1, ease: "none", immediateRender: false },
        time
      );
  });

  // 设置动画时间
  rawSequence.time(startTime);

  seamlessLoop
    .to(rawSequence, {
      time: loopTime,
      duration: loopTime - startTime,
      ease: "none",
    })
    .fromTo(
      rawSequence,
      { time: overlap * spacing + 1 },
      {
        time: startTime,
        duration: startTime - (overlap * spacing + 1),
        immediateRender: false,
        ease: "none",
      }
    );

  return seamlessLoop;
};

const SlideCards = () => {
  const wrapperRef = useRef(null);

  const [tl, setTl] = useState();

  useGSAP(
    () => {
      // const timeline = buildSeamlessLoop(
      //   gsap.utils.toArray(".cards li"),
      //   spacing
      // );
      // const scrub = gsap.to(timeline, {
      //   // we reuse this tween to smoothly scrub the playhead on the seamlessLoop
      //   totalTime: 0,
      //   duration: 0.5,
      //   ease: "power3",
      //   paused: true,
      // });
      // setTl(scrub);
      // gsap.from(timeline, {
      //   scrollTrigger: {
      //     onUpdate(self: any) {
      //       if (self.progress === 1 && self.direction > 0 && !self.wrapping) {
      //         wrapForward(self);
      //       } else if (
      //         self.progress < 1e-5 &&
      //         self.direction < 0 &&
      //         !self?.wrapping
      //       ) {
      //         wrapBackward(self);
      //       } else {
      //         tl.vars.totalTime = snap(
      //           (iteration + self.progress) * seamlessLoop.duration()
      //         );
      //         tl.invalidate().restart(); // to improve performance, we just invalidate and restart the same tween. No need for overwrites or creating a new tween on each update.
      //         self.wrapping = false;
      //       }
      //     },
      //     trigger: wrapperRef.current,
      //     start: 0,
      //     end: "+=3000",
      //     pin: true,
      //   },
      //   // totalTime: 0,
      //   // duration: 0.5,
      //   // ease: "power3",
      //   // paused: true,
      // });
    },
    {
      scope: wrapperRef,
    }
  );

  return (
    <div ref={wrapperRef} className="gallery">
      <ul className="cards">
        {new Array(DOM_NUM).fill("").map((_, index) => {
          return (
            <li className="card" key={index}>
              {index}
            </li>
          );
        })}
      </ul>
      {/* <div className="actions">
        <button className="prev">Prev</button>
        <button className="next">Next</button>
      </div> */}
    </div>
  );
};

export default SlideCards;
