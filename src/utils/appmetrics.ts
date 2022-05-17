import config from 'config';
import express, { Request, Response } from 'express';
import client from 'prom-client';
import log from './logger';

const metricsServerPort = config.get<number>('metricsServerPort');
const address = config.get<string>('address');

const app = express();

export const restResponseTimeHistogram = new client.Histogram({
	name: 'rest_response_time_duration_seconds',
	help: 'Rest Api response time in seconds',
	labelNames: ['method', 'route', 'status_code'],
});

export const databaseResponseTimeHistogram = new client.Histogram({
	name: 'db_response_time_duration_seconds',
	help: 'Database response time in seconds',
	labelNames: ['operation', 'success'],
});

export function startMetricsServer() {
	const collectDefaultMetrics = client.collectDefaultMetrics;

	collectDefaultMetrics();

	app.get('/api/metrics', async (req: Request, res: Response) => {
		res.set('Content-Type', client.register.contentType);

		return res.send(await client.register.metrics());
	});

	app.listen(metricsServerPort, address, async () => {
		log.info(`Metrics server running on ${metricsServerPort}`);
	});
}