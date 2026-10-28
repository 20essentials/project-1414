"use client";

import AppleInvites, { type Event } from "@/components/smoothui/apple-invites";
import { defaultInviteEvents } from "./default-data";

interface AppleInvitesDemoProps {
  /** Card width in px. The wrapper height derives from this, so stack cards stay visible */
  cardWidth?: number;
  aspectRatio?: number;
  events?: Event[];
}

const AppleInvitesDemo = ({
  cardWidth = 260,
  aspectRatio = 1.5625,
  events = defaultInviteEvents,
}: AppleInvitesDemoProps) => (
  <div
    className="flex w-full flex-col items-center justify-center"
    style={{ height: cardWidth * aspectRatio }}
  >
    <AppleInvites
      aspectRatio={aspectRatio}
      cardWidth={cardWidth}
      events={events}
    />
  </div>
);

export default AppleInvitesDemo;
