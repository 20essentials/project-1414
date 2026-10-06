"use client";

import {
  AIBranch,
  AIBranchMessages,
  AIBranchNext,
  AIBranchPage,
  AIBranchPrevious,
  AIBranchSelector,
} from "@/components/smoothui/ai-branch";
import AIMessage from "@/components/smoothui/ai-message";
import SiriOrb from "@/components/smoothui/siri-orb";
import { cn } from "@/lib/utils";
import {
  type AIBranchTurn,
  defaultAIBranchIndex,
  defaultAIBranchOrbSize,
  defaultAIBranchTurns,
} from "./default-data";

export interface AIBranchDemoProps {
  /** Conversation turns. One turn becomes one branch. */
  turns?: AIBranchTurn[];
  /** Branch shown first */
  defaultBranch?: number;
  /** Show the assistant orb avatar on each reply */
  showAvatar?: boolean;
  /** Diameter of the assistant orb */
  orbSize?: string;
  /** Hide the prev / page / next controls */
  hideSelector?: boolean;
  /** Fired with the new index whenever the branch changes */
  onBranchChange?: (branchIndex: number) => void;
  className?: string;
}

/**
 * Showcase: composes the compound parts and owns the branch list, so the
 * homepage can render it as <AIBranchDemo /> with no props.
 */
export function AIBranchDemo({
  turns = defaultAIBranchTurns,
  defaultBranch = defaultAIBranchIndex,
  showAvatar = true,
  orbSize = defaultAIBranchOrbSize,
  hideSelector = false,
  onBranchChange,
  className,
}: AIBranchDemoProps) {
  return (
    <div className={cn("flex w-full flex-col justify-center", className)}>
      <AIBranch defaultBranch={defaultBranch} onBranchChange={onBranchChange}>
        <AIBranchMessages>
          {turns.map((turn) => (
            <div className="space-y-4" key={turn.assistant}>
              <AIMessage from="user">{turn.user}</AIMessage>

              <AIMessage
                avatar={
                  showAvatar ? (
                    <SiriOrb size={orbSize} state="done" />
                  ) : undefined
                }
                copyText={turn.assistant}
                from="assistant"
              >
                {turn.assistant}
              </AIMessage>

              {!hideSelector && (
                <AIBranchSelector from="assistant">
                  <AIBranchPrevious />
                  <AIBranchPage />
                  <AIBranchNext />
                </AIBranchSelector>
              )}
            </div>
          ))}
        </AIBranchMessages>
      </AIBranch>
    </div>
  );
}

export default AIBranchDemo;
