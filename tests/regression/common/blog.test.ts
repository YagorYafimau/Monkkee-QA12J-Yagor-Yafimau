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

  await blogPage.goToBlogPage();
  await blogPage.clickFirstContinueLink();

  await expect(blogPage.headingText).toHaveText(
    'monkkee’s user interface is now available in Spanish - Help us improve it by participating in the translation process'
  );

  await blogPage.goBackToOverview();

  await blogPage.goToFeaturesPage();
  await blogPage.clickFeaturesHeading();

  await blogPage.goToSecurityPage();
  await blogPage.clickSecurityHeading();
});
