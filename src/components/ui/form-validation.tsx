"use client";

import * as React from "react";

export type FormRule<T> = (value: T) => string | null;

export interface FormFieldState<T> {
  value: T;
  error: string | null;
  touched: boolean;
  set: (value: T) => void;
  blur: () => void;
  validate: () => boolean;
}

export function useFormField<T>(initial: T, rules: FormRule<T>[] = []): FormFieldState<T> {
  const [value, setValue] = React.useState<T>(initial);
  const [touched, setTouched] = React.useState(false);

  const error = React.useMemo(() => {
    if (!touched) return null;
    for (const rule of rules) {
      const message = rule(value);
      if (message) return message;
    }
    return null;
  }, [value, touched, rules]);

  const validate = React.useCallback(() => {
    setTouched(true);
    for (const rule of rules) {
      if (rule(value)) return false;
    }
    return true;
  }, [rules, value]);

  return {
    value,
    error,
    touched,
    set: setValue,
    blur: () => setTouched(true),
    validate,
  };
}

export const required =
  (message = "Required"): FormRule<unknown> =>
  (value) =>
    value === "" || value === null || value === undefined ? message : null;

export const minLength =
  (min: number, message?: string): FormRule<string> =>
  (value) =>
    value.length < min ? (message ?? `Minimum ${min} characters`) : null;

export const pattern =
  (re: RegExp, message = "Invalid format"): FormRule<string> =>
  (value) =>
    re.test(value) ? null : message;

export function useForm(validators: Record<string, () => boolean>) {
  return React.useCallback(() => {
    return Object.values(validators).every((validate) => validate());
  }, [validators]);
}
