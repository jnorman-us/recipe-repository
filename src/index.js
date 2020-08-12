import ConfigService from './config/service.js';
import LoggerService from './logger/service.js';
import DatabaseService from './database/service.js';
import AuthService from './auth/service.js';
import AppService from './app/service.js';

import IngredientsService from './ingredients/service.js';
import UsersService from './users/service.js';

(async function() {
	await ConfigService.initialize();
	await LoggerService.initialize();
	await DatabaseService.initialize();
	await AuthService.initialize();
	await AppService.initialize();

	await IngredientsService.initialize();
	await UsersService.initialize();
})();
