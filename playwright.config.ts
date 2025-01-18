import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  timeout: 30000, // Тайм-аут для тестов
  use: {
    browserName: 'chromium',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 20000, // Правильное имя параметра
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
