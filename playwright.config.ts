import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests', // Путь к папке с тестами
  timeout: 30000, // Тайм-аут на выполнение тестов
  use: {
    browserName: 'chromium', // Выбор браузера
    headless: true, // Запуск в headless режиме
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
});
