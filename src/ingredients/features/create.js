import CheckAPIs from 'express-validator';

import auth from '../../auth/features/auth.js';
import loggedIn from '../../auth/features/logged-in.js';
import isAdmin from '../../auth/features/is-admin.js';

import IngredientsService from '../service.js';

import validate from '../../validators/features/validate.js';

async function createIngredient(req, res)
{
	const name = req.body.name;
	const description = req.body.description;

	const ingredient = await IngredientsService.create({
		name: name,
		description: description,
	});

	return res.status(
		ingredient != null ? 201 : 500,
	).json(
		ingredient != null ? {
			ingredient: ingredient.id,
		} : null,
	);
}

export const url = '/ingredients/create';
export const rules = [
	CheckAPIs.check('name')
		.isLength({ min: 1 })
		.withMessage('Must provide a name'),
	CheckAPIs.check('description')
		.isLength({ min: 15 })
		.withMessage('Description must be at least 15 characters')
		.isLength({ max: 150 })
		.withMessage('Description can be no longer than 150 characters'),
];
export const action = [ auth, loggedIn, isAdmin, validate, createIngredient ];
