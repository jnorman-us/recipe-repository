import Mongoose from 'mongoose';

import UnitsService from '../service.js';

export default class UnitType extends Mongoose.SchemaType
{
	constructor(key, options)
	{
		super(key, options, 'UnitType');
	}

	cast(value)
	{
		if(UnitsService.isType(value))
		{
			return value;
		}
		throw new Error('Not a valid UnitType');
	}
}
