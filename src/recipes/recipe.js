import Mongoose from 'mongoose';

import DatabaseObject from '../database/database-object.js';

import Instruction from './types/instruction.js';

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
}
