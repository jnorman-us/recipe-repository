import CheckAPIs from 'express-validator';

import RecipesService from '../service.js';

import validate from '../../validators/features/validate.js';

async function searchRecipes(req, res)
{
	const query = req.body.query;

	const recipes = await RecipesService.searchByName(query, 20);

	const recipe_fulls = [];
	for(const recipe of recipes)
	{
		recipe_fulls.push(recipe.safe);
	}

	return res.status(200).json(recipe_fulls);
}

export const url = '/api/recipes/search';
export const rules = [
	CheckAPIs.check('query')
		.isLength({ min: 1 })
		.withMessage('Must provide a search query'),
];
export const action = [ validate, searchRecipes ];
