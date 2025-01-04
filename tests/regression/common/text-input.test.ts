import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  // Открытие страницы
  await page.goto('https://monkkee.com/app#/');

  // Ввод email
  const emailInput = page.getByPlaceholder('Email address or alias');
  await emailInput.click();
  await emailInput.fill('innkoma');

  // Ввод пароля
  const passwordInput = page.getByPlaceholder('Password');
  await passwordInput.click();
  await passwordInput.fill('Yakukun17!');

  // Клик по кнопке логина
  const loginButton = page.getByRole('button', { name: 'Login' });
  await loginButton.click();

  // Переход на создание записи
  const createEntryLink = page.getByRole('link', { name: 'Create an entry' });
  await createEntryLink.click();

  // Ожидание появления и клик по параграфу для редактирования
  const editableParagraph = page.getByLabel('false').getByRole('paragraph');
  await editableParagraph.click();

  // Ввод текста в поле
  const textField = page.getByLabel('false');
  await textField.fill('Hello TMS!!!');

  // Выход из режима редактирования
  const exitEditButton = page.getByLabel('Exit edit mode');
  await exitEditButton.click();
});
