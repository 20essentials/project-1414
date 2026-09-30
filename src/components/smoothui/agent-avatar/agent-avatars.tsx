"use client";

import { cn } from "@/lib/utils";
import AgentAvatar from "@/components/smoothui/agent-avatar";

export type AgentAvatarsProps = {
  /** Seeds to render. Falls back to `count` generated seeds */
  seeds?: string[];
  /** How many avatars to render when `seeds` is not provided */
  count?: number;
  /** Diameter in pixels */
  size?: number;
  /** Enable pixel animation (respects prefers-reduced-motion) */
  animated?: boolean;
  /** Overlap avatars on top of each other, in pixels */
  overlap?: number;
  /** Layout direction of the row */
  direction?: "row" | "column";
  className?: string;
};

const DEFAULT_SEEDS = [
  "smoothui",
  "opencode",
  "bunny",
  "halo",
  "nova",
  "pixel",
];

const AgentAvatars = ({
  seeds,
  count = 4,
  size = 64,
  animated = true,
  overlap,
  direction = "row",
  className,
}: AgentAvatarsProps) => {
  const list =
    seeds ??
    (count > 0
      ? Array.from(
          { length: count },
          (_, index) => DEFAULT_SEEDS[index % DEFAULT_SEEDS.length],
        )
      : []);

  return (
    <div
      className={cn(
        "flex items-center",
        direction === "row" ? "-space-x-3" : "flex-col -space-y-3",
        className,
      )}
    >
      {list.map((seed, index) => (
        <AgentAvatar
          animated={animated}
          className="rounded-full ring-2 ring-black"
          key={`${seed}-${index}`}
          seed={seed}
          size={size}
          style={
            overlap === undefined
              ? undefined
              : direction === "row"
                ? { marginLeft: index === 0 ? 0 : -overlap }
                : { marginTop: index === 0 ? 0 : -overlap }
          }
        />
      ))}
    </div>
  );
};

export default AgentAvatars;
