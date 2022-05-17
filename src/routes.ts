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

   /**
   * @openapi
   * '/api/v1/sessions':
   *  post:
   *     tags:
   *     - Sessions
   *     summary: Create a new session (login)
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateSessionInput'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/CreateSessionResponse'
   *      401:
   *        description: Invalid email or password
   *      400:
   *        description: Bad request
   */
	app.post(
		'/api/v1/sessions', 
		validateRequest(createSessionSchema), 
		createUserSessionHandler
	);

   /**
   * @openapi
   * '/api/v1/sessions':
   *  get:
   *     tags:
   *     - Sessions
   *     summary: Get valid sessions (login history)
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/GetSessionResponse'
   *      403:
   *        description: Forbidden
   */
	app.get(
		'/api/v1/sessions', 
		requireUser, 
		getUserSessionHandler
	);

    /**
   * @openapi
   * '/api/v1/sessions':
   *  delete:
   *     tags:
   *     - Sessions
   *     summary: Delete a session (logout)
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/DeleteSessionResponse'
   *      403:
   *        description: Forbidden
   */
	app.delete(
		'/api/v1/sessions',
		requireUser,
		deleteSessionHandler
	);

	/**
   * @openapi
   * '/api/v1/tasks':
   *  post:
   *     tags:
   *     - Tasks
   *     summary: Create a new task
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateTaskInput'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/CreateTaskResponse'
   *      403:
   *        description: Forbidden
   *      400:
   *        description: Bad request
   */
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
   *              $ref: '#/components/schemas/GetTaskResponse'
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

   /**
   * @openapi
   * '/api/v1/tasks/{taskId}':
   *  put:
   *     tags:
   *     - Tasks
   *     summary: Update an existing task by taskId
   *     parameters:
   *      - name: taskId
   *        in: path
   *        description: the id of the task
   *        required: true
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/UpdateTaskInput'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/UpdateTaskResponse'
   *      403:
   *        description: Forbidden
   *      404:
   *        description: Not found
   *      409:
   *        description: You are not the owner of this task
   *      400:
   *        description: Bad request
   */
	app.put(
		'/api/v1/tasks/:taskId',
		[requireUser, validateRequest(updateTaskSchema)],
		updateTaskHandler
	);

   /**
   * @openapi
   * '/api/v1/tasks/{taskId}':
   *  delete:
   *     tags:
   *     - Tasks
   *     summary: Delete a single task by the taskId
   *     parameters:
   *      - name: taskId
   *        in: path
   *        description: the id of the task
   *        required: true
   *     responses:
   *       200:
   *         description: OK
   *         content:
   *          application/json:
   *           schema:
   *              type: string
   *              example: OK
   *       404:
   *         description: Task not found
   *         content:
   *          application/json:
   *           schema:
   *              type: string
   *              example: Task not found
   *       403:
   *         description: Forbidden
   */
	app.delete(
		'/api/v1/tasks/:taskId',
		[requireUser, validateRequest(deleteTaskSchema)],
		deleteTaskHandler
	);
}

export default routes;
