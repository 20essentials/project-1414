"use client";

import AppDownloadStack, {
  type AppData,
} from "@/components/smoothui/app-download-stack";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { defaultDemoApps, defaultDemoTitle } from "./default-data";

export interface AppDownloadStackDemoProps {
  /** Apps offered in the stack — icons plus names */
  apps?: AppData[];
  /** Title rendered above the app grid when expanded */
  title?: string;
  className?: string;
}

// Showcase: owns the expand/select/download state machine, so the homepage can
// render it as <AppDownloadStackDemo /> with no props.
export function AppDownloadStackDemo({
  apps = defaultDemoApps,
  title = defaultDemoTitle,
  className,
}: AppDownloadStackDemoProps) {
  const [selected, setSelected] = useState<number[]>([]);
  const [expanded, setExpanded] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <div
      className={cn(
        "relative flex w-full flex-col items-center justify-center",
        className,
      )}
    >
      {notification ? (
        <div className="absolute top-4 right-4 z-50 rounded-lg border bg-background px-4 py-2 text-sm shadow-lg">
          {notification}
        </div>
      ) : null}
      <AppDownloadStack
        apps={apps}
        isExpanded={expanded}
        onChange={setSelected}
        onDownload={(selectedApps) =>
          setNotification(`Download apps: ${selectedApps.join(", ")}`)
        }
        onExpandChange={setExpanded}
        selectedApps={selected}
        title={title}
      />
    </div>
  );
}

export default AppDownloadStackDemo;
