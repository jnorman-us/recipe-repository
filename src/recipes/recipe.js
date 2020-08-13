import DatabaseObject from '../database/database-object.js';

export default class Recipe extends DatabaseObject
{
	static schema = {
		name: String,
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
}
