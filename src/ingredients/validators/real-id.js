import IngredientsService from '../service.js';

export default async function validate(id)
{
	var ingredient = null;

	try {
		ingredient = await IngredientsService.getById(id);
	} catch(e) {
		throw new Error('Invalid id');
	}

	if(ingredient == null)
		throw new Error('Ingredient does not exist');
	return true;
}
