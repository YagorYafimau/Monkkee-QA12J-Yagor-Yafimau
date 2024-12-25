import { test, expect } from '@playwright/test';

test('Login failure test', async ({ page }) => {
  await page.goto('https://my.monkkee.com/');

  // Находим поле для ввода email
  const emailInput = await page.locator('input[name="login"]');
  await emailInput.waitFor({ timeout: 60000 });
  console.log('Email input found');

  // Вводим неверный email
  await emailInput.fill('wrongemail@example.com');

  // Находим поле для ввода пароля
  const passwordInput = await page.locator('input[name="password"]');
  await passwordInput.waitFor({ timeout: 60000 });
  console.log('Password input found');
  await passwordInput.fill('wrongPassword');

  // Находим кнопку для отправки формы
  const submitButton = await page.locator('button[type="submit"]');
  await submitButton.click();

  // Находим элемент с сообщением об ошибке
  const errorMessage = await page.locator('div.alert.alert-danger');

  // Ожидаем, что сообщение будет видно
  await expect(errorMessage).toBeVisible({ timeout: 60000 });

  console.log('Login failed, error message displayed');
});
