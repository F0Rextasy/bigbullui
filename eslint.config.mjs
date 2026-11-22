import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Generated output and local automation scripts are not shipped source:
    "dist/**",
    "packages/**/dist/**",
    ".wave/**",
    "public/clips/**",
    ".tmp-*/**",
  ]),
  {
    // Docs preview maps are keyed by slug and always rendered as components,
    // so the hooks rule cannot recognize them as components.
    files: [
      "src/components/site/component-preview.tsx",
      "src/components/site/previews/**/*.tsx",
    ],
    rules: {
      "react-hooks/rules-of-hooks": "off",
    },
  },
  {
    files: ["src/components/ui/**/*.tsx"],
    rules: {
      "@next/next/no-img-element": "off",
    },
  },
  {
    files: ["src/**/*.{ts,tsx}"],
    rules: {
      "@typescript-eslint/no-unused-vars": "error",
      "react-hooks/exhaustive-deps": "error",
      "react-hooks/set-state-in-effect": "error",
      "react-hooks/refs": "error",
      "react-hooks/purity": "error",
      "react-hooks/set-state-in-render": "error",
      "react-hooks/immutability": "error",
      "react-hooks/static-components": "error",
    },
  },
]);

export default eslintConfig;
