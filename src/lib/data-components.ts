import AgentAvatars from "@/components/smoothui/agent-avatar/agent-avatars";
import { AnimatedOtpInputShowcase } from "@/components/smoothui/animated-o-t-p-input";
import { BasicAccordion } from "@/components/smoothui/basic-accordion";
import type { ComponentType } from "react";

export const components: {
  title: string;
  Component: ComponentType;
  url: string;
}[] = [
  {
    title: "Animated O T P Input",
    Component: AnimatedOtpInputShowcase,
    url: "https://smoothui.dev/docs/components/animated-o-t-p-input",
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
