import compression from 'compression';
import cors from 'cors';
import express, { Request, Response } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import responseTime from 'response-time';
import deserializeUser from '../middleware/deserializeUser';
import routes from '../routes';
import { restResponseTimeHistogram } from './appmetrics';

function createServer() {
	const app = express();

	app.use(express.json());
	app.use(cors());
	app.use(helmet());
	app.use(compression());
	app.use(deserializeUser);

	if (process.env.NODE_ENV === 'development') {
		app.use(morgan('dev'));
	}

	app.use(
		responseTime((req: Request, res: Response, time: number) => {
			if (req?.route?.path) {
				restResponseTimeHistogram.observe(
					{
						method: req.method,
						route: req.route.path,
						status_code: res.statusCode,
					},
					time * 1000
				);
			}
		})
	);

	routes(app);

	return app;
}

export default createServer;
