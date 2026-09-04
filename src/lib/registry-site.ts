export type ComponentMeta = {
  name: string;
  title: string;
  description: string;
};

export const components: ComponentMeta[] = [
  { name: "button", title: "Button", description: "Animated button with variants and tactile hover feedback." },
  { name: "input", title: "Input", description: "Text input with focus ring and consistent design tokens." },
  { name: "card", title: "Card", description: "Surface container with header, content, and footer sections." },
  { name: "badge", title: "Badge", description: "Small status label with a gentle entrance animation." },
  { name: "accordion", title: "Accordion", description: "Disclosure component with smooth height animation." },
  { name: "dialog", title: "Dialog", description: "Modal window with focus trap and scale animation." },
  { name: "tabs", title: "Tabs", description: "Switch between panels with keyboard navigation." },
  { name: "tooltip", title: "Tooltip", description: "Small informational popup on hover and focus." },
  { name: "switch", title: "Switch", description: "Toggle between two states with a ticket-stub switch." },
  { name: "checkbox", title: "Checkbox", description: "Stamp-box checkbox with checked states." },
  { name: "radio-group", title: "Radio Group", description: "Single-select options with native radio behavior." },
  { name: "slider", title: "Slider", description: "Draggable value slider with ticket styling." },
  { name: "progress", title: "Progress", description: "Ticket-tape striped progress bar." },
  { name: "avatar", title: "Avatar", description: "Initials or photo avatar with perforated ring." },
  { name: "alert", title: "Alert", description: "Stamped notice with tone bar and eyebrow." },
  { name: "textarea", title: "Textarea", description: "Dashed mono textarea matching Input." },
];
