# bigbullui

> Animated React components you own. Open source, MIT licensed.

[![npm version](https://badge.fury.io/js/bigbullui.svg)](https://www.npmjs.com/package/bigbullui)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/F0Rextasy/bigbullui/blob/main/LICENSE)

## Features

- **Open source** — MIT licensed, copy the code and own it
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
| [`button`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/button.tsx) | Button | Animated button with hover feedback and crisp focus. |
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
| [`password-strength`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/password-strength.tsx) | Password Strength | Segmented security verification meter with animated strength bars and criteria checklist. |
| [`inline-edit`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/inline-edit.tsx) | Inline Edit | Click-to-edit field with focus outline, animated save pulse, and cancel action. |
| [`time-input`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/time-input.tsx) | Time Input | Curtain call showtime selector with hours, minutes, and AM/PM stepper. |
| [`masked-input`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/masked-input.tsx) | Masked Input | Formatted code field with auto-formatted delimiters and validation mark. |
| [`date-picker`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/date-picker.tsx) | Date Picker | Date picker input with popover calendar and quick date selection. |
| [`dual-slider`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/dual-slider.tsx) | Dual Slider | Price range selector with minimum and maximum draggable handles. |
| [`mention-input`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/mention-input.tsx) | Mention Input | Mention input with instant @ autocomplete popover. |
| [`autocomplete`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/autocomplete.tsx) | Autocomplete | Typeahead search input with instant suggestions and keyboard select. |
| [`transfer-list`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/transfer-list.tsx) | Transfer List | Two-column transfer list between available and claimed items. |
| [`tree-select`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/tree-select.tsx) | Tree Select | Hierarchical seating dropdown selector with expandable zone nodes. |
| [`masked-currency`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/masked-currency.tsx) | Masked Currency | Formatted currency price input with prefix badge and numeric mask. |
| [`segmented-switch`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/segmented-switch.tsx) | Segmented Switch | Mechanical multi-option lever switch with smooth slide carriage. |
| [`theme-toggle`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/theme-toggle.tsx) | Theme Toggle | Theme switcher with day and night flip animation. |
| [`signature-pad`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/signature-pad.tsx) | Signature Pad | Interactive canvas endorsement pad with clear action and receipt stamp. |
| [`seat-map`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/seat-map.tsx) | Seat Map | Interactive arena seating chart matrix grid with row letters, seat numbers, tier types, and price calculator. |
| [`keypad`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/keypad.tsx) | Keypad | Numeric PIN keypad with tactile mechanical keys, visual pulse, and masked PIN display. |
| [`tag-input`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/tag-input.tsx) | Tag Input | Tag input with pill chip badges, remove buttons, backspace deletion, and dashed container. |

| [`label`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/label.tsx) | Label | Form label with mono uppercase styling and an animated stamp-red asterisk when required. |
| [`form-field`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/form-field.tsx) | Form Field | Field wrapper with label, control, description, and error message with a shake-in animation on error. |
| [`field`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/field.tsx) | Field | Composable field primitives: Field, FieldLabel, FieldControl, FieldDescription, FieldError, FieldGroup, FieldSet. |
| [`toggle`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/toggle.tsx) | Toggle | Two-state button with aria-pressed, springy press animation, and default/outline/accent variants. |
| [`multi-select`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/multi-select.tsx) | Multi Select | Trigger + popover picker with search input, checkbox options, and animated removable selection chips. |
| [`input-group`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/input-group.tsx) | Input Group | Input with prefix icon slot, suffix slot, and inner action button; dashed focus ring and animated underline sweep. |
| [`button-group`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/button-group.tsx) | Button Group | Joins buttons with rounded outer corners, internal separators, and sliding hover highlight. |
| [`loading-button`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/loading-button.tsx) | Loading Button | Button with loading spinner swap, width locking to avoid jumps, and a brief success check-mark stamp. |
| [`checkbox-group`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/checkbox-group.tsx) | Checkbox Group | Checkbox options with a select-all row (indeterminate state), animated check fills, and staggered entrance. |
| [`listbox`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/listbox.tsx) | Listbox | Single/multi selectable list with keyboard navigation, ARIA roles, and check marks that slide in. |
| [`size-picker`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/size-picker.tsx) | Size Picker | Size chip picker with out-of-stock strikes and stock dots. |
| [`variant-picker`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/variant-picker.tsx) | Variant Picker | Color swatch and size variant picker with animated selection. |
| [`wishlist-button`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/wishlist-button.tsx) | Wishlist Button | Heart wishlist button with pop fill and floating burst. |
| [`add-to-cart-button`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/add-to-cart-button.tsx) | Add To Cart Button | Add-to-cart button with flying dot arc and check stamp. |
| [`emoji-picker`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/emoji-picker.tsx) | EmojiPicker | Panel with category tabs (Smileys, Gestures, Hearts, Objects), search filter, and emoji grid with selection callback. |
| [`volume-slider`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/volume-slider.tsx) | VolumeSlider | Vertical or horizontal slider with fill animation, mute toggle, and ARIA roles |
| [`text-diff`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/text-diff.tsx) | TextDiff | Word-level diff showing added/removed words with animation |
| [`copy-chip`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/copy-chip.tsx) | CopyChip | Small mono chip that copies to clipboard with check morph and 'COPIED' feedback |
| [`phone-input`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/phone-input.tsx) | PhoneInput | Phone number input with country code selector and formatted display |
| [`email-input`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/email-input.tsx) | EmailInput | Email input with live validation and typo domain suggestions |
| [`date-range-picker`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/date-range-picker.tsx) | DateRangePicker | Two-month mini calendar grid for selecting start and end dates with nights count |
| [`month-picker`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/month-picker.tsx) | MonthPicker | 12-month grid for selecting a month with year navigation |
| [`year-picker`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/year-picker.tsx) | YearPicker | Year grid with page navigation for selecting a year |
| [`time-range-picker`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/time-range-picker.tsx) | TimeRangePicker | Two time inputs with duration readout that animates on change |
| [`clock-picker`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/clock-picker.tsx) | ClockPicker | Analog clock with draggable hands for time selection |
| [`hotkey-recorder`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/hotkey-recorder.tsx) | HotkeyRecorder | Record keyboard hotkey combinations with visual chip display |
| [`file-input`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/file-input.tsx) | FileInput | Styled file input with drop chips and selection count animation |
| [`slider-ticks`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/slider-ticks.tsx) | SliderTicks | Slider with tick marks, labels, and snap-to-ticks functionality |
| [`rich-text-editor`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/rich-text-editor.tsx) | Rich Text Editor | Minimal contentEditable editor with toolbar (bold, italic, underline, lists, links, quote, code) and word/char counter. |
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
| [`section-heading`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/section-heading.tsx) | Section Heading | Theater and arena section divider banner with dashed rules and zone badges. |
| [`lightbox`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/lightbox.tsx) | Lightbox | Fullscreen media viewer with film frame edges and image paging. |
| [`sticky-bar`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/sticky-bar.tsx) | Sticky Bar | Floating bottom checkout bar with item counter and admission button. |
| [`stack`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/stack.tsx) | Stack | Stacked container with staggered angles and hover fan-out. |
| [`container`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/container.tsx) | Container | Centered layout wrapper with notch cutouts. |
| [`kanban-lite`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/kanban-lite.tsx) | Kanban Lite | Queue and stage progression board with notch cards. |
| [`gantt-lite`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/gantt-lite.tsx) | Gantt Lite | Interactive festival and stage timetable schedule with animated now indicator. |
| [`stopwatch`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/stopwatch.tsx) | Stopwatch | Precision timer with lap tear-offs and digital readout. |
| [`countup`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/countup.tsx) | Countup | Mechanical turnstile odometer counter with animated tally and slot frames. |
| [`nfc-badge`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/nfc-badge.tsx) | NFC Badge | Contactless gate pass tap simulator with animated radio wave ripple pulse, status badge, lanyard notch, and admission chime. |
| [`scratch-off`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/scratch-off.tsx) | Scratch Off | Lottery ticket with interactive foil scratch layer and auto-reveal. |
| [`qr-reader`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/qr-reader.tsx) | QR Reader | Turnstile simulated camera QR and barcode scanner viewfinder with animated laser sweep and targeting reticle. |
| [`audio-waveform`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/audio-waveform.tsx) | Audio Waveform | Interactive multi-bar audio wave visualizer for concert recordings with live animated frequency bars and timestamp readout. |
| [`ticket-fold`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/ticket-fold.tsx) | Ticket Fold | 3D accordion fold pass that unfolds with smooth perspective rotation and tear-away slip. |
| [`split-flap`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/split-flap.tsx) | Split Flap | Mechanical departure board with flipping characters and retro terminal styling. |
| [`watermark`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/watermark.tsx) | Watermark | Repeating watermark pattern with security angle. |
| [`turnstile-gate`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/turnstile-gate.tsx) | Turnstile Gate | Mechanical rotor barrier with pass counter, status LED, and push animation. |
| [`collapsible`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/collapsible.tsx) | Collapsible | Standalone expandable disclosure card with notch header, animated height reveal and status mark. |
| [`aspect-ratio`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/aspect-ratio.tsx) | Aspect Ratio | Proportional media container with preset ratios, framed border, and corner guides. |
| [`resizable`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/resizable.tsx) | Resizable | Splitter layout panels with draggable resize handle, min/max limits and collapse button. |
| [`scroll-area`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/scroll-area.tsx) | Scroll Area | Custom styled scrollable container with customized dashed scrollbar track, thumb indicator, horizontal/vertical support, and perforated top/bottom shadow fades. |
| [`pricing-table`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/pricing-table.tsx) | Pricing Table | 3-tier matrix with billing switcher, highlighted plan and feature checklist. |
| [`metric-card`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/metric-card.tsx) | Metric Card | Dashboard KPI card with value, trend delta and period label. |
| [`code-block`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/code-block.tsx) | Code Block | Code snippet block with filename tab, language badge and copy button. |
| [`activity-feed`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/activity-feed.tsx) | Activity Feed | Universal user and team activity stream for deployments, invites, edits, and security audits with timeline avatars, action badges, relative timestamps, and event icons. |
| [`credit-card`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/credit-card.tsx) | Credit Card | Universal payment card visualizer with real-time card number formatting, brand badge detection (Visa, Mastercard, Amex), metallic EMV chip, and interactive 3D flip card to show CVV. |
| [`status-dot`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/status-dot.tsx) | Status Dot | Live status beacon with radar sweep pulse, glow rings and occupancy levels. |
| [`donut-chart`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/donut-chart.tsx) | Donut Chart | Interactive SVG donut and pie chart with segment hover highlight, tooltips, center total readout, and custom color legend. |
| [`trend-badge`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/trend-badge.tsx) | Trend Badge | Stamped trend badge with direction arrow, velocity levels and live pulse. |
| [`meter`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/meter.tsx) | Meter | Gauge meter with zones, ticks and status readout. |
| [`badge-ribbon`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/badge-ribbon.tsx) | Badge Ribbon | Rosette award ribbon with rank and color themes. |

| [`avatar-group`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/avatar-group.tsx) | Avatar Group | Overlapping avatar stack with +N overflow chip that fans out on hover. |
| [`divider-with-text`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/divider-with-text.tsx) | Divider With Text | Centered label over dashed separator lines with a line-grow scaleX animation on mount. |
| [`item`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/item.tsx) | Item | Generic row surface with leading media, title, description, and trailing actions; hover lift with accent bar slide-in. |
| [`heading`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/heading.tsx) | Heading | Semantic heading with level-based scale, optional mono eyebrow and per-level entrance animation. |
| [`text`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/text.tsx) | Text | Typographic paragraph primitive with default, muted, small, lead and mono variants. |
| [`list`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/list.tsx) | List | List with dashed, numbered and icon variants plus staggered item entrances and List/ListItem composition. |
| [`quote`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/quote.tsx) | Quote | Blockquote with dashed left frame, stamp entrance and mono uppercase cite line. |
| [`figure`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/figure.tsx) | Figure | Framed media figure with double-frame surface and delayed figcaption fade-in. |
| [`description-list`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/description-list.tsx) | DescriptionList | Term/description pairs with mono uppercase terms, muted descriptions and staggered row entrances. |
| [`page-header`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/page-header.tsx) | PageHeader | Page title with stamp entrance, fading description, actions slot and optional mono eyebrow. |
| [`hero`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/hero.tsx) | Hero | Landing hero with accent highlight word, primary/secondary actions and bottom marquee strip. |
| [`media-object`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/media-object.tsx) | MediaObject | Horizontal media plus content row with title, description, meta chips and hover lift. |
| [`link-card`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/link-card.tsx) | LinkCard | Whole-card link with sliding arrow, darkening border on hover and fade-up entrance. |
| [`logo-cloud`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/logo-cloud.tsx) | LogoCloud | Grid or marquee row of monogram logo tiles in dashed frames with hover reveal. |
| [`testimonial`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/testimonial.tsx) | Testimonial | Quote card with initials avatar, name, role and staggered star rating pop-in. |
| [`team-grid`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/team-grid.tsx) | TeamGrid | Grid of member cards with initials avatars, roles, optional links and staggered hover-lift entrances. |
| [`feature-grid`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/feature-grid.tsx) | FeatureGrid | Feature tiles with icon slot, stamp-on-hover icons, darkening borders and staggered entrance. |
| [`cta-section`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/cta-section.tsx) | CtaSection | Double-frame call-to-action band with stamp-seal corner badge and stamping action button. |
| [`line-chart`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/line-chart.tsx) | Line Chart | Multi-series line chart with stroke-dasharray animation and hover tooltips |
| [`area-chart`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/area-chart.tsx) | Area Chart | Filled area chart with gradient fills and hover highlights |
| [`stacked-bar`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/stacked-bar.tsx) | Stacked Bar Chart | Horizontal stacked bars with segmented rows and legend chips |
| [`gauge`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/gauge.tsx) | Gauge | Half-donut SVG gauge with needle animation and value readout |
| [`progress-circle`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/progress-circle.tsx) | Progress Circle | Circular progress ring with stroke-dashoffset animation and center percentage |
| [`radar-chart`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/radar-chart.tsx) | Radar Chart | Spider web chart with polygon axes and data polygon animation |
| [`heatmap`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/heatmap.tsx) | Heatmap | Grid of colored cells showing value intensities with diagonal stagger |
| [`calendar-heatmap`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/calendar-heatmap.tsx) | Calendar Heatmap | GitHub-style Git calendar heatmap grid |
| [`funnel-chart`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/funnel-chart.tsx) | Funnel Chart | Horizontal funnel stages showing conversion percentages between steps |
| [`scatter-plot`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/scatter-plot.tsx) | Scatter Plot | SVG scatter plot with dashed axes and hover enlargements |
| [`waterfall-chart`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/waterfall-chart.tsx) | Waterfall Chart | Floating bars showing incremental changes with connecting guides |
| [`candlestick-chart`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/candlestick-chart.tsx) | Candlestick Chart | OHLC candlestick chart for financial data visualization |
| [`leaderboard`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/leaderboard.tsx) | Leaderboard | Ranked leaderboard with medal tiles for top 3 and count-up scores |
| [`scoreboard`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/scoreboard.tsx) | Scoreboard | Two-team score card with rolling digit animation |
| [`json-viewer`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/json-viewer.tsx) | JSON Viewer | Collapsible JSON tree with mono keys and color-typed values |
| [`diff-viewer`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/diff-viewer.tsx) | Diff Viewer | Unified diff viewer showing added/removed/context lines |
| [`terminal`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/terminal.tsx) | Terminal | Fake terminal card with sequential line reveal and blinking cursor |
| [`log-viewer`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/log-viewer.tsx) | Log Viewer | Scrolling log stream with level badges and filter chips |
| [`treemap-chart`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/treemap-chart.tsx) | Treemap Chart | Squarified treemap with recursive rectangles and staggered labels |
| [`image-compare`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/image-compare.tsx) | ImageCompare | Before/after slider with clip-path inset controlled by draggable divider; BEFORE/AFTER labels. |
| [`zoom-image`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/zoom-image.tsx) | ZoomImage | Image with hover magnifier lens tracking cursor; framed double border. |
| [`infinite-scroll`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/infinite-scroll.tsx) | InfiniteScroll | IntersectionObserver sentinel: when visible calls onLoadMore, shows animated loader row; wraps children. |
| [`load-more`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/load-more.tsx) | LoadMore | Button row "LOAD MORE" with progress mono counter; on click reveals hidden children with stagger. |
| [`virtual-list`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/virtual-list.tsx) | VirtualList | Windowed list for fixed-height rows: scrollTop math, visible slice renders, spacer divs; smooth scroll. |
| [`scroll-shadow`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/scroll-shadow.tsx) | ScrollShadow | Wrapper with top/bottom shadow indicators that fade in only when scrollable in that direction; dashed scrollbar styling. |
| [`reveal`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/reveal.tsx) | Reveal | IntersectionObserver: children animate in when entering viewport with fade-up/scale variants, delay prop, once re-trigger option. |
| [`product-card`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/product-card.tsx) | Product Card | Product card with image slot, price, discount badge and wishlist heart. |
| [`user-card`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/user-card.tsx) | User Card | Profile card with avatar, role, meta chips and action slot. |
| [`article-card`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/article-card.tsx) | Article Card | Blog article card with category badge, excerpt and author meta. |
| [`event-card`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/event-card.tsx) | Event Card | Event card with perforated date block, venue and time chips. |
| [`invoice`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/invoice.tsx) | Invoice | Invoice layout with line items, tax breakdown and stamped total. |
| [`receipt`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/receipt.tsx) | Receipt | Thermal receipt with zigzag tear edge, mono lines and barcode footer. |
| [`checkout-summary`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/checkout-summary.tsx) | Checkout Summary | Cart summary with quantity steppers, tax row and checkout CTA. |
| [`order-card`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/order-card.tsx) | Order Card | Order status card with step dots and item summary. |
| [`stamp-card`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/stamp-card.tsx) | Stamp Card | Loyalty punch card with stamped circles and reward row. |
| [`gift-card`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/gift-card.tsx) | Gift Card | Gift card with ribbon stripe, amount and balance bar. |
| [`id-card`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/id-card.tsx) | Id Card | Employee ID card with hologram shine sweep and barcode. |
| [`rsvp-card`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/rsvp-card.tsx) | Rsvp Card | Invitation RSVP card with attending toggle and wax stamp. |
| [`chat-window`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/chat-window.tsx) | ChatWindow | Full chat panel with message list, input bar, and typing indicator slot. |
| [`chat-bubble`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/chat-bubble.tsx) | ChatBubble | Single message bubble with tail, status ticks, and hover press feedback. |
| [`typing-indicator`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/typing-indicator.tsx) | TypingIndicator | Three bouncing dots with user name label indicating who is typing. |
| [`comment-thread`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/comment-thread.tsx) | CommentThread | Nested comments with avatars, collapse/reply actions, and dashed indent guides. |
| [`story-viewer`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/story-viewer.tsx) | StoryViewer | Circular story ring with progress animation, avatar names, and tap zones for prev/next. |
| [`post-card`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/post-card.tsx) | PostCard | Social post with header, body, gradient media placeholder, and action row with like/comment/share counts. |
| [`follower-list`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/follower-list.tsx) | FollowerList | Rows with avatars, names, handles, and Follow buttons that morph between states. |
| [`voice-message`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/voice-message.tsx) | VoiceMessage | Chat audio bubble with play/pause button and animated waveform bars showing audio duration. |
| [`audio-player`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/audio-player.tsx) | AudioPlayer | Full deck audio player with play/pause morph button, seek bar, time readout, volume slider, and track info |
| [`video-player`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/video-player.tsx) | VideoPlayer | Video frame with sprocket styling, hover fade-in controls, progress bar with scrub preview |
| [`playlist`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/playlist.tsx) | Playlist | Track rows with equalizer bars for active track, title/artist, duration, and slide-in marker |
| [`podcast-player`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/podcast-player.tsx) | PodcastPlayer | Episode card with art slot, play button, speed selector chips, skip buttons, and chapter ticks |
| [`video-thumbnail`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/video-thumbnail.tsx) | VideoThumbnail | Poster frame with duration badge, play overlay circle that scales on hover with ripple ring, and title strip |
| [`media-controls`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/media-controls.tsx) | MediaControls | Compact transport bar with prev/play/next/stop buttons, progress micro-bar, and time display |
| [`live-badge`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/live-badge.tsx) | LiveBadge | LIVE indicator with blinking dot, mono uppercase label, and optional viewer count that ticks |
| [`time-ago`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/time-ago.tsx) | TimeAgo | Relative time display showing '5 MIN AGO' with live re-render tick every 30s |
| [`live-clock`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/live-clock.tsx) | LiveClock | Digital clock showing HH:MM:SS with optional timezone and variant support |
| [`typewriter`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/typewriter.tsx) | Typewriter | Types text char-by-char with blinking block cursor, loops through phrases |
| [`highlight-text`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/highlight-text.tsx) | HighlightText | Highlights query matches inside text with accent background and animated reveal |
| [`truncate`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/truncate.tsx) | Truncate | Single/multi-line clamp with optional expand toggle (MORE/LESS) |
| [`currency-display`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/currency-display.tsx) | CurrencyDisplay | Formatted money with symbol, mono integer part, smaller muted decimals, optional count-up animation |
| [`receipt-printer`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/receipt-printer.tsx) | ReceiptPrinter | Thermal printer that feeds mono receipt lines out of a printer slot with a stepped paper animation. |
| [`queue-ticket`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/queue-ticket.tsx) | QueueTicket | Take-a-number queue ticket with a big tear-off number tab, NOW SERVING ring and queue stats. |
| [`passport`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/passport.tsx) | Passport | Double-frame passport cover with monogram, holder fields and staggered visa stamp marks. |
| [`wax-seal`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/wax-seal.tsx) | WaxSeal | Circular wax blob with a pressed-in monogram entrance and an optional cracked break state. |
| [`envelope`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/envelope.tsx) | Envelope | Envelope whose flap opens with a 3D rotateX and the letter inside rises, on hover or via an open prop. |
| [`airmail-letter`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/airmail-letter.tsx) | AirmailLetter | Airmail bordered letter with red/blue diagonal stripes, mono lines, a postmark corner and an unfold entrance. |
| [`postmark`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/postmark.tsx) | Postmark | Circular postal cancellation stamp with wavy lines, city and date arcs that stamps in on mount. |
| [`cassette-tape`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/cassette-tape.tsx) | CassetteTape | Cassette with two spinning reels, shifting tape amounts and a handwritten-style label with play toggle. |
| [`vinyl-record`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/vinyl-record.tsx) | VinylRecord | Spinning vinyl with radial grooves, center label, a tonearm that slides in and a wobble on drop. |
| [`flip-clock`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/flip-clock.tsx) | FlipClock | Mechanical split-flap HH:MM clock whose digit cards flip on change with a blinking colon. |
| [`neon-sign`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/neon-sign.tsx) | NeonSign | Neon sign with layered glow text-shadow, flicker-in entrance and a subtle per-letter buzz. |
| [`marquee-bulbs`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/marquee-bulbs.tsx) | MarqueeBulbs | Marquee board framed by chase-blinking bulbs with scrolling center text. |
| [`backstage-pass`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/backstage-pass.tsx) | BackstagePass | Laminated ALL ACCESS pass with lanyard hole, rotated stripe strip, shine sweep on hover and fake barcode. |
| [`wristband`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/wristband.tsx) | Wristband | Festival wristband with patterned repeating stripes, snap closure, serial and a subtle breathing animation. |
| [`lanyard`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/lanyard.tsx) | Lanyard | Strap with clip that sways gently from the top and holds an attached card slot for children. |
| [`drink-ticket`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/drink-ticket.tsx) | DrinkTicket | Perforated drink coupon with glyph, GOOD FOR ONE copy and a tear-off stub that rotates on hover. |
| [`raffle-ticket`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/raffle-ticket.tsx) | RaffleTicket | Raffle ticket with a big number, matching stub number and a winning highlight that pulses and stamps. |
| [`slot-machine`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/slot-machine.tsx) | SlotMachine | Three-reel slot machine with staggered spinning reels, a pulling lever and payline highlight on stop. |
| [`prize-wheel`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/prize-wheel.tsx) | PrizeWheel | SVG prize wheel of tinted segments that spins with eased deceleration and a flicking pointer flapper. |
| [`dice`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/dice.tsx) | Dice | Pair of 3D dice that tumble with rapid face swaps and settle with a bounce on roll. |
| [`coin-flip`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/coin-flip.tsx) | CoinFlip | Coin that rotates on Y through multiple turns, decelerating to a heads or tails face with a stamped result badge. |
| [`playing-card`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/playing-card.tsx) | PlayingCard | Playing card with corner rank and suit, big center suit, diamond-pattern back and a 3D flip on click. |
| [`bingo-card`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/bingo-card.tsx) | BingoCard | 5x5 B-I-N-G-O card whose cells stamp in on toggle with a free center and line-complete sweep highlights. |
| [`jumbotron`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/jumbotron.tsx) | Jumbotron | Oversized scoreboard with pixel-style mono type, scanline sweep and scoreboard slots for home and away. |
| [`fireworks`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/fireworks.tsx) | Fireworks | Rockets that rise and burst into radial particle rings, looping while active. |
| [`disco-ball`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/disco-ball.tsx) | DiscoBall | Tiled mirror sphere that slowly rotates and projects dancing light dots around the room. |
| [`stage-lights`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/stage-lights.tsx) | StageLights | Two to four gradient light cones that sweep alternately over a glowing stage floor ellipse. |
| [`ticket-booth`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/ticket-booth.tsx) | TicketBooth | Booth window with TICKETS marquee header, counter ledge, speaker grille dots and a CLOSED flip sign. |
| [`drive-in-screen`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/drive-in-screen.tsx) | DriveInScreen | Outdoor cinema screen with projection flicker, a car silhouette row and an intermission countdown slot. |
| [`ticket-stub-v2`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/ticket-stub-v2.tsx) | TicketStubV2 | Rip-off event stub whose tear line detaches the stub with rotate-and-fall on tear, plus serial and barcode. |
| [`toc`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/toc.tsx) | Toc | Table of contents with IntersectionObserver scroll-spy and dashed active underline |
| [`qr-code`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/qr-code.tsx) | QR Code | Generates QR codes with Reed-Solomon error correction, mask evaluation, and finder patterns. Includes encodeQrMatrix helper. |
| [`image-crop`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/image-crop.tsx) | Image Crop | Canvas-based image cropping with draggable crop rect, rule-of-thirds grid, resize handles, and dataURL output. |
| [`sankey-chart`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/sankey-chart.tsx) | Sankey Chart | Two-level flow diagram with bezier ribbons, value-based width, hover tooltips, and entrance animations. |
| [`org-chart`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/org-chart.tsx) | Org Chart | Hierarchical tree of boxes with connector lines, expand/collapse nodes, avatar initials, and entrance animations. |
</details>
<details>
<summary><strong>Feedback</strong> — notices, hints and interruptions</summary>

| File | Component | Description |
|---|---|---|
| [`file-upload-list`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/file-upload-list.tsx) | File Upload List | Multi-file upload manager queue with individual file progress percentage bars, file size formatting (KB/MB), file type badges, cancel/retry/remove buttons, and overall upload count status. |
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
| [`hover-card`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/hover-card.tsx) | Hover Card | Popover preview on hover and focus with configurable delays and alignment. |
| [`drawer`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/drawer.tsx) | Drawer | Bottom slide-up drawer with pull handle, backdrop blur, and focus trap. |
| [`announcement-bar`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/announcement-bar.tsx) | Announcement Bar | Festival alert and headline announcement ribbon bar with perforated top/bottom tear lines, countdown urgency badge, action CTA button, and dismiss action. |
| [`callout`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/callout.tsx) | Callout | Dismissible notice box with tone variants. |

| [`skeleton-v2`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/skeleton-v2.tsx) | Skeleton V2 | Shimmer sweep skeleton with text-line and card composition presets. |
| [`alert-dialog`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/alert-dialog.tsx) | Alert Dialog | Confirm/cancel modal with destructive variant for irreversible actions, Escape/backdrop close, and animated content. |
| [`confirm-dialog`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/confirm-dialog.tsx) | ConfirmDialog | Self-contained confirm dialog with focus trap and stamp entrance for confirm button in destructive mode. |
| [`result`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/result.tsx) | Result | Full-panel status screen with icon circle, title, description, and actions slot; confetti-ish subtle burst on success. |
| [`loading-dots`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/loading-dots.tsx) | LoadingDots | Three dots bounce in sequence with keyframe animation; sizes sm/md/lg and tone prop. |
| [`loading-overlay`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/loading-overlay.tsx) | LoadingOverlay | Absolute/fixed veil with backdrop blur and spinner; fade in/out with opacity transition. |
| [`notification-center`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/notification-center.tsx) | NotificationCenter | Bell button with unread badge + dropdown panel with notification rows, mark-all-read, empty state. |
| [`spotlight`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/spotlight.tsx) | Spotlight | Full-viewport dim overlay with cutout hole positioned via target ref/bounding box; pulse ring around target; caption card. |
| [`coach-mark`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/coach-mark.tsx) | CoachMark | Single floating tip bubble anchored to trigger children with arrow, title, body, dismiss; pop-in with springy scale. |
| [`cart-drawer`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/cart-drawer.tsx) | Cart Drawer | Slide-over cart drawer with quantity controls and animated removal. |
| [`reaction-bar`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/reaction-bar.tsx) | ReactionBar | Emoji buttons with counts, active reaction pops, and hover tooltips. |
| [`like-button`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/like-button.tsx) | LikeButton | Heart/thumb button that fills on click with burst particle animation and count increment. |
| [`now-serving`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/now-serving.tsx) | NowServing | Split-flap style NOW SERVING board whose digits flip on value change with a blinking chime dot. |
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
| [`command-palette`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/command-palette.tsx) | Command Palette | Modal search command palette with keyboard shortcuts, categorization, and filter. |
| [`context-menu`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/context-menu.tsx) | Context Menu | Right-click menu with smooth reveal, shortcuts, and dashed divider. |
| [`scroll-top`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/scroll-top.tsx) | Scroll Top | Floating elevator button that scrolls smoothly to page top. |
| [`menubar`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/menubar.tsx) | Menubar | Theater box office menu bar with dropdown menus, shortcuts, and dashed frames. |
| [`navbar`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/navbar.tsx) | Navbar | Navigation bar with brand monogram and active links. |
| [`tree-nav`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/tree-nav.tsx) | Tree Nav | Hierarchical explorer with collapsible nodes and icons. |
| [`sidebar`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/sidebar.tsx) | Sidebar | Collapsible navigation sidebar drawer with notch cutouts. |
| [`breadcrumb-dropdown`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/breadcrumb-dropdown.tsx) | Breadcrumb Dropdown | Hierarchical route breadcrumb with popover dropdown for intermediate tiers. |
| [`dock`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/dock.tsx) | Dock | Floating application dock bar with hover magnification and active indicators. |

| [`carousel`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/carousel.tsx) | Carousel | Sliding track carousel with prev/next arrows, dot indicators, keyboard arrows, and optional autoplay. |
| [`navigation-menu`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/navigation-menu.tsx) | Navigation Menu | Horizontal nav bar whose items reveal an animated panel below with height/fade reveal and sliding indicator. |
| [`dropdown-menu-v2`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/dropdown-menu-v2.tsx) | Dropdown Menu V2 | V2 dropdown menu: nested submenus, checkbox items, radio groups, separators, danger items, and shortcut kbd hints. |
| [`footer`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/footer.tsx) | Footer | Site footer with brand monogram, staggered link columns and dashed-top bottom bar. |
| [`faq`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/faq.tsx) | Faq | Self-contained accordion Q&A with one-open behavior, grid-rows height reveal and rotating plus icon. |
| [`fab`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/fab.tsx) | Fab | Floating action button fixed in corner with hover growth, ripple press, and tooltip label on hover. |
| [`speed-dial`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/speed-dial.tsx) | SpeedDial | FAB that fans out mini action buttons in an arc with staggered scale-in when open; Escape closes. |
| [`share-menu`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/share-menu.tsx) | ShareMenu | Platform icon row (X, Facebook, LinkedIn, Link) with copy link feedback and stamp stamp. |
| [`tabbar`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/tabbar.tsx) | TabBar | Fixed bottom navigation bar with sliding active indicator pill and badge support |
| [`pager-dots`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/pager-dots.tsx) | PagerDots | Navigation page indicators with active dot that stretches and variant styles |
| [`app-shell`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/app-shell.tsx) | AppShell | Page skeleton with top bar, collapsible sidebar, and main content area with built-in skip-link |
| [`skip-link`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/skip-link.tsx) | SkipLink | Accessibility skip-link that becomes visible on keyboard focus with translate animation |
| [`back-link`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/back-link.tsx) | BackLink | Chevron button with label that slides on hover, with focus ring |
| [`flyout-menu`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/flyout-menu.tsx) | FlyoutMenu | Hover dropdown menu with scale-in origin-top panel and keyboard navigation |
| [`scroll-spy-nav`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/scroll-spy-nav.tsx) | ScrollSpyNav | Horizontal sticky navigation with active pill that slides under the active section, smooth scroll with reduced-motion fallback |
</details>

## Theming

Design tokens live in [`bigbullui.css`](https://github.com/F0Rextasy/bigbullui/blob/main/bigbullui.css). Override any `--background`, `--foreground`, `--accent` and the whole library follows. Dark mode is a single `.dark` class on `<html>`.

## Accessibility

WAI-ARIA patterns throughout: roving tabindex in Tabs and Radio groups, focus trap with Escape handling in Dialog and Sheet, `aria-checked` / `aria-expanded` live states, visible focus rings, and `prefers-reduced-motion` respected by every animation.

## Contributing

Issues and pull requests are welcome. Please keep components dependency-free (`react` + `./lib/utils` only), typed, keyboard accessible, and documented with a docs page entry.

## License

MIT © 2026 F0Rextasy. See [LICENSE](https://github.com/F0Rextasy/bigbullui/blob/main/LICENSE).

## Links

- Documentation: https://bigbullui.vercel.app
- npm: https://www.npmjs.com/package/bigbullui
- Issues: https://github.com/F0Rextasy/bigbullui/issues
