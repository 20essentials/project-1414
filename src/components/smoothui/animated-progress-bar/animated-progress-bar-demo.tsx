"use client";

import AnimatedProgressBar from "@/components/smoothui/animated-progress-bar";
import SmoothButton from "@/components/smoothui/smooth-button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  defaultProgressButtonLabel,
  defaultProgressColor,
  defaultProgressStep,
  defaultProgressValue,
} from "./default-data";

export interface AnimatedProgressBarDemoProps {
  /** Value the bar starts on, 0–100 */
  defaultValue?: number;
  /** How much the button adds per click before wrapping back to 0 */
  step?: number;
  /** Fill colour of the bar */
  color?: string;
  /** Button label. Pass an empty string to hide the button */
  buttonLabel?: string;
  /** Show the button that drives the bar */
  showControls?: boolean;
  /** Fired with the new value on every change */
  onValueChange?: (value: number) => void;
  className?: string;
}

/**
 * Showcase: owns the value state that the bare component cannot, so the
 * homepage can render it as <AnimatedProgressBarDemo /> with no props.
 */
export function AnimatedProgressBarDemo({
  defaultValue = defaultProgressValue,
  step = defaultProgressStep,
  color = defaultProgressColor,
  buttonLabel = defaultProgressButtonLabel,
  showControls = true,
  onValueChange,
  className,
}: AnimatedProgressBarDemoProps) {
  const [value, setValue] = useState(defaultValue);

  const increase = () => {
    const next = value >= 100 ? 0 : value + step;
    setValue(next);
    onValueChange?.(next);
  };

  return (
    <div
      className={cn(
        "flex w-full flex-col items-center justify-center",
        className,
      )}
    >
      <div className="flex w-full max-w-xs flex-col items-center gap-4 p-8">
        <AnimatedProgressBar
          color={color}
          label={`Progress: ${value}%`}
          value={value}
        />
        {showControls && (
          <SmoothButton onClick={increase} size="sm" variant="outline">
            {buttonLabel}
          </SmoothButton>
        )}
      </div>
    </div>
  );
}

export default AnimatedProgressBarDemo;
