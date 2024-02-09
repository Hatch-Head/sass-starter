import { faker } from '@faker-js/faker';
import { test } from '@playwright/test';

test.describe('Registration', () => {

  test('User can register with email/password', async ({ page, context, browser }) => {

    const email = faker.internet.email();
    const password = faker.internet.password();
    const name = faker.person.fullName();
    const team = faker.company.name();

    await page.goto('/auth/login');
    await page.getByRole('link', { name: 'Create an account →' }).click();
    await page.locator('input[name="name"]').click();
    await page.locator('input[name="name"]').fill(name);
    await page.locator('input[name="name"]').press('Tab');
    await page.locator('input[name="email"]').fill(email);
    await page.locator('input[name="email"]').press('Tab');
    await page.locator('input[name="password"]').fill(password);
    await page.locator('input[name="password"]').press('Enter');

    await page.waitForTimeout(1000);

    const emailPage = await context.newPage();
    await emailPage.goto('http://localhost:3010/#/');

    await emailPage.getByText(' Welcome to ACME!').first().click();

    // Clicking on link opens new tab
    // var pagePromise = context.waitForEvent('page');
    // await emailPage.frameLocator('iframe >> nth=0').getByRole('link', { name: 'Active account →' }).click()
    // const newPage = await pagePromise;

    // Access the iframe
    const iframeLocator = emailPage.frameLocator('iframe >> nth=0'); // Adjust the selector to target the specific iframe
    const button = await iframeLocator.getByRole('link', { name: 'Active account →' }); // Adjust the role and name to target the specific button

    // Click the button and wait for a new page/tab to open
    const [newPage] = await Promise.all([
      context.waitForEvent('page'), // Wait for the new page/tab to open
      button.click(), // Click the button inside the iframe
    ]);

    await newPage.waitForURL('**/auth/verify**');

    await newPage.waitForURL('**/onboarding');
    await newPage.getByRole('textbox').click();
    await newPage.getByRole('textbox').fill(team);
    await newPage.getByRole('button', { name: 'Create team' }).click();

    await newPage.getByRole('heading', { name: `Welcome ${name}!` })

    await newPage.close();
    await emailPage.close();
    await page.close();
    //await browser.close();
  });

});


