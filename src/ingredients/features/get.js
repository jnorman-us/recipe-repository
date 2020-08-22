import IngredientsService from '../service.js';

async function getIngredient(req, res)
{
	const ingredient_id = req.query.id;

	if(ingredient_id != null)
	{
		try {
			const ingredient = await IngredientsService.getById(ingredient_id);

			return res.status(
				ingredient != null ? 200 : 404,
			).json({
				ingredient: ingredient.safe,
			});
		} catch(err) {
			return res.status(422).send();
		};
	}
	return res.status(422).send();
}

export const url = '/api/ingredients';
export const action = [ getIngredient ];
