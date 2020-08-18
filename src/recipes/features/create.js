import CheckAPIs from 'express-validator';

import auth from '../../auth/features/auth.js';
import loggedIn from '../../auth/features/logged-in.js';

import RecipesService from '../service.js';

import validateIsUnit from '../../units/validators/is-unit.js';
import validateIsUnitOfType from '../../units/validators/is-unit-of-type.js';

import validate from '../../validators/features/validate.js';

async function createRecipe(req, res)
{
	const creator_id = req.user.id;
	const name = req.body.name;
	const description = req.body.description;

	const recipe = await RecipesService.create({
		creator_id: creator_id,
		published: false,
		instructions: [],
		name: name,
		description: description,
	});

	if(recipe != null)
	{
		res.status(200).json({
			recipe: recipe.id,
		});
	}
	res.status(500).json();
}

export const url = '/recipes/create';
export const rules = [
	CheckAPIs.check('name')
		.isLength({ min: 1 })
		.withMessage('Must provide a name'),
	CheckAPIs.check('description')
		.isLength({ min: 15 })
		.withMessage('Description must be at least 15 characters')
		.isLength({ max: 250 })
		.withMessage('Description can be no longer than 250 characters'),
];
export const action = [ auth, loggedIn, validate, createRecipe ];
