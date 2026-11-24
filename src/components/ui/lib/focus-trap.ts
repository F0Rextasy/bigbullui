export function getFocusable(container: HTMLElement): HTMLElement[] {
  const focusableSelector = [
    "a[href]",
    "area[href]",
    'input:not([disabled]):not([type="hidden"])',
    "select:not([disabled])",
    "textarea:not([disabled])",
    "button:not([disabled])",
    "details > summary",
    "audio[controls]",
    "video[controls]",
    '[tabindex]:not([tabindex="-1"])',
    '[contenteditable="true"]',
    '[contenteditable=""]',
    "object[data]",
    "embed",
    "iframe",
  ].join(",");

  const elements = container.querySelectorAll(focusableSelector);

  return Array.from(elements).filter((el): el is HTMLElement => {
    if (!(el instanceof HTMLElement) || el.tabIndex < 0) return false;
    if (el.closest("[hidden], [inert]")) return false;
    const disabledFieldset = el.closest("fieldset:disabled");
    if (disabledFieldset) {
      const firstLegend = disabledFieldset.querySelector(":scope > legend");
      if (!firstLegend || !firstLegend.contains(el)) return false;
    }
    const closedDetails = el.closest("details:not([open])");
    if (closedDetails) {
      const summary = closedDetails.querySelector(":scope > summary");
      if (!summary || !summary.contains(el)) return false;
    }
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

  if (!firstFocusable || !lastFocusable) {
    event.preventDefault();
    container.focus();
    return;
  }

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
let previousBodyPaddingRight = "";
let previousHtmlOverscroll = "";

/** Reference-counted scroll lock safe for nested modals/drawers without horizontal layout shift. */
export function lockBodyScroll(): () => void {
  if (typeof document === "undefined") return () => {};
  if (scrollLockCount === 0) {
    previousBodyOverflow = document.body.style.overflow;
    previousBodyPaddingRight = document.body.style.paddingRight;
    previousHtmlOverscroll = document.documentElement.style.overscrollBehavior;
    const scrollbarWidth =
      typeof window !== "undefined"
        ? window.innerWidth - document.documentElement.clientWidth
        : 0;
    if (scrollbarWidth > 0) {
      const computedPadding = parseFloat(window.getComputedStyle(document.body).paddingRight) || 0;
      document.body.style.paddingRight = `${computedPadding + scrollbarWidth}px`;
    }
    document.body.style.overflow = "hidden";
    document.documentElement.style.overscrollBehavior = "contain";
  }
  scrollLockCount += 1;
  let released = false;
  return () => {
    if (released) return;
    released = true;
    scrollLockCount = Math.max(0, scrollLockCount - 1);
    if (scrollLockCount === 0) {
      document.body.style.overflow = previousBodyOverflow;
      document.body.style.paddingRight = previousBodyPaddingRight;
      document.documentElement.style.overscrollBehavior = previousHtmlOverscroll;
    }
  };
}

const inertCounts = new WeakMap<Element, number>();

/** Marks sibling root elements inert while a modal overlay is open (safe for nested modals). */
export function hideBackgroundSiblings(overlayEl: HTMLElement | null): () => void {
  if (typeof document === "undefined" || !overlayEl) return () => {};
  let rootNode: Element = overlayEl;
  while (rootNode.parentElement && rootNode.parentElement !== document.body) {
    rootNode = rootNode.parentElement;
  }
  if (rootNode.parentElement !== document.body) return () => {};

  const marked: Element[] = [];
  for (const child of Array.from(document.body.children)) {
    if (child === rootNode) continue;
    const tag = child.tagName;
    if (tag === "SCRIPT" || tag === "STYLE" || tag === "LINK" || tag === "NEXT-ROUTE-ANNOUNCER") {
      continue;
    }
    const prev = inertCounts.get(child) ?? 0;
    if (prev === 0 && !child.hasAttribute("inert")) {
      child.setAttribute("inert", "");
      child.setAttribute("data-bigbull-inert", "true");
    }
    inertCounts.set(child, prev + 1);
    marked.push(child);
  }

  let released = false;
  return () => {
    if (released) return;
    released = true;
    for (const child of marked) {
      const next = Math.max(0, (inertCounts.get(child) ?? 1) - 1);
      if (next === 0) {
        inertCounts.delete(child);
        if (child.getAttribute("data-bigbull-inert") === "true") {
          child.removeAttribute("inert");
          child.removeAttribute("data-bigbull-inert");
        }
      } else {
        inertCounts.set(child, next);
      }
    }
  };
}

const escapeLayers: Array<() => void> = [];
let escapeBound = false;

function handleLayerEscape(event: KeyboardEvent) {
  if (
    event.defaultPrevented ||
    event.isComposing ||
    event.key !== "Escape" ||
    escapeLayers.length === 0
  ) {
    return;
  }
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
