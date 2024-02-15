import { test } from '@playwright/test';

test.describe('Registration', () => {

    test('User can register with email/password', async ({ page, context, browser }) => {

        /**
         * Go through the password reset flow from the login form
         */
        const newPassword = 'newPassword'

        await page.goto('/auth/login');

        await page.getByRole('tab', { name: 'Password' }).click();
        await page.getByRole('link', { name: 'Forgot password?' }).click();

        await page.waitForURL('/auth/forgot-password');

        await page.getByRole('textbox').click();
        await page.getByRole('textbox').fill('andrew@hatchhead.co');
        await page.getByRole('button', { name: 'Send link' }).click();
        await page.waitForURL('/auth/otp**');

        const emailPage = await context.newPage();
        await emailPage.goto('http://localhost:3010/#/');

        await emailPage.getByText('Reset your password').first().click();

        // Access the iframe
        const iframeLocator = emailPage.frameLocator('iframe >> nth=0'); // Adjust the selector to target the specific iframe
        const button = await iframeLocator.getByRole('link', { name: 'Reset password →' }); // Adjust the role and name to target the specific button

        // Click the button and wait for a new page/tab to open
        const [newPage] = await Promise.all([
            context.waitForEvent('page'), // Wait for the new page/tab to open
            button.click(), // Click the button inside the iframe
        ]);

        await newPage.waitForURL('**/auth/reset-password**');
        await newPage.getByTestId('input-newPassword').fill(newPassword);
        await newPage.getByTestId('input-confirmPassword').fill(newPassword);
        await newPage.getByRole('button', { name: 'Reset Password' }).click();
        await newPage.waitForSelector('text=Password reset successfully');

        /**
         * Confirm new password works
         */

        // Logout

        const loginPage = await browser.newPage()

        // Login with new password
        await loginPage.goto('http://localhost:3000/');
        await loginPage.waitForURL('/auth/login');
        await loginPage.getByRole('tab', { name: 'Password' }).click();
        await loginPage.locator('input[name="email"]').click();
        await loginPage.locator('input[name="email"]').fill('andrew@hatchhead.co');
        await loginPage.locator('input[name="email"]').press('Tab');
        await loginPage.locator('input[name="password"]').fill(newPassword);
        await loginPage.getByRole('button', { name: 'Sign in' }).click();

        await loginPage.waitForURL('/');

        await newPage.close();
        await emailPage.close();
        await page.close();
        await loginPage.close();
    });


    test("Passwords should match", async ({ page }) => {

        await page.goto('/auth/reset-password?token=123456');

        await page.getByTestId('input-newPassword').fill("newPassword1");
        await page.getByTestId('input-confirmPassword').fill("newPassword2");
        await page.getByRole('button', { name: 'Reset Password' }).click();

        await page.getByText("Passwords do not match")
        await page.close();
    });

    test("Invalid tokens should show an error", async ({ page }) => {

        await page.goto('/auth/reset-password?token=invalid');

        await page.getByTestId('input-newPassword').fill("newPassword");
        await page.getByTestId('input-confirmPassword').fill("newPassword");
        await page.getByRole('button', { name: 'Reset Password' }).click();

        await page.getByText("Invalid token")
        await page.close();
    })

});


