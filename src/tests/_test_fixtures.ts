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
