"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface TransferItem {
  id: string;
  label: string;
  badge?: string;
}

export interface TransferListProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  leftTitle?: string;
  rightTitle?: string;
  leftItems?: TransferItem[];
  rightItems?: TransferItem[];
  onChange?: (left: TransferItem[], right: TransferItem[]) => void;
  className?: string;
}

export function TransferList({
  leftTitle = "AVAILABLE TICKETS",
  rightTitle = "CLAIMED STUBS",
  leftItems: initialLeft = [
    { id: "1", label: "Seat A-12", badge: "VIP" },
    { id: "2", label: "Seat A-14", badge: "VIP" },
    { id: "3", label: "Seat B-02", badge: "ORCH" },
    { id: "4", label: "Seat C-09", badge: "BALC" },
  ],
  rightItems: initialRight = [],
  onChange,
  className,
  ...props
}: TransferListProps) {
  const [left, setLeft] = React.useState<TransferItem[]>(initialLeft);
  const [right, setRight] = React.useState<TransferItem[]>(initialRight);
  const [leftSelected, setLeftSelected] = React.useState<string[]>([]);
  const [rightSelected, setRightSelected] = React.useState<string[]>([]);

  const moveToRight = () => {
    const toMove = left.filter((i) => leftSelected.includes(i.id));
    const newLeft = left.filter((i) => !leftSelected.includes(i.id));
    const newRight = [...right, ...toMove];
    setLeft(newLeft);
    setRight(newRight);
    setLeftSelected([]);
    onChange?.(newLeft, newRight);
  };

  const moveToLeft = () => {
    const toMove = right.filter((i) => rightSelected.includes(i.id));
    const newRight = right.filter((i) => !rightSelected.includes(i.id));
    const newLeft = [...left, ...toMove];
    setLeft(newLeft);
    setRight(newRight);
    setRightSelected([]);
    onChange?.(newLeft, newRight);
  };

  const moveAllToRight = () => {
    const newRight = [...right, ...left];
    setLeft([]);
    setRight(newRight);
    setLeftSelected([]);
    onChange?.([], newRight);
  };

  const moveAllToLeft = () => {
    const newLeft = [...left, ...right];
    setRight([]);
    setLeft(newLeft);
    setRightSelected([]);
    onChange?.(newLeft, []);
  };

  const renderColumn = (
    title: string,
    items: TransferItem[],
    selected: string[],
    setSelected: React.Dispatch<React.SetStateAction<string[]>>
  ) => (
    <div className="flex-1 rounded-xl border-2 border-foreground bg-card p-3 shadow-xs">
      <div className="flex items-center justify-between border-b-2 border-dashed border-border pb-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          {title}
        </span>
        <span className="rounded-xs bg-secondary px-1.5 py-0.5 text-[9px] font-bold text-foreground">
          {items.length}
        </span>
      </div>

      <div className="mt-2 min-h-[140px] space-y-1 overflow-y-auto">
        {items.length === 0 ? (
          <div className="flex h-28 items-center justify-center text-[10px] text-muted-foreground uppercase">
            NO TICKETS
          </div>
        ) : (
          items.map((item) => {
            const isChecked = selected.includes(item.id);
            return (
              <div
                key={item.id}
                onClick={() =>
                  setSelected((prev) =>
                    prev.includes(item.id)
                      ? prev.filter((id) => id !== item.id)
                      : [...prev, item.id]
                  )
                }
                className={cn(
                  "flex cursor-pointer items-center justify-between rounded-md px-2.5 py-1.5 text-xs transition-colors",
                  isChecked ? "bg-accent text-accent-foreground font-bold" : "hover:bg-secondary text-foreground"
                )}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className={cn("text-[9px] uppercase tracking-wider", isChecked ? "text-accent-foreground opacity-90" : "text-muted-foreground")}>
                    [{item.badge}]
                  </span>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );

  return (
    <div className={cn("flex flex-col sm:flex-row items-center gap-3 w-full max-w-lg font-mono select-none", className)} {...props}>
      {renderColumn(leftTitle, left, leftSelected, setLeftSelected)}

      {/* Control Buttons */}
      <div className="flex sm:flex-col gap-1.5">
        <button
          type="button"
          disabled={left.length === 0}
          onClick={moveAllToRight}
          className="size-7 rounded-sm border border-border bg-card flex items-center justify-center text-xs font-bold hover:bg-foreground hover:text-background disabled:opacity-40 cursor-pointer transition-colors"
          title="Move all right"
        >
          ≫
        </button>
        <button
          type="button"
          disabled={leftSelected.length === 0}
          onClick={moveToRight}
          className="size-7 rounded-sm border border-border bg-card flex items-center justify-center text-xs font-bold hover:bg-foreground hover:text-background disabled:opacity-40 cursor-pointer transition-colors"
          title="Move selected right"
        >
          &gt;
        </button>
        <button
          type="button"
          disabled={rightSelected.length === 0}
          onClick={moveToLeft}
          className="size-7 rounded-sm border border-border bg-card flex items-center justify-center text-xs font-bold hover:bg-foreground hover:text-background disabled:opacity-40 cursor-pointer transition-colors"
          title="Move selected left"
        >
          &lt;
        </button>
        <button
          type="button"
          disabled={right.length === 0}
          onClick={moveAllToLeft}
          className="size-7 rounded-sm border border-border bg-card flex items-center justify-center text-xs font-bold hover:bg-foreground hover:text-background disabled:opacity-40 cursor-pointer transition-colors"
          title="Move all left"
        >
          ≪
        </button>
      </div>

      {renderColumn(rightTitle, right, rightSelected, setRightSelected)}
    </div>
  );
}
