import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import SessionModel from '../models/Session.model';
import { createSession } from '../service/session.service';

const userId = new mongoose.Types.ObjectId().toString();

describe('Session Service Unit Tests', () => {
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
});
