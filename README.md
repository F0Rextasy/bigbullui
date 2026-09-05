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
| [`button`](https://bigbullui.vercel.app/docs/button) | Button | Animated button with hover feedback and crisp focus. |
| [`input`](https://bigbullui.vercel.app/docs/input) | Input | Text input with dashed focus border and design tokens. |
| [`textarea`](https://bigbullui.vercel.app/docs/textarea) | Textarea | Multi-line text area matching Input styling. |
| [`checkbox`](https://bigbullui.vercel.app/docs/checkbox) | Checkbox | Crisp checkbox with bold checked states. |
| [`switch`](https://bigbullui.vercel.app/docs/switch) | Switch | Two-state toggle switch with sliding thumb. |
| [`radio-group`](https://bigbullui.vercel.app/docs/radio-group) | Radio Group | Accessible single-select radio button set. |
| [`slider`](https://bigbullui.vercel.app/docs/slider) | Slider | Draggable value slider with chunky thumb. |
| [`select`](https://bigbullui.vercel.app/docs/select) | Select | Custom dashed listbox dropdown with keyboard navigation. |
| [`stepper`](https://bigbullui.vercel.app/docs/stepper) | Stepper | Increment and decrement buttons with mono readout. |
| [`pin-input`](https://bigbullui.vercel.app/docs/pin-input) | Pin Input | Segmented single-character boxes for codes and OTP. |
| [`rating`](https://bigbullui.vercel.app/docs/rating) | Rating | Interactive star rating with live hover preview. |
| [`copy-button`](https://bigbullui.vercel.app/docs/copy-button) | Copy Button | Tactile button with clipboard feedback and check state. |
| [`search-bar`](https://bigbullui.vercel.app/docs/search-bar) | Search Bar | Dashed search field with shortcut keycap and clear action. |
| [`combobox`](https://bigbullui.vercel.app/docs/combobox) | Combobox | Filterable searchable dropdown with instant keyboard filter. |
| [`file-dropzone`](https://bigbullui.vercel.app/docs/file-dropzone) | File Dropzone | Drag-and-drop upload zone with dashed borders and file preview. |
| [`password-strength`](https://bigbullui.vercel.app/docs/password-strength) | Password Strength | Segmented security verification meter with animated strength bars and criteria checklist. |
| [`inline-edit`](https://bigbullui.vercel.app/docs/inline-edit) | Inline Edit | Click-to-edit field with focus outline, animated save pulse, and cancel action. |
| [`time-input`](https://bigbullui.vercel.app/docs/time-input) | Time Input | Curtain call showtime selector with hours, minutes, and AM/PM stepper. |
| [`masked-input`](https://bigbullui.vercel.app/docs/masked-input) | Masked Input | Formatted code field with auto-formatted delimiters and validation mark. |
| [`date-picker`](https://bigbullui.vercel.app/docs/date-picker) | Date Picker | Date picker input with popover calendar and quick date selection. |
| [`dual-slider`](https://bigbullui.vercel.app/docs/dual-slider) | Dual Slider | Price range selector with minimum and maximum draggable handles. |
| [`mention-input`](https://bigbullui.vercel.app/docs/mention-input) | Mention Input | Mention input with instant @ autocomplete popover. |
| [`autocomplete`](https://bigbullui.vercel.app/docs/autocomplete) | Autocomplete | Typeahead search input with instant suggestions and keyboard select. |
| [`transfer-list`](https://bigbullui.vercel.app/docs/transfer-list) | Transfer List | Two-column transfer list between available and claimed items. |
| [`tree-select`](https://bigbullui.vercel.app/docs/tree-select) | Tree Select | Hierarchical seating dropdown selector with expandable zone nodes. |
| [`masked-currency`](https://bigbullui.vercel.app/docs/masked-currency) | Masked Currency | Formatted currency price input with prefix badge and numeric mask. |
| [`segmented-switch`](https://bigbullui.vercel.app/docs/segmented-switch) | Segmented Switch | Mechanical multi-option lever switch with smooth slide carriage. |
| [`theme-toggle`](https://bigbullui.vercel.app/docs/theme-toggle) | Theme Toggle | Theme switcher with day and night flip animation. |
| [`signature-pad`](https://bigbullui.vercel.app/docs/signature-pad) | Signature Pad | Interactive canvas endorsement pad with clear action and receipt stamp. |
| [`seat-map`](https://bigbullui.vercel.app/docs/seat-map) | Seat Map | Interactive arena seating chart matrix grid with row letters, seat numbers, tier types, and price calculator. |
| [`keypad`](https://bigbullui.vercel.app/docs/keypad) | Keypad | Numeric PIN keypad with tactile mechanical keys, visual pulse, and masked PIN display. |
| [`tag-input`](https://bigbullui.vercel.app/docs/tag-input) | Tag Input | Tag input with pill chip badges, remove buttons, backspace deletion, and dashed container. |

| [`label`](https://bigbullui.vercel.app/docs/label) | Label | Form label with mono uppercase styling and an animated stamp-red asterisk when required. |
| [`form-field`](https://bigbullui.vercel.app/docs/form-field) | Form Field | Field wrapper with label, control, description, and error message with a shake-in animation on error. |
| [`field`](https://bigbullui.vercel.app/docs/field) | Field | Composable field primitives: Field, FieldLabel, FieldControl, FieldDescription, FieldError, FieldGroup, FieldSet. |
| [`toggle`](https://bigbullui.vercel.app/docs/toggle) | Toggle | Two-state button with aria-pressed, springy press animation, and default/outline/accent variants. |
| [`multi-select`](https://bigbullui.vercel.app/docs/multi-select) | Multi Select | Trigger + popover picker with search input, checkbox options, and animated removable selection chips. |
| [`input-group`](https://bigbullui.vercel.app/docs/input-group) | Input Group | Input with prefix icon slot, suffix slot, and inner action button; dashed focus ring and animated underline sweep. |
| [`button-group`](https://bigbullui.vercel.app/docs/button-group) | Button Group | Joins buttons with rounded outer corners, internal separators, and sliding hover highlight. |
| [`loading-button`](https://bigbullui.vercel.app/docs/loading-button) | Loading Button | Button with loading spinner swap, width locking to avoid jumps, and a brief success check-mark stamp. |
| [`checkbox-group`](https://bigbullui.vercel.app/docs/checkbox-group) | Checkbox Group | Checkbox options with a select-all row (indeterminate state), animated check fills, and staggered entrance. |
| [`listbox`](https://bigbullui.vercel.app/docs/listbox) | Listbox | Single/multi selectable list with keyboard navigation, ARIA roles, and check marks that slide in. |
| [`size-picker`](https://bigbullui.vercel.app/docs/size-picker) | Size Picker | Size chip picker with out-of-stock strikes and stock dots. |
| [`variant-picker`](https://bigbullui.vercel.app/docs/variant-picker) | Variant Picker | Color swatch and size variant picker with animated selection. |
| [`wishlist-button`](https://bigbullui.vercel.app/docs/wishlist-button) | Wishlist Button | Heart wishlist button with pop fill and floating burst. |
| [`add-to-cart-button`](https://bigbullui.vercel.app/docs/add-to-cart-button) | Add To Cart Button | Add-to-cart button with flying dot arc and check stamp. |
| [`emoji-picker`](https://bigbullui.vercel.app/docs/emoji-picker) | EmojiPicker | Panel with category tabs (Smileys, Gestures, Hearts, Objects), search filter, and emoji grid with selection callback. |
| [`volume-slider`](https://bigbullui.vercel.app/docs/volume-slider) | VolumeSlider | Vertical or horizontal slider with fill animation, mute toggle, and ARIA roles |
| [`text-diff`](https://bigbullui.vercel.app/docs/text-diff) | TextDiff | Word-level diff showing added/removed words with animation |
| [`copy-chip`](https://bigbullui.vercel.app/docs/copy-chip) | CopyChip | Small mono chip that copies to clipboard with check morph and 'COPIED' feedback |
| [`phone-input`](https://bigbullui.vercel.app/docs/phone-input) | PhoneInput | Phone number input with country code selector and formatted display |
| [`email-input`](https://bigbullui.vercel.app/docs/email-input) | EmailInput | Email input with live validation and typo domain suggestions |
| [`date-range-picker`](https://bigbullui.vercel.app/docs/date-range-picker) | DateRangePicker | Two-month mini calendar grid for selecting start and end dates with nights count |
| [`month-picker`](https://bigbullui.vercel.app/docs/month-picker) | MonthPicker | 12-month grid for selecting a month with year navigation |
| [`year-picker`](https://bigbullui.vercel.app/docs/year-picker) | YearPicker | Year grid with page navigation for selecting a year |
| [`time-range-picker`](https://bigbullui.vercel.app/docs/time-range-picker) | TimeRangePicker | Two time inputs with duration readout that animates on change |
| [`clock-picker`](https://bigbullui.vercel.app/docs/clock-picker) | ClockPicker | Analog clock with draggable hands for time selection |
| [`hotkey-recorder`](https://bigbullui.vercel.app/docs/hotkey-recorder) | HotkeyRecorder | Record keyboard hotkey combinations with visual chip display |
| [`file-input`](https://bigbullui.vercel.app/docs/file-input) | FileInput | Styled file input with drop chips and selection count animation |
| [`slider-ticks`](https://bigbullui.vercel.app/docs/slider-ticks) | SliderTicks | Slider with tick marks, labels, and snap-to-ticks functionality |
| [`rich-text-editor`](https://bigbullui.vercel.app/docs/rich-text-editor) | Rich Text Editor | Minimal contentEditable editor with toolbar (bold, italic, underline, lists, links, quote, code) and word/char counter. |
| [`login-form`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/login-form.tsx) | Login Form | Login form with live validation, show/hide password, remember me and social buttons. |
| [`register-form`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/register-form.tsx) | Register Form | Registration form with name, email, animated password strength and terms consent. |
| [`forgot-password`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/forgot-password.tsx) | Forgot Password | Password reset flow: email input transitions to animated sent confirmation. |
| [`otp-verify`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/otp-verify.tsx) | Otp Verify | 6-digit OTP verification with auto-advance, paste support and resend countdown. |
| [`two-factor`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/two-factor.tsx) | Two Factor | 2FA setup panel with animated QR scan line, recovery codes and copy action. |
| [`permissions-matrix`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/permissions-matrix.tsx) | Permissions Matrix | Role � permission checkbox matrix with animated check pops. |
| [`profile-settings`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/profile-settings.tsx) | Profile Settings | Profile settings with avatar slot, fields and animated danger zone. |
| [`team-members`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/team-members.tsx) | Team Members | Team member management: invite input, role chips, remove action. |
| [`form-progress`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/form-progress.tsx) | Form Progress | Form completion progress with segmented dashed bars. |
| [`feature-flag-panel`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/feature-flag-panel.tsx) | Feature Flag Panel | Feature flag panel with toggle switches and rollout percentages. |
| [`board-checklist`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/board-checklist.tsx) | Board Checklist | Task checklist: checkboxes, assignee, priority badges and progress bar. |
| [`search-filter-bar`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/search-filter-bar.tsx) | Search Filter Bar | Combined search, sort and filter toolbar with animated chips. |
| [`avatar-upload`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/avatar-upload.tsx) | Avatar Upload | Avatar upload circle with hover camera overlay and preview. |
| [`shipping-options`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/shipping-options.tsx) | Shipping Options | Shipping option radio cards with carrier, duration and price. |
| [`payment-methods`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/payment-methods.tsx) | Payment Methods | Payment method selector with card, bank, cash, wallet icons. |
| [`credit-card-form`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/credit-card-form.tsx) | Credit Card Form | Credit card form with live number formatting and expiry mask. |
| [`installment-picker`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/installment-picker.tsx) | Installment Picker | Installment plan picker: months, monthly amount, total. |
| [`coupon-field`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/coupon-field.tsx) | Coupon Field | Coupon code field with validation, success check and shake error. |
| [`exchange-rate`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/exchange-rate.tsx) | Exchange Rate | Exchange rate converter with two-way live calculation. |
| [`audio-recorder`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/audio-recorder.tsx) | Audio Recorder | Microphone recording simulator with waveform and send action. |
| [`code-editor`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/code-editor.tsx) | Code Editor | Code editor: line-number gutter, Tab insertion, scroll sync. |
| [`markdown-editor`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/markdown-editor.tsx) | Markdown Editor | Markdown write/preview tabs with built-in renderer. |
| [`diff-editor`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/diff-editor.tsx) | Diff Editor | Editable side-by-side diff view. |
| [`json-editor`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/json-editor.tsx) | Json Editor | JSON editor with live validation, error line and format button. |
| [`regex-tester`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/regex-tester.tsx) | Regex Tester | Regex tester: pattern, test string, highlighted matches and count. |
| [`cron-builder`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/cron-builder.tsx) | Cron Builder | Cron expression builder: 5 fields, presets, live description. |
| [`env-editor`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/env-editor.tsx) | Env Editor | Environment variable editor: secret masking, add/remove rows. |
| [`checkbox-card`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/checkbox-card.tsx) | Checkbox Card | Card-style checkbox with title, description and check pop. |
| [`radio-tile`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/radio-tile.tsx) | Radio Tile | Radio tile with icon, description and sliding dot. |
| [`switch-card`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/switch-card.tsx) | Switch Card | Switch card combining title, description and toggle. |
| [`field-array`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/field-array.tsx) | Field Array | Dynamic form rows: add, remove, move up/down. |
| [`textarea-autosize`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/textarea-autosize.tsx) | Textarea Autosize | Auto-growing textarea with min/max height bounds. |
| [`password-input`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/password-input.tsx) | Password Input | Password input with animated show/hide eye toggle. |
| [`consent-checkbox`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/consent-checkbox.tsx) | Consent Checkbox | GDPR/KVKK consent checkbox with link and required marker. |
| [`address-form`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/address-form.tsx) | Address Form | Address form grid: street, city, district, postal, country. |
| [`currency-select`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/currency-select.tsx) | Currency Select | Currency select dropdown with symbols and codes. |
| [`country-select`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/country-select.tsx) | Country Select | Country select with flag emojis and codes. |
| [`duration-input`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/duration-input.tsx) | Duration Input | Duration input: hour/minute/second steppers. |
| [`serial-input`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/serial-input.tsx) | Serial Input | Serial number input: grouped boxes, auto-advance, paste support. |
| [`betting-slip`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/betting-slip.tsx) | Betting Slip | Betting slip: match picks, odds grid, stake and play button. |
</details>

<details>
<summary><strong>Display</strong> — surfaces, badges and data views</summary>

| File | Component | Description |
|---|---|---|
| [`ticket-card`](https://bigbullui.vercel.app/docs/ticket-card) | Ticket Card | Complete admission ticket with notched edges and seat details. |
| [`coupon`](https://bigbullui.vercel.app/docs/coupon) | Coupon | Discount coupon with scissor cutout lines and promo code copy. |
| [`boarding-pass`](https://bigbullui.vercel.app/docs/boarding-pass) | Boarding Pass | Flight pass with origin, destination and receipt section. |
| [`price-tag`](https://bigbullui.vercel.app/docs/price-tag) | Price Tag | Price tag with eyelet string hole and sale mark. |
| [`luggage-tag`](https://bigbullui.vercel.app/docs/luggage-tag) | Luggage Tag | Baggage claim tag with handle loop and destination code. |
| [`barcode`](https://bigbullui.vercel.app/docs/barcode) | Barcode | Dynamic SVG barcode with mono serial readout. |
| [`stamp-seal`](https://bigbullui.vercel.app/docs/stamp-seal) | Stamp Seal | Rotated rubber stamp badge with double dashed circular ring. |
| [`card`](https://bigbullui.vercel.app/docs/card) | Card | Double-frame surface container with header, content, and footer. |
| [`badge`](https://bigbullui.vercel.app/docs/badge) | Badge | Micro status pill with subtle entrance transition. |
| [`avatar`](https://bigbullui.vercel.app/docs/avatar) | Avatar | Initials or photo badge with dashed ring. |
| [`progress`](https://bigbullui.vercel.app/docs/progress) | Progress | Marching striped progress indicator bar. |
| [`kbd`](https://bigbullui.vercel.app/docs/kbd) | Kbd | Keycap indicator with raised bottom border for shortcuts. |
| [`separator`](https://bigbullui.vercel.app/docs/separator) | Separator | Horizontal or vertical dashed divider. |
| [`table`](https://bigbullui.vercel.app/docs/table) | Table | Data table with dashed row dividers and mono headers. |
| [`marquee`](https://bigbullui.vercel.app/docs/marquee) | Marquee | Smooth ticker reel that pauses on hover. |
| [`timeline`](https://bigbullui.vercel.app/docs/timeline) | Timeline | Vertical chronological events with dashed connection stem. |
| [`sparkline`](https://bigbullui.vercel.app/docs/sparkline) | Sparkline | Lightweight SVG trend sparkline with animated end-point. |
| [`bar-chart`](https://bigbullui.vercel.app/docs/bar-chart) | Bar Chart | Mini data bar chart with dashed guideline grids and hover zoom. |
| [`calendar`](https://bigbullui.vercel.app/docs/calendar) | Calendar | Month calendar with date selection, month navigation, and today indicator. |
| [`data-table`](https://bigbullui.vercel.app/docs/data-table) | Data Table | Sortable, searchable data table with row selection and pagination. |
| [`video-frame`](https://bigbullui.vercel.app/docs/video-frame) | Video Frame | Cinema screening container with sprocket edges and play overlay. |
| [`audio-mini`](https://bigbullui.vercel.app/docs/audio-mini) | Audio Mini | Compact audio player with animated equalizer bars and duration counter. |
| [`section-heading`](https://bigbullui.vercel.app/docs/section-heading) | Section Heading | Theater and arena section divider banner with dashed rules and zone badges. |
| [`lightbox`](https://bigbullui.vercel.app/docs/lightbox) | Lightbox | Fullscreen media viewer with film frame edges and image paging. |
| [`sticky-bar`](https://bigbullui.vercel.app/docs/sticky-bar) | Sticky Bar | Floating bottom checkout bar with item counter and admission button. |
| [`stack`](https://bigbullui.vercel.app/docs/stack) | Stack | Stacked container with staggered angles and hover fan-out. |
| [`container`](https://bigbullui.vercel.app/docs/container) | Container | Centered layout wrapper with notch cutouts. |
| [`kanban-lite`](https://bigbullui.vercel.app/docs/kanban-lite) | Kanban Lite | Queue and stage progression board with notch cards. |
| [`gantt-lite`](https://bigbullui.vercel.app/docs/gantt-lite) | Gantt Lite | Interactive festival and stage timetable schedule with animated now indicator. |
| [`stopwatch`](https://bigbullui.vercel.app/docs/stopwatch) | Stopwatch | Precision timer with lap tear-offs and digital readout. |
| [`countup`](https://bigbullui.vercel.app/docs/countup) | Countup | Mechanical turnstile odometer counter with animated tally and slot frames. |
| [`nfc-badge`](https://bigbullui.vercel.app/docs/nfc-badge) | NFC Badge | Contactless gate pass tap simulator with animated radio wave ripple pulse, status badge, lanyard notch, and admission chime. |
| [`scratch-off`](https://bigbullui.vercel.app/docs/scratch-off) | Scratch Off | Lottery ticket with interactive foil scratch layer and auto-reveal. |
| [`qr-reader`](https://bigbullui.vercel.app/docs/qr-reader) | QR Reader | Turnstile simulated camera QR and barcode scanner viewfinder with animated laser sweep and targeting reticle. |
| [`audio-waveform`](https://bigbullui.vercel.app/docs/audio-waveform) | Audio Waveform | Interactive multi-bar audio wave visualizer for concert recordings with live animated frequency bars and timestamp readout. |
| [`ticket-fold`](https://bigbullui.vercel.app/docs/ticket-fold) | Ticket Fold | 3D accordion fold pass that unfolds with smooth perspective rotation and tear-away slip. |
| [`split-flap`](https://bigbullui.vercel.app/docs/split-flap) | Split Flap | Mechanical departure board with flipping characters and retro terminal styling. |
| [`watermark`](https://bigbullui.vercel.app/docs/watermark) | Watermark | Repeating watermark pattern with security angle. |
| [`turnstile-gate`](https://bigbullui.vercel.app/docs/turnstile-gate) | Turnstile Gate | Mechanical rotor barrier with pass counter, status LED, and push animation. |
| [`collapsible`](https://bigbullui.vercel.app/docs/collapsible) | Collapsible | Standalone expandable disclosure card with notch header, animated height reveal and status mark. |
| [`aspect-ratio`](https://bigbullui.vercel.app/docs/aspect-ratio) | Aspect Ratio | Proportional media container with preset ratios, framed border, and corner guides. |
| [`resizable`](https://bigbullui.vercel.app/docs/resizable) | Resizable | Splitter layout panels with draggable resize handle, min/max limits and collapse button. |
| [`scroll-area`](https://bigbullui.vercel.app/docs/scroll-area) | Scroll Area | Custom styled scrollable container with customized dashed scrollbar track, thumb indicator, horizontal/vertical support, and perforated top/bottom shadow fades. |
| [`pricing-table`](https://bigbullui.vercel.app/docs/pricing-table) | Pricing Table | 3-tier matrix with billing switcher, highlighted plan and feature checklist. |
| [`metric-card`](https://bigbullui.vercel.app/docs/metric-card) | Metric Card | Dashboard KPI card with value, trend delta and period label. |
| [`code-block`](https://bigbullui.vercel.app/docs/code-block) | Code Block | Code snippet block with filename tab, language badge and copy button. |
| [`activity-feed`](https://bigbullui.vercel.app/docs/activity-feed) | Activity Feed | Universal user and team activity stream for deployments, invites, edits, and security audits with timeline avatars, action badges, relative timestamps, and event icons. |
| [`credit-card`](https://bigbullui.vercel.app/docs/credit-card) | Credit Card | Universal payment card visualizer with real-time card number formatting, brand badge detection (Visa, Mastercard, Amex), metallic EMV chip, and interactive 3D flip card to show CVV. |
| [`status-dot`](https://bigbullui.vercel.app/docs/status-dot) | Status Dot | Live status beacon with radar sweep pulse, glow rings and occupancy levels. |
| [`donut-chart`](https://bigbullui.vercel.app/docs/donut-chart) | Donut Chart | Interactive SVG donut and pie chart with segment hover highlight, tooltips, center total readout, and custom color legend. |
| [`trend-badge`](https://bigbullui.vercel.app/docs/trend-badge) | Trend Badge | Stamped trend badge with direction arrow, velocity levels and live pulse. |
| [`meter`](https://bigbullui.vercel.app/docs/meter) | Meter | Gauge meter with zones, ticks and status readout. |
| [`badge-ribbon`](https://bigbullui.vercel.app/docs/badge-ribbon) | Badge Ribbon | Rosette award ribbon with rank and color themes. |

| [`avatar-group`](https://bigbullui.vercel.app/docs/avatar-group) | Avatar Group | Overlapping avatar stack with +N overflow chip that fans out on hover. |
| [`divider-with-text`](https://bigbullui.vercel.app/docs/divider-with-text) | Divider With Text | Centered label over dashed separator lines with a line-grow scaleX animation on mount. |
| [`item`](https://bigbullui.vercel.app/docs/item) | Item | Generic row surface with leading media, title, description, and trailing actions; hover lift with accent bar slide-in. |
| [`heading`](https://bigbullui.vercel.app/docs/heading) | Heading | Semantic heading with level-based scale, optional mono eyebrow and per-level entrance animation. |
| [`text`](https://bigbullui.vercel.app/docs/text) | Text | Typographic paragraph primitive with default, muted, small, lead and mono variants. |
| [`list`](https://bigbullui.vercel.app/docs/list) | List | List with dashed, numbered and icon variants plus staggered item entrances and List/ListItem composition. |
| [`quote`](https://bigbullui.vercel.app/docs/quote) | Quote | Blockquote with dashed left frame, stamp entrance and mono uppercase cite line. |
| [`figure`](https://bigbullui.vercel.app/docs/figure) | Figure | Framed media figure with double-frame surface and delayed figcaption fade-in. |
| [`description-list`](https://bigbullui.vercel.app/docs/description-list) | DescriptionList | Term/description pairs with mono uppercase terms, muted descriptions and staggered row entrances. |
| [`page-header`](https://bigbullui.vercel.app/docs/page-header) | PageHeader | Page title with stamp entrance, fading description, actions slot and optional mono eyebrow. |
| [`hero`](https://bigbullui.vercel.app/docs/hero) | Hero | Landing hero with accent highlight word, primary/secondary actions and bottom marquee strip. |
| [`media-object`](https://bigbullui.vercel.app/docs/media-object) | MediaObject | Horizontal media plus content row with title, description, meta chips and hover lift. |
| [`link-card`](https://bigbullui.vercel.app/docs/link-card) | LinkCard | Whole-card link with sliding arrow, darkening border on hover and fade-up entrance. |
| [`logo-cloud`](https://bigbullui.vercel.app/docs/logo-cloud) | LogoCloud | Grid or marquee row of monogram logo tiles in dashed frames with hover reveal. |
| [`testimonial`](https://bigbullui.vercel.app/docs/testimonial) | Testimonial | Quote card with initials avatar, name, role and staggered star rating pop-in. |
| [`team-grid`](https://bigbullui.vercel.app/docs/team-grid) | TeamGrid | Grid of member cards with initials avatars, roles, optional links and staggered hover-lift entrances. |
| [`feature-grid`](https://bigbullui.vercel.app/docs/feature-grid) | FeatureGrid | Feature tiles with icon slot, stamp-on-hover icons, darkening borders and staggered entrance. |
| [`cta-section`](https://bigbullui.vercel.app/docs/cta-section) | CtaSection | Double-frame call-to-action band with stamp-seal corner badge and stamping action button. |
| [`line-chart`](https://bigbullui.vercel.app/docs/line-chart) | Line Chart | Multi-series line chart with stroke-dasharray animation and hover tooltips |
| [`area-chart`](https://bigbullui.vercel.app/docs/area-chart) | Area Chart | Filled area chart with gradient fills and hover highlights |
| [`stacked-bar`](https://bigbullui.vercel.app/docs/stacked-bar) | Stacked Bar Chart | Horizontal stacked bars with segmented rows and legend chips |
| [`gauge`](https://bigbullui.vercel.app/docs/gauge) | Gauge | Half-donut SVG gauge with needle animation and value readout |
| [`progress-circle`](https://bigbullui.vercel.app/docs/progress-circle) | Progress Circle | Circular progress ring with stroke-dashoffset animation and center percentage |
| [`radar-chart`](https://bigbullui.vercel.app/docs/radar-chart) | Radar Chart | Spider web chart with polygon axes and data polygon animation |
| [`heatmap`](https://bigbullui.vercel.app/docs/heatmap) | Heatmap | Grid of colored cells showing value intensities with diagonal stagger |
| [`calendar-heatmap`](https://bigbullui.vercel.app/docs/calendar-heatmap) | Calendar Heatmap | GitHub-style Git calendar heatmap grid |
| [`funnel-chart`](https://bigbullui.vercel.app/docs/funnel-chart) | Funnel Chart | Horizontal funnel stages showing conversion percentages between steps |
| [`scatter-plot`](https://bigbullui.vercel.app/docs/scatter-plot) | Scatter Plot | SVG scatter plot with dashed axes and hover enlargements |
| [`waterfall-chart`](https://bigbullui.vercel.app/docs/waterfall-chart) | Waterfall Chart | Floating bars showing incremental changes with connecting guides |
| [`candlestick-chart`](https://bigbullui.vercel.app/docs/candlestick-chart) | Candlestick Chart | OHLC candlestick chart for financial data visualization |
| [`leaderboard`](https://bigbullui.vercel.app/docs/leaderboard) | Leaderboard | Ranked leaderboard with medal tiles for top 3 and count-up scores |
| [`scoreboard`](https://bigbullui.vercel.app/docs/scoreboard) | Scoreboard | Two-team score card with rolling digit animation |
| [`json-viewer`](https://bigbullui.vercel.app/docs/json-viewer) | JSON Viewer | Collapsible JSON tree with mono keys and color-typed values |
| [`diff-viewer`](https://bigbullui.vercel.app/docs/diff-viewer) | Diff Viewer | Unified diff viewer showing added/removed/context lines |
| [`terminal`](https://bigbullui.vercel.app/docs/terminal) | Terminal | Fake terminal card with sequential line reveal and blinking cursor |
| [`log-viewer`](https://bigbullui.vercel.app/docs/log-viewer) | Log Viewer | Scrolling log stream with level badges and filter chips |
| [`treemap-chart`](https://bigbullui.vercel.app/docs/treemap-chart) | Treemap Chart | Squarified treemap with recursive rectangles and staggered labels |
| [`image-compare`](https://bigbullui.vercel.app/docs/image-compare) | ImageCompare | Before/after slider with clip-path inset controlled by draggable divider; BEFORE/AFTER labels. |
| [`zoom-image`](https://bigbullui.vercel.app/docs/zoom-image) | ZoomImage | Image with hover magnifier lens tracking cursor; framed double border. |
| [`infinite-scroll`](https://bigbullui.vercel.app/docs/infinite-scroll) | InfiniteScroll | IntersectionObserver sentinel: when visible calls onLoadMore, shows animated loader row; wraps children. |
| [`load-more`](https://bigbullui.vercel.app/docs/load-more) | LoadMore | Button row "LOAD MORE" with progress mono counter; on click reveals hidden children with stagger. |
| [`virtual-list`](https://bigbullui.vercel.app/docs/virtual-list) | VirtualList | Windowed list for fixed-height rows: scrollTop math, visible slice renders, spacer divs; smooth scroll. |
| [`scroll-shadow`](https://bigbullui.vercel.app/docs/scroll-shadow) | ScrollShadow | Wrapper with top/bottom shadow indicators that fade in only when scrollable in that direction; dashed scrollbar styling. |
| [`reveal`](https://bigbullui.vercel.app/docs/reveal) | Reveal | IntersectionObserver: children animate in when entering viewport with fade-up/scale variants, delay prop, once re-trigger option. |
| [`product-card`](https://bigbullui.vercel.app/docs/product-card) | Product Card | Product card with image slot, price, discount badge and wishlist heart. |
| [`user-card`](https://bigbullui.vercel.app/docs/user-card) | User Card | Profile card with avatar, role, meta chips and action slot. |
| [`article-card`](https://bigbullui.vercel.app/docs/article-card) | Article Card | Blog article card with category badge, excerpt and author meta. |
| [`event-card`](https://bigbullui.vercel.app/docs/event-card) | Event Card | Event card with perforated date block, venue and time chips. |
| [`invoice`](https://bigbullui.vercel.app/docs/invoice) | Invoice | Invoice layout with line items, tax breakdown and stamped total. |
| [`receipt`](https://bigbullui.vercel.app/docs/receipt) | Receipt | Thermal receipt with zigzag tear edge, mono lines and barcode footer. |
| [`checkout-summary`](https://bigbullui.vercel.app/docs/checkout-summary) | Checkout Summary | Cart summary with quantity steppers, tax row and checkout CTA. |
| [`order-card`](https://bigbullui.vercel.app/docs/order-card) | Order Card | Order status card with step dots and item summary. |
| [`stamp-card`](https://bigbullui.vercel.app/docs/stamp-card) | Stamp Card | Loyalty punch card with stamped circles and reward row. |
| [`gift-card`](https://bigbullui.vercel.app/docs/gift-card) | Gift Card | Gift card with ribbon stripe, amount and balance bar. |
| [`id-card`](https://bigbullui.vercel.app/docs/id-card) | Id Card | Employee ID card with hologram shine sweep and barcode. |
| [`rsvp-card`](https://bigbullui.vercel.app/docs/rsvp-card) | Rsvp Card | Invitation RSVP card with attending toggle and wax stamp. |
| [`chat-window`](https://bigbullui.vercel.app/docs/chat-window) | ChatWindow | Full chat panel with message list, input bar, and typing indicator slot. |
| [`chat-bubble`](https://bigbullui.vercel.app/docs/chat-bubble) | ChatBubble | Single message bubble with tail, status ticks, and hover press feedback. |
| [`typing-indicator`](https://bigbullui.vercel.app/docs/typing-indicator) | TypingIndicator | Three bouncing dots with user name label indicating who is typing. |
| [`comment-thread`](https://bigbullui.vercel.app/docs/comment-thread) | CommentThread | Nested comments with avatars, collapse/reply actions, and dashed indent guides. |
| [`story-viewer`](https://bigbullui.vercel.app/docs/story-viewer) | StoryViewer | Circular story ring with progress animation, avatar names, and tap zones for prev/next. |
| [`post-card`](https://bigbullui.vercel.app/docs/post-card) | PostCard | Social post with header, body, gradient media placeholder, and action row with like/comment/share counts. |
| [`follower-list`](https://bigbullui.vercel.app/docs/follower-list) | FollowerList | Rows with avatars, names, handles, and Follow buttons that morph between states. |
| [`voice-message`](https://bigbullui.vercel.app/docs/voice-message) | VoiceMessage | Chat audio bubble with play/pause button and animated waveform bars showing audio duration. |
| [`audio-player`](https://bigbullui.vercel.app/docs/audio-player) | AudioPlayer | Full deck audio player with play/pause morph button, seek bar, time readout, volume slider, and track info |
| [`video-player`](https://bigbullui.vercel.app/docs/video-player) | VideoPlayer | Video frame with sprocket styling, hover fade-in controls, progress bar with scrub preview |
| [`playlist`](https://bigbullui.vercel.app/docs/playlist) | Playlist | Track rows with equalizer bars for active track, title/artist, duration, and slide-in marker |
| [`podcast-player`](https://bigbullui.vercel.app/docs/podcast-player) | PodcastPlayer | Episode card with art slot, play button, speed selector chips, skip buttons, and chapter ticks |
| [`video-thumbnail`](https://bigbullui.vercel.app/docs/video-thumbnail) | VideoThumbnail | Poster frame with duration badge, play overlay circle that scales on hover with ripple ring, and title strip |
| [`media-controls`](https://bigbullui.vercel.app/docs/media-controls) | MediaControls | Compact transport bar with prev/play/next/stop buttons, progress micro-bar, and time display |
| [`live-badge`](https://bigbullui.vercel.app/docs/live-badge) | LiveBadge | LIVE indicator with blinking dot, mono uppercase label, and optional viewer count that ticks |
| [`time-ago`](https://bigbullui.vercel.app/docs/time-ago) | TimeAgo | Relative time display showing '5 MIN AGO' with live re-render tick every 30s |
| [`live-clock`](https://bigbullui.vercel.app/docs/live-clock) | LiveClock | Digital clock showing HH:MM:SS with optional timezone and variant support |
| [`typewriter`](https://bigbullui.vercel.app/docs/typewriter) | Typewriter | Types text char-by-char with blinking block cursor, loops through phrases |
| [`highlight-text`](https://bigbullui.vercel.app/docs/highlight-text) | HighlightText | Highlights query matches inside text with accent background and animated reveal |
| [`truncate`](https://bigbullui.vercel.app/docs/truncate) | Truncate | Single/multi-line clamp with optional expand toggle (MORE/LESS) |
| [`currency-display`](https://bigbullui.vercel.app/docs/currency-display) | CurrencyDisplay | Formatted money with symbol, mono integer part, smaller muted decimals, optional count-up animation |
| [`receipt-printer`](https://bigbullui.vercel.app/docs/receipt-printer) | ReceiptPrinter | Thermal printer that feeds mono receipt lines out of a printer slot with a stepped paper animation. |
| [`queue-ticket`](https://bigbullui.vercel.app/docs/queue-ticket) | QueueTicket | Take-a-number queue ticket with a big tear-off number tab, NOW SERVING ring and queue stats. |
| [`passport`](https://bigbullui.vercel.app/docs/passport) | Passport | Double-frame passport cover with monogram, holder fields and staggered visa stamp marks. |
| [`wax-seal`](https://bigbullui.vercel.app/docs/wax-seal) | WaxSeal | Circular wax blob with a pressed-in monogram entrance and an optional cracked break state. |
| [`envelope`](https://bigbullui.vercel.app/docs/envelope) | Envelope | Envelope whose flap opens with a 3D rotateX and the letter inside rises, on hover or via an open prop. |
| [`airmail-letter`](https://bigbullui.vercel.app/docs/airmail-letter) | AirmailLetter | Airmail bordered letter with red/blue diagonal stripes, mono lines, a postmark corner and an unfold entrance. |
| [`postmark`](https://bigbullui.vercel.app/docs/postmark) | Postmark | Circular postal cancellation stamp with wavy lines, city and date arcs that stamps in on mount. |
| [`cassette-tape`](https://bigbullui.vercel.app/docs/cassette-tape) | CassetteTape | Cassette with two spinning reels, shifting tape amounts and a handwritten-style label with play toggle. |
| [`vinyl-record`](https://bigbullui.vercel.app/docs/vinyl-record) | VinylRecord | Spinning vinyl with radial grooves, center label, a tonearm that slides in and a wobble on drop. |
| [`flip-clock`](https://bigbullui.vercel.app/docs/flip-clock) | FlipClock | Mechanical split-flap HH:MM clock whose digit cards flip on change with a blinking colon. |
| [`neon-sign`](https://bigbullui.vercel.app/docs/neon-sign) | NeonSign | Neon sign with layered glow text-shadow, flicker-in entrance and a subtle per-letter buzz. |
| [`marquee-bulbs`](https://bigbullui.vercel.app/docs/marquee-bulbs) | MarqueeBulbs | Marquee board framed by chase-blinking bulbs with scrolling center text. |
| [`backstage-pass`](https://bigbullui.vercel.app/docs/backstage-pass) | BackstagePass | Laminated ALL ACCESS pass with lanyard hole, rotated stripe strip, shine sweep on hover and fake barcode. |
| [`wristband`](https://bigbullui.vercel.app/docs/wristband) | Wristband | Festival wristband with patterned repeating stripes, snap closure, serial and a subtle breathing animation. |
| [`lanyard`](https://bigbullui.vercel.app/docs/lanyard) | Lanyard | Strap with clip that sways gently from the top and holds an attached card slot for children. |
| [`drink-ticket`](https://bigbullui.vercel.app/docs/drink-ticket) | DrinkTicket | Perforated drink coupon with glyph, GOOD FOR ONE copy and a tear-off stub that rotates on hover. |
| [`raffle-ticket`](https://bigbullui.vercel.app/docs/raffle-ticket) | RaffleTicket | Raffle ticket with a big number, matching stub number and a winning highlight that pulses and stamps. |
| [`slot-machine`](https://bigbullui.vercel.app/docs/slot-machine) | SlotMachine | Three-reel slot machine with staggered spinning reels, a pulling lever and payline highlight on stop. |
| [`prize-wheel`](https://bigbullui.vercel.app/docs/prize-wheel) | PrizeWheel | SVG prize wheel of tinted segments that spins with eased deceleration and a flicking pointer flapper. |
| [`dice`](https://bigbullui.vercel.app/docs/dice) | Dice | Pair of 3D dice that tumble with rapid face swaps and settle with a bounce on roll. |
| [`coin-flip`](https://bigbullui.vercel.app/docs/coin-flip) | CoinFlip | Coin that rotates on Y through multiple turns, decelerating to a heads or tails face with a stamped result badge. |
| [`playing-card`](https://bigbullui.vercel.app/docs/playing-card) | PlayingCard | Playing card with corner rank and suit, big center suit, diamond-pattern back and a 3D flip on click. |
| [`bingo-card`](https://bigbullui.vercel.app/docs/bingo-card) | BingoCard | 5x5 B-I-N-G-O card whose cells stamp in on toggle with a free center and line-complete sweep highlights. |
| [`jumbotron`](https://bigbullui.vercel.app/docs/jumbotron) | Jumbotron | Oversized scoreboard with pixel-style mono type, scanline sweep and scoreboard slots for home and away. |
| [`fireworks`](https://bigbullui.vercel.app/docs/fireworks) | Fireworks | Rockets that rise and burst into radial particle rings, looping while active. |
| [`disco-ball`](https://bigbullui.vercel.app/docs/disco-ball) | DiscoBall | Tiled mirror sphere that slowly rotates and projects dancing light dots around the room. |
| [`stage-lights`](https://bigbullui.vercel.app/docs/stage-lights) | StageLights | Two to four gradient light cones that sweep alternately over a glowing stage floor ellipse. |
| [`ticket-booth`](https://bigbullui.vercel.app/docs/ticket-booth) | TicketBooth | Booth window with TICKETS marquee header, counter ledge, speaker grille dots and a CLOSED flip sign. |
| [`drive-in-screen`](https://bigbullui.vercel.app/docs/drive-in-screen) | DriveInScreen | Outdoor cinema screen with projection flicker, a car silhouette row and an intermission countdown slot. |
| [`ticket-stub-v2`](https://bigbullui.vercel.app/docs/ticket-stub-v2) | TicketStubV2 | Rip-off event stub whose tear line detaches the stub with rotate-and-fall on tear, plus serial and barcode. |
| [`toc`](https://bigbullui.vercel.app/docs/toc) | Toc | Table of contents with IntersectionObserver scroll-spy and dashed active underline |
| [`qr-code`](https://bigbullui.vercel.app/docs/qr-code) | QR Code | Generates QR codes with Reed-Solomon error correction, mask evaluation, and finder patterns. Includes encodeQrMatrix helper. |
| [`image-crop`](https://bigbullui.vercel.app/docs/image-crop) | Image Crop | Canvas-based image cropping with draggable crop rect, rule-of-thirds grid, resize handles, and dataURL output. |
| [`sankey-chart`](https://bigbullui.vercel.app/docs/sankey-chart) | Sankey Chart | Two-level flow diagram with bezier ribbons, value-based width, hover tooltips, and entrance animations. |
| [`org-chart`](https://bigbullui.vercel.app/docs/org-chart) | Org Chart | Hierarchical tree of boxes with connector lines, expand/collapse nodes, avatar initials, and entrance animations. |
| [`tilt-card`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/tilt-card.tsx) | Tilt Card | 3D cursor-tracking tilt card with springy reset and glare highlight. |
| [`flip-card`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/flip-card.tsx) | Flip Card | Two-face card with rotateY flip animation, hover or click trigger. |
| [`spotlight-card`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/spotlight-card.tsx) | Spotlight Card | Card with cursor-following radial spotlight glow. |
| [`drag-sort`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/drag-sort.tsx) | Drag Sort | HTML5 drag-and-drop reorderable list with grab handles and drop indicators. |
| [`api-key-card`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/api-key-card.tsx) | Api Key Card | API key card with masked value, reveal toggle, copy and regenerate actions. |
| [`audit-log`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/audit-log.tsx) | Audit Log | Audit trail with actor avatars, color-coded action badges and timestamps. |
| [`security-score`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/security-score.tsx) | Security Score | Security score with animated arc gauge and per-check pass/fail list. |
| [`stats-overview`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/stats-overview.tsx) | Stats Overview | Overview layout: KPI tile row, mini bar chart panel and recent records table. |
| [`user-table`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/user-table.tsx) | User Table | User management table with role badges, status dots and remove action. |
| [`role-badge`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/role-badge.tsx) | Role Badge | Role badge set: admin, editor, member, viewer with distinct tones. |
| [`settings-section`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/settings-section.tsx) | Settings Section | Settings section: title, description rows and save confirmation stamp. |
| [`billing-panel`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/billing-panel.tsx) | Billing Panel | Billing panel: plan card, usage meters and invoice list. |
| [`usage-meter`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/usage-meter.tsx) | Usage Meter | Quota meter with color-coded fill bar and over-limit pulse warning. |
| [`webhook-list`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/webhook-list.tsx) | Webhook List | Webhook list with URL, event chips, test button and remove. |
| [`version-badge`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/version-badge.tsx) | Version Badge | Version badge set: new, beta, stable, deprecated tones. |
| [`queued-jobs`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/queued-jobs.tsx) | Queued Jobs | Job queue panel with status, progress bars and cancel action. |
| [`upload-progress`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/upload-progress.tsx) | Upload Progress | Single file upload with circular progress ring and cancel. |
| [`bento-grid`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/bento-grid.tsx) | Bento Grid | Bento grid: variable-sized cells with hover lift and staggered entrance. |
| [`split-screen`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/split-screen.tsx) | Split Screen | Split layout: left content and right emphasis panel with ratio control. |
| [`sticky-footer`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/sticky-footer.tsx) | Sticky Footer | Sticky bottom bar that stays visible during scroll. |
| [`centered-card`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/centered-card.tsx) | Centered Card | Centered single card layout for login/register pages. |
| [`two-column-list`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/two-column-list.tsx) | Two Column List | Two-column notebook-style list with dashed separators. |
| [`masonry-columns`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/masonry-columns.tsx) | Masonry Columns | CSS columns masonry: cards flow by height with break-inside protection. |
| [`hero-split`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/hero-split.tsx) | Hero Split | Split hero: left text block and right framed visual slot. |
| [`data-grid`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/data-grid.tsx) | Data Grid | Heavy data grid: sortable columns, pagination, sticky header. |
| [`tree-table`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/tree-table.tsx) | Tree Table | Hierarchical table rows with expand/collapse chevrons. |
| [`kanban-v2`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/kanban-v2.tsx) | Kanban V2 | Drag-and-drop kanban board v2 with animated column transfers. |
| [`task-list`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/task-list.tsx) | Task List | Task rows with assignee chips and priority badges. |
| [`timeline-vertical-v2`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/timeline-vertical-v2.tsx) | Timeline Vertical V2 | Two-sided vertical timeline v2 with alternating cards. |
| [`feed-masonry`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/feed-masonry.tsx) | Feed Masonry | Masonry feed of mixed-height content cards. |
| [`inbox-list`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/inbox-list.tsx) | Inbox List | Email inbox list: unread dots, senders, stars, subject previews. |
| [`notification-feed`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/notification-feed.tsx) | Notification Feed | Full-page notification feed with type icons and read states. |
| [`activity-v2`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/activity-v2.tsx) | Activity V2 | Filterable activity feed v2 with action badges and avatars. |
| [`rank-list`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/rank-list.tsx) | Rank List | Ranked list with drag-to-reorder and score readouts. |
| [`table-summary`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/table-summary.tsx) | Table Summary | Table footer summary rows with bolded totals in dashed frame. |
| [`empty-col-span`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/empty-col-span.tsx) | Empty Col Span | Empty table cell placeholder with floating icon animation. |
| [`row-expand`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/row-expand.tsx) | Row Expand | Expandable row detail panels with height animation. |
| [`mention-list`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/mention-list.tsx) | Mention List | @mention suggestion panel with avatars and keyboard highlight. |
| [`dm-thread`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/dm-thread.tsx) | Dm Thread | Direct message thread: header with presence, bubbles, input. |
| [`poll`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/poll.tsx) | Poll | Interactive poll with animated result bars and vote confirmation. |
| [`quiz-card`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/quiz-card.tsx) | Quiz Card | Mini quiz card with options and correct/incorrect feedback. |
| [`bio-card`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/bio-card.tsx) | Bio Card | Bio card with social link icons and follow action. |
| [`mention-highlight`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/mention-highlight.tsx) | Mention Highlight | Highlight @mentions and #hashtags inside running text. |
| [`badge-list`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/badge-list.tsx) | Badge List | Achievement badge grid with earned/locked states and shine sweep. |
| [`gift-message`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/gift-message.tsx) | Gift Message | Gift message card with ribbon wiggle and open animation. |
| [`voice-note-list`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/voice-note-list.tsx) | Voice Note List | Voice note list: play buttons, waveforms, durations. |
| [`price-compare`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/price-compare.tsx) | Price Compare | Price comparison table across sellers with best-offer highlight. |
| [`cart-badge`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/cart-badge.tsx) | Cart Badge | Cart count badge that pulses on item add. |
| [`order-tracking`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/order-tracking.tsx) | Order Tracking | Order tracking strip: status dots with dates and courier. |
| [`refund-card`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/refund-card.tsx) | Refund Card | Refund status card with amount and reason. |
| [`wallet-card`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/wallet-card.tsx) | Wallet Card | Wallet balance card with top-up and mini transactions. |
| [`crypto-ticker`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/crypto-ticker.tsx) | Crypto Ticker | Crypto price ticker with animated up/down arrows. |
| [`budget-progress`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/budget-progress.tsx) | Budget Progress | Budget spending bar with category breakdown and overrun warning. |
| [`subscription-card`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/subscription-card.tsx) | Subscription Card | Subscription card: plan, renewal date, features, cancel. |
| [`gallery-grid`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/gallery-grid.tsx) | Gallery Grid | Image gallery grid with fullscreen lightbox and keyboard paging. |
| [`image-carousel`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/image-carousel.tsx) | Image Carousel | Image carousel with arrows, dots and swipe feel. |
| [`thumbnail-strip`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/thumbnail-strip.tsx) | Thumbnail Strip | Horizontal thumbnail strip with animated selection frame. |
| [`video-list`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/video-list.tsx) | Video List | Video results list: thumbnails, duration badges, channel names. |
| [`media-embed`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/media-embed.tsx) | Media Embed | Embedded media frame: 16:9, skeleton shimmer, dashed border. |
| [`poster-card`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/poster-card.tsx) | Poster Card | Event poster card with gradient overlay and date corner. |
| [`screenshot-frame`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/screenshot-frame.tsx) | Screenshot Frame | Browser-chrome screenshot frame with URL bar and controls. |
| [`quote-wall`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/quote-wall.tsx) | Quote Wall | Masonry quote wall built on Quote cards. |
| [`glossary-list`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/glossary-list.tsx) | Glossary List | Glossary list with letter index tabs and term definitions. |
| [`changelog-list`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/changelog-list.tsx) | Changelog List | Changelog list: version badges, added/fixed/breaking sections. |
| [`recipe-card`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/recipe-card.tsx) | Recipe Card | Recipe card: ingredients/steps tabs, time and servings. |
| [`markdown-preview`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/markdown-preview.tsx) | Markdown Preview | Standalone markdown renderer: headings, lists, code, links, bold. |
| [`html-preview`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/html-preview.tsx) | Html Preview | Sandboxed HTML preview frame. |
| [`color-token-table`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/color-token-table.tsx) | Color Token Table | Theme token table: swatch, value, copy action. |
| [`snippet-card`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/snippet-card.tsx) | Snippet Card | Code snippet card with language badge and copy button. |
| [`console-panel`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/console-panel.tsx) | Console Panel | Console panel: colored output lines, input row, autoscroll. |
| [`world-map`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/world-map.tsx) | World Map | Stylized world map grid with region value intensity and hover readout. |
| [`bubble-chart`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/bubble-chart.tsx) | Bubble Chart | Bubble chart with size-coded circles and hover magnify. |
| [`word-cloud`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/word-cloud.tsx) | Word Cloud | Word cloud with weight-based font sizing and hover accent. |
| [`network-graph`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/network-graph.tsx) | Network Graph | Node-edge network graph with bezier links and hover highlight. |
| [`sunburst-chart`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/sunburst-chart.tsx) | Sunburst Chart | Two-ring sunburst chart with segment hover dimming. |
| [`lottery-machine`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/lottery-machine.tsx) | Lottery Machine | Lottery machine with shaking ball cage and stamped number results. |
| [`vending-machine`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/vending-machine.tsx) | Vending Machine | Vending machine with product grid, coin slot and drop animation. |
| [`arcade-cabinet`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/arcade-cabinet.tsx) | Arcade Cabinet | Retro arcade cabinet with scanline screen, joystick and coin slot. |
| [`punch-clock`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/punch-clock.tsx) | Punch Clock | Punch clock with live digital time and in/out stamp feed. |
| [`mailbox`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/mailbox.tsx) | Mailbox | Mailbox with flag raise and letter send animation. |
| [`safe-vault`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/safe-vault.tsx) | Safe Vault | Safe vault with dial animation, code entry and open reveal. |
| [`medal-display`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/medal-display.tsx) | Medal Display | Medal board with gold/silver/bronze tiers and shine sweep. |
| [`trophy-shelf`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/trophy-shelf.tsx) | Trophy Shelf | Trophy shelf with earned/empty slots and drop-in animation. |
| [`megaphone`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/megaphone.tsx) | Megaphone | Announcement megaphone with animated sound waves. |
| [`score-keeper`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/score-keeper.tsx) | Score Keeper | Two-team score keeper with pulse on score change. |
| [`match-ticker`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/match-ticker.tsx) | Match Ticker | Live match ticker with scrolling scores and LIVE badges. |
| [`pool-table`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/pool-table.tsx) | Pool Table | Pool ball grid organizer with striped/solid ball rendering. |
| [`revolving-door`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/revolving-door.tsx) | Revolving Door | Revolving door with rotating panels. |
| [`ferris-wheel`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/ferris-wheel.tsx) | Ferris Wheel | Ferris wheel with rotating cabins. |
| [`carousel-ride`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/carousel-ride.tsx) | Carousel Ride | Carousel ride with circling horses. |
</details>
<details>
<summary><strong>Feedback</strong> — notices, hints and interruptions</summary>

| File | Component | Description |
|---|---|---|
| [`file-upload-list`](https://bigbullui.vercel.app/docs/file-upload-list) | File Upload List | Multi-file upload manager queue with individual file progress percentage bars, file size formatting (KB/MB), file type badges, cancel/retry/remove buttons, and overall upload count status. |
| [`alert`](https://bigbullui.vercel.app/docs/alert) | Alert | Notice box with tone bar and status eyebrow. |
| [`tooltip`](https://bigbullui.vercel.app/docs/tooltip) | Tooltip | Floating helper tooltip on hover and keyboard focus. |
| [`dialog`](https://bigbullui.vercel.app/docs/dialog) | Dialog | Accessible modal dialog with focus trap and scale animation. |
| [`toast`](https://bigbullui.vercel.app/docs/toast) | Toast | Transient stacked notices with auto-dismiss. |
| [`sheet`](https://bigbullui.vercel.app/docs/sheet) | Sheet | Slide-over drawer panel with focus trap and scroll lock. |
| [`popover`](https://bigbullui.vercel.app/docs/popover) | Popover | Floating content panel anchored to an interactive trigger. |
| [`empty`](https://bigbullui.vercel.app/docs/empty) | Empty | Perforated placeholder box for zero-state views. |
| [`spinner`](https://bigbullui.vercel.app/docs/spinner) | Spinner | Rotary loading indicator with dashed track and stamp accent. |
| [`skeleton`](https://bigbullui.vercel.app/docs/skeleton) | Skeleton | Dashed placeholder box with gentle pulse animation. |
| [`cookie-banner`](https://bigbullui.vercel.app/docs/cookie-banner) | Cookie Banner | Fixed privacy consent banner with accept and decline actions. |
| [`confetti-burst`](https://bigbullui.vercel.app/docs/confetti-burst) | Confetti Burst | CSS celebration burst with stamp-colored pieces flying outward. |
| [`tour`](https://bigbullui.vercel.app/docs/tour) | Tour | Interactive step-by-step guided onboarding card with progress indicators. |
| [`hover-card`](https://bigbullui.vercel.app/docs/hover-card) | Hover Card | Popover preview on hover and focus with configurable delays and alignment. |
| [`drawer`](https://bigbullui.vercel.app/docs/drawer) | Drawer | Bottom slide-up drawer with pull handle, backdrop blur, and focus trap. |
| [`announcement-bar`](https://bigbullui.vercel.app/docs/announcement-bar) | Announcement Bar | Festival alert and headline announcement ribbon bar with perforated top/bottom tear lines, countdown urgency badge, action CTA button, and dismiss action. |
| [`callout`](https://bigbullui.vercel.app/docs/callout) | Callout | Dismissible notice box with tone variants. |

| [`skeleton-v2`](https://bigbullui.vercel.app/docs/skeleton-v2) | Skeleton V2 | Shimmer sweep skeleton with text-line and card composition presets. |
| [`alert-dialog`](https://bigbullui.vercel.app/docs/alert-dialog) | Alert Dialog | Confirm/cancel modal with destructive variant for irreversible actions, Escape/backdrop close, and animated content. |
| [`confirm-dialog`](https://bigbullui.vercel.app/docs/confirm-dialog) | ConfirmDialog | Self-contained confirm dialog with focus trap and stamp entrance for confirm button in destructive mode. |
| [`result`](https://bigbullui.vercel.app/docs/result) | Result | Full-panel status screen with icon circle, title, description, and actions slot; confetti-ish subtle burst on success. |
| [`loading-dots`](https://bigbullui.vercel.app/docs/loading-dots) | LoadingDots | Three dots bounce in sequence with keyframe animation; sizes sm/md/lg and tone prop. |
| [`loading-overlay`](https://bigbullui.vercel.app/docs/loading-overlay) | LoadingOverlay | Absolute/fixed veil with backdrop blur and spinner; fade in/out with opacity transition. |
| [`notification-center`](https://bigbullui.vercel.app/docs/notification-center) | NotificationCenter | Bell button with unread badge + dropdown panel with notification rows, mark-all-read, empty state. |
| [`spotlight`](https://bigbullui.vercel.app/docs/spotlight) | Spotlight | Full-viewport dim overlay with cutout hole positioned via target ref/bounding box; pulse ring around target; caption card. |
| [`coach-mark`](https://bigbullui.vercel.app/docs/coach-mark) | CoachMark | Single floating tip bubble anchored to trigger children with arrow, title, body, dismiss; pop-in with springy scale. |
| [`cart-drawer`](https://bigbullui.vercel.app/docs/cart-drawer) | Cart Drawer | Slide-over cart drawer with quantity controls and animated removal. |
| [`reaction-bar`](https://bigbullui.vercel.app/docs/reaction-bar) | ReactionBar | Emoji buttons with counts, active reaction pops, and hover tooltips. |
| [`like-button`](https://bigbullui.vercel.app/docs/like-button) | LikeButton | Heart/thumb button that fills on click with burst particle animation and count increment. |
| [`now-serving`](https://bigbullui.vercel.app/docs/now-serving) | NowServing | Split-flap style NOW SERVING board whose digits flip on value change with a blinking chime dot. |
| [`session-list`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/session-list.tsx) | Session List | Active session manager: device icons, location, revoke buttons. |
| [`danger-zone`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/danger-zone.tsx) | Danger Zone | Red-framed destructive actions area with two-step confirm. |
| [`invite-modal`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/invite-modal.tsx) | Invite Modal | Invite modal with email, role radio group and sent confirmation. |
| [`upgrade-prompt`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/upgrade-prompt.tsx) | Upgrade Prompt | Upgrade call-to-action card with shine sweep, feature list and dismiss. |
| [`maintenance-banner`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/maintenance-banner.tsx) | Maintenance Banner | Maintenance notification bar with countdown chip and dismiss. |
| [`offline-banner`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/offline-banner.tsx) | Offline Banner | Offline banner listening to navigator.onLine with reconnecting state. |
| [`error-page`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/error-page.tsx) | Error Page | 404/500/403 full-page layout with stamped code and return action. |
| [`permission-denied`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/permission-denied.tsx) | Permission Denied | Access denied panel with lock icon and request-access flow. |
| [`save-indicator`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/save-indicator.tsx) | Save Indicator | Auto-save status chip: idle, saving, saved, error states. |
| [`connection-status`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/connection-status.tsx) | Connection Status | Connection badge with pinging dot and optional latency readout. |
| [`sync-status`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/sync-status.tsx) | Sync Status | Sync status chip with spinning icon and last-sync timestamp. |
| [`migration-banner`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/migration-banner.tsx) | Migration Banner | Data migration banner with progress bar and expandable detail. |
| [`rate-limit-note`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/rate-limit-note.tsx) | Rate Limit Note | Rate limit notice with countdown timer. |
| [`stock-status`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/stock-status.tsx) | Stock Status | Stock status badge: in stock, low stock pulse, sold out. |
| [`char-counter`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/char-counter.tsx) | Char Counter | Character counter with near-limit and over-limit states. |
| [`ticket-validator`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/ticket-validator.tsx) | Ticket Validator | Ticket validator device with blinking green/red result light. |
</details>

<details>
<summary><strong>Navigation</strong> — ways to move between views</summary>

| File | Component | Description |
|---|---|---|
| [`tabs`](https://bigbullui.vercel.app/docs/tabs) | Tabs | Segmented panel switch with roving keyboard focus. |
| [`accordion`](https://bigbullui.vercel.app/docs/accordion) | Accordion | Collapsible disclosure items with smooth height transitions. |
| [`pagination`](https://bigbullui.vercel.app/docs/pagination) | Pagination | Numbered buttons with ellipsis and page stepping. |
| [`breadcrumb`](https://bigbullui.vercel.app/docs/breadcrumb) | Breadcrumb | Hierarchical trail with slash separators. |
| [`steps`](https://bigbullui.vercel.app/docs/steps) | Steps | Data-driven wizard progression with numbered stamps. |
| [`toggle-group`](https://bigbullui.vercel.app/docs/toggle-group) | Toggle Group | Single-choice segmented control with roving tabindex. |
| [`dropdown-menu`](https://bigbullui.vercel.app/docs/dropdown-menu) | Dropdown Menu | Popup actions menu with keyboard shortcuts and items. |
| [`countdown`](https://bigbullui.vercel.app/docs/countdown) | Countdown | Live ticking event timer with segmented cards. |
| [`command-palette`](https://bigbullui.vercel.app/docs/command-palette) | Command Palette | Modal search command palette with keyboard shortcuts, categorization, and filter. |
| [`context-menu`](https://bigbullui.vercel.app/docs/context-menu) | Context Menu | Right-click menu with smooth reveal, shortcuts, and dashed divider. |
| [`scroll-top`](https://bigbullui.vercel.app/docs/scroll-top) | Scroll Top | Floating elevator button that scrolls smoothly to page top. |
| [`menubar`](https://bigbullui.vercel.app/docs/menubar) | Menubar | Theater box office menu bar with dropdown menus, shortcuts, and dashed frames. |
| [`navbar`](https://bigbullui.vercel.app/docs/navbar) | Navbar | Navigation bar with brand monogram and active links. |
| [`tree-nav`](https://bigbullui.vercel.app/docs/tree-nav) | Tree Nav | Hierarchical explorer with collapsible nodes and icons. |
| [`sidebar`](https://bigbullui.vercel.app/docs/sidebar) | Sidebar | Collapsible navigation sidebar drawer with notch cutouts. |
| [`breadcrumb-dropdown`](https://bigbullui.vercel.app/docs/breadcrumb-dropdown) | Breadcrumb Dropdown | Hierarchical route breadcrumb with popover dropdown for intermediate tiers. |
| [`dock`](https://bigbullui.vercel.app/docs/dock) | Dock | Floating application dock bar with hover magnification and active indicators. |

| [`carousel`](https://bigbullui.vercel.app/docs/carousel) | Carousel | Sliding track carousel with prev/next arrows, dot indicators, keyboard arrows, and optional autoplay. |
| [`navigation-menu`](https://bigbullui.vercel.app/docs/navigation-menu) | Navigation Menu | Horizontal nav bar whose items reveal an animated panel below with height/fade reveal and sliding indicator. |
| [`dropdown-menu-v2`](https://bigbullui.vercel.app/docs/dropdown-menu-v2) | Dropdown Menu V2 | V2 dropdown menu: nested submenus, checkbox items, radio groups, separators, danger items, and shortcut kbd hints. |
| [`footer`](https://bigbullui.vercel.app/docs/footer) | Footer | Site footer with brand monogram, staggered link columns and dashed-top bottom bar. |
| [`faq`](https://bigbullui.vercel.app/docs/faq) | Faq | Self-contained accordion Q&A with one-open behavior, grid-rows height reveal and rotating plus icon. |
| [`fab`](https://bigbullui.vercel.app/docs/fab) | Fab | Floating action button fixed in corner with hover growth, ripple press, and tooltip label on hover. |
| [`speed-dial`](https://bigbullui.vercel.app/docs/speed-dial) | SpeedDial | FAB that fans out mini action buttons in an arc with staggered scale-in when open; Escape closes. |
| [`share-menu`](https://bigbullui.vercel.app/docs/share-menu) | ShareMenu | Platform icon row (X, Facebook, LinkedIn, Link) with copy link feedback and stamp stamp. |
| [`tabbar`](https://bigbullui.vercel.app/docs/tabbar) | TabBar | Fixed bottom navigation bar with sliding active indicator pill and badge support |
| [`pager-dots`](https://bigbullui.vercel.app/docs/pager-dots) | PagerDots | Navigation page indicators with active dot that stretches and variant styles |
| [`app-shell`](https://bigbullui.vercel.app/docs/app-shell) | AppShell | Page skeleton with top bar, collapsible sidebar, and main content area with built-in skip-link |
| [`skip-link`](https://bigbullui.vercel.app/docs/skip-link) | SkipLink | Accessibility skip-link that becomes visible on keyboard focus with translate animation |
| [`back-link`](https://bigbullui.vercel.app/docs/back-link) | BackLink | Chevron button with label that slides on hover, with focus ring |
| [`flyout-menu`](https://bigbullui.vercel.app/docs/flyout-menu) | FlyoutMenu | Hover dropdown menu with scale-in origin-top panel and keyboard navigation |
| [`scroll-spy-nav`](https://bigbullui.vercel.app/docs/scroll-spy-nav) | ScrollSpyNav | Horizontal sticky navigation with active pill that slides under the active section, smooth scroll with reduced-motion fallback |
| [`admin-shell`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/admin-shell.tsx) | Admin Shell | Admin panel skeleton: collapsible sidebar nav, top bar, content area. |
| [`footer-minimal`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/footer-minimal.tsx) | Footer Minimal | Single-row minimal footer: brand, links, copyright. |
| [`responsive-nav`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/responsive-nav.tsx) | Responsive Nav | Auto-switching nav: desktop horizontal links, mobile hamburger panel. |
| [`keyboard-nav-helper`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/keyboard-nav-helper.tsx) | Keyboard Nav Helper | Keyboard shortcut overlay opened with the ? key. |
| [`column-toggle`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/column-toggle.tsx) | Column Toggle | Column show/hide dropdown menu for data grids. |
| [`wizard`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/wizard.tsx) | Wizard | Multi-step wizard with validation shake, progress markers and summary. |
| [`stepper-v2`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/stepper-v2.tsx) | Stepper V2 | Vertical/horizontal stepper v2 with descriptions and done states. |
| [`mega-menu`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/mega-menu.tsx) | Mega Menu | Full-width mega menu with columns, links and featured box. |
| [`drawer-nav`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/drawer-nav.tsx) | Drawer Nav | Mobile hamburger drawer sliding from the left with staggered links. |
| [`footer-nav`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/footer-nav.tsx) | Footer Nav | Site-map footer with link columns. |
| [`anchor-nav`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/anchor-nav.tsx) | Anchor Nav | Sticky section anchor nav with IntersectionObserver spy. |
| [`quick-actions`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/quick-actions.tsx) | Quick Actions | Quick action toolbar with shortcuts and danger variants. |
| [`history-nav`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/history-nav.tsx) | History Nav | Back/forward history strip with breadcrumb entries. |
| [`page-tabs`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/page-tabs.tsx) | Page Tabs | In-page tabs synced to URL query parameter. |
| [`mobile-menu`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/mobile-menu.tsx) | Mobile Menu | Full-screen mobile menu with staggered link entrance. |
| [`sidebar-v2`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/sidebar-v2.tsx) | Sidebar V2 | Two-level collapsible sidebar v2. |
| [`flyout-v2`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/flyout-v2.tsx) | Flyout V2 | Hover flyout menu v2 with keyboard support. |
| [`scroll-spy-v2`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/scroll-spy-v2.tsx) | Scroll Spy V2 | Horizontal scroll-spy nav v2 with sliding active pill. |
| [`pagination-v2`](https://github.com/F0Rextasy/bigbullui/blob/main/src/components/ui/pagination-v2.tsx) | Pagination V2 | Hybrid pagination: numbered plus infinite scroll trigger. |
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
