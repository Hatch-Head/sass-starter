import { expect, test } from '@playwright/test';


test.describe('Unauthenticated users redirects', () => {

  test('Homepage to redirect to the login screen', async ({ page }) => {
    await page.goto('/');

    await page.waitForURL('/auth/login');
    await expect(page).toHaveURL('/auth/login');
  });


  test('Sub pages to redirect to the login screen', async ({ page }) => {
    await page.goto('/fake-page');

    await page.waitForURL('/auth/login');
    await expect(page).toHaveURL('/auth/login');
  });

})

