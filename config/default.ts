export default {
	port: 3000,
	dbUri: 'mongodb://localhost:27017/nodejs-task-management-system',
	saltRounds: 12,
	publicKey: process.env.PUBLIC_KEY,
	privateKey: process.env.PRIVATE_KEY,
};
