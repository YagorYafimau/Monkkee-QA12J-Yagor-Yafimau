import { Page } from '@playwright/test';

export class BlogPage {
  private continueLinkSelector = '.blog__continue-link';

  constructor(public page: Page) {}

  async goToBlogPage() {
    await this.page.getByRole('link', { name: 'Blog' }).click();
    const blogPageHandle = await this.page.waitForEvent('popup');
    await blogPageHandle.waitForLoadState();
    return new BlogPage(blogPageHandle);
  }

  async clickFirstContinueLink() {
    await this.page.waitForSelector(this.continueLinkSelector, {
      state: 'visible',
      timeout: 15000,
    });

    await this.page.locator(this.continueLinkSelector).first().click();
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

  async isFeaturesHeadingInViewport() {
    return this.page
      .getByRole('heading', {
        name: 'monkkee’s features - no bells and whistles, plain functionality',
      })
      .isVisible();
  }

  async isSecurityHeadingInViewport() {
    return this.page
      .getByRole('heading', {
        name: 'Secure end-to-end encryption',
      })
      .isVisible();
  }

  get headingText() {
    return this.page.locator('h2').first();
  }
}
