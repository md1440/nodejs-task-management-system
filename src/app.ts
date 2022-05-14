import config from 'config';
import express from 'express';
import dbConnect from './utils/dbConnect';
import logger from './utils/logger';

const port = config.get<number>('port');

const app = express();

app.listen(port, async() => {
	logger.info(`App is running on ${port}`);

  await dbConnect();
});
