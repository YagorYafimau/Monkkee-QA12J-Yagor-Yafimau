import { Page } from 'playwright';

export class LogoutPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async logout() {
    await this.page.getByRole('button', { name: 'Logout' }).click();
  }

  async checkLoginButtonVisible() {
    const loginButton = await this.page.getByRole('button', { name: 'Login' });
    return loginButton.isVisible();
  }
}
