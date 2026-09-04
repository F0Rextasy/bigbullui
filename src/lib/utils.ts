export type ClassValue = string | number | boolean | null | undefined;

/** Minimal class merger: truthy değerleri boşlukla birleştirir. */
export function cn(...inputs: ClassValue[]): string {
  return inputs.filter(Boolean).join(" ");
}
