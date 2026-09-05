export function getFocusable(container: HTMLElement): HTMLElement[] {
  const focusableSelector = [
    "a[href]",
    "area[href]",
    "input:not([disabled])",
    "select:not([disabled])",
    "textarea:not([disabled])",
    "button:not([disabled])",
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

    if (e.shiftKey) {
      // Shift + Tab - move to previous
      if (document.activeElement === firstFocusable) {
        e.preventDefault();
        lastFocusable.focus();
      }
    } else {
      // Tab - move to next
      if (document.activeElement === lastFocusable) {
        e.preventDefault();
        firstFocusable.focus();
      }
    }
  };

  if (event && event.key === "Tab") {
    handleKeydown(event);
  }
}