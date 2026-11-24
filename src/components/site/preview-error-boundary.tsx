"use client";

import * as React from "react";

type State = { hasError: boolean; message: string };

export class PreviewErrorBoundary extends React.Component<
  { children: React.ReactNode; resetKey?: string | number },
  State
> {
  state: State = { hasError: false, message: "" };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error?.message || "Preview failed to render" };
  }

  componentDidUpdate(prevProps: { resetKey?: string | number }) {
    if (prevProps.resetKey !== this.props.resetKey && this.state.hasError) {
      this.setState({ hasError: false, message: "" });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          className="flex flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed border-destructive/60 bg-card p-6 text-center"
        >
          <p className="font-mono text-xs font-bold uppercase text-destructive">Preview crashed</p>
          <p className="max-w-md font-mono text-[11px] text-muted-foreground">{this.state.message}</p>
          <button
            type="button"
            onClick={() => this.setState({ hasError: false, message: "" })}
            className="mt-1 cursor-pointer rounded border border-border bg-background px-3 py-1 font-mono text-[11px] uppercase text-foreground hover:border-foreground"
          >
            Retry preview
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
