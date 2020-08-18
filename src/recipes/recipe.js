import Mongoose from 'mongoose';

import DatabaseObject from '../database/database-object.js';

import RecipeIngredients from '../recipe-ingredients/service.js';

import RecipeTagsService from '../recipe-tags/service.js';

import Instruction from './types/instruction.js';

import UsersService from '../users/service.js';

export default class Recipe extends DatabaseObject
{
	static schema = {
		creator_id: Mongoose.Schema.Types.ObjectId,
		published: Boolean,
		name: String,
		description: String,
		instructions: [ Instruction ]
	};

	static Service = null;

	static initialize(service)
	{
		Recipe.Service = service;
	}

	constructor(object)
	{
		super(object, Recipe.schema);
	}

	get safe()
	{
		return {
			id: this.id,
			name: this.name,
			creator_id: this.creator_id,
			description: this.description,
			instructions: this.instructions,
		};
	}

	async getCreator()
	{
		return await UsersService.getById(this.creator_id);
	}

	async getRecipeTags()
	{
		return await RecipeTagsService.getByRecipe(this.id);
	}

	async getRecipeIngredients()
	{
		return await RecipeIngredients.getByRecipe(this.id);
	}
}
