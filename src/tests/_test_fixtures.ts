import mongoose from 'mongoose';

const userId = new mongoose.Types.ObjectId().toString();

export const userInput = {
	email: 'test@test.de',
	name: 'Hans Mustermann',
	password: 'asdf1234',
	passwordConfirmation: 'asdf1234',
};

export const userLogin = {
	email: 'test@test.de',
	password: 'asdf1234',
};

export const userLoginPasswordFalse = {
	email: 'test@test.de',
	password: '121321421',
};

export const userPayload = {
	_id: userId,
	email: 'test@test.de',
	name: 'Hans Mustermann',
};

export const userInputInvalidPasswords = {
	email: 'test@test.de',
	name: 'Hans Mustermann',
	password: 'asdf1234',
	passwordConfirmation: 'asdf9876',
};

export const userInputIncomplete = {
	name: 'Hans Mustermann',
	password: 'asdf1234',
	passwordConfirmation: 'asdf9876',
};

export const sessionInput = {
	_id: userId,
	userAgent: 'PostmanRuntime/7.28.4',
}

export const sessionPayload = {
	_id: new mongoose.Types.ObjectId().toString(),
	user: userId,
	valid: true,
	userAgent: 'PostmanRuntime/7.28.4',
	createdAt: new Date('2022-05-15T13:31:07.674Z'),
	updatedAt: new Date('2022-05-15T13:31:07.674Z'),
	__v: 0,
};
