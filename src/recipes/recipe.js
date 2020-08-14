import Mongoose from 'mongoose';

import DatabaseObject from '../database/database-object.js';

export default class Recipe extends DatabaseObject
{
	static schema = {
		creator_id: Mongoose.Schema.Types.ObjectId,
		name: String,
		description: String,
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
