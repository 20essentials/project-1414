import type { GlowHoverItem } from "./index";

export const defaultGlowHoverItems: GlowHoverItem[] = [
  {
    element: (
      <div className="grid max-w-[280px] min-w-[200px] flex-1 grid-rows-[auto_auto_1fr] items-start gap-4 rounded-2xl border border-foreground/20 bg-background p-5 text-foreground">
        <div>
          <h2 className="mb-2 text-sm font-semibold">Design System</h2>
          <p className="text-xs leading-relaxed text-muted-foreground">
            Build beautiful interfaces with our comprehensive design system
          </p>
        </div>
        <ul className="space-y-1.5 text-xs leading-relaxed">
          <li className="flex items-start gap-1.5">
            <span className="mt-0.5 shrink-0">✓</span>
            <span>Component library</span>
          </li>
          <li className="flex items-start gap-1.5">
            <span className="mt-0.5 shrink-0">✓</span>
            <span>Color palette</span>
          </li>
          <li className="flex items-start gap-1.5">
            <span className="mt-0.5 shrink-0">✓</span>
            <span>Typography scale</span>
          </li>
        </ul>
        <div className="mt-4 self-end">
          <div className="rounded-lg bg-brand px-4 py-2 text-center text-sm font-semibold text-white">
            Explore
          </div>
        </div>
      </div>
    ),
    id: "design",
  },
  {
    element: (
      <div className="grid max-w-[280px] min-w-[200px] flex-1 grid-rows-[auto_auto_1fr] items-start gap-4 rounded-2xl border border-foreground/20 bg-background p-5 text-foreground">
        <div>
          <h2 className="mb-2 text-sm font-semibold">Components</h2>
          <p className="text-xs leading-relaxed text-muted-foreground">
            Pre-built components ready to use in your next project
          </p>
        </div>
        <ul className="space-y-1.5 text-xs leading-relaxed">
          <li className="flex items-start gap-1.5">
            <span className="mt-0.5 shrink-0">✓</span>
            <span>40+ components</span>
          </li>
          <li className="flex items-start gap-1.5">
            <span className="mt-0.5 shrink-0">✓</span>
            <span>Fully customizable</span>
          </li>
          <li className="flex items-start gap-1.5">
            <span className="mt-0.5 shrink-0">✓</span>
            <span>TypeScript support</span>
          </li>
        </ul>
        <div className="mt-4 self-end">
          <div className="rounded-lg bg-brand px-4 py-2 text-center text-sm font-semibold text-white">
            View All
          </div>
        </div>
      </div>
    ),
    id: "components",
  },
  {
    element: (
      <div className="grid max-w-[280px] min-w-[200px] flex-1 grid-rows-[auto_auto_1fr] items-start gap-4 rounded-2xl border border-foreground/20 bg-background p-5 text-foreground">
        <div>
          <h2 className="mb-2 text-sm font-semibold">Animations</h2>
          <p className="text-xs leading-relaxed text-muted-foreground">
            Smooth, performant animations powered by Framer Motion
          </p>
        </div>
        <ul className="space-y-1.5 text-xs leading-relaxed">
          <li className="flex items-start gap-1.5">
            <span className="mt-0.5 shrink-0">✓</span>
            <span>GPU accelerated</span>
          </li>
          <li className="flex items-start gap-1.5">
            <span className="mt-0.5 shrink-0">✓</span>
            <span>Accessible</span>
          </li>
          <li className="flex items-start gap-1.5">
            <span className="mt-0.5 shrink-0">✓</span>
            <span>Spring physics</span>
          </li>
        </ul>
        <div className="mt-4 self-end">
          <div className="rounded-lg bg-brand px-4 py-2 text-center text-sm font-semibold text-white">
            Learn More
          </div>
        </div>
      </div>
    ),
    id: "animations",
  },
];

export const defaultGlowHoverMaskSize = 400;
export const defaultGlowHoverIntensity = 0.15;
