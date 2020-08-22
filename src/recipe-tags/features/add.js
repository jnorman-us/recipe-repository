import CheckAPIs from 'express-validator';

import auth from '../../auth/features/auth.js';
import loggedIn from '../../auth/features/logged-in.js';

import RecipeTagsService from '../service.js';

import RecipesService from '../../recipes/service.js';
import validateRealRecipeId from '../../recipes/validators/real-id.js';

import validateRealTagId from '../../tags/validators/real-id.js';

import validate from '../../validators/features/validate.js';

async function addRecipeTag(req, res)
{
	const user_id = req.user.id;
	const recipe_id = req.body.recipe_id;
	const tag_id = req.body.tag_id;

	const recipe = await RecipesService.getById(recipe_id);

	if(recipe.creator_id == user_id)
	{
		const existing_recipe_tag = await RecipeTagsService.getByRecipeTag(
			recipe_id, tag_id,
		);

		if(existing_recipe_tag == null)
		{
			const recipe_tag = await RecipeTagsService.create({
				recipe_id: recipe.id,
				tag_id: tag_id,
			});

			if(recipe_tag != null)
			{
				return res.status(200).json(recipe_tag.id);
			}
			return res.status(500).json();
		}
		return res.status(409).json(existing_recipe_tag.id);
	}
	return res.status(403).json();
}

export const url = '/api/recipe-tags/add';
export const rules = [
	CheckAPIs.check('recipe_id')
		.isLength({ min: 1 })
		.withMessage('Must provide a recipe_id')
		.custom(validateRealRecipeId),
	CheckAPIs.check('tag_id')
		.isLength({ min: 1 })
		.withMessage('Must provide a tag_id')
		.custom(validateRealTagId),
];
export const action = [ auth, loggedIn, validate, addRecipeTag ];
