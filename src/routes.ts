import { Express } from 'express';
import { createUserSessionHandler, deleteSessionHandler, getUserSessionHandler } from './controller/session.controller';
import {
	createTaskHandler,
	deleteTaskHandler,
	getTaskHandler,
	updateTaskHandler,
} from './controller/task.controller';
import { createUserHandler } from './controller/user.controller';
import requireUser from './middleware/requireUser';
import validateRequest from './middleware/validateRequest';
import { createSessionSchema } from './schema/Session.schema';
import {
	createTaskSchema,
	deleteTaskSchema,
	getTaskSchema,
	updateTaskSchema,
} from './schema/Task.schema';
import { createUserSchema } from './schema/User.schema';

function routes(app: Express) {

  /**
   * @openapi
   * '/api/v1/users':
   *  post:
   *     tags:
   *     - User
   *     summary: Register a user
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateUserInput'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/CreateUserResponse'
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
	app.post(
		'/api/v1/users', 
		validateRequest(createUserSchema), 
		createUserHandler
	);

	app.post(
		'/api/v1/sessions', 
		validateRequest(createSessionSchema), 
		createUserSessionHandler
	);

	app.get(
		'/api/v1/sessions', 
		requireUser, 
		getUserSessionHandler
	);

	app.delete(
		'/api/v1/sessions',
		requireUser,
		deleteSessionHandler
	);

	app.post(
		'/api/v1/tasks', 
		[requireUser, validateRequest(createTaskSchema)], 
		createTaskHandler
	);

	/**
   * @openapi
   * '/api/v1/tasks/{taskId}':
   *  get:
   *     tags:
   *     - Tasks
   *     summary: Get a single task by the taskId
   *     parameters:
   *      - name: taskId
   *        in: path
   *        description: the id of the task
   *        required: true
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *          application/json:
   *           schema:
   *              $ref: '#/components/schema/Task'
   *       404:
   *         description: Task not found
   *       403:
   *         description: Forbidden
	 
   */
	app.get(
		'/api/v1/tasks/:taskId', 
		[requireUser, validateRequest(getTaskSchema)], 
		getTaskHandler
	);

	app.put(
		'/api/v1/tasks/:taskId',
		[requireUser, validateRequest(updateTaskSchema)],
		updateTaskHandler
	);

	app.delete(
		'/api/v1/tasks/:taskId',
		[requireUser, validateRequest(deleteTaskSchema)],
		deleteTaskHandler
	);
}

export default routes;
