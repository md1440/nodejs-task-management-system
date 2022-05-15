import config from 'config';
import { Request, Response } from 'express';
import { CreateSessionSchema } from '../schema/Session.schema';
import { createSession, findSessions } from '../service/session.service';
import { validatePassword } from '../service/user.service';
import { signJwt } from '../utils/jwtUtils';

export async function createUserSessionHandler(
	req: Request<{}, {}, CreateSessionSchema['body']>,
	res: Response
) {
	const user = await validatePassword(req.body);

	if (!user) return res.status(401).send('Invalid email or password');

	const session = await createSession(user._id, req.get('user-agent') || '');

	const accessToken = signJwt(
		{ ...user, session: session._id },
		{ expiresIn: config.get<string>('accessTokenTtl') }
	);

	const refreshToken = signJwt(
		{ ...user, session: session._id },
		{ expiresIn: config.get<string>('refreshTokenTtl') }
	);

	return res.send({ accessToken, refreshToken });
}

export async function getUserSessionHandler(req: Request, res: Response) {
	const userId = res.locals.user._id;

	const sessions = await findSessions({ user: userId, valid: true });

	return res.send(sessions);
}
