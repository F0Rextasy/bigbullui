export function getFocusable(container: HTMLElement): HTMLElement[] {
  const focusableSelector = [
    "a[href]",
    "area[href]",
    'input:not([disabled]):not([type="hidden"])',
    "select:not([disabled])",
    "textarea:not([disabled])",
    "button:not([disabled])",
    '[tabindex]:not([tabindex="-1"])',
    '[contenteditable="true"]',
    "object[href]",
    "embed",
    "iframe",
  ].join(",");

  const elements = container.querySelectorAll(focusableSelector);

  return Array.from(elements).filter(
    (el): el is HTMLElement => el instanceof HTMLElement && el.tabIndex >= 0 && !el.hasAttribute("tabDisable"),
  );
}

export function trapFocus(
  container: HTMLElement,
  event: KeyboardEvent,
): void {
  const focusables = getFocusable(container);
  const firstFocusable = focusables[0];
  const lastFocusable = focusables[focusables.length - 1];

  if (!firstFocusable || !lastFocusable) return;

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key !== "Tab") return;

    const active = document.activeElement;
    const isOutside = !active || active === container || !container.contains(active);

    if (e.shiftKey) {
      if (active === firstFocusable || isOutside) {
        e.preventDefault();
        lastFocusable.focus();
      }
    } else {
      if (active === lastFocusable || isOutside) {
        e.preventDefault();
        firstFocusable.focus();
      }
    }
  };

  if (event && event.key === "Tab") {
    handleKeydown(event);
  }
}
