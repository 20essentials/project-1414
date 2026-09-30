import AgentAvatars from "@/components/smoothui/agent-avatar/agent-avatars";
import { BasicAccordion } from "@/components/smoothui/basic-accordion";
import type { ComponentType } from "react";

export const components: {
  title: string;
  Component: ComponentType;
  url: string;
}[] = [
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
