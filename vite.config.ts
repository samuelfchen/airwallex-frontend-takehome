/// <reference types="vitest" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    css: true,
    reporters: ["verbose"],
    setupFiles: "./src/setupTests.ts",
    coverage: {
      provider: "istanbul",
      reporter: ["text", "json", "html"],
      all: true,
    },
  },
});
