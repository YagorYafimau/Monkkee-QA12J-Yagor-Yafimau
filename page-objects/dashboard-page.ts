import { Page, Locator } from 'playwright';

export class DashboardPage {
  private page: Page;
  private settingsButton: Locator;
  private searchInput: Locator;
  private searchButton: Locator;
  private resultLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.settingsButton = this.page.locator('a.user-menu__btn');
    this.searchInput = this.page.locator('input[placeholder="Search"]');
    this.searchButton = this.page.locator('button:has-text("Search")');
    this.resultLocator = this.page.locator('.search-result');
  }

  async waitForSettingsButton() {
    await this.settingsButton.waitFor({ state: 'visible', timeout: 60000 });
  }

  async isSettingsButtonEnabled(): Promise<boolean> {
    return this.settingsButton.isEnabled();
  }

  async searchForTerm(term: string) {
    await this.searchInput.fill(term);
    await this.searchButton.click();
  }

  async getSearchResult() {
    return await this.resultLocator.count();
  }
}
