import { get } from 'lodash';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import supertest from 'supertest';
import { createTask } from '../service/task.service';
import createServer from '../utils/createServer';
import { signJwt } from '../utils/jwtUtils';
import { taskPayload, taskPayloadInvalid, userPayload } from './_test_fixtures';

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

	describe('get task route', () => {
		describe('given user is logged in & the task does not exist', () => {
			it('should return a 404 status', async () => {
				const jwt = signJwt(userPayload);
				const taskId = 'task_asdf';

				await supertest(app)
					.get(`/api/v1/tasks/${taskId}`)
					.set('Authorization', `Bearer ${jwt}`)
					.expect(404);
			});
		});

		describe('given the task does exist', () => {
			it('should return a 200 status and the task', async () => {
				const jwt = signJwt(userPayload);
				const task = await createTask(taskPayload);
				const taskId = get(task, 'taskId');

				const { body, statusCode } = await supertest(app)
					.get(`/api/v1/tasks/${taskId}`)
					.set('Authorization', `Bearer ${jwt}`);

				expect(statusCode).toEqual(200);
				expect(body.taskId).toBe(task.taskId);
			});
		});
	});

	describe('update task route', () => {
		describe('given user is not logged in', () => {
			it('should return a 403 status', async () => {
				const taskId = 'task_asdf';

				await supertest(app).get(`/api/v1/tasks/${taskId}`).expect(403);
			});
		});

		describe('given user is logged in and payload is valid', () => {
			it('should return a 200 and update the task', async () => {
				const jwt = signJwt(userPayload);
				const task = await createTask(taskPayload);
				const taskId = get(task, 'taskId');

				const { statusCode, body } = await supertest(app)
					.put(`/api/v1/tasks/${taskId}`)
					.set('Authorization', `Bearer ${jwt}`)
					.send(taskPayload);

				expect(statusCode).toBe(200);
			});
		});

		describe('given user is logged in and payload is invalid', () => {
			it('should return a 400 status', async () => {
				const jwt = signJwt(userPayload);

				const task = await createTask(taskPayload);
				const taskId = get(task, 'taskId');

				const { statusCode, body, error } = await supertest(app)
					.put(`/api/v1/tasks/${taskId}`)
					.set('Authorization', `Bearer ${jwt}`)
					.send(taskPayloadInvalid);

				expect(statusCode).toBe(400);
			});
		});
	});

	describe('delete task route', () => {
		describe('given user is logged in and taskId is valid', () => {
			it('should return a 200 and delete the task', async () => {
				const jwt = signJwt(userPayload);
				const task = await createTask(taskPayload);
				const taskId = get(task, 'taskId');

				const { statusCode, body } = await supertest(app)
					.delete(`/api/v1/tasks/${taskId}`)
					.set('Authorization', `Bearer ${jwt}`);

				expect(statusCode).toBe(200);
			});
		});

		describe('given user is not logged in and taskId is valid', () => {
			it('should return a 200 and delete the task', async () => {
				const task = await createTask(taskPayload);
				const taskId = get(task, 'taskId');

				const { statusCode, body } = await supertest(app).delete(`/api/v1/tasks/${taskId}`);

				expect(statusCode).toBe(403);
			});
		});
	});
});
