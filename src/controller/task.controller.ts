import { Request, Response } from 'express';
import { CreateTaskInput, GetTaskInput, UpdateTaskInput } from '../schema/Task.schema';
import { createTask, findAndUpdateTask, findTask } from '../service/task.service';
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

export async function updateTaskHandler(
	req: Request<UpdateTaskInput['params'], {}, UpdateTaskInput['body']>,
	res: Response
) {
	const userId = res.locals.user._id;
	const taskId = req.params.taskId;
	const update = req.body;

	const task = await findTask({ taskId });

	if (!task) return res.status(404).send('Task not found');

	if (String(task.user) !== userId)
		return res.status(403).send('You are not the owner of this task');

	const updateTask = await findAndUpdateTask({ taskId }, update, { new: true });

	return res.send(updateTask);
}
