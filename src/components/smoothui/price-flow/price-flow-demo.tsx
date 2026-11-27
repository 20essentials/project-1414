"use client";

import SmoothButton from "@/components/smoothui/smooth-button";
import PriceFlow from "@/components/smoothui/price-flow";
import { useState } from "react";
import {
  defaultPriceFlowAlternateValue,
  defaultPriceFlowCurrency,
  defaultPriceFlowValue,
} from "./default-data";

export interface PriceFlowDemoProps {
  /** Initial displayed price */
  value?: number;
  /** Price toggled to on button press */
  alternateValue?: number;
  /** Currency symbol shown after the price */
  currency?: string;
}

export function PriceFlowDemo({
  value = defaultPriceFlowValue,
  alternateValue = defaultPriceFlowAlternateValue,
  currency = defaultPriceFlowCurrency,
}: PriceFlowDemoProps) {
  const [currentValue, setCurrentValue] = useState(value);

  const handlePriceChange = () => {
    setCurrentValue((prev) => (prev === value ? alternateValue : value));
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-8 p-8">
      <div className="text-center">
        <div className="text-6xl font-bold text-foreground">
          <PriceFlow value={currentValue} />
          {currency}
        </div>
      </div>

      <div className="flex gap-4">
        <SmoothButton onClick={handlePriceChange} type="button" variant="candy">
          Change Price
        </SmoothButton>
      </div>
    </div>
  );
}

export default PriceFlowDemo;
