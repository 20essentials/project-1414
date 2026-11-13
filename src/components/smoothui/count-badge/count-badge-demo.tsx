"use client";

import CountBadge from "@/components/smoothui/count-badge";
import { Bell } from "lucide-react";
import { useState } from "react";

interface CountBadgeDemoProps {
  initialCount?: number;
}

export default function CountBadgeDemo({
  initialCount = 5,
}: CountBadgeDemoProps) {
  const [count, setCount] = useState(initialCount);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-6 py-6">
      <CountBadge count={count} variant="count">
        <button
          aria-label="Notifications"
          className="rounded-xl bg-muted p-4"
          type="button"
        >
          <Bell className="h-8 w-8" />
        </button>
      </CountBadge>

      <div className="flex gap-2">
        <button
          aria-label="Decrease notification count"
          className="rounded-md border px-3 py-1.5 text-sm transition-colors hover:bg-muted"
          onClick={() => setCount((current) => Math.max(0, current - 1))}
          type="button"
        >
          −
        </button>
        <button
          aria-label="Increase notification count"
          className="rounded-md border px-3 py-1.5 text-sm transition-colors hover:bg-muted"
          onClick={() => setCount((current) => current + 1)}
          type="button"
        >
          +
        </button>
      </div>
    </div>
  );
}
