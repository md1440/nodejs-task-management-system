import { object, string, TypeOf } from 'zod';

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateUserInput:
 *      type: object
 *      required:
 *        - email
 *        - name
 *        - password
 *        - passwordConfirmation
 *      properties:
 *        email:
 *          type: string
 *          default: test@test.de
 *        name:
 *          type: string
 *          default: Hans Mustermann
 *        password:
 *          type: string
 *          default: asdf1234
 *        passwordConfirmation:
 *          type: string
 *          default: asdf1234
 *    CreateUserResponse:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *        name:
 *          type: string
 *        _id:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 */

export const createUserSchema = object({
	body: object({
		name: string({
			required_error: 'Name is required',
		}),
		email: string({
			required_error: 'Email is required',
		}).email('Not a valid email'),
		password: string({
			required_error: 'Password is required',
		}).min(8, 'Password required minimum length: 8 characters'),
		passwordConfirmation: string({
			required_error: 'You need to confirm your password',
		}),
	}).refine(data => data.password === data.passwordConfirmation, {
		message: 'Passwords do not match',
		path: ['passwordConfirmation'],
	}),
});

export type CreateUserInput = Omit<TypeOf<typeof createUserSchema>, 'body.passwordConfirmation'>;
