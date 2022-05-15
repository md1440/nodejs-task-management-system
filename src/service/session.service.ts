import { FilterQuery } from 'mongoose';
import SessionModel, { SessionDocument } from '../models/Session.model';

export async function createSession(userId: string, userAgent: string) {
	const session = await SessionModel.create({ user: userId, userAgent });
	return session.toJSON();
}

export async function findSessions(query: FilterQuery<SessionDocument>) {
	return SessionModel.find(query).lean();
}
