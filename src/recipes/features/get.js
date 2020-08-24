import RecipesService from '../service.js';

async function getRecipe(req, res)
{
	const recipe_id = req.query.id;

	if(recipe_id != null)
	{
		try {
			const recipe = await RecipesService.getById(recipe_id);

			if(recipe != null)
			{
				return res.status(200).json(await recipe.getFull());
			}
			return res.status(404).send();
		} catch(err) {
			return res.status(422).send();
		}
	}
	return res.status(422).send();
}

export const url = '/api/recipes';
export const action = [ getRecipe ];
