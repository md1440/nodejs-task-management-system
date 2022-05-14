import supertest from 'supertest';
import * as UserService from '../service/user.service';
import createServer from '../utils/createServer';
import { userInput, userInputIncomplete, userInputInvalidPasswords, userPayload } from './_test_fixtures';

const app = createServer();

describe('User End Point Tests', () => {
	describe('user registration', () => {
		describe('given the registration data is complete & valid', () => {
			it('should call createUserService and return the user payload', async () => {
				const createUserServiceMock = jest
					.spyOn(UserService, 'createUser')
					// @ts-ignore
					.mockReturnValueOnce(userPayload);

				const { body } = await supertest(app).post('/api/v1/users').send(userInput).expect(200);

				expect(body).toEqual(userPayload);
				expect(createUserServiceMock).toHaveBeenCalledWith(userInput);
			});
		});

		describe('given the registration data is incomplete ', () => {
			it('should not call createUserService and return status 400 bad request', async () => {
				const createUserServiceMock = jest
					.spyOn(UserService, 'createUser')
					// @ts-ignore
					.mockReturnValueOnce(userPayload);

				const { body } = await supertest(app).post('/api/v1/users').send(userInputIncomplete).expect(400);

				expect(createUserServiceMock).not.toHaveBeenCalled();
			});
		});

		describe('given the passwords for registration do not match', () => {
			it('should not call createUserService and return status 400 bad request', async () => {
				const createUserServiceMock = jest
					.spyOn(UserService, 'createUser')
					// @ts-ignore
					.mockReturnValueOnce(userPayload);

				const { body } = await supertest(app).post('/api/v1/users').send(userInputInvalidPasswords).expect(400);

				expect(createUserServiceMock).not.toHaveBeenCalled()
			});
		});

		describe('given the user service throws an error', () => {
			it('should return a 409 status', async () => {
				const createUserServiceMock = jest
					.spyOn(UserService, 'createUser')
					.mockRejectedValue('mockRejectedValue..');

				const { statusCode } = await supertest(app).post('/api/v1/users').send(userInput);

				expect(statusCode).toBe(409);

				expect(createUserServiceMock).toHaveBeenCalled();
			});
		});
	});
});
