export type AIBranchTurn = {
  user: string;
  assistant: string;
};

export const defaultAIBranchTurns: AIBranchTurn[] = [
  {
    user: "How do I implement authentication in Next.js?",
    assistant:
      "Here are several approaches for implementing authentication in Next.js. The most common ones are Auth.js, Clerk, Supabase Auth, and rolling your own session cookies.",
  },
  {
    user: "What about using NextAuth.js specifically?",
    assistant:
      "NextAuth.js is an excellent choice. Wrap your app in SessionProvider, define a Credentials provider, and read the session from a server component via getServerSession.",
  },
  {
    user: "How do I protect a route group with it?",
    assistant:
      "Create a layout inside the route group that redirects unauthenticated users to your sign-in page. Server layouts run on every request, so the guard is never skipped.",
  },
];

export const defaultAIBranchIndex = 0;

export const defaultAIBranchOrbSize = "26px";
