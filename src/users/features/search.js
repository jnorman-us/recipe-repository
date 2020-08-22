import CheckAPIs from 'express-validator';

import UsersService from '../service.js';

import validate from '../../validators/features/validate.js';

async function searchUsers(req, res)
{
	const query = req.body.query;

	const users = await UsersService.searchByDisplayName(query, 20);

	return res.status(
		users != null ? 200 : 500,
	).json({
		users: users,
	});
}

export const url = '/api/users/search';
export const rules = [
	CheckAPIs.check('query')
		.isLength({ min: 1 })
		.withMessage('Must provide a search query'),
];
export const action = [ validate, searchUsers ];
