"use client";
import { useState, useEffect } from "react";

export const MobileScreenCutoffValue = 800;
export interface MobileProps {
  isMobile: (maxWidth: number) => boolean;
}

export default function IsMobile(maxWidth: number) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= maxWidth);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [maxWidth]);

  return isMobile;
}
