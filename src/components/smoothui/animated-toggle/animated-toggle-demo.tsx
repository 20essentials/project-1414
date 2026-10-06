"use client";

import AnimatedToggle from "@/components/smoothui/animated-toggle";
import { useState } from "react";

export type AnimatedToggleDemoProps = {
  /** Accessible label for the toggle */
  label?: string;
  /** Size of the toggle */
  size?: "sm" | "md" | "lg";
  /** Visual variant of the toggle */
  variant?: "default" | "morph" | "icon";
};

const AnimatedToggleDemo = ({
  label = "Toggle",
  size = "lg",
  variant = "default",
}: AnimatedToggleDemoProps) => {
  const [checked, setChecked] = useState(false);

  return (
    <div className="flex w-full flex-col items-center justify-center p-8">
      <AnimatedToggle
        checked={checked}
        label={label}
        onChange={setChecked}
        size={size}
        variant={variant}
      />
    </div>
  );
};

export default AnimatedToggleDemo;
