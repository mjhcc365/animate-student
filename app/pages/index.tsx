"use client";
import { demos, threeDemos } from "./config";
import CaseList from "./CaseList";
import Header from "./Header";
import HeroSection from "./HeroSection";
import { useEffect } from "react";
import Lenis from "lenis";
import { useStore } from "../hooks/useStore";

export default function Home() {
  const setLenis = useStore((state: any) => state.setLenis);

  useEffect(() => {
    // 初始化 Lenis
    const lenis = new Lenis({
      autoRaf: true,
    });

    // 监听滚动事件
    lenis.on("scroll", (e: any) => {
      console.log("==》", e.scroll);
    });

    // 将 lenis 实例存储到 store 中
    setLenis(lenis);

    return () => {
      lenis.destroy();
    };
  }, [setLenis]);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <Header />
      {/* Main Content */}
      <main className="mx-5 px-4 py-8">
        {/* Hero Section */}
        <HeroSection />
        {/* <div style={{ height: "300vh" }}>text scroll</div> */}
        <CaseList caseArray={demos.concat(threeDemos)} />
      </main>
    </div>
  );
}
