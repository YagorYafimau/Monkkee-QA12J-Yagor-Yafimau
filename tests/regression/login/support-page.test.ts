import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../page-objects/login-page';

test('test', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goToLoginPage();
  await loginPage.login(process.env.LOGIN!, process.env.PASSWORD!);

  const page1Promise = page.waitForEvent('popup');

  await page.getByRole('link', { name: 'FAQ / Support' }).click();

  const page1 = await page1Promise;

  await expect(page1).toHaveURL(
    'https://monkkee.hesk.com/knowledgebase.php?category=4&language=English'
  );
});
