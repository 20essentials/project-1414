import type { Event } from "@/components/smoothui/apple-invites";

const AVATAR_SIZE = 72;

const hostAvatar = (name: string) =>
  `https://ik.imagekit.io/16u211libb/smoothui/troupe-people-v2/${name}.webp?tr=w-${AVATAR_SIZE},h-${AVATAR_SIZE},f-auto`;

const eventImage = (scene: string) =>
  `https://ik.imagekit.io/16u211libb/smoothui/events/${scene}.webp?tr=w-640,h-900,f-auto`;

export const defaultInviteEvents: Event[] = [
  {
    badge: "Hosting",
    id: 1,
    image: eventImage("sunrise-yoga"),
    location: "Seafront Studio",
    participants: [{ avatar: hostAvatar("ananya-sharma") }],
    subtitle: "Sat, June 14 · 6:00 AM",
    title: "Sunrise Yoga",
  },
  {
    badge: "Going",
    id: 2,
    image: eventImage("supper-club"),
    location: "Rue Léon",
    participants: [{ avatar: hostAvatar("hiro-sato") }],
    subtitle: "Fri, June 20 · 8:00 PM",
    title: "Supper Club",
  },
  {
    badge: "Going",
    id: 3,
    image: eventImage("dawn-patrol"),
    location: "Praia do Amado",
    participants: [{ avatar: hostAvatar("theo-miller") }],
    subtitle: "Sun, June 22 · 7:30 AM",
    title: "Dawn Patrol",
  },
  {
    badge: "Interested",
    id: 4,
    image: eventImage("open-air-cinema"),
    location: "Garden Cinema",
    participants: [{ avatar: hostAvatar("nia-brooks") }],
    subtitle: "Thu, June 26 · 9:00 PM",
    title: "Open-Air Cinema",
  },
];
