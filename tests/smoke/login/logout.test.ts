import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';

// Загружаем переменные из .env файла
dotenv.config();

test('test', async ({ page }) => {
  // Получаем данные из переменных окружения
  const email = process.env.LOGIN; // Используем LOGIN вместо EMAIL
  const password = process.env.PASSWORD;

  if (!email || !password) {
    throw new Error('Login or password not set in .env file');
  }

  await page.goto('https://monkkee.com/app#/');
  await page.getByPlaceholder('Email address or alias').click();
  await page.getByPlaceholder('Email address or alias').fill(email);
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill(password);
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('button', { name: 'Logout' }).click();
});
