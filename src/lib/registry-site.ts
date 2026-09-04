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
  { name: "comet-button", title: "Comet Button", description: "Cursor-tracking glare with a light sweep on hover — our signature button." },
];
