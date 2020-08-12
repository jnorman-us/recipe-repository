import CookieSession from 'cookie-session';

import ConfigService from '../config/service.js';

export default class AuthService
{
	static session_parser;

	static initialize()
	{
		AuthService.session_parser = CookieSession({
			name: 'session',
			secret: ConfigService.get('cookie_secret'),
			maxAge: ConfigService.get('cookie_max_age'),
		});
	}

	static login(req, user_id)
	{
		req.session.user_id = user_id;
	}

	static logout(req)
	{
		req.session = null;
	}
}
