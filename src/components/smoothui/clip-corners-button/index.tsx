"use client";

import SmoothButton from "@/components/smoothui/smooth-button";
import { motion, useReducedMotion } from "motion/react";
import { useState, useSyncExternalStore } from "react";

export interface ClipCornersButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const HOVER_MEDIA_QUERY = "(hover: hover) and (pointer: fine)";

function getHoverMediaQueryMatches() {
  return window.matchMedia(HOVER_MEDIA_QUERY).matches;
}

function subscribeToHoverMediaQuery(onChange: () => void) {
  const mediaQuery = window.matchMedia(HOVER_MEDIA_QUERY);
  mediaQuery.addEventListener("change", onChange);
  return () => mediaQuery.removeEventListener("change", onChange);
}

export function ClipCornersButton({
  children,
  className = "",
  onClick,
}: ClipCornersButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const isHoverDevice = useSyncExternalStore(
    subscribeToHoverMediaQuery,
    getHoverMediaQueryMatches,
    () => false,
  );

  // Distance triangles move on hover
  const move = -4;

  return (
    <SmoothButton
      className={`relative overflow-hidden rounded-none border-none bg-foreground px-8 py-4 font-mono text-2xl text-background hover:bg-foreground/90 ${className}`}
      onClick={onClick}
      onMouseEnter={() => {
        if (isHoverDevice) {
          setIsHovered(true);
        }
      }}
      onMouseLeave={() => setIsHovered(false)}
      style={{ borderRadius: 8 }}
      type="button"
    >
      {/* Top-left triangle */}
      <motion.div
        animate={
          shouldReduceMotion || !isHoverDevice
            ? {}
            : {
                x: isHovered ? -move : 0,
                y: isHovered ? -move : 0,
              }
        }
        className="absolute top-1.5 left-1.5"
        initial={false}
        style={{ height: 8, width: 8 }}
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : {
                damping: 24,
                duration: 0.2,
                stiffness: 400,
                type: "spring" as const,
              }
        }
      >
        <svg
          aria-label="Top-left triangle"
          className="fill-background"
          height="8"
          width="8"
        >
          <title>Top-left triangle</title>
          <polygon fill="currentColor" points="0,0 8,0 0,8" />
        </svg>
      </motion.div>
      {/* Top-right triangle */}
      <motion.div
        animate={
          shouldReduceMotion || !isHoverDevice
            ? {}
            : {
                x: isHovered ? move : 0,
                y: isHovered ? -move : 0,
              }
        }
        className="absolute top-1.5 right-1.5"
        initial={false}
        style={{ height: 8, width: 8 }}
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : {
                damping: 24,
                duration: 0.2,
                stiffness: 400,
                type: "spring" as const,
              }
        }
      >
        <svg
          aria-label="Top-right triangle"
          className="fill-background"
          height="8"
          width="8"
        >
          <title>Top-right triangle</title>
          <polygon fill="currentColor" points="8,0 8,8 0,0" />
        </svg>
      </motion.div>
      {/* Bottom-left triangle */}
      <motion.div
        animate={
          shouldReduceMotion || !isHoverDevice
            ? {}
            : {
                x: isHovered ? -move : 0,
                y: isHovered ? move : 0,
              }
        }
        className="absolute bottom-1.5 left-1.5"
        initial={false}
        style={{ height: 8, width: 8 }}
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : {
                damping: 24,
                duration: 0.2,
                stiffness: 400,
                type: "spring" as const,
              }
        }
      >
        <svg
          aria-label="Bottom-left triangle"
          className="fill-background"
          height="8"
          width="8"
        >
          <title>Bottom-left triangle</title>
          <polygon fill="currentColor" points="0,8 8,8 0,0" />
        </svg>
      </motion.div>
      {/* Bottom-right triangle */}
      <motion.div
        animate={
          shouldReduceMotion || !isHoverDevice
            ? {}
            : {
                x: isHovered ? move : 0,
                y: isHovered ? move : 0,
              }
        }
        className="absolute right-1.5 bottom-1.5"
        initial={false}
        style={{ height: 8, width: 8 }}
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : {
                damping: 24,
                duration: 0.2,
                stiffness: 400,
                type: "spring" as const,
              }
        }
      >
        <svg
          aria-label="Bottom-right triangle"
          className="fill-background"
          height="8"
          width="8"
        >
          <title>Bottom-right triangle</title>
          <polygon fill="currentColor" points="8,8 0,8 8,0" />
        </svg>
      </motion.div>
      <span className="relative z-10 flex w-full items-center justify-center select-none">
        {children}
      </span>
    </SmoothButton>
  );
}

export default ClipCornersButton;
