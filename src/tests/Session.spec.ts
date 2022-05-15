import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import supertest from 'supertest';
import { createUserSessionHandler } from '../controller/session.controller';
import * as SessionService from '../service/session.service';
import { createSession } from '../service/session.service';
import * as UserService from '../service/user.service';
import { createUser } from '../service/user.service';
import createServer from '../utils/createServer';
import { signJwt } from '../utils/jwtUtils';
import { sessionPayload, userInput, userPayload } from './_test_fixtures';

const app = createServer();

describe('Session Endpoint Tests', () => {
	beforeAll(async () => {
		const mongoServer = await MongoMemoryServer.create();

		await mongoose.connect(mongoServer.getUri());
	});

	afterAll(async () => {
		await mongoose.disconnect();
		await mongoose.connection.close();
	});

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

	describe('given the accessToken is valid & user is logged in', () => {
		it('should return all valid sessions', async () => {
			const user = await createUser(userInput);
			const session = await createSession(user._id.toString(), 'PostmanRuntime/7.28.4');
			const jwt = signJwt({ userPayload, _id: `${user._id}` });

			const { body } = await supertest(app)
				.get('/api/v1/sessions')
				.set('Authorization', `Bearer ${jwt}`)
				.expect(200);

			expect(body).toHaveLength(1);
			expect(body).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						_id: expect.any(String),
						user: expect.any(String),
						valid: true,
						userAgent: 'PostmanRuntime/7.28.4',
						createdAt: expect.any(String),
						updatedAt: expect.any(String),
						__v: 0,
					}),
				])
			);
		});
	});
});
