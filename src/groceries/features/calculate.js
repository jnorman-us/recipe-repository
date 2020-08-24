import CheckAPIs from 'express-validator';

import RecipesService from '../../recipes/service.js';
import validateRealRecipeId from '../../recipes/validators/real-id.js';

import UnitsService from '../../units/service.js';

import validate from '../../validators/features/validate.js';

async function calculate(req, res)
{
	const recipe_ids = req.body.recipes;

	const groceries = {};
	for(const recipe_id of recipe_ids)
	{
		const recipe = await RecipesService.getById(recipe_id);

		// get all the ingredients into the array
		for(const recipe_ingredient of (await recipe.getRecipeIngredients()))
		{
			const quantity = recipe_ingredient.quantity;
			const units = recipe_ingredient.units;
			const ingredient = await recipe_ingredient.getIngredient();

			if(groceries[ingredient.id] != null)
			{
				const { comb_quantity, comb_units } = UnitsService.combine(
					groceries[ingredient.id].quantity,
					groceries[ingredient.id].units,
					quantity,
					units,
				);

				groceries[ingredient.id].quantity = comb_quantity;
				groceries[ingredient.id].units = comb_units;
			}
			else
			{
				groceries[ingredient.id] = {
					quantity: quantity,
					units: units,
					ingredient: ingredient.safe,
				};
			}
		}
	}

	res.status(200).json({
		recipe_ids: recipe_ids,
		groceries: groceries,
	});
}

export const url = '/api/groceries/calculate';
export const rules = [
	CheckAPIs.check('recipes')
		.isArray()
		.withMessage('Must provide a recipes array'),
	CheckAPIs.check('recipes.*')
		.isLength({ min: 1 })
		.withMessage('Must provide recipe ids')
		.custom(validateRealRecipeId),
];
export const action = [ validate, calculate ];
