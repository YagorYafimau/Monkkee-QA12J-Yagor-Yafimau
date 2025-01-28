import { Page } from '@playwright/test';

export class SettingsPage {
  constructor(private page: Page) {}

  async changeLanguage(language: 'pt' | 'en') {
    await this.page.getByRole('combobox').selectOption(language);
    await this.page.getByRole('button', { name: 'OK' }).click();
  }

  async getBodyText() {
    return await this.page.locator('body').textContent();
  }

  async waitForNotification(text: string) {
    const notificationText = await this.page.locator(`text=${text}`);
    await notificationText.waitFor({ state: 'visible' });
  }

  async changeColourScheme(scheme: 'light' | 'dark') {
    await this.page.getByRole('link', { name: 'Colour scheme' }).click();
    await this.page.getByRole('combobox').selectOption(scheme);
    await this.page.getByRole('button', { name: 'OK' }).click();
  }

  async changeInactivityTimeout(timeout: string) {
    await this.page.getByRole('link', { name: 'Inactivity timeout' }).click();
    await this.page.getByRole('combobox').selectOption(timeout);
    await this.page.getByRole('button', { name: 'OK' }).click();
  }
}
