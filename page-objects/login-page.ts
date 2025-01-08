import { Page, Locator } from 'playwright';
import path from 'path';

export class LoginPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goToLoginPage() {
    await this.page.goto('https://monkkee.com/app#/');
  }

  async login(email: string, password: string) {
    if (!email || !password) {
      throw new Error('Login or password is not defined');
    }
    await this.page.getByPlaceholder('Email address or alias').fill(email);
    await this.page.getByPlaceholder('Password').fill(password);
    await this.page.getByRole('button', { name: 'Login' }).click();
  }

  async waitForUserMenuButton() {
    const userMenuLocator: Locator = this.page.locator('a.user-menu__btn');
    await userMenuLocator.waitFor({ state: 'visible', timeout: 20000 });
  }

  async waitForEntriesPage() {
    await this.page.waitForURL('https://monkkee.com/app/#/entries', {
      timeout: 20000,
    });
  }

  async getWelcomeMessage(): Promise<string> {
    const messageLocator: Locator = this.page.locator('#welcome-message');
    await messageLocator.waitFor({ state: 'visible', timeout: 10000 });
    const content = await messageLocator.textContent();
    return content || 'No welcome message found';
  }

  async openEntry() {
    await this.page.waitForSelector('.entry');
    await this.page.locator('.entry').first().click();
  }

  async clickText(text: string) {
    await this.page.getByText(text).click();
  }

  async uploadFile(fileName: string) {
    const fileInput = await this.page.getByLabel('Image', { exact: true });
    const filePath = path.resolve(__dirname, fileName);
    await fileInput.setInputFiles(filePath);
  }

  async clickOkButton() {
    await this.page.getByLabel('OK').click();
  }
}
