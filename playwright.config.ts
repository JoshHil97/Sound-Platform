import fs from "node:fs";
import { defineConfig, devices } from "@playwright/test";

const sandboxChromium = "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";
const executablePath = fs.existsSync(sandboxChromium) ? sandboxChromium : undefined;

// In CI the workflow runs an explicit `pnpm build` before this, so just start the
// already-built app. Locally, build first so `pnpm test:e2e` is self-contained.
const webServerCommand = process.env.CI ? "npx next start -p 3100" : "npx next build && npx next start -p 3100";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: "list",
  use: {
    baseURL: "http://127.0.0.1:3100",
    trace: "on-first-retry"
  },
  webServer: {
    command: webServerCommand,
    url: "http://127.0.0.1:3100",
    reuseExistingServer: !process.env.CI,
    timeout: 180_000
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        launchOptions: executablePath ? { executablePath } : {}
      }
    }
  ]
});
