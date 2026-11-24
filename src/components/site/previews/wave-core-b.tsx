"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ColorPicker } from "@/components/ui/color-picker";
import { PasswordStrength } from "@/components/ui/password-strength";
import { InlineEdit } from "@/components/ui/inline-edit";
import { DataTable } from "@/components/ui/data-table";
import { ConfettiBurst } from "@/components/ui/confetti-burst";
import { ContextMenu } from "@/components/ui/context-menu";
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
import { SplitFlapBoard } from "@/components/ui/split-flap";
import { SeatMap } from "@/components/ui/seat-map";
import { Watermark } from "@/components/ui/watermark";
import { BreadcrumbDropdown } from "@/components/ui/breadcrumb-dropdown";
import { TurnstileGate } from "@/components/ui/turnstile-gate";
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
import { useTicketAudio } from "@/components/ui/lib/use-ticket-audio";

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
        <span className="text-accent motion-safe:animate-bounce">▲</span>
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
        <span className="me-2">🎟️</span> Open Ticket Lightbox
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
          syncHtmlDark={false}
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
          syncHtmlDark={false}
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
        <div className="rounded-md border border-dashed border-success/60 bg-success/10 px-3 py-1.5 font-mono text-xs text-success">
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
        <div className="space-y-1.5 pe-3 font-mono text-xs">
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
            <span className="size-2 rounded-full bg-accent motion-safe:animate-pulse" />
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
        <span className="size-1.5 rounded-full bg-accent motion-safe:animate-ping" />
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
function AnimatedUseTicketAudioPreview() {
  const { muted, toggle, setMuted } = useTicketAudio({ initialMuted: false });

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-3 rounded-lg border border-border bg-card p-5 text-center">
      <div className="flex items-center gap-2">
        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground">
          Audio State
        </span>
        <Badge variant={muted ? "secondary" : "default"}>
          {muted ? "Muted" : "Unmuted"}
        </Badge>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button type="button" size="sm" variant="outline" aria-pressed={muted} onClick={toggle}>
          {muted ? "Unmute via toggle()" : "Mute via toggle()"}
        </Button>
        <Button type="button" size="sm" variant="ghost" onClick={() => setMuted(false)} disabled={!muted}>
          Reset
        </Button>
      </div>
    </div>
  );
}

export const waveCoreBPreviews: Record<string, React.ComponentType> = {
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
  "use-ticket-audio": AnimatedUseTicketAudioPreview,
};
