import { faker } from '@faker-js/faker';
import { test } from '@playwright/test';


test.describe('Registration', () => {

  test('User can register with email/password', async ({ page, context }) => {

    const email = faker.internet.email();
    const password = faker.internet.password();
    const name = faker.person.fullName();

    await page.goto('/auth/login');
    await page.getByRole('link', { name: 'Create an account →' }).click();
    await page.locator('input[name="name"]').click();
    await page.locator('input[name="name"]').fill(name);
    await page.locator('input[name="name"]').press('Tab');
    await page.locator('input[name="email"]').fill(email);
    await page.locator('input[name="email"]').press('Tab');
    await page.locator('input[name="password"]').fill(password);
    await page.locator('input[name="password"]').press('Enter');

    const emailPage = await context.newPage();
    await emailPage.goto('http://localhost:3010/#/');

    await emailPage.getByText(' Welcome to ACME!').first().click();

    // Clicking on link opens new tab
    var pagePromise = context.waitForEvent('page');

    //const frameNavigation = page.waitForEvent("popup")
    await emailPage.frameLocator('iframe >> nth=0').getByRole('link', { name: 'Active account →' }).click()
    const newPage = await pagePromise;
    await newPage.waitForURL('http://127.0.0.1:3000/auth/verify**');

    await newPage.getByRole('heading', { name: 'You have been logged in!' }).isVisible();
  });

});