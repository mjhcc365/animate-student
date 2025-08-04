"use client";

import { useStore } from "./useStore";
import { useEffect } from "react";

export function useScroll(callback: any) {
  const lenis = useStore(({ lenis }: any) => lenis);

  useEffect(() => {
    if (!lenis) return;
    lenis.on("scroll", callback);
    lenis.emit();

    return () => {
      lenis.off("scroll", callback);
    };
  }, [lenis, callback]);
}
