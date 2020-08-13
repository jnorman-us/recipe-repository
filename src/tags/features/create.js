import CheckAPIs from 'express-validator';

import auth from '../../auth/features/auth.js';
import loggedIn from '../../auth/features/logged-in.js';
import isAdmin from '../../auth/features/is-admin.js';

import TagsService from '../service.js';

import validate from '../../validators/features/validate.js';

async function createTag(req, res)
{
	const name = req.body.name;

	const tag = await TagsService.create({
		name: name,
	});

	return res.status(
		tag != null ? 201 : 500,
	).json(
		tag != null ? {
			tag: tag.id,
		} : null,
	);
}

export const url = '/tags/create';
export const rules = [
	CheckAPIs.check('name')
		.isLength({ min: 1 })
		.withMessage('Must provide a name')
		.isLength({ max: 20 })
		.withMessage('Name must be less than 20 characters'),
];
export const action = [ auth, loggedIn, isAdmin, validate, createTag ];
