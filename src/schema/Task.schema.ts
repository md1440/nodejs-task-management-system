import { date, object, string, TypeOf } from 'zod';

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateTaskInput:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - dueDate
 *         - reminderDate
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         dueDate:
 *           type: string
 *           default: 2022-05-23T13:31:07.674Z
 *         reminderDate:
 *           type: string
 *           default: 2022-05-22T13:31:07.674Z
 *     CreateTaskResponse:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         dueDate:
 *           type: string
 *         reminderDate:
 *           type: string
 *         isCompleted:
 *           type: string
 *         _id:
 *           type: string
 *         taskId:
 *           type: string
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 *     GetTaskResponse:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         dueDate:
 *           type: string
 *         reminderDate:
 *           type: string
 *         isCompleted:
 *           type: string
 *         taskId:
 *           type: string
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 *     UpdateTaskInput:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - dueDate
 *         - reminderDate
 *         - isCompleted
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         dueDate:
 *           type: string
 *           default: 2022-05-23T13:31:07.674Z
 *         reminderDate:
 *           type: string
 *           default: 2022-05-22T13:31:07.674Z
 *         isCompleted:
 *           type: boolean
 *           default: false
 *     UpdateTaskResponse:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         dueDate:
 *           type: string
 *         reminderDate:
 *           type: string
 *         isCompleted:
 *           type: string
 *         _id:
 *           type: string
 *         taskId:
 *           type: string
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 */

const payloadTaskCreate = {
	body: object({
		title: string({
			required_error: 'Title is required',
		}),
		description: string({
			required_error: 'Description is required',
		}).min(80, 'Description should be at least 120 characters long...'),
		dueDate: string({
			required_error: 'Due date is required',
		}),
		reminderDate: string({
			required_error: 'Reminder date is required',
		}),
	}),
};

const payloadTaskUpdate = {
	body: object({
		title: string({
			required_error: 'Title is required',
		}),
		description: string({
			required_error: 'Description is required',
		}).min(80, 'Description should be at least 120 characters long...'),
		dueDate: string({
			required_error: 'Due date is required',
		}),
		reminderDate: string({
			required_error: 'Reminder date is required',
		}),
		isCompleted: string({
			required_error: 'Task status true or false is required '
		})
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
	...payloadTaskCreate,
});

export const updateTaskSchema = object({
	...payloadTaskUpdate,
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
