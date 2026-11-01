"use client";

import ClipCornersButton from "@/components/smoothui/clip-corners-button";

const ClipCornersButtonDemo = () => (
  <div className="flex w-full flex-col items-center justify-center p-8">
    <ClipCornersButton onClick={() => console.log("Button clicked!")}>
      Click Me
    </ClipCornersButton>
  </div>
);

export default ClipCornersButtonDemo;
