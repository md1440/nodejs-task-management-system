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
 *    GetSessionResponse:
 *      type: array
 *      items:
 *        type: object
 *        properties:
 *          _id:
 *            type: string
 *          user:
 *            type: string
 *          valid:
 *            type: boolean
 *          userAgent:
 *            type: string
 *          createdAt:
 *            type: string
 *          updatedAt:
 *            type: string
 *          __v:
 *            type: string
 *    DeleteSessionResponse:
 *      type: object
 *      properties:
 *        accessToken:
 *          type: null
 *        refreshToken:
 *          type: null
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
