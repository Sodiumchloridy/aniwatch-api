import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    name: "aniwatch-api",
    environment: "node",
    testTimeout: 15000,
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      reportsDirectory: "./coverage",
      include: ["test/**/*.ts"],
      exclude: [
        "**/node_modules/**",
        "**/dist/**",
      ],
    },
  },
});
