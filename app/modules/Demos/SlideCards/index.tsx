import gsap from "gsap";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
// import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";
import { useGSAP } from "@gsap/react";

const DOM_NUM = 30;

// 滚动效果
gsap.registerPlugin(ScrollTrigger);

import "./index.css";

const SlideCards = () => {
  const wrapperRef = useRef(null);

  useGSAP(
    () => {
      gsap.from(wrapperRef, {
        scrollTrigger: {
          onUpdate: () => {
            console.log("==>");
          },
          trigger: wrapperRef.current,
          start: 0,
          end: "+=3000",
          pin: true,
        },
      });
    },
    {
      scope: wrapperRef,
    }
  );

  return (
    <div ref={wrapperRef} className="gallery">
      <ul className="cards">
        {new Array(DOM_NUM).fill("").map((_, index) => {
          return <li key={index}>{index}</li>;
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
