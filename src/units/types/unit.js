import Mongoose from 'mongoose';

import UnitsService from '../service.js';

export default class Unit extends Mongoose.SchemaType
{
	constructor(key, options)
	{
		super(key, options, 'Unit');
	}

	cast(value)
	{
		if(UnitsService.isUnit(value))
		{
			return value;
		}
		throw new Error('Not a valid Unit');
	}
}
