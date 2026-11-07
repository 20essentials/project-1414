"use client";

import InfiniteSlider from "@/components/smoothui/infinite-slider";

export function InfiniteSliderDemo() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-8 p-8">
      <div className="w-full max-w-md">
        <InfiniteSlider gap={16} speed={50}>
          {Array.from({ length: 5 }, (_, i) => (
            <div
              className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground"
              key={`basic-${i + 1}`}
            >
              {i + 1}
            </div>
          ))}
        </InfiniteSlider>
      </div>

      <div className="w-full max-w-md">
        <InfiniteSlider gap={16} speed={50} speedOnHover={0}>
          {Array.from({ length: 5 }, (_, i) => (
            <div
              className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg bg-brand text-white"
              key={`hover-${i + 1}`}
            >
              {i + 1}
            </div>
          ))}
        </InfiniteSlider>
      </div>

      <div className="w-full max-w-md">
        <InfiniteSlider gap={16} reverse speed={50}>
          {Array.from({ length: 5 }, (_, i) => (
            <div
              className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground"
              key={`reverse-${i + 1}`}
            >
              {i + 1}
            </div>
          ))}
        </InfiniteSlider>
      </div>
    </div>
  );
}
