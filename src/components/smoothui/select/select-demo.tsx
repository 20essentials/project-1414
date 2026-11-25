"use client";

import Select, { type SelectOptionProps } from "@/components/smoothui/select";
import { useState } from "react";
import { fruitOptions } from "./default-data";

export interface SelectDemoProps {
  options?: SelectOptionProps[];
  placeholder?: string;
}

export default function SelectDemo({
  options = fruitOptions,
  placeholder = "Choose a fruit",
}: SelectDemoProps) {
  const [value, setValue] = useState("");

  return (
    <div className="flex w-full max-w-sm items-center justify-center p-8">
      <Select
        aria-label="Fruit"
        onValueChange={setValue}
        options={options}
        placeholder={placeholder}
        value={value}
      />
    </div>
  );
}
