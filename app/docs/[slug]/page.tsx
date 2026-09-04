import Link from "next/link";
import { notFound } from "next/navigation";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { components } from "@/lib/registry-site";
import { ComponentPreview } from "@/components/site/component-preview";
import { CodeCopy } from "@/components/site/code-copy";
import { Badge } from "@/components/ui/badge";

export function generateStaticParams() {
  return components.map((component) => ({ slug: component.name }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const meta = components.find((component) => component.name === slug);
  return { title: meta ? meta.title : "Component" };
}

const usage: Record<string, string> = {
  button: `import { Button } from "@/components/ui/button";\n\n<Button>Admit one</Button>\n<Button variant="outline" size="lg">Outline</Button>`,
  input: `import { Input } from "@/components/ui/input";\n\n<Input type="email" placeholder="Email" />`,
  card: `import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";\n\n<Card>\n  <CardHeader>\n    <CardTitle>Title</CardTitle>\n    <CardDescription>Description</CardDescription>\n  </CardHeader>\n  <CardContent>Content</CardContent>\n</Card>`,
  badge: `import { Badge } from "@/components/ui/badge";\n\n<Badge>New</Badge>\n<Badge variant="accent">Accent</Badge>`,
  accordion: `import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";\n\n<Accordion defaultValue="a">\n  <AccordionItem value="a">\n    <AccordionTrigger>Question?</AccordionTrigger>\n    <AccordionContent>Answer.</AccordionContent>\n  </AccordionItem>\n</Accordion>`,
  dialog: `const [open, setOpen] = useState(false);\n\n<Button onClick={() => setOpen(true)}>Open</Button>\n<Dialog open={open} onOpenChange={setOpen}>\n  <DialogHeader>\n    <DialogTitle>Title</DialogTitle>\n    <DialogDescription>Description.</DialogDescription>\n  </DialogHeader>\n  <DialogFooter>\n    <Button onClick={() => setOpen(false)}>Got it</Button>\n  </DialogFooter>\n</Dialog>`,
  tabs: `import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";\n\n<Tabs defaultValue="one">\n  <TabsList>\n    <TabsTrigger value="one">One</TabsTrigger>\n    <TabsTrigger value="two">Two</TabsTrigger>\n  </TabsList>\n  <TabsContent value="one">First.</TabsContent>\n  <TabsContent value="two">Second.</TabsContent>\n</Tabs>`,
  tooltip: `import { Tooltip } from "@/components/ui/tooltip";\n\n<Tooltip content="Helpful text">\n  <Button variant="outline">Hover me</Button>\n</Tooltip>`,
  switch: `import { Switch } from "@/components/ui/switch";\n\n<Switch defaultChecked aria-label="Notifications" />`,
  checkbox: `import { Checkbox } from "@/components/ui/checkbox";\n\n<Checkbox defaultChecked aria-label="Accept terms" />`,
  "radio-group": `import { RadioGroup, RadioItem } from "@/components/ui/radio-group";\n\n<RadioGroup name="seat" defaultValue="window">\n  <RadioItem value="window">Window</RadioItem>\n  <RadioItem value="aisle">Aisle</RadioItem>\n</RadioGroup>`,
  slider: `import { Slider } from "@/components/ui/slider";\n\n<Slider defaultValue={60} aria-label="Volume" />`,
  progress: `import { Progress } from "@/components/ui/progress";\n\n<Progress value={72} />`,
  avatar: `import { Avatar } from "@/components/ui/avatar";\n\n<Avatar name="Ada Bull" />`,
  alert: `import { Alert } from "@/components/ui/alert";\n\n<Alert tone="accent" title="Limited seats">Only a few stubs left.</Alert>`,
  textarea: `import { Textarea } from "@/components/ui/textarea";\n\n<Textarea placeholder="Special requests..." rows={3} />`,

  // P1
  select: `import { Select } from "@/components/ui/select";\n\n<Select\n  options={[\n    { value: "a", label: "Option A" },\n    { value: "b", label: "Option B" },\n  ]}\n  placeholder="Select an option"\n/>`,
  stepper: `import { Stepper } from "@/components/ui/stepper";\n\n<Stepper defaultValue={1} min={0} max={10} />`,
  "pin-input": `import { PinInput } from "@/components/ui/pin-input";\n\n<PinInput length={4} onComplete={(pin) => console.log(pin)} />`,
  rating: `import { Rating } from "@/components/ui/rating";\n\n<Rating defaultValue={4} max={5} />`,
  pagination: `import { Pagination } from "@/components/ui/pagination";\n\n<Pagination page={1} totalPages={10} onPageChange={(p) => setPage(p)} />`,
  breadcrumb: `import { Breadcrumb, BreadcrumbItem } from "@/components/ui/breadcrumb";\n\n<Breadcrumb>\n  <BreadcrumbItem href="/">Home</BreadcrumbItem>\n  <BreadcrumbItem href="/docs">Docs</BreadcrumbItem>\n  <BreadcrumbItem current>Ticket</BreadcrumbItem>\n</Breadcrumb>`,
  steps: `import { Steps } from "@/components/ui/steps";\n\n<Steps\n  current={1}\n  steps={[\n    { title: "Seat", description: "Select seat" },\n    { title: "Payment", description: "Confirm stub" },\n    { title: "Ticket", description: "Ready to admit" },\n  ]}\n/>`,
  "toggle-group": `import { ToggleGroup, ToggleItem } from "@/components/ui/toggle-group";\n\n<ToggleGroup defaultValue="all">\n  <ToggleItem value="all">All</ToggleItem>\n  <ToggleItem value="stubs">Stubs</ToggleItem>\n  <ToggleItem value="vip">VIP</ToggleItem>\n</ToggleGroup>`,
  toast: `import { ToastProvider, useToast } from "@/components/ui/toast";\n\nfunction Demo() {\n  const { toast } = useToast();\n  return (\n    <button onClick={() => toast({ title: "Admitted", description: "Stub #402 accepted." })}>\n      Show Toast\n    </button>\n  );\n}`,
  sheet: `import { Sheet, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";\n\n<Sheet open={open} onOpenChange={setOpen} side="right">\n  <SheetHeader>\n    <SheetTitle>Ticket Drawer</SheetTitle>\n    <SheetDescription>Order overview.</SheetDescription>\n  </SheetHeader>\n</Sheet>`,
  popover: `import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";\n\n<Popover>\n  <PopoverTrigger>\n    <Button variant="outline">Info</Button>\n  </PopoverTrigger>\n  <PopoverContent>Gate information.</PopoverContent>\n</Popover>`,
  empty: `import { Empty } from "@/components/ui/empty";\n\n<Empty\n  title="NO TICKETS"\n  description="No stubs found in your collection."\n  action={<Button size="sm">Browse events</Button>}\n/>`,
  kbd: `import { Kbd } from "@/components/ui/kbd";\n\n<Kbd>⌘</Kbd> + <Kbd>K</Kbd>`,
  separator: `import { Separator } from "@/components/ui/separator";\n\n<Separator dashed={true} />`,
  table: `import { Table, TableHead, TableBody, TableRow, TableCell, TableHeaderCell } from "@/components/ui/table";\n\n<Table>\n  <TableHead>\n    <TableRow>\n      <TableHeaderCell>Seat</TableHeaderCell>\n      <TableHeaderCell>Status</TableHeaderCell>\n    </TableRow>\n  </TableHead>\n  <TableBody>\n    <TableRow>\n      <TableCell>A-12</TableCell>\n      <TableCell>Admitted</TableCell>\n    </TableRow>\n  </TableBody>\n</Table>`,
  marquee: `import { Marquee } from "@/components/ui/marquee";\n\n<Marquee speed={25}>\n  <span>★ ADMIT ONE ★ BIGBULLUI ★</span>\n</Marquee>`,

  // P2 Wave 1
  "ticket-card": `import { TicketCard } from "@/components/ui/ticket-card";\n\n<TicketCard\n  eventName="BIGBULL MAIN STAGE"\n  status="valid"\n  price="$45.00"\n/>`,
  barcode: `import { Barcode } from "@/components/ui/barcode";\n\n<Barcode value="BB-90210" height={48} />`,
  "stamp-seal": `import { StampSeal } from "@/components/ui/stamp-seal";\n\n<StampSeal text="ADMITTED" tone="accent" rotate={-8} />`,
  spinner: `import { Spinner } from "@/components/ui/spinner";\n\n<Spinner size="md" />`,
  skeleton: `import { Skeleton } from "@/components/ui/skeleton";\n\n<Skeleton className="h-4 w-48" />`,
  "copy-button": `import { CopyButton } from "@/components/ui/copy-button";\n\n<CopyButton value="npm install bigbullui" />`,

  // P2 Wave 2
  coupon: `import { Coupon } from "@/components/ui/coupon";\n\n<Coupon\n  code="BIGBULL25"\n  discount="25%"\n  title="FESTIVAL PASS"\n  expires="31 DEC"\n/>`,
  "boarding-pass": `import { BoardingPass } from "@/components/ui/boarding-pass";\n\n<BoardingPass\n  flight="BB-402"\n  origin="JFK"\n  destination="IST"\n  passenger="ADA BULL"\n  seat="12A"\n/>`,
  "price-tag": `import { PriceTag } from "@/components/ui/price-tag";\n\n<PriceTag price="45.00" originalPrice="60.00" sale label="VIP ADMISSION" />`,
  "luggage-tag": `import { LuggageTag } from "@/components/ui/luggage-tag";\n\n<LuggageTag tagNumber="BB-920-142" destination="IST" passengerName="ADA BULL" />`,
  timeline: `import { Timeline } from "@/components/ui/timeline";\n\n<Timeline\n  items={[\n    { date: "18:00", title: "Doors Open" },\n    { date: "20:00", title: "Main Event", tone: "accent" },\n  ]}\n/>`,
  sparkline: `import { Sparkline } from "@/components/ui/sparkline";\n\n<Sparkline data={[10, 25, 18, 42, 35, 60, 52, 85]} tone="accent" />`,
  countdown: `import { Countdown } from "@/components/ui/countdown";\n\n<Countdown targetDate={new Date("2026-12-31T23:59:59")} />`,
  "search-bar": `import { SearchBar } from "@/components/ui/search-bar";\n\n<SearchBar placeholder="Search tickets..." shortcut="⌘K" />`,
  "dropdown-menu": `import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";\n\n<DropdownMenu>\n  <DropdownMenuTrigger><Button variant="outline">Options</Button></DropdownMenuTrigger>\n  <DropdownMenuContent>\n    <DropdownMenuItem shortcut="⌘P">Print</DropdownMenuItem>\n  </DropdownMenuContent>\n</DropdownMenu>`,
  "cookie-banner": `import { CookieBanner } from "@/components/ui/cookie-banner";\n\n<CookieBanner onAccept={() => console.log("Admitted")} />`,
  "bar-chart": `import { BarChart } from "@/components/ui/bar-chart";\n\n<BarChart\n  data={[\n    { label: "A", value: 40 },\n    { label: "B", value: 80, tone: "accent" },\n  ]}\n/>`,
  combobox: `import { Combobox } from "@/components/ui/combobox";\n\n<Combobox\n  options={[\n    { value: "orch", label: "Orchestra" },\n    { value: "balc", label: "Balcony" },\n  ]}\n  placeholder="Select seat..."\n/>`,
  "file-dropzone": `import { FileDropzone } from "@/components/ui/file-dropzone";\n\n<FileDropzone\n  accept="image/*,.pdf"\n  onFilesDrop={(files) => console.log(files)}\n/>`,
  "color-picker": `import { ColorPicker } from "@/components/ui/color-picker";\n\n<ColorPicker\n  defaultValue="#BC3A28"\n  onValueChange={(c) => console.log(c)}\n/>`,
  "password-strength": `import { PasswordStrength } from "@/components/ui/password-strength";\n\n<PasswordStrength value="TicketSecret!2026" />`,
  "inline-edit": `import { InlineEdit } from "@/components/ui/inline-edit";\n\n<InlineEdit\n  label="SEAT ASSIGNMENT"\n  defaultValue="ROW C · SEAT 12"\n  onSave={(val) => console.log(val)}\n/>`,
  calendar: `import { Calendar } from "@/components/ui/calendar";\n\n<Calendar\n  defaultValue={new Date()}\n  onValueChange={(date) => console.log(date)}\n/>`,
  "data-table": `import { DataTable } from "@/components/ui/data-table";\n\n<DataTable\n  data={[\n    { id: "1", seat: "A-12", tier: "VIP", price: "$95" },\n    { id: "2", seat: "B-04", tier: "Balcony", price: "$45" },\n  ]}\n  columns={[\n    { key: "seat", header: "Seat", sortable: true },\n    { key: "tier", header: "Tier" },\n    { key: "price", header: "Price", sortable: true },\n  ]}\n  searchKey="seat"\n/>`,
  "confetti-burst": `import { ConfettiBurst } from "@/components/ui/confetti-burst";\n\n<div className="relative">\n  <ConfettiBurst active count={30} />\n</div>`,
  "command-palette": `import { CommandPalette } from "@/components/ui/command-palette";\n\n<CommandPalette\n  open={open}\n  onOpenChange={setOpen}\n  items={[\n    { id: "1", label: "Print Stubs", shortcut: "⌘P", onSelect: () => {} },\n    { id: "2", label: "Seat Map", shortcut: "⌘M", onSelect: () => {} },\n  ]}\n/>`,
  "context-menu": `import { ContextMenu } from "@/components/ui/context-menu";\n\n<ContextMenu\n  items={[\n    { id: "print", label: "Print Stub", shortcut: "⌘P" },\n    "separator",\n    { id: "revoke", label: "Revoke Ticket", danger: true },\n  ]}\n>\n  <div className="p-8 border border-dashed rounded-lg">Right-click here</div>\n</ContextMenu>`,
  "scroll-top": `import { ScrollTop } from "@/components/ui/scroll-top";\n\n<ScrollTop threshold={150} label="TOP" />`,
  "time-input": `import { TimeInput } from "@/components/ui/time-input";\n\n<TimeInput defaultValue="20:00" onValueChange={(t) => console.log(t)} />`,
  "masked-input": `import { MaskedInput } from "@/components/ui/masked-input";\n\n<MaskedInput mask="BB-####-####" defaultValue="BB-2026-0001" />`,
  "date-picker": `import { DatePicker } from "@/components/ui/date-picker";\n\n<DatePicker defaultValue={new Date()} onValueChange={(d) => console.log(d)} />`,
  menubar: `import { Menubar } from "@/components/ui/menubar";\n\n<Menubar\n  menus={[\n    { id: "file", label: "Ticket", items: [{ id: "p", label: "Print", shortcut: "⌘P" }] },\n  ]}\n/>`,
  "video-frame": `import { VideoFrame } from "@/components/ui/video-frame";\n\n<VideoFrame\n  title="CINEMA MATINEE"\n  reelNumber="REEL-01"\n  duration="01:30:00"\n/>`,
  "audio-mini": `import { AudioMini } from "@/components/ui/audio-mini";\n\n<AudioMini title="CONCERT LIVE" artist="ORCHESTRA" duration="03:45" />`,
  "section-heading": `import { SectionHeading } from "@/components/ui/section-heading";\n\n<SectionHeading title="ORCHESTRA TIER" subtitle="DOORS OPEN 19:30" badge="GATE 03" />`,
  "dual-slider": `import { DualSlider } from "@/components/ui/dual-slider";\n\n<DualSlider min={10} max={200} defaultValue={[30, 100]} />`,
  tour: `import { Tour } from "@/components/ui/tour";\n\n<Tour\n  steps={[\n    { title: "Select Seat", description: "Choose your section." },\n    { title: "Confirm Order", description: "Receive digital pass." },\n  ]}\n/>`,
  "mention-input": `import { MentionInput } from "@/components/ui/mention-input";\n\n<MentionInput placeholder="Type @ to assign seat tier..." />`,
  navbar: `import { Navbar } from "@/components/ui/navbar";\n\n<Navbar brand="BIGBULL" items={[{ label: "EVENTS", href: "#", active: true }]} />`,
  autocomplete: `import { Autocomplete } from "@/components/ui/autocomplete";\n\n<Autocomplete options={[{ value: "1", label: "Orchestra" }]} />`,
  lightbox: `import { Lightbox } from "@/components/ui/lightbox";\n\n<Lightbox open={open} onOpenChange={setOpen} images={[{ src: "/pass.png" }]} />`,
  "transfer-list": `import { TransferList } from "@/components/ui/transfer-list";\n\n<TransferList leftTitle="Available" rightTitle="Claimed" />`,
  "tree-nav": `import { TreeNav } from "@/components/ui/tree-nav";\n\n<TreeNav data={[{ id: "orch", label: "Orchestra Tier", children: [{ id: "r1", label: "Row 1" }] }]} />`,
};

const propsDocs: Record<string, { name: string; type: string; description: string }[]> = {
  button: [
    { name: "variant", type: '"default" | "secondary" | "outline" | "ghost" | "link"', description: "Visual style." },
    { name: "size", type: '"default" | "sm" | "lg" | "icon"', description: "Size of the button." },
  ],
  input: [{ name: "type", type: "string", description: "HTML input type." }],
  card: [],
  badge: [{ name: "variant", type: '"default" | "secondary" | "outline" | "accent"', description: "Visual style." }],
  accordion: [
    { name: "defaultValue", type: "string", description: "Initially open item value." },
    { name: "value", type: "string (on AccordionItem)", description: "Unique item identifier." },
  ],
  dialog: [
    { name: "open", type: "boolean", description: "Whether the dialog is open (controlled)." },
    { name: "onOpenChange", type: "(open: boolean) => void", description: "Called when open state should change." },
  ],
  tabs: [
    { name: "defaultValue", type: "string", description: "Initially active tab value." },
    { name: "value", type: "string", description: "Controlled active tab value." },
    { name: "onValueChange", type: "(value: string) => void", description: "Called when active tab changes." },
  ],
  tooltip: [
    { name: "content", type: "React.ReactNode", description: "Tooltip text or content." },
    { name: "side", type: '"top" | "bottom"', description: "Placement of the tooltip." },
    { name: "delayMs", type: "number", description: "Delay before showing (default 300)." },
  ],
  switch: [
    { name: "checked", type: "boolean", description: "Controlled on state." },
    { name: "defaultChecked", type: "boolean", description: "Uncontrolled initial state (default false)." },
    { name: "onCheckedChange", type: "(checked: boolean) => void", description: "Called when the state changes." },
    { name: "disabled", type: "boolean", description: "Disables interaction (default false)." },
  ],
  checkbox: [
    { name: "checked", type: "boolean", description: "Controlled checked state." },
    { name: "defaultChecked", type: "boolean", description: "Uncontrolled initial state (default false)." },
    { name: "onCheckedChange", type: "(checked: boolean) => void", description: "Called when the state changes." },
    { name: "disabled", type: "boolean", description: "Disables interaction (default false)." },
  ],
  "radio-group": [
    { name: "value", type: "string", description: "Controlled selected value." },
    { name: "defaultValue", type: "string", description: "Uncontrolled initial value." },
    { name: "onValueChange", type: "(value: string) => void", description: "Called when selection changes." },
    { name: "name", type: "string", description: "Native radio group name (required)." },
    { name: "value (RadioItem)", type: "string", description: "Unique item value (required)." },
    { name: "disabled (RadioItem)", type: "boolean", description: "Disables the item (default false)." },
  ],
  slider: [
    { name: "value", type: "number", description: "Controlled value." },
    { name: "defaultValue", type: "number", description: "Uncontrolled initial value (default 50)." },
    { name: "min", type: "number", description: "Minimum value (default 0)." },
    { name: "max", type: "number", description: "Maximum value (default 100)." },
    { name: "step", type: "number", description: "Step increment (default 1)." },
    { name: "onValueChange", type: "(value: number) => void", description: "Called when the value changes." },
    { name: "disabled", type: "boolean", description: "Disables interaction (default false)." },
  ],
  progress: [
    { name: "value", type: "number", description: "Current progress (required, clamped to max)." },
    { name: "max", type: "number", description: "Maximum value (default 100)." },
  ],
  avatar: [
    { name: "name", type: "string", description: "Full name — used for initials and aria-label (required)." },
    { name: "src", type: "string", description: "Photo URL, falls back to initials on error." },
    { name: "size", type: '"sm" | "md" | "lg"', description: "Avatar size (default md)." },
  ],
  alert: [
    { name: "tone", type: '"info" | "accent" | "destructive"', description: "Stamp bar color and eyebrow (default info)." },
    { name: "title", type: "string", description: "Optional bold title line." },
  ],
  textarea: [
    { name: "rows", type: "number", description: "Visible text rows." },
    { name: "placeholder", type: "string", description: "Placeholder text." },
    { name: "disabled", type: "boolean", description: "Disables interaction (default false)." },
  ],

  // P1
  select: [
    { name: "options", type: "SelectOption[]", description: "List of options with value and label (required)." },
    { name: "value", type: "string", description: "Controlled selected value." },
    { name: "defaultValue", type: "string", description: "Initial selected value." },
    { name: "onValueChange", type: "(value: string) => void", description: "Called when selection changes." },
    { name: "placeholder", type: "string", description: "Placeholder text when nothing is selected." },
    { name: "disabled", type: "boolean", description: "Disables select interaction." },
    { name: "name", type: "string", description: "Form name for native submission." },
  ],
  stepper: [
    { name: "value", type: "number", description: "Controlled value." },
    { name: "defaultValue", type: "number", description: "Initial value (default 0)." },
    { name: "min", type: "number", description: "Minimum allowed value (default 0)." },
    { name: "max", type: "number", description: "Maximum allowed value (default 100)." },
    { name: "step", type: "number", description: "Step increment (default 1)." },
    { name: "onValueChange", type: "(value: number) => void", description: "Callback when value changes." },
    { name: "disabled", type: "boolean", description: "Disables stepper interaction." },
  ],
  "pin-input": [
    { name: "length", type: "number", description: "Number of code boxes (default 4)." },
    { name: "value", type: "string", description: "Controlled PIN string." },
    { name: "defaultValue", type: "string", description: "Initial PIN string." },
    { name: "onValueChange", type: "(value: string) => void", description: "Callback on each digit change." },
    { name: "onComplete", type: "(value: string) => void", description: "Callback when all digits are filled." },
    { name: "disabled", type: "boolean", description: "Disables interaction." },
  ],
  rating: [
    { name: "value", type: "number", description: "Controlled rating score." },
    { name: "defaultValue", type: "number", description: "Initial rating score (default 0)." },
    { name: "max", type: "number", description: "Maximum stars (default 5)." },
    { name: "onValueChange", type: "(value: number) => void", description: "Callback when rating changes." },
    { name: "disabled", type: "boolean", description: "Disables rating input." },
  ],
  pagination: [
    { name: "page", type: "number", description: "Current active page (required)." },
    { name: "totalPages", type: "number", description: "Total page count (required)." },
    { name: "onPageChange", type: "(page: number) => void", description: "Page change callback (required)." },
    { name: "siblingCount", type: "number", description: "Neighbor pages to show (default 1)." },
  ],
  breadcrumb: [
    { name: "separator", type: "React.ReactNode", description: "Separator between breadcrumb items (default '/')." },
  ],
  steps: [
    { name: "steps", type: "StepItem[]", description: "List of step items with title and description." },
    { name: "current", type: "number", description: "0-indexed active step." },
  ],
  "toggle-group": [
    { name: "value", type: "string", description: "Controlled selected value." },
    { name: "defaultValue", type: "string", description: "Initial selected value." },
    { name: "onValueChange", type: "(value: string) => void", description: "Selection change callback." },
  ],
  toast: [
    { name: "title", type: "string", description: "Toast title (required)." },
    { name: "description", type: "string", description: "Optional toast body." },
    { name: "tone", type: '"default" | "accent" | "destructive"', description: "Border tone style." },
    { name: "duration", type: "number", description: "Duration in ms before auto-dismiss (default 4000)." },
  ],
  sheet: [
    { name: "open", type: "boolean", description: "Controlled open state (required)." },
    { name: "onOpenChange", type: "(open: boolean) => void", description: "Open state change callback (required)." },
    { name: "side", type: '"right" | "left"', description: "Entrance side (default 'right')." },
  ],
  popover: [
    { name: "open", type: "boolean", description: "Controlled open state." },
    { name: "defaultOpen", type: "boolean", description: "Initial open state." },
    { name: "onOpenChange", type: "(open: boolean) => void", description: "Open state callback." },
  ],
  empty: [
    { name: "title", type: "string", description: "Header text (default 'NOTHING HERE')." },
    { name: "description", type: "string", description: "Optional body explanation." },
    { name: "action", type: "React.ReactNode", description: "Optional action button slot." },
    { name: "icon", type: "React.ReactNode", description: "Custom central icon." },
  ],
  kbd: [
    { name: "children", type: "React.ReactNode", description: "Keycap label or symbol." },
  ],
  separator: [
    { name: "orientation", type: '"horizontal" | "vertical"', description: "Line orientation (default 'horizontal')." },
    { name: "dashed", type: "boolean", description: "Whether border is dashed (default true)." },
  ],
  table: [],
  marquee: [
    { name: "speed", type: "number", description: "Cycle duration in seconds (default 25)." },
    { name: "direction", type: '"left" | "right"', description: "Scroll direction (default 'left')." },
    { name: "pauseOnHover", type: "boolean", description: "Pause on mouse hover (default true)." },
  ],

  // P2 Wave 1
  "ticket-card": [
    { name: "eventName", type: "string", description: "Event headline name." },
    { name: "serial", type: "string", description: "Serial identifier string." },
    { name: "admitCount", type: "string", description: "Admission header text (default 'ADMIT ONE')." },
    { name: "status", type: '"valid" | "admitted" | "void"', description: "Status stamp." },
    { name: "price", type: "string", description: "Price display." },
    { name: "barcodeValue", type: "string", description: "Bottom serial readout." },
  ],
  barcode: [
    { name: "value", type: "string", description: "Data encoded in barcode (required)." },
    { name: "height", type: "number", description: "Height in pixels (default 48)." },
    { name: "showValue", type: "boolean", description: "Display value string below barcode (default true)." },
  ],
  "stamp-seal": [
    { name: "text", type: "string", description: "Main stamp text (default 'ADMITTED')." },
    { name: "subtext", type: "string", description: "Upper arch subtext (default 'OFFICIAL STUB')." },
    { name: "tone", type: '"accent" | "primary" | "destructive"', description: "Border and text tone." },
    { name: "rotate", type: "number", description: "Angle of rotation in degrees (default -8)." },
  ],
  spinner: [
    { name: "size", type: '"sm" | "md" | "lg"', description: "Rotary indicator size (default 'md')." },
  ],
  skeleton: [],
  "copy-button": [
    { name: "value", type: "string", description: "Text string to copy (required)." },
    { name: "timeout", type: "number", description: "Duration in ms to show check state (default 2000)." },
  ],

  // P2 Wave 2
  coupon: [
    { name: "code", type: "string", description: "Discount code string (required)." },
    { name: "discount", type: "string", description: "Discount percentage or amount (required)." },
    { name: "title", type: "string", description: "Coupon title (required)." },
    { name: "expires", type: "string", description: "Expiration date string." },
  ],
  "boarding-pass": [
    { name: "flight", type: "string", description: "Flight number (e.g. 'BB-402')." },
    { name: "origin", type: "string", description: "3-letter origin airport code." },
    { name: "destination", type: "string", description: "3-letter destination airport code." },
    { name: "passenger", type: "string", description: "Passenger name." },
    { name: "seat", type: "string", description: "Seat number." },
    { name: "gate", type: "string", description: "Boarding gate." },
    { name: "boardingTime", type: "string", description: "Scheduled boarding time." },
  ],
  "price-tag": [
    { name: "price", type: "string", description: "Price value string (required)." },
    { name: "originalPrice", type: "string", description: "Original strikethrough price." },
    { name: "currency", type: "string", description: "Currency symbol (default '$')." },
    { name: "label", type: "string", description: "Upper label." },
    { name: "sale", type: "boolean", description: "Whether to show sale stamp." },
  ],
  "luggage-tag": [
    { name: "tagNumber", type: "string", description: "Claim identifier (required)." },
    { name: "destination", type: "string", description: "Airport code (required)." },
    { name: "passengerName", type: "string", description: "Passenger name (required)." },
    { name: "flight", type: "string", description: "Flight number." },
    { name: "weight", type: "string", description: "Weight string." },
  ],
  timeline: [
    { name: "items", type: "TimelineItem[]", description: "List of chronological events (required)." },
  ],
  sparkline: [
    { name: "data", type: "number[]", description: "Data array of numbers (required)." },
    { name: "width", type: "number", description: "SVG width in pixels (default 140)." },
    { name: "height", type: "number", description: "SVG height in pixels (default 40)." },
    { name: "tone", type: '"accent" | "foreground"', description: "Color style tone." },
    { name: "showArea", type: "boolean", description: "Render filled area under trend line." },
  ],
  countdown: [
    { name: "targetDate", type: "Date | string", description: "Target expiration time (required)." },
    { name: "onComplete", type: "() => void", description: "Callback when timer reaches zero." },
  ],
  "search-bar": [
    { name: "placeholder", type: "string", description: "Placeholder search text." },
    { name: "shortcut", type: "string", description: "Keycap indicator (default '⌘K')." },
    { name: "onSearch", type: "(val: string) => void", description: "Callback when search is submitted." },
  ],
  "dropdown-menu": [
    { name: "open", type: "boolean", description: "Controlled open state." },
    { name: "onOpenChange", type: "(open: boolean) => void", description: "Open state callback." },
  ],
  "cookie-banner": [
    { name: "title", type: "string", description: "Notice title." },
    { name: "description", type: "string", description: "Policy summary." },
    { name: "onAccept", type: "() => void", description: "Accept button callback." },
    { name: "onDecline", type: "() => void", description: "Decline button callback." },
  ],
  "bar-chart": [
    { name: "data", type: "BarChartItem[]", description: "Data items array (required)." },
    { name: "height", type: "number", description: "Chart height in px (default 160)." },
    { name: "showValues", type: "boolean", description: "Display value numbers above bars." },
  ],
  combobox: [
    { name: "options", type: "ComboboxOption[]", description: "List of selectable options (required)." },
    { name: "value", type: "string", description: "Controlled selected value." },
    { name: "onValueChange", type: "(val: string) => void", description: "Selection change callback." },
    { name: "placeholder", type: "string", description: "Placeholder text." },
  ],
  "file-dropzone": [
    { name: "onFilesDrop", type: "(files: File[]) => void", description: "Callback when files are dropped or selected." },
    { name: "accept", type: "string", description: "Accepted MIME types or extensions (e.g. 'image/*')." },
    { name: "maxFiles", type: "number", description: "Maximum number of files allowed (default 5)." },
  ],
  "color-picker": [
    { name: "value", type: "string", description: "Controlled color value hex string." },
    { name: "defaultValue", type: "string", description: "Initial color hex string (default '#BC3A28')." },
    { name: "onValueChange", type: "(color: string) => void", description: "Callback when color is picked." },
    { name: "colors", type: "string[]", description: "Array of available color hex values." },
  ],
  "password-strength": [
    { name: "value", type: "string", description: "Current password string to evaluate." },
    { name: "showCriteria", type: "boolean", description: "Whether to render requirements checklist (default true)." },
  ],
  "inline-edit": [
    { name: "value", type: "string", description: "Controlled text value." },
    { name: "defaultValue", type: "string", description: "Initial text value." },
    { name: "onSave", type: "(val: string) => void", description: "Callback when editing is committed." },
    { name: "label", type: "string", description: "Optional upper micro label." },
    { name: "placeholder", type: "string", description: "Placeholder when value is empty." },
  ],
  calendar: [
    { name: "value", type: "Date", description: "Controlled selected date." },
    { name: "defaultValue", type: "Date", description: "Initial selected date." },
    { name: "onValueChange", type: "(date: Date) => void", description: "Callback when date is clicked." },
  ],
  "data-table": [
    { name: "data", type: "T[]", description: "Array of table row data items (required)." },
    { name: "columns", type: "Column<T>[]", description: "Column definitions with key, header, and sortable flag (required)." },
    { name: "searchKey", type: "string", description: "Field key used for live text search filter." },
    { name: "pageSize", type: "number", description: "Number of rows per page (default 5)." },
  ],
  "confetti-burst": [
    { name: "active", type: "boolean", description: "Whether to render and animate confetti (default true)." },
    { name: "count", type: "number", description: "Number of ticket confetti pieces (default 24)." },
  ],
  "command-palette": [
    { name: "open", type: "boolean", description: "Controlled open state (required)." },
    { name: "onOpenChange", type: "(open: boolean) => void", description: "Open state change callback (required)." },
    { name: "items", type: "CommandItem[]", description: "List of command actions with label, category, and shortcut (required)." },
    { name: "placeholder", type: "string", description: "Search input placeholder." },
  ],
  "context-menu": [
    { name: "items", type: "(ContextMenuItem | 'separator')[]", description: "Context menu items array (required)." },
    { name: "children", type: "React.ReactNode", description: "Target trigger element (required)." },
  ],
  "scroll-top": [
    { name: "threshold", type: "number", description: "Scroll offset in px before showing button (default 200)." },
    { name: "label", type: "string", description: "Button text label (default 'TOP')." },
  ],
  "time-input": [
    { name: "value", type: "string", description: "Controlled time string (HH:MM)." },
    { name: "defaultValue", type: "string", description: "Initial time string (default '19:30')." },
    { name: "onValueChange", type: "(val: string) => void", description: "Callback when time changes." },
    { name: "format24h", type: "boolean", description: "Whether to use 24h or 12h format (default true)." },
  ],
  "masked-input": [
    { name: "mask", type: "string", description: "Pattern format string (# for digits, A for alpha)." },
    { name: "value", type: "string", description: "Controlled text value." },
    { name: "onValueChange", type: "(val: string, complete: boolean) => void", description: "Change callback with completion state." },
  ],
  "date-picker": [
    { name: "value", type: "Date", description: "Controlled selected date." },
    { name: "defaultValue", type: "Date", description: "Initial date value." },
    { name: "onValueChange", type: "(date: Date) => void", description: "Callback when date is chosen." },
    { name: "placeholder", type: "string", description: "Input trigger placeholder text." },
  ],
  menubar: [
    { name: "menus", type: "MenubarMenu[]", description: "Array of menu groups with items and shortcuts (required)." },
  ],
  "video-frame": [
    { name: "title", type: "string", description: "Screening or film title." },
    { name: "reelNumber", type: "string", description: "Film reel or hall identifier." },
    { name: "duration", type: "string", description: "Duration timestamp display." },
    { name: "src", type: "string", description: "Optional video file source." },
    { name: "poster", type: "string", description: "Preview poster image source." },
  ],
  "audio-mini": [
    { name: "title", type: "string", description: "Audio track title." },
    { name: "artist", type: "string", description: "Artist or seat row label." },
    { name: "duration", type: "string", description: "Duration timestamp display." },
    { name: "src", type: "string", description: "Optional audio file URL." },
  ],
  "section-heading": [
    { name: "title", type: "string", description: "Main section heading title (required)." },
    { name: "subtitle", type: "string", description: "Optional secondary description line." },
    { name: "badge", type: "string", description: "Optional badge text (e.g. 'GATE 3')." },
    { name: "action", type: "React.ReactNode", description: "Optional right-aligned action slot." },
  ],
  "dual-slider": [
    { name: "min", type: "number", description: "Minimum limit (default 0)." },
    { name: "max", type: "number", description: "Maximum limit (default 100)." },
    { name: "value", type: "[number, number]", description: "Controlled range tuple." },
    { name: "defaultValue", type: "[number, number]", description: "Initial range tuple (default [20, 80])." },
    { name: "onValueChange", type: "(val: [number, number]) => void", description: "Callback when range changes." },
    { name: "currency", type: "string", description: "Currency symbol (default '$')." },
  ],
  tour: [
    { name: "steps", type: "TourStep[]", description: "Array of tour step cards with title and description (required)." },
    { name: "currentStep", type: "number", description: "Controlled current step index." },
    { name: "onStepChange", type: "(step: number) => void", description: "Callback when step changes." },
    { name: "onComplete", type: "() => void", description: "Callback on finish." },
    { name: "onSkip", type: "() => void", description: "Callback on skip." },
  ],
  "mention-input": [
    { name: "mentions", type: "MentionItem[]", description: "Array of mention items with id and name." },
    { name: "value", type: "string", description: "Controlled text value." },
    { name: "onValueChange", type: "(val: string) => void", description: "Callback when text changes." },
    { name: "placeholder", type: "string", description: "Placeholder text." },
  ],
  navbar: [
    { name: "brand", type: "string", description: "Brand title label (default 'BIGBULL')." },
    { name: "items", type: "NavItem[]", description: "List of navigation link items." },
    { name: "action", type: "React.ReactNode", description: "Optional right-side action slot." },
  ],
  autocomplete: [
    { name: "options", type: "AutocompleteOption[]", description: "Array of selectable options with label and value (required)." },
    { name: "value", type: "string", description: "Controlled input text value." },
    { name: "onValueChange", type: "(val: string) => void", description: "Callback when value changes." },
    { name: "placeholder", type: "string", description: "Placeholder text." },
  ],
  lightbox: [
    { name: "open", type: "boolean", description: "Controlled open state (required)." },
    { name: "onOpenChange", type: "(open: boolean) => void", description: "Open state change callback (required)." },
    { name: "images", type: "LightboxImage[]", description: "Array of images to display in gallery viewer (required)." },
    { name: "initialIndex", type: "number", description: "Initial slide index (default 0)." },
  ],
  "transfer-list": [
    { name: "leftTitle", type: "string", description: "Title of left column (default 'AVAILABLE TICKETS')." },
    { name: "rightTitle", type: "string", description: "Title of right column (default 'CLAIMED STUBS')." },
    { name: "leftItems", type: "TransferItem[]", description: "Initial or controlled left column items." },
    { name: "rightItems", type: "TransferItem[]", description: "Initial or controlled right column items." },
    { name: "onChange", type: "(left: TransferItem[], right: TransferItem[]) => void", description: "Callback when items move." },
  ],
  "tree-nav": [
    { name: "data", type: "TreeNode[]", description: "Hierarchical tree nodes array (required)." },
    { name: "selectedId", type: "string", description: "Currently selected node ID." },
    { name: "onSelect", type: "(node: TreeNode) => void", description: "Callback when a leaf node is selected." },
  ],
};

export default async function ComponentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const meta = components.find((component) => component.name === slug);
  if (!meta) notFound();

  const source = readFileSync(join(process.cwd(), "src", "components", "ui", `${meta.name}.tsx`), "utf8");
  const propsList = propsDocs[meta.name] ?? [];

  return (
    <article className="space-y-10">
      <header className="space-y-3">
        <div className="flex items-center gap-2">
          <Badge variant="accent">Component</Badge>
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {meta.category}
          </span>
        </div>
        <h1 className="text-4xl font-semibold tracking-[-0.03em]">{meta.title}</h1>
        <p className="text-muted-foreground">{meta.description}</p>
      </header>

      <section className="space-y-3">
        <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Preview</h2>
        <ComponentPreview name={meta.name} />
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Usage</h2>
        <div className="overflow-hidden rounded-lg bg-[#08080c]">
          <div className="flex items-center justify-end px-3 pt-3">
            <CodeCopy code={usage[meta.name] ?? ""} />
          </div>
          <pre className="overflow-x-auto p-4 pt-2 font-mono text-[13px] leading-relaxed text-[#fafaf7]">
            <code>{usage[meta.name] ?? ""}</code>
          </pre>
        </div>
      </section>

      {propsList.length > 0 ? (
        <section className="space-y-3">
          <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Props</h2>
          <div className="overflow-hidden rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead className="bg-secondary text-left text-muted-foreground">
                <tr>
                  <th className="px-4 py-2 font-medium">Prop</th>
                  <th className="px-4 py-2 font-medium">Type</th>
                  <th className="px-4 py-2 font-medium">Description</th>
                </tr>
              </thead>
              <tbody>
                {propsList.map((prop) => (
                  <tr key={prop.name} className="border-t border-border">
                    <td className="px-4 py-2 font-mono text-xs">{prop.name}</td>
                    <td className="px-4 py-2 font-mono text-xs">{prop.type}</td>
                    <td className="px-4 py-2 text-muted-foreground">{prop.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}

      <section className="space-y-3">
        <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Source</h2>
        <div className="overflow-hidden rounded-lg bg-[#08080c]">
          <div className="flex items-center justify-end px-3 pt-3">
            <CodeCopy code={source} />
          </div>
          <pre className="overflow-x-auto p-4 pt-2 font-mono text-[13px] leading-relaxed text-[#fafaf7]">
            <code>{source}</code>
          </pre>
        </div>
        <p className="text-xs text-muted-foreground">
          Copy this file into your project. It only imports React and the{" "}
          <code className="font-mono">cn</code> helper from{" "}
          <code className="font-mono">ui/lib/utils</code> — copy that file too if you do not have it.
        </p>
      </section>

      <footer>
        <Link href="/docs" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
          ← All components
        </Link>
      </footer>
    </article>
  );
}
