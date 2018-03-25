import { Router } from 'express';
import { version } from '../../package.json';
import blocks from './blocks';
import accounts from './accounts';
import transactions from './transactions';
import delegates from './delegates';
import handler from './handler';

const routes = [].concat(accounts, delegates, blocks, transactions);

export default () => {
	console.log('Router initiated');
	let app = Router();
	routes.forEach((route) => {
		app.all(`/${route.path}`, (req, res, next) => {
			const payload = req.method === 'POST' ? req.body : req.query;
			let path = route.path.replace(/^\/|\/$/, '')
			path += req.method === 'GET' ? '/' : '';
			return handler(path, payload, req, res, next)
		});
	});

	app.get('/version', (req, res) => {
		return res.json({ version });
	});

	return app;
};
