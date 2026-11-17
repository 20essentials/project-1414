"use client";

import SmoothButton from "@/components/smoothui/smooth-button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useState } from "react";

const FRAME_OFFSET = -30;
const FRAMES_VISIBLE_LENGTH = 3;

function clamp(value: number, [min, max]: [number, number]): number {
  return Math.min(Math.max(value, min), max);
}

export interface Review {
  author: string;
  body: string;
  id: string | number;
  title: string;
}

interface ReviewCardProps {
  activeIndex: number;
  index: number;
  review: Review;
  totalCards: number;
}

function ReviewCard({
  review,
  index,
  activeIndex,
  totalCards,
}: ReviewCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const offsetIndex = index - activeIndex;
  const blur = activeIndex > index ? 2 : 0;
  const opacity = activeIndex > index ? 0 : 1;
  const scale = shouldReduceMotion
    ? 1
    : clamp(1 - offsetIndex * 0.08, [0.08, 2]);
  const y = shouldReduceMotion
    ? 0
    : clamp(offsetIndex * FRAME_OFFSET, [
        FRAME_OFFSET * FRAMES_VISIBLE_LENGTH,
        Number.POSITIVE_INFINITY,
      ]);
  const isActive = index === activeIndex;

  return (
    <motion.figure
      animate={{
        scale,
        transition: {
          damping: 20,
          duration: 0.25,
          mass: 0.5,
          stiffness: 250,
          type: "spring",
        },
        y,
      }}
      className="absolute left-1/2 w-[calc(100%-2rem)] max-w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-foreground/10 bg-background/80 p-4 shadow-lg backdrop-blur-md sm:p-6"
      initial={false}
      style={{
        borderWidth: 1 / scale,
        filter: `blur(${blur}px)`,
        opacity,
        pointerEvents: isActive ? "auto" : "none",
        top: "50%",
        transitionDuration: shouldReduceMotion ? "0ms" : "250ms",
        transitionProperty: "opacity, filter",
        transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        willChange: "opacity, filter, transform",
        zIndex: totalCards - index,
      }}
    >
      <blockquote className="relative">
        <div className="absolute -top-1 -left-2 text-4xl leading-none text-foreground/10 dark:text-foreground/5">
          &ldquo;
        </div>
        <p className="relative text-sm leading-relaxed text-foreground/80">
          {review.body}
        </p>
      </blockquote>
      <figcaption className="mt-4 flex items-center gap-2 border-t border-foreground/5 pt-4">
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-foreground">
            {review.author}
          </span>
          <span className="text-xs text-foreground/50">{review.title}</span>
        </div>
      </figcaption>
    </motion.figure>
  );
}

interface NavigationButtonProps {
  direction: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
}

function NavigationButton({
  direction,
  onClick,
  disabled,
}: NavigationButtonProps) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;

  return (
    <SmoothButton
      aria-label={direction === "prev" ? "Previous review" : "Next review"}
      className="box-gen relative z-0 size-7 border-[0.5px] border-foreground/10 bg-background/50 backdrop-blur-sm disabled:opacity-30 dark:border-foreground/5 dark:bg-foreground/5"
      disabled={disabled}
      onClick={onClick}
      shape="pill"
      size="icon-sm"
      type="button"
      variant="ghost"
    >
      <Icon className="size-3.5 text-foreground/60" />
    </SmoothButton>
  );
}

export interface ReviewsCarouselProps {
  autoPlay?: boolean;
  autoPlayInterval?: number;
  className?: string;
  excludeIds?: (string | number)[];
  height?: string;
  reviews: Review[];
  showIndicators?: boolean;
  showNavigation?: boolean;
}

export default function ReviewsCarousel({
  reviews,
  className = "",
  height = "300px",
  excludeIds = [],
  showIndicators = true,
  showNavigation = true,
  autoPlay = false,
  autoPlayInterval = 5000,
}: ReviewsCarouselProps) {
  const filteredReviews = useMemo(() => {
    if (excludeIds.length === 0) {
      return reviews;
    }

    const excludeSet = new Set(excludeIds);
    return reviews.filter((review) => !excludeSet.has(review.id));
  }, [reviews, excludeIds]);

  const maxIndex = filteredReviews.length - 1;
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!autoPlay || maxIndex < 0) {
      return;
    }

    const interval = setInterval(() => {
      setActiveIndex((previousIndex) =>
        previousIndex >= maxIndex ? 0 : previousIndex + 1,
      );
    }, autoPlayInterval);

    return () => {
      clearInterval(interval);
    };
  }, [autoPlay, autoPlayInterval, maxIndex]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowLeft") {
        setActiveIndex((index) => clamp(index - 1, [0, maxIndex]));
      } else if (event.key === "ArrowRight") {
        setActiveIndex((index) => clamp(index + 1, [0, maxIndex]));
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [maxIndex]);

  const goToPrevious = () => {
    setActiveIndex((previousIndex) =>
      previousIndex > 0 ? previousIndex - 1 : previousIndex,
    );
  };

  const goToNext = () => {
    setActiveIndex((previousIndex) =>
      previousIndex < maxIndex ? previousIndex + 1 : previousIndex,
    );
  };

  if (filteredReviews.length === 0) {
    return null;
  }

  return (
    <div
      className={cn("relative mx-auto w-full max-w-4xl", className)}
      style={{ height }}
    >
      <div className="relative h-full w-full py-8">
        <div className="grid h-full w-full place-items-center">
          {filteredReviews.map((review, index) => (
            <ReviewCard
              activeIndex={activeIndex}
              index={index}
              key={review.id}
              review={review}
              totalCards={filteredReviews.length}
            />
          ))}
        </div>
      </div>
      {showNavigation || showIndicators ? (
        <div className="absolute bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2">
          {showNavigation ? (
            <NavigationButton
              direction="prev"
              disabled={activeIndex <= 0}
              onClick={goToPrevious}
            />
          ) : null}
          {showIndicators ? (
            <div className="flex items-center gap-2">
              {filteredReviews.map((review, index) => (
                <button
                  aria-label={`Ir al testimonio ${index + 1}`}
                  className={cn(
                    "h-2 rounded-full transition-[width,background-color] duration-200",
                    index === activeIndex
                      ? "w-8 bg-brand"
                      : "w-2 bg-brand/30 hover:bg-brand/50",
                  )}
                  key={review.id}
                  onClick={() => {
                    setActiveIndex(index);
                  }}
                  type="button"
                />
              ))}
            </div>
          ) : null}
          {showNavigation ? (
            <NavigationButton
              direction="next"
              disabled={activeIndex === maxIndex}
              onClick={goToNext}
            />
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
