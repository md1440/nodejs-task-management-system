import config from 'config';
import { startMetricsServer } from './utils/appmetrics';
import createServer from './utils/createServer';
import dbConnect, { dbConnectionEvents } from './utils/dbConnect';
import log from './utils/logger';
import swaggerDocs from './utils/swagger';

const port = config.get<number>('port');
const address = config.get<string>('address');

const app = createServer();

app.listen(port, address, async () => {
	log.info(`App is running on ${port}`);

	dbConnectionEvents();

	await dbConnect();

	swaggerDocs(app, port, address);

	if (process.env.NODE_ENV === 'development') {
		startMetricsServer();
	}
});
