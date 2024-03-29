import { faker } from '@faker-js/faker';
import { expect, test } from '@playwright/test';
import { userAuthFile } from './config';

test.use({ storageState: userAuthFile });

test.describe('Profile page', () => {


    test('Users can update their profile', async ({ page }) => {

        const newName = faker.person.fullName();

        await page.goto('/hatch-head');
        await page.getByTestId('user-menu').click();
        await page.getByRole('menuitem', { name: 'Account settings' }).click();
        await page.locator('input[type="text"]').click();

        await expect(page.locator('input[type="text"]')).not.toHaveValue(newName);

        await page.locator('input[type="text"]').fill(newName);

        await page.getByTestId('button-profile-save').click();
        await page.waitForSelector('data-testid=toast-success');

        await expect(page.locator('input[type="text"]')).toHaveValue(newName);

    })
})
