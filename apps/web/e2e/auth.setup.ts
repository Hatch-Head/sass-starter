import { test as setup } from '@playwright/test';
import { userAuthFile } from './config';

setup('authenticate', async ({ browser }) => {

    return;
    const page = await browser.newPage({ storageState: undefined });

    // Perform authentication steps. Replace these actions with your own
    await page.goto('/auth/login');
    await page.getByRole('tab', { name: 'Password' }).click();

    await page.locator('input[name="email"]').click();
    await page.locator('input[name="email"]').fill('andrew@hatchhead.co');
    await page.locator('input[name="password"]').click();
    await page.locator('input[name="password"]').fill('password');

    await page.getByRole('button', { name: 'Sign in' }).click();

    // Return to app
    await page.waitForURL('/hatch-head');

    // End of authentication steps.
    await page.context().storageState({ path: userAuthFile });

    await page.close();
});