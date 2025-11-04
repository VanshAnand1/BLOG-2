"use client";
import { MobileProps, MobileScreenCutoffValue } from "@/lib/helpers/isMobile";

export default function Test(props: MobileProps) {
  if (props.isMobile(MobileScreenCutoffValue)) {
    return <div>On Mobile</div>;
  }
  return <div>Not on Mobile</div>;
}
