import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../page-objects/login-page';
import { BlogPage } from '../../../page-objects/blog-page';

test('test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const blogPage = new BlogPage(page);

  await loginPage.goToLoginPage();
  const email = process.env.LOGIN!;
  const password = process.env.PASSWORD!;
  await loginPage.login(email, password);

  const page1 = await blogPage.goToBlogPage();

  await blogPage.clickFirstContinueLink(page1);

  const isHeadingValid = await blogPage.checkHeadingText(
    page1,
    'monkkee’s user interface is now available in Spanish - Help us improve it by participating in the translation process'
  );
  expect(isHeadingValid).toBe(true);

  await blogPage.goBackToOverview(page1);

  await blogPage.goToFeaturesPage(page1);
  await blogPage.clickFeaturesHeading(page1);

  await blogPage.goToSecurityPage(page1);
  await blogPage.clickSecurityHeading(page1);
});
