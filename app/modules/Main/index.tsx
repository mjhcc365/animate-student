import { ReactLenis, useLenis } from "lenis/react";
import gsap from "gsap";
import { useEffect } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
// import { ScrollSmoother } from "gsap/dist/ScrollSmoother";

import { useStore } from "@/app/hooks/useStore";

gsap.registerPlugin(ScrollTrigger);
// gsap.registerPlugin(ScrollSmoother);
ScrollTrigger.defaults({ markers: true });

let smoother = ScrollSmoother.create({
  smooth: 2,
  effects: true,
  normalizeScroll: true,
});

function App() {
  const lenis = useLenis();
  const [setLenis] = useStore((state: any) => [state.setLenis]);

  useEffect(() => {
    if (lenis) {
      setLenis(lenis);
      ScrollTrigger.refresh();
      lenis?.start();
    }
    return () => {
      lenis?.destroy();
      setLenis(null);
    };
  }, [lenis, setLenis]);

  return (
    <ReactLenis root>
      <div style={{ height: 1200 }}>11</div>
    </ReactLenis>
  );
}

export default App;
