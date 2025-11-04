"use client";
import IsMobile from "@/lib/helpers/isMobile";

export default function Test() {
  return (
    <div>
      {IsMobile() ? (
        <div className="bg-gray-400 text-white">I am on mobile</div>
      ) : (
        <div className="bg-sunset text-navy">I am NOT on mobile</div>
      )}
    </div>
  );
}
