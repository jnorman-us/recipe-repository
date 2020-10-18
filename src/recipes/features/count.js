import RecipesService from '../service.js';
import Recipe from '../recipe.js';

async function randomRecipes(req, res)
{
	const count = await RecipesService.getCount();

	return res.status(200).json(count);
}

export const url = '/api/recipes/count';
export const action = [ randomRecipes ];
