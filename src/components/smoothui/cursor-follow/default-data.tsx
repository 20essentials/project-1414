export interface CursorFollowImage {
  id: number;
  label: string;
  src: string;
}

export const defaultCursorFollowImages: CursorFollowImage[] = [
  {
    id: 1,
    label: "Nova",
    src: "https://picsum.photos/seed/smoothui-nova/384/682",
  },
  {
    id: 2,
    label: "Atlas",
    src: "https://picsum.photos/seed/smoothui-atlas/384/682",
  },
];
