"use client";

import SmoothButton from "@/components/smoothui/smooth-button";
import { cn } from "@/lib/utils";
import { Check, Search, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

const ROW_HEIGHT = 40;
const LIST_MAX_HEIGHT = 288;

export interface Country {
  code: string;
  dialCode?: string;
  flag?: string;
  group?: string;
  name: string;
}

export interface CountryPickerProps {
  className?: string;
  countries: Country[];
  emptyMessage?: string;
  groupBy?: boolean;
  onOpenChange: (open: boolean) => void;
  onValueChange: (code: string) => void;
  open: boolean;
  placeholder?: string;
  recent?: string[];
  trigger?: ReactNode;
  value?: string;
}

type Row =
  | { id: string; kind: "header"; label: string }
  | { country: Country; id: string; kind: "option" };

const normalize = (input: string) =>
  input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

const getFlagEmoji = (code: string) => {
  if (!/^[A-Za-z]{2}$/.test(code)) return null;
  const chars = code.toUpperCase();
  return String.fromCodePoint(
    0x1f1e6 + chars.charCodeAt(0) - 65,
    0x1f1e6 + chars.charCodeAt(1) - 65,
  );
};

const buildRows = (
  countries: Country[],
  query: string,
  recent: string[] | undefined,
  groupBy: boolean,
): Row[] => {
  const trimmedQuery = query.trim();
  const filtered = trimmedQuery
    ? countries.filter((country) => {
        const normalizedQuery = normalize(trimmedQuery);
        return (
          normalize(country.name).includes(normalizedQuery) ||
          normalize(country.code).includes(normalizedQuery) ||
          (country.dialCode
            ? normalize(country.dialCode).includes(normalizedQuery)
            : false)
        );
      })
    : countries;

  const rows: Row[] = [];
  if (!trimmedQuery && recent?.length) {
    const recentCountries = recent
      .map((code) => countries.find((country) => country.code === code))
      .filter((country): country is Country => Boolean(country));
    if (recentCountries.length) {
      rows.push({ id: "header-recent", kind: "header", label: "Recent" });
      recentCountries.forEach((country) =>
        rows.push({
          country,
          id: `option-recent-${country.code}`,
          kind: "option",
        }),
      );
    }
  }

  if (groupBy) {
    const groups = new Map<string, Country[]>();
    filtered.forEach((country) => {
      const label = country.group ?? "Other";
      groups.set(label, [...(groups.get(label) ?? []), country]);
    });
    groups.forEach((groupCountries, label) => {
      rows.push({
        id: `header-group-${label}`,
        kind: "header",
        label,
      });
      groupCountries.forEach((country) =>
        rows.push({
          country,
          id: `option-group-${label}-${country.code}`,
          kind: "option",
        }),
      );
    });
  } else {
    if (rows.length) {
      rows.push({ id: "header-all", kind: "header", label: "All countries" });
    }
    filtered.forEach((country) =>
      rows.push({
        country,
        id: `option-all-${country.code}`,
        kind: "option",
      }),
    );
  }
  return rows;
};

const CountryPicker = ({
  countries,
  value,
  onValueChange,
  open,
  onOpenChange,
  trigger,
  placeholder = "Search countries...",
  recent,
  groupBy = false,
  emptyMessage = "No countries found",
  className = "",
}: CountryPickerProps) => {
  const [query, setQuery] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const dialogRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);
  const listboxId = useId();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (open) {
      previousActiveElementRef.current = document.activeElement as HTMLElement;
      const timeoutId = setTimeout(() => searchInputRef.current?.focus(), 100);
      return () => clearTimeout(timeoutId);
    }
    previousActiveElementRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onOpenChange(false);
        return;
      }
      if (event.key === "Tab" && dialogRef.current) {
        const elements = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
          ),
        );
        const first = elements[0];
        const last = elements.at(-1);
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onOpenChange]);

  const rows = useMemo(
    () => buildRows(countries, query, recent, groupBy),
    [countries, query, recent, groupBy],
  );
  const optionRows = useMemo(
    () =>
      rows.filter(
        (row): row is Extract<Row, { kind: "option" }> => row.kind === "option",
      ),
    [rows],
  );
  const highlighted = Math.min(highlightedIndex, optionRows.length - 1);
  const activeId = highlighted >= 0 ? optionRows[highlighted]?.id : undefined;

  useEffect(() => {
    const highlightedRow = optionRows[highlighted];
    if (!(listRef.current && highlightedRow)) return;
    const rowIndex = rows.findIndex((row) => row.id === highlightedRow.id);
    if (rowIndex < 0) return;
    const top = rowIndex * ROW_HEIGHT;
    const bottom = top + ROW_HEIGHT;
    const container = listRef.current;
    if (top < container.scrollTop) container.scrollTop = top;
    else if (bottom > container.scrollTop + container.clientHeight)
      container.scrollTop = bottom - container.clientHeight;
  }, [highlighted, optionRows, rows]);

  const selectCountry = (country: Country) => {
    onValueChange(country.code);
    onOpenChange(false);
  };

  const handleInputKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (!optionRows.length) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setHighlightedIndex((index) =>
        Math.min(index + 1, optionRows.length - 1),
      );
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlightedIndex((index) => Math.max(index - 1, 0));
    } else if (event.key === "Home") {
      event.preventDefault();
      setHighlightedIndex(0);
    } else if (event.key === "End") {
      event.preventDefault();
      setHighlightedIndex(optionRows.length - 1);
    } else if (event.key === "Enter") {
      event.preventDefault();
      const target = optionRows[highlighted];
      if (target) selectCountry(target.country);
    }
  };

  const dialogContent = (
    <AnimatePresence>
      {open ? (
        <>
          <motion.div
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[80] bg-background/70 backdrop-blur-sm"
            exit={{ opacity: 0 }}
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
            onClick={() => onOpenChange(false)}
            transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
          />
          <motion.div
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[90] flex items-start justify-center overflow-y-auto px-4 py-16 sm:p-16"
            exit={{ opacity: 0 }}
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
          >
            <motion.div
              animate={
                shouldReduceMotion
                  ? { opacity: 1 }
                  : { opacity: 1, scale: 1, y: 0 }
              }
              aria-label="Select a country"
              aria-modal="true"
              className="relative w-full max-w-sm overflow-hidden rounded-xl border bg-primary shadow-xl"
              exit={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 0.97, y: 8 }
              }
              initial={
                shouldReduceMotion
                  ? { opacity: 1 }
                  : { opacity: 0, scale: 0.97, y: 8 }
              }
              ref={dialogRef}
              role="dialog"
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { damping: 25, duration: 0.25, stiffness: 300 }
              }
            >
              <div className="flex items-center gap-2 border-b p-3">
                <Search
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 text-muted-foreground"
                />
                <input
                  aria-activedescendant={activeId}
                  aria-autocomplete="list"
                  aria-controls={listboxId}
                  aria-expanded={open}
                  aria-label="Search countries"
                  className="w-full bg-transparent text-base outline-none placeholder:text-muted-foreground md:text-sm"
                  onChange={(event) => {
                    setQuery(event.target.value);
                    setHighlightedIndex(0);
                  }}
                  onKeyDown={handleInputKeyDown}
                  placeholder={placeholder}
                  ref={searchInputRef}
                  role="combobox"
                  type="text"
                  value={query}
                />
                {query ? (
                  <SmoothButton
                    aria-label="Clear search"
                    className="shrink-0 text-muted-foreground hover:text-foreground [&_svg]:size-3.5"
                    onClick={() => {
                      setQuery("");
                      setHighlightedIndex(0);
                      searchInputRef.current?.focus();
                    }}
                    shape="pill"
                    size="icon-sm"
                    variant="ghost"
                  >
                    <X aria-hidden="true" />
                  </SmoothButton>
                ) : null}
                <SmoothButton
                  aria-label="Close dialog"
                  className="shrink-0 text-muted-foreground hover:text-foreground"
                  onClick={() => onOpenChange(false)}
                  shape="pill"
                  size="icon-sm"
                  variant="ghost"
                >
                  <X aria-hidden="true" />
                </SmoothButton>
              </div>
              <div
                aria-label="Countries"
                className="overflow-y-auto py-1"
                id={listboxId}
                ref={listRef}
                role="listbox"
                style={{ maxHeight: LIST_MAX_HEIGHT }}
              >
                {!optionRows.length ? (
                  <p className="px-4 py-8 text-center text-sm text-muted-foreground">
                    {emptyMessage}
                  </p>
                ) : (
                  rows.map((row) =>
                    row.kind === "header" ? (
                      <div
                        className="px-3 pt-3 pb-1 text-xs font-medium tracking-wide text-muted-foreground uppercase"
                        key={row.id}
                        role="presentation"
                      >
                        {row.label}
                      </div>
                    ) : (
                      <div
                        aria-selected={value === row.country.code}
                        className={cn(
                          "flex min-h-[40px] cursor-pointer items-center gap-3 px-3 text-sm transition-colors",
                          row.id === activeId && "bg-muted",
                          value === row.country.code &&
                            "font-medium text-brand",
                        )}
                        id={row.id}
                        key={row.id}
                        onClick={() => selectCountry(row.country)}
                        onMouseDown={(event) => event.preventDefault()}
                        role="option"
                      >
                        <span
                          aria-hidden="true"
                          className="w-6 shrink-0 text-center text-base"
                        >
                          {row.country.flag ??
                            getFlagEmoji(row.country.code) ??
                            row.country.code}
                        </span>
                        <span className="min-w-0 flex-1 truncate">
                          {row.country.name}
                        </span>
                        {row.country.dialCode ? (
                          <span className="shrink-0 text-xs text-muted-foreground">
                            {row.country.dialCode}
                          </span>
                        ) : null}
                        {value === row.country.code ? (
                          <Check
                            aria-hidden="true"
                            className="h-4 w-4 shrink-0 text-brand"
                          />
                        ) : null}
                      </div>
                    ),
                  )
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );

  return (
    <>
      <SmoothButton
        aria-expanded={open}
        aria-haspopup="dialog"
        className={className}
        onClick={() => onOpenChange(true)}
        variant="outline"
      >
        {trigger ?? "Select country"}
      </SmoothButton>
      {typeof document !== "undefined"
        ? createPortal(dialogContent, document.body)
        : null}
    </>
  );
};

export default CountryPicker;
