"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface DockContextValue {
  mouseX: number | null;
  mouseY: number | null;
  orientation: "horizontal" | "vertical";
  direction: "bottom" | "top" | "left" | "right";
  magnification: number;
  distance: number;
  iconSize: number;
  magnify: boolean;
}

const DockContext = React.createContext<DockContextValue>({
  mouseX: null,
  mouseY: null,
  orientation: "horizontal",
  direction: "bottom",
  magnification: 1.45,
  distance: 130,
  iconSize: 44,
  magnify: true,
});

export function useDock() {
  return React.useContext(DockContext);
}

export interface DockItemData {
  id?: string;
  label: string;
  icon: React.ReactNode;
  active?: boolean;
  badge?: string | number | boolean;
  shortcut?: string;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
}

export interface DockProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  items?: DockItemData[];
  orientation?: "horizontal" | "vertical";
  direction?: "bottom" | "top" | "left" | "right";
  magnification?: number;
  distance?: number;
  iconSize?: number;
  magnify?: boolean;
  showNotches?: boolean;
  serialNumber?: string;
  className?: string;
}

export function Dock({
  children,
  items,
  orientation = "horizontal",
  direction = "bottom",
  magnification = 1.45,
  distance = 130,
  iconSize = 44,
  magnify = true,
  showNotches = true,
  serialNumber = "STUB // DOCK",
  className,
  ...props
}: DockProps) {
  const [mousePos, setMousePos] = React.useState<{ x: number | null; y: number | null }>({
    x: null,
    y: null,
  });

  const dockRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!dockRef.current) return;
    const rect = dockRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: null, y: null });
  };

  const contextValue = React.useMemo<DockContextValue>(
    () => ({
      mouseX: mousePos.x,
      mouseY: mousePos.y,
      orientation,
      direction,
      magnification,
      distance,
      iconSize,
      magnify,
    }),
    [mousePos, orientation, direction, magnification, distance, iconSize, magnify]
  );

  return (
    <DockContext.Provider value={contextValue}>
      <div
        ref={dockRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "relative inline-flex items-center gap-2 rounded-xl border-2 border-foreground bg-card/90 p-2 shadow-2xl backdrop-blur-md select-none transition-all duration-200",
          orientation === "horizontal"
            ? "flex-row h-16 px-4"
            : "flex-col w-16 py-4",
          className
        )}
        role="toolbar"
        aria-label="Application Dock"
        {...props}
      >
        {/* Ticket Notch Cutouts on Dock Ends */}
        {showNotches && orientation === "horizontal" && (
          <>
            <div
              className="pointer-events-none absolute -left-2.5 top-1/2 -translate-y-1/2 size-4 rounded-full bg-background border-2 border-foreground shadow-inner z-20"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -right-2.5 top-1/2 -translate-y-1/2 size-4 rounded-full bg-background border-2 border-foreground shadow-inner z-20"
              aria-hidden="true"
            />
          </>
        )}

        {showNotches && orientation === "vertical" && (
          <>
            <div
              className="pointer-events-none absolute left-1/2 -top-2.5 -translate-x-1/2 size-4 rounded-full bg-background border-2 border-foreground shadow-inner z-20"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute left-1/2 -bottom-2.5 -translate-x-1/2 size-4 rounded-full bg-background border-2 border-foreground shadow-inner z-20"
              aria-hidden="true"
            />
          </>
        )}

        {/* Micro Stub Tag Eyebrow */}
        {serialNumber && (
          <div
            className={cn(
              "pointer-events-none absolute font-mono text-[8px] font-bold uppercase tracking-widest text-muted-foreground/60 select-none",
              orientation === "horizontal"
                ? "-top-4 left-4"
                : "-left-5 top-4 -rotate-90 origin-left"
            )}
            aria-hidden="true"
          >
            {serialNumber}
          </div>
        )}

        {/* Render Items either via children or items prop */}
        {children
          ? children
          : items?.map((item, idx) => (
              <DockItem
                key={item.id || idx}
                icon={item.icon}
                label={item.label}
                active={item.active}
                badge={item.badge}
                shortcut={item.shortcut}
                onClick={item.onClick}
                href={item.href}
                disabled={item.disabled}
              />
            ))}
      </div>
    </DockContext.Provider>
  );
}

export interface DockItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  label?: string;
  active?: boolean;
  badge?: string | number | boolean;
  shortcut?: string;
  href?: string;
  className?: string;
  children?: React.ReactNode;
}

export function DockItem({
  icon,
  label,
  active = false,
  badge,
  shortcut,
  href,
  className,
  children,
  onClick,
  disabled,
  ...props
}: DockItemProps) {
  const { mouseX, mouseY, orientation, direction, magnification, distance, iconSize, magnify } = useDock();
  const itemRef = React.useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = React.useState(false);
  const [isPressed, setIsPressed] = React.useState(false);

  // Calculate dynamic magnification based on distance to cursor
  const scale = React.useMemo(() => {
    if (!magnify || !itemRef.current) return 1;

    if (orientation === "horizontal") {
      if (mouseX === null) return 1;
      const el = itemRef.current;
      const itemCenter = el.offsetLeft + el.offsetWidth / 2;
      const delta = Math.abs(mouseX - itemCenter);
      if (delta > distance) return 1;
      const factor = Math.cos((delta / distance) * (Math.PI / 2));
      return 1 + (magnification - 1) * factor;
    } else {
      if (mouseY === null) return 1;
      const el = itemRef.current;
      const itemCenter = el.offsetTop + el.offsetHeight / 2;
      const delta = Math.abs(mouseY - itemCenter);
      if (delta > distance) return 1;
      const factor = Math.cos((delta / distance) * (Math.PI / 2));
      return 1 + (magnification - 1) * factor;
    }
  }, [magnify, orientation, mouseX, mouseY, distance, magnification]);

  const computedSize = iconSize * scale;

  const content = (
    <div
      className={cn(
        "relative flex items-center justify-center rounded-lg border-2 transition-all duration-100 ease-out",
        active
          ? "border-foreground bg-primary text-primary-foreground shadow-md"
          : "border-border bg-secondary/80 text-foreground hover:border-foreground/80 hover:bg-secondary shadow-xs",
        isPressed && "scale-90"
      )}
      style={{
        width: `${computedSize}px`,
        height: `${computedSize}px`,
      }}
    >
      {/* Icon rendering */}
      <div className="flex items-center justify-center pointer-events-none transition-transform duration-100" style={{ transform: `scale(${Math.min(scale, 1.25)})` }}>
        {icon || children}
      </div>

      {/* Notification Badge */}
      {badge !== undefined && badge !== false && (
        <span
          className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-xs bg-accent px-1 font-mono text-[9px] font-bold text-accent-foreground border border-card shadow-xs z-30"
          aria-label={typeof badge === "string" || typeof badge === "number" ? `Badge: ${badge}` : "Notification"}
        >
          {badge === true ? "" : badge}
        </span>
      )}
    </div>
  );

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center group focus-within:z-40",
        orientation === "vertical" && "flex-row"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
    >
      {/* Tooltip Label */}
      {label && isHovered && (
        <div
          className={cn(
            "pointer-events-none absolute z-50 flex items-center gap-1.5 whitespace-nowrap rounded-xs border-2 border-dashed border-border bg-card/95 px-2 py-0.5 text-foreground shadow-xl backdrop-blur-xs transition-opacity duration-150 animate-fade-in-up",
            direction === "bottom" && "-top-9",
            direction === "top" && "-bottom-9",
            direction === "left" && "-right-24",
            direction === "right" && "-left-24"
          )}
          role="tooltip"
        >
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider">
            {label}
          </span>
          {shortcut && (
            <kbd className="rounded-2xs border border-border/80 bg-secondary px-1 font-mono text-[8px] font-bold text-muted-foreground">
              {shortcut}
            </kbd>
          )}

          {/* Ticket Beak Pointer */}
          {direction === "bottom" && (
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 size-1.5 rotate-45 border-b-2 border-r-2 border-dashed border-border bg-card" />
          )}
          {direction === "top" && (
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 size-1.5 rotate-45 border-t-2 border-l-2 border-dashed border-border bg-card" />
          )}
        </div>
      )}

      {/* Interactive Button */}
      <button
        ref={itemRef}
        type="button"
        disabled={disabled}
        onClick={(e) => {
          setIsPressed(true);
          setTimeout(() => setIsPressed(false), 200);
          onClick?.(e);
          if (href) {
            window.location.href = href;
          }
        }}
        className={cn(
          "relative flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg cursor-pointer disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        aria-label={label || "Dock Item"}
        {...props}
      >
        {content}
      </button>

      {/* Active Indicator Dot */}
      <div
        className={cn(
          "flex items-center justify-center transition-all duration-200",
          orientation === "horizontal" ? "h-2 w-full pt-1" : "w-2 h-full pl-1"
        )}
      >
        {active ? (
          <span
            className="size-1.5 rounded-full bg-accent shadow-[0_0_6px_var(--color-accent)] animate-pulse"
            aria-hidden="true"
          />
        ) : (
          <span className="size-1.5 rounded-full bg-transparent" aria-hidden="true" />
        )}
      </div>
    </div>
  );
}

export interface DockSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function DockSeparator({ className, ...props }: DockSeparatorProps) {
  const { orientation } = useDock();

  return (
    <div
      className={cn(
        "shrink-0 select-none",
        orientation === "horizontal"
          ? "h-8 w-0 border-r-2 border-dashed border-border/80 mx-1.5 self-center"
          : "w-8 h-0 border-b-2 border-dashed border-border/80 my-1.5 self-center",
        className
      )}
      role="separator"
      aria-orientation={orientation === "horizontal" ? "vertical" : "horizontal"}
      {...props}
    />
  );
}

export interface DockLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  shortcut?: string;
  className?: string;
}

export function DockLabel({ children, shortcut, className, ...props }: DockLabelProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-xs border-2 border-dashed border-border bg-card/95 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-foreground shadow-md backdrop-blur-xs",
        className
      )}
      {...props}
    >
      <span>{children}</span>
      {shortcut && (
        <kbd className="rounded-2xs border border-border/80 bg-secondary px-1 font-mono text-[8px] font-bold text-muted-foreground">
          {shortcut}
        </kbd>
      )}
    </div>
  );
}
