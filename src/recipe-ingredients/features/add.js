import CheckAPIs from 'express-validator';

import auth from '../../auth/features/auth.js';
import loggedIn from '../../auth/features/logged-in.js';

import validateRealIngredientId from '../../ingredients/validators/real-id.js';

import RecipeIngredientsService from '../../recipe-ingredients/service.js';

import RecipesService from '../../recipes/service.js';
import validateRealRecipeId from '../../recipes/validators/real-id.js';

import validateIsUnit from '../../units/validators/is-unit.js';
import validateIsUnitOfType from '../../units/validators/is-unit-of-type.js';

import validate from '../../validators/features/validate.js';

async function addRecipeIngredient(req, res)
{
	const user_id = req.user.id;
	const recipe_id = req.body.recipe_id;
	const ingredient = req.body.ingredient;

	const recipe = await RecipesService.getById(recipe_id);

	if(recipe.creator_id == user_id)
	{
		const existing_recipe_ingredient = await RecipeIngredientsService.getByRecipeIngredient(
			recipe_id, ingredient.id,
		);

		if(existing_recipe_ingredient == null)
		{
			const recipe_ingredient = await RecipeIngredientsService.create({
				recipe_id: recipe.id,
				ingredient_id: ingredient.id,
				quantity: ingredient.quantity,
				units: ingredient.units,
			});

			if(recipe_ingredient != null)
			{
				return res.status(200).json(recipe_ingredient.id);
			}
			return res.status(500).json();
		}
		return res.status(409).json(existing_recipe_ingredient.id);
	}
	return res.status(403).json();
}

export const url = '/recipe-ingredients/add';
export const rules = [
	CheckAPIs.check('recipe_id')
		.isLength({ min: 1 })
		.withMessage('Must provide a recipe_id')
		.custom(validateRealRecipeId),
	CheckAPIs.check('ingredient.id')
		.isLength({ min: 1 })
		.withMessage('Must provide an ingredient_id')
		.custom(validateRealIngredientId),
	CheckAPIs.check('ingredient.quantity')
		.isFloat()
		.withMessage('Must provide a numerical quantity'),
	CheckAPIs.check('ingredient.units')
		.isLength({ min: 1 })
		.withMessage('Must provide a unit')
		.custom(validateIsUnit),
	CheckAPIs.check('ingredient')
		.custom(validateIsUnitOfType),
];
export const action = [ auth, loggedIn, validate, addRecipeIngredient ];
