"use client";

import GitHubStarsAnimation from "@/components/smoothui/github-stars-animation";

interface GitHubStarsAnimationDemoProps {
  owner?: string;
  repo?: string;
  maxAvatars?: number;
  compactMaxAvatars?: number;
}

export function GitHubStarsAnimationDemo({
  owner = "educlopez",
  repo = "smoothui",
  maxAvatars = 5,
  compactMaxAvatars = 3,
}: GitHubStarsAnimationDemoProps) {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-8">
      <GitHubStarsAnimation
        maxAvatars={maxAvatars}
        owner={owner}
        repo={repo}
        showAvatars
      />
      <GitHubStarsAnimation
        maxAvatars={compactMaxAvatars}
        owner={owner}
        repo={repo}
        showAvatars={false}
      />
    </div>
  );
}
