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
import { Star } from "@/components/ui/star";
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
import { AudioMini } from "@/components/ui/audio-mini";
import { SectionHeading } from "@/components/ui/section-heading";
import { DualSlider } from "@/components/ui/dual-slider";
import { Tour } from "@/components/ui/tour";
import { MentionInput } from "@/components/ui/mention-input";
import { Navbar } from "@/components/ui/navbar";
import { Autocomplete } from "@/components/ui/autocomplete";
import { Lightbox } from "@/components/ui/lightbox";
import { TransferList } from "@/components/ui/transfer-list";
import { TreeNav } from "@/components/ui/tree-nav";
import { TreeSelect } from "@/components/ui/tree-select";
import { MaskedCurrency } from "@/components/ui/masked-currency";
import { StickyBar } from "@/components/ui/sticky-bar";
import { Stack } from "@/components/ui/stack";
import { Container } from "@/components/ui/container";
import { KanbanLite } from "@/components/ui/kanban-lite";
import { GanttLite } from "@/components/ui/gantt-lite";
import { Sidebar } from "@/components/ui/sidebar";
import { Stopwatch } from "@/components/ui/stopwatch";
import { Countup } from "@/components/ui/countup";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { SignaturePad } from "@/components/ui/signature-pad";
import { QrReader } from "@/components/ui/qr-reader";
import { AudioWaveform } from "@/components/ui/audio-waveform";
import { TicketFold } from "@/components/ui/ticket-fold";
import { SegmentedSwitch } from "@/components/ui/segmented-switch";
import { NfcBadge } from "@/components/ui/nfc-badge";
import { ScratchOff } from "@/components/ui/scratch-off";
import { SplitFlapBoard } from "@/components/ui/split-flap";
import { SeatMap } from "@/components/ui/seat-map";
import { Watermark } from "@/components/ui/watermark";
import { BreadcrumbDropdown } from "@/components/ui/breadcrumb-dropdown";
import { TurnstileGate } from "@/components/ui/turnstile-gate";
import { Collapsible } from "@/components/ui/collapsible";
import { AspectRatio, AspectRatioPreset } from "@/components/ui/aspect-ratio";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { HoverCard, HoverCardTrigger, HoverCardContent, HoverCardSeatSummary } from "@/components/ui/hover-card";
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerBody, DrawerFooter, DrawerClose } from "@/components/ui/drawer";
import { Keypad } from "@/components/ui/keypad";
import { TagInput } from "@/components/ui/tag-input";
import { PricingTable } from "@/components/ui/pricing-table";
import { MetricCard } from "@/components/ui/metric-card";
import { DonutChart } from "@/components/ui/donut-chart";
import { Dock, DockItem, DockSeparator } from "@/components/ui/dock";
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

function AnimatedAudioMiniPreview() {
  return (
    <div className="w-full max-w-sm">
      <AudioMini
        title="CONCERT HALL ACOUSTICS"
        artist="ORCHESTRA ROW C · SEAT 12"
        duration="04:18"
      />
    </div>
  );
}

function AnimatedSectionHeadingPreview() {
  return (
    <div className="w-full max-w-md p-4 rounded-xl border border-dashed border-border bg-card">
      <SectionHeading
        title="SECTION A · ORCHESTRA"
        subtitle="GROUND LEVEL · DIRECT STAGE VIEW"
        badge="GATE 03"
        action={
          <span className="font-mono text-xs font-bold text-accent cursor-pointer hover:underline">
            VIEW MAP →
          </span>
        }
      />
    </div>
  );
}

function AnimatedDualSliderPreview() {
  const [range, setRange] = React.useState<[number, number]>([35, 120]);
  return (
    <div className="w-full max-w-sm p-4 rounded-xl border border-dashed border-border bg-card">
      <DualSlider
        min={10}
        max={200}
        step={5}
        value={range}
        onValueChange={setRange}
        currency="$"
      />
    </div>
  );
}

function AnimatedTourPreview() {
  const [step, setStep] = React.useState(0);
  const tourSteps = [
    { title: "SELECT ADMISSION SEAT", description: "Pick your preferred auditorium zone from the interactive stub map." },
    { title: "SECURITY VALIDATION", description: "Your digital pass includes a dynamic anti-fraud barcode." },
    { title: "BOARDING GATE ACCESS", description: "Present ticket at scanner Gate 3 for instant entry." },
  ];

  return (
    <Tour
      steps={tourSteps}
      currentStep={step}
      onStepChange={setStep}
      onSkip={() => setStep(0)}
      onComplete={() => setStep(0)}
    />
  );
}

function AnimatedMentionInputPreview() {
  const [val, setVal] = React.useState("Assigned to @VIP-Box for curtain call.");
  return (
    <div className="w-full max-w-md">
      <MentionInput
        value={val}
        onValueChange={setVal}
        placeholder="Type @ to mention ticket tiers or staff..."
      />
      <span className="mt-2 block font-mono text-[11px] text-muted-foreground">
        Type @ to trigger ticket tier suggestions
      </span>
    </div>
  );
}

function AnimatedNavbarPreview() {
  return (
    <div className="w-full max-w-xl">
      <Navbar
        brand="BIGBULL TICKETS"
        items={[
          { label: "HEADLINERS", href: "#", active: true },
          { label: "SCHEDULE", href: "#" },
          { label: "STANDBY", href: "#" },
        ]}
      />
    </div>
  );
}

function AnimatedAutocompletePreview() {
  const [val, setVal] = React.useState("");
  return (
    <div className="w-full max-w-xs">
      <Autocomplete
        value={val}
        onValueChange={setVal}
        placeholder="Type to search seat or tier..."
        options={[
          { value: "a1", label: "Orchestra Row A", category: "Floor" },
          { value: "a2", label: "Orchestra Row B", category: "Floor" },
          { value: "b1", label: "Balcony Center", category: "Tier 2" },
          { value: "v1", label: "VIP Box North", category: "Premium" },
        ]}
      />
    </div>
  );
}

function AnimatedLightboxPreview() {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="flex flex-col items-center gap-3">
      <Button variant="outline" onClick={() => setOpen(true)} className="font-mono text-xs">
        <span className="mr-2">🎟️</span> Open Ticket Lightbox
      </Button>
      <Lightbox
        open={open}
        onOpenChange={setOpen}
        images={[
          { src: "/stock/stage.jpg", title: "MAIN STAGE PASS", alt: "Section A Row C Seat 12" },
          { src: "/stock/crowd.jpg", title: "VIP BALCONY STUB", alt: "Box Tier Seat 04" },
        ]}
      />
    </div>
  );
}

function AnimatedTransferListPreview() {
  return <TransferList className="max-w-lg" />;
}

function AnimatedTreeNavPreview() {
  const [selected, setSelected] = React.useState("row-a");
  const treeData = [
    {
      id: "orch",
      label: "ORCHESTRA TIER",
      badge: "GROUND",
      children: [
        { id: "row-a", label: "Row A (Seats 1-20)", badge: "VIP" },
        { id: "row-b", label: "Row B (Seats 1-20)" },
      ],
    },
    {
      id: "balc",
      label: "BALCONY TIER",
      badge: "UPPER",
      children: [
        { id: "box-1", label: "Private Box 1", badge: "SOLD" },
        { id: "box-2", label: "Private Box 2" },
      ],
    },
  ];

  return (
    <TreeNav
      data={treeData}
      selectedId={selected}
      onSelect={(node) => setSelected(node.id)}
    />
  );
}

function AnimatedTreeSelectPreview() {
  const [val, setVal] = React.useState("Balcony Zone B");
  const treeData = [
    {
      id: "orch",
      label: "Orchestra Section",
      children: [
        { id: "orch-a", label: "Orchestra Row A" },
        { id: "orch-b", label: "Orchestra Row B" },
      ],
    },
    {
      id: "balc",
      label: "Balcony Section",
      children: [
        { id: "balc-a", label: "Balcony Zone A" },
        { id: "balc-b", label: "Balcony Zone B" },
      ],
    },
  ];

  return (
    <div className="w-full max-w-xs">
      <TreeSelect
        data={treeData}
        value={val}
        onValueChange={(id, node) => setVal(node.label)}
      />
    </div>
  );
}

function AnimatedMaskedCurrencyPreview() {
  const [amount, setAmount] = React.useState(8500);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setAmount((prev) => (prev >= 12000 ? 4500 : prev + 1500));
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center gap-3">
      <MaskedCurrency
        value={amount}
        onValueChange={(val) => setAmount(val)}
        className="w-48"
      />
      <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
        Live Stub Balance: ${(amount / 100).toFixed(2)}
      </span>
    </div>
  );
}

function AnimatedStickyBarPreview() {
  const [count, setCount] = React.useState(3);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCount((c) => (c % 5) + 1);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full max-w-lg overflow-hidden rounded-lg border-2 border-foreground bg-background p-2">
      <div className="p-4 text-center text-xs font-mono text-muted-foreground">
        [Scrollable Admission Venue Layout]
      </div>
      <StickyBar
        className="relative inset-auto bottom-auto border-t border-border"
        itemCount={count}
        total={`$${(count * 45).toFixed(2)}`}
        actionText="CLAIM STUBS"
      />
    </div>
  );
}

function AnimatedStackPreview() {
  return (
    <div className="flex items-center justify-center p-4">
      <Stack fanOnHover>
        <div className="flex h-28 w-44 flex-col justify-between rounded-lg border-2 border-foreground bg-card p-3 shadow-md">
          <div className="flex justify-between text-[10px] font-mono font-bold text-muted-foreground">
            <span>PASS #001</span>
            <span className="text-accent">VIP</span>
          </div>
          <div className="text-xs font-mono font-black text-foreground">
            GOLDEN TICKET
          </div>
          <div className="border-t border-dashed border-border pt-1 text-[9px] font-mono text-muted-foreground">
            ROW A • SEAT 01
          </div>
        </div>
        <div className="flex h-28 w-44 flex-col justify-between rounded-lg border-2 border-foreground bg-secondary p-3 shadow-md">
          <div className="flex justify-between text-[10px] font-mono font-bold text-muted-foreground">
            <span>PASS #002</span>
            <span className="text-accent">STD</span>
          </div>
          <div className="text-xs font-mono font-black text-foreground">
            BALCONY ACCESS
          </div>
          <div className="border-t border-dashed border-border pt-1 text-[9px] font-mono text-muted-foreground">
            ROW B • SEAT 14
          </div>
        </div>
        <div className="flex h-28 w-44 flex-col justify-between rounded-lg border-2 border-foreground bg-card p-3 shadow-lg">
          <div className="flex justify-between text-[10px] font-mono font-bold text-muted-foreground">
            <span>PASS #003</span>
            <span className="text-accent">PRESS</span>
          </div>
          <div className="text-xs font-mono font-black text-foreground">
            ALL-ACCESS PASS
          </div>
          <div className="border-t border-dashed border-border pt-1 text-[9px] font-mono text-muted-foreground">
            STAGE • ROW 0
          </div>
        </div>
      </Stack>
    </div>
  );
}

function AnimatedContainerPreview() {
  return (
    <Container size="sm" notched className="rounded-lg border-2 border-dashed border-foreground bg-card p-6 shadow-xs">
      <div className="flex items-center justify-between border-b border-border pb-2 text-xs font-mono font-bold">
        <span>NOTCHED WRAPPER</span>
        <span className="text-accent">SECTOR 9</span>
      </div>
      <p className="mt-3 text-xs font-mono text-muted-foreground leading-relaxed">
        Container automatically clamps width while rendering ticket punch notches on either flank.
      </p>
    </Container>
  );
}

function AnimatedKanbanLitePreview() {
  return (
    <div className="w-full max-w-2xl">
      <KanbanLite />
    </div>
  );
}

function AnimatedGanttLitePreview() {
  const [hour, setHour] = React.useState(20);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setHour((h) => (h >= 23 ? 18 : Number((h + 0.5).toFixed(1))));
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-2xl">
      <GanttLite liveHour={hour} />
    </div>
  );
}

function AnimatedSidebarPreview() {
  const [active, setActive] = React.useState("dashboard");
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <div className="flex h-72 w-full max-w-md overflow-hidden rounded-lg border-2 border-foreground bg-background shadow-xs">
      <Sidebar
        activeId={active}
        onSelect={setActive}
        collapsed={collapsed}
        onCollapsedChange={setCollapsed}
      />
      <div className="flex flex-1 flex-col items-center justify-center p-6 text-center font-mono">
        <div className="text-xs uppercase font-bold text-muted-foreground">SELECTED VIEW</div>
        <div className="mt-1 text-sm font-black text-accent">{active.toUpperCase()}</div>
      </div>
    </div>
  );
}

function AnimatedStopwatchPreview() {
  return (
    <div className="w-full max-w-sm">
      <Stopwatch autoStart={true} />
    </div>
  );
}

function AnimatedCountupPreview() {
  const [val, setVal] = React.useState(8492);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setVal((v) => v + Math.floor(Math.random() * 45) + 10);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <Countup end={val} start={val - 120} duration={1200} label="LIVE TURNSTILE ADMISSIONS" />
      <div className="flex gap-2">
        <Countup end={val} variant="badge" prefix="TOTAL " suffix=" STUBS" />
        <Countup end={Math.floor(val / 4)} variant="minimal" prefix="VIP: " />
      </div>
    </div>
  );
}

function AnimatedThemeTogglePreview() {
  const [isDark, setIsDark] = React.useState(false);

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md select-none">
      <div className="flex flex-col items-center gap-2 text-center">
        <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          FLIP TO SWITCH SHIFT // DAY &amp; NIGHT PASS
        </span>
        <ThemeToggle
          dark={isDark}
          onToggle={setIsDark}
          syncHtmlDark={true}
          enableSound={true}
        />
      </div>

      <div className="flex items-center gap-3 border-t-2 border-dashed border-border pt-4 w-full justify-between">
        <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          COMPACT POCKET STUB:
        </span>
        <ThemeToggle
          variant="compact"
          dark={isDark}
          onToggle={setIsDark}
          syncHtmlDark={true}
          enableSound={true}
        />
      </div>
    </div>
  );
}

function AnimatedSignaturePadPreview() {
  const [signatureUrl, setSignatureUrl] = React.useState<string | null>(null);
  const [statusMessage, setStatusMessage] = React.useState("AWAITING STUB ENDORSEMENT");

  return (
    <div className="flex flex-col gap-4 w-full max-w-lg select-none">
      <SignaturePad
        title="ADMISSION TICKET ENDORSEMENT"
        stubNumber="PASS #VIP-9942"
        instruction="AUTHORIZED TICKET HOLDER SIGNATURE"
        height={150}
        enableSound={true}
        onChange={(url) => {
          setSignatureUrl(url);
          if (url) setStatusMessage("SIGNATURE CAPTURED // READY TO ENDORSE");
        }}
        onClear={() => {
          setSignatureUrl(null);
          setStatusMessage("CLEARED // AWAITING NEW SIGNATURE");
        }}
        onEndorse={(url) => {
          setSignatureUrl(url);
          setStatusMessage("TICKET OFFICIALLY ENDORSED &amp; STAMPED");
        }}
      />
      <div className="flex items-center justify-between font-mono text-[10px] uppercase text-muted-foreground px-1">
        <span>STATUS: {statusMessage}</span>
        <span>{signatureUrl ? "INK: CAPTURED" : "PAD: READY"}</span>
      </div>
    </div>
  );
}

function AnimatedQrReaderPreview() {
  const [lastScan, setLastScan] = React.useState<string | null>(null);

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-md">
      <QrReader
        title="TURNSTILE GATE 04B"
        gateId="SECTOR A // ENTRANCE"
        onScan={(data) => {
          setLastScan(`${data.code} · ${data.attendee} (${data.tier})`);
        }}
        onReset={() => setLastScan(null)}
      />
      {lastScan && (
        <div className="rounded-md border border-dashed border-emerald-500/60 bg-emerald-500/10 px-3 py-1.5 font-mono text-xs text-emerald-600 dark:text-emerald-400">
          LOG: {lastScan}
        </div>
      )}
    </div>
  );
}

function AnimatedAudioWaveformPreview() {
  return (
    <div className="w-full max-w-2xl">
      <AudioWaveform
        title="CONCERT ARCHIVE // ACT II: OVERTURE"
        artist="BIGBULL SYMPHONY ORCHESTRA"
        venue="GRAND ARENA // MAIN STAGE"
        duration={214}
        initialTime={42}
      />
    </div>
  );
}

function AnimatedNfcBadgePreview() {
  const [tapCount, setTapCount] = React.useState(0);
  const [lastAdmission, setLastAdmission] = React.useState<string | null>(null);

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-sm select-none">
      <NfcBadge
        holderName="MAXINE VANCE"
        passId="NFC-8842-VIP"
        department="STAGE CREW // AUDIO A1"
        accessLevel="ALL ACCESS VIP"
        gate="NORTH TURNSTILE 04"
        validUntil="FALL 2026"
        onTap={() => setTapCount((c) => c + 1)}
        onAdmission={(id) => setLastAdmission(`ADMITTED ${id} AT GATE 04`)}
      />
      <div className="flex items-center justify-between w-full font-mono text-[10px] uppercase text-muted-foreground px-2">
        <span>TAPS LOGGED: {tapCount}</span>
        <span>{lastAdmission ?? "READY AT TURNSTILE"}</span>
      </div>
    </div>
  );
}

function AnimatedScratchOffPreview() {
  const [revealedCode, setRevealedCode] = React.useState<string | null>(null);

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-xl select-none">
      <ScratchOff
        lotteryTitle="BIG BULL RAFFLE // GOLDEN STUB"
        prizeTitle="GRAND RAFFLE WINNER"
        prizeAmount="$500 VOUCHER"
        prizeCode="BULL-JACKPOT-777"
        serial="NO. #774921-X"
        revealThreshold={50}
        onReveal={(code) => setRevealedCode(code)}
        onReset={() => setRevealedCode(null)}
      />
      <div className="flex items-center justify-between w-full font-mono text-[10px] uppercase text-muted-foreground px-2">
        <span>INTERACTION: DRAG TO SCRATCH (50% THRESHOLD)</span>
        <span>{revealedCode ? `REDEEM CODE: ${revealedCode}` : "SCRATCH CARD TO REVEAL"}</span>
      </div>
    </div>
  );
}

function AnimatedTicketFoldPreview() {
  const [unfolded, setUnfolded] = React.useState(false);
  const [torn, setTorn] = React.useState(false);

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-md py-4 select-none">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setUnfolded((prev) => !prev)}
          className="rounded border border-dashed border-foreground/40 bg-card px-3 py-1 font-mono text-xs font-bold uppercase hover:bg-secondary active:scale-95"
        >
          {unfolded ? "Collapse Fold" : "Unfold 3D Pass"}
        </button>
        <button
          type="button"
          onClick={() => setTorn((prev) => !prev)}
          className="rounded border border-dashed border-destructive/60 bg-card px-3 py-1 font-mono text-xs font-bold uppercase text-destructive hover:bg-destructive/10 active:scale-95"
        >
          {torn ? "Reset Stub" : "Simulate Tear"}
        </button>
      </div>

      <TicketFold
        eventName="HYPERDRIVE LIVE 2026"
        subtitle="HOLOGRAPHIC SYNTH FESTIVAL"
        tier="VIP ALL-ACCESS"
        serial="NO. 8942-X"
        date="OCT 14, 2026"
        time="21:00 CEST"
        venue="SECTOR 7 DOCKLANDS"
        seatInfo={{ section: "VIP-A", row: "02", seat: "14", gate: "G3" }}
        holderName="ELENA VANCE // ID 4402"
        barcodeValue="BB-HYPER-2026"
        unfolded={unfolded}
        onFoldChange={setUnfolded}
        torn={torn}
        onTear={() => setTorn(true)}
      />
    </div>
  );
}

function AnimatedSegmentedSwitchPreview() {
  const [turnstileState, setTurnstileState] = React.useState("ADMIT");

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md py-4 select-none">
      <SegmentedSwitch
        value={turnstileState}
        onChange={setTurnstileState}
        label="TURNSTILE GATE 04"
        gateCode="GATE-04"
        options={[
          { value: "ADMIT", label: "ADMIT", tone: "success", badge: "01" },
          { value: "HOLD", label: "HOLD", tone: "warning", badge: "02" },
          { value: "DENIED", label: "DENIED", tone: "danger", badge: "03" },
        ]}
      />

      <div className="flex items-center gap-2 font-mono text-xs">
        <span className="text-muted-foreground text-[10px] uppercase">QUICK TRIGGER:</span>
        {(["ADMIT", "HOLD", "DENIED"] as const).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setTurnstileState(s)}
            className={cn(
              "rounded border border-dashed px-2 py-0.5 text-[10px] font-bold uppercase transition-colors",
              turnstileState === s
                ? "border-foreground bg-primary text-primary-foreground"
                : "border-border bg-card text-muted-foreground hover:text-foreground"
            )}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}

function AnimatedSplitFlapPreview() {
  const [boardData, setBoardData] = React.useState([
    { id: "1", time: "14:10", train: "BB-402", destination: "NEW YORK PENN", track: "04", status: "ON TIME" },
    { id: "2", time: "14:25", train: "EXP-88", destination: "CHICAGO UNION", track: "08", status: "BOARDING" },
    { id: "3", time: "14:40", train: "EXP-104", destination: "BOSTON SOUTH", track: "02", status: "DELAYED" },
    { id: "4", time: "15:00", train: "BB-550", destination: "WASHINGTON DC", track: "11", status: "ON TIME" },
  ]);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setBoardData((prev) =>
        prev.map((row, idx) => {
          if (idx === 1) {
            return { ...row, status: row.status === "BOARDING" ? "FINAL CALL" : "BOARDING" };
          }
          if (idx === 2) {
            return { ...row, status: row.status === "DELAYED" ? "ON TIME" : "DELAYED" };
          }
          return row;
        })
      );
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-2xl select-none">
      <SplitFlapBoard
        title="GRAND CENTRAL CONCOURSE"
        subtitle="MECHANICAL DEPARTURES · SOLARI V4"
        terminalCode="GCT-M4"
        rows={boardData}
        showControls={true}
      />
    </div>
  );
}

function AnimatedSeatMapPreview() {
  const [selected, setSelected] = React.useState<string[]>(["B-5", "B-6"]);

  return (
    <div className="w-full max-w-2xl select-none">
      <SeatMap
        venueName="BIGBULL AMPHITHEATER"
        eventName="SYMPHONY IN BRASS · MAIN STAGE"
        eventDate="SAT, OCT 24 · 20:00"
        selectedSeatIds={selected}
        onSelectionChange={(seats) => setSelected(seats.map((s) => s.id))}
      />
    </div>
  );
}

function AnimatedWatermarkPreview() {
  return (
    <div className="w-full max-w-md">
      <Watermark text="BIGBULL OFFICIAL PASS • NON-TRANSFERABLE" notched className="p-6">
        <div className="flex items-center justify-between border-b border-dashed border-border pb-3">
          <span className="text-xs font-mono font-bold text-foreground">VIP PASS #0042</span>
          <span className="rounded bg-accent px-2 py-0.5 text-[10px] font-mono font-bold text-accent-foreground">VERIFIED</span>
        </div>
        <div className="mt-4 font-mono">
          <div className="text-sm font-bold text-foreground">ALL-ARENA ACCESS</div>
          <div className="text-xs text-muted-foreground mt-1">HOLDER: MARCUS AURELIUS // BOX 01</div>
        </div>
      </Watermark>
    </div>
  );
}

function AnimatedBreadcrumbDropdownPreview() {
  const items = [
    { label: "ARENA", href: "#" },
    { label: "TIER 1", href: "#" },
    { label: "SECTION B", href: "#" },
    { label: "ROW 4", href: "#" },
    { label: "SEAT 18", active: true },
  ];

  return (
    <div className="flex flex-col items-center gap-3">
      <BreadcrumbDropdown items={items} maxVisible={3} />
      <span className="text-[10px] font-mono text-muted-foreground uppercase">
        Middle tiers automatically collapse into ticket dropdown
      </span>
    </div>
  );
}

function AnimatedTurnstileGatePreview() {
  return (
    <div className="w-full max-w-sm">
      <TurnstileGate gateName="TURNSTILE NORTH-01" admittedCount={1420} />
    </div>
  );
}

function AnimatedCollapsiblePreview() {
  const [open, setOpen] = React.useState(true);
  const [status, setStatus] = React.useState<"valid" | "admitted" | "vip">("valid");

  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      {/* Interactive Controls */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-dashed border-border pb-2 text-xs font-mono">
        <span className="text-muted-foreground uppercase">CONTROL DISCLOSURE:</span>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="cursor-pointer rounded border border-border bg-card px-2 py-0.5 font-mono text-[10px] font-bold uppercase transition-colors hover:border-foreground"
          >
            {open ? "COLLAPSE ALL" : "EXPAND ALL"}
          </button>
          <button
            type="button"
            onClick={() => setStatus((s) => (s === "valid" ? "admitted" : s === "admitted" ? "vip" : "valid"))}
            className="cursor-pointer rounded border border-accent bg-accent/10 px-2 py-0.5 font-mono text-[10px] font-bold text-accent uppercase transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            STAMP: {status.toUpperCase()}
          </button>
        </div>
      </div>

      {/* Standalone Ticket Disclosure Card */}
      <Collapsible
        open={open}
        onOpenChange={setOpen}
        title="BACKSTAGE VIP PASS"
        subtitle="Gate 4 · Soundcheck access & Artist lounge"
        serial="PASS #0942-VIP"
        badge="ALL ACCESS"
        status={status}
      >
        <div className="space-y-3 font-mono text-xs">
          <div className="grid grid-cols-3 gap-2 border-y border-dashed border-border/80 py-2.5 text-center">
            <div>
              <span className="block text-[9px] uppercase tracking-wider text-muted-foreground">TIER</span>
              <span className="font-bold text-foreground">VIP GOLD</span>
            </div>
            <div>
              <span className="block text-[9px] uppercase tracking-wider text-muted-foreground">LOUNGE</span>
              <span className="font-bold text-foreground">ROOM 3B</span>
            </div>
            <div>
              <span className="block text-[9px] uppercase tracking-wider text-muted-foreground">SCAN ID</span>
              <span className="font-bold text-foreground">#99201</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-[11px] text-muted-foreground">
            <span>SHOWTIME: 20:30 CST</span>
            <span className="font-bold text-accent">DOORS OPEN 18:30</span>
          </div>
        </div>
      </Collapsible>
    </div>
  );
}

function AnimatedAspectRatioPreview() {
  const [selectedRatio, setSelectedRatio] = React.useState<AspectRatioPreset>("16:9");
  const [perforated, setPerforated] = React.useState(true);
  const [guides, setGuides] = React.useState(true);
  const [notches, setNotches] = React.useState(true);

  const presets: AspectRatioPreset[] = ["16:9", "3:1", "2:1", "1:1"];

  return (
    <div className="flex w-full max-w-lg flex-col items-center gap-4">
      {/* Ratio Selector Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-1.5">
        {presets.map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => setSelectedRatio(preset)}
            className={cn(
              "cursor-pointer rounded border px-2.5 py-1 font-mono text-xs font-bold uppercase transition-all duration-150",
              selectedRatio === preset
                ? "border-foreground bg-primary text-primary-foreground shadow-xs"
                : "border-border bg-card text-foreground hover:border-foreground"
            )}
          >
            {preset}
          </button>
        ))}
      </div>

      {/* Frame Feature Toggles */}
      <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] text-muted-foreground uppercase">
        <label className="flex cursor-pointer items-center gap-1">
          <input
            type="checkbox"
            checked={perforated}
            onChange={(e) => setPerforated(e.target.checked)}
            className="accent-accent"
          />
          PERFORATED
        </label>
        <label className="flex cursor-pointer items-center gap-1">
          <input
            type="checkbox"
            checked={guides}
            onChange={(e) => setGuides(e.target.checked)}
            className="accent-accent"
          />
          CORNER GUIDES
        </label>
        <label className="flex cursor-pointer items-center gap-1">
          <input
            type="checkbox"
            checked={notches}
            onChange={(e) => setNotches(e.target.checked)}
            className="accent-accent"
          />
          NOTCHES
        </label>
      </div>

      {/* Proportional Container */}
      <div className="w-full transition-all duration-300">
        <AspectRatio
          ratio={selectedRatio}
          perforated={perforated}
          cornerGuides={guides}
          cornerNotches={notches}
          serial="STUB-REF #7731"
          variant="stub"
        >
          <div className="flex size-full flex-col items-center justify-center bg-radial from-card via-secondary/40 to-muted/80 p-4 text-center">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-accent">
              ★ OFFICIAL TICKET STUB PROPORTION ★
            </span>
            <span className="mt-1 font-mono text-xl sm:text-2xl font-black uppercase tracking-tight text-foreground">
              {selectedRatio} RATIO
            </span>
            <span className="mt-1 font-mono text-[11px] text-muted-foreground">
              {selectedRatio === "16:9" && "Stage screen & cinema monitor"}
              {selectedRatio === "3:1" && "Elongated boarding voucher strip"}
              {selectedRatio === "2:1" && "Classic concert ticket pass"}
              {selectedRatio === "1:1" && "Square accreditation lanyard badge"}
            </span>
          </div>
        </AspectRatio>
      </div>
    </div>
  );
}

function AnimatedResizablePreview() {
  return (
    <div className="w-full max-w-xl h-64 border-2 border-foreground rounded-lg overflow-hidden bg-card font-mono text-xs">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={40} minSize={25}>
          <div className="flex h-full flex-col justify-between p-4 bg-secondary/30">
            <span className="text-[10px] font-bold text-muted-foreground uppercase">ZONE A // MAIN STAGE</span>
            <div className="font-bold text-foreground">STAGE CONTROLS</div>
            <span className="text-[9px] text-muted-foreground">DRAG NOTCH DIVIDER →</span>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={60} minSize={30}>
          <div className="flex h-full flex-col justify-between p-4 bg-card">
            <span className="text-[10px] font-bold text-muted-foreground uppercase">ZONE B // VIP BALCONY</span>
            <div className="font-bold text-foreground">RESERVED SEATS 01-50</div>
            <span className="text-[9px] text-accent font-bold">STATUS: ADMITTED</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

function AnimatedScrollAreaPreview() {
  const items = Array.from({ length: 15 }, (_, i) => `TICKET PASS #${(1000 + i).toString()} · SEC B ROW ${i + 1}`);

  return (
    <div className="w-full max-w-xs rounded-lg border-2 border-dashed border-border bg-card p-3">
      <div className="border-b border-border pb-2 text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground mb-2">
        SCROLLABLE TICKET LEDGER
      </div>
      <ScrollArea className="h-48 w-full">
        <div className="space-y-1.5 pr-3 font-mono text-xs">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between rounded border border-border bg-secondary/40 p-2 text-[11px]"
            >
              <span>{item}</span>
              <span className="rounded bg-accent/15 px-1 text-[9px] font-bold text-accent">VIP</span>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

function AnimatedHoverCardPreview() {
  return (
    <div className="flex flex-col items-center gap-3">
      <HoverCard openDelay={150} closeDelay={200}>
        <HoverCardTrigger asChild>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-md border-2 border-foreground bg-card px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-foreground shadow-xs transition-transform hover:scale-105"
          >
            <span className="size-2 rounded-full bg-accent animate-pulse" />
            HOVER PASS • ROW A SEAT 18
          </button>
        </HoverCardTrigger>
        <HoverCardContent side="bottom" align="center" showBeak>
          <HoverCardSeatSummary
            badge="VIP ALL-ACCESS PASS"
            ticketNo="#TKT-9920-X"
            attendeeName="Elena Vance"
            attendeeRole="Lead Guest"
            status="vip"
            eventTitle="GLOBAL ADMISSION SUMMIT"
            date="SEP 18, 2026 • 19:30"
            venue="Grand Arena"
            tier="DIAMOND"
            section="SEC A1"
            row="ROW 04"
            seat="SEAT 18"
            barcode="VIP-ADMIT-ONE"
          />
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}

function AnimatedDrawerPreview() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex flex-col items-center gap-3">
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <button
            type="button"
            className="rounded-md border-2 border-foreground bg-foreground px-4 py-2 font-mono text-xs font-bold uppercase text-background transition-transform hover:scale-105 active:scale-95"
          >
            OPEN ADMISSION DRAWER
          </button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>ADMISSION GATE SHEET</DrawerTitle>
            <DrawerDescription>Pull down or click close to dismiss</DrawerDescription>
          </DrawerHeader>
          <DrawerBody>
            <div className="p-4 rounded-lg border-2 border-dashed border-border bg-secondary/30 font-mono text-xs">
              <div className="font-bold text-foreground">STUB #BB-4091 VALIDATED</div>
              <p className="mt-1 text-muted-foreground text-[11px]">Gate 04 North • Section VIP A1 • Seat 18</p>
            </div>
          </DrawerBody>
          <DrawerFooter>
            <DrawerClose asChild>
              <button type="button" className="px-3 py-1.5 font-mono text-xs rounded border border-border">
                CLOSE
              </button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

function AnimatedKeypadPreview() {
  const [pin, setPin] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "validating" | "success" | "error">("idle");
  const [msg, setMsg] = React.useState<string | undefined>(undefined);

  const handleSubmit = (enteredPin: string) => {
    if (enteredPin.length < 4) {
      setStatus("error");
      setMsg("ENTER COMPLETE 4-DIGIT PIN");
      setTimeout(() => {
        setStatus("idle");
        setMsg(undefined);
      }, 1500);
      return;
    }

    setStatus("validating");
    setMsg("AUTHENTICATING STUB CREDENTIALS...");

    setTimeout(() => {
      if (enteredPin === "2026" || enteredPin === "1234") {
        setStatus("success");
        setMsg("VALID PASS #8841 · ADMIT 1 ATTENDEE");
      } else {
        setStatus("error");
        setMsg(`DENIED · CODE ${enteredPin} NOT IN REGISTRY`);
      }

      setTimeout(() => {
        setStatus("idle");
        setMsg(undefined);
      }, 3000);
    }, 600);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center gap-2">
        <span className="font-mono text-[10px] text-muted-foreground uppercase">
          DEMO PASSCODE: <span className="font-bold text-accent">2026</span>
        </span>
        <button
          type="button"
          onClick={() => {
            setPin("2026");
            setStatus("idle");
            setMsg(undefined);
          }}
          className="rounded border border-border px-1.5 py-0.5 font-mono text-[9px] uppercase hover:bg-secondary transition-colors"
        >
          FILL 2026
        </button>
      </div>

      <Keypad
        value={pin}
        onValueChange={setPin}
        onSubmit={handleSubmit}
        status={status}
        statusMessage={msg}
        maxLength={4}
        terminalId="TURNSTILE #04"
        gate="GATE VIP-A"
      />
    </div>
  );
}

function AnimatedTagInputPreview() {
  const [tags, setTags] = React.useState<string[]>([
    "VIP ACCESS",
    "INDIE ROCK",
    "MAIN STAGE",
    "EARLY BIRD",
  ]);

  return (
    <div className="w-full max-w-md flex flex-col gap-3">
      <TagInput
        value={tags}
        onChange={setTags}
        placeholder="Add category, artist, genre..."
        label="TICKET CATEGORIES & GENRES"
        serial="TAG-PASS #742"
        tagVariant="default"
        suggestions={[
          "BACKSTAGE",
          "MATINEE",
          "ORCHESTRA",
          "FESTIVAL PASS",
          "ALL ACCESS",
        ]}
      />

      <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground px-1">
        <span>{tags.length} TAGS SELECTED</span>
        <span className="text-accent font-semibold">TICKET STUB BADGES</span>
      </div>
    </div>
  );
}

function AnimatedPricingTablePreview() {
  const [cycle, setCycle] = React.useState<"monthly" | "annual">("annual");

  return (
    <div className="w-full max-w-5xl py-2">
      <PricingTable
        billingCycle={cycle}
        onBillingCycleChange={setCycle}
      />
    </div>
  );
}

function AnimatedMetricCardPreview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl py-2">
      <MetricCard
        title="MONTHLY REVENUE"
        value="$48,250"
        serial="MET-01-MRR"
        trend={{ value: "+14.8%", label: "vs last month" }}
        sparklineData={[32, 38, 35, 42, 40, 48, 52, 59, 64]}
        sparklineTone="accent"
        badge="REALTIME"
        footerText="Refreshed 2m ago"
      />
      <MetricCard
        title="ACTIVE PASSES"
        value="1,420"
        suffix="TIERS"
        serial="MET-02-PASS"
        trend={{ value: "+8.2%", label: "vs last 30d" }}
        progress={78}
        progressTarget="Target: 1,800"
        badge="AUDITED"
        footerText="Active turnstiles: 14"
      />
      <MetricCard
        title="GATE LATENCY"
        value="18"
        suffix="ms"
        serial="MET-03-LAT"
        trend={{ value: "-12.4%", label: "vs yesterday", invertColors: true }}
        sparklineData={[42, 36, 31, 28, 25, 22, 19, 18]}
        sparklineTone="success"
        badge="OPTIMAL"
        statusDot="active"
        footerText="Global edge p99"
      />
    </div>
  );
}

function AnimatedDonutChartPreview() {
  const [activeSet, setActiveSet] = React.useState<"admissions" | "revenue">("admissions");
  const [variant, setVariant] = React.useState<"donut" | "pie">("donut");

  const admissionData = [
    { label: "VIP Floor", value: 450, tone: "accent" as const, description: "All-access floor tier" },
    { label: "Orchestra", value: 680, tone: "primary" as const, description: "Lower tier prime reserved" },
    { label: "Mezzanine", value: 520, tone: "warning" as const, description: "Elevated tier front center" },
    { label: "Balcony", value: 390, tone: "info" as const, description: "Upper arena rows" },
    { label: "Press Box", value: 160, tone: "success" as const, description: "Media & staff accreditation" },
  ];

  const revenueData = [
    { label: "Season Passes", value: 84000, tone: "accent" as const },
    { label: "Gate Tickets", value: 46500, tone: "primary" as const },
    { label: "Merchandise", value: 29800, tone: "warning" as const },
    { label: "VIP Lounges", value: 18200, tone: "success" as const },
  ];

  const currentData = activeSet === "admissions" ? admissionData : revenueData;

  return (
    <div className="w-full max-w-xl flex flex-col items-center gap-4 py-2">
      <div className="flex flex-wrap items-center justify-between w-full gap-2 px-1">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveSet("admissions")}
            className={cn(
              "font-mono text-xs uppercase px-2.5 py-1 rounded-xs border transition-all cursor-pointer",
              activeSet === "admissions"
                ? "border-foreground bg-primary text-primary-foreground font-bold shadow-xs"
                : "border-dashed border-border bg-secondary/50 text-muted-foreground hover:text-foreground"
            )}
          >
            Admissions
          </button>
          <button
            type="button"
            onClick={() => setActiveSet("revenue")}
            className={cn(
              "font-mono text-xs uppercase px-2.5 py-1 rounded-xs border transition-all cursor-pointer",
              activeSet === "revenue"
                ? "border-foreground bg-primary text-primary-foreground font-bold shadow-xs"
                : "border-dashed border-border bg-secondary/50 text-muted-foreground hover:text-foreground"
            )}
          >
            Revenue ($)
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setVariant("donut")}
            className={cn(
              "font-mono text-xs uppercase px-2 py-1 rounded-xs border transition-all cursor-pointer",
              variant === "donut"
                ? "border-accent text-accent font-bold bg-accent/10"
                : "border-dashed border-border text-muted-foreground hover:text-foreground"
            )}
          >
            Donut
          </button>
          <button
            type="button"
            onClick={() => setVariant("pie")}
            className={cn(
              "font-mono text-xs uppercase px-2 py-1 rounded-xs border transition-all cursor-pointer",
              variant === "pie"
                ? "border-accent text-accent font-bold bg-accent/10"
                : "border-dashed border-border text-muted-foreground hover:text-foreground"
            )}
          >
            Pie
          </button>
        </div>
      </div>

      <DonutChart
        data={currentData}
        variant={variant}
        size={230}
        innerRadiusRatio={0.62}
        title={activeSet === "admissions" ? "SECTOR ADMISSIONS" : "STUB REVENUE"}
        subtitle={activeSet === "admissions" ? "2,200 CAPACITY MATRIX" : "GROSS BOX OFFICE"}
        ticketSerial={activeSet === "admissions" ? "№ DNT-401" : "№ REV-992"}
        formatValue={(val) =>
          activeSet === "revenue" ? `$${val.toLocaleString()}` : val.toLocaleString()
        }
        centerLabel={activeSet === "admissions" ? "TOTAL SEATS" : "GROSS SALES"}
        className="w-full"
      />
    </div>
  );
}

function AnimatedDockPreview() {
  const [activeApp, setActiveApp] = React.useState("terminal");
  const [notificationCount, setNotificationCount] = React.useState(3);

  return (
    <div className="w-full flex flex-col items-center justify-center py-6 gap-4">
      <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground flex items-center gap-2">
        <span className="size-1.5 rounded-full bg-accent animate-ping" />
        HOVER TO MAGNIFY · CLICK TO SWITCH ACTIVE STUB APP
      </div>

      <Dock magnification={1.5} distance={130} iconSize={42}>
        <DockItem
          label="Terminal"
          shortcut="⌘1"
          active={activeApp === "terminal"}
          onClick={() => setActiveApp("terminal")}
          icon={
            <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="4 17 10 11 4 5" />
              <line x1="12" y1="19" x2="20" y2="19" />
            </svg>
          }
        />
        <DockItem
          label="Admissions"
          shortcut="⌘2"
          active={activeApp === "admissions"}
          onClick={() => setActiveApp("admissions")}
          icon={
            <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
              <path d="M13 5v2" />
              <path d="M13 17v2" />
              <path d="M13 11v2" />
            </svg>
          }
        />
        <DockItem
          label="Analytics"
          shortcut="⌘3"
          badge={notificationCount > 0 ? notificationCount : undefined}
          active={activeApp === "analytics"}
          onClick={() => {
            setActiveApp("analytics");
            setNotificationCount(0);
          }}
          icon={
            <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="20" x2="18" y2="10" />
              <line x1="12" y1="20" x2="12" y2="4" />
              <line x1="6" y1="20" x2="6" y2="14" />
            </svg>
          }
        />
        <DockItem
          label="Scanner"
          shortcut="⌘4"
          active={activeApp === "scanner"}
          onClick={() => setActiveApp("scanner")}
          icon={
            <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
            </svg>
          }
        />

        <DockSeparator />

        <DockItem
          label="Seating Map"
          shortcut="⌘5"
          active={activeApp === "seating"}
          onClick={() => setActiveApp("seating")}
          icon={
            <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="16" rx="2" />
              <line x1="3" y1="10" x2="21" y2="10" />
              <line x1="9" y1="10" x2="9" y2="20" />
              <line x1="15" y1="10" x2="15" y2="20" />
            </svg>
          }
        />
        <DockItem
          label="VIP Passes"
          badge="VIP"
          active={activeApp === "vip"}
          onClick={() => setActiveApp("vip")}
          icon={
            <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          }
        />
        <DockItem
          label="Settings"
          shortcut="⌘,"
          active={activeApp === "settings"}
          onClick={() => setActiveApp("settings")}
          icon={
            <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1Z" />
            </svg>
          }
        />
      </Dock>

      <div className="font-mono text-[10px] text-muted-foreground">
        CURRENT WORKSPACE: <span className="font-bold text-accent uppercase">{activeApp}</span>
      </div>
    </div>
  );
}

/* Master Previews Record for all Components */

const previews: Record<string, React.ComponentType> = {
  collapsible: AnimatedCollapsiblePreview,
  "aspect-ratio": AnimatedAspectRatioPreview,
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
            <AccordionContent>An open-source React 19 component library.</AccordionContent>
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

  star: () => (
    <div className="flex items-center gap-3">
      <Star size={14} />
      <Star size={20} className="text-accent-strong" />
      <Star size={28} />
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
  "audio-mini": AnimatedAudioMiniPreview,
  "section-heading": AnimatedSectionHeadingPreview,
  "dual-slider": AnimatedDualSliderPreview,
  tour: AnimatedTourPreview,
  "mention-input": AnimatedMentionInputPreview,
  navbar: AnimatedNavbarPreview,
  autocomplete: AnimatedAutocompletePreview,
  lightbox: AnimatedLightboxPreview,
  "transfer-list": AnimatedTransferListPreview,
  "tree-nav": AnimatedTreeNavPreview,
  "tree-select": AnimatedTreeSelectPreview,
  "masked-currency": AnimatedMaskedCurrencyPreview,
  "sticky-bar": AnimatedStickyBarPreview,
  stack: AnimatedStackPreview,
  container: AnimatedContainerPreview,
  "kanban-lite": AnimatedKanbanLitePreview,
  "gantt-lite": AnimatedGanttLitePreview,
  sidebar: AnimatedSidebarPreview,
  stopwatch: AnimatedStopwatchPreview,
  countup: AnimatedCountupPreview,
  "theme-toggle": AnimatedThemeTogglePreview,
  "signature-pad": AnimatedSignaturePadPreview,
  "qr-reader": AnimatedQrReaderPreview,
  "audio-waveform": AnimatedAudioWaveformPreview,
  "nfc-badge": AnimatedNfcBadgePreview,
  "scratch-off": AnimatedScratchOffPreview,
  "ticket-fold": AnimatedTicketFoldPreview,
  "segmented-switch": AnimatedSegmentedSwitchPreview,
  "split-flap": AnimatedSplitFlapPreview,
  "seat-map": AnimatedSeatMapPreview,
  watermark: AnimatedWatermarkPreview,
  "breadcrumb-dropdown": AnimatedBreadcrumbDropdownPreview,
  "turnstile-gate": AnimatedTurnstileGatePreview,
  resizable: AnimatedResizablePreview,
  "scroll-area": AnimatedScrollAreaPreview,
  "hover-card": AnimatedHoverCardPreview,
  drawer: AnimatedDrawerPreview,
  keypad: AnimatedKeypadPreview,
  "tag-input": AnimatedTagInputPreview,
  "pricing-table": AnimatedPricingTablePreview,
  "metric-card": AnimatedMetricCardPreview,
  "donut-chart": AnimatedDonutChartPreview,
  dock: AnimatedDockPreview,
};


import { waveAdvancedPreviews } from "@/components/site/previews/wave-advanced";
import { wave1Previews } from "@/components/site/previews/wave1";
import { wave10Previews } from "@/components/site/previews/wave10";
import { wave11Previews } from "@/components/site/previews/wave11";
import { wave12Previews } from "@/components/site/previews/wave12";
import { wave2Previews } from "@/components/site/previews/wave2";
import { wave20Previews } from "@/components/site/previews/wave20";import { wave3Previews } from "@/components/site/previews/wave3";
import { wave4Previews } from "@/components/site/previews/wave4";
import { wave5Previews } from "@/components/site/previews/wave5";
import { wave6Previews } from "@/components/site/previews/wave6";
import { wave7Previews } from "@/components/site/previews/wave7";
import { wave8Previews } from "@/components/site/previews/wave8";
import { wave9Previews } from "@/components/site/previews/wave9";

Object.assign(previews, waveAdvancedPreviews, wave1Previews, wave10Previews, wave11Previews, wave12Previews, wave20Previews, wave2Previews, wave3Previews, wave4Previews, wave5Previews, wave6Previews, wave7Previews, wave8Previews, wave9Previews);

import { wave13Previews } from "@/components/site/previews/wave13";
import { wave14Previews } from "@/components/site/previews/wave14";
import { wave15Previews } from "@/components/site/previews/wave15";
import { wave16Previews } from "@/components/site/previews/wave16";
import { wave17Previews } from "@/components/site/previews/wave17";
import { wave18Previews } from "@/components/site/previews/wave18";

Object.assign(previews, wave13Previews, wave14Previews, wave15Previews, wave16Previews, wave17Previews, wave18Previews,);

import { wave19Previews } from "@/components/site/previews/wave19";

Object.assign(previews, wave19Previews);

import { wave21Previews } from "@/components/site/previews/wave21";

Object.assign(previews, wave21Previews);

export function ComponentPreview({ name }: { name: string }) {
  const [isDark, setIsDark] = React.useState(false);
  const [reloadKey, setReloadKey] = React.useState(0);

  const Preview = previews[name];
  if (!Preview) {
    return <p className="text-sm text-muted-foreground font-mono">Preview not available.</p>;
  }

  return (
    <div className="w-full overflow-hidden rounded-lg border border-border bg-card shadow-2xs">
      {/* Interactive Canvas Toolbar */}
      <div className="flex items-center justify-between border-b border-border bg-secondary/40 px-3 py-2 text-xs sm:px-4">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-accent/70" aria-hidden="true" />
          <span className="font-mono text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Live Preview
          </span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={() => setReloadKey((k) => k + 1)}
            title="Reset component state & replay entrance animations"
            className="cursor-pointer rounded border border-border bg-card px-2 py-0.5 font-mono text-[11px] text-muted-foreground transition-colors hover:text-foreground active:scale-95"
          >
            ↻ Replay
          </button>
          <button
            type="button"
            onClick={() => setIsDark((d) => !d)}
            title="Toggle preview canvas between Paper (light) and Night (dark)"
            className={cn(
              "cursor-pointer rounded border px-2 py-0.5 font-mono text-[11px] uppercase transition-colors active:scale-95",
              isDark
                ? "border-accent bg-accent/15 font-semibold text-accent-strong"
                : "border-border bg-card text-muted-foreground hover:text-foreground"
            )}
          >
            {isDark ? "🌙 Night" : "☀️ Paper"}
          </button>
        </div>
      </div>

      {/* Render Canvas */}
      <div
        key={reloadKey}
        className={cn(
          "flex min-h-52 w-full items-center justify-center overflow-x-auto p-4 transition-colors sm:p-8",
          isDark ? "dark bg-background text-foreground" : "bg-card text-foreground"
        )}
      >
        <Preview />
      </div>
    </div>
  );
}
