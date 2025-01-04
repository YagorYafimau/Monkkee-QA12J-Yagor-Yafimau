import { Page, Locator } from 'playwright';

export class LoginPage {
  private page: Page;

  // Локаторы для элементов
  private emailInput = 'input[name="email"]';
  private passwordInput = 'input[name="password"]';
  private submitButton = 'button[type="submit"]';
  private userMenuButton = 'a.user-menu__btn';
  private welcomeMessage = '#welcome-message';

  constructor(page: Page) {
    this.page = page;
  }

  // Переход на страницу логина
  async goToLoginPage() {
    try {
      await this.page.goto('https://monkkee.com/app/#/');
      // await this.page.waitForSelector(this.emailInput, { timeout: 10000 }); // Ожидание появления поля email
      console.log('Login page loaded');
    } catch (error) {
      console.error('Error navigating to login page:', error);
      throw error; // Бросаем ошибку дальше
    }
  }

  // Логин с использованием email и пароля
  async login(email: string, password: string) {
    await this.page.getByPlaceholder('Email address or alias').fill(email);
    await this.page.getByPlaceholder('Password').fill(password);
    await this.page.getByRole('button', { name: 'Login' }).click();
  }

  // Ожидание появления кнопки меню пользователя (проверка успешного входа)
  async waitForUserMenuButton() {
    try {
      const userMenuLocator: Locator = this.page.locator(this.userMenuButton);
      await userMenuLocator.waitFor({ state: 'visible', timeout: 20000 });
      console.log('User menu button is visible');
    } catch (error) {
      console.error('Error waiting for user menu button:', error);
      throw error;
    }
  }

  // Ожидание загрузки страницы записей после логина
  async waitForEntriesPage() {
    try {
      await this.page.waitForURL('https://monkkee.com/app/#/entries', {
        timeout: 20000,
      });
      console.log('Entries page loaded');
    } catch (error) {
      console.error('Error waiting for entries page:', error);
      throw error;
    }
  }

  // Получение приветственного сообщения после входа
  async getWelcomeMessage(): Promise<string> {
    try {
      const messageLocator: Locator = this.page.locator(this.welcomeMessage);
      await messageLocator.waitFor({ state: 'visible', timeout: 10000 }); // Ожидание появления сообщения
      const content = await messageLocator.textContent();
      return content || 'No welcome message found';
    } catch (error) {
      console.error('Error getting welcome message:', error);
      return 'Error retrieving message';
    }
  }
}
