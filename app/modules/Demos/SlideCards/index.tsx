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

const SlideCards = () => {
  return (
    <div className="gallery">
      <ul className="cards">
        {new Array(DOM_NUM).fill("").map((_, index) => {
          return <li key={index}>{index}</li>;
        })}
      </ul>
    </div>
  );
};

export default SlideCards;
