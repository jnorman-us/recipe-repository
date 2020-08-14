import Mongoose from 'mongoose';

import DatabaseObject from '../database/database-object.js';

import RecipesService from '../recipes/service.js';

import TagsService from '../tags/service.js';

export default class RecipeTag extends DatabaseObject
{
	static schema = {
		recipe_id: Mongoose.Schema.Types.ObjectId,
		tag_id: Mongoose.Schema.Types.ObjectId,
	};

	static Service = null;

	static initialize(service)
	{
		RecipeTag.Service = service;
	}

	constructor(object)
	{
		super(object, RecipeTag.schema);
	}

	async getTag()
	{
		return await TagsService.getById(this.tag_id);
	}

	async getRecipe()
	{
		return await RecipesService.getById(this.recipe_id);
	}
}
