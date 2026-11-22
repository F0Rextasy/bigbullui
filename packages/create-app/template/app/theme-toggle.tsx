"use client";

import * as React from "react";

export function ThemeToggle() {
  const [dark, setDark] = React.useState(false);

  const toggle = () => {
    const next = document.documentElement.classList.toggle("dark");
    setDark(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={dark}
      style={{
        padding: "6px 12px",
        borderRadius: 6,
        border: "1px dashed var(--border)",
        background: "transparent",
        color: "var(--foreground)",
        fontFamily: "var(--font-mono)",
        fontSize: 12,
        cursor: "pointer",
      }}
    >
      {dark ? "Light theme" : "Dark theme"}
    </button>
  );
}
