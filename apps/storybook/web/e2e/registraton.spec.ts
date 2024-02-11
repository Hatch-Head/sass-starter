import { test } from '@playwright/test';

test.describe('Registration', () => {


    test('Users can register by email', async ({ page }) => {

        await page.goto('http://localhost:3000/auth/signup');
        await page.locator('input[name="name"]').click();
        await page.locator('input[name="name"]').fill('Test');
        await page.locator('input[name="email"]').click();
        await page.locator('input[name="email"]').fill('name@test.com');
        await page.locator('input[name="password"]').click();
        await page.locator('input[name="password"]').fill('password');
        await page.getByRole('button', { name: 'Create account →' }).click();

        await page.goto('http://localhost:3010/');

        await page.locator('div').filter({ hasText: 'Welcome to ACME!' }).nth(0).click();

        await page.getByRole('link', { name: 'Welcome to ACME! To: test@' }).click();
        const page1Promise = page.waitForEvent('popup');
        await page.frameLocator('iframe >> nth=0').getByRole('link', { name: 'Active account →' }).click();
        const page1 = await page1Promise;
        await page1.getByRole('heading', { name: 'Create Team' }).click();

    })
})
