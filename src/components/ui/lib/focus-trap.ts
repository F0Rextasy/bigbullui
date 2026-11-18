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
    "object[data]",
    "embed",
    "iframe",
  ].join(",");

  const elements = container.querySelectorAll(focusableSelector);

  return Array.from(elements).filter((el): el is HTMLElement => {
    if (!(el instanceof HTMLElement) || el.tabIndex < 0) return false;
    if (el.closest("[hidden], [inert], fieldset:disabled")) return false;
    if (typeof window !== "undefined") {
      const style = window.getComputedStyle(el);
      if (style.display === "none" || style.visibility === "hidden") return false;
    }
    return true;
  });
}

export function trapFocus(
  container: HTMLElement,
  event: KeyboardEvent,
): void {
  if (!event || event.key !== "Tab") return;

  const focusables = getFocusable(container);
  const firstFocusable = focusables[0];
  const lastFocusable = focusables[focusables.length - 1];

  if (!firstFocusable || !lastFocusable) return;

  const active = document.activeElement;
  const isOutside = !active || active === container || !container.contains(active);

  if (event.shiftKey) {
    if (active === firstFocusable || isOutside) {
      event.preventDefault();
      lastFocusable.focus();
    }
  } else {
    if (active === lastFocusable || isOutside) {
      event.preventDefault();
      firstFocusable.focus();
    }
  }
}

let scrollLockCount = 0;
let previousBodyOverflow = "";

/** Reference-counted scroll lock safe for nested modals/drawers. */
export function lockBodyScroll(): () => void {
  if (typeof document === "undefined") return () => {};
  if (scrollLockCount === 0) {
    previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
  }
  scrollLockCount += 1;
  let released = false;
  return () => {
    if (released) return;
    released = true;
    scrollLockCount = Math.max(0, scrollLockCount - 1);
    if (scrollLockCount === 0) {
      document.body.style.overflow = previousBodyOverflow;
    }
  };
}

const escapeLayers: Array<() => void> = [];
let escapeBound = false;

function handleLayerEscape(event: KeyboardEvent) {
  if (event.key !== "Escape" || escapeLayers.length === 0) return;
  event.preventDefault();
  const top = escapeLayers[escapeLayers.length - 1];
  top?.();
}

/** Registers a topmost-only Escape dismiss handler for nested overlays. */
export function registerEscapeLayer(onEscape: () => void): () => void {
  if (typeof document === "undefined") return () => {};
  const handler = onEscape;
  escapeLayers.push(handler);
  if (!escapeBound) {
    escapeBound = true;
    document.addEventListener("keydown", handleLayerEscape);
  }
  return () => {
    const idx = escapeLayers.lastIndexOf(handler);
    if (idx !== -1) escapeLayers.splice(idx, 1);
    if (escapeLayers.length === 0 && escapeBound) {
      escapeBound = false;
      document.removeEventListener("keydown", handleLayerEscape);
    }
  };
}
