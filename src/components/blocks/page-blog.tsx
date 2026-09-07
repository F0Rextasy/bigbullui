"use client";

import * as React from "react";
import { Button } from "../ui/button";
import { ArticleCard } from "../ui/article-card";
import { PageHeader } from "../ui/page-header";

const TAGS = ["ALL", "GUIDES", "RELEASES", "STORIES"] as const;

const POSTS = [
  { title: "How we stamp 5,000 stubs a night", excerpt: "Gates, scanners, and the paper trail behind a smooth entry.", category: "GUIDES", author: "Ada Bull", readTime: "6 MIN READ", tag: "GUIDES" },
  { title: "Countdown boards go split-flap", excerpt: "Why the lobby display flipped back to mechanical type.", category: "RELEASES", author: "Grace Hopper", readTime: "4 MIN READ", tag: "RELEASES" },
  { title: "The encore ballot returns", excerpt: "Holders vote the final song with torn stubs.", category: "STORIES", author: "Alan Turing", readTime: "8 MIN READ", tag: "STORIES" },
  { title: "Quota bars for busy box offices", excerpt: "Reading the usage meter before the rush hits.", category: "GUIDES", author: "Linus Torvalds", readTime: "5 MIN READ", tag: "GUIDES" },
  { title: "Night stub theme after dark", excerpt: "Design notes on the cream and ink pairing.", category: "RELEASES", author: "Ada Bull", readTime: "3 MIN READ", tag: "RELEASES" },
  { title: "A holder since 2019", excerpt: "One dossier, 142 stubs, zero no-shows.", category: "STORIES", author: "Grace Hopper", readTime: "7 MIN READ", tag: "STORIES" },
];

export function PageBlog() {
  const [active, setActive] = React.useState<(typeof TAGS)[number]>("ALL");
  const visible = POSTS.filter((post) => active === "ALL" || post.tag === active);

  return (
    <div className="w-full space-y-6">
      <PageHeader
        eyebrow="JOURNAL // ALL POSTS"
        title="From the box office"
        description="Guides, releases, and holder stories from the counter."
      />
      <div className="flex flex-wrap gap-2">
        {TAGS.map((tag) => (
          <Button key={tag} size="sm" variant={active === tag ? "default" : "outline"} onClick={() => setActive(tag)}>
            {tag}
          </Button>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {visible.map((post) => (
          <div key={post.title} className="min-w-0">
            <ArticleCard title={post.title} excerpt={post.excerpt} category={post.category} author={post.author} readTime={post.readTime} />
          </div>
        ))}
      </div>
    </div>
  );
}
