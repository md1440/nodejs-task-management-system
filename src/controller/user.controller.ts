import { Request, Response } from 'express';
import { CreateUserInput } from '../schema/User.schema';
import { createUser } from '../service/user.service';
import logger from '../utils/logger';

export async function createUserHandler(
	req: Request<{}, {}, CreateUserInput['body']>,
	res: Response
) {
	try {
		const user = await createUser(req.body);
		return user && res.send(user);
	} catch (error: any) {
		logger.error(error);
		return res.status(409).send(error.message);
	}
}
