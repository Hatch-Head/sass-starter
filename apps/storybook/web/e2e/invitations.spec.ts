import { faker } from '@faker-js/faker';
import { expect, test } from '@playwright/test';
import { db } from 'database';

test.describe('Unauthenticated users invitations', () => {


    test("Users with no token should be redirected", async ({ page }) => {

        await page.goto('/team/invitation');
        await expect(page).not.toHaveURL('/auth/login');
    })

    test("Invalid codes should display error to the user", async ({ page }) => {

        // TODO mock instead
        const invite = await db.teamInvitation.create({
            data: {
                team_id: 'teamId',
                email: faker.internet.email(),
                role: 'MEMBER',
                expiresAt: new Date(2020, 1, 1),
            },
        })

        await page.goto(`/team/invitation?code=FAKE_CODE${invite.id}`);

        const errorTitle = await page.getByTestId('error-title');
        await expect(errorTitle).toHaveText('Invalid invitation');
    });

});