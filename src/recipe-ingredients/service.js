import DatabaseService from '../database/service.js';

import RecipeIngredient from './recipe-ingredient.js';

export default class RecipeIngredientsService
{
	static model;

	static async initialize()
	{
		RecipeIngredient.initialize(RecipeIngredientsService);

		RecipeIngredientsService.model = DatabaseService.createModel('RecipeIngredient', RecipeIngredient);
	}

	static async create(data)
	{
		return await RecipeIngredientsService.model.create(data);
	}

	static async getById(id)
	{
		return await RecipeIngredientsService.model.findOne({
			_id: id,
		});
	}

	static async getByRecipeIngredient(recipe_id, ingredient_id)
	{
		return await RecipeIngredientsService.model.findOne({
			recipe_id: recipe_id,
			ingredient_id: ingredient_id,
		});
	}

	static async getByRecipe(recipe_id)
	{
		return await RecipeIngredientsService.model.find({
			recipe_id: recipe_id,
		});
	}

	static async getByIngredient(ingredient_id, limit)
	{
		return await RecipeIngredientsService.model.find({
			ingredient_id: ingredient_id,
		}).limit(limit);
	}
}
