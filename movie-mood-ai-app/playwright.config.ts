// playwright.config.ts
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  use: {
    baseURL: "http://localhost:5173",
    browserName: "chromium",
    headless: true,
  },
  webServer: {
    command: "npm run dev", // or a custom script that starts both frontend and backend
    port: 5173,
    reuseExistingServer: true,
  },
});
