// page-objects/login-page.ts

export class LoginPage {
  page: any;

  constructor(page: any) {
    this.page = page;
  }

  // Метод для перехода на страницу логина
  async goToLoginPage() {
    await this.page.goto('https://example.com/login'); // Замените на ваш URL страницы логина
  }

  // Метод для выполнения входа
  async login(email: string, password: string) {
    await this.page.fill('input[name="email"]', email); // Замените на селектор для поля email
    await this.page.fill('input[name="password"]', password); // Замените на селектор для поля password
    await this.page.click('button[type="submit"]'); // Замените на селектор для кнопки входа
  }

  // Метод для получения сообщения об ошибке
  async getErrorMessage() {
    const errorMessage = await this.page.locator(
      'text=Invalid email or password'
    ); // Замените на правильный селектор
    return errorMessage.textContent();
  }
}
