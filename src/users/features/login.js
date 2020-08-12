import CheckAPIs from 'express-validator';

import AuthService from '../../auth/service.js';
import auth from '../../auth/features/auth.js';
import loggedOut from '../../auth/features/logged-out.js';

import UsersService from '../service.js';

import validate from '../../validators/features/validate.js';

async function login(req, res)
{
	const email = req.body.email;
	const password = req.body.password;

	const user = await UsersService.getByEmail(email);

	if(user != null)
	{
		if(user.checkPassword(password))
		{
			AuthService.login(req, user.id);
			return res.status(200).json({
				user: user.id,
			});
		}
	}
	return res.status(403).json();
}

export const url = '/users/login';
export const rules = [
	CheckAPIs.check('email')
		.isLength({ min: 1 })
		.withMessage('Must include email'),
	CheckAPIs.check('password')
		.isLength({ min: 1 })
		.withMessage('Must include password'),
];
export const action = [ auth, loggedOut, validate, login ];
