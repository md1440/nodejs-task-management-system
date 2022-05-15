import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import supertest from 'supertest';
import createServer from '../utils/createServer';
import { signJwt } from '../utils/jwtUtils';
import { taskPayload, userPayload } from './_test_fixtures';

const app = createServer();

describe('Task End Point Tests', () => {
	beforeAll(async () => {
		const mongoServer = await MongoMemoryServer.create();

		await mongoose.connect(mongoServer.getUri());
	});

	afterAll(async () => {
		await mongoose.disconnect();
		await mongoose.connection.close();
	});

	describe('create task route', () => {
		describe('given user is not logged in', () => {
			it('should return a 403 status', async () => {
				const { statusCode } = await supertest(app).post('/api/v1/tasks');

				expect(statusCode).toBe(403);
			});
		});

		describe('given user is logged in and payload is valid', () => {
			it('should return a 200 and create the task', async () => {
				const jwt = signJwt(userPayload);

				const { statusCode, body, error } = await supertest(app)
					.post('/api/v1/tasks')
					.set('Authorization', `Bearer ${jwt}`)
					.send(taskPayload);

				expect(statusCode).toBe(200);

				expect(body).toEqual(
					expect.objectContaining({
						user: expect.any(String),
						title: 'finish optilyz backend coding challenge',
						description:
							'Please implement a simple task management system with authentication. Please use NodeJS, Express, MongoDB, and Mongoose to implement the solution. You can use e. g. Docker to run MongoDB, and any open source library that you would also be using on the job.',
						dueDate: '2022-05-17T13:31:07.000Z',
						reminderDate: '2022-05-16T13:31:07.000Z',
						isCompleted: false,
						_id: expect.any(String),
						taskId: expect.any(String),
						createdAt: expect.any(String),
						updatedAt: expect.any(String),
						__v: 0,
					})
				);
			});
		});
	});
});
