import config from 'config';
import mongoose from 'mongoose';
import log from './logger';

export const dbConnectionEvents = () => {
	mongoose.connection.on('connecting', () => {
		if (process.env.NODE_ENV === 'development') {
			log.info('Connecting to DB ...');
		}
	});
	mongoose.connection.on('connected', () => {
		log.info('Connected to MongoDB Database');
	});
	mongoose.connection.on('reconnected', () => {
		if (process.env.NODE_ENV === 'development') {
			log.info('Connection Reestablished');
		}
	});
	mongoose.connection.on('disconnected', () => {
		if (process.env.NODE_ENV === 'development') {
			log.info('Connection Disconnected');
		}
	});
	mongoose.connection.on('close', () => {
		if (process.env.NODE_ENV === 'development') {
			log.info('Connection Closed');
		}
	});
	mongoose.connection.on('error', (err: any) => {
		console.error(`Connection error: ${err.stack}`);
	});
};

async function dbConnect() {
	const dbUri = config.get<string>('dbUri');

	try {
		await mongoose.connect(dbUri);
	} catch (err: any) {
		log.error(`Connection error: ${err.stack}`);
	}
}

export default dbConnect;
