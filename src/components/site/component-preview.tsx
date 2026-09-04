"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip } from "@/components/ui/tooltip";
import { Dialog, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CometButton } from "@/components/ui/comet-button";

const previews: Record<string, React.ComponentType> = {
  button: () => (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
      <Button size="sm">Small</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
  input: () => (
    <div className="grid w-full max-w-sm gap-3">
      <Input type="email" placeholder="Email" />
      <Input disabled placeholder="Disabled" />
    </div>
  ),
  card: () => (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>bigbullui</CardTitle>
        <CardDescription>Copy-paste components.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">Animated, accessible, typed.</p>
      </CardContent>
    </Card>
  ),
  badge: () => (
    <div className="flex flex-wrap justify-center gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="accent">Accent</Badge>
    </div>
  ),
  "comet-button": () => (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <CometButton>Launch</CometButton>
      <CometButton variant="accent">Get started</CometButton>
      <CometButton size="lg">Big action</CometButton>
    </div>
  ),
  accordion: () => (
    <Accordion type="single" defaultValue="what" className="w-full max-w-sm">
      <AccordionItem value="what">
        <AccordionTrigger>What is bigbullui?</AccordionTrigger>
        <AccordionContent>A copy-paste library of animated React components.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="free">
        <AccordionTrigger>Is it free?</AccordionTrigger>
        <AccordionContent>MIT licensed — free for personal and commercial use.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
  tabs: () => (
    <Tabs defaultValue="one" className="w-full max-w-sm">
      <TabsList>
        <TabsTrigger value="one">Preview</TabsTrigger>
        <TabsTrigger value="two">Code</TabsTrigger>
        <TabsTrigger value="three">API</TabsTrigger>
      </TabsList>
      <TabsContent value="one">Preview panel content.</TabsContent>
      <TabsContent value="two">Code panel content.</TabsContent>
      <TabsContent value="three">API panel content.</TabsContent>
    </Tabs>
  ),
  tooltip: () => (
    <Tooltip content="bigbullui tooltip">
      <Button variant="outline">Hover me</Button>
    </Tooltip>
  ),
  dialog: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <>
        <Button variant="outline" onClick={() => setOpen(true)}>
          Open dialog
        </Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogHeader>
            <DialogTitle>bigbullui dialog</DialogTitle>
            <DialogDescription>Built from scratch with a focus trap and Escape handling.</DialogDescription>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">Press Esc or click outside to close.</p>
          <DialogFooter>
            <Button onClick={() => setOpen(false)}>Got it</Button>
          </DialogFooter>
        </Dialog>
      </>
    );
  },
};

export function ComponentPreview({ name }: { name: string }) {
  const Preview = previews[name];
  if (!Preview) {
    return <p className="text-sm text-muted-foreground">Preview not available.</p>;
  }
  return (
    <div className="flex min-h-44 items-center justify-center rounded-lg border border-border bg-secondary/50 p-8">
      <Preview />
    </div>
  );
}
