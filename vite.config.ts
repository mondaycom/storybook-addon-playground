import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  build: {
    sourcemap: true,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "src/tests/setup.ts",
    include: ["**/__tests__/**/*.test.ts", "**/__tests__/**/*.test.tsx"],
    clearMocks: true,
    typecheck: {
      enabled: true,
    },
    css: {
      modules: {
        classNameStrategy: "non-scoped",
      },
    },
  },
});
