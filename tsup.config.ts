import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/components/ui/*.tsx"],
  format: ["cjs", "esm"],
  dts: { compilerOptions: { incremental: false } },
  clean: true,
  treeshake: true,
  minify: true,
  external: ["react", "react-dom"],
});
