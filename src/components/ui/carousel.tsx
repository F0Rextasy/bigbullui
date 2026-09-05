"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export type CarouselItem = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export type CarouselSlide = {
  title: string;
  description: string;
};

export type CarouselProps = {
  items: CarouselItem[];
  autoplay?: boolean;
  interval?: number;
  className?: string;
};

const Carousel = React.forwardRef<
  HTMLDivElement,
  CarouselProps
>(({ items, autoplay = false, interval = 3000, className }, ref) => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  React.useEffect(() => {
    if (!autoplay) return;
    const id = setInterval(() => {
      setActiveIndex((i) => (i + 1) % items.length);
    }, interval);
    return () => clearInterval(id);
  }, [autoplay, interval, items.length]);

  const prev = () => setActiveIndex((i) => (i - 1 + items.length) % items.length);
  const next = () => setActiveIndex((i) => (i + 1) % items.length);

  return (
    <div
      ref={ref}
      className={cn(
        "relative overflow-hidden rounded-lg bg-card p-2",
        "motion-reduce:animate-none",
        className
      )}
    >
      <div
        className={cn(
          "relative flex transition-transform duration-500 ease-out",
          "motion-reduce:transition-none"
        )}
        style={{ transform: `translateX(${-activeIndex * 100}%)` }}
      >
        {items.map((item, index) => (
          <div
            key={item.title}
            className={cn(
              "relative flex flex-col items-center justify-center py-8 px-2 shrink-0",
              "motion-reduce:animate-none"
            )}
          >
            <h3 className="text-xl font-semibold text-foreground mb-1">{item.title}</h3>
            <p className="text-sm text-muted-foreground">{item.description}</p>
          </div>
        ))}
      </div>

      <div
        className={cn(
          "absolute top-0 left-0 right-0 flex justify-between p-2",
          "motion-reduce:animate-none"
        )}
      >
        <button
          onClick={prev}
          className={cn(
            "absolute left-2 rounded-md p-1.5 hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            "motion-reduce:transition-none"
          )}
          aria-label="Previous"
        >
          {"<"}
        </button>
        <button
          onClick={next}
          className={cn(
            "absolute right-2 rounded-md p-1.5 hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            "motion-reduce:transition-none"
          )}
          aria-label="Next"
        >
          {">"}
        </button>
      </div>
    </div>
  );
});

Carousel.displayName = "Carousel";

export { Carousel };

