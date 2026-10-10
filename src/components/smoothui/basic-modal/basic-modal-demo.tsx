"use client";

import BasicModal from "@/components/smoothui/basic-modal";
import SmoothButton from "@/components/smoothui/smooth-button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  defaultModalBody,
  defaultModalCancelLabel,
  defaultModalConfirmLabel,
  defaultModalTitle,
  defaultModalTriggerLabel,
} from "./default-data";

export interface BasicModalDemoProps {
  /** Modal heading */
  title?: string;
  /** Body copy rendered inside the modal */
  body?: string;
  /** Label of the button that opens the modal */
  triggerLabel?: string;
  /** Label of the dismiss button */
  cancelLabel?: string;
  /** Label of the primary action button */
  confirmLabel?: string;
  /** Modal width preset */
  size?: "sm" | "md" | "lg" | "xl" | "full";
  /** Render the modal open on first paint */
  defaultOpen?: boolean;
  className?: string;
}

// Showcase: owns the open/close state so the homepage can render it as
// <BasicModalDemo /> with no props.
export function BasicModalDemo({
  title = defaultModalTitle,
  body = defaultModalBody,
  triggerLabel = defaultModalTriggerLabel,
  cancelLabel = defaultModalCancelLabel,
  confirmLabel = defaultModalConfirmLabel,
  size = "md",
  defaultOpen = false,
  className,
}: BasicModalDemoProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div
      className={cn(
        "flex w-full flex-col items-center justify-center",
        className,
      )}
    >
      <SmoothButton onClick={() => setIsOpen(true)} variant="candy">
        {triggerLabel}
      </SmoothButton>

      <BasicModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        size={size}
        title={title}
      >
        <div className="space-y-4">
          <p className="text-foreground/70">{body}</p>
          <div className="flex justify-end space-x-2">
            <SmoothButton onClick={() => setIsOpen(false)} variant="outline">
              {cancelLabel}
            </SmoothButton>
            <SmoothButton onClick={() => setIsOpen(false)} variant="candy">
              {confirmLabel}
            </SmoothButton>
          </div>
        </div>
      </BasicModal>
    </div>
  );
}

export default BasicModalDemo;
