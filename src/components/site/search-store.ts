"use client";

import * as React from "react";

let open = false;
let host: symbol | null = null;
const subs = new Set<() => void>();
let keyBound = false;
let cached: { open: boolean; host: symbol | null } = { open: false, host: null };

function emit() {
  cached = { open, host };
  subs.forEach((fn) => fn());
}

export function setSearchOpen(v: boolean) {
  if (open !== v) {
    open = v;
    emit();
  }
}

function claimHost(id: symbol) {
  if (host === null) {
    host = id;
    emit();
  }
}

function releaseHost(id: symbol) {
  if (host === id) {
    host = null;
    emit();
  }
}

function onKey(event: KeyboardEvent) {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    setSearchOpen(!open);
  }
}

function subscribe(fn: () => void): () => void {
  subs.add(fn);
  return () => {
    subs.delete(fn);
  };
}

function snapshot(): { open: boolean; host: symbol | null } {
  return cached;
}

export function useSearchPalette(): {
  open: boolean;
  setOpen: (v: boolean) => void;
  isHost: boolean;
} {
  const id = React.useMemo(() => Symbol("docs-search"), []);
  const state = React.useSyncExternalStore(subscribe, snapshot, snapshot);
  React.useEffect(() => {
    claimHost(id);
    if (!keyBound) {
      keyBound = true;
      document.addEventListener("keydown", onKey);
    }
    return () => {
      releaseHost(id);
    };
  }, [id]);
  return { open: state.open, setOpen: setSearchOpen, isHost: state.host === id };
}

export function useSearchOpen(): [boolean, (v: boolean) => void] {
  const { open, setOpen } = useSearchPalette();
  return [open, setOpen];
}
