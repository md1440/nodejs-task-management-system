import { Request, Response } from 'express';
import { CreateTaskInput, GetTaskInput } from '../schema/Task.schema';
import { createTask, findTask } from '../service/task.service';
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

export async function getTaskHandler(req: Request<GetTaskInput['params']>, res: Response) {
	const taskId = req.params.taskId;
	const task = await findTask({ taskId });

	if (!task) return res.status(404).send('Task not found');

	return res.send(task);
}
