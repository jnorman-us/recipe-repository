import CheckAPIs from 'express-validator';

import auth from '../../auth/features/auth.js';
import loggedOut from '../../auth/features/logged-out.js';

import UsersService from '../service.js';
import User from '../user.js';

import validate from '../../validators/features/validate.js';
import validateEmailUse from '../validators/email-use.js';

async function register(req, res)
{
	const email = req.body.email;
	const display_name = req.body.display_name;
	const password = req.body.password;

	const hashed_password = User.hashPassword(password);

	const user = await UsersService.create({
		email: email,
		display_name: display_name,
		password: hashed_password,
		admin: false,
	});

	return res.status(
		user != null ? 201 : 500,
	).json(
		user != null ? {
			user: user.id,
		} : 500,
	);
}

export const url = '/users/register';
export const rules = [
	CheckAPIs.check('email')
		.isEmail()
		.withMessage('Must provide a valid email')
		.custom(validateEmailUse),
	CheckAPIs.check('display_name')
		.isLength({ min: 4, })
		.withMessage('Must provide a name with at least 4 characters')
		.isLength({ max: 25 })
		.withMessage('Must provide a name with at most 25 characters'),
	CheckAPIs.check('password')
		.isLength({ min: 8 })
		.withMessage('Must provide a password with 8+ characters'),
];
export const action = [ auth, loggedOut, validate, register ];
