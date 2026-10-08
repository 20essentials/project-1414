"use client";

import AnimatedTooltip from "@/components/smoothui/animated-tooltip";
import SmoothButton from "@/components/smoothui/smooth-button";
import { cn } from "@/lib/utils";
import {
  type AnimatedTooltipItem,
  defaultTooltipFeatureItems,
  defaultTooltipPlacementItems,
} from "./default-data";

export interface AnimatedTooltipDemoProps {
  /** Triggers showcasing the four tooltip placements */
  placementItems?: AnimatedTooltipItem[];
  /** Triggers showcasing rich content and delayed tooltips */
  featureItems?: AnimatedTooltipItem[];
  className?: string;
}

// Showcase: owns the trigger rows, so the homepage can render it as
// <AnimatedTooltipDemo /> with no props.
export function AnimatedTooltipDemo({
  placementItems = defaultTooltipPlacementItems,
  featureItems = defaultTooltipFeatureItems,
  className,
}: AnimatedTooltipDemoProps) {
  const renderTrigger = (item: AnimatedTooltipItem) => (
    <AnimatedTooltip
      content={item.content}
      delay={item.delay}
      key={item.label}
      placement={item.placement}
    >
      <SmoothButton size="sm" variant={item.variant}>
        {item.label}
      </SmoothButton>
    </AnimatedTooltip>
  );

  return (
    <div
      className={cn(
        "flex w-full flex-col items-center justify-center gap-12 py-8",
        className,
      )}
    >
      <div className="flex flex-wrap items-center justify-center gap-8">
        {placementItems.map(renderTrigger)}
      </div>
      <div className="flex flex-wrap items-center justify-center gap-8">
        {featureItems.map(renderTrigger)}
      </div>
    </div>
  );
}

export default AnimatedTooltipDemo;
