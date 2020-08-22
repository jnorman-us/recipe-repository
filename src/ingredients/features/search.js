import CheckAPIs from 'express-validator';

import IngredientsService from '../service.js';

import validate from '../../validators/features/validate.js';

async function searchIngredients(req, res)
{
	const query = req.body.query;

	const ingredients = await IngredientsService.searchByName(query, 20);

	return res.status(
		ingredients != null ? 200 : 500,
	).json({
		ingredients: ingredients,
	});
}

export const url = '/api/ingredients/search';
export const rules = [
	CheckAPIs.check('query')
		.isLength({ min: 1 })
		.withMessage('Must provide a search query'),
];
export const action = [ validate, searchIngredients ];
