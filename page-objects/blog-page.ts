import { Page } from '@playwright/test';

export class BlogPage {
  constructor(private page: Page) {}

  async goToBlogPage() {
    await this.page.getByRole('link', { name: 'Blog' }).click();
    const page1Promise = this.page.waitForEvent('popup');
    const page1 = await page1Promise;
    return page1;
  }

  async clickFirstContinueLink(page1: Page) {
    await page1.locator('.blog__continue-link').first().click();
  }

  async clickHeading(page1: Page) {
    await page1.locator('h2').first().click();
  }

  async goBackToOverview(page1: Page) {
    await page1.getByRole('link', { name: '← Back to overview' }).click();
  }

  async goToFeaturesPage(page1: Page) {
    await page1.getByRole('link', { name: 'Features' }).click();
  }

  async clickFeaturesHeading(page1: Page) {
    await page1
      .getByRole('heading', { name: 'monkkee’s features - no bells' })
      .click();
  }

  async goToSecurityPage(page1: Page) {
    await page1.getByRole('link', { name: 'Security', exact: true }).click();
  }

  async clickSecurityHeading(page1: Page) {
    await page1
      .getByRole('heading', { name: 'Secure end-to-end encryption' })
      .click();
  }

  async checkHeadingText(page1: Page, expectedText: string) {
    const headingText = await page1.locator('h2').first().textContent();
    console.log('headingText:', headingText);
    return headingText?.trim() === expectedText;
  }
}
