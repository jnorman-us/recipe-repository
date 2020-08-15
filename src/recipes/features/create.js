import CheckAPIs from 'express-validator';

import auth from '../../auth/features/auth.js';
import loggedIn from '../../auth/features/logged-in.js';

import validateRealIngredientId from '../../ingredients/validators/real-id.js';

import RecipeIngredientsService from '../../recipe-ingredients/service.js';

import RecipeTagsService from '../../recipe-tags/service.js';

import RecipesService from '../service.js';

import validateRealTagId from '../../tags/validators/real-id.js';

import validate from '../../validators/features/validate.js';

async function createRecipe(req, res)
{
	const creator_id = req.user.id;
	const name = req.body.name;
	const description = req.body.description;

	const tags = req.body.tags;
	const ingredients = req.body.ingredients;
	const instructions = req.body.instructions;

	const recipe = await RecipesService.create({
		creator_id: creator_id,
		published: false,
		instructions: instructions,
		name: name,
		description: description,
	});

	if(recipe != null)
	{
		for(const tag of tags)
		{
			const recipe_tag = await RecipeTagsService.create({
				recipe_id: recipe.id,
				tag_id: tag.tag_id,
			});
		}

		for(const ingredient of ingredients)
		{
			const recipe_ingredient = await RecipeIngredientsService.create({
				recipe_id: recipe.id,
				ingredient_id: ingredient.ingredient_id,
				quantity: 5,
			});
		}

		res.status(200).json({
			recipe: recipe.id,
		});
	}
	res.status(500).json();
}

export const url = '/recipes/create';
export const rules = [
	CheckAPIs.check('name')
		.isLength({ min: 1 })
		.withMessage('Must provide a name'),
	CheckAPIs.check('description')
		.isLength({ min: 15 })
		.withMessage('Description must be at least 15 characters')
		.isLength({ max: 250 })
		.withMessage('Description can be no longer than 250 characters'),
	CheckAPIs.check('tags')
		.isArray()
		.withMessage('Must provide an tags array'),
	CheckAPIs.check('tags.*.tag_id')
		.isLength({ min: 1 })
		.withMessage('Must provide a tag_id in tags')
		.custom(validateRealTagId),
	CheckAPIs.check('ingredients')
		.isArray()
		.withMessage('Must provide an ingredients array'),
	CheckAPIs.check('ingredients.*.ingredient_id')
		.isLength({ min: 1 })
		.withMessage('Must provide a ingredient_id in ingredients')
		.custom(validateRealIngredientId),
	CheckAPIs.check('instructions')
		.isArray()
		.withMessage('Must provide an instructions array'),
	CheckAPIs.check('instructions.*.text')
		.isLength({ min: 15 })
		.withMessage('Instruction text must be 15 or more characters')
		.isLength({ max: 250 })
		.withMessage('Instruction text must be less than 250 characters'),
];
export const action = [ auth, loggedIn, validate, createRecipe ];
