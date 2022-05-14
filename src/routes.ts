import { Express } from 'express';
import { createUserHandler } from './controller/user.controller';
import validateRequest from './middleware/validateRequest';
import { createUserSchema } from './schema/User.schema';

function routes(app: Express) {
	app.post('/api/v1/users', validateRequest(createUserSchema), createUserHandler);
}

export default routes;
