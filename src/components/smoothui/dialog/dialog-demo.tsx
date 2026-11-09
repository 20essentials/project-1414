"use client";

import Dialog from "@/components/smoothui/dialog";
import SmoothButton from "@/components/smoothui/smooth-button";
import { useState } from "react";

export function DialogDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex w-full flex-col items-center justify-center p-8">
      <SmoothButton onClick={() => setOpen(true)} variant="candy">
        Edit profile
      </SmoothButton>

      <Dialog
        description="Update your public profile details."
        footer={
          <SmoothButton onClick={() => setOpen(false)} variant="candy">
            Save
          </SmoothButton>
        }
        onOpenChange={setOpen}
        open={open}
        title="Edit profile"
      >
        <p className="text-sm text-muted-foreground">
          Changes apply to your workspace profile and public bio.
        </p>
      </Dialog>
    </div>
  );
}

export default DialogDemo;
