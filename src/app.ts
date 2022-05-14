import config from 'config';
import createServer from './utils/createServer';
import dbConnect from './utils/dbConnect';
import logger from './utils/logger';

const port = config.get<number>('port');

const app = createServer();

app.listen(port, async () => {
	logger.info(`App is running on ${port}`);

	await dbConnect();
});
