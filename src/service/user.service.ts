import { omit } from 'lodash';
import { DocumentDefinition } from 'mongoose';
import UserModel, { UserDocument } from '../models/User.model';

export async function createUser(
	input: DocumentDefinition<Omit<UserDocument, 'createdAt' | 'updatedAt' | 'comparePassword'>>
) {
	try {
		const user = await UserModel.create(input);
    return omit(user.toJson(), 'password')
	} catch (error: any) {
		throw new Error(error.message);
	}
}
