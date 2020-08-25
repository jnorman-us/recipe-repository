import DatabaseObject from '../database/database-object.js';

export default class Tag extends DatabaseObject
{
	static schema = {
		name: String,
		color: String,
		// image...
	};

	static Service = null;

	static initialize(service)
	{
		Tag.Service = service;
	}

	constructor(object)
	{
		super(object, Tag.schema);
	}

	get safe()
	{
		return {
			id: this.id,
			name: this.name,
			color: this.color,
		};
	}
}
