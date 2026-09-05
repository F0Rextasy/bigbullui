"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface Section {
  id: string;
  label: string;
}

export interface ScrollSpyNavProps {
  sections: Section[];
  className?: string;
}

export function ScrollSpyNav({ sections, className }: ScrollSpyNavProps) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const refs = React.useRef<HTMLDivElement[]>(sections.map(() => null!));

  // IntersectionObserver to track active section
  React.useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach((_section, i) => {
      const element = refs.current[i];
      if (element) {
        const observer = new IntersectionObserver(
          (observed) => {
            observed.forEach((entry) => {
              if (entry.isIntersecting) {
                setActiveIndex(i);
              }
            });
          },
          { rootMargin: "-20% 0px" }
        );
        observer.observe(element);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [sections]);

  // Compute pill position based on active section ref offsets
  const pillRef = React.useRef<HTMLDivElement>(null!);
  const activeSectionRef = React.useRef<HTMLDivElement>(null!);

  React.useEffect(() => {
    const activeSection = sections[activeIndex];
    const element = refs.current[activeIndex];
    if (element) {
      activeSectionRef.current = element;
    }
  }, [activeIndex, sections]);

  const computePillPosition = React.useCallback(() => {
    const active = activeSectionRef.current;
    const pill = pillRef.current;
    if (!active || !pill) return;

    const rect = active.getBoundingClientRect();
    pill.style.transform = `translateX(${rect.left - 4}px) scaleX(${rect.width / 24 + 0.5})`;
  }, [activeSectionRef]);

  React.useEffect(() => {
    computePillPosition();
    const raf = requestAnimationFrame(() => computePillPosition());
    return () => cancelAnimationFrame(raf);
  }, [computePillPosition]);

  return (
    <div className={cn(
      "sticky top-0 z-10 bg-background border-b border-border/50 px-2 pt-1",
      className
    )}>
      {/* Sections */}
      <div className="flex space-x-1">
        {sections.map((section, i) => {
          const isActive = i === activeIndex;
          const onClick = () => {
            setActiveIndex(i);
            // Smooth scroll with reduced-motion respect
            const target = document.getElementById(section.id);
            if (target) {
              const prefersReducedMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)"
              );
              if (prefersReducedMotion.matches) {
                target.scrollIntoView({ behavior: "auto" });
              } else {
                target.scrollIntoView({ behavior: "smooth" });
              }
            }
          };

          return (
            <button
              key={section.id}
              className={cn(
                "rounded-sm px-3 py-1 text-sm font-mono uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors",
                isActive && "relative after:content-[''] after:absolute after:-bottom-1 after:left-1/2 -translate-x-1/2 after:w-0 after:h-0.5 after:bg-accent after:rounded-full after:transition-all after:duration-300 ease-out after:animate-[stamp_0.4s_ease-out_both]",
                isActive && "text-foreground after:z-10"
              )}
              onClick={onClick}
              aria-pressed={isActive}
              role="tab"
            >
              {section.label}
            </button>
          );
        })}
      </div>

      {/* Active indicator pill */}
      <div
        ref={pillRef}
        className={cn(
          "absolute bottom-0 left-1/2 -translate-x-1/2 h-1 w-6 rounded-full bg-accent/60 transition-transform duration-300 ease-out",
          "animate-[stamp_0.4s_ease-out_both]"
        )}
        style={{ transform: "translateX(0) scaleX(1)" }}
      />
    </div>
  );
}