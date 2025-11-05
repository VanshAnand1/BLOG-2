"use client";
import { useState, useEffect } from "react";

const MediumScreenCutoffValue = 1000;
const SmallScreenCutoffValue = 600;

export function ScreenSize() {
  const [screenSize, setScreenSize] = useState("large");

  useEffect(() => {
    const check = () => {
      if (window.innerWidth <= SmallScreenCutoffValue) {
        setScreenSize("small");
      } else if (window.innerWidth <= MediumScreenCutoffValue) {
        setScreenSize("medium");
      } else {
        setScreenSize("large");
      }
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return screenSize;
}
