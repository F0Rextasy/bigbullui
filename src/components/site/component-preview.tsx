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

const previews: Record<string, React.ComponentType> = {
  button: () => (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button>Admit one</Button>
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
      <Input type="text" placeholder="Ticket code" />
      <Input disabled placeholder="Disabled" />
    </div>
  ),
  card: () => (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Front row</CardTitle>
        <CardDescription>Row C · Seat 12 · No refunds</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">Keep this stub until the end of the show.</p>
      </CardContent>
    </Card>
  ),
  badge: () => (
    <div className="flex flex-wrap justify-center gap-2">
      <Badge>VIP</Badge>
      <Badge variant="secondary">New</Badge>
      <Badge variant="outline">Standby</Badge>
      <Badge variant="accent">Sold out</Badge>
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
    <Tooltip content="Row C · Seat 12">
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
            <DialogTitle>Order confirmed</DialogTitle>
            <DialogDescription>Your stub is ready. Keep it until the end of the show.</DialogDescription>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">Press Esc or click outside to close.</p>
          <DialogFooter>
            <Button onClick={() => setOpen(false)}>Done</Button>
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
