"use client";

import DigitRoll from "@/components/smoothui/digit-roll";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  defaultPrice,
  defaultPriceMax,
  defaultPriceStep,
  defaultQuantity,
  defaultQuantityMax,
  defaultVolume,
} from "./default-data";

export interface DigitRollDemoProps {
  /** Initial quantity, controlled with stepper buttons */
  quantity?: number;
  /** Maximum allowed quantity */
  quantityMax?: number;
  /** Initial price, controlled with scrubbing and priced steps */
  price?: number;
  /** Maximum allowed price */
  priceMax?: number;
  /** Step used by arrows and scrubbing on the price field */
  priceStep?: number;
  /** Initial volume, rendered uncontrolled */
  volume?: number;
  className?: string;
}

// Showcase: renders three digit rolls (stepper, currency, uncontrolled) so the
// homepage can render it as <DigitRollDemo /> with no props.
export function DigitRollDemo({
  quantity: initialQuantity = defaultQuantity,
  quantityMax = defaultQuantityMax,
  price: initialPrice = defaultPrice,
  priceMax = defaultPriceMax,
  priceStep = defaultPriceStep,
  volume = defaultVolume,
  className,
}: DigitRollDemoProps) {
  const [quantity, setQuantity] = useState(initialQuantity);
  const [price, setPrice] = useState(initialPrice);

  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-sm flex-col gap-8 px-4 py-8",
        className,
      )}
    >
      <DigitRoll
        label="Quantity"
        max={quantityMax}
        min={0}
        onValueChange={setQuantity}
        stepper
        value={quantity}
      />
      <DigitRoll
        label="Price"
        max={priceMax}
        min={0}
        onValueChange={setPrice}
        precision={2}
        prefix="$"
        step={priceStep}
        value={price}
      />
      <DigitRoll
        defaultValue={volume}
        label="Volume"
        max={100}
        min={0}
        suffix="%"
      />
    </div>
  );
}

export default DigitRollDemo;
