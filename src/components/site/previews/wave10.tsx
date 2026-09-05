"use client";

import * as React from "react";
import { TabBar } from "@/components/ui/tabbar";
import { PagerDots } from "@/components/ui/pager-dots";
import { Toc } from "@/components/ui/toc";
import { AppShell } from "@/components/ui/app-shell";
import { SkipLink } from "@/components/ui/skip-link";
import { BackLink } from "@/components/ui/back-link";
import { FlyoutMenu } from "@/components/ui/flyout-menu";
import { ScrollSpyNav } from "@/components/ui/scroll-spy-nav";

export const wave10Previews: Record<string, React.ComponentType> = {
  tabbar: () => {
    const items = [
      { id: "1", label: "HOME", icon: "M12 5v14l11-4-11-4z" },
      { id: "2", label: "PROFILE", icon: "M12 5v14l11-4-11-4z" },
      { id: "3", label: "SETTINGS", icon: "M12 5v14l11-4-11-4z" },
      { id: "4", label: "HELP", icon: "M12 5v14l11-4-11-4z" },
    ];

    return (
      <TabBar
        items={items}
        value="1"
        onValueChange={() => {}}
      />
    );
  },

  "pager-dots": () => {
    const pages = 5;

    return (
      <PagerDots
        count={pages}
        value={2}
        onValueChange={() => {}}
        variant="dots"
      />
    );
  },

  toc: () => {
    const headings: { id: string; text: string; level: 2 | 3 }[] = [
      { id: "intro", text: "Introduction", level: 2 },
      { id: "features", text: "Features", level: 2 },
      { id: "usage", text: "Usage", level: 3 },
      { id: "api", text: "API", level: 2 },
    ];

    return <Toc headings={headings} />;
  },

  "app-shell": () => {
    return (
      <AppShell
        defaultCollapsed={false}
      >
        <header>
          <h1 className="text-xl font-medium">Ticket Stub</h1>
        </header>
        <aside>
          <nav>
            <ul className="space-y-2">
              <li>
                <button className="rounded-md py-1 pl-2 pr-4 text-sm">Nav Item</button>
              </li>
              <li>
                <button className="rounded-md py-1 pl-2 pr-4 text-sm">Nav Item</button>
              </li>
            </ul>
          </nav>
        </aside>
        <main>
          <p className="prose max-w-none">
            Main content area. This is the main content area.
          </p>
        </main>
      </AppShell>
    );
  },

  "skip-link": () => {
    return (
      <SkipLink
        href="#main"
      />
    );
  },

  "back-link": () => {
    return (
      <BackLink
        href="#"
        label="Back"
      />
    );
  },

  "flyout-menu": () => {
    const items = [
      { id: "1", label: "Option 1", shortcut: "⌘1" },
      { id: "2", label: "Option 2", shortcut: "⌘2" },
      { id: "3", label: "Option 3", shortcut: "⌘3" },
    ];

    return (
      <FlyoutMenu
        trigger={<div className="px-4 py-2 bg-secondary text-secondary-foreground">Menu</div>}
        items={items}
        onSelect={(id) => console.log(id)}
      />
    );
  },

  "scroll-spy-nav": () => {
    const sections = [
      { id: "section-1", label: "Section 1" },
      { id: "section-2", label: "Section 2" },
      { id: "section-3", label: "Section 3" },
      { id: "section-4", label: "Section 4" },
    ];

    return <ScrollSpyNav sections={sections} />;
  },
};