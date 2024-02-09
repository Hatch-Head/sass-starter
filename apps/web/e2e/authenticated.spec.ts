
import { expect, test } from '@playwright/test';
import { userAuthFile } from './config';

test.use({ storageState: userAuthFile });

test.skip('Authenticated users redirects', () => {

    test("Authenticated users can't access login form", async ({ page }) => {
        await page.goto('/auth/login');
        await page.waitForURL("/hatch-head")
        await expect(page).not.toHaveURL('/auth/login');
    })

    test("Authenticated users can't access sign up form", async ({ page }) => {
        await page.goto('/auth/signup');
        await page.waitForURL("/hatch-head")
        await expect(page).not.toHaveURL('/auth/signup');
    })

    test("Authenticated users can logout", async ({ page }) => {
        await page.goto('/');
        await page.getByTestId('user-menu').click();
        await page.getByRole('menuitem', { name: 'Logout' }).click();
        await expect(page).not.toHaveURL('/auth/login');
    })
})