import { Page, expect } from '@playwright/test';

export class ManageTagsPage {
  constructor(private page: Page) {}

  async openPage() {
    await this.page.goto('https://monkkee.com/app/#/tags');
  }

  async goToTagsPage() {
    const manageTagsLink = this.page.locator('.tags__manage-link');
    await manageTagsLink.click();
    await this.page.waitForURL('https://monkkee.com/app#/tags');
  }

  async createNewTag(tagName: string) {
    const newTagInput = this.page.locator('#new-tag');
    await newTagInput.click();
    await newTagInput.fill(tagName);

    const okButton = this.page.locator('#assign-new-tag');
    await okButton.waitFor({ state: 'visible', timeout: 5000 });
    await okButton.click();

    await this.page
      .locator('#loading-animation-wrapper')
      .waitFor({ state: 'detached' });
  }

  async checkTagName(tagName: string) {
    const tagRow = this.page.locator('table.tags-table');
    const tag = tagRow.locator('td', { hasText: tagName });
    await tag.waitFor({ state: 'visible', timeout: 10000 });
    await expect(tag).toBeVisible();
  }

  async deleteTag(tagName: string) {
    const tagRow = this.page.locator('table.tags-table');
    const tagDeleteButton = await tagRow
      .locator(`td:has-text("${tagName}")`)
      .locator('..')
      .locator('button');
    await tagDeleteButton.click();
  }

  async checkTagNotExist(tagName: string) {
    const tagRow = this.page.locator('table.tags-table');
    const tag = await tagRow.locator('td', { hasText: tagName });
    await expect(tag).toBeHidden();
  }

  async navigateToEntriesPage() {
    await this.page.goto('https://monkkee.com/app#/entries');
    await this.page.waitForLoadState('networkidle');
  }
}
