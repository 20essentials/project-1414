"use client";

import Checkbox from "@/components/smoothui/checkbox";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { defaultCheckboxId, defaultCheckboxLabel } from "./default-data";

export interface CheckboxDemoProps {
  /** Label rendered next to the checkbox */
  label?: string;
  /** ID used to associate the checkbox with its label */
  id?: string;
  /** Whether the checkbox starts checked */
  defaultChecked?: boolean;
  /** Fired with the new checked state on every change */
  onCheckedChange?: (checked: boolean) => void;
  className?: string;
}

/**
 * Showcase: owns the controlled checked state, so the homepage can render it
 * as <CheckboxDemo /> with no props.
 */
export function CheckboxDemo({
  label = defaultCheckboxLabel,
  id = defaultCheckboxId,
  defaultChecked = false,
  onCheckedChange,
  className,
}: CheckboxDemoProps) {
  const [checked, setChecked] = useState(defaultChecked);

  return (
    <div
      className={cn(
        "flex w-full flex-col items-center justify-center p-8",
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <Checkbox
          checked={checked}
          id={id}
          onCheckedChange={(next) => {
            setChecked(next);
            onCheckedChange?.(next);
          }}
        />
        <label
          className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          htmlFor={id}
        >
          {label}
        </label>
      </div>
    </div>
  );
}

export default CheckboxDemo;
