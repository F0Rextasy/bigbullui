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
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Avatar } from "@/components/ui/avatar";
import { Alert } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";

// P1
import { Select } from "@/components/ui/select";
import { Stepper } from "@/components/ui/stepper";
import { PinInput } from "@/components/ui/pin-input";
import { Rating } from "@/components/ui/rating";
import { Pagination } from "@/components/ui/pagination";
import { Breadcrumb, BreadcrumbItem } from "@/components/ui/breadcrumb";
import { Steps } from "@/components/ui/steps";
import { ToggleGroup, ToggleItem } from "@/components/ui/toggle-group";
import { ToastProvider, useToast } from "@/components/ui/toast";
import { Sheet, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Empty } from "@/components/ui/empty";
import { Kbd } from "@/components/ui/kbd";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "@/components/ui/table";
import { Marquee } from "@/components/ui/marquee";

// P2
import { TicketCard } from "@/components/ui/ticket-card";
import { Barcode } from "@/components/ui/barcode";
import { StampSeal } from "@/components/ui/stamp-seal";
import { Spinner } from "@/components/ui/spinner";
import { Skeleton } from "@/components/ui/skeleton";
import { CopyButton } from "@/components/ui/copy-button";
import { Coupon } from "@/components/ui/coupon";
import { BoardingPass } from "@/components/ui/boarding-pass";
import { PriceTag } from "@/components/ui/price-tag";
import { LuggageTag } from "@/components/ui/luggage-tag";
import { Timeline } from "@/components/ui/timeline";
import { Sparkline } from "@/components/ui/sparkline";
import { Countdown } from "@/components/ui/countdown";
import { SearchBar } from "@/components/ui/search-bar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { CookieBanner } from "@/components/ui/cookie-banner";
import { BarChart } from "@/components/ui/bar-chart";
import { Combobox } from "@/components/ui/combobox";
import { FileDropzone } from "@/components/ui/file-dropzone";
import { ColorPicker } from "@/components/ui/color-picker";
import { PasswordStrength } from "@/components/ui/password-strength";
import { InlineEdit } from "@/components/ui/inline-edit";
import { Calendar } from "@/components/ui/calendar";
import { DataTable } from "@/components/ui/data-table";
import { ConfettiBurst } from "@/components/ui/confetti-burst";
import { CommandPalette } from "@/components/ui/command-palette";
import { ContextMenu } from "@/components/ui/context-menu";
import { ScrollTop } from "@/components/ui/scroll-top";
import { TimeInput } from "@/components/ui/time-input";
import { MaskedInput } from "@/components/ui/masked-input";
import { DatePicker } from "@/components/ui/date-picker";
import { Menubar } from "@/components/ui/menubar";
import { VideoFrame } from "@/components/ui/video-frame";
import { cn } from "@/components/ui/lib/utils";



/* Animated Component Previews */

function AnimatedProgressPreview() {
  const [val, setVal] = React.useState(35);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setVal((prev) => (prev >= 100 ? 10 : prev + 15));
    }, 800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="grid w-full max-w-sm gap-4 select-none">
      <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-accent animate-ping" />
          PRINTING STUBS...
        </span>
        <span className="font-bold font-mono text-accent">{val}%</span>
      </div>
      <Progress value={val} />
      <Progress value={75} />
    </div>
  );
}

function AnimatedBarcodePreview() {
  return (
    <div className="relative overflow-hidden rounded-xl border-2 border-foreground bg-card p-6 shadow-md select-none">
      <Barcode value="BB-2026-TICKET" height={52} />
      {/* Red Laser Sweep Line */}
      <div className="absolute inset-x-0 h-[2px] bg-accent shadow-[0_0_10px_var(--color-accent,#BC3A28)] animate-[laser_2.2s_ease-in-out_infinite]" />
    </div>
  );
}

function AnimatedStampSealPreview() {
  const [stampKey, setStampKey] = React.useState(0);

  return (
    <div className="flex flex-col items-center gap-5 select-none">
      <div key={stampKey} className="animate-[stamp_0.4s_ease-out]">
        <StampSeal text="ADMITTED" subtext="OFFICIAL" tone="accent" rotate={-8} />
      </div>
      <Button
        size="sm"
        variant="outline"
        onClick={() => setStampKey((prev) => prev + 1)}
        className="font-mono text-xs"
      >
        Press to Stamp Again
      </Button>
    </div>
  );
}

function AnimatedAvatarPreview() {
  return (
    <div className="flex items-center justify-center gap-6">
      <div className="relative">
        <Avatar name="Ada Bull" size="lg" />
        <span className="absolute bottom-0 right-0 flex size-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
          <span className="relative inline-flex size-3 rounded-full bg-accent" />
        </span>
      </div>
      <div className="relative">
        <Avatar name="Row C" />
        <span className="absolute bottom-0 right-0 size-2.5 rounded-full bg-primary" />
      </div>
      <Avatar name="VIP" size="sm" />
    </div>
  );
}

function AnimatedBadgePreview() {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      <Badge className="animate-[scale-in_0.3s_ease-out]">
        <span className="mr-1.5 size-1.5 rounded-full bg-primary-foreground animate-pulse" />
        LIVE ADMISSION
      </Badge>
      <Badge variant="accent" className="animate-[scale-in_0.3s_ease-out]">
        SOLD OUT
      </Badge>
      <Badge variant="secondary">STANDBY</Badge>
      <Badge variant="outline">BALCONY</Badge>
    </div>
  );
}

function AnimatedButtonPreview() {
  const [clicked, setClicked] = React.useState(false);

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button
        onClick={() => {
          setClicked(true);
          setTimeout(() => setClicked(false), 600);
        }}
        className={cn(clicked && "animate-[scale-in_0.2s_ease-out]")}
      >
        {clicked ? "Stamping..." : "Admit one"}
      </Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button size="sm">Small</Button>
    </div>
  );
}

function AnimatedCountdownPreview() {
  // Target date 3 days from now
  const target = React.useMemo(() => new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), []);
  return <Countdown targetDate={target} />;
}

function AnimatedSparklinePreview() {
  const [data, setData] = React.useState([10, 25, 18, 42, 35, 60, 52, 85, 78, 95]);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setData((prev) => {
        const nextVal = Math.floor(Math.random() * 50) + 40;
        return [...prev.slice(1), nextVal];
      });
    }, 1200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border bg-card">
      <span className="font-mono text-xs text-muted-foreground">TICKET SALES VELOCITY</span>
      <Sparkline data={data} width={200} height={50} tone="accent" />
    </div>
  );
}

function ToastTrigger() {
  const { toast } = useToast();
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        onClick={() =>
          toast({
            title: "Stub Admitted",
            description: "Section A, Row C, Seat 12 validated at Gate 3.",
          })
        }
      >
        Trigger Toast
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          toast({
            title: "Sold Out",
            tone: "accent",
            description: "No standby seats remaining for tonight.",
          })
        }
      >
        Accent Toast
      </Button>
    </div>
  );
}

function ToastPreview() {
  return (
    <ToastProvider>
      <ToastTrigger />
    </ToastProvider>
  );
}

function SheetPreview() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Open Sheet
      </Button>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetHeader>
          <SheetTitle>Ticket Summary</SheetTitle>
          <SheetDescription>Verify your admission stubs before gate arrival.</SheetDescription>
        </SheetHeader>
        <div className="mt-6 space-y-3 font-mono text-xs text-muted-foreground">
          <p>Order #BB-90210</p>
          <p>Admission: General Admission</p>
          <p>Doors open: 19:30</p>
        </div>
      </Sheet>
    </>
  );
}

function AnimatedPasswordStrengthPreview() {
  const samplePasswords = ["ticket", "Ticket123", "Ticket2026!", "BullSec#99"];
  const [idx, setIdx] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setIdx((prev) => (prev + 1) % samplePasswords.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [samplePasswords.length]);

  return (
    <div className="w-full max-w-sm rounded-xl border-2 border-foreground bg-card p-5 shadow-sm outline-1 outline-dashed outline-offset-[-4px]">
      <div className="mb-3 flex items-center justify-between text-[11px] font-mono text-muted-foreground">
        <span>CURRENT KEY:</span>
        <span className="font-bold text-accent">{samplePasswords[idx]}</span>
      </div>
      <PasswordStrength value={samplePasswords[idx]} />
    </div>
  );
}

function AnimatedConfettiPreview() {
  const [burstKey, setBurstKey] = React.useState(0);

  return (
    <div className="relative flex flex-col items-center gap-4 py-4 select-none">
      <Button
        onClick={() => setBurstKey((k) => k + 1)}
        className="font-mono text-xs uppercase"
      >
        ★ Celebrate Admission ★
      </Button>
      {burstKey > 0 && (
        <div key={burstKey} className="absolute inset-0 flex items-center justify-center">
          <ConfettiBurst active count={36} />
        </div>
      )}
      <span className="font-mono text-[11px] text-muted-foreground">
        Click button to fire Ticket Confetti
      </span>
    </div>
  );
}

function AnimatedCommandPalettePreview() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex flex-col items-center gap-3 select-none">
      <Button variant="outline" onClick={() => setOpen(true)} className="font-mono text-xs">
        <span className="mr-2">🔍</span> Open Command Palette (⌘K)
      </Button>
      <span className="font-mono text-[11px] text-muted-foreground">
        Press Esc or choose an option to close
      </span>
      <CommandPalette
        open={open}
        onOpenChange={setOpen}
        items={[
          { id: "1", label: "Print Ticket Stub", category: "Actions", shortcut: "⌘P" },
          { id: "2", label: "Inspect Seat Map", category: "Navigation", shortcut: "⌘M" },
          { id: "3", label: "Switch to Night Stub Theme", category: "Preferences", shortcut: "⌘T" },
          { id: "4", label: "Revoke Admission", category: "Security", shortcut: "⌘R" },
        ]}
      />
    </div>
  );
}

function AnimatedContextMenuPreview() {
  return (
    <ContextMenu
      items={[
        { id: "admit", label: "Admit Stub", shortcut: "↵" },
        { id: "print", label: "Print Pass", shortcut: "⌘P" },
        "separator",
        { id: "transfer", label: "Transfer Seat", shortcut: "⌘T" },
        { id: "void", label: "Void Ticket", danger: true, shortcut: "⌫" },
      ]}
    >
      <div className="flex min-h-[120px] w-full max-w-sm cursor-context-menu flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-card p-6 text-center shadow-xs transition-colors hover:border-accent/60 hover:bg-secondary/40 select-none">
        <span className="text-xl">🎟️</span>
        <span className="mt-2 font-mono text-xs font-bold uppercase tracking-wider text-foreground">
          RIGHT-CLICK OR HOLD FOR TICKET OPTIONS
        </span>
        <span className="mt-1 font-mono text-[11px] text-muted-foreground">
          Context menu opens with ticket stub styling
        </span>
      </div>
    </ContextMenu>
  );
}

function AnimatedDataTablePreview() {
  const sampleData = [
    { id: "1", seat: "A-12", tier: "VIP Box", holder: "Ada Bull", price: "$120", status: "Admitted" },
    { id: "2", seat: "A-14", tier: "VIP Box", holder: "Charles B.", price: "$120", status: "Admitted" },
    { id: "3", seat: "B-04", tier: "Orchestra", holder: "Grace H.", price: "$75", status: "Reserved" },
    { id: "4", seat: "C-21", tier: "Balcony", holder: "Alan T.", price: "$45", status: "Standby" },
    { id: "5", seat: "D-08", tier: "General", holder: "Margaret H.", price: "$30", status: "Void" },
    { id: "6", seat: "D-09", tier: "General", holder: "John N.", price: "$30", status: "Admitted" },
  ];

  return (
    <div className="w-full max-w-xl">
      <DataTable
        data={sampleData}
        searchKey="holder"
        pageSize={3}
        columns={[
          { key: "seat", header: "Seat", sortable: true },
          { key: "holder", header: "Holder", sortable: true },
          { key: "tier", header: "Tier" },
          { key: "price", header: "Price", sortable: true },
          {
            key: "status",
            header: "Status",
            render: (row) => (
              <span
                className={cn(
                  "font-mono text-[11px] font-bold uppercase",
                  row.status === "Admitted" ? "text-accent" : "text-muted-foreground"
                )}
              >
                {row.status}
              </span>
            ),
          },
        ]}
      />
    </div>
  );
}

function AnimatedCalendarPreview() {
  const [selected, setSelected] = React.useState<Date | undefined>(new Date());
  return (
    <div className="flex flex-col items-center gap-3">
      <Calendar value={selected} onValueChange={setSelected} />
      {selected && (
        <span className="font-mono text-xs text-muted-foreground">
          SELECTED DATE: <strong className="text-foreground">{selected.toLocaleDateString()}</strong>
        </span>
      )}
    </div>
  );
}

function AnimatedColorPickerPreview() {
  const [color, setColor] = React.useState("#BC3A28");
  return (
    <div className="flex flex-col items-center gap-4">
      <ColorPicker value={color} onValueChange={setColor} />
      <div
        style={{ borderColor: color }}
        className="flex items-center gap-2 rounded-md border-2 border-dashed bg-card px-4 py-2 font-mono text-xs transition-colors"
      >
        <span style={{ backgroundColor: color }} className="size-3 rounded-full" />
        <span>ACTIVE TICKET INK: {color}</span>
      </div>
    </div>
  );
}

function AnimatedFileDropzonePreview() {
  return (
    <div className="w-full max-w-sm">
      <FileDropzone maxFiles={3} accept="image/*,.pdf" />
    </div>
  );
}

function AnimatedInlineEditPreview() {
  const [seat, setSeat] = React.useState("ROW C · SEAT 12");
  return (
    <div className="flex flex-col items-center gap-3 p-4 rounded-xl border border-dashed border-border bg-card">
      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        TICKET HOLDER RESERVATION
      </span>
      <InlineEdit
        label="ASSIGNED SEAT"
        value={seat}
        onSave={setSeat}
      />
      <span className="font-mono text-[11px] text-muted-foreground">
        Click the text to edit and press Enter
      </span>
    </div>
  );
}

function AnimatedScrollTopPreview() {
  return (
    <div className="flex flex-col items-center gap-3 p-6 text-center select-none">
      <div className="flex items-center gap-2 rounded-lg border-2 border-foreground bg-card px-4 py-2.5 font-mono text-xs font-bold text-foreground shadow-md outline-1 outline-dashed outline-offset-[-4px]">
        <span className="text-accent animate-bounce">▲</span>
        <span>ELEVATOR · TOP</span>
      </div>
      <span className="font-mono text-[11px] text-muted-foreground">
        Appears automatically on long pages with smooth scroll to top
      </span>
    </div>
  );
}

function AnimatedTimeInputPreview() {
  const [time, setTime] = React.useState("20:45");
  return (
    <div className="flex flex-col items-center gap-3">
      <TimeInput value={time} onValueChange={setTime} />
      <span className="font-mono text-xs text-muted-foreground">
        RESERVED SCREENING: <strong className="text-foreground">{time}</strong>
      </span>
    </div>
  );
}

function AnimatedMaskedInputPreview() {
  const [val, setVal] = React.useState("BB-2026-9481");
  return (
    <div className="flex flex-col items-center gap-2 w-full max-w-xs">
      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground self-start">
        TICKET SERIAL CODE
      </span>
      <MaskedInput
        mask="BB-####-####"
        value={val}
        onValueChange={(formatted) => setVal(formatted)}
        placeholder="BB-0000-0000"
      />
      <span className="font-mono text-[11px] text-muted-foreground self-start">
        Auto-formats characters with ticket validation
      </span>
    </div>
  );
}

function AnimatedDatePickerPreview() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  return (
    <div className="flex flex-col items-center gap-3">
      <DatePicker value={date} onValueChange={setDate} />
      <span className="font-mono text-[11px] text-muted-foreground">
        Click to open admission calendar popover
      </span>
    </div>
  );
}

function AnimatedMenubarPreview() {
  return (
    <div className="flex flex-col items-center gap-3">
      <Menubar
        menus={[
          {
            id: "admission",
            label: "Admission",
            items: [
              { id: "admit", label: "Admit Stub", shortcut: "↵" },
              { id: "print", label: "Print Ticket", shortcut: "⌘P" },
              "separator",
              { id: "revoke", label: "Revoke Pass", danger: true },
            ],
          },
          {
            id: "seating",
            label: "Seating",
            items: [
              { id: "orch", label: "Orchestra" },
              { id: "mezz", label: "Mezzanine" },
              { id: "balc", label: "Balcony" },
            ],
          },
          {
            id: "help",
            label: "Help",
            items: [
              { id: "guide", label: "Ticket Guide", shortcut: "F1" },
              { id: "terms", label: "Terms of Entry" },
            ],
          },
        ]}
      />
      <span className="font-mono text-[11px] text-muted-foreground">
        Click any menu header to open dropdown
      </span>
    </div>
  );
}

function AnimatedVideoFramePreview() {
  return (
    <div className="w-full max-w-md">
      <VideoFrame
        title="MIDNIGHT CINEMA ARCHIVE"
        reelNumber="35MM · REEL 04"
        duration="01:48:22"
      />
    </div>
  );
}

/* Master Previews Record for all 65 Components */
const previews: Record<string, React.ComponentType> = {
  button: AnimatedButtonPreview,
  badge: AnimatedBadgePreview,
  progress: AnimatedProgressPreview,
  barcode: AnimatedBarcodePreview,
  "stamp-seal": AnimatedStampSealPreview,

  avatar: AnimatedAvatarPreview,
  countdown: AnimatedCountdownPreview,
  sparkline: AnimatedSparklinePreview,
  toast: ToastPreview,
  sheet: SheetPreview,

  input: () => (
    <div className="grid w-full max-w-sm gap-3">
      <Input type="text" placeholder="Ticket code (e.g. BB-948)" />
      <Input disabled placeholder="Disabled box" />
    </div>
  ),

  card: () => (
    <Card className="w-full max-w-sm transition-transform hover:-translate-y-1">
      <CardHeader>
        <CardTitle>Front Row</CardTitle>
        <CardDescription>Row C · Seat 12 · No refunds</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">Keep this stub until the end of the show.</p>
      </CardContent>
    </Card>
  ),

  accordion: () => (
    <Accordion defaultValue="what" className="w-full max-w-sm">
      <AccordionItem value="what">
        <AccordionTrigger>What is bigbullui?</AccordionTrigger>
        <AccordionContent>A zero-dependency React 19 component library with ticket identity.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="free">
        <AccordionTrigger>Is it free?</AccordionTrigger>
        <AccordionContent>MIT licensed — free for personal and commercial applications.</AccordionContent>
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
    <Tooltip content="Section A · Row C · Seat 12">
      <Button variant="outline">Hover for Ticket</Button>
    </Tooltip>
  ),

  dialog: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <>
        <Button variant="outline" onClick={() => setOpen(true)}>
          Open Dialog
        </Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogHeader>
            <DialogTitle>Order Confirmed</DialogTitle>
            <DialogDescription>Your stub is ready. Keep it until the end of the show.</DialogDescription>
          </DialogHeader>
          <p className="text-sm text-muted-foreground font-mono">Press Esc or click outside to dismiss.</p>
          <DialogFooter>
            <Button onClick={() => setOpen(false)}>Admit</Button>
          </DialogFooter>
        </Dialog>
      </>
    );
  },

  switch: () => {
    const [on, setOn] = React.useState(true);
    return (
      <div className="flex items-center gap-4">
        <Switch checked={on} onCheckedChange={setOn} aria-label="Notifications" />
        <span className="font-mono text-xs text-muted-foreground">{on ? "ON" : "OFF"}</span>
      </div>
    );
  },

  checkbox: () => {
    const [checked, setChecked] = React.useState(true);
    return (
      <div className="flex items-center gap-3">
        <Checkbox checked={checked} onCheckedChange={setChecked} aria-label="Admit ticket" />
        <span className="font-mono text-xs text-foreground">Accept Admission Terms</span>
      </div>
    );
  },

  "radio-group": () => (
    <RadioGroup name="seat" defaultValue="window" className="w-full max-w-xs">
      <RadioItem value="window">Window</RadioItem>
      <RadioItem value="aisle">Aisle</RadioItem>
      <RadioItem value="middle" disabled>Middle (Sold)</RadioItem>
    </RadioGroup>
  ),

  slider: () => {
    const [val, setVal] = React.useState(60);
    return (
      <div className="flex w-full max-w-sm items-center gap-3">
        <Slider value={val} onValueChange={setVal} aria-label="Volume" className="flex-1" />
        <span className="w-12 text-right font-mono text-xs font-bold">{val}%</span>
      </div>
    );
  },

  alert: () => (
    <div className="grid w-full max-w-md gap-3">
      <Alert tone="accent" title="Gate Change">Boarding moved to Gate B7.</Alert>
      <Alert tone="info" title="Ticket Validated">Admitted at Box Office.</Alert>
    </div>
  ),

  textarea: () => (
    <Textarea placeholder="Special seating requests..." rows={3} className="w-full max-w-sm" />
  ),

  select: () => {
    const [val, setVal] = React.useState("orch");
    return (
      <Select
        value={val}
        onValueChange={setVal}
        options={[
          { value: "orch", label: "Orchestra — Row C" },
          { value: "mezz", label: "Mezzanine — Row B" },
          { value: "balc", label: "Balcony — Standby" },
        ]}
      />
    );
  },

  stepper: () => {
    const [c, setC] = React.useState(2);
    return <Stepper value={c} onValueChange={setC} min={1} max={8} />;
  },

  "pin-input": () => {
    const [pin, setPin] = React.useState("");
    return <PinInput length={4} value={pin} onValueChange={setPin} />;
  },

  rating: () => {
    const [r, setR] = React.useState(4);
    return <Rating value={r} onValueChange={setR} />;
  },

  pagination: () => {
    const [p, setP] = React.useState(2);
    return <Pagination page={p} totalPages={8} onPageChange={setP} />;
  },

  breadcrumb: () => (
    <Breadcrumb>
      <BreadcrumbItem href="/">Home</BreadcrumbItem>
      <BreadcrumbItem href="/docs">Docs</BreadcrumbItem>
      <BreadcrumbItem current>Ticket</BreadcrumbItem>
    </Breadcrumb>
  ),

  steps: () => (
    <div className="w-full max-w-md">
      <Steps
        current={1}
        steps={[
          { title: "Select", description: "Choose seat" },
          { title: "Review", description: "Verify order" },
          { title: "Admit", description: "Download stub" },
        ]}
      />
    </div>
  ),

  "toggle-group": () => {
    const [v, setV] = React.useState("row");
    return (
      <ToggleGroup value={v} onValueChange={setV}>
        <ToggleItem value="row">Row C</ToggleItem>
        <ToggleItem value="seat">Seat 12</ToggleItem>
        <ToggleItem value="vip">VIP Box</ToggleItem>
      </ToggleGroup>
    );
  },

  popover: () => (
    <Popover>
      <PopoverTrigger>
        <Button variant="outline">Gate Notice</Button>
      </PopoverTrigger>
      <PopoverContent>
        <span className="font-mono text-xs font-bold uppercase tracking-wider text-foreground">
          Admission Rule
        </span>
        <p className="mt-1 font-mono text-xs text-muted-foreground">
          Doors close 10 minutes prior to curtain call.
        </p>
      </PopoverContent>
    </Popover>
  ),

  empty: () => (
    <Empty
      title="NO STUBS"
      description="You have not claimed any stubs in this section."
      action={<Button size="sm">Browse Events</Button>}
      className="max-w-md"
    />
  ),

  kbd: () => (
    <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
      <Kbd>⌘</Kbd>
      <Kbd>K</Kbd>
      <span>to search</span>
      <Kbd className="ml-2">Esc</Kbd>
      <span>to cancel</span>
    </div>
  ),

  separator: () => (
    <div className="w-full max-w-xs space-y-3 font-mono text-xs text-muted-foreground">
      <div>SECTION A</div>
      <Separator />
      <div>SECTION B (DASHED)</div>
      <Separator dashed={false} />
      <div>SOLID RULE</div>
    </div>
  ),

  table: () => (
    <Table className="max-w-md">
      <TableHead>
        <TableRow>
          <TableHeaderCell>Seat</TableHeaderCell>
          <TableHeaderCell>Tier</TableHeaderCell>
          <TableHeaderCell>Status</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>A-12</TableCell>
          <TableCell>Orchestra</TableCell>
          <TableCell className="font-bold text-accent">Admitted</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>B-04</TableCell>
          <TableCell>Balcony</TableCell>
          <TableCell className="text-muted-foreground">Standby</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),

  marquee: () => (
    <div className="w-full max-w-md overflow-hidden rounded-md border border-dashed border-border py-2">
      <Marquee speed={18}>
        <span className="font-mono text-xs uppercase tracking-widest text-foreground">
          ADMIT ONE ★ BIGBULLUI ★ ROW C SEAT 12 ★ NO REFUNDS ★
        </span>
      </Marquee>
    </div>
  ),

  "ticket-card": () => (
    <div className="w-full max-w-xl">
      <TicketCard />
    </div>
  ),

  spinner: () => (
    <div className="flex items-center justify-center gap-6">
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
  ),

  skeleton: () => (
    <div className="w-full max-w-sm space-y-3">
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
    </div>
  ),

  "copy-button": () => (
    <div className="flex items-center gap-3">
      <span className="font-mono text-xs text-muted-foreground">npm install bigbullui</span>
      <CopyButton value="npm install bigbullui" />
    </div>
  ),

  coupon: () => (
    <Coupon
      code="BIGBULL25"
      discount="25%"
      title="FESTIVAL ADMISSION"
      subtitle="Valid for all main stage events."
      expires="31 DEC"
      className="max-w-md"
    />
  ),

  "boarding-pass": () => (
    <div className="w-full max-w-xl">
      <BoardingPass flight="BB-402" origin="JFK" destination="IST" passenger="ADA BULL" seat="12A" gate="B7" boardingTime="18:40" />
    </div>
  ),

  "price-tag": () => (
    <div className="flex items-center justify-center gap-6">
      <PriceTag price="45.00" label="REGULAR" />
      <PriceTag price="29.00" originalPrice="45.00" sale label="EARLY BIRD" />
    </div>
  ),

  "luggage-tag": () => (
    <LuggageTag tagNumber="BB-902-441" destination="IST" passengerName="ADA BULL" flight="BB-402" />
  ),

  timeline: () => (
    <Timeline
      items={[
        { date: "18:00", title: "Doors Open", description: "Security screening begins at Gate A." },
        { date: "19:30", title: "Seating Call", description: "Please locate your reserved row stub.", tone: "accent" },
        { date: "20:00", title: "Curtain Call", description: "Main event begins. No entry during first act." },
      ]}
      className="max-w-md"
    />
  ),

  "search-bar": () => (
    <SearchBar placeholder="Search tickets, rows, stubs..." />
  ),

  "dropdown-menu": () => (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="outline">Options ▾</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem shortcut="⌘P">Print Stub</DropdownMenuItem>
        <DropdownMenuItem shortcut="⌘D">Download PDF</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem shortcut="⌘R" className="text-destructive">Revoke Seat</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),

  "cookie-banner": () => (
    <div className="w-full max-w-lg border border-border p-3 rounded-lg bg-secondary/30">
      <CookieBanner />
    </div>
  ),

  "bar-chart": () => (
    <div className="w-full max-w-sm p-4 rounded-lg border border-border bg-card">
      <BarChart
        data={[
          { label: "MON", value: 35 },
          { label: "TUE", value: 48 },
          { label: "WED", value: 65, tone: "accent" },
          { label: "THU", value: 54 },
          { label: "FRI", value: 92, tone: "accent" },
        ]}
      />
    </div>
  ),

  combobox: () => {
    const [val, setVal] = React.useState("");
    return (
      <Combobox
        value={val}
        onValueChange={setVal}
        options={[
          { value: "a1", label: "Section A — Seat 1" },
          { value: "a2", label: "Section A — Seat 2" },
          { value: "b1", label: "Section B — Balcony 1" },
          { value: "b2", label: "Section B — Balcony 2" },
        ]}
      />
    );
  },

  "command-palette": AnimatedCommandPalettePreview,
  calendar: AnimatedCalendarPreview,
  "file-dropzone": AnimatedFileDropzonePreview,
  "confetti-burst": AnimatedConfettiPreview,
  "color-picker": AnimatedColorPickerPreview,
  "password-strength": AnimatedPasswordStrengthPreview,
  "data-table": AnimatedDataTablePreview,
  "context-menu": AnimatedContextMenuPreview,
  "inline-edit": AnimatedInlineEditPreview,
  "scroll-top": AnimatedScrollTopPreview,
  "time-input": AnimatedTimeInputPreview,
  "masked-input": AnimatedMaskedInputPreview,
  "date-picker": AnimatedDatePickerPreview,
  menubar: AnimatedMenubarPreview,
  "video-frame": AnimatedVideoFramePreview,
};

export function ComponentPreview({ name }: { name: string }) {
  const Preview = previews[name];
  if (!Preview) {
    return <p className="text-sm text-muted-foreground font-mono">Preview not available.</p>;
  }
  return (
    <div className="flex min-h-44 items-center justify-center rounded-lg border border-border bg-secondary/50 p-8">
      <Preview />
    </div>
  );
}
