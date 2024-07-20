import { defineConfig } from "vitest/config";

export default defineConfig({
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
    alias: {
      "@": `${__dirname}/src`,
    },
  },
});
