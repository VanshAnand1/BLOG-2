"use client";
import { useState, useEffect } from "react";

const MobileScreenCutoffValue = 1000;

export default function IsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () =>
      setIsMobile(window.innerWidth <= MobileScreenCutoffValue);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isMobile;
}
