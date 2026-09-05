import * as React from "react";
import { cn } from "./lib/utils";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatarInitials?: string;
  link?: { label: string; href: string };
}

export interface TeamGridProps {
  members: TeamMember[];
  columns?: 2 | 3 | 4;
  className?: string;
}

function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function TeamGrid({ members, columns = 3, className }: TeamGridProps) {
  return (
    <div
      className={cn(
        "grid gap-4",
        columns === 2 && "grid-cols-1 sm:grid-cols-2",
        columns === 3 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
        columns === 4 && "grid-cols-2 lg:grid-cols-4",
        className
      )}
    >
      {members.map((member, index) => (
        <div
          key={member.id}
          className="group rounded-md border-2 border-dashed border-border bg-card p-6 text-center transition-transform duration-200 hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0 animate-[fade-in-up_0.3s_ease-out_both] motion-reduce:animate-none"
          style={{ animationDelay: `${index * 40}ms` }}
        >
          <span className="mx-auto flex size-12 items-center justify-center rounded-full border border-border bg-secondary font-mono text-sm font-bold text-secondary-foreground">
            {member.avatarInitials ?? initials(member.name)}
          </span>
          <p className="mt-3 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-foreground">{member.name}</p>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">{member.role}</p>
          {member.link && (
            <a
              href={member.link.href}
              className="mt-3 inline-block font-mono text-[10px] uppercase tracking-[0.15em] text-accent underline-offset-4 transition-colors duration-200 hover:text-accent-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
            >
              {member.link.label}
            </a>
          )}
        </div>
      ))}
    </div>
  );
}
