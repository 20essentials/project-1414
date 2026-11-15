"use client";

import PowerOffSlide, {
  type PowerOffSlideProps,
} from "@/components/smoothui/power-off-slide";
import { cn } from "@/lib/utils";

export interface PowerOffSlideDemoProps extends Pick<
  PowerOffSlideProps,
  "disabled" | "duration" | "label" | "onPowerOff"
> {
  className?: string;
}

export function PowerOffSlideDemo({
  className = "",
  disabled = false,
  duration = 1500,
  label = "Slide to power off",
  onPowerOff,
}: PowerOffSlideDemoProps) {
  return (
    <div
      className={cn(
        "flex w-full flex-col items-center justify-center gap-4 py-8",
        className,
      )}
    >
      <PowerOffSlide
        disabled={disabled}
        duration={duration}
        label={label}
        onPowerOff={onPowerOff}
      />
    </div>
  );
}

export default PowerOffSlideDemo;
