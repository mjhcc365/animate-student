const currentFrame = (index: number) =>
  `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${(
    index + 1
  )
    .toString()
    .padStart(4, "0")}.jpg`;

import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 40;

const getAllFramesImages = (frameCount: number) => {
  const promises = new Array(frameCount).fill("").map((_, index) => {
    return new Promise<HTMLImageElement>((resolve) => {
      const img = new Image();
      img.src = currentFrame(index);
      img.onload = () => resolve(img);
    });
  });

  return Promise.all(promises);
};

const NavLink = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [frameIndex, setFrameIndex] = useState(0);
  const [allImages, setAllImages] = useState<HTMLImageElement[]>([]);

  useEffect(() => {
    getAllFramesImages(FRAME_COUNT).then(setAllImages);
  }, []);

  const renderImage = useCallback(
    (index: number) => {
      console.log("===>allImages", index, allImages);
      const canvas: any = canvasRef.current;
      const context = canvas?.getContext("2d");
      context.clearRect(0, 0, canvas.width, canvas.height);
      if (allImages[index]) {
        context.drawImage(allImages[index], 0, 0, canvas.width, canvas.height);
      }
    },
    [allImages]
  );

  useGSAP(
    () => {
      gsap.to(
        { frame: 0 },
        {
          frame: FRAME_COUNT - 1,
          snap: "frame",
          ease: "none",
          scrollTrigger: {
            scrub: 10,
            onUpdate: (self) => {
              requestAnimationFrame(() => {
                renderImage(frameIndex);
                if (self) {
                  const direction = self.direction;
                  setFrameIndex((pre) => {
                    const newIndex = pre + (direction > 0 ? 1 : -1);
                    return Math.max(0, Math.min(newIndex, FRAME_COUNT - 1));
                  });
                }
              });
            },
          },
        }
      );
    },
    { scope: canvasRef, dependencies: [frameIndex, allImages] }
  );

  useEffect(() => {
    if (canvasRef.current && allImages.length > 0) {
      renderImage(0);
    }
  }, [allImages, renderImage]);

  return (
    <>
      <canvas ref={canvasRef} id="hero-lightpass" width={1158} height={770} />
    </>
  );
};

export default NavLink;
