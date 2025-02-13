import { ReactLenis, useLenis } from "lenis/react";
import gsap from "gsap";
import { useEffect } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import { useStore } from "@/app/hooks/useStore";

import "./index.css";

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.defaults({ markers: true });

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
