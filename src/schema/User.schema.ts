import { object, string, TypeOf } from 'zod';

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
