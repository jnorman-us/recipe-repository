import DatabaseObject from '../database/database-object.js';

export default class Ingredient extends DatabaseObject
{
	static schema = {
		name: String,
		description: String,
		// image...
	};

	static Service = null;

	static initialize(service)
	{
		Ingredient.Service = service;
	}

	constructor(object)
	{
		super(object, Ingredient.schema);
	}
}
