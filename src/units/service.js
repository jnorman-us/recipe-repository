import DatabaseService from '../database/service.js';

import units from './units.json';
import Unit from './types/unit.js';
import UnitType from './types/unit-type.js';

export default class UnitsService
{
	static model;

	static async initialize()
	{
		DatabaseService.addSchemaType(Unit, 'Unit');
		DatabaseService.addSchemaType(UnitType, 'UnitType');
	}

	static isType(val)
	{
		for(const type of units.types)
		{
			if(type.type == val) return true;
		}
		return false;
	}

	static isUnit(val)
	{
		for(const type of units.types)
		{
			if(type.units != null)
				if(type.units.includes(val)) return true;
		}
		return false;
	}

	static isUnitOfType(type_val, unit_val)
	{
		for(const type of units.types)
		{
			if(type.type == type_val)
			{
				if(type.units != null)
					if(type.units.includes(unit_val)) return true;
			}
		}
		return false;
	}
}
