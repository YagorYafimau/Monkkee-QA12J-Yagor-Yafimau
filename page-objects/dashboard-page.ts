import { Page, Locator } from 'playwright';

export class DashboardPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async waitForSettingsButton() {
    const settingsButton: Locator = this.page.locator('a.user-menu__btn');
    await settingsButton.waitFor({ state: 'visible', timeout: 60000 });
  }

  async isSettingsButtonEnabled(): Promise<boolean> {
    const settingsButton: Locator = this.page.locator('a.user-menu__btn');
    return settingsButton.isEnabled();
  }

  async searchForTerm(term: string) {
    const searchInput: Locator = this.page.locator(
      'input[placeholder="Search"]'
    );
    await searchInput.fill(term);
    const searchButton: Locator = this.page.locator(
      'button:has-text("Search")'
    );
    await searchButton.click();
  }

  async getSearchResult() {
    const resultLocator: Locator = this.page.locator('.search-result');
    return await resultLocator.count();
  }
}
