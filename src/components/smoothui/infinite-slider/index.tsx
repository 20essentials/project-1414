"use client";

import { cn } from "@/lib/utils";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import useMeasure from "react-use-measure";

export interface InfiniteSliderProps {
  children: React.ReactNode;
  className?: string;
  direction?: "horizontal" | "vertical";
  gap?: number;
  paused?: boolean;
  reverse?: boolean;
  speed?: number;
  speedOnHover?: number;
}

export default function InfiniteSlider({
  children,
  gap = 16,
  speed = 100,
  paused = false,
  speedOnHover,
  direction = "horizontal",
  reverse = false,
  className,
}: InfiniteSliderProps) {
  const [currentSpeed, setCurrentSpeed] = useState(speed);
  const [ref, { width, height }] = useMeasure();
  const translation = useMotionValue(0);
  const isTransitioning = useRef(false);
  const [animationCycle, setAnimationCycle] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      translation.set(0);
      return;
    }

    if (paused || currentSpeed <= 0) {
      isTransitioning.current = true;
      return;
    }

    let controls:
      | {
          stop: () => void;
        }
      | undefined;
    const size = direction === "horizontal" ? width : height;
    const contentSize = size + gap;
    const from = reverse ? -contentSize / 2 : 0;
    const to = reverse ? 0 : -contentSize / 2;

    const distanceToTravel = Math.abs(to - from);
    const duration = distanceToTravel / currentSpeed;

    if (isTransitioning.current) {
      const remainingDistance = Math.abs(translation.get() - to);
      const transitionDuration = remainingDistance / currentSpeed;

      controls = animate(translation, [translation.get(), to], {
        duration: transitionDuration,
        ease: "linear",
        onComplete: () => {
          isTransitioning.current = false;
          setAnimationCycle((cycle) => cycle + 1);
        },
      });
    } else {
      controls = animate(translation, [from, to], {
        duration,
        ease: "linear",
        onRepeat: () => {
          translation.set(from);
        },
        repeat: Number.POSITIVE_INFINITY,
        repeatDelay: 0,
        repeatType: "loop",
      });
    }

    return controls?.stop;
  }, [
    paused,
    translation,
    currentSpeed,
    width,
    height,
    gap,
    animationCycle,
    direction,
    reverse,
    shouldReduceMotion,
  ]);

  const hoverProps =
    speedOnHover === undefined
      ? {}
      : {
          onHoverEnd: () => {
            isTransitioning.current = true;
            setCurrentSpeed(speed);
          },
          onHoverStart: () => {
            isTransitioning.current = true;
            setCurrentSpeed(speedOnHover);
          },
        };

  return (
    <div className={cn("overflow-hidden", className)}>
      <motion.div
        className="flex w-max"
        ref={ref}
        style={{
          ...(direction === "horizontal"
            ? { x: translation }
            : { y: translation }),
          flexDirection: direction === "horizontal" ? "row" : "column",
          gap: `${gap}px`,
        }}
        {...hoverProps}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}
