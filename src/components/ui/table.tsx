import * as React from "react";
import { cn } from "./lib/utils";

export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  /** Additional CSS classes applied to the inner table element. */
  className?: string;
}

export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  function Table({ className, ...props }, ref) {
    return (
      <div className="relative w-full overflow-auto rounded-lg border border-border bg-card">
        <table ref={ref} className={cn("w-full caption-bottom text-sm", className)} {...props} />
      </div>
    );
  }
);
Table.displayName = "Table";

export const TableHead = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(function TableHead({ className, ...props }, ref) {
  return (
    <thead
      ref={ref}
      className={cn(
        "border-b-2 border-dashed border-border bg-secondary/60 text-start font-mono text-xs uppercase tracking-wider text-muted-foreground",
        className
      )}
      {...props}
    />
  );
});
TableHead.displayName = "TableHead";

export const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(function TableBody({ className, ...props }, ref) {
  return <tbody ref={ref} className={cn("[&_tr:last-child]:border-0", className)} {...props} />;
});
TableBody.displayName = "TableBody";

export const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(function TableFooter({ className, ...props }, ref) {
  return (
    <tfoot
      ref={ref}
      className={cn(
        "border-t-2 border-dashed border-border bg-secondary/40 font-mono text-xs font-medium [&>tr]:last:border-b-0",
        className
      )}
      {...props}
    />
  );
});
TableFooter.displayName = "TableFooter";

export const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(function TableRow({ className, ...props }, ref) {
  return (
    <tr
      ref={ref}
      className={cn(
        "border-b border-dashed border-border transition-colors hover:bg-secondary/40",
        className
      )}
      {...props}
    />
  );
});
TableRow.displayName = "TableRow";

export const TableHeaderCell = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(function TableHeaderCell({ className, scope = "col", ...props }, ref) {
  return (
    <th
      ref={ref}
      scope={scope}
      className={cn(
        "h-10 px-4 text-start align-middle font-medium font-mono text-xs",
        className
      )}
      {...props}
    />
  );
});
TableHeaderCell.displayName = "TableHeaderCell";

export const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(function TableCell({ className, ...props }, ref) {
  return (
    <td
      ref={ref}
      className={cn("p-4 align-middle font-mono text-xs text-foreground", className)}
      {...props}
    />
  );
});
TableCell.displayName = "TableCell";

export const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(function TableCaption({ className, ...props }, ref) {
  return (
    <caption
      ref={ref}
      className={cn("mt-3 pb-2 font-mono text-xs text-muted-foreground", className)}
      {...props}
    />
  );
});
TableCaption.displayName = "TableCaption";
