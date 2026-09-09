
<div align="center">
  <img src="https://ui.bigbullapp.com/logo.svg" alt="bigbullui logo" width="96" />
</div>

# bigbullui

> 659 tactile, copy-paste React 19 + Tailwind CSS 4 components you own. Zero external dependencies. Open source, MIT licensed.

[![npm version](https://badge.fury.io/js/bigbullui.svg)](https://www.npmjs.com/package/bigbullui)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/F0Rextasy/bigbullui/blob/main/LICENSE)
[![React 19](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8.svg)](https://tailwindcss.com)
[![Zero Dependencies](https://img.shields.io/badge/dependencies-0-success.svg)](https://github.com/F0Rextasy/bigbullui)
[![CI](https://github.com/F0Rextasy/bigbullui/actions/workflows/ci.yml/badge.svg)](https://github.com/F0Rextasy/bigbullui/actions/workflows/ci.yml)
[![publint](https://img.shields.io/badge/publint-clean-success.svg)](https://publint.dev)
[![attw](https://img.shields.io/badge/attw-type--safe-success.svg)](https://arethetypeswrong.github.io)

## Features

- **Zero 3rd-Party Dependencies** — UI files import ONLY React and a 7-line `cn` utility. No Radix or Lucide bloat.
- **Code You Own** — Run the CLI or copy source files directly into your codebase. No black-box npm lock-in.
- **Tailwind CSS v4 Native** — Driven entirely by CSS variables and `@theme inline` with warm cream paper and night stub themes.
- **Accessible by Default** — Full WAI-ARIA support, keyboard roving tabindex, focus rings, and `prefers-reduced-motion` fallbacks.
- **659 Crafted Components** — From foundational form controls and data tables to rich charts and retro interactive widgets.

## Quick Start (CLI — Recommended)

Initialize bigbullui in your project:

```bash
npx bigbullui init
```

Add any component directly to your project:

```bash
npx bigbullui add button card dialog metric-card
```

Works with the shadcn CLI too — every component is published as registry JSON:

```bash
npx shadcn@latest add https://ui.bigbullapp.com/r/button.json
# Full page blocks work too (block source + its components bundled):
npx shadcn@latest add https://ui.bigbullapp.com/r/admin-overview.json
```

Works with AI coding assistants via MCP (zero backend — runs locally):

```bash
claude mcp add bigbullui -- npx -y bigbullui mcp
```

Use immediately in your views:

```tsx
import { Button } from "@/components/ui/button";

export function Example() {
  return <Button>Get Started</Button>;
}
```

---

### Alternative: All-in-One npm Package

```bash
npm install bigbullui
```

Add the design tokens to your global CSS:

```css
@import "tailwindcss";
@import "bigbullui/css";
/* Optional: Windows High Contrast / forced-colors support */
/* @import "bigbullui/high-contrast.css"; */
```

Import and use:

```tsx
import { Button, Card, MetricCard } from "bigbullui";
```

### Companion: bigbullicons (1023 Ticket Stub stroke icons)

```bash
npm install bigbullicons
```

```tsx
import { StampIcon } from "bigbullicons";

export function Example() {
  return <StampIcon name="ticket" size={20} />;
}
```

Browse every icon with live animated previews at [ui.bigbullapp.com/icons](https://ui.bigbullapp.com/icons) — or pull a single icon into any project with `npx bigbullui add icon-ticket`.

### Manual Copy-Paste Alternative

No install needed. Copy files from [`src/components/ui/`](https://github.com/F0Rextasy/bigbullui/tree/main/src/components/ui) (plus the `cn` helper at `src/components/ui/lib/utils.ts`) into your project, copy the token CSS from [`bigbullui.css`](https://github.com/F0Rextasy/bigbullui/blob/main/bigbullui.css) — done.

## Components

<details>
<summary><strong>Form</strong> — inputs, pickers, toggles and controls</summary>

| File | Component | Description |
|---|---|---|
| [`button`](https://ui.bigbullapp.com/docs/button) | Button | Animated button with hover feedback and crisp focus. |
| [`input`](https://ui.bigbullapp.com/docs/input) | Input | Text input with dashed focus border and design tokens. |
| [`textarea`](https://ui.bigbullapp.com/docs/textarea) | Textarea | Multi-line text area matching Input styling. |
| [`checkbox`](https://ui.bigbullapp.com/docs/checkbox) | Checkbox | Crisp checkbox with bold checked states. |
| [`switch`](https://ui.bigbullapp.com/docs/switch) | Switch | Two-state toggle switch with sliding thumb. |
| [`radio-group`](https://ui.bigbullapp.com/docs/radio-group) | Radio Group | Accessible single-select radio button set. |
| [`slider`](https://ui.bigbullapp.com/docs/slider) | Slider | Draggable value slider with chunky thumb. |
| [`select`](https://ui.bigbullapp.com/docs/select) | Select | Custom dashed listbox dropdown with keyboard navigation. |
| [`stepper`](https://ui.bigbullapp.com/docs/stepper) | Stepper | Increment and decrement buttons with mono readout. |
| [`pin-input`](https://ui.bigbullapp.com/docs/pin-input) | Pin Input | Segmented single-character boxes for codes and OTP. |
| [`rating`](https://ui.bigbullapp.com/docs/rating) | Rating | Interactive star rating with live hover preview. |
| [`copy-button`](https://ui.bigbullapp.com/docs/copy-button) | Copy Button | Tactile button with clipboard feedback and check state. |
| [`search-bar`](https://ui.bigbullapp.com/docs/search-bar) | Search Bar | Dashed search field with shortcut keycap and clear action. |
| [`combobox`](https://ui.bigbullapp.com/docs/combobox) | Combobox | Filterable searchable dropdown with instant keyboard filter. |
| [`file-dropzone`](https://ui.bigbullapp.com/docs/file-dropzone) | File Dropzone | Drag-and-drop upload zone with dashed borders and file preview. |
| [`color-picker`](https://ui.bigbullapp.com/docs/color-picker) | Color Picker | Palette swatch picker with framing and active mark. |
| [`password-strength`](https://ui.bigbullapp.com/docs/password-strength) | Password Strength | Segmented security verification meter with animated strength bars and criteria checklist. |
| [`inline-edit`](https://ui.bigbullapp.com/docs/inline-edit) | Inline Edit | Click-to-edit field with focus outline, animated save pulse, and cancel action. |
| [`time-input`](https://ui.bigbullapp.com/docs/time-input) | Time Input | Curtain call showtime selector with hours, minutes, and AM/PM stepper. |
| [`masked-input`](https://ui.bigbullapp.com/docs/masked-input) | Masked Input | Formatted code field with auto-formatted delimiters and validation mark. |
| [`date-picker`](https://ui.bigbullapp.com/docs/date-picker) | Date Picker | Date picker input with popover calendar and quick date selection. |
| [`dual-slider`](https://ui.bigbullapp.com/docs/dual-slider) | Dual Slider | Price range selector with minimum and maximum draggable handles. |
| [`autocomplete`](https://ui.bigbullapp.com/docs/autocomplete) | Autocomplete | Typeahead search input with instant suggestions and keyboard select. |
| [`tree-select`](https://ui.bigbullapp.com/docs/tree-select) | Tree Select | Hierarchical seating dropdown selector with expandable zone nodes. |
| [`masked-currency`](https://ui.bigbullapp.com/docs/masked-currency) | Masked Currency | Formatted currency price input with prefix badge and numeric mask. |
| [`segmented-switch`](https://ui.bigbullapp.com/docs/segmented-switch) | Segmented Switch | Mechanical multi-option lever switch with smooth slide carriage. |
| [`signature-pad`](https://ui.bigbullapp.com/docs/signature-pad) | Signature Pad | Interactive canvas endorsement pad with clear action and receipt stamp. |
| [`tag-input`](https://ui.bigbullapp.com/docs/tag-input) | Tag Input | Tag input with pill chip badges, remove buttons, backspace deletion, and dashed container. |
| [`calendar`](https://ui.bigbullapp.com/docs/calendar) | Calendar | Month calendar with date selection, month navigation, and today indicator. |
| [`file-upload-list`](https://ui.bigbullapp.com/docs/file-upload-list) | File Upload List | Multi-file upload manager queue with individual file progress percentage bars, file size formatting (KB/MB), file type badges, cancel/retry/remove buttons, and overall upload count status. |
| [`toggle-group`](https://ui.bigbullapp.com/docs/toggle-group) | Toggle Group | Single-choice segmented control with roving tabindex. |
| [`dropdown-menu`](https://ui.bigbullapp.com/docs/dropdown-menu) | Dropdown Menu | Popup actions menu with keyboard shortcuts and items. |
| [`label`](https://ui.bigbullapp.com/docs/label) | Label | Form label with mono uppercase styling and an animated stamp-red asterisk when required. |
| [`form-field`](https://ui.bigbullapp.com/docs/form-field) | Form Field | Field wrapper with label, control, description, and error message with a shake-in animation on error. |
| [`field`](https://ui.bigbullapp.com/docs/field) | Field | Composable field primitives: Field, FieldLabel, FieldControl, FieldDescription, FieldError, FieldGroup, FieldSet. |
| [`toggle`](https://ui.bigbullapp.com/docs/toggle) | Toggle | Two-state button with aria-pressed, springy press animation, and default/outline/accent variants. |
| [`multi-select`](https://ui.bigbullapp.com/docs/multi-select) | Multi Select | Trigger + popover picker with search input, checkbox options, and animated removable selection chips. |
| [`input-group`](https://ui.bigbullapp.com/docs/input-group) | Input Group | Input with prefix icon slot, suffix slot, and inner action button; dashed focus ring and animated underline sweep. |
| [`button-group`](https://ui.bigbullapp.com/docs/button-group) | Button Group | Joins buttons with rounded outer corners, internal separators, and sliding hover highlight. |
| [`loading-button`](https://ui.bigbullapp.com/docs/loading-button) | Loading Button | Button with loading spinner swap, width locking to avoid jumps, and a brief success check-mark stamp. |
| [`checkbox-group`](https://ui.bigbullapp.com/docs/checkbox-group) | Checkbox Group | Checkbox options with a select-all row (indeterminate state), animated check fills, and staggered entrance. |
| [`dropdown-menu-v2`](https://ui.bigbullapp.com/docs/dropdown-menu-v2) | Dropdown Menu V2 | V2 dropdown menu: nested submenus, checkbox items, radio groups, separators, danger items, and shortcut kbd hints. |
| [`fab`](https://ui.bigbullapp.com/docs/fab) | Fab | Floating action button fixed in corner with hover growth, ripple press, and tooltip label on hover. |
| [`size-picker`](https://ui.bigbullapp.com/docs/size-picker) | Size Picker | Size chip picker with out-of-stock strikes and stock dots. |
| [`variant-picker`](https://ui.bigbullapp.com/docs/variant-picker) | Variant Picker | Color swatch and size variant picker with animated selection. |
| [`wishlist-button`](https://ui.bigbullapp.com/docs/wishlist-button) | Wishlist Button | Heart wishlist button with pop fill and floating burst. |
| [`add-to-cart-button`](https://ui.bigbullapp.com/docs/add-to-cart-button) | Add To Cart Button | Add-to-cart button with flying dot arc and check stamp. |
| [`like-button`](https://ui.bigbullapp.com/docs/like-button) | LikeButton | Heart/thumb button that fills on click with burst particle animation and count increment. |
| [`emoji-picker`](https://ui.bigbullapp.com/docs/emoji-picker) | EmojiPicker | Panel with category tabs (Smileys, Gestures, Hearts, Objects), search filter, and emoji grid with selection callback. |
| [`copy-chip`](https://ui.bigbullapp.com/docs/copy-chip) | CopyChip | Small mono chip that copies to clipboard with check morph and 'COPIED' feedback |
| [`phone-input`](https://ui.bigbullapp.com/docs/phone-input) | PhoneInput | Phone number input with country code selector and formatted display |
| [`email-input`](https://ui.bigbullapp.com/docs/email-input) | EmailInput | Email input with live validation and typo domain suggestions |
| [`date-range-picker`](https://ui.bigbullapp.com/docs/date-range-picker) | DateRangePicker | Two-month mini calendar grid for selecting start and end dates with nights count |
| [`month-picker`](https://ui.bigbullapp.com/docs/month-picker) | MonthPicker | 12-month grid for selecting a month with year navigation |
| [`year-picker`](https://ui.bigbullapp.com/docs/year-picker) | YearPicker | Year grid with page navigation for selecting a year |
| [`time-range-picker`](https://ui.bigbullapp.com/docs/time-range-picker) | TimeRangePicker | Two time inputs with duration readout that animates on change |
| [`clock-picker`](https://ui.bigbullapp.com/docs/clock-picker) | ClockPicker | Analog clock with draggable hands for time selection |
| [`hotkey-recorder`](https://ui.bigbullapp.com/docs/hotkey-recorder) | HotkeyRecorder | Record keyboard hotkey combinations with visual chip display |
| [`file-input`](https://ui.bigbullapp.com/docs/file-input) | FileInput | Styled file input with drop chips and selection count animation |
| [`slider-ticks`](https://ui.bigbullapp.com/docs/slider-ticks) | SliderTicks | Slider with tick marks, labels, and snap-to-ticks functionality |
| [`image-crop`](https://ui.bigbullapp.com/docs/image-crop) | Image Crop | Canvas-based image cropping with draggable crop rect, rule-of-thirds grid, resize handles, and dataURL output. |
| [`hooks`](https://ui.bigbullapp.com/docs/hooks) | Hooks | SSR-safe React hooks: media query, localStorage, intersection, click-outside, copy, hotkey, and debounce. |
| [`focus-trap`](https://ui.bigbullapp.com/docs/focus-trap) | Focus Trap | Pure TypeScript focus trapping helpers for accessible overlays: getFocusable and trapFocus. |
| [`login-form`](https://ui.bigbullapp.com/docs/login-form) | Login Form | Login form with live validation, show/hide password, remember me and social buttons. |
| [`register-form`](https://ui.bigbullapp.com/docs/register-form) | Register Form | Registration form with name, email, animated password strength and terms consent. |
| [`forgot-password`](https://ui.bigbullapp.com/docs/forgot-password) | Forgot Password | Password reset flow: email input transitions to animated sent confirmation. |
| [`otp-verify`](https://ui.bigbullapp.com/docs/otp-verify) | Otp Verify | 6-digit OTP verification with auto-advance, paste support and resend countdown. |
| [`two-factor`](https://ui.bigbullapp.com/docs/two-factor) | Two Factor | 2FA setup panel with animated QR scan line, recovery codes and copy action. |
| [`form-progress`](https://ui.bigbullapp.com/docs/form-progress) | Form Progress | Form completion progress with segmented dashed bars. |
| [`stepper-v2`](https://ui.bigbullapp.com/docs/stepper-v2) | Stepper V2 | Vertical/horizontal stepper v2 with descriptions and done states. |
| [`search-filter-bar`](https://ui.bigbullapp.com/docs/search-filter-bar) | Search Filter Bar | Combined search, sort and filter toolbar with animated chips. |
| [`avatar-upload`](https://ui.bigbullapp.com/docs/avatar-upload) | Avatar Upload | Avatar upload circle with hover camera overlay and preview. |
| [`shipping-options`](https://ui.bigbullapp.com/docs/shipping-options) | Shipping Options | Shipping option radio cards with carrier, duration and price. |
| [`payment-methods`](https://ui.bigbullapp.com/docs/payment-methods) | Payment Methods | Payment method selector with card, bank, cash, wallet icons. |
| [`credit-card-form`](https://ui.bigbullapp.com/docs/credit-card-form) | Credit Card Form | Credit card form with live number formatting and expiry mask. |
| [`installment-picker`](https://ui.bigbullapp.com/docs/installment-picker) | Installment Picker | Installment plan picker: months, monthly amount, total. |
| [`coupon-field`](https://ui.bigbullapp.com/docs/coupon-field) | Coupon Field | Coupon code field with validation, success check and shake error. |
| [`checkbox-card`](https://ui.bigbullapp.com/docs/checkbox-card) | Checkbox Card | Card-style checkbox with title, description and check pop. |
| [`radio-tile`](https://ui.bigbullapp.com/docs/radio-tile) | Radio Tile | Radio tile with icon, description and sliding dot. |
| [`switch-card`](https://ui.bigbullapp.com/docs/switch-card) | Switch Card | Switch card combining title, description and toggle. |
| [`field-array`](https://ui.bigbullapp.com/docs/field-array) | Field Array | Dynamic form rows: add, remove, move up/down. |
| [`textarea-autosize`](https://ui.bigbullapp.com/docs/textarea-autosize) | Textarea Autosize | Auto-growing textarea with min/max height bounds. |
| [`char-counter`](https://ui.bigbullapp.com/docs/char-counter) | Char Counter | Character counter with near-limit and over-limit states. |
| [`password-input`](https://ui.bigbullapp.com/docs/password-input) | Password Input | Password input with animated show/hide eye toggle. |
| [`consent-checkbox`](https://ui.bigbullapp.com/docs/consent-checkbox) | Consent Checkbox | GDPR/KVKK consent checkbox with link and required marker. |
| [`address-form`](https://ui.bigbullapp.com/docs/address-form) | Address Form | Address form grid: street, city, district, postal, country. |
| [`currency-select`](https://ui.bigbullapp.com/docs/currency-select) | Currency Select | Currency select dropdown with symbols and codes. |
| [`country-select`](https://ui.bigbullapp.com/docs/country-select) | Country Select | Country select with flag emojis and codes. |
| [`duration-input`](https://ui.bigbullapp.com/docs/duration-input) | Duration Input | Duration input: hour/minute/second steppers. |
| [`serial-input`](https://ui.bigbullapp.com/docs/serial-input) | Serial Input | Serial number input: grouped boxes, auto-advance, paste support. |
| [`radio-cards`](https://ui.bigbullapp.com/docs/radio-cards) | Radio Cards | Rich selectable radio cards with prices, perks and active ticket border. |
| [`split-button`](https://ui.bigbullapp.com/docs/split-button) | Split Button | Dual-action button with primary click trigger and dropdown secondary actions. |
| [`combobox-v2`](https://ui.bigbullapp.com/docs/combobox-v2) | Combobox V2 | Async searchable combobox with debounced loading and infinite scroll. |
| [`select-v2`](https://ui.bigbullapp.com/docs/select-v2) | Select V2 | Grouped select with sticky headers and disabled options. |
| [`input-otp`](https://ui.bigbullapp.com/docs/input-otp) | Input OTP | Six-box one-time code with paste split and autocomplete. |
| [`form-validation`](https://ui.bigbullapp.com/docs/form-validation) | Form Validation | Schema-less validation hooks with rules and helpers. |
| [`language-select`](https://ui.bigbullapp.com/docs/language-select) | Language Select | Language picker with native names and codes. |
| [`timezone-select`](https://ui.bigbullapp.com/docs/timezone-select) | Timezone Select | IANA timezone picker with live UTC offsets. |
| [`number-input`](https://ui.bigbullapp.com/docs/number-input) | Number Input | Stepped numeric input with locale grouping and currency. |
| [`search-command`](https://ui.bigbullapp.com/docs/search-command) | Search Command | Inline search field with keyboard-navigated result panel. |
| [`slider-range-label`](https://ui.bigbullapp.com/docs/slider-range-label) | Slider Range Label | Dual-handle range slider with live min/max labels. |
| [`file-image-preview`](https://ui.bigbullapp.com/docs/file-image-preview) | File Image Preview | Image dropzone with thumbnail grid and remove. |
| [`input-mask-phone`](https://ui.bigbullapp.com/docs/input-mask-phone) | Input Mask Phone | Country-aware phone mask with completion counter. |
| [`date-time-picker`](https://ui.bigbullapp.com/docs/date-time-picker) | Date Time Picker | Combined date and time picker with live preview. |
| [`range-calendar`](https://ui.bigbullapp.com/docs/range-calendar) | Range Calendar | Month grid with range highlight and night counter. |
| [`inline-multiselect`](https://ui.bigbullapp.com/docs/inline-multiselect) | Inline Multiselect | Chips flow inside the input with backspace delete. |
| [`signature-line`](https://ui.bigbullapp.com/docs/signature-line) | Signature Line | Printable signature line with typed name. |
| [`stamp-field`](https://ui.bigbullapp.com/docs/stamp-field) | Stamp Field | Approval stamp box with name, date and seal. |
| [`credit-card-input`](https://ui.bigbullapp.com/docs/credit-card-input) | Credit Card Input | Smart card input with brand detect and grouping. |
| [`activity-calendar`](https://ui.bigbullapp.com/docs/activity-calendar) | Activity Calendar | GitHub-style contribution heatmap grid. |
| [`smart-search-bar`](https://ui.bigbullapp.com/docs/smart-search-bar) | Smart Search Bar | Shortcut search bar with filter and history. |
| [`star-rating-input`](https://ui.bigbullapp.com/docs/star-rating-input) | Star Rating Input | Hoverable five-star rating field with readout. |
| [`color-palette-picker`](https://ui.bigbullapp.com/docs/color-palette-picker) | Color Palette Picker | Preset palette swatches with hex readout. |
| [`pricing-slider`](https://ui.bigbullapp.com/docs/pricing-slider) | Pricing Slider | Seat slider with live tier cost math. |
| [`virtual-card-flipper`](https://ui.bigbullapp.com/docs/virtual-card-flipper) | Virtual Card Flipper | 3D flipping bank card with CVC back. |
| [`split-bill-calculator`](https://ui.bigbullapp.com/docs/split-bill-calculator) | Split Bill Calculator | Bill splitter with tip and per-person math. |
| [`recent-searches`](https://ui.bigbullapp.com/docs/recent-searches) | Recent Searches | History list with clear action. |
| [`trending-chips`](https://ui.bigbullapp.com/docs/trending-chips) | Trending Chips | Hot chip row with active stamp. |
| [`saved-searches`](https://ui.bigbullapp.com/docs/saved-searches) | Saved Searches | Named queries with run and delete. |
| [`mini-month`](https://ui.bigbullapp.com/docs/mini-month) | Mini Month | Compact calendar with today ring. |
| [`passkey-button`](https://ui.bigbullapp.com/docs/passkey-button) | Passkey Button | Passwordless sign in trigger. |
| [`magic-link`](https://ui.bigbullapp.com/docs/magic-link) | Magic Link | Email field with sent confirmation. |
| [`sso-row`](https://ui.bigbullapp.com/docs/sso-row) | Sso Row | Provider buttons with or divider. |
| [`devices-list`](https://ui.bigbullapp.com/docs/devices-list) | Devices List | Session rows with revoke action. |
| [`delete-account`](https://ui.bigbullapp.com/docs/delete-account) | Delete Account | Two-step typed confirmation zone. |
| [`onboarding-checklist`](https://ui.bigbullapp.com/docs/onboarding-checklist) | Onboarding Checklist | Stampable steps with progress rail. |
| [`invite-team`](https://ui.bigbullapp.com/docs/invite-team) | Invite Team | Email plus role picker with log. |
| [`sample-data`](https://ui.bigbullapp.com/docs/sample-data) | Sample Data | Demo seed loader with state stamp. |
| [`otp-v2`](https://ui.bigbullapp.com/docs/otp-v2) | Otp V2 | Segmented OTP with paste fill. |
| [`newsletter-box`](https://ui.bigbullapp.com/docs/newsletter-box) | Newsletter Box | Email capture with success stamp. |
| [`theme-preset-picker`](https://ui.bigbullapp.com/docs/theme-preset-picker) | Theme Preset Picker | Swatch preset cards. |
| [`form-builder`](https://ui.bigbullapp.com/docs/form-builder) | Form Builder | Add rename remove fields. |
| [`conditional-fields`](https://ui.bigbullapp.com/docs/conditional-fields) | Conditional Fields | Inputs by ticket type. |
| [`nps-survey`](https://ui.bigbullapp.com/docs/nps-survey) | Nps Survey | Zero to ten score buttons. |
| [`bug-report`](https://ui.bigbullapp.com/docs/bug-report) | Bug Report | Mini filing form with severity. |
</details>
<details>
<summary><strong>Display</strong> — surfaces, badges and data views</summary>

| File | Component | Description |
|---|---|---|
| [`mention-input`](https://ui.bigbullapp.com/docs/mention-input) | Mention Input | Mention input with instant @ autocomplete popover. |
| [`transfer-list`](https://ui.bigbullapp.com/docs/transfer-list) | Transfer List | Two-column transfer list between available and claimed items. |
| [`theme-toggle`](https://ui.bigbullapp.com/docs/theme-toggle) | Theme Toggle | Theme switcher with day and night flip animation. |
| [`seat-map`](https://ui.bigbullapp.com/docs/seat-map) | Seat Map | Interactive arena seating chart matrix grid with row letters, seat numbers, tier types, and price calculator. |
| [`keypad`](https://ui.bigbullapp.com/docs/keypad) | Keypad | Numeric PIN keypad with tactile mechanical keys, visual pulse, and masked PIN display. |
| [`ticket-card`](https://ui.bigbullapp.com/docs/ticket-card) | Ticket Card | Complete admission ticket with notched edges and seat details. |
| [`coupon`](https://ui.bigbullapp.com/docs/coupon) | Coupon | Discount coupon with scissor cutout lines and promo code copy. |
| [`boarding-pass`](https://ui.bigbullapp.com/docs/boarding-pass) | Boarding Pass | Flight pass with origin, destination and receipt section. |
| [`price-tag`](https://ui.bigbullapp.com/docs/price-tag) | Price Tag | Price tag with eyelet string hole and sale mark. |
| [`luggage-tag`](https://ui.bigbullapp.com/docs/luggage-tag) | Luggage Tag | Baggage claim tag with handle loop and destination code. |
| [`barcode`](https://ui.bigbullapp.com/docs/barcode) | Barcode | Dynamic SVG barcode with mono serial readout. |
| [`stamp-seal`](https://ui.bigbullapp.com/docs/stamp-seal) | Stamp Seal | Rotated rubber stamp badge with double dashed circular ring. |
| [`card`](https://ui.bigbullapp.com/docs/card) | Card | Double-frame surface container with header, content, and footer. |
| [`avatar`](https://ui.bigbullapp.com/docs/avatar) | Avatar | Initials or photo badge with dashed ring. |
| [`star`](https://ui.bigbullapp.com/docs/star) | Star | Current-color star glyph for ratings and counts. |
| [`table`](https://ui.bigbullapp.com/docs/table) | Table | Data table with dashed row dividers and mono headers. |
| [`marquee`](https://ui.bigbullapp.com/docs/marquee) | Marquee | Smooth ticker reel that pauses on hover. |
| [`timeline`](https://ui.bigbullapp.com/docs/timeline) | Timeline | Vertical chronological events with dashed connection stem. |
| [`sparkline`](https://ui.bigbullapp.com/docs/sparkline) | Sparkline | Lightweight SVG trend sparkline with animated end-point. |
| [`bar-chart`](https://ui.bigbullapp.com/docs/bar-chart) | Bar Chart | Mini data bar chart with dashed guideline grids and hover zoom. |
| [`data-table`](https://ui.bigbullapp.com/docs/data-table) | Data Table | Sortable, searchable data table with row selection and pagination. |
| [`video-frame`](https://ui.bigbullapp.com/docs/video-frame) | Video Frame | Cinema screening container with sprocket edges and play overlay. |
| [`audio-mini`](https://ui.bigbullapp.com/docs/audio-mini) | Audio Mini | Compact audio player with animated equalizer bars and duration counter. |
| [`lightbox`](https://ui.bigbullapp.com/docs/lightbox) | Lightbox | Fullscreen media viewer with film frame edges and image paging. |
| [`stack`](https://ui.bigbullapp.com/docs/stack) | Stack | Stacked container with staggered angles and hover fan-out. |
| [`container`](https://ui.bigbullapp.com/docs/container) | Container | Centered layout wrapper with notch cutouts. |
| [`kanban-lite`](https://ui.bigbullapp.com/docs/kanban-lite) | Kanban Lite | Queue and stage progression board with notch cards. |
| [`gantt-lite`](https://ui.bigbullapp.com/docs/gantt-lite) | Gantt Lite | Interactive festival and stage timetable schedule with animated now indicator. |
| [`stopwatch`](https://ui.bigbullapp.com/docs/stopwatch) | Stopwatch | Precision timer with lap tear-offs and digital readout. |
| [`countup`](https://ui.bigbullapp.com/docs/countup) | Countup | Mechanical turnstile odometer counter with animated tally and slot frames. |
| [`nfc-badge`](https://ui.bigbullapp.com/docs/nfc-badge) | NFC Badge | Contactless gate pass tap simulator with animated radio wave ripple pulse, status badge, lanyard notch, and admission chime. |
| [`qr-reader`](https://ui.bigbullapp.com/docs/qr-reader) | QR Reader | Turnstile simulated camera QR and barcode scanner viewfinder with animated laser sweep and targeting reticle. |
| [`audio-waveform`](https://ui.bigbullapp.com/docs/audio-waveform) | Audio Waveform | Interactive multi-bar audio wave visualizer for concert recordings with live animated frequency bars and timestamp readout. |
| [`ticket-fold`](https://ui.bigbullapp.com/docs/ticket-fold) | Ticket Fold | 3D accordion fold pass that unfolds with smooth perspective rotation and tear-away slip. |
| [`split-flap`](https://ui.bigbullapp.com/docs/split-flap) | Split Flap | Mechanical departure board with flipping characters and retro terminal styling. |
| [`watermark`](https://ui.bigbullapp.com/docs/watermark) | Watermark | Repeating watermark pattern with security angle. |
| [`turnstile-gate`](https://ui.bigbullapp.com/docs/turnstile-gate) | Turnstile Gate | Mechanical rotor barrier with pass counter, status LED, and push animation. |
| [`collapsible`](https://ui.bigbullapp.com/docs/collapsible) | Collapsible | Standalone expandable disclosure card with notch header, animated height reveal and status mark. |
| [`aspect-ratio`](https://ui.bigbullapp.com/docs/aspect-ratio) | Aspect Ratio | Proportional media container with preset ratios, framed border, and corner guides. |
| [`pricing-table`](https://ui.bigbullapp.com/docs/pricing-table) | Pricing Table | 3-tier matrix with billing switcher, highlighted plan and feature checklist. |
| [`metric-card`](https://ui.bigbullapp.com/docs/metric-card) | Metric Card | Dashboard KPI card with value, trend delta and period label. |
| [`code-block`](https://ui.bigbullapp.com/docs/code-block) | Code Block | Code snippet block with filename tab, language badge and copy button. |
| [`activity-feed`](https://ui.bigbullapp.com/docs/activity-feed) | Activity Feed | Universal user and team activity stream for deployments, invites, edits, and security audits with timeline avatars, action badges, relative timestamps, and event icons. |
| [`credit-card`](https://ui.bigbullapp.com/docs/credit-card) | Credit Card | Universal payment card visualizer with real-time card number formatting, brand badge detection (Visa, Mastercard, Amex), metallic EMV chip, and interactive 3D flip card to show CVV. |
| [`empty`](https://ui.bigbullapp.com/docs/empty) | Empty | Perforated placeholder box for zero-state views. |
| [`donut-chart`](https://ui.bigbullapp.com/docs/donut-chart) | Donut Chart | Interactive SVG donut and pie chart with segment hover highlight, tooltips, center total readout, and custom color legend. |
| [`accordion`](https://ui.bigbullapp.com/docs/accordion) | Accordion | Collapsible disclosure items with smooth height transitions. |
| [`countdown`](https://ui.bigbullapp.com/docs/countdown) | Countdown | Live ticking event timer with segmented cards. |
| [`carousel`](https://ui.bigbullapp.com/docs/carousel) | Carousel | Sliding track carousel with prev/next arrows, dot indicators, keyboard arrows, and optional autoplay. |
| [`avatar-group`](https://ui.bigbullapp.com/docs/avatar-group) | Avatar Group | Overlapping avatar stack with +N overflow chip that fans out on hover. |
| [`item`](https://ui.bigbullapp.com/docs/item) | Item | Generic row surface with leading media, title, description, and trailing actions; hover lift with accent bar slide-in. |
| [`listbox`](https://ui.bigbullapp.com/docs/listbox) | Listbox | Single/multi selectable list with keyboard navigation, ARIA roles, and check marks that slide in. |
| [`list`](https://ui.bigbullapp.com/docs/list) | List | List with dashed, numbered and icon variants plus staggered item entrances and List/ListItem composition. |
| [`quote`](https://ui.bigbullapp.com/docs/quote) | Quote | Blockquote with dashed left frame, stamp entrance and mono uppercase cite line. |
| [`figure`](https://ui.bigbullapp.com/docs/figure) | Figure | Framed media figure with double-frame surface and delayed figcaption fade-in. |
| [`description-list`](https://ui.bigbullapp.com/docs/description-list) | DescriptionList | Term/description pairs with mono uppercase terms, muted descriptions and staggered row entrances. |
| [`media-object`](https://ui.bigbullapp.com/docs/media-object) | MediaObject | Horizontal media plus content row with title, description, meta chips and hover lift. |
| [`link-card`](https://ui.bigbullapp.com/docs/link-card) | LinkCard | Whole-card link with sliding arrow, darkening border on hover and fade-up entrance. |
| [`logo-cloud`](https://ui.bigbullapp.com/docs/logo-cloud) | LogoCloud | Grid or marquee row of monogram logo tiles in dashed frames with hover reveal. |
| [`faq`](https://ui.bigbullapp.com/docs/faq) | Faq | Self-contained accordion Q&A with one-open behavior, grid-rows height reveal and rotating plus icon. |
| [`testimonial`](https://ui.bigbullapp.com/docs/testimonial) | Testimonial | Quote card with initials avatar, name, role and staggered star rating pop-in. |
| [`team-grid`](https://ui.bigbullapp.com/docs/team-grid) | TeamGrid | Grid of member cards with initials avatars, roles, optional links and staggered hover-lift entrances. |
| [`feature-grid`](https://ui.bigbullapp.com/docs/feature-grid) | FeatureGrid | Feature tiles with icon slot, stamp-on-hover icons, darkening borders and staggered entrance. |
| [`line-chart`](https://ui.bigbullapp.com/docs/line-chart) | Line Chart | Multi-series line chart with stroke-dasharray animation and hover tooltips |
| [`area-chart`](https://ui.bigbullapp.com/docs/area-chart) | Area Chart | Filled area chart with gradient fills and hover highlights |
| [`stacked-bar`](https://ui.bigbullapp.com/docs/stacked-bar) | Stacked Bar Chart | Horizontal stacked bars with segmented rows and legend chips |
| [`gauge`](https://ui.bigbullapp.com/docs/gauge) | Gauge | Half-donut SVG gauge with needle animation and value readout |
| [`radar-chart`](https://ui.bigbullapp.com/docs/radar-chart) | Radar Chart | Spider web chart with polygon axes and data polygon animation |
| [`heatmap`](https://ui.bigbullapp.com/docs/heatmap) | Heatmap | Grid of colored cells showing value intensities with diagonal stagger |
| [`calendar-heatmap`](https://ui.bigbullapp.com/docs/calendar-heatmap) | Calendar Heatmap | GitHub-style Git calendar heatmap grid |
| [`funnel-chart`](https://ui.bigbullapp.com/docs/funnel-chart) | Funnel Chart | Horizontal funnel stages showing conversion percentages between steps |
| [`scatter-plot`](https://ui.bigbullapp.com/docs/scatter-plot) | Scatter Plot | SVG scatter plot with dashed axes and hover enlargements |
| [`waterfall-chart`](https://ui.bigbullapp.com/docs/waterfall-chart) | Waterfall Chart | Floating bars showing incremental changes with connecting guides |
| [`candlestick-chart`](https://ui.bigbullapp.com/docs/candlestick-chart) | Candlestick Chart | OHLC candlestick chart for financial data visualization |
| [`leaderboard`](https://ui.bigbullapp.com/docs/leaderboard) | Leaderboard | Ranked leaderboard with medal tiles for top 3 and count-up scores |
| [`scoreboard`](https://ui.bigbullapp.com/docs/scoreboard) | Scoreboard | Two-team score card with rolling digit animation |
| [`json-viewer`](https://ui.bigbullapp.com/docs/json-viewer) | JSON Viewer | Collapsible JSON tree with mono keys and color-typed values |
| [`diff-viewer`](https://ui.bigbullapp.com/docs/diff-viewer) | Diff Viewer | Unified diff viewer showing added/removed/context lines |
| [`terminal`](https://ui.bigbullapp.com/docs/terminal) | Terminal | Fake terminal card with sequential line reveal and blinking cursor |
| [`log-viewer`](https://ui.bigbullapp.com/docs/log-viewer) | Log Viewer | Scrolling log stream with level badges and filter chips |
| [`treemap-chart`](https://ui.bigbullapp.com/docs/treemap-chart) | Treemap Chart | Squarified treemap with recursive rectangles and staggered labels |
| [`spotlight`](https://ui.bigbullapp.com/docs/spotlight) | Spotlight | Full-viewport dim overlay with cutout hole positioned via target ref/bounding box; pulse ring around target; caption card. |
| [`image-compare`](https://ui.bigbullapp.com/docs/image-compare) | ImageCompare | Before/after slider with clip-path inset controlled by draggable divider; BEFORE/AFTER labels. |
| [`zoom-image`](https://ui.bigbullapp.com/docs/zoom-image) | ZoomImage | Image with hover magnifier lens tracking cursor; framed double border. |
| [`virtual-list`](https://ui.bigbullapp.com/docs/virtual-list) | VirtualList | Windowed list for fixed-height rows: scrollTop math, visible slice renders, spacer divs; smooth scroll. |
| [`reveal`](https://ui.bigbullapp.com/docs/reveal) | Reveal | IntersectionObserver: children animate in when entering viewport with fade-up/scale variants, delay prop, once re-trigger option. |
| [`product-card`](https://ui.bigbullapp.com/docs/product-card) | Product Card | Product card with image slot, price, discount badge and wishlist heart. |
| [`user-card`](https://ui.bigbullapp.com/docs/user-card) | User Card | Profile card with avatar, role, meta chips and action slot. |
| [`article-card`](https://ui.bigbullapp.com/docs/article-card) | Article Card | Blog article card with category badge, excerpt and author meta. |
| [`event-card`](https://ui.bigbullapp.com/docs/event-card) | Event Card | Event card with perforated date block, venue and time chips. |
| [`invoice`](https://ui.bigbullapp.com/docs/invoice) | Invoice | Invoice layout with line items, tax breakdown and stamped total. |
| [`receipt`](https://ui.bigbullapp.com/docs/receipt) | Receipt | Thermal receipt with zigzag tear edge, mono lines and barcode footer. |
| [`checkout-summary`](https://ui.bigbullapp.com/docs/checkout-summary) | Checkout Summary | Cart summary with quantity steppers, tax row and checkout CTA. |
| [`order-card`](https://ui.bigbullapp.com/docs/order-card) | Order Card | Order status card with step dots and item summary. |
| [`stamp-card`](https://ui.bigbullapp.com/docs/stamp-card) | Stamp Card | Loyalty punch card with stamped circles and reward row. |
| [`gift-card`](https://ui.bigbullapp.com/docs/gift-card) | Gift Card | Gift card with ribbon stripe, amount and balance bar. |
| [`id-card`](https://ui.bigbullapp.com/docs/id-card) | Id Card | Employee ID card with hologram shine sweep and barcode. |
| [`rsvp-card`](https://ui.bigbullapp.com/docs/rsvp-card) | Rsvp Card | Invitation RSVP card with attending toggle and wax stamp. |
| [`chat-window`](https://ui.bigbullapp.com/docs/chat-window) | ChatWindow | Full chat panel with message list, input bar, and typing indicator slot. |
| [`chat-bubble`](https://ui.bigbullapp.com/docs/chat-bubble) | ChatBubble | Single message bubble with tail, status ticks, and hover press feedback. |
| [`typing-indicator`](https://ui.bigbullapp.com/docs/typing-indicator) | TypingIndicator | Three bouncing dots with user name label indicating who is typing. |
| [`comment-thread`](https://ui.bigbullapp.com/docs/comment-thread) | CommentThread | Nested comments with avatars, collapse/reply actions, and dashed indent guides. |
| [`reaction-bar`](https://ui.bigbullapp.com/docs/reaction-bar) | ReactionBar | Emoji buttons with counts, active reaction pops, and hover tooltips. |
| [`share-menu`](https://ui.bigbullapp.com/docs/share-menu) | ShareMenu | Platform icon row (X, Facebook, LinkedIn, Link) with copy link feedback and stamp stamp. |
| [`story-viewer`](https://ui.bigbullapp.com/docs/story-viewer) | StoryViewer | Circular story ring with progress animation, avatar names, and tap zones for prev/next. |
| [`post-card`](https://ui.bigbullapp.com/docs/post-card) | PostCard | Social post with header, body, gradient media placeholder, and action row with like/comment/share counts. |
| [`follower-list`](https://ui.bigbullapp.com/docs/follower-list) | FollowerList | Rows with avatars, names, handles, and Follow buttons that morph between states. |
| [`voice-message`](https://ui.bigbullapp.com/docs/voice-message) | VoiceMessage | Chat audio bubble with play/pause button and animated waveform bars showing audio duration. |
| [`audio-player`](https://ui.bigbullapp.com/docs/audio-player) | AudioPlayer | Full deck audio player with play/pause morph button, seek bar, time readout, volume slider, and track info |
| [`video-player`](https://ui.bigbullapp.com/docs/video-player) | VideoPlayer | Video frame with sprocket styling, hover fade-in controls, progress bar with scrub preview |
| [`playlist`](https://ui.bigbullapp.com/docs/playlist) | Playlist | Track rows with equalizer bars for active track, title/artist, duration, and slide-in marker |
| [`volume-slider`](https://ui.bigbullapp.com/docs/volume-slider) | VolumeSlider | Vertical or horizontal slider with fill animation, mute toggle, and ARIA roles |
| [`podcast-player`](https://ui.bigbullapp.com/docs/podcast-player) | PodcastPlayer | Episode card with art slot, play button, speed selector chips, skip buttons, and chapter ticks |
| [`video-thumbnail`](https://ui.bigbullapp.com/docs/video-thumbnail) | VideoThumbnail | Poster frame with duration badge, play overlay circle that scales on hover with ripple ring, and title strip |
| [`media-controls`](https://ui.bigbullapp.com/docs/media-controls) | MediaControls | Compact transport bar with prev/play/next/stop buttons, progress micro-bar, and time display |
| [`time-ago`](https://ui.bigbullapp.com/docs/time-ago) | TimeAgo | Relative time display showing '5 MIN AGO' with live re-render tick every 30s |
| [`live-clock`](https://ui.bigbullapp.com/docs/live-clock) | LiveClock | Digital clock showing HH:MM:SS with optional timezone and variant support |
| [`typewriter`](https://ui.bigbullapp.com/docs/typewriter) | Typewriter | Types text char-by-char with blinking block cursor, loops through phrases |
| [`highlight-text`](https://ui.bigbullapp.com/docs/highlight-text) | HighlightText | Highlights query matches inside text with accent background and animated reveal |
| [`truncate`](https://ui.bigbullapp.com/docs/truncate) | Truncate | Single/multi-line clamp with optional expand toggle (MORE/LESS) |
| [`text-diff`](https://ui.bigbullapp.com/docs/text-diff) | TextDiff | Word-level diff showing added/removed words with animation |
| [`currency-display`](https://ui.bigbullapp.com/docs/currency-display) | CurrencyDisplay | Formatted money with symbol, mono integer part, smaller muted decimals, optional count-up animation |
| [`receipt-printer`](https://ui.bigbullapp.com/docs/receipt-printer) | ReceiptPrinter | Thermal printer that feeds mono receipt lines out of a printer slot with a stepped paper animation. |
| [`queue-ticket`](https://ui.bigbullapp.com/docs/queue-ticket) | QueueTicket | Take-a-number queue ticket with a big tear-off number tab, NOW SERVING ring and queue stats. |
| [`now-serving`](https://ui.bigbullapp.com/docs/now-serving) | NowServing | Split-flap style NOW SERVING board whose digits flip on value change with a blinking chime dot. |
| [`passport`](https://ui.bigbullapp.com/docs/passport) | Passport | Double-frame passport cover with monogram, holder fields and staggered visa stamp marks. |
| [`wax-seal`](https://ui.bigbullapp.com/docs/wax-seal) | WaxSeal | Circular wax blob with a pressed-in monogram entrance and an optional cracked break state. |
| [`envelope`](https://ui.bigbullapp.com/docs/envelope) | Envelope | Envelope whose flap opens with a 3D rotateX and the letter inside rises, on hover or via an open prop. |
| [`airmail-letter`](https://ui.bigbullapp.com/docs/airmail-letter) | AirmailLetter | Airmail bordered letter with red/blue diagonal stripes, mono lines, a postmark corner and an unfold entrance. |
| [`postmark`](https://ui.bigbullapp.com/docs/postmark) | Postmark | Circular postal cancellation stamp with wavy lines, city and date arcs that stamps in on mount. |
| [`cassette-tape`](https://ui.bigbullapp.com/docs/cassette-tape) | CassetteTape | Cassette with two spinning reels, shifting tape amounts and a handwritten-style label with play toggle. |
| [`vinyl-record`](https://ui.bigbullapp.com/docs/vinyl-record) | VinylRecord | Spinning vinyl with radial grooves, center label, a tonearm that slides in and a wobble on drop. |
| [`flip-clock`](https://ui.bigbullapp.com/docs/flip-clock) | FlipClock | Mechanical split-flap HH:MM clock whose digit cards flip on change with a blinking colon. |
| [`neon-sign`](https://ui.bigbullapp.com/docs/neon-sign) | NeonSign | Neon sign with layered glow text-shadow, flicker-in entrance and a subtle per-letter buzz. |
| [`marquee-bulbs`](https://ui.bigbullapp.com/docs/marquee-bulbs) | MarqueeBulbs | Marquee board framed by chase-blinking bulbs with scrolling center text. |
| [`backstage-pass`](https://ui.bigbullapp.com/docs/backstage-pass) | BackstagePass | Laminated ALL ACCESS pass with lanyard hole, rotated stripe strip, shine sweep on hover and fake barcode. |
| [`wristband`](https://ui.bigbullapp.com/docs/wristband) | Wristband | Festival wristband with patterned repeating stripes, snap closure, serial and a subtle breathing animation. |
| [`lanyard`](https://ui.bigbullapp.com/docs/lanyard) | Lanyard | Strap with clip that sways gently from the top and holds an attached card slot for children. |
| [`ticket-stub-v2`](https://ui.bigbullapp.com/docs/ticket-stub-v2) | TicketStubV2 | Rip-off event stub whose tear line detaches the stub with rotate-and-fall on tear, plus serial and barcode. |
| [`qr-code`](https://ui.bigbullapp.com/docs/qr-code) | QR Code | Generates QR codes with Reed-Solomon error correction, mask evaluation, and finder patterns. Includes encodeQrMatrix helper. |
| [`rich-text-editor`](https://ui.bigbullapp.com/docs/rich-text-editor) | Rich Text Editor | Minimal contentEditable editor with toolbar (bold, italic, underline, lists, links, quote, code) and word/char counter. |
| [`sankey-chart`](https://ui.bigbullapp.com/docs/sankey-chart) | Sankey Chart | Two-level flow diagram with bezier ribbons, value-based width, hover tooltips, and entrance animations. |
| [`org-chart`](https://ui.bigbullapp.com/docs/org-chart) | Org Chart | Hierarchical tree of boxes with connector lines, expand/collapse nodes, avatar initials, and entrance animations. |
| [`tilt-card`](https://ui.bigbullapp.com/docs/tilt-card) | Tilt Card | 3D cursor-tracking tilt card with springy reset and glare highlight. |
| [`flip-card`](https://ui.bigbullapp.com/docs/flip-card) | Flip Card | Two-face card with rotateY flip animation, hover or click trigger. |
| [`spotlight-card`](https://ui.bigbullapp.com/docs/spotlight-card) | Spotlight Card | Card with cursor-following radial spotlight glow. |
| [`drag-sort`](https://ui.bigbullapp.com/docs/drag-sort) | Drag Sort | HTML5 drag-and-drop reorderable list with grab handles and drop indicators. |
| [`session-list`](https://ui.bigbullapp.com/docs/session-list) | Session List | Active session manager: device icons, location, revoke buttons. |
| [`api-key-card`](https://ui.bigbullapp.com/docs/api-key-card) | Api Key Card | API key card with masked value, reveal toggle, copy and regenerate actions. |
| [`permissions-matrix`](https://ui.bigbullapp.com/docs/permissions-matrix) | Permissions Matrix | Role � permission checkbox matrix with animated check pops. |
| [`audit-log`](https://ui.bigbullapp.com/docs/audit-log) | Audit Log | Audit trail with actor avatars, color-coded action badges and timestamps. |
| [`stats-overview`](https://ui.bigbullapp.com/docs/stats-overview) | Stats Overview | Overview layout: KPI tile row, mini bar chart panel and recent records table. |
| [`user-table`](https://ui.bigbullapp.com/docs/user-table) | User Table | User management table with role badges, status dots and remove action. |
| [`settings-section`](https://ui.bigbullapp.com/docs/settings-section) | Settings Section | Settings section: title, description rows and save confirmation stamp. |
| [`profile-settings`](https://ui.bigbullapp.com/docs/profile-settings) | Profile Settings | Profile settings with avatar slot, fields and animated danger zone. |
| [`billing-panel`](https://ui.bigbullapp.com/docs/billing-panel) | Billing Panel | Billing panel: plan card, usage meters and invoice list. |
| [`usage-meter`](https://ui.bigbullapp.com/docs/usage-meter) | Usage Meter | Quota meter with color-coded fill bar and over-limit pulse warning. |
| [`team-members`](https://ui.bigbullapp.com/docs/team-members) | Team Members | Team member management: invite input, role chips, remove action. |
| [`webhook-list`](https://ui.bigbullapp.com/docs/webhook-list) | Webhook List | Webhook list with URL, event chips, test button and remove. |
| [`feature-flag-panel`](https://ui.bigbullapp.com/docs/feature-flag-panel) | Feature Flag Panel | Feature flag panel with toggle switches and rollout percentages. |
| [`queued-jobs`](https://ui.bigbullapp.com/docs/queued-jobs) | Queued Jobs | Job queue panel with status, progress bars and cancel action. |
| [`bento-grid`](https://ui.bigbullapp.com/docs/bento-grid) | Bento Grid | Bento grid: variable-sized cells with hover lift and staggered entrance. |
| [`split-screen`](https://ui.bigbullapp.com/docs/split-screen) | Split Screen | Split layout: left content and right emphasis panel with ratio control. |
| [`centered-card`](https://ui.bigbullapp.com/docs/centered-card) | Centered Card | Centered single card layout for login/register pages. |
| [`two-column-list`](https://ui.bigbullapp.com/docs/two-column-list) | Two Column List | Two-column notebook-style list with dashed separators. |
| [`masonry-columns`](https://ui.bigbullapp.com/docs/masonry-columns) | Masonry Columns | CSS columns masonry: cards flow by height with break-inside protection. |
| [`data-grid`](https://ui.bigbullapp.com/docs/data-grid) | Data Grid | Heavy data grid: sortable columns, pagination, sticky header. |
| [`tree-table`](https://ui.bigbullapp.com/docs/tree-table) | Tree Table | Hierarchical table rows with expand/collapse chevrons. |
| [`kanban-v2`](https://ui.bigbullapp.com/docs/kanban-v2) | Kanban V2 | Drag-and-drop kanban board v2 with animated column transfers. |
| [`board-checklist`](https://ui.bigbullapp.com/docs/board-checklist) | Board Checklist | Task checklist: checkboxes, assignee, priority badges and progress bar. |
| [`task-list`](https://ui.bigbullapp.com/docs/task-list) | Task List | Task rows with assignee chips and priority badges. |
| [`timeline-vertical-v2`](https://ui.bigbullapp.com/docs/timeline-vertical-v2) | Timeline Vertical V2 | Two-sided vertical timeline v2 with alternating cards. |
| [`feed-masonry`](https://ui.bigbullapp.com/docs/feed-masonry) | Feed Masonry | Masonry feed of mixed-height content cards. |
| [`inbox-list`](https://ui.bigbullapp.com/docs/inbox-list) | Inbox List | Email inbox list: unread dots, senders, stars, subject previews. |
| [`activity-v2`](https://ui.bigbullapp.com/docs/activity-v2) | Activity V2 | Filterable activity feed v2 with action badges and avatars. |
| [`rank-list`](https://ui.bigbullapp.com/docs/rank-list) | Rank List | Ranked list with drag-to-reorder and score readouts. |
| [`table-summary`](https://ui.bigbullapp.com/docs/table-summary) | Table Summary | Table footer summary rows with bolded totals in dashed frame. |
| [`empty-col-span`](https://ui.bigbullapp.com/docs/empty-col-span) | Empty Col Span | Empty table cell placeholder with floating icon animation. |
| [`row-expand`](https://ui.bigbullapp.com/docs/row-expand) | Row Expand | Expandable row detail panels with height animation. |
| [`column-toggle`](https://ui.bigbullapp.com/docs/column-toggle) | Column Toggle | Column show/hide dropdown menu for data grids. |
| [`mention-list`](https://ui.bigbullapp.com/docs/mention-list) | Mention List | @mention suggestion panel with avatars and keyboard highlight. |
| [`dm-thread`](https://ui.bigbullapp.com/docs/dm-thread) | Dm Thread | Direct message thread: header with presence, bubbles, input. |
| [`poll`](https://ui.bigbullapp.com/docs/poll) | Poll | Interactive poll with animated result bars and vote confirmation. |
| [`quiz-card`](https://ui.bigbullapp.com/docs/quiz-card) | Quiz Card | Mini quiz card with options and correct/incorrect feedback. |
| [`bio-card`](https://ui.bigbullapp.com/docs/bio-card) | Bio Card | Bio card with social link icons and follow action. |
| [`mention-highlight`](https://ui.bigbullapp.com/docs/mention-highlight) | Mention Highlight | Highlight @mentions and #hashtags inside running text. |
| [`badge-list`](https://ui.bigbullapp.com/docs/badge-list) | Badge List | Achievement badge grid with earned/locked states and shine sweep. |
| [`gift-message`](https://ui.bigbullapp.com/docs/gift-message) | Gift Message | Gift message card with ribbon wiggle and open animation. |
| [`voice-note-list`](https://ui.bigbullapp.com/docs/voice-note-list) | Voice Note List | Voice note list: play buttons, waveforms, durations. |
| [`price-compare`](https://ui.bigbullapp.com/docs/price-compare) | Price Compare | Price comparison table across sellers with best-offer highlight. |
| [`cart-badge`](https://ui.bigbullapp.com/docs/cart-badge) | Cart Badge | Cart count badge that pulses on item add. |
| [`order-tracking`](https://ui.bigbullapp.com/docs/order-tracking) | Order Tracking | Order tracking strip: status dots with dates and courier. |
| [`refund-card`](https://ui.bigbullapp.com/docs/refund-card) | Refund Card | Refund status card with amount and reason. |
| [`wallet-card`](https://ui.bigbullapp.com/docs/wallet-card) | Wallet Card | Wallet balance card with top-up and mini transactions. |
| [`crypto-ticker`](https://ui.bigbullapp.com/docs/crypto-ticker) | Crypto Ticker | Crypto price ticker with animated up/down arrows. |
| [`exchange-rate`](https://ui.bigbullapp.com/docs/exchange-rate) | Exchange Rate | Exchange rate converter with two-way live calculation. |
| [`budget-progress`](https://ui.bigbullapp.com/docs/budget-progress) | Budget Progress | Budget spending bar with category breakdown and overrun warning. |
| [`subscription-card`](https://ui.bigbullapp.com/docs/subscription-card) | Subscription Card | Subscription card: plan, renewal date, features, cancel. |
| [`gallery-grid`](https://ui.bigbullapp.com/docs/gallery-grid) | Gallery Grid | Image gallery grid with fullscreen lightbox and keyboard paging. |
| [`image-carousel`](https://ui.bigbullapp.com/docs/image-carousel) | Image Carousel | Image carousel with arrows, dots and swipe feel. |
| [`thumbnail-strip`](https://ui.bigbullapp.com/docs/thumbnail-strip) | Thumbnail Strip | Horizontal thumbnail strip with animated selection frame. |
| [`video-list`](https://ui.bigbullapp.com/docs/video-list) | Video List | Video results list: thumbnails, duration badges, channel names. |
| [`audio-recorder`](https://ui.bigbullapp.com/docs/audio-recorder) | Audio Recorder | Microphone recording simulator with waveform and send action. |
| [`media-embed`](https://ui.bigbullapp.com/docs/media-embed) | Media Embed | Embedded media frame: 16:9, skeleton shimmer, dashed border. |
| [`poster-card`](https://ui.bigbullapp.com/docs/poster-card) | Poster Card | Event poster card with gradient overlay and date corner. |
| [`screenshot-frame`](https://ui.bigbullapp.com/docs/screenshot-frame) | Screenshot Frame | Browser-chrome screenshot frame with URL bar and controls. |
| [`quote-wall`](https://ui.bigbullapp.com/docs/quote-wall) | Quote Wall | Masonry quote wall built on Quote cards. |
| [`glossary-list`](https://ui.bigbullapp.com/docs/glossary-list) | Glossary List | Glossary list with letter index tabs and term definitions. |
| [`changelog-list`](https://ui.bigbullapp.com/docs/changelog-list) | Changelog List | Changelog list: version badges, added/fixed/breaking sections. |
| [`recipe-card`](https://ui.bigbullapp.com/docs/recipe-card) | Recipe Card | Recipe card: ingredients/steps tabs, time and servings. |
| [`code-editor`](https://ui.bigbullapp.com/docs/code-editor) | Code Editor | Code editor: line-number gutter, Tab insertion, scroll sync. |
| [`markdown-editor`](https://ui.bigbullapp.com/docs/markdown-editor) | Markdown Editor | Markdown write/preview tabs with built-in renderer. |
| [`markdown-preview`](https://ui.bigbullapp.com/docs/markdown-preview) | Markdown Preview | Standalone markdown renderer: headings, lists, code, links, bold. |
| [`html-preview`](https://ui.bigbullapp.com/docs/html-preview) | Html Preview | Sandboxed HTML preview frame. |
| [`diff-editor`](https://ui.bigbullapp.com/docs/diff-editor) | Diff Editor | Editable side-by-side diff view. |
| [`json-editor`](https://ui.bigbullapp.com/docs/json-editor) | Json Editor | JSON editor with live validation, error line and format button. |
| [`regex-tester`](https://ui.bigbullapp.com/docs/regex-tester) | Regex Tester | Regex tester: pattern, test string, highlighted matches and count. |
| [`cron-builder`](https://ui.bigbullapp.com/docs/cron-builder) | Cron Builder | Cron expression builder: 5 fields, presets, live description. |
| [`color-token-table`](https://ui.bigbullapp.com/docs/color-token-table) | Color Token Table | Theme token table: swatch, value, copy action. |
| [`snippet-card`](https://ui.bigbullapp.com/docs/snippet-card) | Snippet Card | Code snippet card with language badge and copy button. |
| [`console-panel`](https://ui.bigbullapp.com/docs/console-panel) | Console Panel | Console panel: colored output lines, input row, autoscroll. |
| [`env-editor`](https://ui.bigbullapp.com/docs/env-editor) | Env Editor | Environment variable editor: secret masking, add/remove rows. |
| [`world-map`](https://ui.bigbullapp.com/docs/world-map) | World Map | Stylized world map grid with region value intensity and hover readout. |
| [`bubble-chart`](https://ui.bigbullapp.com/docs/bubble-chart) | Bubble Chart | Bubble chart with size-coded circles and hover magnify. |
| [`word-cloud`](https://ui.bigbullapp.com/docs/word-cloud) | Word Cloud | Word cloud with weight-based font sizing and hover accent. |
| [`network-graph`](https://ui.bigbullapp.com/docs/network-graph) | Network Graph | Node-edge network graph with bezier links and hover highlight. |
| [`sunburst-chart`](https://ui.bigbullapp.com/docs/sunburst-chart) | Sunburst Chart | Two-ring sunburst chart with segment hover dimming. |
| [`ticket-validator`](https://ui.bigbullapp.com/docs/ticket-validator) | Ticket Validator | Ticket validator device with blinking green/red result light. |
| [`punch-clock`](https://ui.bigbullapp.com/docs/punch-clock) | Punch Clock | Punch clock with live digital time and in/out stamp feed. |
| [`mailbox`](https://ui.bigbullapp.com/docs/mailbox) | Mailbox | Mailbox with flag raise and letter send animation. |
| [`medal-display`](https://ui.bigbullapp.com/docs/medal-display) | Medal Display | Medal board with gold/silver/bronze tiers and shine sweep. |
| [`trophy-shelf`](https://ui.bigbullapp.com/docs/trophy-shelf) | Trophy Shelf | Trophy shelf with earned/empty slots and drop-in animation. |
| [`megaphone`](https://ui.bigbullapp.com/docs/megaphone) | Megaphone | Announcement megaphone with animated sound waves. |
| [`score-keeper`](https://ui.bigbullapp.com/docs/score-keeper) | Score Keeper | Two-team score keeper with pulse on score change. |
| [`match-ticker`](https://ui.bigbullapp.com/docs/match-ticker) | Match Ticker | Live match ticker with scrolling scores and LIVE badges. |
| [`badge-ribbon`](https://ui.bigbullapp.com/docs/badge-ribbon) | Badge Ribbon | Award rosette badge ribbon with swallow-tail streamers and certified stamp. |
| [`bullet-chart`](https://ui.bigbullapp.com/docs/bullet-chart) | Bullet Chart | Target versus actual progress meter with qualitative ranges and goal marker. |
| [`histogram`](https://ui.bigbullapp.com/docs/histogram) | Histogram | Frequency distribution histogram with hover count readout and grow animation. |
| [`milestone-chart`](https://ui.bigbullapp.com/docs/milestone-chart) | Milestone Chart | Horizontal milestone timeline progress line with reached checkpoints. |
| [`stat-tile`](https://ui.bigbullapp.com/docs/stat-tile) | Stat Tile | KPI metric box with big tabular numbers, delta change and sparkline bars. |
| [`kpi-strip`](https://ui.bigbullapp.com/docs/kpi-strip) | Kpi Strip | Responsive grid strip of KPI metric tiles with deltas and spark bars. |
| [`box-plot`](https://ui.bigbullapp.com/docs/box-plot) | Box Plot | Quartile box plot with whiskers and median. |
| [`violin-chart`](https://ui.bigbullapp.com/docs/violin-chart) | Violin Chart | Kernel density violins with median ticks. |
| [`spark-bars`](https://ui.bigbullapp.com/docs/spark-bars) | Spark Bars | Mini bar sparkline with peak readout. |
| [`spark-line-group`](https://ui.bigbullapp.com/docs/spark-line-group) | Spark Line Group | KPI card grid with mini trend lines. |
| [`donut-multi`](https://ui.bigbullapp.com/docs/donut-multi) | Donut Multi | Concentric multi-ring donut with legend. |
| [`pie-interactive`](https://ui.bigbullapp.com/docs/pie-interactive) | Pie Interactive | Hover-exploding pie with live readout. |
| [`chord-diagram`](https://ui.bigbullapp.com/docs/chord-diagram) | Chord Diagram | Circular flow ribbons with hover dimming. |
| [`icicle-chart`](https://ui.bigbullapp.com/docs/icicle-chart) | Icicle Chart | Rectangular hierarchy partition chart. |
| [`stream-graph`](https://ui.bigbullapp.com/docs/stream-graph) | Stream Graph | Stacked flowing area layers with legend. |
| [`horizon-chart`](https://ui.bigbullapp.com/docs/horizon-chart) | Horizon Chart | Banded area chart for dense time series. |
| [`density-plot`](https://ui.bigbullapp.com/docs/density-plot) | Density Plot | Smooth distribution curve with rug ticks. |
| [`qq-plot`](https://ui.bigbullapp.com/docs/qq-plot) | QQ Plot | Quantile-quantile scatter against diagonal. |
| [`control-chart`](https://ui.bigbullapp.com/docs/control-chart) | Control Chart | Process chart with UCL/LCL violation dots. |
| [`matrix-chart`](https://ui.bigbullapp.com/docs/matrix-chart) | Matrix Chart | Row-column heat cells with labels. |
| [`org-tree-v2`](https://ui.bigbullapp.com/docs/org-tree-v2) | Org Tree V2 | Collapsible org tree, vertical or horizontal. |
| [`table-empty-col`](https://ui.bigbullapp.com/docs/table-empty-col) | Table Empty Col | Empty table cell placeholder with message. |
| [`code-tabs`](https://ui.bigbullapp.com/docs/code-tabs) | Code Tabs | Multi-language code block with tabs and copy. |
| [`file-tree`](https://ui.bigbullapp.com/docs/file-tree) | File Tree | Collapsible folder tree with active selection. |
| [`json-inspector`](https://ui.bigbullapp.com/docs/json-inspector) | JSON Inspector | Collapsible colored API response viewer. |
| [`shortcut-recorder`](https://ui.bigbullapp.com/docs/shortcut-recorder) | Shortcut Recorder | Press-to-record keyboard shortcut field. |
| [`badge-printer`](https://ui.bigbullapp.com/docs/badge-printer) | Badge Printer | Thermal badge printer with feed-out animation. |
| [`stopwatch-v2`](https://ui.bigbullapp.com/docs/stopwatch-v2) | Stopwatch V2 | Digital LED chronometer with laps. |
| [`passport-stamp-grid`](https://ui.bigbullapp.com/docs/passport-stamp-grid) | Passport Stamp Grid | Consulate stamp showcase for achievements. |
| [`library-due-date-card`](https://ui.bigbullapp.com/docs/library-due-date-card) | Library Due Date Card | Date-stamped return tracker card. |
| [`coat-check-tag`](https://ui.bigbullapp.com/docs/coat-check-tag) | Coat Check Tag | Two-part perforated claim coupon. |
| [`warranty-certificate`](https://ui.bigbullapp.com/docs/warranty-certificate) | Warranty Certificate | Sealed ornate certificate card. |
| [`train-departure-board`](https://ui.bigbullapp.com/docs/train-departure-board) | Train Departure Board | Mechanical flap departure panel. |
| [`scratch-card`](https://ui.bigbullapp.com/docs/scratch-card) | Scratch Card | Scratch-to-reveal coupon card. |
| [`passport-id-card`](https://ui.bigbullapp.com/docs/passport-id-card) | Passport ID Card | Photo ID card with MRZ strip. |
| [`waitlist-queue-card`](https://ui.bigbullapp.com/docs/waitlist-queue-card) | Waitlist Queue Card | Numbered early-access queue ticket. |
| [`social-proof-toast`](https://ui.bigbullapp.com/docs/social-proof-toast) | Social Proof Toast | Live purchase notification toast. |
| [`cargo-shipping-label`](https://ui.bigbullapp.com/docs/cargo-shipping-label) | Cargo Shipping Label | Tracking label with barcode and fragile stamp. |
| [`flight-timeline-card`](https://ui.bigbullapp.com/docs/flight-timeline-card) | Flight Timeline Card | Route boarding card with delay stamp. |
| [`parking-ticket-meter`](https://ui.bigbullapp.com/docs/parking-ticket-meter) | Parking Ticket Meter | Plate countdown stub with expiry. |
| [`thinking-block`](https://ui.bigbullapp.com/docs/thinking-block) | Thinking Block | Collapsible reasoning trace with numbered steps. |
| [`prompt-input`](https://ui.bigbullapp.com/docs/prompt-input) | Prompt Input | Prompt composer with token estimate and send. |
| [`streaming-text`](https://ui.bigbullapp.com/docs/streaming-text) | Streaming Text | Character-by-character stream with cursor. |
| [`token-counter`](https://ui.bigbullapp.com/docs/token-counter) | Token Counter | Token meter with context limit bar. |
| [`prompt-history-drawer`](https://ui.bigbullapp.com/docs/prompt-history-drawer) | Prompt History Drawer | Saved prompt drawer with restore action. |
| [`model-picker`](https://ui.bigbullapp.com/docs/model-picker) | Model Picker | Compact model selector with meta readout. |
| [`feedback-vote`](https://ui.bigbullapp.com/docs/feedback-vote) | Feedback Vote | Up and down vote pair with live tally. |
| [`agent-artifact-card`](https://ui.bigbullapp.com/docs/agent-artifact-card) | Agent Artifact Card | Framed agent output with copy and open. |
| [`prompt-diff-compare`](https://ui.bigbullapp.com/docs/prompt-diff-compare) | Prompt Diff Compare | Side-by-side prompt diff with highlights. |
| [`voice-chat-visualizer`](https://ui.bigbullapp.com/docs/voice-chat-visualizer) | Voice Chat Visualizer | Animated voice bars for live chat state. |
| [`citation-bubble`](https://ui.bigbullapp.com/docs/citation-bubble) | Citation Bubble | Citation marker with source popover. |
| [`printable-ticket`](https://ui.bigbullapp.com/docs/printable-ticket) | Printable Ticket | Print-ready admission ticket stub. |
| [`printable-invoice`](https://ui.bigbullapp.com/docs/printable-invoice) | Printable Invoice | Print-ready invoice with totals. |
| [`boarding-pass-print`](https://ui.bigbullapp.com/docs/boarding-pass-print) | Boarding Pass Print | Print-ready boarding pass with stub. |
| [`badge-printer-template`](https://ui.bigbullapp.com/docs/badge-printer-template) | Badge Printer Template | Print-ready staff badge template. |
| [`audio-toggle`](https://ui.bigbullapp.com/docs/audio-toggle) | Audio Toggle | Speaker mute toggle with status label. |
| [`prompt-box`](https://ui.bigbullapp.com/docs/prompt-box) | Prompt Box | Prompt composer with stamp submit. |
| [`chat-thread`](https://ui.bigbullapp.com/docs/chat-thread) | Chat Thread | Role-stamped chat message thread. |
| [`suggestion-chips`](https://ui.bigbullapp.com/docs/suggestion-chips) | Suggestion Chips | Pickable suggestion chip row. |
| [`jwt-decoder`](https://ui.bigbullapp.com/docs/jwt-decoder) | JWT Decoder | Header payload signature inspector. |
| [`base64-tool`](https://ui.bigbullapp.com/docs/base64-tool) | Base64 Tool | Encode decode panel with copy. |
| [`cron-humanizer`](https://ui.bigbullapp.com/docs/cron-humanizer) | Cron Humanizer | Cron expression plain English explainer. |
| [`color-contrast`](https://ui.bigbullapp.com/docs/color-contrast) | Color Contrast | WCAG contrast checker with pass stamps. |
| [`regex-visualizer`](https://ui.bigbullapp.com/docs/regex-visualizer) | Regex Visualizer | Match highlighter with validity flag. |
| [`json-formatter`](https://ui.bigbullapp.com/docs/json-formatter) | JSON Formatter | Pretty printer with error stamp. |
| [`lorem-typer`](https://ui.bigbullapp.com/docs/lorem-typer) | Lorem Typer | Placeholder paragraph generator. |
| [`pivot-lite`](https://ui.bigbullapp.com/docs/pivot-lite) | Pivot Lite | Sales pivot by section tier. |
| [`filter-builder`](https://ui.bigbullapp.com/docs/filter-builder) | Filter Builder | Rule list with add remove. |
| [`csv-importer`](https://ui.bigbullapp.com/docs/csv-importer) | CSV Importer | Drop reader with grid preview. |
| [`audit-timeline`](https://ui.bigbullapp.com/docs/audit-timeline) | Audit Timeline | Audit events with tone dots. |
| [`compare-table`](https://ui.bigbullapp.com/docs/compare-table) | Compare Table | Plan comparison with highlight. |
| [`theme-stamping-machine`](https://ui.bigbullapp.com/docs/theme-stamping-machine) | Theme Stamping Machine | Swatch stamper with press count. |
| [`docs-prop-playground`](https://ui.bigbullapp.com/docs/docs-prop-playground) | Docs Prop Playground | Live prop editor with preview. |
| [`docs-stackblitz-button`](https://ui.bigbullapp.com/docs/docs-stackblitz-button) | Docs StackBlitz Button | Open stub example live. |
| [`ticket-deck-dnd`](https://ui.bigbullapp.com/docs/ticket-deck-dnd) | Ticket Deck DND | Draggable deck with keyboard reorder. |
| [`joystick`](https://ui.bigbullapp.com/docs/joystick) | Joystick | Analog touch stick with normalized axes and 44px knob. |
| [`d-pad`](https://ui.bigbullapp.com/docs/d-pad) | D Pad | Cross layout directional pad with four touch targets. |
| [`action-buttons`](https://ui.bigbullapp.com/docs/action-buttons) | Action Buttons | Diamond cluster of large touch action buttons. |
| [`combo-buttons`](https://ui.bigbullapp.com/docs/combo-buttons) | Combo Buttons | Timed sequence input with draining timer bar. |
| [`health-bar`](https://ui.bigbullapp.com/docs/health-bar) | Health Bar | Segmented vitality meter with low-health pulse. |
| [`mana-bar`](https://ui.bigbullapp.com/docs/mana-bar) | Mana Bar | Smooth energy meter with shimmer sweep. |
| [`xp-bar`](https://ui.bigbullapp.com/docs/xp-bar) | Xp Bar | Experience track with level badge and animated fill. |
| [`boss-bar`](https://ui.bigbullapp.com/docs/boss-bar) | Boss Bar | Encounter header with phase ticks and drain track. |
| [`team-frames`](https://ui.bigbullapp.com/docs/team-frames) | Team Frames | Party roster with mini HP tracks and status dots. |
| [`damage-vignette`](https://ui.bigbullapp.com/docs/damage-vignette) | Damage Vignette | Edge flash overlay that pulses on every hit. |
| [`low-hp-pulse`](https://ui.bigbullapp.com/docs/low-hp-pulse) | Low Hp Pulse | Critical health edge glow with throb pulse. |
| [`respawn-timer`](https://ui.bigbullapp.com/docs/respawn-timer) | Respawn Timer | Countdown ring with skip respawn action. |
| [`score-popup`](https://ui.bigbullapp.com/docs/score-popup) | Score Popup | Floating points burst with rise fade. |
| [`combo-counter`](https://ui.bigbullapp.com/docs/combo-counter) | Combo Counter | Hit streak readout with heat scaling. |
| [`kill-feed`](https://ui.bigbullapp.com/docs/kill-feed) | Kill Feed | Stacked elimination log with weapon tags. |
| [`countdown-start`](https://ui.bigbullapp.com/docs/countdown-start) | Countdown Start | Match opener with auto 3-2-1 tick. |
| [`achievement-toast`](https://ui.bigbullapp.com/docs/achievement-toast) | Achievement Toast | Unlock banner with stamp seal mark. |
| [`battle-pass-track`](https://ui.bigbullapp.com/docs/battle-pass-track) | Battle Pass Track | Tier rail with XP progress fill. |
| [`tournament-bracket`](https://ui.bigbullapp.com/docs/tournament-bracket) | Tournament Bracket | Head to head rounds with winner marks. |
| [`inventory-grid`](https://ui.bigbullapp.com/docs/inventory-grid) | Inventory Grid | Tappable slot matrix with fill states. |
| [`item-slot`](https://ui.bigbullapp.com/docs/item-slot) | Item Slot | Rarity framed cell with count badge. |
| [`loot-box`](https://ui.bigbullapp.com/docs/loot-box) | Loot Box | Sealed crate with shake open action. |
| [`gacha-pull`](https://ui.bigbullapp.com/docs/gacha-pull) | Gacha Pull | Single-draw capsule reveal card. |
| [`daily-rewards`](https://ui.bigbullapp.com/docs/daily-rewards) | Daily Rewards | 7-day claim strip with current day. |
| [`shop-grid`](https://ui.bigbullapp.com/docs/shop-grid) | Shop Grid | Purchasable cards with price and buy. |
| [`quest-list`](https://ui.bigbullapp.com/docs/quest-list) | Quest List | Objectives with progress bars and track. |
| [`quest-tracker`](https://ui.bigbullapp.com/docs/quest-tracker) | Quest Tracker | Pinned HUD objective chip with mini bar. |
| [`dialogue-box`](https://ui.bigbullapp.com/docs/dialogue-box) | Dialogue Box | Speaker panel with paged lines. |
| [`tutorial-highlight`](https://ui.bigbullapp.com/docs/tutorial-highlight) | Tutorial Highlight | Coach-mark ring with hint capsule. |
| [`matchmaking-lobby`](https://ui.bigbullapp.com/docs/matchmaking-lobby) | Matchmaking Lobby | Ready-check roster with search state. |
| [`friend-list`](https://ui.bigbullapp.com/docs/friend-list) | Friend List | Presence roster with invite actions. |
| [`clan-card`](https://ui.bigbullapp.com/docs/clan-card) | Clan Card | Guild banner with roster and join. |
| [`voice-indicator`](https://ui.bigbullapp.com/docs/voice-indicator) | Voice Indicator | Speaking bars with mute state. |
| [`ping-indicator`](https://ui.bigbullapp.com/docs/ping-indicator) | Ping Indicator | Latency badge with signal bars. |
| [`pause-menu`](https://ui.bigbullapp.com/docs/pause-menu) | Pause Menu | Overlay panel with resume restart quit. |
| [`settings-sheet`](https://ui.bigbullapp.com/docs/settings-sheet) | Settings Sheet | Bottom drawer frame with close control. |
| [`sensitivity-slider`](https://ui.bigbullapp.com/docs/sensitivity-slider) | Sensitivity Slider | Touch look-speed control slider. |
| [`crosshair-picker`](https://ui.bigbullapp.com/docs/crosshair-picker) | Crosshair Picker | Reticle style grid with live preview. |
| [`replay-controls`](https://ui.bigbullapp.com/docs/replay-controls) | Replay Controls | Transport bar with seek track. |
| [`filters-drawer`](https://ui.bigbullapp.com/docs/filters-drawer) | Filters Drawer | Collapsible filter panel with counts. |
| [`resource-scheduler`](https://ui.bigbullapp.com/docs/resource-scheduler) | Resource Scheduler | Bookable slot grid per resource. |
| [`agenda-list`](https://ui.bigbullapp.com/docs/agenda-list) | Agenda List | Timed entries with done marks. |
| [`density-toggle`](https://ui.bigbullapp.com/docs/density-toggle) | Density Toggle | Comfortable compact segmented switch. |
| [`export-menu`](https://ui.bigbullapp.com/docs/export-menu) | Export Menu | Format dropdown with stamp frame. |
| [`bulk-actions`](https://ui.bigbullapp.com/docs/bulk-actions) | Bulk Actions | Selection bar with stamp actions. |
| [`storage-donut`](https://ui.bigbullapp.com/docs/storage-donut) | Storage Donut | Ring with center usage readout. |
| [`gallery-lightbox`](https://ui.bigbullapp.com/docs/gallery-lightbox) | Gallery Lightbox | Thumb grid with paged viewer. |
| [`radial-bar`](https://ui.bigbullapp.com/docs/radial-bar) | Radial Bar | Concentric rings per series value. |
| [`composed-chart`](https://ui.bigbullapp.com/docs/composed-chart) | Composed Chart | Bars plus line overlay chart. |
| [`prompt-history`](https://ui.bigbullapp.com/docs/prompt-history) | Prompt History | Past prompts with reuse action. |
| [`usage-quota-ring`](https://ui.bigbullapp.com/docs/usage-quota-ring) | Usage Quota Ring | Quota ring with over-limit stamp. |
| [`api-tester`](https://ui.bigbullapp.com/docs/api-tester) | Api Tester | Method picker with fake latency. |
| [`webhook-log`](https://ui.bigbullapp.com/docs/webhook-log) | Webhook Log | Delivery rows with status codes. |
| [`csv-mapper`](https://ui.bigbullapp.com/docs/csv-mapper) | Csv Mapper | Column to field mapping rows. |
| [`print-invoice`](https://ui.bigbullapp.com/docs/print-invoice) | Print Invoice | Printable invoice stub with tear line. |
| [`story-ring`](https://ui.bigbullapp.com/docs/story-ring) | Story Ring | Segmented avatar story ring. |
| [`poll-results`](https://ui.bigbullapp.com/docs/poll-results) | Poll Results | Animated percentage result bars. |
| [`seasonal-snow`](https://ui.bigbullapp.com/docs/seasonal-snow) | Seasonal Snow | Winter card with falling snow. |
| [`seasonal-pumpkin`](https://ui.bigbullapp.com/docs/seasonal-pumpkin) | Seasonal Pumpkin | Autumn harvest greeting card. |
| [`changelog-entry`](https://ui.bigbullapp.com/docs/changelog-entry) | Changelog Entry | Version badge with change rows. |
| [`roadmap-board`](https://ui.bigbullapp.com/docs/roadmap-board) | Roadmap Board | Now next later vote columns. |
| [`wall-of-love`](https://ui.bigbullapp.com/docs/wall-of-love) | Wall Of Love | Masonry testimonial grid. |
| [`spreadsheet-lite`](https://ui.bigbullapp.com/docs/spreadsheet-lite) | Spreadsheet Lite | Editable mini cell grid. |
| [`import-review`](https://ui.bigbullapp.com/docs/import-review) | Import Review | Approve or drop import rows. |
| [`pricing-calculator`](https://ui.bigbullapp.com/docs/pricing-calculator) | Pricing Calculator | Seat stepper live total. |
| [`stats-band`](https://ui.bigbullapp.com/docs/stats-band) | Stats Band | Horizontal KPI strip. |
| [`testimonial-carousel`](https://ui.bigbullapp.com/docs/testimonial-carousel) | Testimonial Carousel | Rotating quotes with dots. |
| [`logo-marquee`](https://ui.bigbullapp.com/docs/logo-marquee) | Logo Marquee | Infinite monogram ticker. |
| [`feature-vote`](https://ui.bigbullapp.com/docs/feature-vote) | Feature Vote | Idea rows with vote counts. |
| [`digest-preview`](https://ui.bigbullapp.com/docs/digest-preview) | Digest Preview | Weekly roundup email card. |
</details>
<details>
<summary><strong>Feedback</strong> — notices, hints and interruptions</summary>

| File | Component | Description |
|---|---|---|
| [`badge`](https://ui.bigbullapp.com/docs/badge) | Badge | Micro status pill with subtle entrance transition. |
| [`progress`](https://ui.bigbullapp.com/docs/progress) | Progress | Marching striped progress indicator bar. |
| [`alert`](https://ui.bigbullapp.com/docs/alert) | Alert | Notice box with tone bar and status eyebrow. |
| [`tooltip`](https://ui.bigbullapp.com/docs/tooltip) | Tooltip | Floating helper tooltip on hover and keyboard focus. |
| [`dialog`](https://ui.bigbullapp.com/docs/dialog) | Dialog | Accessible modal dialog with focus trap and scale animation. |
| [`toast`](https://ui.bigbullapp.com/docs/toast) | Toast | Transient stacked notices with auto-dismiss. |
| [`sheet`](https://ui.bigbullapp.com/docs/sheet) | Sheet | Slide-over drawer panel with focus trap and scroll lock. |
| [`popover`](https://ui.bigbullapp.com/docs/popover) | Popover | Floating content panel anchored to an interactive trigger. |
| [`spinner`](https://ui.bigbullapp.com/docs/spinner) | Spinner | Rotary loading indicator with dashed track and stamp accent. |
| [`skeleton`](https://ui.bigbullapp.com/docs/skeleton) | Skeleton | Dashed placeholder box with gentle pulse animation. |
| [`cookie-banner`](https://ui.bigbullapp.com/docs/cookie-banner) | Cookie Banner | Fixed privacy consent banner with accept and decline actions. |
| [`confetti-burst`](https://ui.bigbullapp.com/docs/confetti-burst) | Confetti Burst | CSS celebration burst with stamp-colored pieces flying outward. |
| [`tour`](https://ui.bigbullapp.com/docs/tour) | Tour | Interactive step-by-step guided onboarding card with progress indicators. |
| [`hover-card`](https://ui.bigbullapp.com/docs/hover-card) | Hover Card | Popover preview on hover and focus with configurable delays and alignment. |
| [`drawer`](https://ui.bigbullapp.com/docs/drawer) | Drawer | Bottom slide-up drawer with pull handle, backdrop blur, and focus trap. |
| [`announcement-bar`](https://ui.bigbullapp.com/docs/announcement-bar) | Announcement Bar | Festival alert and headline announcement ribbon bar with perforated top/bottom tear lines, countdown urgency badge, action CTA button, and dismiss action. |
| [`status-dot`](https://ui.bigbullapp.com/docs/status-dot) | Status Dot | Live status beacon with radar sweep pulse, glow rings and occupancy levels. |
| [`skeleton-v2`](https://ui.bigbullapp.com/docs/skeleton-v2) | Skeleton V2 | Shimmer sweep skeleton with text-line and card composition presets. |
| [`alert-dialog`](https://ui.bigbullapp.com/docs/alert-dialog) | Alert Dialog | Confirm/cancel modal with destructive variant for irreversible actions, Escape/backdrop close, and animated content. |
| [`progress-circle`](https://ui.bigbullapp.com/docs/progress-circle) | Progress Circle | Circular progress ring with stroke-dashoffset animation and center percentage |
| [`confirm-dialog`](https://ui.bigbullapp.com/docs/confirm-dialog) | ConfirmDialog | Self-contained confirm dialog with focus trap and stamp entrance for confirm button in destructive mode. |
| [`result`](https://ui.bigbullapp.com/docs/result) | Result | Full-panel status screen with icon circle, title, description, and actions slot; confetti-ish subtle burst on success. |
| [`loading-dots`](https://ui.bigbullapp.com/docs/loading-dots) | LoadingDots | Three dots bounce in sequence with keyframe animation; sizes sm/md/lg and tone prop. |
| [`loading-overlay`](https://ui.bigbullapp.com/docs/loading-overlay) | LoadingOverlay | Absolute/fixed veil with backdrop blur and spinner; fade in/out with opacity transition. |
| [`notification-center`](https://ui.bigbullapp.com/docs/notification-center) | NotificationCenter | Bell button with unread badge + dropdown panel with notification rows, mark-all-read, empty state. |
| [`coach-mark`](https://ui.bigbullapp.com/docs/coach-mark) | CoachMark | Single floating tip bubble anchored to trigger children with arrow, title, body, dismiss; pop-in with springy scale. |
| [`cart-drawer`](https://ui.bigbullapp.com/docs/cart-drawer) | Cart Drawer | Slide-over cart drawer with quantity controls and animated removal. |
| [`live-badge`](https://ui.bigbullapp.com/docs/live-badge) | LiveBadge | LIVE indicator with blinking dot, mono uppercase label, and optional viewer count that ticks |
| [`fireworks`](https://ui.bigbullapp.com/docs/fireworks) | Fireworks | Rockets that rise and burst into radial particle rings, looping while active. |
| [`security-score`](https://ui.bigbullapp.com/docs/security-score) | Security Score | Security score with animated arc gauge and per-check pass/fail list. |
| [`role-badge`](https://ui.bigbullapp.com/docs/role-badge) | Role Badge | Role badge set: admin, editor, member, viewer with distinct tones. |
| [`danger-zone`](https://ui.bigbullapp.com/docs/danger-zone) | Danger Zone | Red-framed destructive actions area with two-step confirm. |
| [`invite-modal`](https://ui.bigbullapp.com/docs/invite-modal) | Invite Modal | Invite modal with email, role radio group and sent confirmation. |
| [`upgrade-prompt`](https://ui.bigbullapp.com/docs/upgrade-prompt) | Upgrade Prompt | Upgrade call-to-action card with shine sweep, feature list and dismiss. |
| [`maintenance-banner`](https://ui.bigbullapp.com/docs/maintenance-banner) | Maintenance Banner | Maintenance notification bar with countdown chip and dismiss. |
| [`offline-banner`](https://ui.bigbullapp.com/docs/offline-banner) | Offline Banner | Offline banner listening to navigator.onLine with reconnecting state. |
| [`error-page`](https://ui.bigbullapp.com/docs/error-page) | Error Page | 404/500/403 full-page layout with stamped code and return action. |
| [`permission-denied`](https://ui.bigbullapp.com/docs/permission-denied) | Permission Denied | Access denied panel with lock icon and request-access flow. |
| [`save-indicator`](https://ui.bigbullapp.com/docs/save-indicator) | Save Indicator | Auto-save status chip: idle, saving, saved, error states. |
| [`connection-status`](https://ui.bigbullapp.com/docs/connection-status) | Connection Status | Connection badge with pinging dot and optional latency readout. |
| [`version-badge`](https://ui.bigbullapp.com/docs/version-badge) | Version Badge | Version badge set: new, beta, stable, deprecated tones. |
| [`sync-status`](https://ui.bigbullapp.com/docs/sync-status) | Sync Status | Sync status chip with spinning icon and last-sync timestamp. |
| [`upload-progress`](https://ui.bigbullapp.com/docs/upload-progress) | Upload Progress | Single file upload with circular progress ring and cancel. |
| [`migration-banner`](https://ui.bigbullapp.com/docs/migration-banner) | Migration Banner | Data migration banner with progress bar and expandable detail. |
| [`rate-limit-note`](https://ui.bigbullapp.com/docs/rate-limit-note) | Rate Limit Note | Rate limit notice with countdown timer. |
| [`notification-feed`](https://ui.bigbullapp.com/docs/notification-feed) | Notification Feed | Full-page notification feed with type icons and read states. |
| [`drawer-nav`](https://ui.bigbullapp.com/docs/drawer-nav) | Drawer Nav | Mobile hamburger drawer sliding from the left with staggered links. |
| [`stock-status`](https://ui.bigbullapp.com/docs/stock-status) | Stock Status | Stock status badge: in stock, low stock pulse, sold out. |
| [`callout`](https://ui.bigbullapp.com/docs/callout) | Callout | Tactile admission callout note with dashed borders, status tones and dismiss action. |
| [`meter`](https://ui.bigbullapp.com/docs/meter) | Meter | Turnstile capacity meter with notched frame, optimal indicator and tick marks. |
| [`trend-badge`](https://ui.bigbullapp.com/docs/trend-badge) | Trend Badge | Dynamic rate and velocity indicator badge with live pulse indicator. |
| [`feedback-widget`](https://ui.bigbullapp.com/docs/feedback-widget) | Feedback Widget | Floating ticket feedback button and form. |
| [`bottom-sheet`](https://ui.bigbullapp.com/docs/bottom-sheet) | Bottom Sheet | Mobile sheet with pull handle. |
| [`swipe-actions`](https://ui.bigbullapp.com/docs/swipe-actions) | Swipe Actions | Swipeable row revealing actions. |
| [`pull-refresh`](https://ui.bigbullapp.com/docs/pull-refresh) | Pull Refresh | Refresh wrapper with sync stamp. |
| [`action-sheet`](https://ui.bigbullapp.com/docs/action-sheet) | Action Sheet | Option list with danger stamp. |
| [`status-page`](https://ui.bigbullapp.com/docs/status-page) | Status Page | Service rows with summary stamp. |
| [`deploy-timeline`](https://ui.bigbullapp.com/docs/deploy-timeline) | Deploy Timeline | Release phase stamp rail. |
| [`env-switcher`](https://ui.bigbullapp.com/docs/env-switcher) | Env Switcher | Production staging preview switch. |
| [`install-prompt`](https://ui.bigbullapp.com/docs/install-prompt) | Install Prompt | PWA install banner stub. |
| [`update-toast`](https://ui.bigbullapp.com/docs/update-toast) | Update Toast | Version stamp with reload action. |
| [`offline-queue`](https://ui.bigbullapp.com/docs/offline-queue) | Offline Queue | Pending rows with retry stamp. |
| [`empty-search`](https://ui.bigbullapp.com/docs/empty-search) | Empty Search | Zero-result state with clear. |
| [`empty-offline`](https://ui.bigbullapp.com/docs/empty-offline) | Empty Offline | Disconnected state with retry. |
| [`error-500`](https://ui.bigbullapp.com/docs/error-500) | Error 500 | Stamped server error panel. |
| [`maintenance-page`](https://ui.bigbullapp.com/docs/maintenance-page) | Maintenance Page | Intermission notice with ETA. |
| [`cookie-prefs`](https://ui.bigbullapp.com/docs/cookie-prefs) | Cookie Prefs | Granular consent toggles. |
| [`push-permission`](https://ui.bigbullapp.com/docs/push-permission) | Push Permission | Showtime alert opt-in card. |
</details>
<details>
<summary><strong>Navigation</strong> — ways to move between views</summary>

| File | Component | Description |
|---|---|---|
| [`kbd`](https://ui.bigbullapp.com/docs/kbd) | Kbd | Keycap indicator with raised bottom border for shortcuts. |
| [`separator`](https://ui.bigbullapp.com/docs/separator) | Separator | Horizontal or vertical dashed divider. |
| [`section-heading`](https://ui.bigbullapp.com/docs/section-heading) | Section Heading | Theater and arena section divider banner with dashed rules and zone badges. |
| [`sticky-bar`](https://ui.bigbullapp.com/docs/sticky-bar) | Sticky Bar | Floating bottom checkout bar with item counter and admission button. |
| [`resizable`](https://ui.bigbullapp.com/docs/resizable) | Resizable | Splitter layout panels with draggable resize handle, min/max limits and collapse button. |
| [`scroll-area`](https://ui.bigbullapp.com/docs/scroll-area) | Scroll Area | Custom styled scrollable container with customized dashed scrollbar track, thumb indicator, horizontal/vertical support, and perforated top/bottom shadow fades. |
| [`tabs`](https://ui.bigbullapp.com/docs/tabs) | Tabs | Segmented panel switch with roving keyboard focus. |
| [`pagination`](https://ui.bigbullapp.com/docs/pagination) | Pagination | Numbered buttons with ellipsis and page stepping. |
| [`breadcrumb`](https://ui.bigbullapp.com/docs/breadcrumb) | Breadcrumb | Hierarchical trail with slash separators. |
| [`steps`](https://ui.bigbullapp.com/docs/steps) | Steps | Data-driven wizard progression with numbered stamps. |
| [`command-palette`](https://ui.bigbullapp.com/docs/command-palette) | Command Palette | Modal search command palette with keyboard shortcuts, categorization, and filter. |
| [`context-menu`](https://ui.bigbullapp.com/docs/context-menu) | Context Menu | Right-click menu with smooth reveal, shortcuts, and dashed divider. |
| [`scroll-top`](https://ui.bigbullapp.com/docs/scroll-top) | Scroll Top | Floating elevator button that scrolls smoothly to page top. |
| [`menubar`](https://ui.bigbullapp.com/docs/menubar) | Menubar | Theater box office menu bar with dropdown menus, shortcuts, and dashed frames. |
| [`navbar`](https://ui.bigbullapp.com/docs/navbar) | Navbar | Navigation bar with brand monogram and active links. |
| [`tree-nav`](https://ui.bigbullapp.com/docs/tree-nav) | Tree Nav | Hierarchical explorer with collapsible nodes and icons. |
| [`sidebar`](https://ui.bigbullapp.com/docs/sidebar) | Sidebar | Collapsible navigation sidebar drawer with notch cutouts. |
| [`breadcrumb-dropdown`](https://ui.bigbullapp.com/docs/breadcrumb-dropdown) | Breadcrumb Dropdown | Hierarchical route breadcrumb with popover dropdown for intermediate tiers. |
| [`dock`](https://ui.bigbullapp.com/docs/dock) | Dock | Floating application dock bar with hover magnification and active indicators. |
| [`navigation-menu`](https://ui.bigbullapp.com/docs/navigation-menu) | Navigation Menu | Horizontal nav bar whose items reveal an animated panel below with height/fade reveal and sliding indicator. |
| [`divider-with-text`](https://ui.bigbullapp.com/docs/divider-with-text) | Divider With Text | Centered label over dashed separator lines with a line-grow scaleX animation on mount. |
| [`heading`](https://ui.bigbullapp.com/docs/heading) | Heading | Semantic heading with level-based scale, optional mono eyebrow and per-level entrance animation. |
| [`text`](https://ui.bigbullapp.com/docs/text) | Text | Typographic paragraph primitive with default, muted, small, lead and mono variants. |
| [`page-header`](https://ui.bigbullapp.com/docs/page-header) | PageHeader | Page title with stamp entrance, fading description, actions slot and optional mono eyebrow. |
| [`hero`](https://ui.bigbullapp.com/docs/hero) | Hero | Landing hero with accent highlight word, primary/secondary actions and bottom marquee strip. |
| [`footer`](https://ui.bigbullapp.com/docs/footer) | Footer | Site footer with brand monogram, staggered link columns and dashed-top bottom bar. |
| [`cta-section`](https://ui.bigbullapp.com/docs/cta-section) | CtaSection | Double-frame call-to-action band with stamp-seal corner badge and stamping action button. |
| [`speed-dial`](https://ui.bigbullapp.com/docs/speed-dial) | SpeedDial | FAB that fans out mini action buttons in an arc with staggered scale-in when open; Escape closes. |
| [`infinite-scroll`](https://ui.bigbullapp.com/docs/infinite-scroll) | InfiniteScroll | IntersectionObserver sentinel: when visible calls onLoadMore, shows animated loader row; wraps children. |
| [`load-more`](https://ui.bigbullapp.com/docs/load-more) | LoadMore | Button row "LOAD MORE" with progress mono counter; on click reveals hidden children with stagger. |
| [`scroll-shadow`](https://ui.bigbullapp.com/docs/scroll-shadow) | ScrollShadow | Wrapper with top/bottom shadow indicators that fade in only when scrollable in that direction; dashed scrollbar styling. |
| [`jumbotron`](https://ui.bigbullapp.com/docs/jumbotron) | Jumbotron | Oversized scoreboard with pixel-style mono type, scanline sweep and scoreboard slots for home and away. |
| [`tabbar`](https://ui.bigbullapp.com/docs/tabbar) | TabBar | Fixed bottom navigation bar with sliding active indicator pill and badge support |
| [`pager-dots`](https://ui.bigbullapp.com/docs/pager-dots) | PagerDots | Navigation page indicators with active dot that stretches and variant styles |
| [`toc`](https://ui.bigbullapp.com/docs/toc) | Toc | Table of contents with IntersectionObserver scroll-spy and dashed active underline |
| [`app-shell`](https://ui.bigbullapp.com/docs/app-shell) | AppShell | Page skeleton with top bar, collapsible sidebar, and main content area with built-in skip-link |
| [`skip-link`](https://ui.bigbullapp.com/docs/skip-link) | SkipLink | Accessibility skip-link that becomes visible on keyboard focus with translate animation |
| [`back-link`](https://ui.bigbullapp.com/docs/back-link) | BackLink | Chevron button with label that slides on hover, with focus ring |
| [`flyout-menu`](https://ui.bigbullapp.com/docs/flyout-menu) | FlyoutMenu | Hover dropdown menu with scale-in origin-top panel and keyboard navigation |
| [`scroll-spy-nav`](https://ui.bigbullapp.com/docs/scroll-spy-nav) | ScrollSpyNav | Horizontal sticky navigation with active pill that slides under the active section, smooth scroll with reduced-motion fallback |
| [`admin-shell`](https://ui.bigbullapp.com/docs/admin-shell) | Admin Shell | Admin panel skeleton: collapsible sidebar nav, top bar, content area. |
| [`sticky-footer`](https://ui.bigbullapp.com/docs/sticky-footer) | Sticky Footer | Sticky bottom bar that stays visible during scroll. |
| [`hero-split`](https://ui.bigbullapp.com/docs/hero-split) | Hero Split | Split hero: left text block and right framed visual slot. |
| [`footer-minimal`](https://ui.bigbullapp.com/docs/footer-minimal) | Footer Minimal | Single-row minimal footer: brand, links, copyright. |
| [`responsive-nav`](https://ui.bigbullapp.com/docs/responsive-nav) | Responsive Nav | Auto-switching nav: desktop horizontal links, mobile hamburger panel. |
| [`keyboard-nav-helper`](https://ui.bigbullapp.com/docs/keyboard-nav-helper) | Keyboard Nav Helper | Keyboard shortcut overlay opened with the ? key. |
| [`wizard`](https://ui.bigbullapp.com/docs/wizard) | Wizard | Multi-step wizard with validation shake, progress markers and summary. |
| [`mega-menu`](https://ui.bigbullapp.com/docs/mega-menu) | Mega Menu | Full-width mega menu with columns, links and featured box. |
| [`footer-nav`](https://ui.bigbullapp.com/docs/footer-nav) | Footer Nav | Site-map footer with link columns. |
| [`anchor-nav`](https://ui.bigbullapp.com/docs/anchor-nav) | Anchor Nav | Sticky section anchor nav with IntersectionObserver spy. |
| [`quick-actions`](https://ui.bigbullapp.com/docs/quick-actions) | Quick Actions | Quick action toolbar with shortcuts and danger variants. |
| [`history-nav`](https://ui.bigbullapp.com/docs/history-nav) | History Nav | Back/forward history strip with breadcrumb entries. |
| [`page-tabs`](https://ui.bigbullapp.com/docs/page-tabs) | Page Tabs | In-page tabs synced to URL query parameter. |
| [`mobile-menu`](https://ui.bigbullapp.com/docs/mobile-menu) | Mobile Menu | Full-screen mobile menu with staggered link entrance. |
| [`sidebar-v2`](https://ui.bigbullapp.com/docs/sidebar-v2) | Sidebar V2 | Two-level collapsible sidebar v2. |
| [`flyout-v2`](https://ui.bigbullapp.com/docs/flyout-v2) | Flyout V2 | Hover flyout menu v2 with keyboard support. |
| [`scroll-spy-v2`](https://ui.bigbullapp.com/docs/scroll-spy-v2) | Scroll Spy V2 | Horizontal scroll-spy nav v2 with sliding active pill. |
| [`pagination-v2`](https://ui.bigbullapp.com/docs/pagination-v2) | Pagination V2 | Hybrid pagination: numbered plus infinite scroll trigger. |
| [`route-loader`](https://ui.bigbullapp.com/docs/route-loader) | Route Loader | Minimal top progress loader bar with smooth transit animation. |
| [`sidebar-layout`](https://ui.bigbullapp.com/docs/sidebar-layout) | Sidebar Layout | Sticky sidebar plus fluid content layout. |
| [`tabbar-v2`](https://ui.bigbullapp.com/docs/tabbar-v2) | Tabbar V2 | Bottom tabs with badges. |
| [`onboarding-pager`](https://ui.bigbullapp.com/docs/onboarding-pager) | Onboarding Pager | Dotted pager with prev next. |
| [`shift-planner`](https://ui.bigbullapp.com/docs/shift-planner) | Shift Planner | Staff shift board with claims. |
| [`booking-calendar`](https://ui.bigbullapp.com/docs/booking-calendar) | Booking Calendar | Month grid with booked stamps. |
| [`countdown-v2`](https://ui.bigbullapp.com/docs/countdown-v2) | Countdown V2 | Flip card live countdown. |
| [`timeline-gantt`](https://ui.bigbullapp.com/docs/timeline-gantt) | Timeline Gantt | Show timeline bar grid. |
| [`recurrence-picker`](https://ui.bigbullapp.com/docs/recurrence-picker) | Recurrence Picker | Rule picker with weekday stamps. |
| [`sticky-split`](https://ui.bigbullapp.com/docs/sticky-split) | Sticky Split | Two-pane frame with sticky rail. |
| [`dockable-panels`](https://ui.bigbullapp.com/docs/dockable-panels) | Dockable Panels | Toggleable panels around a stage. |
| [`path-breadcrumb`](https://ui.bigbullapp.com/docs/path-breadcrumb) | Path Breadcrumb | File-path trail with separators. |
| [`master-detail`](https://ui.bigbullapp.com/docs/master-detail) | Master Detail | List pane with detail pane. |
| [`holy-grail`](https://ui.bigbullapp.com/docs/holy-grail) | Holy Grail | Header footer nav content aside shell. |
| [`split-view`](https://ui.bigbullapp.com/docs/split-view) | Split View | Draggable divider two-pane layout. |
| [`sitemap-list`](https://ui.bigbullapp.com/docs/sitemap-list) | Sitemap List | Grouped link columns. |
| [`keyboard-shortcuts`](https://ui.bigbullapp.com/docs/keyboard-shortcuts) | Keyboard Shortcuts | Action rows with keycaps. |
| [`command-k-root`](https://ui.bigbullapp.com/docs/command-k-root) | Command K Root | Filterable command launcher. |
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

- Documentation: https://ui.bigbullapp.com
- npm: https://www.npmjs.com/package/bigbullui
- Issues: https://github.com/F0Rextasy/bigbullui/issues
