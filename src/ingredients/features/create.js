import CheckAPIs from 'express-validator';

import auth from '../../auth/features/auth.js';
import loggedIn from '../../auth/features/logged-in.js';
import isAdmin from '../../auth/features/is-admin.js';

import IngredientsService from '../service.js';

import validateIsUnitType from '../../units/validators/is-unit-type.js';

import validate from '../../validators/features/validate.js';

async function createIngredient(req, res)
{
	const name = req.body.name;
	const description = req.body.description;
	const unit_type = req.body.unit_type;

	const ingredient = await IngredientsService.create({
		name: name,
		description: description,
		unit_type: unit_type,
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
		.isLength({ max: 250 })
		.withMessage('Description can be no longer than 250 characters'),
	CheckAPIs.check('unit_type')
		.isLength({ min: 1 })
		.withMessage('Must provide a unit_type')
		.custom(validateIsUnitType),
];
export const action = [ auth, loggedIn, isAdmin, validate, createIngredient ];
