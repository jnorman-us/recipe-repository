import Http from 'http';
import Fs from 'fs';

import Express from 'express';
import BodyParser from 'body-parser';
import Path from 'path';

import AuthService from '../auth/service.js';
import ConfigService from '../config/service.js';

import * as Register from '../users/features/register.js';

export default class AppService
{
	static production;

	static server;
	static app;

	static features = [
		Register,
	];

	static async initialize()
	{
		AppService.production = ConfigService.get('production');

		AppService.app = Express();
		AppService.app.set('trust proxy', 1);
		AppService.app.use(BodyParser.json());
		AppService.app.use(BodyParser.urlencoded({
			extended: true,
		}));
		AppService.app.use(AuthService.session_parser);

		if(AppService.production == true)
			AppService.app.use(Express.static(ConfigService.get('build_path')));

		for(var feature of AppService.features)
		{
			if(feature.rules != null)
			{
				AppService.app.post(
					feature.url,
					feature.rules,
					feature.action,
				);
			}
			else
			{
				AppService.app.get(
					feature.url, feature.action,
				);
			}
		}

		AppService.app.use(function(err, req, res, next) {
			console.log(err);
			res.status(500).send('Error 500, yiiiikes server error');
		});

		if(true || AppService.production == false)
		{
			AppService.server = Http.createServer(AppService.app);
			AppService.server.listen(ConfigService.get('http_port'));
		}
		else
		{
			// HTTPS mode
		}
	}
}
