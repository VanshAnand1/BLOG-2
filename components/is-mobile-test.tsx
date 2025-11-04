"use client";
import { MobileProps } from "@/lib/helpers/isMobile";

export default function Test(props: MobileProps) {
  return (
    <div>
      {props.isMobile() ? (
        <div className="bg-gray-400 text-white">I am on mobile</div>
      ) : (
        <div className="bg-sunset text-navy">I am NOT on mobile</div>
      )}
    </div>
  );
}
