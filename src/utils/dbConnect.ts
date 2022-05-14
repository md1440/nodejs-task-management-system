import config from 'config';
import mongoose from 'mongoose';
import logger from './logger';

export const dbConnectionEvents = () => {
  mongoose.connection.on('connecting', () => {
    if (process.env.NODE_ENV === 'development') {
      logger.info('Connecting to DB ...');
    }
  });
  mongoose.connection.on('connected', () => {
    logger.info('Connected to MongoDB Database');

  });
  mongoose.connection.on('reconnected', () => {
    if (process.env.NODE_ENV === 'development') {
      logger.info('Connection Reestablished');
    }
  });
  mongoose.connection.on('disconnected', () => {
    if (process.env.NODE_ENV === 'development') {
      logger.info('Connection Disconnected');
    }
  });
  mongoose.connection.on('close', () => {
    if (process.env.NODE_ENV === 'development') {
      logger.info('Connection Closed');
    }
  });
  mongoose.connection.on('error', (err: any) => {
    console.error(`Connection error: ${err.stack}`);
  });
};

async function dbConnect () {
  const dbUri = config.get<string>('dbUri');

  try {
    await mongoose.connect(dbUri);
  } catch (err: any) {
    logger.error(`Connection error: ${err.stack}`);
  }
}

export default dbConnect
