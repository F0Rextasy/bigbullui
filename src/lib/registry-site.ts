export type ComponentCategory = "form" | "display" | "feedback" | "navigation";

export type ComponentMeta = {
  name: string;
  title: string;
  description: string;
  category: ComponentCategory;
};

export const categories: { id: ComponentCategory; name: string; description: string }[] = [
  { id: "form", name: "Form", description: "Inputs, pickers, toggles and tactile controls." },
  { id: "display", name: "Display", description: "Surfaces, badges, ticket stubs and data frames." },
  { id: "feedback", name: "Feedback", description: "Overlays, notices, sheets and loading states." },
  { id: "navigation", name: "Navigation", description: "Tabs, steps, breadcrumbs, menus and timers." },
];

export const components: ComponentMeta[] = [
  // Form (14)
  { name: "button", title: "Button", description: "Animated button with tactile hover and stamp focus.", category: "form" },
  { name: "input", title: "Input", description: "Text input with dashed focus border and design tokens.", category: "form" },
  { name: "textarea", title: "Textarea", description: "Multi-line text area matching Input styling.", category: "form" },
  { name: "checkbox", title: "Checkbox", description: "Crisp checkbox with bold checked states.", category: "form" },
  { name: "switch", title: "Switch", description: "Two-state toggle switch with sliding thumb.", category: "form" },
  { name: "radio-group", title: "Radio Group", description: "Accessible single-select radio button set.", category: "form" },
  { name: "slider", title: "Slider", description: "Draggable value slider with chunky thumb.", category: "form" },
  { name: "select", title: "Select", description: "Custom dashed listbox dropdown with keyboard navigation.", category: "form" },
  { name: "stepper", title: "Stepper", description: "Increment and decrement buttons with mono readout.", category: "form" },
  { name: "pin-input", title: "Pin Input", description: "Segmented single-character boxes for codes and OTP.", category: "form" },
  { name: "rating", title: "Rating", description: "Interactive star rating with live hover preview.", category: "form" },
  { name: "copy-button", title: "Copy Button", description: "Tactile button with clipboard feedback and check state.", category: "form" },
  { name: "search-bar", title: "Search Bar", description: "Dashed search field with shortcut keycap and clear action.", category: "form" },
  { name: "combobox", title: "Combobox", description: "Filterable searchable dropdown with instant keyboard filter.", category: "form" },
  { name: "file-dropzone", title: "File Dropzone", description: "Drag-and-drop ticket stub upload zone with dashed borders and file preview.", category: "form" },
  { name: "color-picker", title: "Color Picker", description: "Palette swatch picker with ticket stub framing and active stamp mark.", category: "form" },
  { name: "password-strength", title: "Password Strength", description: "Segmented security verification meter with animated strength bars and criteria checklist.", category: "form" },
  { name: "inline-edit", title: "Inline Edit", description: "Click-to-edit ticket field with focus outline, animated save pulse, and cancel action.", category: "form" },

  // Display (20)
  { name: "ticket-card", title: "Ticket Card", description: "Complete admission ticket stub with perforation notches and seat details.", category: "display" },
  { name: "coupon", title: "Coupon", description: "Discount coupon with scissor cutout lines and promo code copy.", category: "display" },
  { name: "boarding-pass", title: "Boarding Pass", description: "Aviation flight ticket with origin, destination, and receipt stub.", category: "display" },
  { name: "price-tag", title: "Price Tag", description: "Stub price tag with eyelet string hole and sale stamp.", category: "display" },
  { name: "luggage-tag", title: "Luggage Tag", description: "Baggage claim stub with handle loop and destination code.", category: "display" },
  { name: "barcode", title: "Barcode", description: "Dynamic SVG barcode with mono serial readout.", category: "display" },
  { name: "stamp-seal", title: "Stamp Seal", description: "Rotated rubber stamp badge with double dashed circular ring.", category: "display" },
  { name: "card", title: "Card", description: "Double-frame surface container with header, content, and footer.", category: "display" },
  { name: "badge", title: "Badge", description: "Micro status pill with subtle entrance transition.", category: "display" },
  { name: "avatar", title: "Avatar", description: "Initials or photo badge with dashed ring.", category: "display" },
  { name: "progress", title: "Progress", description: "Marching striped progress indicator bar.", category: "display" },
  { name: "kbd", title: "Kbd", description: "Keycap indicator with raised bottom border for shortcuts.", category: "display" },
  { name: "separator", title: "Separator", description: "Horizontal or vertical dashed divider.", category: "display" },
  { name: "table", title: "Table", description: "Data table with dashed row dividers and mono headers.", category: "display" },
  { name: "marquee", title: "Marquee", description: "Smooth ticker reel that pauses on hover.", category: "display" },
  { name: "timeline", title: "Timeline", description: "Vertical chronological events with dashed connection stem.", category: "display" },
  { name: "sparkline", title: "Sparkline", description: "Lightweight SVG trend sparkline with animated end-point.", category: "display" },
  { name: "bar-chart", title: "Bar Chart", description: "Mini data bar chart with dashed guideline grids and hover zoom.", category: "display" },
  { name: "calendar", title: "Calendar", description: "Ticket-dated month calendar with date selection, month navigation, and today indicator.", category: "display" },
  { name: "data-table", title: "Data Table", description: "Sortable, searchable ticket registry table with row selection, animated arrows, and pagination.", category: "display" },

  // Feedback (11)
  { name: "alert", title: "Alert", description: "Notice box with tone bar and status eyebrow.", category: "feedback" },
  { name: "tooltip", title: "Tooltip", description: "Floating helper tooltip on hover and keyboard focus.", category: "feedback" },
  { name: "dialog", title: "Dialog", description: "Accessible modal dialog with focus trap and scale animation.", category: "feedback" },
  { name: "toast", title: "Toast", description: "Transient stacked notices with auto-dismiss.", category: "feedback" },
  { name: "sheet", title: "Sheet", description: "Slide-over drawer panel with focus trap and scroll lock.", category: "feedback" },
  { name: "popover", title: "Popover", description: "Floating content panel anchored to an interactive trigger.", category: "feedback" },
  { name: "empty", title: "Empty", description: "Perforated placeholder box for zero-state views.", category: "feedback" },
  { name: "spinner", title: "Spinner", description: "Rotary loading indicator with dashed track and stamp accent.", category: "feedback" },
  { name: "skeleton", title: "Skeleton", description: "Dashed placeholder box with gentle pulse animation.", category: "feedback" },
  { name: "cookie-banner", title: "Cookie Banner", description: "Fixed privacy consent banner with accept/decline ticket stubs.", category: "feedback" },
  { name: "confetti-burst", title: "Confetti Burst", description: "CSS celebration burst with stamp-colored ticket stubs flying outward.", category: "feedback" },

  // Navigation (11)
  { name: "tabs", title: "Tabs", description: "Segmented panel switch with roving keyboard focus.", category: "navigation" },
  { name: "accordion", title: "Accordion", description: "Collapsible disclosure items with smooth height transitions.", category: "navigation" },
  { name: "pagination", title: "Pagination", description: "Numbered buttons with ellipsis and page stepping.", category: "navigation" },
  { name: "breadcrumb", title: "Breadcrumb", description: "Hierarchical trail with slash separators.", category: "navigation" },
  { name: "steps", title: "Steps", description: "Data-driven wizard progression with numbered stamps.", category: "navigation" },
  { name: "toggle-group", title: "Toggle Group", description: "Single-choice segmented control with roving tabindex.", category: "navigation" },
  { name: "dropdown-menu", title: "Dropdown Menu", description: "Popup actions menu with keyboard shortcuts and items.", category: "navigation" },
  { name: "countdown", title: "Countdown", description: "Live ticking event timer with segmented cards.", category: "navigation" },
  { name: "command-palette", title: "Command Palette", description: "Modal search command palette with keyboard shortcuts, categorization, and filter.", category: "navigation" },
  { name: "context-menu", title: "Context Menu", description: "Right-click ticket menu with smooth reveal, shortcuts, and dashed divider.", category: "navigation" },
  { name: "scroll-top", title: "Scroll Top", description: "Floating ticket elevator button with jumping chevron that scrolls smoothly to page top.", category: "navigation" },
];
