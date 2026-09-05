"use client";

import * as React from "react";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { List, ListItem } from "@/components/ui/list";
import { Quote } from "@/components/ui/quote";
import { Figure } from "@/components/ui/figure";
import { DescriptionList } from "@/components/ui/description-list";
import { PageHeader } from "@/components/ui/page-header";
import { Hero } from "@/components/ui/hero";
import { Footer } from "@/components/ui/footer";
import { MediaObject } from "@/components/ui/media-object";
import { LinkCard } from "@/components/ui/link-card";
import { LogoCloud } from "@/components/ui/logo-cloud";
import { Faq } from "@/components/ui/faq";
import { Testimonial } from "@/components/ui/testimonial";
import { TeamGrid } from "@/components/ui/team-grid";
import { FeatureGrid } from "@/components/ui/feature-grid";
import { CtaSection } from "@/components/ui/cta-section";

export const wave2Previews: Record<string, React.ComponentType> = {
  heading: () => {
    return (
      <Heading level={1} eyebrow="Banner Edition">
        <Heading level={2}>Main Heading</Heading>
        <Heading level={3} size="sm">Sub Heading</Heading>
      </Heading>
    );
  },

  text: () => {
    return (
      <Text variant="lead">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </Text>
    );
  },

  list: () => {
    return (
      <List variant="numbered">
        <ListItem id="1" title="Item One">
          Content for the first item.
        </ListItem>
        <ListItem id="2" title="Item Two">
          Content for the second item.
        </ListItem>
        <ListItem id="3" title="Item Three">
          Content for the third item.
        </ListItem>
      </List>
    );
  },

  quote: () => {
    return (
      <Quote cite="Jane Doe" author="Founder">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </Quote>
    );
  },

  figure: () => {
    return (
      <Figure
        src="/placeholder-600x400.png"
        alt="Product illustration"
        caption="Product features illustration"
      />
    );
  },

  "description-list": () => {
    return (
      <DescriptionList items={[
        { term: "Term 1", description: "Description for term one." },
        { term: "Term 2", description: "Description for term two." },
        { term: "Term 3", description: "Description for term three." },
      ]} />
    );
  },

  "page-header": () => {
    return (
      <PageHeader
        title="Page Title"
        description="Page description goes here"
        eyebrow="Header"
        actions={<span className="rounded-sm border border-dashed border-border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Export</span>}
      />
    );
  },

  hero: () => {
    return (
      <Hero
        title="Build Better Interfaces"
        highlight="bigbullui"
        description="A comprehensive React component library for modern web sites."
        primaryAction={{ label: "Get Started", href: "/docs" }}
        secondaryAction={{ label: "Contact Us", href: "/contact" }}
      />
    );
  },

  footer: () => {
    return (
      <Footer columns={[
        { title: "Product", links: [
          { label: "Features", href: "/" },
          { label: "Roadmap", href: "/roadmap" },
        ]},
        { title: "Company", links: [
          { label: "About", href: "/about" },
          { label: "Careers", href: "/careers" },
        ]},
        { title: "Legal", links: [
          { label: "Terms", href: "/terms" },
          { label: "Privacy", href: "/privacy" },
        ]},
      ]} />
    );
  },

  "media-object": () => {
    return (
      <MediaObject
        src="/placeholder-400x300.png"
        alt="Product screenshot"
        title="Product Title"
        description="A brief description of the product featured in the screenshot."
      />
    );
  },

  "link-card": () => {
    return (
      <LinkCard
        href="/product/1"
        title="Product Name"
        description="An amazing product with great features"
        external={true}
      />
    );
  },

  "logo-cloud": () => {
    return (
      <LogoCloud logos={["A", "B", "C", "D", "E"]} scrolling />
    );
  },

  "faq": () => {
    return (
      <Faq items={[
        { question: "How do I get started?", answer: "Get started by reading the documentation and exploring the components." },
        { question: "What components are available?", answer: "We have 17 components including heading, text, list, and more." },
        { question: "Is it free to use?", answer: "Yes, bigbullui is open source under the MIT license." },
      ]} defaultOpen={0} />
    );
  },

  testimonial: () => {
    return (
      <Testimonial
        avatarInitials="JS"
        name="John Smith"
        role="Product Designer"
        stars={4}
      />
    );
  },

  "team-grid": () => {
    return (
      <TeamGrid members={[
        { id: "1", name: "Alice Johnson", role: "Lead Designer", avatarInitials: "AJ" },
        { id: "2", name: "Bob Wilson", role: "Frontend Developer", avatarInitials: "BW" },
        { id: "3", name: "Carol Taylor", role: "Product Manager", avatarInitials: "CT" },
      ]} />
    );
  },

  "feature-grid": () => {
    return (
      <FeatureGrid items={[
        { id: "1", title: "Fast", description: "Lightning fast performance." },
        { id: "2", title: "Beautiful", description: "Beautiful design that delights users." },
        { id: "3", title: "Accessible", description: "Built with accessibility in mind." },
      ]} />
    );
  },

  "cta-section": () => {
    return (
      <CtaSection
        title="Start Building Today"
        highlight="bigbullui"
        copy="Join thousands of developers who are building better interfaces with bigbullui components."
        action={{ label: "Get Docs", href: "/docs" }}
      />
    );
  },
};