export type ClassValue = string | number | boolean | null | undefined;

/** Minimal class merger: joins truthy values with space. */
export function cn(...inputs: ClassValue[]): string {
  return inputs.filter(Boolean).join(" ");
}
