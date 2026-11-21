"use client";

import CountryPicker from "@/components/smoothui/country-picker";
import { defaultCountries } from "@/components/smoothui/country-picker/default-data";
import { useState } from "react";

export default function CountryPickerDemo() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("FR");
  const selected = defaultCountries.find((country) => country.code === value);

  return (
    <div className="mx-auto flex w-full max-w-sm flex-col items-center gap-3 px-4 py-8">
      <CountryPicker
        countries={defaultCountries}
        emptyMessage="No matching countries"
        groupBy
        onOpenChange={setOpen}
        onValueChange={setValue}
        open={open}
        placeholder="Search by name, code or dial code..."
        recent={["FR", "US", "JP"]}
        trigger={
          selected ? (
            <span className="flex items-center gap-2">
              <span aria-hidden="true">
                {String.fromCodePoint(
                  0x1f1e6 + (selected.code.charCodeAt(0) - "A".charCodeAt(0)),
                  0x1f1e6 + (selected.code.charCodeAt(1) - "A".charCodeAt(0)),
                )}
              </span>
              <span>{selected.name}</span>
              <span className="text-muted-foreground">{selected.dialCode}</span>
            </span>
          ) : (
            "Select country"
          )
        }
        value={value}
      />
      <p className="text-xs text-muted-foreground">
        Selected code: <span className="font-medium">{value}</span>
      </p>
    </div>
  );
}
