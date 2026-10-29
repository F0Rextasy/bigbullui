export type ComponentCategory =
  | "ticket-stub"
  | "form"
  | "pickers"
  | "charts"
  | "data"
  | "feedback"
  | "navigation"
  | "editors"
  | "media";

export type ComponentMeta = {
  name: string;
  title: string;
  description: string;
  category: ComponentCategory;
  isNew?: boolean;
  related?: string[];
  /**
   * Lifecycle status. Default (absent) means stable.
   * experimental: new API, may change. deprecated: do not use in new code,
   * removed after two minor versions with a migration note in the changelog.
   */
  status?: "stable" | "experimental" | "deprecated";
};

export const categories: { id: ComponentCategory; name: string; description: string }[] = [
  { id: "ticket-stub", name: "Ticket Stub & Retro", description: "Tickets, stubs, coupons, passes, split-flap, and tactile mechanical controls." },
  { id: "form", name: "Core Form & Inputs", description: "Buttons, text inputs, checkboxes, toggles, switches, and sliders." },
  { id: "pickers", name: "Pickers & Selectors", description: "Date, color, time, country, currency, file dropzone, and complex pickers." },
  { id: "charts", name: "Charts & Visualization", description: "Bar, line, bubble, sunburst, sparkline, radar, and data visualizations." },
  { id: "data", name: "Data Display & Tables", description: "Tables, data grids, metric cards, stat tiles, accordions, and bento layouts." },
  { id: "feedback", name: "Feedback & Overlays", description: "Dialogs, sheets, alerts, toasts, callouts, and status badges." },
  { id: "navigation", name: "Navigation & Menus", description: "Tabs, breadcrumbs, steppers, menubars, pagination, command palette, and shells." },
  { id: "editors", name: "Editors & DevTools", description: "Code, markdown, diff, JSON editors, regex tester, cron builder, and console." },
  { id: "media", name: "Media & Interactive", description: "Audio players, waveforms, video frames, lightboxes, and social cards." },
];
