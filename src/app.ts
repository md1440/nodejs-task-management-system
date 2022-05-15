import config from 'config';
import createServer from './utils/createServer';
import dbConnect, { dbConnectionEvents } from './utils/dbConnect';
import logger from './utils/logger';

const port = config.get<number>('port');
const address = config.get<string>('address');

const app = createServer();

app.listen(port, address, async () => {
	logger.info(`App is running on ${port}`);

	dbConnectionEvents();

	await dbConnect();
});
