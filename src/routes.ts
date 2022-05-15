import { Express } from 'express';
import { createUserSessionHandler, getUserSessionHandler } from './controller/session.controller';
import { createUserHandler } from './controller/user.controller';
import requireUser from './middleware/requireUser';
import validateRequest from './middleware/validateRequest';
import { createSessionSchema } from './schema/Session.schema';
import { createUserSchema } from './schema/User.schema';

function routes(app: Express) {
	app.post('/api/v1/users', validateRequest(createUserSchema), createUserHandler);

	app.post('/api/v1/sessions', validateRequest(createSessionSchema), createUserSessionHandler);

	app.get('/api/v1/sessions', requireUser, getUserSessionHandler )
}

export default routes;
