
import { apiRouter } from '../modules/trpc/router';
jest.mock('@acme/analytics');

let mock: any

describe('Auth', () => {

    beforeAll(() => {
        mock = jest.fn().mockImplementation(() => {
            return {
                trackError: jest.fn(),
                trackEvent: jest.fn()
            }
        });

    });

    test("Is should be true", async () => {

        const caller = apiRouter.createCaller({
            sessionId: null,
            user: null,
            teamMemberships: null,
            abilities: {
                isAdmin: false,
                isTeamMember: () => false,
                isTeamOwner: () => false,
            },
            responseHeaders: undefined,
            isAdmin: undefined
        })

        // const user = await caller.auth.signup({
        //     email: 'name@email.com',
        //     name: 'Name',
        //     password: 'password',
        //     callbackUrl: ''
        // })

        //expect(mock.trackEvent).toHaveBeenCalledTimes(1);
    })

});