import CheckAPIs from 'express-validator';

import RecipesService from '../service.js';
import Recipe from '../recipe.js';

import validate from '../../validators/features/validate.js';

async function randomRecipes(req, res)
{
	const recipes = await RecipesService.getRandom(20);

	const recipe_fulls = [];
	for(const recipe of recipes)
	{
		recipe_fulls.push(new Recipe(recipe).safe);
	}

	return res.status(200).json(recipe_fulls);
}

export const url = '/api/recipes/random';
export const action = [ randomRecipes ];
