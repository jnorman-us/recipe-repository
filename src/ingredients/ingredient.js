import DatabaseObject from '../database/database-object.js';

import UnitType from '../units/types/unit-type.js';

export default class Ingredient extends DatabaseObject
{
	static schema = {
		name: String,
		description: String,
		unit_type: UnitType,
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

	get safe()
	{
		return {
			id: this.id,
			name: this.name,
			description: this.description,
		};
	}
}
