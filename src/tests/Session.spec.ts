import { createUserSessionHandler } from '../controller/session.controller';
import * as SessionService from '../service/session.service';
import * as UserService from '../service/user.service';
import createServer from '../utils/createServer';
import { sessionPayload, userPayload } from './_test_fixtures';

const app = createServer();

describe('Session Endpoint Tests', () => {
	describe('given the username and password are valid', () => {
		it('should return a signed accessToken & refreshToken', async () => {
			jest
				.spyOn(UserService, 'validatePassword')
				// @ts-ignore
				.mockReturnValueOnce(userPayload);

			jest
				.spyOn(SessionService, 'createSession')
				// @ts-ignore
				.mockReturnValueOnce(sessionPayload);

			const req = {
				get: () => {
					return 'userAgent';
				},
				body: {
					email: 'test@test.de',
					password: 'asdf1234',
				},
			};

			const send = jest.fn();
			const res = { send };

			// @ts-ignore
			await createUserSessionHandler(req, res);

			expect(send).toHaveBeenCalledWith({
				accessToken: expect.any(String),
				refreshToken: expect.any(String),
			});
		});
	});
});
