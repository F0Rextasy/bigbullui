"use client";

import * as React from "react";

/** Keeps an overlay/element mounted long enough for exit CSS transitions/animations to finish. */
export function usePresence(
  present: boolean,
  nodeRef: React.RefObject<HTMLElement | null>,
): { isMounted: boolean; state: "open" | "closed" } {
  const [mounted, setMounted] = React.useState(present);

  React.useEffect(() => {
    if (present) {
      const id = setTimeout(() => setMounted(true), 0);
      return () => clearTimeout(id);
    }

    const node = nodeRef.current;
    if (!node || typeof window === "undefined") {
      const id = setTimeout(() => setMounted(false), 0);
      return () => clearTimeout(id);
    }

    const reducedMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      const id = setTimeout(() => setMounted(false), 0);
      return () => clearTimeout(id);
    }

    const style = window.getComputedStyle(node);
    const hasAnim =
      (style.animationName && style.animationName !== "none" && parseFloat(style.animationDuration) > 0) ||
      (style.transitionDuration && parseFloat(style.transitionDuration) > 0);

    if (!hasAnim) {
      const id = setTimeout(() => setMounted(false), 0);
      return () => clearTimeout(id);
    }

    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      setMounted(false);
    };
    node.addEventListener("animationend", finish, { once: true });
    node.addEventListener("transitionend", finish, { once: true });
    const fallback = setTimeout(finish, 350);

    return () => {
      clearTimeout(fallback);
      node.removeEventListener("animationend", finish);
      node.removeEventListener("transitionend", finish);
    };
  }, [present, nodeRef]);

  return { isMounted: present || mounted, state: present ? "open" : "closed" };
}
