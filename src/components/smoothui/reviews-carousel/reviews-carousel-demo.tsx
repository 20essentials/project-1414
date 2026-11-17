"use client";

import ReviewsCarousel, {
  type Review,
} from "@/components/smoothui/reviews-carousel";
import { cn } from "@/lib/utils";
import { defaultReviews } from "./default-data";

export interface ReviewsCarouselDemoProps {
  reviews?: Review[];
  className?: string;
}

export function ReviewsCarouselDemo({
  reviews = defaultReviews,
  className,
}: ReviewsCarouselDemoProps) {
  return (
    <div
      className={cn(
        "flex w-full flex-col items-center justify-center py-8",
        className,
      )}
    >
      <div className="w-full max-w-4xl">
        <ReviewsCarousel height="300px" reviews={reviews} />
      </div>
    </div>
  );
}

export default ReviewsCarouselDemo;
