import Http from 'http';
import Fs from 'fs';

import Express from 'express';
import BodyParser from 'body-parser';
import Path from 'path';

import AuthService from '../auth/service.js';
import ConfigService from '../config/service.js';

import * as CalculateGroceries from '../groceries/features/calculate.js';

import * as CreateIngredient from '../ingredients/features/create.js';
import * as GetIngredient from '../ingredients/features/get.js';
import * as SearchIngredients from '../ingredients/features/search.js';

import * as AddRecipeIngredient from '../recipe-ingredients/features/add.js';

import * as AddRecipeTag from '../recipe-tags/features/add.js';

import * as CreateRecipe from '../recipes/features/create.js';
import * as GetRecipe from '../recipes/features/get.js';
import * as UpdateInstructions from '../recipes/features/update-instructions.js';

import * as CreateTag from '../tags/features/create.js';
import * as GetTag from '../tags/features/get.js';

import * as GetUser from '../users/features/get.js';
import * as Login from '../users/features/login.js';
import * as Logout from '../users/features/logout.js';
import * as MakeAdmin from '../users/features/make-admin.js';
import * as Me from '../users/features/me.js';
import * as Register from '../users/features/register.js';
import * as SearchUsers from '../users/features/search.js';

import * as ApiGetWildcard from './features/api-get-wildcard.js';
import * as ApiPostWildcard from './features/api-post-wildcard.js';
import * as FrontendWildcard from './features/frontend-wildcard.js';

export default class AppService
{
	static production;

	static server;
	static app;

	static features = [
		CalculateGroceries,
		
		CreateIngredient,
		GetIngredient,
		SearchIngredients,

		AddRecipeIngredient,

		AddRecipeTag,

		CreateRecipe,
		GetRecipe,
		UpdateInstructions,

		CreateTag,
		GetTag,

		GetUser,
		Login,
		Logout,
		MakeAdmin,
		Me,
		Register,
		SearchUsers,

		// api wildcards, handle error code 404
		ApiGetWildcard,
		ApiPostWildcard,

		// wildcard for frontend
		FrontendWildcard,
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
					feature.url,
					feature.action,
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
