# bigbullui

> Animated React components you own. No dependencies beyond React, Tailwind, and SVG.

[![npm version](https://badge.fury.io/js/bigbullui.svg)](https://www.npmjs.com/package/bigbullui)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/F0Rextasy/bigbullui/blob/main/LICENSE)
[![Zero dependencies](https://img.shields.io/badge/dependencies-zero-brightgreen.svg)](https://www.npmjs.com/package/bigbullui)

## Features

- **Zero dependencies** — every component imports only `react` and a tiny `cn` helper
- **Fully typed** — complete TypeScript definitions for every prop
- **Accessible by default** — WAI-ARIA patterns, keyboard navigation, focus management, `prefers-reduced-motion` support
- **Light + dark themes** — design tokens switch with a single `.dark` class
- **Copy-paste friendly** — every file is self-contained, own the code

## Install

```bash
npm install bigbullui
```

Add the design tokens to your CSS (Tailwind CSS v4 required):

```css
@import "tailwindcss";
@import "bigbullui/css";
```

Use any component:

```tsx
import { Button } from "bigbullui";

export function Example() {
  return <Button>Admit one</Button>;
}
```

### Copy-paste alternative

No install needed. Copy files from [`src/components/ui/`](https://github.com/F0Rextasy/bigbullui/tree/main/src/components/ui) (plus the `cn` helper) into your project, copy the token CSS from [`bigbullui.css`](https://github.com/F0Rextasy/bigbullui/blob/main/bigbullui.css) — done.

## Components

<details>
<summary><strong>Form</strong> — inputs, pickers, toggles and controls</summary>

| File | Component | Description |
|---|---|---|
| [`button`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/button.tsx) | Button | Animated button with tactile hover and stamp focus. |
| [`input`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/input.tsx) | Input | Text input with dashed focus border and design tokens. |
| [`textarea`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/textarea.tsx) | Textarea | Multi-line text area matching Input styling. |
| [`checkbox`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/checkbox.tsx) | Checkbox | Crisp checkbox with bold checked states. |
| [`switch`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/switch.tsx) | Switch | Two-state toggle switch with sliding thumb. |
| [`radio-group`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/radio-group.tsx) | Radio Group | Accessible single-select radio button set. |
| [`slider`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/slider.tsx) | Slider | Draggable value slider with chunky thumb. |
| [`select`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/select.tsx) | Select | Custom dashed listbox dropdown with keyboard navigation. |
| [`stepper`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/stepper.tsx) | Stepper | Increment and decrement buttons with mono readout. |
| [`pin-input`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/pin-input.tsx) | Pin Input | Segmented single-character boxes for codes and OTP. |
| [`rating`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/rating.tsx) | Rating | Interactive star rating with live hover preview. |
| [`copy-button`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/copy-button.tsx) | Copy Button | Tactile button with clipboard feedback and check state. |
| [`search-bar`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/search-bar.tsx) | Search Bar | Dashed search field with shortcut keycap and clear action. |
| [`combobox`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/combobox.tsx) | Combobox | Filterable searchable dropdown with instant keyboard filter. |
| [`file-dropzone`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/file-dropzone.tsx) | File Dropzone | Drag-and-drop upload zone with dashed borders and file preview. |
| [`color-picker`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/color-picker.tsx) | Color Picker | Palette swatch picker with framing and active mark. |
| [`password-strength`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/password-strength.tsx) | Password Strength | Segmented security meter with animated bars and criteria checklist. |
| [`inline-edit`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/inline-edit.tsx) | Inline Edit | Click-to-edit field with animated save pulse and cancel action. |
| [`time-input`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/time-input.tsx) | Time Input | Showtime selector with hours, minutes, and AM/PM stepper. |
| [`masked-input`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/masked-input.tsx) | Masked Input | Formatted code field with auto-formatted delimiters and validation mark. |
| [`date-picker`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/date-picker.tsx) | Date Picker | Date picker input with popover calendar and quick date selection. |
| [`dual-slider`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/dual-slider.tsx) | Dual Slider | Price range selector with minimum and maximum draggable handles. |
| [`mention-input`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/mention-input.tsx) | Mention Input | Mention input with instant @ autocomplete popover. |
| [`autocomplete`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/autocomplete.tsx) | Autocomplete | Typeahead search input with instant suggestions and keyboard select. |
| [`transfer-list`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/transfer-list.tsx) | Transfer List | Two-column transfer list between available and claimed items. |
| [`tree-select`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/tree-select.tsx) | Tree Select | Hierarchical dropdown selector with expandable zone nodes. |
| [`masked-currency`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/masked-currency.tsx) | Masked Currency | Formatted currency price input with prefix badge and numeric mask. |
| [`segmented-switch`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/segmented-switch.tsx) | Segmented Switch | Mechanical multi-option lever switch with smooth slide carriage. |
| [`theme-toggle`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/theme-toggle.tsx) | Theme Toggle | Theme switcher with day and night pass flip animation. |
| [`signature-pad`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/signature-pad.tsx) | Signature Pad | Interactive canvas endorsement pad with clear action and receipt stamp. |
| [`seat-map`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/seat-map.tsx) | Seat Map | Interactive seating chart grid with row letters, seat numbers and tiers. |
| [`keypad`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/keypad.tsx) | Keypad | Numeric PIN keypad with tactile stamped keys and masked display. |
| [`tag-input`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/tag-input.tsx) | Tag Input | Tag input with pill chip badges, remove buttons and backspace deletion. |

</details>

<details>
<summary><strong>Display</strong> — surfaces, badges and data views</summary>

| File | Component | Description |
|---|---|---|
| [`ticket-card`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/ticket-card.tsx) | Ticket Card | Complete admission ticket with notched edges and seat details. |
| [`coupon`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/coupon.tsx) | Coupon | Discount coupon with scissor cutout lines and promo code copy. |
| [`boarding-pass`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/boarding-pass.tsx) | Boarding Pass | Flight pass with origin, destination and receipt section. |
| [`price-tag`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/price-tag.tsx) | Price Tag | Price tag with eyelet string hole and sale mark. |
| [`luggage-tag`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/luggage-tag.tsx) | Luggage Tag | Baggage claim tag with handle loop and destination code. |
| [`barcode`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/barcode.tsx) | Barcode | Dynamic SVG barcode with mono serial readout. |
| [`stamp-seal`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/stamp-seal.tsx) | Stamp Seal | Rotated rubber stamp badge with double dashed circular ring. |
| [`card`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/card.tsx) | Card | Double-frame surface container with header, content, and footer. |
| [`badge`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/badge.tsx) | Badge | Micro status pill with subtle entrance transition. |
| [`avatar`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/avatar.tsx) | Avatar | Initials or photo badge with dashed ring. |
| [`progress`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/progress.tsx) | Progress | Marching striped progress indicator bar. |
| [`kbd`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/kbd.tsx) | Kbd | Keycap indicator with raised bottom border for shortcuts. |
| [`separator`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/separator.tsx) | Separator | Horizontal or vertical dashed divider. |
| [`table`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/table.tsx) | Table | Data table with dashed row dividers and mono headers. |
| [`marquee`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/marquee.tsx) | Marquee | Smooth ticker reel that pauses on hover. |
| [`timeline`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/timeline.tsx) | Timeline | Vertical chronological events with dashed connection stem. |
| [`sparkline`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/sparkline.tsx) | Sparkline | Lightweight SVG trend sparkline with animated end-point. |
| [`bar-chart`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/bar-chart.tsx) | Bar Chart | Mini data bar chart with dashed guideline grids and hover zoom. |
| [`calendar`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/calendar.tsx) | Calendar | Month calendar with date selection, month navigation, and today indicator. |
| [`data-table`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/data-table.tsx) | Data Table | Sortable, searchable data table with row selection and pagination. |
| [`video-frame`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/video-frame.tsx) | Video Frame | Cinema screening container with sprocket edges and play overlay. |
| [`audio-mini`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/audio-mini.tsx) | Audio Mini | Compact audio player with animated equalizer bars and duration counter. |
| [`section-heading`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/section-heading.tsx) | Section Heading | Section divider banner with dashed rules and zone badges. |
| [`lightbox`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/lightbox.tsx) | Lightbox | Fullscreen media viewer with film frame edges and image paging. |
| [`sticky-bar`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/sticky-bar.tsx) | Sticky Bar | Floating bottom checkout bar with item counter and action button. |
| [`stack`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/stack.tsx) | Stack | Stacked container with staggered angles and hover fan-out. |
| [`container`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/container.tsx) | Container | Centered layout wrapper with notch cutouts. |
| [`kanban-lite`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/kanban-lite.tsx) | Kanban Lite | Queue and stage progression board with notch cards. |
| [`gantt-lite`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/gantt-lite.tsx) | Gantt Lite | Interactive timetable schedule with animated now indicator. |
| [`stopwatch`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/stopwatch.tsx) | Stopwatch | Timer with lap tear-offs and digital readout. |
| [`countup`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/countup.tsx) | Countup | Mechanical odometer counter with animated tally and slot frames. |
| [`nfc-badge`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/nfc-badge.tsx) | NFC Badge | Contactless pass tap simulator with animated ripple pulse and status badge. |
| [`scratch-off`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/scratch-off.tsx) | Scratch Off | Lottery ticket with interactive foil scratch layer and auto-reveal. |
| [`qr-reader`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/qr-reader.tsx) | QR Reader | Simulated camera QR and barcode scanner viewfinder with laser sweep. |
| [`audio-waveform`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/audio-waveform.tsx) | Audio Waveform | Interactive multi-bar audio wave visualizer with timestamp readout. |
| [`ticket-fold`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/ticket-fold.tsx) | Ticket Fold | 3D fold ticket pass that unfolds with smooth perspective rotation. |
| [`split-flap`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/split-flap.tsx) | Split Flap | Mechanical departure board with flipping characters and retro styling. |
| [`watermark`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/watermark.tsx) | Watermark | Repeating watermark pattern for tickets, badges, and passes. |
| [`turnstile-gate`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/turnstile-gate.tsx) | Turnstile Gate | Mechanical turnstile rotor barrier with pass counter and status LED. |
| [`collapsible`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/collapsible.tsx) | Collapsible | Standalone expandable disclosure card with animated height reveal. |
| [`aspect-ratio`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/aspect-ratio.tsx) | Aspect Ratio | Proportional media container with preset ratios and corner guides. |
| [`resizable`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/resizable.tsx) | Resizable | Splitter layout panels with draggable resize handle and min/max limits. |
| [`scroll-area`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/scroll-area.tsx) | Scroll Area | Custom styled scrollable container with dashed scrollbar track. |
| [`pricing-table`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/pricing-table.tsx) | Pricing Table | 3-tier matrix with billing switcher, highlighted plan and feature checklist. |
| [`metric-card`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/metric-card.tsx) | Metric Card | Dashboard KPI card with value, trend delta and period label. |
| [`code-block`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/code-block.tsx) | Code Block | Code snippet block with filename tab, language badge and copy button. |
| [`activity-feed`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/activity-feed.tsx) | Activity Feed | Activity stream with timeline avatars, action badges and timestamps. |
| [`credit-card`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/credit-card.tsx) | Credit Card | Payment card visualizer with formatting, brand detection and 3D flip. |
| [`status-dot`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/status-dot.tsx) | Status Dot | Live status beacon with radar sweep pulse and glow rings. |
| [`donut-chart`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/donut-chart.tsx) | Donut Chart | Zero-dependency SVG donut and pie chart with hover highlight and legend. |

</details>

<details>
<summary><strong>Feedback</strong> — notices, hints and interruptions</summary>

| File | Component | Description |
|---|---|---|
| [`file-upload-list`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/file-upload-list.tsx) | File Upload List | Multi-file upload queue with progress bars and cancel/retry actions. |
| [`alert`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/alert.tsx) | Alert | Notice box with tone bar and status eyebrow. |
| [`tooltip`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/tooltip.tsx) | Tooltip | Floating helper tooltip on hover and keyboard focus. |
| [`dialog`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/dialog.tsx) | Dialog | Accessible modal dialog with focus trap and scale animation. |
| [`toast`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/toast.tsx) | Toast | Transient stacked notices with auto-dismiss. |
| [`sheet`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/sheet.tsx) | Sheet | Slide-over drawer panel with focus trap and scroll lock. |
| [`popover`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/popover.tsx) | Popover | Floating content panel anchored to an interactive trigger. |
| [`empty`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/empty.tsx) | Empty | Perforated placeholder box for zero-state views. |
| [`spinner`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/spinner.tsx) | Spinner | Rotary loading indicator with dashed track and stamp accent. |
| [`skeleton`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/skeleton.tsx) | Skeleton | Dashed placeholder box with gentle pulse animation. |
| [`cookie-banner`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/cookie-banner.tsx) | Cookie Banner | Fixed privacy consent banner with accept and decline actions. |
| [`confetti-burst`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/confetti-burst.tsx) | Confetti Burst | CSS celebration burst with stamp-colored pieces flying outward. |
| [`tour`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/tour.tsx) | Tour | Interactive step-by-step guided onboarding card with progress indicators. |
| [`hover-card`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/hover-card.tsx) | Hover Card | Popover preview on hover and focus with configurable delays. |
| [`drawer`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/drawer.tsx) | Drawer | Bottom slide-up drawer with pull handle, backdrop blur, and focus trap. |
| [`announcement-bar`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/announcement-bar.tsx) | Announcement Bar | Alert ribbon bar with countdown badge, CTA button, and dismiss action. |

</details>

<details>
<summary><strong>Navigation</strong> — ways to move between views</summary>

| File | Component | Description |
|---|---|---|
| [`tabs`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/tabs.tsx) | Tabs | Segmented panel switch with roving keyboard focus. |
| [`accordion`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/accordion.tsx) | Accordion | Collapsible disclosure items with smooth height transitions. |
| [`pagination`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/pagination.tsx) | Pagination | Numbered buttons with ellipsis and page stepping. |
| [`breadcrumb`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/breadcrumb.tsx) | Breadcrumb | Hierarchical trail with slash separators. |
| [`steps`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/steps.tsx) | Steps | Data-driven wizard progression with numbered stamps. |
| [`toggle-group`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/toggle-group.tsx) | Toggle Group | Single-choice segmented control with roving tabindex. |
| [`dropdown-menu`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/dropdown-menu.tsx) | Dropdown Menu | Popup actions menu with keyboard shortcuts and items. |
| [`countdown`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/countdown.tsx) | Countdown | Live ticking event timer with segmented cards. |
| [`command-palette`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/command-palette.tsx) | Command Palette | Modal search command palette with keyboard shortcuts and filter. |
| [`context-menu`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/context-menu.tsx) | Context Menu | Right-click menu with smooth reveal, shortcuts, and dashed divider. |
| [`scroll-top`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/scroll-top.tsx) | Scroll Top | Floating elevator button that scrolls smoothly to page top. |
| [`menubar`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/menubar.tsx) | Menubar | Menu bar with dropdown menus, shortcuts, and dashed frames. |
| [`navbar`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/navbar.tsx) | Navbar | Navigation bar with brand monogram and active links. |
| [`tree-nav`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/tree-nav.tsx) | Tree Nav | Hierarchical explorer with collapsible nodes and icons. |
| [`sidebar`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/sidebar.tsx) | Sidebar | Collapsible navigation sidebar drawer with notch cutouts. |
| [`breadcrumb-dropdown`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/breadcrumb-dropdown.tsx) | Breadcrumb Dropdown | Breadcrumb trail with popover dropdown for intermediate tiers. |
| [`dock`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/dock.tsx) | Dock | Floating application dock bar with hover magnification and active indicators. |

</details>

## Theming

Design tokens live in [`bigbullui.css`](https://github.com/F0Rextasy/bigbullui/blob/main/bigbullui.css). Override any `--background`, `--foreground`, `--accent` and the whole library follows. Dark mode is a single `.dark` class on `<html>`.

## Accessibility

WAI-ARIA patterns throughout: roving tabindex in Tabs and Radio groups, focus trap with Escape handling in Dialog and Sheet, `aria-checked` / `aria-expanded` live states, visible focus rings, and `prefers-reduced-motion` respected by every animation.

## Contributing

Issues and pull requests are welcome. Please keep components zero-dependency (`react` + `./lib/utils` only), typed, keyboard accessible, and documented with a docs page entry.

## License

MIT © 2026 F0Rextasy. See [LICENSE](https://github.com/F0Rextasy/bigbullui/blob/main/LICENSE).

## Links

- Documentation: https://bigbullui.vercel.app
- npm: https://www.npmjs.com/package/bigbullui
- Issues: https://github.com/F0Rextasy/bigbullui/issues
