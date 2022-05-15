import config from 'config';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import SessionModel from '../models/Session.model';
import UserModel from '../models/User.model';
import { createSession, reIssueAccessToken } from '../service/session.service';
import { createUser, validatePassword } from '../service/user.service';
import { signJwt, verifyJwt } from '../utils/jwtUtils';
import { userInput, userLogin, userLoginPasswordFalse } from './_test_fixtures';

const userId = new mongoose.Types.ObjectId().toString();

describe('Services Unit Tests', () => {
	describe('Session Service', () => {
		beforeAll(async () => {
			const mongoServer = await MongoMemoryServer.create();

			await mongoose.connect(mongoServer.getUri());
		});

		afterAll(async () => {
			await mongoose.disconnect();
			await mongoose.connection.close();
		});

		afterEach(async () => {
			await SessionModel.deleteOne({ userAgent: 'PostmanRuntime/7.28.4' });
		});

		describe('createSession', () => {
			describe('given a valid userId & userAgent', () => {
				it('should create and return a session', async () => {
					const session = await createSession(userId, 'PostmanRuntime/7.28.4');

					expect(session).toEqual({
						_id: expect.any(Object),
						user: expect.any(Object),
						valid: true,
						userAgent: 'PostmanRuntime/7.28.4',
						createdAt: expect.any(Date),
						updatedAt: expect.any(Date),
						__v: 0,
					});
				});
			});
		});

		describe('reIssueAccessToken', () => {
			describe('given a valid refreshToken', () => {
				it('should create and return a valid accessToken', async () => {
					const user = await createUser(userInput);
					const session = await createSession(user._id.toString(), 'PostmanRuntime/7.28.4');
					const accessToken = signJwt(
						{ ...user, session: session._id },
						{ expiresIn: config.get<string>('accessTokenTtl') }
					);

					const refreshToken = signJwt(
						{ ...user, session: session._id },
						{ expiresIn: config.get<string>('refreshTokenTtl') }
					);

					const newAccessToken = await reIssueAccessToken({ refreshToken });

					const result = verifyJwt(newAccessToken as string);

					expect(result.valid).toEqual(true);
				});
			});
		});
	});

	describe('User Service', () => {
		beforeAll(async () => {
			const mongoServer = await MongoMemoryServer.create();

			await mongoose.connect(mongoServer.getUri());
		});

		afterAll(async () => {
			await mongoose.disconnect();
			await mongoose.connection.close();
		});

		afterEach(async () => {
			await UserModel.deleteOne({ email: 'test@test.de' });
		});

		describe('createUser', () => {
			describe('given a valid userInput for registration', () => {
				it('should return user as a json object, omitting the password', async () => {
					const result = await createUser(userInput);

					expect(result).toEqual({
						email: 'test@test.de',
						name: 'Hans Mustermann',
						_id: expect.any(Object),
						createdAt: expect.any(Date),
						updatedAt: expect.any(Date),
						__v: 0,
					});
				});
			});
		});

		describe('validatePassword', () => {
			describe('given a valid userLogin for login', () => {
				it('should return user as a json object, omitting the password', async () => {
					await createUser(userInput);
					const result = await validatePassword(userLogin);

					expect(result).toEqual({
						email: 'test@test.de',
						name: 'Hans Mustermann',
						_id: expect.any(Object),
						createdAt: expect.any(Date),
						updatedAt: expect.any(Date),
						__v: 0,
					});
				});
			});

			describe('given an invalid userLogin for login', () => {
				describe('validatePassword', () => {
					it('should return user as a json object, omitting the password', async () => {
						await createUser(userInput);
						const result = await validatePassword(userLoginPasswordFalse);

						expect(result).toEqual(false);
					});
				});
			});
		});
	});
});
