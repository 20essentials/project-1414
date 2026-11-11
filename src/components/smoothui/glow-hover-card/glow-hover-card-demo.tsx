"use client";

import { cn } from "@/lib/utils";
import GlowHover, { type GlowHoverItem } from "./index";
import {
  defaultGlowHoverIntensity,
  defaultGlowHoverItems,
  defaultGlowHoverMaskSize,
} from "./default-data";

export type GlowHoverCardDemoProps = {
  items?: GlowHoverItem[];
  maskSize?: number;
  glowIntensity?: number;
  className?: string;
};

export default function GlowHoverCardDemo({
  items = defaultGlowHoverItems,
  maskSize = defaultGlowHoverMaskSize,
  glowIntensity = defaultGlowHoverIntensity,
  className,
}: GlowHoverCardDemoProps) {
  return (
    <div className="flex w-full flex-col items-center justify-center px-4 py-8">
      <GlowHover
        className={cn("flex flex-wrap gap-6 md:gap-8 lg:gap-10", className)}
        glowIntensity={glowIntensity}
        items={items}
        maskSize={maskSize}
      />
    </div>
  );
}
