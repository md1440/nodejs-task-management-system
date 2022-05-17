import { object, string, TypeOf } from 'zod';

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateSessionInput:
 *      type: object
 *      required:
 *        - email
 *        - password
 *      properties:
 *        email:
 *          type: string
 *          default: test@test.de
 *        password:
 *          type: string
 *          default: asdf1234
 *    CreateSessionResponse:
 *      type: object
 *      properties:
 *        accessToken:
 *          type: string
 *        refreshToken:
 *          type: string
 */

export const createSessionSchema = object({
	body: object({
		email: string({
			required_error: 'Email is required',
		}),
		password: string({
			required_error: 'Password is required',
		}),
	}),
});

export type CreateSessionSchema = TypeOf<typeof createSessionSchema>;
