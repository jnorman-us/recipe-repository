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
				const full_recipe = recipe.safe;

				const creator = await recipe.getCreator();
				if(creator != null) full_recipe.creator = creator.safe;

				full_recipe.tags = [];
				for(const recipe_tag of (await recipe.getRecipeTags()))
				{
					full_recipe.tags.push({
						...(await recipe_tag.getTag()).safe
					});
				}

				full_recipe.ingredients = [];
				for(const recipe_ingredient of (await recipe.getRecipeIngredients()))
				{
					full_recipe.ingredients.push({
						quantity: recipe_ingredient.quantity,
						units: recipe_ingredient.units,
						...(await recipe_ingredient.getIngredient()).safe
					});
				}

				return res.status(200).json(full_recipe);
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
