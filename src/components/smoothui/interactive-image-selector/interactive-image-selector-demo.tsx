"use client";

import InteractiveImageSelector, {
  type ImageData,
} from "@/components/smoothui/interactive-image-selector";
import { interactiveImageSelectorDemoImages } from "@/components/smoothui/interactive-image-selector/default-data";
import { useEffect, useState } from "react";

export interface InteractiveImageSelectorDemoProps {
  images?: ImageData[];
}

export function InteractiveImageSelectorDemo({
  images = interactiveImageSelectorDemoImages,
}: InteractiveImageSelectorDemoProps = {}) {
  const [selected, setSelected] = useState<number[]>([]);
  const [displayedImages, setDisplayedImages] = useState<ImageData[]>(images);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    if (!notification) {
      return;
    }

    const timer = setTimeout(() => setNotification(null), 3000);
    return () => clearTimeout(timer);
  }, [notification]);

  const handleShare = (sharedImages: number[]) => {
    setNotification(`Share images: ${sharedImages.join(", ")}`);
  };

  return (
    <div className="relative flex w-full flex-col items-center justify-center p-4">
      {notification ? (
        <div className="absolute top-4 right-4 z-50 rounded-lg border border-border bg-background px-4 py-2 text-sm shadow-lg">
          {notification}
        </div>
      ) : null}
      <InteractiveImageSelector
        images={displayedImages}
        onChange={setSelected}
        onDelete={(deleted) =>
          setDisplayedImages((currentImages) =>
            currentImages.filter((image) => !deleted.includes(image.id)),
          )
        }
        onShare={handleShare}
        selectable={false}
        selectedImages={selected}
      />
    </div>
  );
}
