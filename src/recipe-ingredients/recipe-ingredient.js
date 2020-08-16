import Mongoose from 'mongoose';

import DatabaseObject from '../database/database-object.js';

import IngredientsService from '../ingredients/service.js';

import RecipesService from '../recipes/service.js';

import Unit from '../units/types/unit.js';

export default class RecipeIngredient extends DatabaseObject
{
	static schema = {
		recipe_id: Mongoose.Schema.Types.ObjectId,
		ingredient_id: Mongoose.Schema.Types.ObjectId,
		quantity: Number,
		units: Unit,
	};

	static Service = null;

	static initialize(service)
	{
		RecipeIngredient.Service = service;
	}

	constructor(object)
	{
		super(object, RecipeIngredient.schema);
	}

	async getIngredient()
	{
		return await IngredientsService.getById(this.ingredient_id);
	}

	async getRecipe()
	{
		return await RecipesService.getById(this.recipe_id);
	}
}
