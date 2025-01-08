import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  timeout: 10000,
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
      name: 'Regression Tests - Chromium',
      testMatch: '**/regression/**/*.test.ts',
      use: { browserName: 'chromium' },
    },
  ],
  reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }]],
});
