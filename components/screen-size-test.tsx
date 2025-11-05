"use client";
import { ScreenSize } from "@/lib/helpers/screenSize";

export default function Test() {
  const screenSize = ScreenSize();
  switch (screenSize) {
    case "small":
      return <div>small screen size</div>;
    case "medium":
      return <div>medium screen size</div>;
    case "large":
      return <div>large screen size</div>;
  }
}
