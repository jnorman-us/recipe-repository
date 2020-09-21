import Convert from 'convert-units';

import DatabaseService from '../database/service.js';

import units from './units.json';
import Unit from './types/unit.js';
import UnitType from './types/unit-type.js';

export default class UnitsService
{
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

	static getTypeOfUnit(unit_val)
	{
		for(const type of units.types)
		{
			if(type.units != null)
				if(type.units.includes(unit_val))
					return type.type;
		}
		return null;
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

	static combine(quantity_a, units_a, quantity_b, units_b)
	{
		if(units_a == 'count')
		{
			return {
				comb_quantity: quantity_a + quantity_b,
				comb_units: units_a,
			}
		}

		if(quantity_a > quantity_b)
		{
			quantity_a = Convert(quantity_a).from(units_a).to(units_b);

			return {
				comb_quantity: quantity_a + quantity_b,
				comb_units: units_b,
			};
		}
		else
		{
			quantity_b = Convert(quantity_b).from(units_b).to(units_a);

			return {
				comb_quantity: quantity_a + quantity_b,
				comb_units: units_a,
			};
		}
	}
}
