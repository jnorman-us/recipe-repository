import RecipesService from '../service.js';

export default async function validate(id)
{
	var recipe = null;

	try {
		recipe = await RecipesService.getById(id);
	} catch(e) {
		throw new Error('Invalid id');
	}

	if(recipe == null)
		throw new Error('Recipe does not exist');
	return true;
}
