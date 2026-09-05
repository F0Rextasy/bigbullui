"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface ArticleCardProps {
  title: string;
  excerpt: string;
  category?: string;
  author?: string;
  readTime?: string;
  image?: string;
  className?: string;
}

const FadeInUp = "animate-fade-in-up fade-in-up-0s";
const SlideIn = "article-category-slide-in";

export function ArticleCard({
  title,
  excerpt,
  category,
  author,
  readTime,
  image,
  className,
}: ArticleCardProps) {
  return (
    <div
      className={cn(
        "group relative w-full rounded-lg border border-foreground bg-card text-card-foreground overflow-hidden h-full transition-all duration-300 hover:translate-y-1 hover:shadow-lg motion-reduce:transition-none motion-reduce:translate-y-0 motion-reduce:shadow-none",
        className
      )}
    >
      {/* Image section */}
      {image && (
        <div className="h-48 aspect-[4/3] overflow-hidden">
          <img
            src={image}
            alt={title}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none group-hover:scale-1"
            loading="lazy"
          />
        </div>
      )}

      <div className="p-5 flex flex-col flex-1 gap-3">
        {/* Category badge */}
        {category && (
          <div
            className={cn(
              "inline-flex items-center rounded border border-dashed border-border text-xs font-mono uppercase tracking-widest px-2 py-0.5 text-muted-foreground",
              "bg-secondary/10",
              SlideIn
            )}
          >
            {category}
          </div>
        )}

        <h4 className="font-medium line-clamp-2 flex-1 transition-colors group-hover:text-accent">{title}</h4>

        {/* Meta row */}
        <div className="flex items-baseline gap-3 text-xs text-muted-foreground">
          {author && (
            <span>
              {author}
            </span>
          )}
          {readTime && (
            <span>
              {readTime} min read
            </span>
          )}
        </div>
      </div>
    </div>
  );
}