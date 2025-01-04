import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  use: {
    browserName: 'chromium',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'Smoke Tests - Chromium',
      testMatch: '**/smoke/**/*.test.ts',
      use: { browserName: 'chromium' },
    },
    {
      name: 'Smoke Tests - Firefox',
      testMatch: '**/smoke/**/*.test.ts',
      use: { browserName: 'firefox' },
    },
    {
      name: 'Smoke Tests - Webkit',
      testMatch: '**/smoke/**/*.test.ts',
      use: { browserName: 'webkit' },
    },
    {
      name: 'Regression Tests - Chromium',
      testMatch: '**/regression/**/*.test.ts',
      use: { browserName: 'chromium' },
    },
    {
      name: 'Regression Tests - Firefox',
      testMatch: '**/regression/**/*.test.ts',
      use: { browserName: 'firefox' },
    },
    {
      name: 'Regression Tests - Webkit',
      testMatch: '**/regression/**/*.test.ts',
      use: { browserName: 'webkit' },
    },
  ],
  reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }]],
});
