import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 15000,
  retries: 0,
  use: {
    baseURL: "https://todomvc.com/examples/react/dist/",
    headless: true,
    screenshot: "on",
    trace: "on",
    video: 'on',
  },
  reporter: 'html',
});
