import { test as setup } from '@playwright/test';
import { userAuthFile } from './config';

setup('authenticate', async ({ browser }) => {


    const page = await browser.newPage({ storageState: undefined });

    // Perform authentication steps. Replace these actions with your own
    await page.goto('/auth/login');
    await page.getByRole('tab', { name: 'Password' }).click();

    await page.locator('input[name="email"]').click();
    await page.locator('input[name="email"]').fill(process.env.E2E_TEST_EMAIL || 'andrew@hatchhead.co');
    await page.locator('input[name="password"]').click();
    await page.locator('input[name="password"]').fill(process.env.E2E_TEST_EMAIL || 'password2');

    await page.getByRole('button', { name: 'Sign in' }).click();

    // Return to app
    await page.waitForURL('http://localhost:3000/hatch-head');

    // End of authentication steps.
    await page.context().storageState({ path: userAuthFile });

});