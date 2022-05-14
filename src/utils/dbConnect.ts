import config from 'config';
import mongoose from 'mongoose';

const dbConnectionEvents = () => {
  mongoose.connection.on('connecting', () => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Connecting to DB ...');
    }
  });
  mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB Database');

  });
  mongoose.connection.on('reconnected', () => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Connection Reestablished');
    }
  });
  mongoose.connection.on('disconnected', () => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Connection Disconnected');
    }
  });
  mongoose.connection.on('close', () => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Connection Closed');
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
    console.error(`Connection error: ${err.stack}`);
  }
}

export default dbConnect
