import type { AppData } from "./index";

const APP_ICON_BASE = "https://ik.imagekit.io/16u211libb/smoothui/app-icons";

/**
 * A creative-work starter set, so the stack reads as a considered bundle
 * rather than five unrelated apps. Icons served from ImageKit at 128px.
 */
export const defaultDemoApps: AppData[] = [
  {
    icon: `${APP_ICON_BASE}/final-cut-pro-create-video.png?tr=w-128`,
    id: 1,
    name: "Final Cut Pro",
  },
  {
    icon: `${APP_ICON_BASE}/logic-pro-make-music.png?tr=w-128`,
    id: 2,
    name: "Logic Pro",
  },
  {
    icon: `${APP_ICON_BASE}/pixelmator-pro-edit-images.png?tr=w-128`,
    id: 3,
    name: "Pixelmator Pro",
  },
  {
    icon: `${APP_ICON_BASE}/motion-animate-effects.png?tr=w-128`,
    id: 4,
    name: "Motion",
  },
  {
    icon: `${APP_ICON_BASE}/compressor-encode-media.png?tr=w-128`,
    id: 5,
    name: "Compressor",
  },
];

export const defaultDemoTitle = "Starter Mac";
