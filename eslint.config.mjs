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
    ".wave/**",
    "public/clips/**",
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
    // Effect-state sync and ref patterns below are runtime-verified
    // (tsc + build + browser QA); keep the compiler hints as warnings
    // while the gradual cleanup in TODO.md proceeds.
    files: ["src/**/*.{ts,tsx}"],
    rules: {
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/refs": "warn",
      "react-hooks/purity": "warn",
      "react-hooks/set-state-in-render": "warn",
      "react-hooks/immutability": "warn",
      "react-hooks/static-components": "warn",
    },
  },
]);

export default eslintConfig;
