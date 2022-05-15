import { date, object, string, TypeOf } from 'zod';

const payload = {
	body: object({
		title: string({
			required_error: 'Title is required',
		}),
		description: string({
			required_error: 'Description is required',
		}).min(120, 'Description should be at least 120 characters long...'),
		duedate: date({
			required_error: 'Due date is required',
		}),
		reminderDate: date({
			required_error: 'Reminder date is required',
		}),
	}),
};

const params = {
	params: object({
		taskId: string({
			required_error: 'TaskId is required',
		}),
	}),
};

export const createTaskSchema = object({
	...payload,
});

export const updateTaskSchema = object({
	...payload,
	...params,
});

export const getTaskSchema = object({
	...params,
});

export const deleteTaskSchema = object({
	...params,
});

export type CreateTaskInput = TypeOf<typeof createTaskSchema>;
export type UpdateTaskInput = TypeOf<typeof updateTaskSchema>;
export type GetTaskInput = TypeOf<typeof getTaskSchema>;
export type DeleteTaskInput = TypeOf<typeof deleteTaskSchema>;
