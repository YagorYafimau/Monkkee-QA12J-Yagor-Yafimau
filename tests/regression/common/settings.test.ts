import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../page-objects/login-page';
import { DashboardPage } from '../../../page-objects/dashboard-page';
import { SettingsPage } from '../../../page-objects/settings-page';

test('Test Settings Page', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  const settingsPage = new SettingsPage(page);

  await loginPage.goToLoginPage();
  const email = process.env.LOGIN!;
  const password = process.env.PASSWORD!;
  await loginPage.login(email, password);

  await dashboardPage.goToSettings();

  await settingsPage.changeLanguage('pt');
  await settingsPage.waitForNotification('Seu idioma foi alterado com sucesso');
  const languageText = await settingsPage.getBodyText();
  expect(languageText?.trim()).toContain('Idioma');

  await settingsPage.changeLanguage('en');
  await settingsPage.waitForNotification(
    'Your language has been changed successfully'
  );
  const languageTextEn = await settingsPage.getBodyText();
  expect(languageTextEn?.trim()).toContain('Language');

  await settingsPage.changeColourScheme('light');
  await settingsPage.waitForNotification('Your colour scheme has been changed');
  const lightThemeText = await settingsPage.getBodyText();
  expect(lightThemeText?.trim()).toContain('Light');

  await settingsPage.changeColourScheme('dark');
  await settingsPage.waitForNotification('Your colour scheme has been changed');
  const darkThemeText = await settingsPage.getBodyText();
  expect(darkThemeText?.trim()).toContain('Dark');

  await settingsPage.changeInactivityTimeout('-1');
  await settingsPage.waitForNotification(
    'Your settings have been saved successfully'
  );
  const timeoutTextMinus1 = await settingsPage.getBodyText();
  expect(timeoutTextMinus1?.trim()).toContain('Deactivated');

  await settingsPage.changeInactivityTimeout('10');
  await settingsPage.waitForNotification(
    'Your settings have been saved successfully'
  );
  const timeoutText10 = await settingsPage.getBodyText();
  expect(timeoutText10?.trim()).toContain('10');
});
