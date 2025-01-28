// import { test, expect } from '@playwright/test';
// import { LoginPage } from '../../../page-objects/login-page';

// test('failure login test', async ({ page }) => {
//   const loginPage = new LoginPage(page);
//   await loginPage.goToLoginPage();

//   await loginPage.login(process.env.LOGIN!, process.env.PASSWORD1!);

//   const successMessage = await page.locator('text=Welcome');
//   await expect(successMessage).toBeVisible();
// });
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../page-objects/login-page';

test.skip('failure login test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goToLoginPage();

  await loginPage.login(process.env.LOGIN!, process.env.PASSWORD1!);

  const successMessage = await page.locator('text=Welcome');
  await expect(successMessage).toBeVisible();
});
