import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import deserializeUser from '../middleware/deserializeUser';
import routes from '../routes';

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

	routes(app);

	return app;
}

export default createServer;
