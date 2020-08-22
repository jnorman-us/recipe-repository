import CheckAPIs from 'express-validator';

import auth from '../../auth/features/auth.js';
import loggedIn from '../../auth/features/logged-in.js';

import RecipesService from '../service.js';
import validateRealRecipeId from '../validators/real-id.js';

import validate from '../../validators/features/validate.js';

async function updateInstructions(req, res)
{
	const user_id = req.user.id;
	const recipe_id = req.body.recipe_id;
	const new_recipe_instructions = {
		instructions: req.body.instructions,
	};

	const recipe = await RecipesService.getById(recipe_id);

	if(recipe.creator_id == user_id)
	{
		if(await RecipesService.edit(recipe.id, new_recipe_instructions) != null)
		{
			return res.status(200).json();
		}
		return res.status(500).json();
	}
	return res.status(403).json();
}

export const url = '/api/recipes/update-instructions';
export const rules = [
	CheckAPIs.check('recipe_id')
		.isLength({ min: 1 })
		.withMessage('Must provide a recipe_id')
		.custom(validateRealRecipeId),
	CheckAPIs.check('instructions')
		.isArray()
		.withMessage('Must provide an instructions array'),
	CheckAPIs.check('instructions.*.text')
		.isLength({ min: 15 })
		.withMessage('Instruction text must be 15 or more characters')
		.isLength({ max: 1000 })
		.withMessage('Instruction text must be less than 1000 characters'),
];
export const action = [ auth, loggedIn, validate, updateInstructions ];
