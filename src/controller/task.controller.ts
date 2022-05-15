import { Request, Response } from 'express';
import { CreateTaskInput } from '../schema/Task.schema';
import { createTask } from '../service/task.service';
import logger from '../utils/logger';

export async function createTaskHandler(
	req: Request<{}, {}, CreateTaskInput['body']>,
	res: Response
) {
	const userId = res.locals.user._id;
	const body = req.body;

	try {
		const task = await createTask({ ...body, user: userId });
		return res.send(task);
	} catch (err: any) {
		logger.error(err);
		res.status(403).send(err.message);
	}
}
