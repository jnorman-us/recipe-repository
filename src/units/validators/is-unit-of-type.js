import IngredientsService from '../../ingredients/service.js';

import UnitsService from '../service.js';

export default async function validate(recipe_ingredient)
{
	const ingredient_id = recipe_ingredient.ingredient_id;

	const ingredient = await IngredientsService.getById(ingredient_id);

	if(ingredient != null)
	{
		if(UnitsService.isUnitOfType(ingredient.unit_type, recipe_ingredient.units))
		{
			return true;
		}
	}
	throw new Error('The unit is not of type');
}
