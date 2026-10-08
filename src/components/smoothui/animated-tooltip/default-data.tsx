import type { AnimatedTooltipPlacement } from "@/components/smoothui/animated-tooltip";
import type { SmoothButtonProps } from "@/components/smoothui/smooth-button";
import type { ReactNode } from "react";

export type AnimatedTooltipItem = {
  /** Label rendered on the trigger button */
  label: string;
  /** Content displayed inside the tooltip */
  content: ReactNode;
  /** Placement of the tooltip relative to the trigger */
  placement?: AnimatedTooltipPlacement;
  /** Delay in milliseconds before the tooltip appears */
  delay?: number;
  /** Variant of the trigger button */
  variant?: SmoothButtonProps["variant"];
};

export const defaultTooltipPlacementItems: AnimatedTooltipItem[] = [
  {
    content: "Tooltip on top",
    label: "Top",
    placement: "top",
  },
  {
    content: "Tooltip on bottom",
    label: "Bottom",
    placement: "bottom",
  },
  {
    content: "Tooltip on left",
    label: "Left",
    placement: "left",
  },
  {
    content: "Tooltip on right",
    label: "Right",
    placement: "right",
  },
];

export const defaultTooltipFeatureItems: AnimatedTooltipItem[] = [
  {
    content: (
      <span className="flex items-center gap-2">
        <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
        Rich content supported
      </span>
    ),
    label: "Rich Content",
    placement: "top",
    variant: "outline",
  },
  {
    content: "I appear after 500ms",
    delay: 500,
    label: "With Delay",
    placement: "bottom",
    variant: "outline",
  },
];
