"use client";

import BasicDropdown, {
  type DropdownItem,
} from "@/components/smoothui/basic-dropdown";
import { cn } from "@/lib/utils";
import {
  defaultDropdownHeading,
  defaultDropdownItems,
  defaultDropdownLabel,
} from "./default-data";

export interface BasicDropdownDemoProps {
  /** Options rendered inside the menu */
  items?: DropdownItem[];
  /** Text shown on the trigger before an option is picked */
  label?: string;
  /** Heading rendered above the dropdown */
  heading?: string;
  /** Fired with the chosen item */
  onChange?: (item: DropdownItem) => void;
  className?: string;
}

export function BasicDropdownDemo({
  items = defaultDropdownItems,
  label = defaultDropdownLabel,
  heading = defaultDropdownHeading,
  onChange,
  className,
}: BasicDropdownDemoProps) {
  return (
    <div className={cn("flex w-full max-w-xs flex-col gap-4 p-8", className)}>
      <h3 className="text-lg font-medium">{heading}</h3>
      <BasicDropdown items={items} label={label} onChange={onChange} />
    </div>
  );
}

export default BasicDropdownDemo;
