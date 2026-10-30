"use client";

import CursorFollow from "@/components/smoothui/cursor-follow";
import { cn } from "@/lib/utils";
import {
  type CursorFollowImage,
  defaultCursorFollowImages,
} from "./default-data";

export interface CursorFollowDemoProps {
  /** Card images that reveal a cursor label on hover */
  images?: CursorFollowImage[];
  className?: string;
}

// Showcase: composes the cursor-tracking root with children so the homepage can
// render it as <CursorFollowDemo /> with no props.
export function CursorFollowDemo({
  images = defaultCursorFollowImages,
  className,
}: CursorFollowDemoProps) {
  return (
    <div
      className={cn(
        "flex w-full flex-col items-center justify-center",
        className,
      )}
    >
      <CursorFollow className="w-full">
        <div className="flex flex-row items-center justify-center gap-8 py-8">
          {images.map((image) => (
            <div className="flex flex-col items-center" key={image.id}>
              <img
                alt={image.label}
                className="aspect-[9/16] w-48 rounded-xl border-background object-cover transition-transform duration-200 hover:scale-105"
                data-cursor-text={image.label}
                height={341}
                src={image.src}
                style={{ cursor: "none" }}
                width={192}
              />
            </div>
          ))}
        </div>
      </CursorFollow>
    </div>
  );
}

export default CursorFollowDemo;
