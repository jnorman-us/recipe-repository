import CheckAPIs from 'express-validator';

import auth from '../../auth/features/auth.js';
import loggedIn from '../../auth/features/logged-in.js';
import isAdmin from '../../auth/features/is-admin.js';

import UsersService from '../service.js';

import validate from '../../validators/features/validate.js';
import validateRealUserId from '../validators/real-id.js';

async function makeAdmin(req, res)
{
	const id = req.body.id;
	const admin = req.body.admin;

	const user = await UsersService.edit(id, {
		admin: admin,
	});

	if(user != null)
	{
		return res.status(200).json({
			admin: admin,
		});
	}
	else
	{
		return res.status(500).json();
	}
}

export const url = '/users/make-admin';
export const rules = [
	CheckAPIs.check('id')
		.custom(validateRealUserId),
	CheckAPIs.check('admin')
		.isBoolean()
		.withMessage('Must provide a valid admin setting'),
];
export const action = [ auth, loggedIn, isAdmin, validate, makeAdmin];
