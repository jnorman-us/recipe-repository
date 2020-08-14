import DatabaseService from '../database/service.js';

import RecipeTag from './recipe-tag.js';

export default class RecipeTagsService
{
	static model;

	static async initialize()
	{
		RecipeTag.initialize(RecipeTagsService);

		RecipeTagsService.model = DatabaseService.createModel('RecipeTag', RecipeTag);
	}

	static async create(data)
	{
		return await RecipeTagsService.model.create(data);
	}

	static async getById(id)
	{
		return await RecipeTagsService.model.findOne({
			_id: id,
		});
	}

	static async getByRecipeTag(recipe_id, tag_id)
	{
		return await RecipeTagsService.model.findOne({
			recipe_id: recipe_id,
			tag_id: tag_id,
		});
	}

	// searching for multiple tags under a recipe
	static async getByRecipe(recipe_id)
	{
		return await RecipeTagsService.model.find({
			recipe_id: recipe_id,
		});
	}

	// searching for multiple recipes under a tag
	static async getByTag(tag_id, limit)
	{
		return await RecipeTagsService.model.find({
			tag_id: tag_id,
		}).limit(limit);
	}
}
