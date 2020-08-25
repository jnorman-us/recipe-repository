import CheckAPIs from 'express-validator';

import auth from '../../auth/features/auth.js';
import loggedIn from '../../auth/features/logged-in.js';
import isAdmin from '../../auth/features/is-admin.js';

import TagsService from '../service.js';
import validateIsRGBHex from '../validators/is-rgb-hex.js';

import validate from '../../validators/features/validate.js';

async function createTag(req, res)
{
	const name = req.body.name;
	const color = req.body.color;

	const tag = await TagsService.create({
		name: name,
		color: color,
	});

	return res.status(
		tag != null ? 200 : 500,
	).json(
		tag != null ? {
			tag: tag.id,
		} : null,
	);
}

export const url = '/api/tags/create';
export const rules = [
	CheckAPIs.check('name')
		.isLength({ min: 1 })
		.withMessage('Must provide a name')
		.isLength({ max: 20 })
		.withMessage('Name must be less than 20 characters'),
	CheckAPIs.check('color')
		.isLength({ min: 1 })
		.withMessage('Must provide a color')
		.custom(validateIsRGBHex),
];
export const action = [ auth, loggedIn, isAdmin, validate, createTag ];
