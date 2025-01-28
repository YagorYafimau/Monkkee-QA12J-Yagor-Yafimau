import { Page } from '@playwright/test';

export class SearchPage {
  constructor(private page: Page) {}

  async searchByText(query: string) {
    const searchInput = await this.page.locator('input[placeholder="Search"]');
    await searchInput.fill(query);
    await this.page.getByRole('button', { name: 'Search' }).click();
  }

  async selectDate(date: string) {
    const datePicker = this.page.locator('input[placeholder="Select date"]');
    await datePicker.click();
    await this.page.getByRole('cell', { name: date }).click();
  }
}
