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

  // Переход на страницу блога
  await page.getByRole('link', { name: 'Blog' }).click();
  const blogPageHandle = await page.waitForEvent('popup');
  await blogPageHandle.waitForLoadState();

  const blogPageInstance = new BlogPage(blogPageHandle);
  await blogPageInstance.clickFirstContinueLink();

  await expect(blogPageInstance.headingText).toHaveText(
    'monkkee’s user interface is now available in Spanish - Help us improve it by participating in the translation process'
  );

  await blogPageInstance.goBackToOverview();

  await blogPageInstance.goToFeaturesPage();
  await expect(
    blogPageHandle.getByRole('heading', {
      name: 'monkkee’s features - no bells and whistles, plain functionality',
    })
  ).toBeInViewport();
  await blogPageInstance.clickFeaturesHeading();

  await blogPageInstance.goToSecurityPage();
  await expect(
    blogPageHandle.getByRole('heading', {
      name: 'Secure end-to-end encryption',
    })
  ).toBeInViewport();
  await blogPageInstance.clickSecurityHeading();
});
