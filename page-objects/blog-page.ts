import { Page } from '@playwright/test';

export class BlogPage {
  constructor(private page: Page) {}

  async goToBlogPage() {
    const [newPage] = await Promise.all([
      this.page.waitForEvent('popup'),
      this.page.getByRole('link', { name: 'Blog' }).click(),
    ]);

    this.page = newPage;
    await this.page.waitForLoadState();
  }

  async clickFirstContinueLink() {
    await this.page.waitForSelector('.blog__continue-link', {
      state: 'visible',
      timeout: 15000,
    });
    const continueLink = this.page.locator('.blog__continue-link').first();

    if (await continueLink.isVisible()) {
      await continueLink.click();
    } else {
      throw new Error('Continue link is not visible on the page');
    }
  }

  async goBackToOverview() {
    await this.page.getByRole('link', { name: '← Back to overview' }).click();
  }

  async goToFeaturesPage() {
    await this.page.getByRole('link', { name: 'Features' }).click();
  }

  async clickFeaturesHeading() {
    await this.page
      .getByRole('heading', {
        name: 'monkkee’s features - no bells and whistles, plain functionality',
      })
      .click();
  }

  async goToSecurityPage() {
    await this.page
      .getByRole('link', { name: 'Security', exact: true })
      .click();
  }

  async clickSecurityHeading() {
    await this.page
      .getByRole('heading', { name: 'Secure end-to-end encryption' })
      .click();
  }

  get headingText() {
    return this.page.locator('h2').first();
  }
}
