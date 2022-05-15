import dotenv from 'dotenv';

dotenv.config({
	path: './.env',
});

export default {
  address: '0.0.0.0',
	port: process.env.PORT,
	dbUri: 'mongodb://localhost:27017/nodejs-task-management-system',
	saltRounds: 12,
	accessTokenTtl: '15m',
	refreshTokenTtl: '1y',
	publicKey: process.env.PUBLIC_KEY,
	privateKey: process.env.PRIVATE_KEY,
};
