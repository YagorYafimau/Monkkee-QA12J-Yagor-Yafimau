import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://monkkee.com/app#/');

  const registerLink = page.locator('a', { hasText: 'Register' });
  await registerLink.click();

  const emailInput = page.locator('input[name="registration[email]"]');
  await emailInput.waitFor({ state: 'visible', timeout: 60000 });
  await emailInput.fill('efimov1711@gmail.com');

  const passwordInput = page.locator('input[name="password"]');
  await passwordInput.waitFor({ state: 'visible', timeout: 60000 });
  await passwordInput.fill('HelloTMS!');

  const passwordConfirmationInput = page.locator(
    'input[name="password_confirmation"]'
  );
  await passwordConfirmationInput.waitFor({ state: 'visible', timeout: 60000 });
  await passwordConfirmationInput.fill('HelloTMS!');

  const passwordHintInput = page.locator('input[name="password_hint"]');
  await passwordHintInput.waitFor({ state: 'visible', timeout: 60000 });
  await passwordHintInput.fill('123');

  const termsCheckBox = page.locator('input[name="terms"]');
  await termsCheckBox.check();

  const awareCheckBox = page.locator('input[name="aware"]');
  await awareCheckBox.check();

  const okButton = page.locator('button', { hasText: 'OK' });
  await okButton.click();
});
