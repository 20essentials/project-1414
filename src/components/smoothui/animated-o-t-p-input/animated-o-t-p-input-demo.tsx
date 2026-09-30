"use client";

import {
  AnimatedInputOTP,
  AnimatedInputOTPGroup,
  AnimatedInputOTPSeparator,
  AnimatedInputOTPSlot,
} from "@/components/smoothui/animated-o-t-p-input";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  defaultOtpHint,
  defaultOtpLabel,
  defaultOtpMaxLength,
  defaultOtpValue,
} from "./default-data";

export interface AnimatedOTPInputDemoProps {
  /** Number of digits in the code */
  maxLength?: number;
  /** Initial code, pre-filled so the demo is convincing out of the box */
  defaultValue?: string;
  /** Accessible label for the hidden input */
  label?: string;
  /** Helper text rendered under the input */
  hint?: string;
  /** Hide the helper text */
  hideHint?: boolean;
  /** Fired with the numeric value on every keystroke */
  onChange?: (value: string) => void;
  /** Fired once every digit is filled */
  onComplete?: (value: string) => void;
  className?: string;
}

// Showcase: composes the compound parts and owns the state, so the homepage can
// render it as <AnimatedOTPInputDemo /> with no props.
export function AnimatedOTPInputDemo({
  maxLength = defaultOtpMaxLength,
  defaultValue = defaultOtpValue,
  label = defaultOtpLabel,
  hint = defaultOtpHint,
  hideHint = false,
  onChange,
  onComplete,
  className,
}: AnimatedOTPInputDemoProps) {
  const [value, setValue] = useState(defaultValue.slice(0, maxLength));
  const split = Math.ceil(maxLength / 2);
  const isComplete = value.length === maxLength;

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <AnimatedInputOTP
        aria-label={label}
        maxLength={maxLength}
        onChange={(nextValue) => {
          setValue(nextValue);
          onChange?.(nextValue);
        }}
        onComplete={(nextValue) => {
          setValue(nextValue);
          onComplete?.(nextValue);
        }}
        value={value}
      >
        <AnimatedInputOTPGroup>
          {Array.from({ length: split }, (_, index) => (
            <AnimatedInputOTPSlot index={index} key={index} />
          ))}
        </AnimatedInputOTPGroup>
        <AnimatedInputOTPSeparator />
        <AnimatedInputOTPGroup>
          {Array.from({ length: maxLength - split }, (_, index) => (
            <AnimatedInputOTPSlot index={index + split} key={index} />
          ))}
        </AnimatedInputOTPGroup>
      </AnimatedInputOTP>
      {!hideHint && (
        <p
          className={cn(
            "text-xs text-muted-foreground",
            isComplete && "text-emerald-600 dark:text-emerald-400",
          )}
        >
          {isComplete ? "Code verified" : hint}
        </p>
      )}
    </div>
  );
}

export default AnimatedOTPInputDemo;
