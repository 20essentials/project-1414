import { AIBranchDemo } from "@/components/smoothui/ai-branch/ai-branch-demo";
import AgentAvatars from "@/components/smoothui/agent-avatar/agent-avatars";
import { AnimatedOTPInputDemo } from "@/components/smoothui/animated-o-t-p-input/animated-o-t-p-input-demo";
import { AnimatedProgressBarDemo } from "@/components/smoothui/animated-progress-bar/animated-progress-bar-demo";
import AnimatedToggleDemo from "@/components/smoothui/animated-toggle/animated-toggle-demo";
import { BasicAccordion } from "@/components/smoothui/basic-accordion";
import type { ComponentType } from "react";

export const components: {
  title: string;
  Component: ComponentType;
  url: string;
}[] = [
  {
    title: "AI Branch",
    Component: AIBranchDemo,
    url: "https://smoothui.dev/docs/components/ai-branch",
  },
  {
    title: "Animated OTP Input",
    Component: AnimatedOTPInputDemo,
    url: "https://smoothui.dev/docs/components/animated-o-t-p-input",
  },
  {
    title: "Animated Progress Bar",
    Component: AnimatedProgressBarDemo,
    url: "https://smoothui.dev/docs/components/animated-progress-bar",
  },
  {
    title: "Animated Toggle",
    Component: AnimatedToggleDemo,
    url: "https://smoothui.dev/docs/components/animated-toggle",
  },
  {
    title: "Basic Accordion",
    Component: BasicAccordion,
    url: "https://smoothui.dev/docs/components/accordion",
  },
  {
    title: "Agent Avatar",
    Component: AgentAvatars,
    url: "https://smoothui.dev/docs/components/agent-avatar",
  },
];
