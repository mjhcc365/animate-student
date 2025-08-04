"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import { useStore } from "../hooks/useStore";

export default function ClientWrapper() {
  const setLenis = useStore((state: any) => state.setLenis);

  useEffect(() => {
    // 确保在客户端运行
    if (typeof window === "undefined") return;

    // 初始化 Lenis
    const lenis = new Lenis({
      autoRaf: true,
    });

    // 将 lenis 实例存储到 store 中
    setLenis(lenis);

    return () => {
      lenis.destroy();
    };
  }, [setLenis]);

  return null; // 这个组件不渲染任何内容
} 