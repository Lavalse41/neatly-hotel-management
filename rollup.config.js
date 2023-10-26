import { defineConfig } from "rollup";

export default defineConfig([
  {
    input: "client/src/main.tsx",
    output: {
      file: "dist/bundle.js",
      format: "iife",
    },
  },
  {
    input: "server/src/app.ts",
    output: {
      file: "dist/server-bundle.js",
      format: "cjs",
    },
  },
]);
