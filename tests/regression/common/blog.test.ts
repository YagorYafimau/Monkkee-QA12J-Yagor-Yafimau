import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../page-objects/login-page';
import { BlogPage } from '../../../page-objects/blog-page';

test('Blog page test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const blogPage = new BlogPage(page);

  await loginPage.goToLoginPage();
  const email = process.env.LOGIN!;
  const password = process.env.PASSWORD!;
  await loginPage.login(email, password);

  const blogPageInstance = await blogPage.goToBlogPage();

  await blogPageInstance.clickFirstContinueLink();

  await expect(blogPageInstance.headingText).toHaveText(
    'monkkee’s user interface is now available in Spanish - Help us improve it by participating in the translation process'
  );

  await blogPageInstance.goBackToOverview();

  await blogPageInstance.goToFeaturesPage();
  const isFeaturesVisible =
    await blogPageInstance.isFeaturesHeadingInViewport();
  expect(isFeaturesVisible).toBeTruthy();
  await blogPageInstance.clickFeaturesHeading();

  await blogPageInstance.goToSecurityPage();
  const isSecurityVisible =
    await blogPageInstance.isSecurityHeadingInViewport();
  expect(isSecurityVisible).toBeTruthy();
  await blogPageInstance.clickSecurityHeading();
});
