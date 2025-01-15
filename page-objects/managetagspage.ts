import { Page, Locator } from 'playwright';

export class ManageTagsPage {
  private page: Page;
  private tagInput: Locator;
  private okButton: Locator;
  private backButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.tagInput = this.page.locator('#new-tag');
    this.okButton = this.page.locator('#assign-new-tag');
    this.backButton = this.page.locator('#back-to-overview');
  }

  async createNewTag(tagName: string) {
    await this.tagInput.fill(tagName);
    await this.okButton.click();
    await this.page
      .locator('#loading-animation-wrapper')
      .waitFor({ state: 'hidden', timeout: 10000 });
  }

  async goBackToOverview() {
    await this.backButton.click();
  }

  async openTagsPage() {
    const manageTagsLink = this.page.locator('.tags__manage-link');
    await manageTagsLink.click();
    await this.page
      .locator('h1:has-text("Tags")')
      .waitFor({ state: 'visible', timeout: 20000 });
  }
}
