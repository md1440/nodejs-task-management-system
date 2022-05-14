import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { createUser } from '../service/user.service';
import { userInput } from './_test_fixtures';

describe('User Service Unit Tests', () => {
	beforeAll(async () => {
		const mongoServer = await MongoMemoryServer.create();

		await mongoose.connect(mongoServer.getUri());
	});

	afterAll(async () => {
		await mongoose.disconnect();
		await mongoose.connection.close();
	});

	describe('createUser', () => {
		it('should return user name & email as a json object, omitting the password', async () => {
			const result = await createUser(userInput);
      console.log("🚀 ~ file: user.service.spec.ts ~ line 21 ~ it ~ result", result)

		
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
